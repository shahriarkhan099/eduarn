
import { useReducer, createContext, useEffect } from "react";
import axios from 'axios';
import {useRouter} from "next/router";

const initialState = {
    user: null,
};

const Context = createContext();

const rootReducer = (state, action) => {
    switch (action.type) {
        case "SIGNIN":
            return { ...state, user: action.payload };
        case "SIGNOUT":
            return { ...state, user: null };
        default:
            return state;
    }
};

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    
    const router = useRouter();

    useEffect(() => {
        dispatch({
          type: "LOGIN",
          payload: JSON.parse(window.localStorage.getItem("user")),
        });
    }, []);

    axios.interceptors.response.use(
        function (response) {

            return response;
        }, 
        function(error) {
            let res = error.response;
            if(res.status === 401 && res.config && !res.config.__isRetryRequest) {
                return new Promise((resolve, reject) => {
                    axios.get('/api/signup')
                    .then((data) => {
                        console.log('/401 error > signup');
                        dispatch({type: "SIGNOUT"});
                        window.localStorage.removeItem("user");
                        router.push("/signin");
                    })
                    .catch((err) => {
                        console.log('AXIOS INTERCEPTORS ERR', err);
                        reject(error);
                    });
                });
            }
            return Promise.reject(error);
        });

        useEffect(() => {
           const getCsrfToken = async () => {
               const {data} = await axios.get('/api/csrf-token');
            //    console.log("CSRF", data);
               axios.defaults.headers['X-CSRF-Token'] = data.getCsrfToken;
           };
           getCsrfToken();
        }, []);

    return (
        <Context.Provider value={{state, dispatch}}>
         {children}
        </Context.Provider>
    );
};

export {Context, Provider};

