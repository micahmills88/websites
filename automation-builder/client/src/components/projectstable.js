import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

let counter = 0;
function createData(long_id, name, description, created, edited, other) {
  counter += 1;
  return { id: counter, long_id, name, description};
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Project Name' },
  { id: 'edit', numeric: true, disablePadding: false, label: 'Edit' },
];

class ProjectsTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

ProjectsTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let ProjectsTableToolbar = props => {
  const { classes, tableTitle, onAddClick, onDeleteClick } = props;

  return (
    <Toolbar className={classes.root}>
      <div className={classes.title}>
        <Typography variant="title" id="tableTitle">
            {tableTitle}
        </Typography>
      </div>
      <div className={classes.spacer} />
      <Tooltip title="Add Project">
        <IconButton aria-label="Add Project" onClick={onAddClick}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Selected Project">
        <IconButton aria-label="Delete Selected Project" disabled={false} onClick={onDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

ProjectsTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

ProjectsTableToolbar = withStyles(toolbarStyles)(ProjectsTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class ProjectsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'id',
      selected: [],
      selectedID: "",
      data: [],
      page: 0,
      rowsPerPage: 5,
      open: false,
    };
  }

  componentDidMount= () => {
    fetch('/api/projects', { credentials: 'same-origin' })
    .then((res) => {
      if(res.status === 200)
      {
        return res.json().then((json) => {
          if(!json.success) this.setState({connectionError: json.error});
          else {
            if(json.data.length > 0)
            {
              let newData = [];
              json.data.forEach(element => {
                newData.push(createData(element._id, element.name, element.description));
              });
              this.setState({ data: newData });
            }
          };
        });
      }
      else {
        //reset private route state
        this.props.onAuthFail(false);
      }
    });    
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleClick = (event, row) => {
    let newSelected = [row.id];
    if(this.isSelected(row.id))
    {
      newSelected = [];
    }
    this.setState({ 
      selected: newSelected,
      selectedID: row.long_id
    });
  };

  addNewRow = (name, desc) => {
    const { data } = this.state;
    let newData = [];
    fetch('/api/projects', {
        method: "POST",
        body: JSON.stringify({
          name: name,
          description: desc
        }),
        headers: {"Content-Type": "application/json"}
      })
      .then(data => data.json())
      .then((res) => {
        if(!res.success) {
          this.setState({error: res.error});
        }
        else if(res.status === 401)
        {
          console.log("Not Authorized");
        }
        else {
          let newRow = createData(res.newID, name, desc);
          newData = newData.concat(data);
          newData = newData.concat(newRow);
          this.setState({ 
            data: newData,
            selected: [newData.length]
          });
        };
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleDelete = () => {
    var currentData = this.state.data;
    var index = currentData.map((i) => {
      return i['long_id'];
    }).indexOf(this.state.selectedID);
    currentData.splice(index, 1);
    this.setState({
      data: currentData
    });
  };

  cancelClose = () => {
    this.setState({ open: false });
    this.setState({ textFieldValue: "" });
  };

  createClose = () => {
    this.addNewRow(this.state.projectFieldValue, this.state.descriptionFieldValue);
    this.setState({ open: false });
  };
  
  projectNameFieldUpdate = (e) => {
    this.setState({ projectFieldValue: e.target.value });
  };

  descNameFieldUpdate = (e) => {
    this.setState({ descriptionFieldValue: e.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <ProjectsTableToolbar 
          numSelected={selected.length} 
          tableTitle={this.props.tableTitle} 
          onAddClick={this.handleOpen}
          onDeleteClick={this.handleDelete}
        />
        <Dialog
          open={this.state.open}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Project</DialogTitle>
          <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Project Name"
                fullWidth
                onChange={ this.projectNameFieldUpdate }
            />
            <TextField
                margin="dense"
                id="desc"
                label="Project Description"
                fullWidth
                onChange={ this.descNameFieldUpdate }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.createClose} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <ProjectsTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={null}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell component="th" scope="row" padding="default">
                        {n.name}
                      </TableCell>
                      <TableCell numeric>
                        <Button variant="outlined" component={Link} to={`/projectpage/${n.long_id}`} >
                          ...
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

ProjectsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectsTable);
