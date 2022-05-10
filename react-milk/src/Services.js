import axios from 'axios';
import {toast} from 'react-toastify';

export default async function apiRequest(method,path,data,subType){
   
    // Setting the headers 
    // let url= process.env.URL
    let url = "/api/";
        // url=""   //for dev uncomment this -- no url required
    let requestOptions={
        url:url+path,
        method:method,
        headers:{},
        timeout: 1000 * 3

    }
    // handling query and path parms
    if(subType && data){
        if(subType === "query"){
            requestOptions.url += "?"
            for (const [key, value] of Object.entries(data)) {
                requestOptions.url+=key+"="+value+"&";
            }
        }else if(subType === 'path'){ // eslint-disable-next-line
            for (const [key, value] of Object.entries(data)) {
                requestOptions.url += "/"+value;
            }
        }
    }
    //setting the data body for post and put request
    if(method === "post" || method ==='put' || method === "delete"){
        requestOptions['headers']['Content-Type']='application/json';
        requestOptions['data']=data;
    }

    //adding auth token to all services except user
    
    if(path !== "login"){
        let token =`Bearer ${localStorage.getItem('token')}` 
        requestOptions["headers"] ={'Authorization':  token}
    }
    // console.log("requestOptions",requestOptions)

    //calling API
  

    try{
        let data = await axios(requestOptions);
        // console.log("data -received ",data);
        return data;
        
    }
    catch(err){
        console.log("err-reeived",err.response);       
        if(err.status === 401 ){
            localStorage.removeItem('token');
            window.location.replace('/login');
        }else if(err.status === 403){
            window.location.replace('/home');
        }else if(err.status > 404){
            if(document.getElementById('customloader')){
                document.getElementById('customloader').remove();
            }
            toast.error('something went wrong');
        }
        return err.response;
    }
}