import React, { createContext, useState } from 'react'

export const addTaskContext=createContext({})
export const updateTaskContext=createContext({})
export const isLoginAuthContext=createContext({})


function ContextShare({children}) {

    const [addTaskResponse,setAddTaskResponse]=useState({})
    const [updateTaskResponse,setUpdateTaskResponse]=useState({})
    const [isLoginStatus,setLoginStatus]=useState(false)
  
  return (
   <>
   <addTaskContext.Provider value={{addTaskResponse,setAddTaskResponse}}>
     <updateTaskContext.Provider value={{updateTaskResponse,setUpdateTaskResponse}}>
       <isLoginAuthContext.Provider value={{isLoginStatus,setLoginStatus}} >
         {children}
         </isLoginAuthContext.Provider>
        </updateTaskContext.Provider>
   </addTaskContext.Provider>
   </>
  )
}

export default ContextShare