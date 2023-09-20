import axios from "axios";

// const errorCallBack = (error) => {
//     const expectedError = error.response &&
//         error.response.status >= 400 &&
//         error.response.status < 500;
//     if (!expectedError) {

//     }
//     return Promise.reject(error);
// };
axios.defaults.headers.common["x-auth-token-user"] =
        localStorage.getItem("token");
// axios.intercepters.request.use(async (req) => {
//     req.headers["x-auth-token-admin"] = await localStorage.getItem("token-admin");
//     return req;
// })
// axios.intercepters.response.use(null, errorCallBack);

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}