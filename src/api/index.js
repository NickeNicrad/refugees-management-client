import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:8082/api'});
const AUTH_TOKEN = window.localStorage.getItem('token');
API.interceptors.request.use(req =>
{
    if (AUTH_TOKEN)
    {
        req.headers.authorization = `Bearer ${AUTH_TOKEN}`;
    }
    return req;
});

// auth routes
export const login = async (user) =>
{
    try {
        const response = await API.post('/auth/login', user);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const signup = async (user) =>
{
    try {
        const response = await API.post('/auth/signup', user);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

// account routes
export const getProfile = async () =>
{
    try {
        const response = await API.get('/user/single');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// users routes
export const getAllUsers = async () =>
{
    try {
        const response = await API.get('/user/all');
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const updateUserState = async (user) =>
{
    try {
        const response = await API.patch(`/user/update/state/${user.id}`, user);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const deleteUser = async (id) =>
{
    try {
        const response = await API.delete(`/user/delete/${id}`);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

// refugies routes
export const createRefugee = async (data) =>
{
    try {
        const response = await API.post('/refugee/create', data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
export const getAllRefugies = async () =>
{
    try {
        const response = await API.get('/refugee/all');
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const updateRefugee = async (data) =>
{
    try {
        const response = await API.patch(`/refugee/update/${data.id}`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const deleteRefugee = async (id) =>
{
    try {
        const response = await API.delete(`/refugee/delete/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// children routes

export const createChild = async (data) =>
{
    try {
        const response = await API.post('/child/create', data);
        return response
    } catch (error) {
        return error.response.data;
    }
}
export const getAllChildren = async () =>
{
    try {
        const response = await API.get('/child/all');
        return response;
    } catch (error) {
        return error.response.data;
    }
}
export const updateChild = async (data) =>
{
    try {
        const response = await API.update(`/child/update/${data.id}`);
        return response;
    } catch (error) {
        return error.response.data;
    }
}
export const deleteChild = async (id) =>
{
    try {
        const response = await API.delete(`/child/delete/${id}`);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

// countries routes
export const createCountry = async (country) =>
{
    try {
        const response = await API.post('/country/create', country);
        return response;
    } catch (error) {
        return error.response.data;
    }
}
export const getAllCountries = async () =>
{
    try {
        const response = await API.get('/country/all');
        return response;
    } catch (error) {
        return error.response.data;
    }
}

// states routes
export const createState = async (state) =>
{
    try {
        const response = await API.post('/state/create', state);
        return response;
    } catch (error) {
        return error.response.data;
    }
}
export const getAllStates = async () =>
{
    try {
        const response = await API.get('/state/all');
        return response;
    } catch (error) {
        return error.response.data;
    }
}
export const deleteSate = async (id) =>
{
    try {
        const response = await API.delete(`/state/delete/${id}`);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

// city routes
export const createCity = async (city) =>
{
    try {
        const response = await API.post('/city/create', city);
        return response;
    } catch (error) {
        return error.response.data;
    }
}
export const getAllCities = async () =>
{
    try {
        const response = await API.get('/city/all');
        return response;
    } catch (error) {
        return error.response.data;
    }
}
export const deleteCity = async (id) =>
{
    try {
        const response = await API.delete(`/city/delete/${id}`)
        return response;
    } catch (error) {
        return error.response.data;
    }
}