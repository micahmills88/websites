import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

function getSorting(order, orderBy) {
    return order === 'desc'
      ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Config Name' },
  { id: 'vm', numeric: false, disablePadding: false, label: 'VM' },
  { id: 'user', numeric: false, disablePadding: false, label: 'User' },
  { id: 'behaviors', numeric: true, disablePadding: false, label: 'Behaviors' },
];

class ConfigTableHead extends React.Component {
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

let ConfigsTableToolbar = props => {
    const { classes, tableTitle, onAddClick, onDeleteClick } = props;

    return (
        <Toolbar className={classes.root}>
            <div className={classes.title}>
                <Typography variant="title" id="tableTitle">
                    {tableTitle}
                </Typography>
            </div>
            <div className={classes.spacer} />
            <Tooltip title="Add Config">
                <IconButton aria-label="Add Config" onClick={onAddClick}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Selected Config">
                <IconButton aria-label="Delete Selected Config" disabled={false} onClick={onDeleteClick}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
};
  
ConfigsTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

ConfigsTableToolbar = withStyles(toolbarStyles)(ConfigsTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: 0,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class ConfigsTable extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            order: 'asc',
            orderBy: 'id',
            selected: [],
            page: 0,
            rowsPerPage: 5,
            project_id: this.props.project_id,
        };
    };

    handleClick = (row) => {
        let newSelected = [row.id];
        if(this.isSelected(row.id))
        {
            newSelected = [];
        }
        this.props.callback(row.long_id);
        this.setState({ selected: newSelected });
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
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        const data = this.props.data;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        
        return (
          <Paper className={classes.root}>
            <ConfigsTableToolbar 
                numSelected={selected.length} 
                tableTitle={this.props.tableTitle} 
                onAddClick={this.props.handleAddAction}
                onDeleteClick={this.props.handleDeleteAction}
            />
            <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <ConfigTableHead
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
                          onClick={()=> this.handleClick(n)}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={n.id}
                          selected={isSelected}
                        >
                          <TableCell component="th" scope="row" padding="default">{n.name}</TableCell>
                          <TableCell >{n.vm}</TableCell>
                          <TableCell >{n.user}</TableCell>
                          <TableCell numeric>{n.count}</TableCell>
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
    
ConfigsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(ConfigsTable);