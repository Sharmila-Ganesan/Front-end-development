import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import SalesmanImage from '../assets/img/salesman.png';
import idCardImage from '../assets/img/idcard.png';

class ProcessFlow extends React.Component{
    constructor(props){
        super(props);
        this.state={
                    
        };
       
    }

    render(){
        return(
            <div className="container-fluid p-2 text-dark">
                <h5 className="text-center mt-3">Sign Up Process</h5>
                <div className="row about-us-row warning">
                        <p><strong>Note: </strong> We provide fresh milk only in the region where we established our buisness</p>
                </div>
                <div className="row about-us-row centered-items">
                 
                    <div className="col-md-6 col-sm-12 text-justify">
                        <br />
                       
                        <p><strong>Step 1: </strong> Please check our service available in your region. To check our service <Link className="custom-link" to="/searchbranch">click here</Link> </p>
                        <p><strong>Step 2: </strong> If service available in your region, please contact the branch manager mobile. He/She will help you in registeration.</p>
                        <p><strong>Step 3: </strong> Please provide neccesary information that is required for registeration and you will be verifed by mobile OTP, 
                        Still need help! , our salesman will come to your doorstep for registeration</p>
                        <p><strong>Step 4: </strong> Once Registeration completed, you can login into our website or application. for the first time it will ask for password reset with OTP verification.
                        please set your password for secure login.</p>
                        <p><strong>Step 3: </strong> You can collect your Smart Card from our branch to avail onine services. </p>


                    </div>
                    <div className="col-md-6 col-sm-12">
                    <img className="img-fluid" src={SalesmanImage} alt="salesman"/>
                    </div>
                </div>
                <div className="row about-us-row centered-items">
                    <div className="col-md-6 col-sm-12">
                        <img className="img-fluid" src={idCardImage} alt="idCard"/>
                    </div>
                    <div className="col-md-6 col-sm-12 text-justify">
                    <h5>Benefits of Registered Customer</h5>
                    <ul>
                        <li>Show your smartcard to our salesman to get milk as per your need </li>
                        <li>Can track your purchases</li>
                        <li>Pay Bill online</li>
                        <li>Can view Payment History</li>
                        <li>Can contact us via Email / Whatsapp for Queries</li>

                    </ul>
                    </div>
                   
                </div>
               
                <div className="centered-items">
                    <h6 > 
                        <Link className="custom-link text-center" to="/terms">Terms and Condition</Link>     
                        <span> | </span>
                        <Link className="custom-link text-center" to="/privacy">Privacy Policy</Link>  
                        <span> | </span>
                        <Link className="custom-link text-center" to="/refund">Refund Policy</Link>  
                    </h6>
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

export default connect(mapStateToProp)(ProcessFlow) 