import React from 'react';
import {connect} from 'react-redux';
import { initTokenCheck, propTokenCheck, roleValidation } from '../utils/validator';
import queryString from 'query-string';
import { getIDcardDetails } from '../actions/users';

import '../sass/idcard.scss';
import Logo from '../assets/img/logo.png'
class GenerateId extends React.Component{
    constructor(props){
        super(props);
        this.state={
            idCard:{}
        }
       
    }

    componentDidMount(){
        initTokenCheck(this.props);
        roleValidation(this.props);
        let params = queryString.parse(this.props.location.search);
        this.props.dispatch((getIDcardDetails(params)))
    }

    static getDerivedStateFromProps(props,state){
        propTokenCheck(props);
        roleValidation(props);
        let {userData:{users:{idCard}}}=props; 
        if(idCard && JSON.stringify(idCard) !== JSON.stringify(state.idCard)){
            return {idCard}
        }
        return null
    }
    printPage(){
        window.print()
    }
    render(){
        let {idCard} =this.state;
        return(
            <React.Fragment>
               <div className="centered-items m-2">
                <button className="btn btn-primary" onClick={this.printPage}><i className="fa fa-print"></i> Print ID Card </button>
              </div>
                 <div className="print-container mb-55" id="print-area">

{
                      idCard && <div className="idcard-outer">
                          <div className="idcard">
                          <div className="idcard-header">
                               <h3 className="text-white text-center"> Sivalingam Milks</h3>
                          </div>
                          <div className="idcard-body">
                            <div>
                                <h6 className="cap mt-1 mb-0" >{idCard.name}</h6>
                                <img className="idcard-body-qr-img" alt="qrcode" src={idCard.qrcode} />
                                <p> {idCard.address}</p>
                            </div>
                               
                        </div>
                        <div className="idcard-footer">
                          
                                <p>Branch: {idCard.branchname}<br />{idCard.branchaddress} {idCard.pincode}<br />{"Mobile: +91-"+idCard.manager}.</p>
                               
                        </div>
                      </div>
                      </div>
                  }
<div className="idcard-outer">
                  <div className="idcard">
                      <div className="idcard-header">
                           <h3 className="text-white text-center"> Sivalingam Milks</h3>
                      </div>
                      <div className="idcard-body">
                          <div>
                            <img className="idcard-body-logo" alt="logo" src={Logo} />
                            <h6>www.sivalingammilks.com</h6>
                          </div>
                            
                    </div>
                    <div className="idcard-footer">
                            139, Vinobaji Colony,  <br />
                            Bodinayakanur-625513,
                            <br />
                            Email: sivalingammilks.cc@gmail.com
                            Mobile: +91-7418489314.
                    </div>

                  </div>
                  </div>
                  
                 
               </div>
               
            </React.Fragment>
              
        )
    }
}
const mapStateToProps =(state)=>{
    return {
        userData:state
    }
}
export default connect(mapStateToProps)(GenerateId);