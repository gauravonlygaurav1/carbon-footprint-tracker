import type RegisterData from "@/models/RegisterData";
import apiClient from "@/config/ApiClient";
import type LoginData from "@/models/LoginData";
import type LoginResponseData from "@/models/LoginResponseData";
import useAuth from "@/Auth/store";

//register function
export const registerUser = async (signupData: RegisterData) => {
    //api call to server to save data
    const response = await apiClient.post(`auth/register`, signupData);
    return response.data;
};

//login

export const loginUser = async (loginData: LoginData) => {
    
    const response = await apiClient.post<LoginResponseData>(`auth/login`, loginData);
    return response.data;
}

//logout
export const logoutUser = async () => {

    const response = await apiClient.post(`auth/logout`);
    return response.data;
}


//current login user

//refresh token
export const refreshToken = async () => {

    const token = useAuth.getState().accessToken;
    
    const response = await apiClient.post<LoginResponseData>(
        `auth/refresh`,
        { refreshToken: token }
    );
    return response.data;
}

//apis