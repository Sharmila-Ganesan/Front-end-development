
import React from 'react';
import {connect} from 'react-redux';
import {toast} from 'react-toastify';

import { getPayOutDetails, makePayout } from '../actions/payment';
// import Edit from '../assets/img/edit.svg';
import { initTokenCheck, propTokenCheck, roleValidation } from '../utils/validator';
import { MONTH } from '../config/config';
import { clearMessage } from '../actions/users';
import { filterRecordByKey } from '../utils/utils';
class PayOut extends React.Component{
    constructor(props){
        super(props);
        this.state={
        payout:[],
        details:[]
        }

        this.payout=this.payout.bind(this);   
        this.filterRecord = this.filterRecord.bind(this);
    }

    componentDidMount(){
        initTokenCheck(this.props);
        roleValidation(this.props);
        this.props.dispatch(getPayOutDetails());
    }

    static getDerivedStateFromProps(props,state){
        propTokenCheck(props);
        roleValidation(props);
        let {userData:{payment:{payout,message,messageCode}}}=props;
        if(message){
            if(messageCode === "PO101"){
                toast.success(message);
                props.dispatch(getPayOutDetails());
            }else{
                toast.error(message);
            }
            props.dispatch(clearMessage())
        }

        if(JSON.stringify(payout) !== JSON.stringify(state.payout)){
            return {payout,details:payout}
        }
        return null
    }
    
    payout(data){
        this.props.dispatch(makePayout(data));
    }
    filterRecord(e){
        let {payout,details}=this.state;
        details = filterRecordByKey("role",e.target.value,payout);
        this.setState({details});
    }
    render(){
        let {details}=this.state;
        return(
            <div className="container-fluid form-items mt-3  mb-55">

                <div className="col-12">
                    <label htmlFor="sortkeyrole">Filter By User:</label>
                    <select className="form-control" id="sortkeyrole" onChange={this.filterRecord}>                   
                        <option key="" value="">All User</option>     
                        <option key={"salesman"} value={"Salesman"} >Salesman</option> 
                        <option key={"branchmanager"} value={"Manager"} >Manager</option>
                    </select>
                </div>
                <h4>Pay Out Details</h4>
                {
                    details && details.length>0 ?(
                        <React.Fragment>
                          
                            <table>
                                <thead>
                                    <tr>
                                    <th>BRANCH</th>
                                    <th>RECEIVER</th>
                                    <th>ROLE</th>
                                    <th>PERIOD</th>
                                    <th>AMOUNT</th>
                                    <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {details.map((element,key)=>{
                                    let year,month;
                                    year =element.year;
                                    month=element.month-1;
                                   
                                    element.period =MONTH[month].slice(0,3)+"-"+year;
                                    return(
                                        <tr key={key}>
                                            <td>{element.branchcode}</td>
                                            <td>{element.salesmanId ?element.salesmanId:element.branchmanager}</td>
                                            <td>{element.role}</td>
                                            <td>{element.period}</td>
                                            <td>&#8377;{element.amount}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={(e)=>this.payout(element)}>
                                                    PAY
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                 })}

                                </tbody>
                            </table>
                        </React.Fragment>
                    )
                    
                    :<div className="no-pending-msg">No Payout Details</div>

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
export default connect(mapStateToProps)(PayOut);