import React,{useState,useEffect} from 'react';
import { NavLink , useHistory} from 'react-router-dom';

const SSignIn=()=>{

    const history = useHistory();
    const [reg,setReg]=useState('');
    const [password, setPassword]=useState('');

    const studentLogin = async(e) =>{
        e.preventDefault();

        const res =await fetch('/SLogin',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                reg,
                password
            })
        });

        const data=res.json();

        if(res.status===400 || !data) {
            window.alert("Invalid Credentials");
        }else{
            window.alert("Logged In Successfully");
            setReg('');
            setPassword('');
            history.push('/Profile');
        }

    }

    const AlreadyLoggedIn = async ()=>{
        try {
            const res = await fetch('/StudentLogged',{
                method : "GET",
                headers : {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();

            if(res.status===200){
                console.log("status 200");
                history.push('/Profile');
            }else if(res.status===401){
                console.log("status 401");
                history.push('/');
            }

        } catch (error) {
            console.log(error)
            history.push('/');
        } 
    }

    useEffect(()=>{
        AlreadyLoggedIn();
    },[])
    
    
    return(
    <>
    <div className="container">
        <p className="h1 text-center p-5 stdlogin">Student Result Portal</p>

    </div>
    <div className="container mt-3">
        <div className="row">
        <div className="col-md-4 col-9 mx-auto rounded login">
        <div className="row">
            <div className="col-12 text-center h3 mt-4 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
            </div>
        </div>
            <div className="row">
                <div className="col-12 mx-auto">
                    <form method="post" className="p-3">
                        <div className="mb-4 input-group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill m-3" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>
                            <input type="text" className="form-control bg-transparent text-white border border-dark shadow rounded" id="exampleInputEmail1" 
                            name="reg"
                            value={reg}
                            onChange={(e)=>setReg(e.target.value)}
                            placeholder="Register No"/>          
                        </div>
                        <div className="mb-4 input-group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill m-3" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                            </svg>
                            <input type="password" className="form-control bg-transparent text-white border border-dark shadow rounded" id="exampleInputPassword1" 
                            name="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder="password"/>
                        </div>
                        <div className="container-fluid d-flex justify-content-center my-4">
                        <button type="submit" className="btn border border-light text-white shadow rounded loginbtn"
                        onClick={studentLogin}
                        >Submit</button>
                        </div>
                    </form>

                </div>
        </div>
            </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-9 mx-auto">
                    <NavLink className="text-white nav-link" to="/ASignin">Admin Login</NavLink>
                </div>
            </div>
        </div>

        
        </>
    )
        
}

export default SSignIn;