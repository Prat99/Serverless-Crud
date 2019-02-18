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
                        rows.map((row, id) => (
                            <TableRow key={row+id}>
                                <TableCell component='th' scope='row'>{row.name}</TableCell>
                                <TableCell>{row.age}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.salary}</TableCell>
                                <TableCell>{row.address}</TableCell>
                                <TableCell>{row.expertise}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => props.deleteHandler(row.id)}>
                                        Edit
                                    </Button>
                                    <Button color="secondary" onClick={() => props.editHandler(row.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Paper>
    );
}


export default empTable;

