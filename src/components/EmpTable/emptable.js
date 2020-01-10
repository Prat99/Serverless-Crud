import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './emptable.css';

const empTable = (props) => {
    const rows = [...props.tableData];
    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        {props.tableHeadings.map(th => <TableCell key={th}>{th}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.length > 0 ?
                        rows.map((row, id) => (
                            <TableRow key={row+id}>
                                <TableCell component='th' scope='row'>{row.name}</TableCell>
                                <TableCell>{row.age}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.salary}</TableCell>
                                <TableCell>{row.address}</TableCell>
                                <TableCell>{row.expertise}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => props.editHandler(row)}>
                                        Edit
                                    </Button>
                                    <Button color="secondary" onClick={() => props.deleteHandler(row)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) :
                        <TableRow>
                            <TableCell className='nd-class'>No Data Available</TableCell>
                        </TableRow> 
                        // <span className='nd-class'>No Data Available</span>
                    }
                </TableBody>
            </Table>
        </Paper>
    );
}


export default empTable;

