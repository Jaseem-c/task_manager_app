import React, { useContext, useEffect, useState } from 'react';
import AddTask from './AddTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import UpdateTask from './UpdateTask';
import {  useNavigate } from 'react-router-dom';
import { deleteTaskApi, filterStatusApi, getTasksApi } from '../Services/allApi';
import Swal from 'sweetalert2';
import { addTaskContext, updateTaskContext } from '../ContextApi/ContextShare';
import './task.css'
import { Dropdown } from 'react-bootstrap';

function Tasks() {

    const [selectedValue, setSelectedValue] = useState('all');
    const handleSelect = (eventKey) => {
        setSelectedValue(eventKey);

    };

    const { updateTaskResponse } = useContext(updateTaskContext)
    const navigate = useNavigate();
    const { addTaskResponse } = useContext(addTaskContext);
    const [deleteTask, setDeleteTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        const token = sessionStorage.getItem("token");
        const reqHeader = { "Authorization": `Bearer ${token}` };
        if (token) {
            try { 
                const result = await (selectedValue === "pending"
                    ? filterStatusApi(reqHeader, selectedValue)
                    : selectedValue === "completed"
                        ? filterStatusApi(reqHeader, selectedValue)
                        : getTasksApi(reqHeader));
                setTasks(result.data);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load tasks.',
                });
            }
        }
        else{
            Swal.fire({
                icon: 'info',
                title: 'you have no token,You are already logged out',
                showConfirmButton: false,
                timer: 1500,
              });
              navigate('/');
        }
    };

    const handleDelete = async (id) => {
        const token = sessionStorage.getItem("token");
        const reqHeader = { "Authorization": `Bearer ${token}` };
        if(token){
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirmDelete.isConfirmed) {
            try {
                const result = await deleteTaskApi(reqHeader, id);
                if (result.status === 204) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Task deleted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setDeleteTask(true);
                } else {
                    throw new Error('Deletion failed');
                }
            } catch (error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Task delete failed",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }
    };

    useEffect(() => {
        getTasks();
        setDeleteTask(false);
    }, [addTaskResponse, deleteTask, updateTaskResponse, selectedValue]);

    const passData = (item) => {
        navigate('/taskdetails', { state: { item } });
    };

    return (
        <div className='task-container p-3 p-md-5'>
            <h3 className='welcome-text'>Welcome!.........</h3>
            <div className='d-flex my-3 my-md-5 align-items-center'>
                <h3 className='border-bottom border-success'>Tasks</h3>
                <div className='d-flex ms-auto '>
                    <Dropdown onSelect={handleSelect}>
                        <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                            className='px-2 px-md-5 fw-bold fs-6'>
                            {selectedValue === '' ? 'Filter' : selectedValue === 'completed' ? 'Completed' : selectedValue === 'pending' ? 'Pending' : 'All'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="pending">Pending</Dropdown.Item>
                            <Dropdown.Item eventKey="completed">Completed</Dropdown.Item>
                            <Dropdown.Item eventKey="all">All</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <AddTask />
                </div>

            </div>
            {
                tasks.length > 0 ? (
                    tasks.map((item) => (
                        <div key={item.id} className='task-card mt-2'>
                            <div className='task-content d-flex justify-content-between align-items-center p-3'>
                                <p className='task-title fw-bold'>{item?.title}</p>
                                <div className='task-actions d-flex align-items-center'>
                                    <UpdateTask tasks={item} />
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className='ms-3 text-danger delete-icon'
                                        onClick={() => handleDelete(item?.id)}
                                        style={{ cursor: "pointer" }}
                                    />
                                    <button className='btn btn-primary ms-4' onClick={() => passData(item?.id)}>Details</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) :
                    <p>No tasks available</p>}


        </div>
    );
}

export default Tasks;
