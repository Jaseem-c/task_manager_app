import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
   <>
    <div className='d-flex justify-content-center' style={{width:"100%",height:"100vh"}}>
      
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10 d-flex align-items-center justify-content-center flex-column">
        <img src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif" alt="" width={"100%"} />
          <h3 className='text-center'>Looks like you're lost</h3>
          <h5 className='text-center'>The page You are Looking is unavailable</h5>
          <Link to={'/'}><button className='btn btn-success mt-4 rounded-0'>Back to login</button></Link>
       
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
   </>
  )
}

export default PageNotFound