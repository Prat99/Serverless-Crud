import React, { Component } from 'react';
import EmpTable from '../../components/EmpTable/emptable';
import EmpModal from '../../components/EmpModal/empmodal';
import Button from '@material-ui/core/Button';

import './dashboard.css';

const EMP_FIELDS = ['name', 'age', 'email', 'salary', 'address', 'expertise', 'actions'];
const TABLE_DATA = [
    {
        name: 'John', age: 30, email: 'john@gmail.com', salary: 45000,
        address: '35, dy street, chicago', expertise: 'reactjs', id: 1
    },
    {
        name: 'John', age: 30, email: 'john@gmail.com', salary: 45000,
        address: '35, dy street, chicago', expertise: 'reactjs', id: 2
    }
];

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    onDeleteHandler = (id) => {
        console.log('delete handler', id);
    }

    onEditHandler = (id) => {
        console.log('edit handler', id);
    }

    addEmployeeHandler = () => {
        this.setState({ open: true });
    }

    openModalHandler = () => {
        this.setState({ open: true })
    }

    closeModalHandler = () => {
        this.setState({ open: false })
    }

    render() {
        return (
            <div className='wrapper'>
                <div className='row'>
                    <div className='col-md-1 col-lg-1'></div>
                    <div className='col-md-10 col-lg-10'>
                        <div className='emp-btn'>
                            <Button color='primary' onClick={this.addEmployeeHandler}>Add Employee</Button>
                        </div>
                        <div className='table-wrapper justify-content-center'>
                            <EmpTable tableHeadings={EMP_FIELDS}
                                tableData={TABLE_DATA}
                                editHandler={this.onEditHandler}
                                deleteHandler={this.onDeleteHandler}>
                            </EmpTable>
                        </div>
                        <EmpModal open={this.state.open} close={this.closeModalHandler}>
                        </EmpModal>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;