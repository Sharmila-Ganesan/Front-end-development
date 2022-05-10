import React from 'react';
import { connect } from 'react-redux';
import LoginConfig from '../config/login';

import {toast} from 'react-toastify';

// functions
import {login,verifyMobile, clearMessage,  resetPassword} from '../actions/users'
import { onOtpRequest, validateOtp } from '../utils/firebase';



// components
import GenerateForm from '../utils/generateForm';
import ResetPassword from '../components/password';
import Loader from '../utils/Loader';
import '../sass/login.scss'

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userInfo:LoginConfig.mobile,
            isNew:true,
            otp:false,
            title:"Login into Sivalingam Milks",
            isLoading:false
        };

        this.verifyUser = this.verifyUser.bind(this);
        this.resetRequest = this.resetRequest.bind(this);
       
    }
    static getDerivedStateFromProps(props, state) {
        let{userInfo}=state;
        let {userData:{users:{message,messageCode,token,isNew}}}=props;
        let title="Login into Sivalingam Milks";
        if(message || messageCode){

            if(messageCode === "UL101"){
                toast.success(message);
                localStorage.setItem('token',token);
                props.dispatch(clearMessage()); 
                setTimeout(()=>{
                    props.history.replace('/home');
                },1000)
                
            }else if( messageCode === "UPR101"){
                toast.success(message);
            }else if( messageCode === "UM101"){
                toast.success(message);
            }else if(message){
                props.dispatch(clearMessage()); 
                toast.error(message);
                return {isLoading:false}
            }
           
            if(messageCode === "UPR101"){
                userInfo=LoginConfig.mobile;
                props.dispatch(clearMessage()); 
                return {userInfo,isNew,mobile:"",title,otp:false,isLoading:false}
            }

            if(messageCode === "UM101"){
                props.dispatch(clearMessage()); 
                if(isNew){
                    title="Enter OTP";
                    let mobile ="+91"+state.mobile;
                    onOtpRequest(mobile).then(()=>{
                        toast.success("OTP sent to registed mobile");
                        
                    }).catch(()=>{
                        toast.error("something went wrong")
                    });
                    
                    userInfo=LoginConfig.code;
                    title="Enter Received OTP"
                }else{
                    userInfo=LoginConfig.password;
                    title="Enter your password"
                }
               
                return {isNew,userInfo,title,isLoading:false}
            }else if(messageCode === "OT101"){
                userInfo=LoginConfig.code;
                return {userInfo,isNew,title,isLoading:false}
            }

        }
        
        return null;
    }
    verifyUser(data){
        let {mobile,otp}=this.state;
        if(data.mobile){
            
            this.setState({mobile:data.mobile,isLoading:true});
            this.props.dispatch(verifyMobile(data));
        }else{
            data["mobile"]=mobile;
            this.setState({isLoading:true})
            if(data.code){
                // verification
                // this.props.dispatch(verifyOtp(data))
                validateOtp(data.code).then(()=>{
                  
                    toast.success("OTP verified");
                    otp=true;
                    this.setState({otp,isLoading:false})
                }).catch((err)=>{
                    toast.error("Invalid OTP")
                    this.setState({isLoading:false})
                    
                })
            }else if(data.password){  
                this.props.dispatch(login(data));
            }else if(data.newPassword){
                data["password"]=data.newPassword
                let temp={
                    mobile,
                    password:data.newPassword
                }
                this.props.dispatch(resetPassword(temp));
            }
        } 
    }
    resetRequest(){
        let{mobile,userInfo,title}=this.state;
        // this.props.dispatch(requestOtp({mobile}));
        this.setState({isLoading:true})
        mobile ="+91"+mobile;
        onOtpRequest(mobile).then(()=>{
            toast.success("OTP sent to registed mobile");
            userInfo=LoginConfig.code;
            title="Enter OTP"
            this.setState({userInfo,title,isLoading:false})
        }).catch(()=>{
            toast.error("something went wrong");
            this.setState({isLoading:false})
        });
    }
  
    render(){
        let {userInfo,otp,isNew,mobile,title,isLoading}= this.state;
        let button= {
            submit:true,
            reset:false
        }
        return(
        <React.Fragment>    
            <div className="row login mb-55">
                <div className="p-0 col-md-6 col-xl-6 col-sm-12 login-bg">
                    <div className="login-banner">
                        <span>
                        <h3>Welcome back to Sivalingam Milks</h3>
                        <p>To track your milk purchases, 
                            <br />
                            Pay your bills ,please use your personal information mobile number 
                            <br />
                            and password to login with us</p>
                        </span>
                      
                    </div>
                       
                </div>
                <div className="p-0 col-md-6 col-xl-6 col-sm-12">
                    <div className="login-form">
                        <span className="login-form-container">
                       
                        {otp ? <ResetPassword onSubmit={this.verifyUser}/> : 
                            <GenerateForm data={userInfo}  onSubmit={this.verifyUser} title={title} button={button}/>}
                        {!isNew && mobile? <div className="custom-link text-center" onClick={this.resetRequest}>
                            Forget Password?</div>:""}

                        </span>
                     
                    </div>
                   
                </div>
            </div>

        
           {isLoading ? <Loader />:null}
        </React.Fragment> )
    }
}


const mapStateToProp = (state)=>{
    return {
        userData:state
    }
}

export default connect(mapStateToProp)(Login)