import React from 'react';
import PropTypes from 'prop-types';

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

class DataDisplayTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy, columnData } = this.props;

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

let DataDisplayTableToolbar = props => {
    const { classes, tableTitle, onAddClick, onDeleteClick } = props;

    return (
        <Toolbar className={classes.root}>
            <div className={classes.title}>
                <Typography variant="title" id="tableTitle">
                    {tableTitle}
                </Typography>
            </div>
            <div className={classes.spacer} />
            <Tooltip title="Add Item">
                <IconButton aria-label="Add Item" onClick={onAddClick}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Selected Item">
                <IconButton aria-label="Delete Selected Item" disabled={false} onClick={onDeleteClick}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
};
  
DataDisplayTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

DataDisplayTableToolbar = withStyles(toolbarStyles)(DataDisplayTableToolbar);

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

class DataDisplayTable extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            order: 'asc',
            orderBy: 'id',
            selected: [],
            page: 0,
            rowsPerPage: 5,
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
        const { classes, data, columnData } = this.props;
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        
        return (
            <Paper className={classes.root}>
                <DataDisplayTableToolbar 
                    numSelected={selected.length} 
                    tableTitle={this.props.tableTitle} 
                    onAddClick={this.props.handleAddAction}
                    onDeleteClick={this.props.handleDeleteAction}
                />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <DataDisplayTableHead
                            columnData={columnData}
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
                                .map(row => {
                                const isSelected = this.isSelected(row.id);
                                return (
                                    <TableRow
                                        hover
                                        onClick={()=> this.handleClick(row)}
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isSelected}
                                    >
                                        {columnData.map((item) => {
                                            return (
                                                <TableCell key={item.id} numeric={item.numeric}>
                                                    {row[item.kvalue]}
                                                </TableCell>
                                            );
                                        })}
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
    
DataDisplayTable.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DataDisplayTable);