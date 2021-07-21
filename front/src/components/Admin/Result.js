import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Loader from '../Loader';

const Result = () =>{
    const history = useHistory();
    const [userData,setUserData]=useState([]);
    const [tvalue,setTvalue]=useState(1);
    const [selected,setSelected]=useState(1);
    let count=1,papers=0;

    const callResult = async()=>{
        try {
            const res = await fetch('/AdminResult',{
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
                history.push('/ASignIn');
            }

        } catch (error) {
            console.log(error)
            history.push('/ASignIn');
        } 
    }

    const changeHandler = (e)=>{
        setTvalue(e.target.value);
    }

    const clickHandler = (e)=>{

        if(tvalue>=1 && tvalue <=papers){
         setSelected(tvalue);
        }else{
            window.alert("Result does not exists");
        }
    }


    useEffect(()=>{
        callResult();
    },[])


    return(
        <>

            <div className="container">
                <div className="col-md-10 col-10 mx-auto">
                                  <div className="row justify-content-center">
                                        <div className="col-md-4 col-6 mt-auto">
                                            <label for="exampleDataList" className="form-label text-white">Choose Paper</label>
                                                <input className="form-control bg-transparent border border-2" list="datalistOptions" id="exampleDataList" 
                                                name="paper"
                                                value={tvalue}
                                                onChange={changeHandler}
                                                placeholder="Type to search..."/>
                                                <datalist id="datalistOptions">
                                                <option value="1"/>
                                                <option value="2"/>
                                            </datalist>
                                        </div>
                                        <div className="col-md-3 col-6 mt-auto">
                                            <button type="button" className="btn btn-outline-primary text-white sendBtn border-0"
                                            onClick={clickHandler}>Search</button>

                                        </div>
                              </div>
                              </div>

            </div>
            <div className="container my-4 profile overflow-auto">
                  <div className="row">
                      <div className="col-md-10 col-10 mx-auto mt-2 ">
                          <div className="row justify-content-center">

                              {!userData[0]?<Loader/>:<div className="col-md-12 col-12 my-2 result">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Reg. No</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Maths</th>
                                            <th scope="col">Physics</th>
                                            <th scope="col">Algo</th>
                                            <th scope="col">OS</th>
                                            <th scope="col">Percentage</th>
                                            <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-white">
                                            {/* checking whether user data is fetched */}
                                            {userData.length>=1?
                                            userData[0].map((item)=>{
                                                if(item.marks.length>papers) papers=item.marks.length;
                                                return(
                                                    <>
                                                    <tr>
                                                    <th scope="row">{count++}</th>    
                                                    <td>{item.reg}</td>
                                                    <td>{item.name}</td>
                                                    {/* checking whether marks is not null  */}
                                                    {item.marks.length>=1?
                                                    item.marks.map((mark)=>{
                                                        const {maths,physics,algo,os}=mark;
                                                        return(
                                                            mark.id==selected?
                                                            <>
                                                            <td>{maths}</td>
                                                            <td>{physics}</td>
                                                            <td>{algo}</td>
                                                            <td>{os}</td>
                                                            <td>{(((parseInt(maths)+parseInt(physics)+parseInt(algo)+parseInt(os))/400)*100).toFixed(2)}%</td>
                                                            <td>{(parseInt(maths)+parseInt(physics)+parseInt(algo)+parseInt(os))>=200?<span style={{color:'lightgreen'}}>Passed</span>:<span style={{color:'#FF6666'}}>Failed</span>}</td>
                                                            </>:<>
                                                                </>
                                                        )
                                                    }):<>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                        </>}
                                                        </tr>    
                                                    </>
                                                )
                                            }):<></>
                                            }
                                        </tbody>
                                    </table>
                              </div>}
                              
                              

                          </div>

                      </div>

                  </div>
            </div>
        </>
    )

}

export default Result;