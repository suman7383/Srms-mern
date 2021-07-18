import React,{useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const SLogout = () => {

    const history = useHistory();

    useEffect(()=>{
        fetch('/SLogout',{
            method:"GET",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json" 
            },
            credentials: "include"
        }).then((res)=>{
            history.push('/');
            if(res.status!==200){
                throw new Error("Something Went Wrong")
            }
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    return (
        <>
        <div className="container text-white text-center">
            <h2>You Are Logged Out</h2>
        </div>
        </>
    )
}

export default SLogout;