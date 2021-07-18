import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';

const AddMarks = () => {

    const history = useHistory();
    const [data,setData]=useState({reg:"",id:"",maths:"",physics:"",algo:"",os:""});

    let name,value;

    const inputHandle = (e) =>{
         name= e.target.name;
         value = e.target.value;

        setData({...data,[name]:value});

    }

    const postData = async(e) =>{

        e.preventDefault();
        const {reg,id,maths,physics,algo,os} = data;

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
        <div className="container mt-3 ">
            <div className="row">
                <div className="col-md-6 col-12 mx-auto my-3 profile marks">
                    <div className="row">
                        <div className="col-md-12 col-12 mt-3 text-center text-white">
                            <h2>Add Marks</h2>
                        </div>
                        <div className="col-md-6 col-8 mx-auto my-4">
                            <form method="post">
                                <div className="mb-4">
                                    <input type="text" required="true" className="form-control text-white bg-transparent shadow rounded" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                    name="reg"
                                    value={data.reg}
                                    onChange={inputHandle}
                                    placeholder="Registration No"/>                    
                                </div>
                                <div className="mb-4">                                   
                                    <input type="email" required="true" className="form-control  text-white bg-transparent shadow rounded" id="exampleInputEmail1" 
                                    name="id"
                                    value={data.id}
                                    onChange={inputHandle}
                                    placeholder="Paper Number"/>
                                </div>
                                <div className="mb-4">
                                    <input type="text" required="true" className="form-control  text-white bg-transparent shadow rounded" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                    name="maths"
                                    value={data.maths}
                                    onChange={inputHandle}
                                    placeholder="Maths marks"/>                    
                                </div>
                                <div className="mb-4">
                                    <input type="text" required="true" className="form-control  text-white bg-transparent shadow rounded" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                    name="physics"
                                    value={data.physics}
                                    onChange={inputHandle}
                                    placeholder="Physics marks"/>                    
                                </div>
                                <div className="mb-4">
                                    <input type="text" required="true" className="form-control  text-white bg-transparent shadow rounded" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                    name="algo"
                                    value={data.algo}
                                    onChange={inputHandle}
                                    placeholder="algo marks"/>                    
                                </div>
                                <div className="mb-4">
                                    <input type="text" required="true" className="form-control  text-white bg-transparent shadow rounded" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                    name="os"
                                    value={data.os}
                                    onChange={inputHandle}
                                    placeholder="OS marks"/>                    
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
    )
}

export default AddMarks;