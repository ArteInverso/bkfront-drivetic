import axios from "axios";

export default axios.create({
    baseURL: "https://ticdrive.herokuapp.com/",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data"
    }
});