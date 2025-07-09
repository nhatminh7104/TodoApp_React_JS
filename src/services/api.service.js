// import axios from "axios";
import axios from "./axios.customize";

// User APIs
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
const fetchAllUsersAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
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

// Book APIs
const fetchAllBooksAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;

    return axios.get(URL_BACKEND);
}

const createBookAPI = (title, author, price, quantity, category, bookCover) => {
    const URL_BACKEND = `api/v1/book`;

    const data = {
        mainText: title,
        author: author,
        price: price,
        quantity: quantity,
        category: category,
        thumbnail: bookCover
    }

    return axios.post(URL_BACKEND, data);
}

const updateBookAPI = (_id, title, author, price, quantity, category, bookCover) => {
    const URL_BACKEND = `api/v1/book`;
    const data = {
        _id: _id,
        mainText: title,
        author: author,
        price: price,
        quantity: quantity,
        category: category,
        thumbnail: bookCover
    }

    return axios.put(URL_BACKEND, data);
}

const deleteBookAPI = (_id) => {
    const URL_BACKEND = `api/v1/book/${_id}`;
    return axios.delete(URL_BACKEND);
}

// Auth APIs
const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone,
    };

    return axios.post(URL_BACKEND, data);
}
const loginUserAPI = (username, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username: username,
        password: password,
        delay: 1000
    }

    return axios.post(URL_BACKEND, data);
}
const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account";

    return axios.get(URL_BACKEND);
}
const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout";

    return axios.post(URL_BACKEND);
}

export {
    createUserAPI,
    fetchAllUsersAPI,
    updateUserAPI,
    deleteUserAPI,

    fetchAllBooksAPI,
    createBookAPI,
    updateBookAPI,
    deleteBookAPI,

    uploadFileAPI,

    registerUserAPI,
    loginUserAPI,
    getAccountAPI,
    logoutAPI
}