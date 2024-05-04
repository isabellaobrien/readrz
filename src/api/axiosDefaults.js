import axios from "axios";

axios.defaults.baseURL = "https://readrz-1bd3cc625808.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;