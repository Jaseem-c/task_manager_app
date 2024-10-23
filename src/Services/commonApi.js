import axios from "axios";
import { getAccessTokenApi } from "./allApi";

export const CommonApi = async (reqMethod, url, reqBody, reqHeader) => {
  const reqConfig = {
    method: reqMethod,
    url,
    data: reqBody,
    headers: reqHeader ? reqHeader : { "Content-Type": "application/json" },
  };

  try {
    const result = await axios(reqConfig);
    return result;
  } catch (error) {
    if (error.response?.status === 401) {
     const refreshToken=sessionStorage.getItem("refreshtoken")
     const reqBody={
        refresh:refreshToken
     }
     const result=await getAccessTokenApi(reqBody)
    sessionStorage.setItem("token",result.data.access)
    }
  }
};
