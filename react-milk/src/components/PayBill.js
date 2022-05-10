
import React from 'react';
import {connect} from 'react-redux';
import { getUnpaidDetails, makePayment, requestPayment } from '../actions/payment';
import { collectBillConfirmPopup, MONTH } from '../config/config';

import {toast} from 'react-toastify';
import { initTokenCheck, propTokenCheck, roleValidation } from '../utils/validator';
import { clearMessage } from '../actions/users';
import { loadPaymentScript, paymentGatewayConfig } from '../utils/utils';
import Loader from '../utils/Loader';
import Popup from './Popup';

class PayBill extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            unpaidDetails:[],
            paidDetails:[],
            totalAmount:0,
            totalBillIds:[],
            mode:"",
            data:"",
            paymentDetails:"",
            isLoading:false,
            paytmCallback: this.paytmCallback.bind(this),
            popupData:Array.from(collectBillConfirmPopup)
        }
        this.payBill=this.payBill.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    
    componentDidMount(){
        loadPaymentScript();
        initTokenCheck(this.props);
        let {mode,data}= this.props;
        if(mode === "collect"){
            this.setState({mode,data})
            this.props.dispatch(getUnpaidDetails(data));   
        }else {
            roleValidation(this.props);
            this.props.dispatch(getUnpaidDetails());
        }
        
    }

    static getDerivedStateFromProps(props,state){
        propTokenCheck(props);
        let {userData:{payment:{unpaidDetails,message,messageCode,order}}}=props;
        let {mode,data,paytmCallback}=state;
        if(message){
            if(messageCode === "PM101"){
                toast.success(message);
                if(mode === "collect"){
                    props.dispatch(getUnpaidDetails(data));   
                }else {
                    roleValidation(props);
                    props.dispatch(getUnpaidDetails());
                }
            }
            if(messageCode === 'PAR101'){
                if(order){
                    paymentGatewayConfig(order,paytmCallback);
                }
                
            }
            props.dispatch(clearMessage())
        }
        
        if(unpaidDetails && state.unpaidDetails !== unpaidDetails){
            let totalAmount=0;
            let totalBillIds=[];
            unpaidDetails.forEach(element => {
                totalAmount += element.price;
                totalBillIds= totalBillIds.concat(element.billIds);
            });
            return {unpaidDetails,totalAmount,totalBillIds}
        }
        return null
    }
    paytmCallback(eventName,data){
        this.setState({isLoading:false});
        // console.log("notifyMerchant handler function called");
        // console.log("eventName => ",eventName);
        // console.log("data => ",data);
        if(eventName === 'SESSION_EXPIRED'){             
            alert("Your session has expired!!");
            window.location.reload();
        }
      } 

    payBill(mode,period,element){
        let {userData:{users:{userInfo:{mobile}}},data} = this.props;
        let temp={};
        if(mode==="total"){
            let {totalBillIds,totalAmount}=this.state;
            temp={
                billIds:totalBillIds, 
                price:totalAmount,
                customerId:mobile,
                period,
            }
        }else{
            let {billIds,price,type}= element;
             temp ={
                billIds,
                price,
                period,
                customerId:mobile,
                type
            }
        }
        if(data && data.mobile){
            temp.customerId = data.mobile;
            this.setState({temp,showPopup:true})
           
        }else{
            this.props.dispatch(requestPayment(temp));
        }
        this.setState({paymentDetails:temp,isLoading:true});  
    }

    handleSubmit(e){
        try {
            let {temp}= this.state;
            if (e && e.confirm  && e.confirm.toLocaleLowerCase() === "collect") {
                this.props.dispatch(makePayment(temp));
            }
            this.setState({showPopup:false,isLoading:false})
        } catch (error) {
            console.log(error);
        }
    
    }

    render(){
        let {unpaidDetails,isLoading,showPopup,popupData}=this.state;
        let details =unpaidDetails && unpaidDetails.length>0 ?unpaidDetails:[];
        
        return(
           <div className="container-fluid mt-3  mb-55">
                <h4 className="text-center" >Pay Bill</h4>
             
             {
                 details && details.length >0 ? 
                 <div className="pay-bill-wrapper">
                 <div className="font-weight-bold mt-3 text-center">
                 <span className="col-5">{"PERIOD"}</span>
                 <span className="col-3">{"AMOUNT"}</span>
                 <span className="col-4">{"ACTION"}</span>
                </div>
                    {details.map((element,index)=>{
                        let year,month;
                        if(unpaidDetails && unpaidDetails.length >0){
                            year =element.year;
                            month=element.month-1;
                        }
                        let period = MONTH[month].slice(0,3)+"-"+year;
        
                     return(
                         <div className="pay-bill-items" key={index}>
                            <span className="col-5">{element.type === "deposit" ? "Deposit":period}</span>
                            <span className="col-3">&#8377;{element.price}</span>
                            <span className="col-4">
                                <button className="btn btn-primary" 
                                onClick={()=> unpaidDetails && unpaidDetails.length >0 ? this.payBill("single",period,element) :null}>
                                    PAY
                                </button></span>
                             </div>
                     )
                 })}</div>
                 :<div className="no-pending-msg">No pending payments</div>
             }
               {/* {
                    totalAmount >0 && 
                    <div className="text-center mt-3">
                        <label> Total Amount: &#8377;{totalAmount}</label>
                        <div className="centered-items">
                        <button className="btn btn-success" onClick={()=>this.payBill("total",totalPeriod)}>Pay</button>
                        </div>
                    </div>


                } */}
                 {isLoading ? <Loader />:null}
                 {showPopup && <Popup data={popupData} title="Confirmation"  onClose={()=>{this.setState({showPopup:false,isLoading:false})}} onSubmit={this.handleSubmit}/>}

           </div>
        )
    }
}

const mapStateToProps =(state)=>{
    return {
        userData:state
    }
}
export default connect(mapStateToProps)(PayBill);