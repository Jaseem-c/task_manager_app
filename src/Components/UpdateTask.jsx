import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2';
import { updateTaskApi } from '../Services/allApi';
import { updateTaskContext } from '../ContextApi/ContextShare';
import { useNavigate } from 'react-router-dom';

function UpdateTask({ tasks }) {

  const { setUpdateTaskResponse } = useContext(updateTaskContext)
  const navigate=useNavigate('')

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    handleCancel()
  }
  const handleShow = () => setShow(true);


  // to store update details
  const [updateTaskDetails, setUpdateTaskDetails] = useState({
    title: tasks?.title,
    description: tasks?.description,
    status: tasks?.status
  })

  //to handle cancel()
  const handleCancel = () => {
    setUpdateTaskDetails({
      title: tasks?.title,
      description: tasks?.description,
      status: tasks?.status
    })
  }
  // to handle add()
  const add = async (e, id) => {
    e.preventDefault()

    const { title, description, status } = updateTaskDetails

    const reqBody = {
      title,
      description,
      status,
    }

    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Authorization": `Bearer ${token}`,
    };

    
    if (token) {
      const result = await updateTaskApi(reqBody, reqHeader, id)
      if (result.status == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Task updated Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        setUpdateTaskResponse(result.data)
        handleClose()
      }
      else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Task update failed",
          showConfirmButton: false,
          timer: 1500
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

  }
  return (
    <>
      <FontAwesomeIcon icon={faPenToSquare} className='me-3 text-primary' style={{ cursor: "pointer" }} onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label htmlFor="title" className='mb-2 fw-bold'>Title :</label>
            <input type="text" id='title' className="form-control" placeholder="Task title" value={updateTaskDetails.title} onChange={(e) => setUpdateTaskDetails({ ...updateTaskDetails, title: e.target.value })} />
          </div>
          <div className='mt-3'>
            <label htmlFor="description" className='mb-2 fw-bold'>description :</label>
            <input type="text" id='description' className="form-control" placeholder="Task description" value={updateTaskDetails.description} onChange={(e) => setUpdateTaskDetails({ ...updateTaskDetails, description: e.target.value })} />
          </div>
          <div className='mt-3'>
            <label htmlFor="Status" className='mb-2 fw-bold'>Status :</label>
            <input type="text" id='Status' className="form-control" placeholder="Task Status" value={updateTaskDetails.status} onChange={(e) => setUpdateTaskDetails({ ...updateTaskDetails, status: e.target.value })} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={(e) => add(e, tasks?.id)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UpdateTask