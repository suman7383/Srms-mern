import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Loader from '../Loader';
import Navbar from './Navbar';

const StudentProfile = () =>{

    const history = useHistory();
    const [userData,setUserData]=useState();
    const active = {profile:"active", result:""};

    const callProfile = async()=>{
        try {
            const res = await fetch('/StudentProfile',{
                method : "GET",
                headers : {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            setUserData(data);

            if(res.status!==200){
                history.push('/');
            }

        } catch (error) {
            console.log(error)
            history.push('/');
        } 
    }

    useEffect(()=>{
        callProfile();
    },[])

    return (
        <>
            <Navbar active={active}/>
            <div className="container mt-5 ">
                <div className="row">
                    <div className="col-md-6 col-10 mx-auto rounded profile marks  overflow-auto">
                        <div className="row justify-content-center">
                            <div className="col-md-10 col-10 my-auto">
                                <figure className="d-flex justify-content-around">
                                    <img src="/person.png" className="img-fluid" alt="person"></img>
                                </figure>
                            </div>
                            {!userData?<Loader/>:
                            <>
                            <div className="col-md-5 col-6 my-auto ms-auto">
                                <p className="text-white mb-3">Name : </p>
                                <p className="text-white mb-3">Reg. No. : </p>
                                <p className="text-white mb-3">Email : </p>
                                <p className="text-white mb-3">Phone No : </p>
                                <p className="text-white">Designation :</p>
                            </div>
                            <div className="col-md-5 col-6 my-auto">
                                <p className="text-white mb-3">{userData.name} </p>
                                <p className="text-white mb-3">{userData.reg} </p>
                                <p className="text-white mb-3">{userData.email} </p>
                                <p className="text-white mb-3">{userData.phone} </p>
                                <p className="text-white">Student</p>
                            </div>
                            </>}
                            
                        </div>
                    </div>
                </div>   
            </div>
        </>
    )
}

export default StudentProfile;