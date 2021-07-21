import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Loader from '../Loader';

const Profile = () =>{

    const history = useHistory();
    const [userData,setUserData]=useState();

    const callProfile = async()=>{
        try {
            const res = await fetch('/AdminProfile',{
                method : "GET",
                headers : {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            setUserData(data);

            if(res.status===401){
                history.push('/ASignIn');
            }

        } catch (error) {
            console.log(error)
            history.push('/ASignIn');
        } 
    }

    useEffect(()=>{
        callProfile();
    },[])


    return(
        <>
            <div className="container mt-5 ">
                <div className="row">
                    <div className="col-md-6 col-10 mx-auto profile">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-10  my-auto">
                                <figure className="d-flex justify-content-around">
                                    <img src="/person.png" className="img-fluid" alt="person"></img>
                                </figure>
                            </div>
                            {!userData?<Loader/>:<>
                            <div className="col-md-5 col-6 ms-auto my-auto">
                                <p className="text-white h5 mb-4">Name : </p>
                                <p className="text-white h5 mb-4">Email : </p>
                                <p className="text-white h5 mb-4">Phone No : </p>
                                <p className="text-white h5">Designation :</p>
                            </div>
                            <div className="col-md-5 col-6 my-3">
                                <p className="text-white mb-4">{userData.name} </p>
                                <p className="text-white mb-4">{userData.email} </p>
                                <p className="text-white mb-4">{userData.phone} </p>
                                <p className="text-white">Admin</p>
                            </div>
                            </>}
                            
                        </div>
                    </div>
                </div>   
            </div>
        </>
    )

}

export default Profile;