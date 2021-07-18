import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const StudentProfile = () =>{

    const history = useHistory();
    const [userData,setUserData]=useState({});

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

            if(!res.status===200){
                throw new Error("Not Authorized");
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
            <div className="container mt-5 profile marks">
                <div className="row">
                    <div className="col-md-10 col-12 mx-auto">
                        <div className="row">
                            <div className="col-md-4 col-12  my-auto">
                                <figure className="d-flex justify-content-around">
                                    <img src="/person.png" className="img-fluid" alt="person"></img>
                                </figure>
                            </div>
                            <div className="col-md-4 col-6 my-auto">
                                <p className="text-white h5 mb-3">Name : </p>
                                <p className="text-white h5 mb-3">Reg. No. : </p>
                                <p className="text-white h5 mb-3">Email : </p>
                                <p className="text-white h5 mb-3">Phone No : </p>
                                <p className="text-white h5">Designation :</p>
                            </div>
                            <div className="col-md-4 col-6 my-auto">
                                <p className="text-white mb-3">{userData.name} </p>
                                <p className="text-white mb-3">{userData.reg} </p>
                                <p className="text-white mb-3">{userData.email} </p>
                                <p className="text-white mb-3">{userData.phone} </p>
                                <p className="text-white">Student</p>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        </>
    )
}

export default StudentProfile;