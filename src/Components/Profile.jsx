import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Col, Row } from 'react-bootstrap'
import { getProfileApi } from '../Services/allApi'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


function Profile() {
  const navigate = useNavigate('')
    const [profileDetails,setProfileDetails]=useState({})

    const getProfileDetails=async()=>{
        const token =sessionStorage.getItem("token")
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
      };

      if(token){
        const result=await getProfileApi(reqHeader)
        setProfileDetails(result.data)
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
    useEffect(()=>{
        getProfileDetails()
    },[])
  return (
    <>
    <Header/>
    <div className='profile p-3 p-md-5 d-flex justify-content-center align-items-center flex-column ' >
        <h1 className=''>Profile</h1>
        <Row className='w-100 mt-3 '>
          <Col xs={12} md={4} lg={4}></Col>
          <Col xs={12} md={4} lg={4} >
            <div className='d-flex justify-content-center align-items-center flex-column p-2 p-md-5 shadow bg-light rounded'>
              
              <div className="mb-3 mt-3 w-100 d-flex justify-content-center align-items-center">
                <label htmlFor="">Firstname:</label>
                <input type="text" placeholder='firstname' className='form-control ms-3 ' value={profileDetails.first_name} readOnly />
              </div>
              <div className="mb-3 w-100 d-flex justify-content-center align-items-center">
              <label htmlFor="">lastname:</label>
                <input type="text" placeholder='lastname' className='form-control ms-3' value={profileDetails.last_name} readOnly   />
              </div>
              <div className="mb-3 w-100 d-flex justify-content-center align-items-center">
                <label htmlFor="">username:</label>
                <input type="text" placeholder='username' className='form-control ms-3' value={profileDetails.username} />
              </div>
              <div className="mb-3 w-100 d-flex justify-content-center align-items-center">
                <label htmlFor="">email:</label>
                <input type="text" placeholder='Contact' className='form-control ms-3'  value={profileDetails.email}/>
              </div>
              
            </div>
          </Col>
          <Col xs={12} md={4} lg={4}></Col>
        </Row>
      </div>
    </>
  )
}

export default Profile