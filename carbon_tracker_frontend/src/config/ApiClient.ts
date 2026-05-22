import useAuth from '@/Auth/store';
import { refreshToken } from '@/services/AuthService';
import axios from 'axios'

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8083',
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Include cookies in requests
    timeout: 60000,
});

//every request will have access token in header if user is logged in
apiClient.interceptors.request.use((config) => {

    const accessToken = useAuth.getState().accessToken;
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
})

let isRefreshing = false;
let pending: any[] = [];

function queueRequest(cb: any){
    pending.push(cb);
}

function resolveQueue(newToken: string){
    pending.forEach((cb) => cb(newToken));
    pending = [];
}

//response interceptor 
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const is401= error.response?.status === 401;
        const original = error.config;
        if(!is401 || original._retry){
            //message:
            return Promise.reject(error);
        }

        original._retry = true;

        if(isRefreshing){
            return new Promise((resolve, reject) => { 
                queueRequest((newToken: string) => {
                    if(!newToken) return reject();
                    original.headers.Authorization= `Bearer ${newToken}`;
                    resolve(apiClient(original));
                })
            });
        }

        //start refreshing
        isRefreshing = true;

        try{
            const loginResponse = await refreshToken();
            const newToken = loginResponse.accessToken; 
            if(!newToken){
                throw new Error("No Access Token Found");
            }
            useAuth
                .getState()
                .changeLocalLoginData(
                loginResponse.accessToken,
                loginResponse.user,
                true
            );
            //
            resolveQueue(newToken);
            original.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(original);
        }catch(error){
            resolveQueue("null");
            useAuth.getState().logout();
            return Promise.reject(error);
        }finally{
            isRefreshing = false;
        }
    }
)

export default apiClient;