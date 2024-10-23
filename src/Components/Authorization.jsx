import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { loginApi, registerApi } from '../Services/allApi'
import { isLoginAuthContext } from '../ContextApi/ContextShare'

function Authorization({ login }) {
    
    const navigate = useNavigate('')

    const {setLoginStatus}=useContext(isLoginAuthContext)

    // to store userdetails
    const [userDetails, setUserDetails] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        confirm_password: ""
    })

    // to handle register()
    const handleRegister = async (e) => {
        e.preventDefault()
        const { first_name, last_name, email, username, password, confirm_password } = userDetails

        if (!first_name || !last_name || !email || !username || !password || !confirm_password) {
            Swal.fire({
                position: "center",
                icon: "info",
                title: "please fill form completely",
                showConfirmButton: false,
                timer: 1500
            });
        }
        else if (password !== confirm_password) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Passwords do not match",
                showConfirmButton: false,
                timer: 1500
            });
        }
        else {
            const result = await registerApi(userDetails)
    

            if (result.status == 201) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Registration Successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
                setUserDetails({
                    first_name: "",
                    last_name: "",
                    email: "",
                    username: "",
                    password: "",
                    confirm_password: ""
                })
             
                navigate('/login')
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "User Already Exist",
                    showConfirmButton: false,
                    timer: 1500
                });
                setUserDetails({
                    first_name: "",
                    last_name: "",
                    email: "",
                    username: "",
                    password: "",
                    confirm_password: ""
                })
            }

        }
    }

    // to handle login()
    const handleLogin = async (e) => {
        e.preventDefault()
        const { username, password } = userDetails

        if (!username || !password) {
            Swal.fire({
                position: "center",
                icon: "info",
                title: "please fill form completely",
                showConfirmButton: false,
                timer: 1500
            });
        }
        else {
            const reqbody = {
                username,
                password
            }

            const result = await loginApi(reqbody)
          

              if (result.status == 200) {

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login Successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
                setUserDetails({
                    first_name: "",
                    last_name: "",
                    email: "",
                    username: "",
                    password: "",
                    confirm_password: ""
                })
          
                sessionStorage.setItem("token", result.data.access)
                sessionStorage.setItem("refreshtoken",result.data.refresh)
                setLoginStatus(true)
                navigate('/home')
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Invalid Email or Password",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    return (
        <>
            <div className="authorization d-md-flex align-items-center justify-content-center" style={{ width: "100%", height: "100vh" }} >
                <div className="container p-5 p-md-3 ">

                    <Row className='w-100 border  shadow'>
                        <Col xs={12} md={6} lg={6} className='d-flex align-items-center justify-content-center bg-secondary p-3' >
                            <img src="https://seeklogo.com/images/G/google-tasks-logo-13FF231D18-seeklogo.com.png" alt="" width={"70%"} />
                        </Col>
                        <Col xs={12} md={6} lg={6} className='p-3 p-md-5 d-flex align-items-center justify-content-center'>
                            <form className='mt-3 mt-md-0 w-100 '>
                                <h2 className='text-dark text-center fw-bold mb-3'>Task Manager Application</h2>
                                {!login ? <h6 className='text-dark text-center'>Sign up to your Account</h6> :
                                    <h6 className='text-dark text-center'>Sign in to your Account</h6>}
                                {!login && <div className="mb-3 mt-3 mt-md-4 d-md-flex ">
                                    <input type="text" className='form-control my-2  my-md-0 me-0 me-md-2' placeholder='firstname' value={userDetails.first_name} onChange={(e) => setUserDetails({ ...userDetails, first_name: e.target.value })} />
                                    <input type="text" className='form-control' placeholder='lastname' value={userDetails.last_name} onChange={(e) => setUserDetails({ ...userDetails, last_name: e.target.value })} />
                                </div>}
                                {!login && <div className="mb-3 mt-3 mt-md-4">
                                    <input type="text" placeholder='Email Id ' className='form-control' value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />
                                </div>}
                                <div className="mb-3 mt-3 mt-md-4">
                                    <input type="text" className='form-control' placeholder='Username' value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} />
                                </div>

                                <div className="mb-3">
                                    <input type="text" placeholder='Password' className='form-control' value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />
                                </div>
                                {!login && <div className="mb-3">
                                    <input type="text" placeholder=' confirm Password' className='form-control' value={userDetails.confirm_password} onChange={(e) => setUserDetails({ ...userDetails, confirm_password: e.target.value })} />
                                </div>}
                                <div className="mb-3">
                                    {!login ? <div>
                                        <button type='button' className='btn  w-100 text-light bg-success' onClick={handleRegister}  >Register</button>
                                        <p className='mt-3'>Already a user? Click Here to <Link className='text-success' to={'/login'} >login</Link></p>
                                    </div> :
                                        <div>
                                            <button type='button' className='btn text-light w-100 bg-success' onClick={handleLogin} >Login</button>
                                            <p className='mt-3'>New User? Click Here to <Link className='text-success' to={'/'} >Register</Link></p>
                                        </div>}
                                </div>
                            </form>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Authorization