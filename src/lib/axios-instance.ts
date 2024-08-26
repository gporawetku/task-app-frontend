import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // ใช้ environment variables เพื่อให้สะดวกในการตั้งค่า
    timeout: 10000, // ตั้งค่า timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// คุณสามารถเพิ่ม interceptors ได้ที่นี่ เช่น การจัดการ token, การจัดการ error เป็นต้น
axiosInstance.interceptors.request.use(
    (config) => {
        // ทำสิ่งที่ต้องการก่อนส่ง request
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // จัดการ error response เช่น แสดง error message
        return Promise.reject(error);
    }
);

export default axiosInstance;
