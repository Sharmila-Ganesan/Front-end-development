
import React from 'react';
import {connect} from 'react-redux';
import { initTokenCheck, propTokenCheck, roleValidation } from '../utils/validator';
import ActionCards from './actionCards';
import { manageUser } from '../config/dashboard';

class ManageUser extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
        this.handleClick=this.handleClick.bind(this);
    }
    componentDidMount(){
        initTokenCheck(this.props);
        roleValidation(this.props);
    }
     
    static getDerivedStateFromProps(props,state){
        propTokenCheck(props);
        roleValidation(props);
        return null
    }
    
    handleClick(mode){
        let path='/'+mode
        this.props.history.push(path)
    }
    render(){  
        let cardItems= manageUser;
        let {userData:{users:{userInfo:{role}}}}=this.props; 
        if(role && (role=== "admin" || role === "root")){
            let qrIndex = cardItems.findIndex((obj => obj.key === "delete"));
            if(qrIndex === -1){
                cardItems.push({
                    title:"Delete User",
                    key:"delete"
                })
            }
           
        }
        
          return(
              <div className="container-fluid mt-3 dashboard-width  mb-55">
                    <ActionCards  data={cardItems} handleClick={this.handleClick} />
              </div>
           
        )
    }
}
const mapStateToProps =(state)=>{
    return {
        userData:state
    }
}
export default connect(mapStateToProps)(ManageUser);