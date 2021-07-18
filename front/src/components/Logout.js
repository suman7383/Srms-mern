import React,{useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {

    const history = useHistory();

    useEffect(()=>{
        fetch('/Logout',{
            method:"GET",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json" 
            },
            credentials: "include"
        }).then((res)=>{
            history.push('/ASignIn')
            if(res.status!==200){
                throw new Error("Something Went Wrong")
            }
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    return (
        <>
        <div className="container text-center text-white">
            <h2>You Are Logged Out</h2>
        </div>
        </>
    )
}

export default Logout;