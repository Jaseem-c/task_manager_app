import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTasks, FaRegClock, FaInfoCircle, FaClipboardList, FaCheckCircle } from 'react-icons/fa';
import './taskdetails.css';
import { getTaskDetailsApi } from '../Services/allApi';
import Swal from 'sweetalert2';

function TaskDetails() {
    const [tasks, setTask] = useState({});
    const location = useLocation();
    const { item } = location.state || {};

    const navigate = useNavigate('')

    const getTaskDetails = async (item) => {

        const token = sessionStorage.getItem("token");
        const reqHeader = {
            "Authorization": `Bearer ${token}`,
        };
        if(token){
        const result = await getTaskDetailsApi(reqHeader, item);
        setTask(result.data);
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

    useEffect(() => {
        getTaskDetails(item);
    }, [item]);

    return (
        <>
            <Header />

            <div className="container py-3 py-md-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">
                        <div className="card shadow-lg p-4 rounded-lg">
                            <h3 className="text-center mb-4 text-dark">
                                <FaTasks className="me-2" /> {tasks?.title}
                            </h3>

                            <div className="px-3 py-2  rounded">
                                <div className="mb-4 d-flex justify-content-between align-items-center">
                                    <span className="text-muted">
                                        <FaClipboardList className="me-2" /> Title
                                    </span>
                                    <strong className="text-wrap">{tasks?.title}</strong>
                                </div>

                                <div className="mb-4 d-flex justify-content-between align-items-center">
                                    <span className="text-muted">
                                        <FaInfoCircle className="me-2" /> Description
                                    </span>
                                    <strong className="text-wrap">{tasks?.description}</strong>
                                </div>

                                <div className="mb-4 d-flex justify-content-between align-items-center">
                                    <span className="text-muted">
                                        <FaCheckCircle className="me-2" /> Status
                                    </span>
                                    <span
                                        className={`${
                                            tasks?.status === false
                                                ? 'text-danger fw-bold'
                                                : 'text-success fw-bold'
                                        }`}
                                    >
                                        {tasks?.status === false ? 'Pending' : 'Completed'}
                                    </span>
                                </div>

                                <div className="mb-4 d-flex justify-content-between align-items-center">
                                    <span className="text-muted">
                                        <FaRegClock className="me-2" /> Created At
                                    </span>
                                    <strong>{tasks?.created_at}</strong>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-muted">
                                        <FaRegClock className="me-2" /> Updated At
                                    </span>
                                    <strong>{tasks?.updated_at || 'N/A'}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
             <Link to={'/home'}> <button className='btn bg-success px-4 px-md-5 text-light'>Back</button></Link>
            </div>
        </>
    );
}

export default TaskDetails;
