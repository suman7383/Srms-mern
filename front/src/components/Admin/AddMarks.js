import React,{useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

const AddMarks = () => {

    const history = useHistory();
    const [data,setData]=useState({reg:"",id:"",maths:"",physics:"",algo:"",os:""});
    const [msg,setMsg]=useState("Sending");

    let name,value;

    const inputHandle = (e) =>{
         name= e.target.name;
         value = e.target.value;

        setData({...data,[name]:value});

    }

    const postData = async(e) =>{

        e.preventDefault();
        const {reg,id,maths,physics,algo,os} = data;

            if(!reg || !id || !maths || !physics || !algo || !os){
                setMsg("You can't submit blank field !");
            }
            else{
            const res = await fetch('/Marks',{
                method:"POST"
            ,
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({reg,id,maths,physics,algo,os})
        });

        const resData= await res.json();

        if(res.status===400 || !resData) {
            setMsg("Invalid Reg. No");
        }else if(res.status===422){
            setMsg("Result already exists");
        }else if(res.status===500){
            setMsg("Internal Server Error");
        }else if(res.status===401){
            setMsg("Registration Number not found");
        }else if(res.status===200){
            setMsg("Result Added successfully");
        }
        else{
            setMsg("Fill All data");
        }
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
    },[])

    return (
        <div className="container mt-3 ">
            <div className="row">
                <div className="col-md-6 col-10 mx-auto my-3 profile marks">
                    <div className="row">
                        <div className="col-md-12 col-12 mt-3 text-center text-white">
                            <h2 className="heading">Add Marks</h2>
                        </div>
                        <div className="col-md-8 col-9 mx-auto my-4">
                            <form method="post">
                                <div className="mb-4 input-group">
                                    <i class="fi-rr-key m-2 me-3"></i>
                                    <input type="text" className="form-control text-white bg-transparent shadow rounded" id="validationDefault01" aria-describedby="emailHelp" 
                                    name="reg"
                                    value={data.reg}
                                    onChange={inputHandle}
                                    placeholder="Registration No"/>                    
                                </div>
                                <div className="mb-4 input-group">
                                    <i class="fi-rr-document m-2 me-3"></i>                                   
                                    <input type="email" className="form-control  text-white bg-transparent shadow rounded" id="exampleInputEmail1" 
                                    name="id"
                                    value={data.id}
                                    onChange={inputHandle}
                                    placeholder="Paper Number"/>
                                </div>
                                <div className="mb-4 input-group">
                                    <i class="fi-rr-square-root m-2 me-3"></i>
                                    <input type="text" className="form-control  text-white bg-transparent shadow rounded" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                    name="maths"
                                    value={data.maths}
                                    onChange={inputHandle}
                                    placeholder="Maths marks" />                    
                                </div>
                                <div className="mb-4 input-group">
                                    <i class="fi-rr-physics m-2 me-3"></i>
                                    <input type="text" className="form-control  text-white bg-transparent shadow rounded" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                    name="physics"
                                    value={data.physics}
                                    onChange={inputHandle}
                                    placeholder="Physics marks"/>                    
                                </div>
                                <div className="mb-4 input-group">
                                    <i class="fi-rr-stats m-2 me-3"></i>
                                    <input type="text" className="form-control  text-white bg-transparent shadow rounded" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                    name="algo"
                                    value={data.algo}
                                    onChange={inputHandle}
                                    placeholder="algo marks" />                    
                                </div>
                                <div className="mb-4 input-group">
                                    <i class="fi-rr-computer m-2 me-3"></i>
                                    <input type="text"  className="form-control  text-white bg-transparent shadow rounded" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                    name="os"
                                    value={data.os}
                                    onChange={inputHandle}
                                    placeholder="OS marks" />                    
                                </div>
                                <div className="container d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary border-0 sendBtn" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={postData}>Submit</button>
                                </div>
                            </form>
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
        </div>
    )
}

export default AddMarks;