    import React from 'react';
    import {Link} from 'react-router-dom';
    import { connect } from 'react-redux';
    import { initTokenCheck } from '../utils/validator';
    import SalesmanImage from '../assets/img/salesman.png';
    import formerImage from '../assets/img/farmer.png';
    import idCardImage from '../assets/img/idcard.png';
    import payOnlineImage from '../assets/img/onlinepay.jpg';


    class About extends React.Component{
        constructor(props){
            super(props);
            this.state={
                        
            };
        }
        componentDidMount(){
            initTokenCheck(this.props);
        }
     
        render(){
            let {userData:{users}}=this.props;
            return(
                <div className="container-fluid p-2 text-dark">
                    <h5 className="text-center mt-3">About Us</h5>
                    {!(users && users.token) &&       
                        <div className="row about-us-row warning">
                            <span className="col-lg-6 col-md-6 col-sm-12" >
                                <label>Already have an account. </label>
                                <Link className="custom-link" to="/login"> Login Here</Link>
                            </span>
                           <span  className="col-lg-6 col-md-6 col-sm-12">
                                <label>Want to Register with us.</label>
                                <Link className="custom-link" to="/process"> Learn more</Link>
                           </span>
                            
                        </div>
                    }
                    <div className="row about-us-row">
                        <div className="col-lg-6 col-md-6 col-sm-12 about-us-col">
                        Delivering Fresh Milk since 1990. 
                        We have upgraded our services online during the pandemic situation in 2020. 
                        We have enabled the digital payment mode for hassle free transactions and customer convenience.
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 about-us-col">
                            <img className="about-us-img" src={SalesmanImage} alt="salesman"/>
                        </div>
                    </div>
                    <div className="row about-us-row ">
                        <div className="col-lg-6 col-md-6 col-sm-12 about-us-col">
                            <img className="about-us-img" src={formerImage} alt="former"/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 about-us-col">
                        We deliver the fresh milk directly from the dairy farmer after checking its authenticity through the fat checking machine and deliver the same to your doorstep.
                        We digitally connecting you with your local vendors. 
                        </div>
                    
                    </div>
                    <div className="row about-us-row">
                        <div className="col-lg-6 col-md-6 col-sm-12  about-us-col">
                        The authenticity and the quality of the milk remains pure as the milk can would be lock until delivery time to prevent adulteration.
                        We provide smart QR card for maintaining the bills and check the payment history whenever needed. 
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12  about-us-col">
                            <img className="about-us-id-img" src={idCardImage} alt="Idcard"/>
                        </div>
                    </div>
                    <div className="row about-us-row">
                    <div className="col-lg-6 col-md-6 col-sm-12  about-us-col">
                            <img className="about-us-img" src={payOnlineImage} alt="online pay"/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12  about-us-col">
                            The payments can be done through UPI, net banking, Google pay, Phonepe, Paytm and other payment options.
                        </div>
                    
                    </div>
                    <div className="centered-items mb-55">
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

    export default connect(mapStateToProp)(About) 