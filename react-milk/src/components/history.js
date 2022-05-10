import React from 'react';
import {connect} from 'react-redux';

import { getPaidDetails} from '../actions/payment';
import { formatDate } from '../utils/utils';
import { initTokenCheck, propTokenCheck, roleValidation } from '../utils/validator';

class PaymentHistory extends React.Component{
    constructor(props){
        super(props);
        this.state={
            paidDetails:[]
        }
    }
    
    componentDidMount(){
        initTokenCheck(this.props);
        roleValidation(this.props);
        this.props.dispatch(getPaidDetails());
    }

    static getDerivedStateFromProps(props,state){
        propTokenCheck(props);
        roleValidation(props);
        let {userData:{payment:{paidDetails}}}=props;
        if(paidDetails && state.paidDetails !== paidDetails){
            paidDetails.sort((a,b)=>{return new Date(b.billDate) - new Date(a.billDate)})
            return {paidDetails}
        }
        return null
    }

    render(){
        let {paidDetails}=this.state;
        let details =paidDetails && paidDetails.length>0?paidDetails:[];
        let totalAmount =0;

        return(
           <div className="container-fluid mt-3 mb-55">

            <h4 className="text-center" >Payment History</h4>
            <div className="customer-stmt">
               
            {
             details && details.length >0 ?
           
            <React.Fragment>
                 <div className="font-weight-bold mt-3 customer-stmt-head text-center">
                 <span className="col-6 p-0">{"PAYMENT DATE"}</span>
                 <span className="col-3 p-0">{"PERIOD"}</span>
                 <span className="col-3 p-0">{"AMOUNT"}</span>
                </div>
                
                {details.map((element,index)=>{
                     let tdate= formatDate(element.billDate);
                     totalAmount+=element.amount;
                 return(   
                    <div className="customer-stmt-row text-center" key={index}>
                    <span className="col-6 p-0">{tdate}</span>
                    <span className="col-3 p-0">{element.period}</span>
                    <span className="col-3 p-0">&#8377;{element.amount}</span>
                    </div>     
                     
                    )
                })}

                
            </React.Fragment>

            :
            <div className="text-center text-danger">
            {`No Payment History Found`}
            </div>
         }
          {totalAmount>0 ? <p className="text-primary text-weight-bold text-center">{"Total Amount paid "+totalAmount}</p>:null} 
         </div>
              
           </div>
        )
    }
}
const mapStateToProps =(state)=>{
    return {
        userData:state
    }
}
export default connect(mapStateToProps)(PaymentHistory);