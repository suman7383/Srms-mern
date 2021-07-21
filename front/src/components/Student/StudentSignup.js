import React,{useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';

const StudentSignup =() =>{

    const history =useHistory();
    const [data,setData]=useState({name:"",email:"",phone:"",reg:""});
    const [msg,setMsg]=useState("Sending");

    let name,value;

    const inputHandle = (e) =>{
         name= e.target.name;
         value = e.target.value;

        setData({...data,[name]:value});

    }

    const postData = async(e) =>{

        e.preventDefault();
        const {name,email,phone,reg} = data;

            const res = await fetch('/SRegister',{
                method:"POST"
            ,
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({name,email,reg,phone})
        });

        const resData= await res.json();

        if(res.status===400 || !resData) {
            setMsg("Invalid Credentials");
        }else if(res.status===422){
            setMsg("Student already exists");
        }else if(res.status===500){
            setMsg("Internal Server Error");
        }else if(res.status===200 || res.status===201){
            setMsg("Student Added successfully.\n Please Note default password is set to 'Student'");
        }else{
            setMsg("Fill all the data");
        }
    }

    const AlreadyLoggedIn = async ()=>{
        try {
            const res = await fetch('/AdminLogged',{
                method : "GET",
                headers : {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials: "include"
            });

            if(res.status===401){
                console.log("status 401");
                history.push('/ASignIn');
            }

        } catch (error) {
            console.log(error)
            history.push('/ASignIn');
        } 
    }

    useEffect(()=>{
        AlreadyLoggedIn();
    })

    return (
    <>
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-5 col-10 mx-auto my-3 profile">
                    <div className="row">
                        <div className="col-md-12 col-12 mt-4 text-center text-white">
                            <h2 className="heading">Add Student</h2>
                        </div>
                        <div className="col-md-8 col-10 mx-auto my-4">
                            <form method="post">
                                <div className="mb-4 input-group">
                                    <i class="fi-rr-user m-2 me-3"></i>
                                    <input type="text" required="true" className="form-control text-white bg-transparent shadow rounded" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                    name="name"
                                    value={data.name}
                                    onChange={inputHandle}
                                    placeholder="Name"/>                    
                                </div>
                                <div className="mb-4 input-group"> 
                                <i class="fi-rr-envelope m-2 me-3"></i>                                  
                                    <input type="email" required="true" className="form-control  text-white bg-transparent shadow rounded" id="exampleInputEmail1" 
                                    name="email"
                                    value={data.email}
                                    onChange={inputHandle}
                                    placeholder="email"/>
                                </div>
                                <div className="mb-4 input-group">
                                    <i class="fi-rr-key m-2 me-3"></i>
                                    <input type="text" required="true" className="form-control  text-white bg-transparent shadow rounded" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                    name="reg"
                                    value={data.reg}
                                    onChange={inputHandle}
                                    placeholder="Registration No"/>                    
                                </div>
                                <div className="mb-4 input-group">
                                    <i class="fi-rr-smartphone m-2 me-3"></i>
                                    <input type="text" required="true" className="form-control  text-white bg-transparent shadow rounded" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                    name="phone"
                                    value={data.phone}
                                    onChange={inputHandle}
                                    placeholder="Phone No"/>                    
                                </div>
                                <div className="container d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary border-0 sendBtn" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={postData}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Message</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center">
                        {msg}
                    </div>
                    <div className="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>
    </>
    )
}

export default StudentSignup;