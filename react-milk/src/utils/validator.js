import {verify} from '../actions/users';
import { RouteAcccess } from '../config/config';

 export const customerIdValidation = (value)=>{
    value = value.trim()
    if(value && value.length >= 3){
        return value;
    }
    return false;
 }
 export const nonZeroValidation = (value)=>{
    if(value >0){
        return true;
    }
    return false;
 }

 export const requiredValidation = (value)=>{
     if(value){
         return true;
     }else{
         return false;
     }
 }

 export const  lengthValidation = (value,min,max)=>{
    if(value && value.length >= min && value.length <= max){
        return true;
    }
    return false;
 }

 export const  phoneNumberValidation = (value) =>{
    let pattern = new RegExp("^[6-9][0-9]{9}$")
    if(value && pattern.test(value)){
        return true;
    }
    return false;
 }
 
 export const  emailValidation = (value)=>{
    let pattern=new RegExp("^[a-zA-Z0-9_ \.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$"); //eslint-disable-line
    if(value && pattern.test(value) ){
        return true;
    }
    return false;
 }

 export const locationValidation = (value) =>{
      // eslint-disable-next-line
   let pattern = new RegExp("^[0-9]{1,2}[\.][0-9]{5,16}\, [0-9]{1,2}[\.][0-9]{5,16}$");
   if(value && pattern.test(value) ){
        return true;
   }
   return false;
 }

 export const initTokenCheck =(props)=>{
    try{
        let browserToken = localStorage.getItem('token');
        if(!browserToken){
            props.history.push('/about');
        }
        else{
            let {userData:{users:{token}}}=props;
            if(!token) props.dispatch(verify());
        }
    }catch(err){

    }
    
 }

 export const propTokenCheck =(props)=>{
    let {userData:{users:{token}}}=props;
    if(!token){
        let browserToken = localStorage.getItem('token');
        if(!browserToken){
            props.history.push('/about');
        } 
    }
 }

 export const roleValidation =(props)=>{   
    let {userData:{users:{userInfo}},match:{url}} =props;
    let accessRoles= [];
    if(url && userInfo){

        let path = url.replace(/\/?\?[a-z=0-9]+/gi,"");
        path = path.replace('/','')
        accessRoles=RouteAcccess[path];
        if(accessRoles && accessRoles.length>0 && 
            accessRoles.indexOf(userInfo.role) !== -1){
            return true;
        }else{
            props.history.push('/home');
        } 
    }  
 }