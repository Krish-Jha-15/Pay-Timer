import React,{ useEffect} from "react";
import axiosInstanc from "./api/Axios.jsx";
import App from "./App.jsx";

function Testcomponent(){
    useEffect(()=>{
        axiosInstanc.get("/test")
        .then(res=>console.log(res.data))
        .catch(err=>console.log("error !!!",err))
    },[])
     return <div>Check console for test response</div>;
}

export default Testcomponent