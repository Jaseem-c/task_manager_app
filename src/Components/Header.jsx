import React, { useContext } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { logoutApi } from '../Services/allApi'
import Swal from 'sweetalert2'
import { isLoginAuthContext } from '../ContextApi/ContextShare'

function Header() {

  const navigate = useNavigate('')
  const {setLoginStatus}=useContext(isLoginAuthContext)

  const logout = async () => {
    const refreshToken = sessionStorage.getItem("refreshtoken")
    const reqBody = {
      refresh: refreshToken
    }

    const token=sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization": `Bearer ${token}`,
    };

    if(token){
    const result = await logoutApi(reqBody,reqHeader)
    if (result.status === 205) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "logout successfull",
        showConfirmButton: false,
        timer: 1500
      });
      sessionStorage.removeItem("refreshtoken")
      setLoginStatus(false)
      navigate('/')
    }
    else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "logout failed",
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


      <Navbar expand="lg" className="headnavbar px-md-5 bg-success">
        <Container fluid>
          <Navbar.Brand href="#home" as={Link} to={'/home'} className='text-light'>
            Task Manager
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto ">
              <Nav.Link as={Link} to={'/home'} className='text-light me-2'>Home</Nav.Link>
              <Nav.Link as={Link} to={'/profile'} className='text-light me-2'>profile</Nav.Link>
              <Button type="submit" onClick={logout}>logout</Button>
            </Nav>
            <Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header