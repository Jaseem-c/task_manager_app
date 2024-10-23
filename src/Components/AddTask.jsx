import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2';
import { addTaskApi } from '../Services/allApi';
import { addTaskContext } from '../ContextApi/ContextShare';
import { useNavigate } from 'react-router-dom';

function AddTask() {
  
  const {setAddTaskResponse}=useContext(addTaskContext)

  const navigate = useNavigate('')

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    handleCancel()
  }
  const handleShow = () => setShow(true);

  // to store taskdetails
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: ""
  })
  // to handle cancel
  const handleCancel = () => {
    setTaskDetails({
      title: "",
      description: ""
    })
  }
  // to handle add
  const handleAdd = async (e) => {
    e.preventDefault()
    const { title, description } = taskDetails

    if (!title || !description) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "please fill form completely",
        showConfirmButton: false,
        timer: 1500
      });
    }
    else {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
      };
    
      if(token){
      const reqBody = {
        title,
        description
      }
      const result = await addTaskApi(reqBody, reqHeader)

      if (result.status == 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Task added Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        setAddTaskResponse(result.data)
        handleClose()
      }
      else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Task add failed",
          showConfirmButton: false,
          timer: 1500
        })
        handleClose()
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
  }


  return (
    <>
      <button className='btn bg-success  text-light px-3 px-md-5 fs-6 fw-bold ms-3' onClick={handleShow}>+ Add Task</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input type="text" className="form-control" placeholder="Task title" value={taskDetails.title} onChange={(e) => setTaskDetails({ ...taskDetails, title: e.target.value })} />
          </div>
          <div className='mt-3'>
            <input type="text" className="form-control" placeholder="Task description" value={taskDetails.description} onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddTask