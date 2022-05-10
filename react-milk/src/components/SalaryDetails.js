import React from 'react';
import {connect} from 'react-redux';

import {  getSalaryDetails} from '../actions/payment';
import { formatDate } from '../utils/utils';
import { initTokenCheck, propTokenCheck, roleValidation } from '../utils/validator';

class SalaryHistory extends React.Component{
    constructor(props){
        super(props);
        this.state={
            salary:[]
        }
    }
    
    componentDidMount(){
        initTokenCheck(this.props);
        roleValidation(this.props);
        this.props.dispatch(getSalaryDetails());
    }

    static getDerivedStateFromProps(props,state){
        propTokenCheck(props);
        roleValidation(props);
        let {userData:{payment:{salary}}}=props;
        if(salary && state.salary !== salary){
            salary.sort((a,b)=>{return new Date(b.billDate) - new Date(a.billDate)})
            return {salary}
        }
        return null
    }

    render(){
        let {salary}=this.state;
        let details =salary && salary.length>0?salary:[];
        return(
           <div className="container-fluid form-items mt-3 mb-55">

            <h4>Salary History</h4>
            <div className="table-container">
               
            {
             details && details.length >0 ?
            <table>
                <thead>
                    <tr>
                    <th>PAYMENT DATE</th>
                        <th>PERIOD</th>
                        <th>AMOUNT</th>

                    </tr>
                </thead>
                <tbody>
                {details.map((element)=>{
                     let tdate= formatDate(element.billDate);
                 return(        
                     <tr key={element.billDate}>
                         <td>{tdate}</td>
                         <td>{element.period}</td>
                         <td className="text-center">{element.amount}</td>
                     </tr>
                    )
                })}

                </tbody>
            </table>

            :
            <div className="row text-center m-0 ">
            {`No Salary History Found`}
            </div>
         }
         
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
export default connect(mapStateToProps)(SalaryHistory);