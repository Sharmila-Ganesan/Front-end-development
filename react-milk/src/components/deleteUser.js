import React from 'react';
import {connect} from 'react-redux';
import { deleteUser,clearMessage } from '../actions/users';
import GenerateForm from '../utils/generateForm';
import {toast} from 'react-toastify';


import { initTokenCheck, propTokenCheck, roleValidation } from '../utils/validator';
import { deleteUserForm, deleteConfirmPopup } from '../config/config';
import Popup from './Popup';

class DeleteUser extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userInfo:Array.from(deleteUserForm),
            popupData:Array.from(deleteConfirmPopup),
            showPopup:false
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){  
        initTokenCheck(this.props);
        roleValidation(this.props);
    }

    static getDerivedStateFromProps(props, state) {
        propTokenCheck(props);
        roleValidation(props);
        let {userData:{users:{message,messageCode}}}=props; 
        if(message){
            if(messageCode === "UD101"){
                toast.success(message);
            }else if(message){
                toast.error(message);
            }
            props.dispatch(clearMessage());
        }

        return null;
    }

    handleSubmit(e){
        try {
            let {data}= this.state;
            if (e && e.confirm  &&e.confirm.toLocaleLowerCase() === "delete") {
                this.props.dispatch(deleteUser(data))
            }
            this.setState({showPopup:false})
        } catch (error) {
            console.log(error);
        }
    
    }
    deleteUser(data){
        this.setState({data,showPopup:true})
    }
    
    render(){
        let {userInfo,popupData,showPopup}= this.state;
        let button= {
            submit:true,
            reset:true
        }
        return(
           <div className="container-fluid form-items mt-3 mb-55">
               <GenerateForm  data={userInfo} onSubmit={this.deleteUser} button={button} title="Delete User" />
               {showPopup && <Popup data={popupData} title="Confirmation"  onClose={()=>{this.setState({showPopup:false})}} onSubmit={this.handleSubmit}/>}
           </div>
        )
    }
}
const mapStateToProps =(state)=>{
    return {
        userData:state
    }
}
export default connect(mapStateToProps)(DeleteUser);