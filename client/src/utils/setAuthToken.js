import axios from "axios";

const setAuthToken = token => {
    //it will check if there is a token in a local storage, if yes than it will set to global headers
    
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token
    } else{
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken