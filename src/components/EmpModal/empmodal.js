import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});

const fields = [{ label: 'Angularjs', value: 10 },
{ label: 'Reactjs', value: 20 },
{ label: 'Nodejs', value: 30 },
{ label: 'Mongodb', value: 40 }]

class EmpModal extends Component {
    constructor(props) {
        super(props);
        // props.editEmpData ? this.setInitialState(props.editEmpData) : null;
        if (props.editEmpData) {
            this.setInitialState(props.editEmpData);
        }
        this.state = {
            employee: {
                name: '',
                age: '',
                email: '',
                salary: '',
                address: '',
                expertise: ''
            }
        }
    }

    setInitialState = (editState) => {
        this.setState(
            {
                employee: {
                    name: editState.name,
                    age: editState.age,
                    email: editState.emial,
                    salary: editState.salary,
                    address: editState.address,
                    expertise: editState.expertise,
                }
            }
        );
        
    }

    openModalHandler = () => {
        this.setState({ open: true })
    }

    formStateChangeHandler = name => e => {
        this.setState({
            employee: {
                ...this.state.employee,
                [name]: e.target.value
            }
        });
    }

    addEmployeeHandler = () => {
       
        this.props.tableData(this.state.employee);
        this.resetForm();
    }

    resetForm = () => {
        this.setState({
            employee: {
                name: '',
                age: '',
                email: '',
                salary: '',
                address: '',
                expertise: ''
            }
        });
    }

    render() {
        const open = this.props.open;
        const { classes } = this.props;
        if (this.props.editEmpData) {
            var { name, age, email, salary, address, expertise } = this.props.editEmpData;
        } else {
            var { employee: { name, age, email, salary, address, expertise } } = this.state;
        }
        return (
            <Dialog
                open={open}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
                <DialogContent>
                    <form id='employeeForm' className={classes.container} noValidate>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            required
                            className={classes.textField}
                            value={name}
                            onChange={this.formStateChangeHandler('name')}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            required
                            className={classes.textField}
                            value={email}
                            onChange={this.formStateChangeHandler('email')}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="age"
                            label="Age"
                            type="number"
                            required
                            className={classes.textField}
                            value={age}
                            onChange={this.formStateChangeHandler('age')}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="salary"
                            label="Salary"
                            type="number"
                            required
                            className={classes.textField}
                            value={salary}
                            onChange={this.formStateChangeHandler('salary')}
                        />
                        <TextField
                            id="standard-select-expertise"
                            select
                            label="Expertise"
                            className={classes.textField}
                            value={expertise}
                            onChange={this.formStateChangeHandler('expertise')}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            margin="normal"
                        >
                            {fields.map(option => (
                                <MenuItem key={option.label} value={option.label}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="standard-full-width"
                            label="Address"
                            style={{ margin: 8 }}
                            placeholder="Address"
                            fullWidth
                            margin="normal"
                            value={address}
                            onChange={this.formStateChangeHandler('address')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.addEmployeeHandler} color="primary">
                        Add
                    </Button>
                    <Button onClick={this.props.closeModal} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}


export default withStyles(styles)(EmpModal);