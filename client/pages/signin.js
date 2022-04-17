
import { useState, useContext, useEffect } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';
import {SyncOutlined} from '@ant-design/icons';
import Link from 'next/link';
import { Context } from '../context';
import {useRouter} from 'next/router';

const signIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { state: {user}, dispatch, } = useContext(Context);
    // const {user} = state;

    const router = useRouter();

    useEffect(() => {
       if(user !== null) router.push("/");
    }, [user]);

    const handleSubmit = async (e) => {
       e.preventDefault();
       try {
        setLoading(true);
        const {data} = await axios.post(`/api/signin`, {
            email,
            password,
        });
        // toast.success("SIGNIN SUCCESSFUL");
        dispatch({
            type: "SIGNIN",
            payload: data,
        });

        window.localStorage.setItem("user", JSON.stringify(data));
        router.push('/user');
        // setLoading(false);
       } catch (err) {
        toast.error(err.response.data);
        setLoading(false);
       }
    };

    return (
        <>
           <h1 className="jumbotron text-center bg-primary square">Sign In</h1>
           
           <div className="container col-md-4 offset-md-4 pb-5">
               <form onSubmit={handleSubmit}>
                   <input 
                   type="email" 
                   className="form-control mb-4 p-4" 
                   value={email} 
                   onChange={e => setEmail(e.target.value)}
                   placeholder = "Enter email"
                   required
                   />

                   <input 
                   type="password" 
                   className="form-control mb-4 p-4" 
                   value={password} 
                   onChange={e => setPassword(e.target.value)}
                   placeholder = "Enter password"
                   required
                   />

                   <button type="submit" className="btn btn-primary btn-block" disabled={!email || !password || loading}>
                       {loading ? <SyncOutlined spin /> : "Sign In"}
                       </button>
               </form>
               <br/>
               <p>
                   Don't have an account?{" "}
                   <Link href="/signup">
                       <a>Sign Up</a>
                       </Link>
                   </p>
           </div>
        </>
    );
};

export default signIn;
