import React from 'react';
import { connect } from 'react-redux';
import { getBranchDetails, verify } from '../actions/users';
// import contactImage from '../assets/img/contact.png';


 class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state={
                branchInfo:""    
        };
       
    }
    componentDidMount(){
        let browserToken = localStorage.getItem('token');
        let {userData:{users}}=this.props;
        if(browserToken){
            let {userData:{users:{token}}}=this.props;
            if(!token) this.props.dispatch(verify());
        }
        if(users && users.token && users.userInfo && !users.branchInfo){
            let branchcode=users.userInfo.branchcode;
            if(branchcode)
            this.props.dispatch(getBranchDetails({branchcode}));
        }
       
    }
    static getDerivedStateFromProps(props, state) {
        let {userData:{users}}=props;
      
        if(users.branchInfo !== state.branchInfo){
           let branchInfo = users.branchInfo
           return {branchInfo}
        }
        if(users && users.token && users.userInfo && !users.branchInfo){
            let branchcode=users.userInfo.branchcode;
            if(branchcode)
            props.dispatch(getBranchDetails({branchcode}));
        }
        return null;
    }

    render(){
        let {branchInfo}=this.state;
        return(
            <div className="centered-items mt-3">
                <div className="container-fluid">
                   
                <h5 className="text-center"> Contact Us </h5>
                <br />
                {
                    branchInfo && (
                        <div className="contact-wrapper">
                            <h5>Branch Address</h5>
                            <p>{branchInfo.branchname}</p>
                            <p>{branchInfo.address+"-"+branchInfo.pincode}</p>
                            
                            <p>{"Email: "+branchInfo.email}</p>
                            <p>{"Mobile: +91 "+branchInfo.managedBy}</p>
                            <a className="btn btn-primary m-1" rel="noopener noreferrer" 
                            target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${branchInfo.location}`}>Locate Us</a>
                            <button className="btn btn-primary">
                                <i className="fa fa-whatsapp"></i>
                                <a className="custom-nav-link" rel="noopener noreferrer" 
                                target="_blank" href={"https://wa.me/=91"+branchInfo.managedBy} > 
                                &nbsp;Chat with Branch Manager</a>
                            </button>
                            <br />
                            <br />
                        </div>
                    )
                }
                
                <div className="contact-wrapper mb-55">
                <h5>HQ Address</h5>
                <p>Ms.Sivalingam Milks,</p>
                <p>139, Vinobaji Colony,
                    Bodinayakanur,
                    Theni,TamilNadu -625513</p>
                <p>Email: sivalingammilks.cc@gmail.com</p>
                <p>Mobile: +91 7418489314</p>
                <button className="btn btn-primary">
                    <i className="fa fa-whatsapp"></i>
                    <a className="custom-nav-link" rel="noopener noreferrer" 
                    target="_blank" href="https://wa.me/=917418489314" > 
                    &nbsp;Chat with us</a>
                </button>
                </div>
            </div>

            </div>
                    )
    }
}
const mapStateToProp = (state)=>{
    return {
        userData:state
    }
}

export default connect(mapStateToProp)(Contact)