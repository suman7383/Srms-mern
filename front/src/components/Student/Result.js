import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const SResult = () =>{
    const history = useHistory();
    const [selected, setSelected] = useState("1");
    const [marks,setMarks]=useState([]);
    const [paper,setPaper]=useState(0);

    const callResult = async()=>{
        try {
            const res = await fetch('/StudentResult',{
                method : "GET",
                headers : {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            setPaper(data.data);
            console.log(paper)

            if(!res.status===200){
                window.alert("Result does not exists");
            }

        } catch (error) {
            console.log(error)
            history.push('/');
        } 
    }

    const clickHandler = async()=>{
        try {

            if(selected<=0 || selected>paper){
                window.alert("Result Does not Exists");
            }else{
            const res = await fetch('/StudentMarks',{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({selected}),
                credentials:"include"
            });

            const resData= await res.json();

            if(resData){
                setMarks([resData.mark]);
            }
            if(res.status===400 || !resData) {
            window.alert("Result Does not exists");
        }else if(res.status===500){
            window.alert("Internal Server Error");
        }
    }
        } catch (error) {
            console.log(error)
            window.alert("Error Fetching Marks");
        } 
    
    }

   const inputHandle =(e)=>{
        setSelected(e.target.value);
        console.log(selected);
   }

    useEffect(()=>{
        callResult();
    },[])


    return(
        <>

            <div className="container mt-5 profile overflow-auto">
                  <div className="row">
                      <div className="col-md-10 col-10 mx-auto mt-3">
                          <div className="row justify-content-center">
                              <div className="col-md-10 col-10">
                                   <div className="row justify-content-center">
                              <div className="col-md-4 col-6 mt-auto">
                                <label for="exampleDataList" className="form-label text-white">Choose Paper</label>
                                    <input className="form-control bg-transparent border border-2" list="datalistOptions" id="exampleDataList" 
                                    name="paper"
                                    value={selected}
                                    onChange={inputHandle}
                                    placeholder="Type to search..."/>
                                    <datalist id="datalistOptions">
                                    <option value="1"/>
                                    <option value="2"/>
                                </datalist>
                              </div>
                              <div className="col-md-3 col-6 mt-auto">
                                <button type="button" className="btn btn-outline-primary border-2" onClick={clickHandler}>Search</button>

                              </div>
                              </div>
                              </div>
                              <div className="col-md-10 col-12 mx-auto mt-4">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">Subject</th>
                                            <th scope="col">Marks</th>
                                            
                                            </tr>
                                        </thead>
                                        <tbody className="text-white">
                                            {marks.length>=1 && marks!==undefined?
                                            marks.map((mark)=>{
                                                return (
                                                    <>
                                                    <tr>
                                                        <th scope="row">Maths</th>
                                                        <td>{mark?mark.maths:<>-</>}</td>
                                                    </tr>
                                                    <tr>    
                                                        <th scope="row">Physics</th>
                                                        <td>{mark?mark.physics:<>-</>}</td>
                                                    </tr>
                                                    <tr>    
                                                        <th scope="row">Algo</th>
                                                        <td>{mark?mark.algo:<>-</>}</td>
                                                    </tr> 
                                                    <tr>    
                                                        <th scope="row">OS</th>
                                                        <td>{mark?mark.os:<>-</>}</td>
                                                    </tr>  
                                                    <tr>    
                                                        <th scope="row">-</th>
                                                        <td>-</td>
                                                    </tr>  
                                                    <tr>    
                                                        <th scope="row">Percentage</th>
                                                        <td>{mark?(((parseInt(mark.maths)+parseInt(mark.physics)+parseInt(mark.algo)+parseInt(mark.os))/400)*100).toFixed(2)+"%":<>-</>}</td>
                                                    </tr>
                                                    <tr>    
                                                        <th scope="row">Status</th>
                                                        <td>{mark?((parseInt(mark.maths)+parseInt(mark.physics)+parseInt(mark.algo)+parseInt(mark.os))>=200?"Passed":"Failed"):<>-</>}</td>
                                                    </tr> 
                                                    </>
                                                    
                                                ) 
                                            }):<></>}
                                        </tbody>
                                    </table>
                              </div>

                          </div>

                      </div>

                  </div>
            </div>
        </>
    )

}

export default SResult;