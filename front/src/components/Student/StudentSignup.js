import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';

const StudentSignup =() =>{

    const history = useHistory();
    const [data,setData]=useState({name:"",email:"",phone:"",reg:""});

    let name,value;

    const inputHandle = (e) =>{
         name= e.target.name;
         value = e.target.value;

        setData({...data,[name]:value});
        console.log(data)

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
            window.alert("Invalid Credentials ");
        }else if(res.status===422){
            window.alert("Student already exists");
        }else if(res.status===500){
            window.alert("Internal Server Error");
        }else{
            window.alert("User created successfully");
        }
    }

    return (
    <>
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 col-12 mx-auto my-3 profile">
                    <div className="row">
                        <div className="col-md-12 col-12 mt-3 text-center text-white">
                            <h2>Add Student</h2>
                        </div>
                        <div className="col-md-6 col-8 mx-auto my-5">
                            <form method="post">
                                <div className="mb-4">
                                    <input type="text" required="true" className="form-control text-white bg-transparent shadow rounded" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                    name="name"
                                    value={data.name}
                                    onChange={inputHandle}
                                    placeholder="Name"/>                    
                                </div>
                                <div className="mb-4">                                   
                                    <input type="email" required="true" className="form-control  text-white bg-transparent shadow rounded" id="exampleInputEmail1" 
                                    name="email"
                                    value={data.email}
                                    onChange={inputHandle}
                                    placeholder="email"/>
                                </div>
                                <div className="mb-4">
                                    <input type="text" required="true" className="form-control  text-white bg-transparent shadow rounded" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                    name="reg"
                                    value={data.reg}
                                    onChange={inputHandle}
                                    placeholder="Registration No"/>                    
                                </div>
                                <div className="mb-4">
                                    <input type="text" required="true" className="form-control  text-white bg-transparent shadow rounded" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                    name="phone"
                                    value={data.phone}
                                    onChange={inputHandle}
                                    placeholder="Phone No"/>                    
                                </div>
                                <div className="container d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary" onClick={postData}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    </>
    )
}

export default StudentSignup;