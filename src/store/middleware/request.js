import request from "axios"


// PYTHON SERVER INSTANCE
export let instance = request.create({
            baseURL:"https://todolistdjango.herokuapp.com",
            headers:{}
        })