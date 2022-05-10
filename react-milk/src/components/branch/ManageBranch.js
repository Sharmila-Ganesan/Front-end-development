
import React from 'react';
import {connect} from 'react-redux';
import { initTokenCheck, propTokenCheck, roleValidation } from '../../utils/validator';
import ActionCards from '../actionCards';
import { manageBranch } from '../../config/dashboard';

class ManageBranch extends React.Component{
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
        let cardItems= manageBranch;
      
          return(
              <div className="container-fluid mt-3 dashboard-width mb-55">
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
export default connect(mapStateToProps)(ManageBranch);