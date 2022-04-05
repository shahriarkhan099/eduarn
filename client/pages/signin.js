
import { useState } from "react";

const signIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = e => {
       e.preventDefault();
       console.table({ name, email, password });
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

                   <button type="submit" className="btn btn-primary btn-block">Sign In</button>
               </form>
           </div>
        </>
    );
};

export default signIn;
