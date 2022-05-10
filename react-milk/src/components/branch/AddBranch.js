import React from 'react';
import {connect} from 'react-redux';
import GenerateForm from '../../utils/generateForm';

import { initTokenCheck, propTokenCheck, roleValidation } from '../../utils/validator';
import { branch } from '../../config/branch';
import { addNewBranch } from '../../actions/branch';

import {toast} from 'react-toastify';
import { clearMessage } from '../../actions/users';

class SubmitBranch extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
        this.submitBranch = this.submitBranch.bind(this);
    }
    
    componentDidMount(){  
        initTokenCheck(this.props);
        roleValidation(this.props);
    }

    static getDerivedStateFromProps(props, state) {
        propTokenCheck(props);
        roleValidation(props);
        let {userData:{branch:{message,messageCode}}}=props; 
        if(message){
            if(messageCode === "BC101"){
                toast.success(message);
                props.dispatch(clearMessage()); 
            }else if(message){
                toast.error(message);
                props.dispatch(clearMessage()); 
            }
        }
        return null;
    }

    submitBranch(data){
       this.props.dispatch(addNewBranch(data));
    }
    
    render(){
        let button= {
            submit:true,
            reset:true
        }
        return(
           <div className="container-fluid form-items mt-3 mb-55"> 
                <GenerateForm  data={branch} onSubmit={this.submitBranch} button={button} title="Add New Branch" />
              
           </div>
        )
    }
}
const mapStateToProps =(state)=>{
    return {
        userData:state
    }
}
export default connect(mapStateToProps)(SubmitBranch);