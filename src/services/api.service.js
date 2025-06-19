// import axios from "axios";
import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone,
    };

    return axios.post(URL_BACKEND, data);
}

const fetchAllUsersAPI = () => {
    const URL_BACKEND = "/api/v1/user?current=1&pageSize=1";
    return axios.get(URL_BACKEND);
}

const updateUserAPI = (_id, fullName, phone, avatar) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        avatar: avatar,
        fullName: fullName,
        phone: phone,
    };

    return axios.put(URL_BACKEND, data);
}

const deleteUserAPI = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`;

    return axios.delete(URL_BACKEND);
}

const uploadFileAPI = (file, folder) => {
    const URL_BACKEND = `/api/v1/file/upload`;
    const config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data"
        }
    }
    const bodyFormData = new FormData();

    bodyFormData.append("fileImg", file);

    return axios.post(URL_BACKEND, bodyFormData, config);
}

export {
    createUserAPI,
    fetchAllUsersAPI,
    updateUserAPI,
    deleteUserAPI,
    uploadFileAPI
}