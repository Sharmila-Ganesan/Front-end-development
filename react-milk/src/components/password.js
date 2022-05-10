import React from 'react';
import GenerateForm from '../utils/generateForm';
import SignupConfig from '../config/signup';


class Password extends React.Component{
    constructor(props){
        super(props);
        this.state={
            metadata:SignupConfig.resetpassword,
            message:""
        }
        this.resetPassword=this.resetPassword.bind(this);
    }

    resetPassword(data){
        if(data.confirmPassword !== data.newPassword){
            setTimeout( ()=>{
                this.setState({message:""})
            },3000);
            return this.setState({message:"Incorrect confirm password"})
        }    
        return this.props.onSubmit(data)
    }

    render(){
       let {metadata,message}=this.state;
       let button= {
        submit:true,
        reset:true
        }
        return(
          <div>
            <GenerateForm data={metadata} onSubmit={this.resetPassword} button={button} title={"Reset Password"}/>
            <p className="text-danger">{message}</p>
          </div>
        )
    }
}

export default Password;