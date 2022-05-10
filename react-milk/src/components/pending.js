import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { initTokenCheck } from '../utils/validator';


class ThanksComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
                    
        };
    }
    componentDidMount(){
        initTokenCheck(this.props);
    }
 
    render(){
        return(
            <div className="container p-2 text-dark font-125  mb-55">
                <div className="text-center p-3">
                    <i className="fa fa-clock-o clock-icon" ></i>
                    <h5>Payment Pending</h5>
                    <Link className="btn btn-primary" to="/paybill">Go Back</Link>   
                  
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

export default connect(mapStateToProp)(ThanksComponent) 