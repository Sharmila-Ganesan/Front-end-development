import React from 'react';
import {connect} from 'react-redux';
import GenerateForm from '../utils/generateForm';

import {toast} from 'react-toastify';

import { initTokenCheck, propTokenCheck, roleValidation } from '../utils/validator';
import { getUserById, updateUserAccess, clearMessage } from '../actions/users';


class UserControl extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userInfo:[
                {
                    id:"name",
                    title:"Customer Name",
                    type:"text",
                    placeholder:'Scan QrCode',
                    value:"",
                    default:"",
                    readOnly:true,
                    qrcode:true,
                    rules:{
                        required:true,
                    }
                   
                }
            ],
            showbtn:false,
            details:[],
            flag:false
        }
        this.getUser=this.getUser.bind(this);
        this.controlUser=this.controlUser.bind(this);
       
    }
    componentDidMount(){
        initTokenCheck(this.props);
        roleValidation(this.props);
    }
     
    static getDerivedStateFromProps(props,state){
        propTokenCheck(props);
        roleValidation(props);
        let {userData:{users:{userDetails,message,messageCode}}}=props;
        if(message){
            if(messageCode === "UA101"){
                toast.success(message);
                return {details:[],flag:false}
            }else{
                toast.error(message);
            }
            props.dispatch(clearMessage())
        }
        if(userDetails && JSON.stringify(userDetails) !== JSON.stringify(state.details)){
            return {details:userDetails,flag:true}
        }
        return null
    }

    getUser(data){
        this.props.dispatch(getUserById(data))
    }

    controlUser(){
        let {details}=this.state;
        this.props.dispatch(updateUserAccess(details))
    }

    render(){  
        let {userInfo,flag,details}=this.state;
        let button= {
            submit:true,
            reset:true
        }
          return(
              <div className="container-fluid mt-3 form-items  mb-55">

                  {
                      flag ? 
                      <div>
                          <div className="row">
                            <span>Name:</span>
                            <span>{details.name}</span>
                          </div>
                          <div className="row">
                            <span>Mobile:</span>
                            <span>{details.mobile}</span>
                          </div>
                          <div className="row">
                            <button className="btn btn-primary" onClick={this.controlUser}>{details.isDeleted ? "Enable":"Disable"}</button>
                          </div>
                        </div>
                      :
                      <GenerateForm  data={userInfo} onSubmit={this.getUser} button={button} title="Enter User Id" />
                  }
                
              </div>
           
        )
    }
}
const mapStateToProps =(state)=>{
    return {
        userData:state
    }
}
export default connect(mapStateToProps)(UserControl)