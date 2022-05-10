import React from 'react';
import { connect } from 'react-redux';

// functions
import {signUp,clearMessage} from '../actions/users';
import SignupConfig, { setGeoLocation } from '../config/signup';
import { initTokenCheck, propTokenCheck,roleValidation } from '../utils/validator';
import LoginConfig from '../config/login';
import {toast} from 'react-toastify';


// components
import GenerateForm from '../utils/generateForm';
import { onOtpRequest, validateOtp } from '../utils/firebase';
import Loader from '../utils/Loader';
import { getAvailableBranches } from '../actions/branch';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            metadata: Array.from(SignupConfig.signup),
            flag:false,
            availableBranch:[]
        };

        this.createUser = this.createUser.bind(this);
        this.requestServerOtp = this.requestServerOtp.bind(this);
    }
    componentDidMount(){
        try{
            initTokenCheck(this.props);
            roleValidation(this.props);
            let {userData:{users:{userInfo:{role}}}}=this.props; 
            if(role && role === "admin"){
                this.props.dispatch(getAvailableBranches());
            }
        }catch(err){
            console.log(err)
        }
    }
    static getDerivedStateFromProps(props,state) { 
        try{
            propTokenCheck(props); 
            roleValidation(props); 
            let {metadata,flag}=state;
            let {userData:{users:{userInfo:{role},message,messageCode},branch:{availableBranch}}}=props; 
            if(role && role === "admin"){
                if(JSON.stringify(availableBranch) !== JSON.stringify(state.availableBranch)){
                    return {availableBranch}
                }
            }
            if(message){
                metadata=Array.from(SignupConfig.signup);
                flag=false;
                if(messageCode === "UC101"){
                    toast.success(message);
                    if(role && role === "admin"){
                        props.dispatch(getAvailableBranches());
                    }
                    props.dispatch(clearMessage()); 
                    return {metadata,flag,isLoading:false}
                }else if(message){
                    toast.error(message);
                    props.dispatch(clearMessage()); 
                    return {isLoading:false,metadata,flag};
                }
                            
            }

            return null;
      
        }catch(err){
            console.log(err)
        }
    }

    async openMap(){
        await setGeoLocation();
        let mapUrl=`https://www.google.co.in/maps/@${localStorage.getItem('position')},18z`;
        window.open(mapUrl, "_blank") 
    }
    createUser(code){
        // verifying otp
        try{
            let {data}=this.state;
            if(data && data.mobile);
            this.setState({isLoading:true})
            if(code){
               
                validateOtp(code.code).then(()=>{
                    console.log("success");
                    toast.success("OTP verified");
                    this.props.dispatch(signUp(data));
                }).catch((err)=>{
                    this.setState({isLoading:false})
                    toast.error("Invalid OTP")
                    console.log("failure")
                })
            }
            
        }catch(err){
            console.log(err);
        }
       
    }

    requestServerOtp(data){
        try{
            
            this.setState({data,isLoading:true});
            let mobile ="+91"+data.mobile;
            onOtpRequest(mobile).then(()=>{
                toast.success("OTP sent to registed mobile");
                this.setState({metadata:[...LoginConfig.code],flag:true,isLoading:false})
            }).catch(()=>{
                this.setState({isLoading:false})
                toast.error("something went wrong")
            });
        }catch(err){
            console.log(err);
        }
    }
    render(){
        let {metadata,flag,isLoading,availableBranch}= this.state;
        let title,method;
        let button= {
            submit:true,
            reset:true
        }
        if(flag){
            title="Enter OTP to continue";
            method=this.createUser;
        }else{
            let {userData:{users:{userInfo:{role}}}}=this.props; 
            if(role && SignupConfig[role]){
                metadata=metadata.concat(SignupConfig[role]);
                if(role === "admin" ){
                    let index = metadata.findIndex((obj=> obj.id === "branchcode"));
                    let data = metadata[index];
                    if(availableBranch.length >0){
                        availableBranch.forEach(element => {
                            data.options.push({
                                key:element.branchcode,
                                value:element.branchname
                            })
                        });
                        data.options=data.options.filter((obj,index,self)=> index === self.findIndex((item) =>(item.key === obj.key)))
                    }else{
                        data.options=[
                            {
                                key:"select",
                                value:"Select Value",
                                isDefault:true
                            }
                        ]
                    }
                  
                }
            }
          
            title ="Register User";
            method=this.requestServerOtp;
        }
        return(
        <div className="container-fluid form-items mt-3 mb-55">      
            <GenerateForm data={metadata} onSubmit={method} button={button} title={title} />
            {isLoading ? <Loader />:null}
        </div>
         )
    }
}

// <a className="custom-nav-link" rel="noopener noreferrer" 
// target="_blank" href={`https://www.google.com/maps/d/edit?mid=1bXZMbOUAJzvelfZQDr0CFGJXzh2OswES&usp=sharing`}>Mark on Map</a>
const mapStateToProp = (state)=>{
    return {
        userData:state
    }
}

export default connect(mapStateToProp)(SignUp)