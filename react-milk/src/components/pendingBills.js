import React from 'react';
import {connect} from 'react-redux';
import { initTokenCheck, propTokenCheck, roleValidation } from '../utils/validator';
import { getPendingBills } from '../actions/payment';

class UserControl extends React.Component{
    constructor(props){
        super(props);
        this.state={
            pendingbills:[],
            details:[]
        }       
        this.filterRecord = this.filterRecord.bind(this);
    }

    componentDidMount(){
        initTokenCheck(this.props);
        roleValidation(this.props);
        this.props.dispatch(getPendingBills())
    }
     
    static getDerivedStateFromProps(props,state){
        propTokenCheck(props);
        roleValidation(props);
        let {userData:{payment:{pendingbills}}}=props;
        if(pendingbills && JSON.stringify(state.pendingbills) !== JSON.stringify(pendingbills)){
            return {pendingbills,details:pendingbills}
        }

        return null
    }
    
    filterRecord(e){
        let {pendingbills,details}=this.state;
        let key = e.target.value;
        details=[]
        if(key){
            pendingbills.forEach(element => {
                    if(element.role === key){
                        details.push(element);
                    }
            });
            
        }else{
            details =pendingbills;
        }

        this.setState({details})

    }
   
    render(){  

        let {details}=this.state;
        let { userData:{users:{userInfo:{role}}}} = this.props;
        let totalAmount=0;
          return(
            <div className="container-fluid form-items mt-3  mb-55">

            <h4>Unpaid Details</h4>
    
            <div className="table-container">
                <label htmlFor="sortkeyrole">Filter By:</label>
                <select className="form-control" id="sortkeyrole" onChange={this.filterRecord}>                   
                    <option key="" value=""> All User</option>     
                    <option key={"salesman"} value={"salesman"} > Salesman</option>   
                    <option key={"customer"} value={"customer"} > Customer</option>   
                    {role && role === "admin" &&  <option key={"branchmanager"} value={"branchmanager"} > Branch Manager</option>} 

                </select>
            {
             details && details.length >0 ?
            <React.Fragment>
            <table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>MOBILE</th>
                        <th>TYPE</th>
                        <th  className="text-center">AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                {details.map((element)=>{
                    totalAmount+=element.amount;
                 return(
                     <tr key={element.userId}>
                         <td>{element.name}</td>
                         <td>{element.userId}</td>
                         <td >{element.role}</td>
                         <td className="text-center">{element.amount}</td>
                     </tr>
                    )
                })}

                </tbody>
            </table>
            {totalAmount>0  ? <div className="col-12 text-center mt-2">
            <h6 className="text-primary">{"Pending Total Amount: "} <span>&#8377; </span> {totalAmount}</h6>
            </div> :""}
               </React.Fragment>
            :
            <div className="row text-center m-0 ">
            {`No Un Paid Items Found`}
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
export default connect(mapStateToProps)(UserControl)