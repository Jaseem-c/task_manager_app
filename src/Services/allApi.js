import { CommonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

// registration
export const registerApi=async(reqbody)=>{
    return await CommonApi("POST",`${serverUrl}register/`,reqbody,"")
}
// login
export const loginApi=async(reqbody)=>{
    return await CommonApi("POST",`${serverUrl}login/`,reqbody,"")
}

// to get profile
export const getProfileApi=async(reqheader)=>{
    return await CommonApi("GET",`${serverUrl}profile/`,"",reqheader)
}
// to get tasks
export const getTasksApi=async(reqheader)=>{
    return await CommonApi("GET",`${serverUrl}tasks/`,"",reqheader)
}
// to add task
export const addTaskApi=async(reqbody,reqheader)=>{
    return await CommonApi("POST",`${serverUrl}tasks/`,reqbody,reqheader)
}
// to delete task
export const deleteTaskApi=async(reqHeader,id)=>{
    return await CommonApi("DELETE",`${serverUrl}tasks/${id}/`,"",reqHeader)
}
// to get task details
export const getTaskDetailsApi=async(reqheader,id)=>{
    return await CommonApi("GET",`${serverUrl}tasks/${id}/`, "", reqheader)
}

// to update task
export const updateTaskApi=async(reqbody,reqheader,id)=>{
    return await CommonApi("PUT",`${serverUrl}tasks/${id}/`,reqbody,reqheader)
}
// to filter status
export const filterStatusApi=async(reqheader,status)=>{
    return await CommonApi("GET",`${serverUrl}tasks/status/${status}/`,"",reqheader)
}

// to get accesstokenApi
export const getAccessTokenApi=async(reqbody)=>{
    return await CommonApi("POST",`${serverUrl}token/refresh/`,reqbody,"")
}

// for logout
export const logoutApi=async(reqbody,reqHeader)=>{
    return await CommonApi("POST",`${serverUrl}logout/`, reqbody ,reqHeader)
}