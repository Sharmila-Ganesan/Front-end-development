import React from 'react';
// import ActionCards from '../components/actionCards';
import { connect } from 'react-redux';
// import DashBoardConfig from '../config/dashboard';

import TransactionComponent from '../components/sales/transaction';
import Statement from '../components/PurchaseStatement';

import { initTokenCheck, propTokenCheck,roleValidation } from '../utils/validator';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }

    }
    componentDidMount(){  
        initTokenCheck(this.props);
        roleValidation(this.props);

    }
    static getDerivedStateFromProps(props, state) {
       
        propTokenCheck(props);
        return null;
    }

    render(){
        let {userData:{users:{userInfo},transaction:{milkPrice}}} = this.props;
        let role="";
        if(userInfo){
            role = userInfo.role
        }
       
        return(
           <div className="centered-items mb-55">
                {role === "salesman" ? <TransactionComponent /> :   
                <div className='home'>
                    <div className="main-card">
                        <h4>{`Welcome ${userInfo ? userInfo.name:""}`}</h4>
                        <h6>Fresh milk improves your health</h6>
                        <h5><label>Today's milk price &#8377;</label>{milkPrice} </h5>
                    </div>
                    <div className="main-content">
                    <Statement from="home"/>
                    </div>
                </div>}
              
            </div>
        )
    }
}
const mapStateToProps =(state)=>{
    return {
        userData:state
    }
}

export default connect(mapStateToProps)(Home);