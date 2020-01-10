import React, { Component } from 'react';
import EmpTable from '../../components/EmpTable/emptable';
import EmpModal from '../../components/EmpModal/empmodal';
import Button from '@material-ui/core/Button';

import './dashboard.css';

const EMP_FIELDS = ['name', 'age', 'email', 'salary', 'address', 'expertise', 'actions'];
// const TABLE_DATA = [
//     {
//         name: 'Foo', age: 30, email: 'foo@gmail.com', salary: 55000,
//         address: '35, dy street, chicago', expertise: 'Nodejs', 
//     },
//     {
//         name: 'John', age: 25, email: 'john@gmail.com', salary: 45000,
//         address: '35, dy street, chicago', expertise: 'Reactjs',
//     }
// ];

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            tableData: '',
            editEmployee: '',
            isEdit: false
        }
    }

    componentDidMount() {
        fetch('https://91rjrnn176.execute-api.ap-south-1.amazonaws.com/dev/get-all')
        .then(res => {
            res.json()
            .then(response => {
              console.log('final response', response);    
              this.setState({
                  tableData: response.employees
              })
            })
        })
    }

    onDeleteHandler = (id) => {
        console.log('delete handler', id);
        const data = [...this.state.tableData];
        const _data= data.filter(td => {
             return td.email !== id.email;
         });
        this.setState({
            tableData: _data
        });
    }

    onEditHandler = (emp) => {  
        this.setState({ 
            editEmployee: emp,
            open: true,
            isEdit: true
         });
         console.log('edit handler', this.state);
    }

    openModalHandler = () => {
        this.setState({ open: true, editEmployee: '' })
        console.log('open handler', this.state.open);
    }

    closeModalHandler = () => {
        this.setState({ open: false })
    }

    formStateChangeHandler = name => {
        console.log('formstatechanhehandler', name);
    }

    tableDataChangeHandler = (employee) => {
      console.log('Employee payload --->', employee);
      fetch('https://91rjrnn176.execute-api.ap-south-1.amazonaws.com/dev/add-entity', {
          method: 'POST',
          mode: "no-cors", // no-cors, cors, *same-origin
        //   headers: {
        //     "Content-Type": "application/json"
        // },
          body: JSON.stringify(employee)
      })
        .then(res => {
            res.json()
            .then(response => {
              console.log('final response', response);    
              this.setState({
                  tableData: response.employees
              })
            })
        })
    //   const data = [...this.state.tableData];
    //   data.push(employee)
    //   this.setState({
    //       tableData: data
    //   })
    }

    render() {
        console.log('dashboard render method call');
        return (
            <div className='wrapper'>
                <div className='row'>
                    <div className='col-md-1 col-lg-1'></div>
                    <div className='col-md-10 col-lg-10'>
                        <div className='emp-btn'>
                            <Button color='primary' onClick={this.openModalHandler}>Add Employee</Button>
                        </div>
                        <div className='table-wrapper justify-content-center'>
                            <EmpTable tableHeadings={EMP_FIELDS}
                                tableData={this.state.tableData}
                                editHandler={this.onEditHandler}
                                deleteHandler={this.onDeleteHandler}>
                            </EmpTable>
                        </div>
                        <EmpModal  open = {this.state.open}
                           editEmpData = {this.state.editEmployee}
                           tableData = {this.tableDataChangeHandler}
                           closeModal={this.closeModalHandler}>
                        </EmpModal>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
