
import React from 'react';
import { clearMessage, getUser, updateUserDetails } from '../actions/users';
import {connect} from 'react-redux';
// import Edit from '../assets/img/edit.svg';
import { initTokenCheck, propTokenCheck, roleValidation } from '../utils/validator';

import {toast} from 'react-toastify';

import '../sass/profile.scss';
import { updateBankInfoForm, updateContactInfoForm } from '../config/signup';
import Popup from './Popup';

class MyDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isEditMode:false,
            details:{},
            location:''
        }   
        this.updateUserDetails=this.updateUserDetails.bind(this);
        this.openEditPopup=this.openEditPopup.bind(this);
    }

    componentDidMount(){
        initTokenCheck(this.props);
        roleValidation(this.props);
        this.props.dispatch(getUser())
    }

    static getDerivedStateFromProps(props,state){
        propTokenCheck(props);
        roleValidation(props);

        let {userData:{users:{allDetails,message,messageCode}}}=props;
        if(allDetails && JSON.stringify(allDetails) !== JSON.stringify(state.details)){
            return {details:allDetails,location:allDetails.location}
        }
        if(message){
            if(messageCode === "LU101"){
                toast.success(message);
                props.dispatch(getUser());
            }else{
                toast.error(message);
            }
            props.dispatch(clearMessage())
        }
        return null
    }
  
    updateUserDetails(data){
            let {mode} = this.state;
            data.mode = mode;
            if(mode === "bank"){
                if(data.beneficiaryAccount === data.confirmbankAccNumber){
                    delete data.confirmbankAccNumber
                }else{
                    return false;
                }

            }else{
                data.location = data.location.replace(' ','');  
            }
            this.props.dispatch(updateUserDetails(data));
            this.setState({isEditMode:false})
    }
    openEditPopup(mode){
        let {popupData,details} = this.state;
        if(mode === "contact"){
            popupData = Array.from(updateContactInfoForm);

        }else{
            popupData =Array.from(updateBankInfoForm);  
        }
      
        popupData.forEach(element => {
            let value = details[element.id];
            if(element.id === "location"){
                value = value.replace(',',', ')
            }
            if(value){
                element.value=value;
                element.default=value;
                element.err = false;
            }
        });
        this.setState({popupData,isEditMode:true,mode})            
    }
    render(){
        let {isEditMode,popupData,details} = this.state;
        return(
           <div className="container-fluid  mt-3  mb-55">

                <div className="profile-container">
                    <h4>Profile</h4>
                    <div className="profile-header">
                        <div className="qr-container">
                        {details.qrcode ? <img className="qr-img" 
                            src={details.qrcode} alt="QR code" />:"QR code"}
                        </div>
                        <br />
                        <h5 className="cap">{details.name}</h5>
                        <br />
                        <div className="account-details">
                            <div className="account-details-row"> 
                                <label className="profile-label">customer ID</label>
                                <p className="profile-value">{details.mobile}</p>
                            </div>
                            <div className="account-details-row"> 
                                <label className="profile-label">Secure Deposit</label>
                                <p className="profile-value">&#8377; {details.deposit}</p>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="contact">

                        <div className="contact-head">
                            <h5 >Contact Details</h5>
                            <span onClick={()=>this.openEditPopup("contact")}>
                                <label className="m-2 contact-value">Edit</label>
                                <i className="fa fa-edit"/>
                            </span> 
                        </div>

                        <div className="contact-row">
                            <label className="contact-label" >Customer Name</label>
                            <p className="contact-value">{details.name}</p>
                        </div>
                        <div className="contact-row">
                            <label className="contact-label" >Email</label>
                            <p className="contact-value">{details.email}</p>
                        </div>
                        <div className="contact-row">
                            <label className="contact-label" >Location</label>
                            <p className="contact-value">
                            <a rel="noopener noreferrer" 
                                    target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${details.location}`}>View on Map</a>  
                               </p>
                        </div>
                        <div className="contact-row">
                            <label className="contact-label" >Address</label>
                            <p className="contact-value">{details.address}</p>
                        </div>
                        <div className="contact-row">
                            <label className="contact-label" >Pincode</label>
                            <p className="contact-value">{details.pincode}</p>
                        </div>
                    </div>

                    <br />

                    <div className="contact">

                        <div className="contact-head">
                            <h5 >Bank Information</h5>
                            <span onClick={()=>this.openEditPopup("bank")}>
                                <label className="m-2 contact-value">Edit</label>
                                <i className="fa fa-edit"/>
                            </span> 
                        </div>
    
                        <div className="contact-row">
                            <label className="contact-label" >Account Number</label>
                            <p className="contact-value">{details.beneficiaryAccount}</p>
                        </div>
                        <div className="contact-row">
                            <label className="contact-label" >IFSC code</label>
                            <p className="contact-value">{details.beneficiaryIFSC}</p>
                        </div>
                    </div>
                </div>
                {
                    isEditMode ? <Popup  data={popupData} title="Edit Details"  onClose={()=>{this.setState({isEditMode:false})}} onSubmit={this.updateUserDetails} />:null
                }
                {/* {
                    details &&  
                    <div className="row align-items-center">
                       <span className="col-md-4 col-sm-12">
                            {details.qrcode ? <img className="card-img-top" 
                            src={details.qrcode} alt="QR code" />:null}
                       </span>
                       <div className="col-md-5 col-sm-12">
                           <h5> Personal Details</h5>
                                <div className="row" key="name">
                                    <span className="col-4 text-left ">Name </span>
                                    <span className="col-8 text-left">{": "+details.name}</span>           
                                </div>
                                <div className="row" key="mobile">
                                    <span className="col-4 text-left ">Mobile </span>
                                    <span className="col-8 text-left">{": "+details.mobile}</span>           
                                </div>
                                <div className="row" key="branch">
                                    <span className="col-4 text-left ">Branch </span>
                                    <span className="col-8 text-left">{": "+details.branchcode}</span>           
                                </div>
                                <div className="row" key="deposit">
                                    <span className="col-4 text-left ">Deposit </span>
                                    <span className="col-8 text-left">{": "+details.deposit}</span>           
                                </div>
                                <div className="row" key="location">
                                    <span className="col-4 text-left ">Location </span>
                                    {
                                        edit ? <div className="col-8"> : 
                                                <input type="text" className="input-bottom" value={location} onChange={this.hanldeChange}/>
                                                <p>Please open map and copy the location cooridinates </p>
                                                {msg && <span className="text-danger">{msg}</span>}
                                                <span className="centered-items">
                                                    
                                            
                                                <button className="btn btn-primary m-1" onClick={this.updateUserDetails}>Save</button>
                                                <button className="btn btn-danger"  onClick={()=>this.setState({edit:false,location:details.location})}>Cancel</button>
                                                </span>
                                              
                                                </div> :
                                        <React.Fragment>
                                        <span className="col-5 text-left txt-overflow">{":"+details.location} </span>
                                            <span className="col-3" onClick={()=>this.setState({edit:true})}>
                                                <i className="fa fa-edit"/>
                                            </span>
                                        </React.Fragment>
                                    }
                                    
                                </div>
                           
                                    <a className="btn btn-primary" rel="noopener noreferrer" 
                                    target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${details.location}`}>Open Map</a>          
                            
                        </div>                      
                    </div>
                } */}
               
           </div>
        )
    }
}

const mapStateToProps =(state)=>{
    return {
        userData:state
    }
}
export default connect(mapStateToProps)(MyDetails);