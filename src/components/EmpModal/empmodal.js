import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


class EmpModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            employee: {
               name: '',
               age: null,
               email: ''
            }
        }
    }

    openModalHandler = () => {
        this.setState({ open: true })
    }

    closeModalHandler = () => {
        this.setState({ open: false })
    }

    formStateChangeHandler = name => e => {
        console.log('name', name);
        console.log('event', e);
    }
    render() {
        const { open, employee: {name, age, email} } = this.state;
        
        <Dialog
            open={open}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
            <DialogContent>
                <form>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        required
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
                        value={age}
                        onChange={this.formStateChangeHandler('age')}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.closeModalHandler} color="primary">
                    Cancel
          </Button>
            </DialogActions>
        </Dialog>
    }
}


export default EmpModal;