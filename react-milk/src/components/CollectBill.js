import React from 'react';
import {connect} from 'react-redux';
import GenerateForm from '../utils/generateForm';
import PayBill from './PayBill';
import { initTokenCheck, propTokenCheck, roleValidation } from '../utils/validator';

class CollectBill extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userInfo:[
                {
                    id:"name",
                    title:"Customer Name",
                    type:"text",
                    value:"",
                    default:"",
                    placeholder:'Scan QrCode',
                    qrcode:true,
                    readOnly:true,
                    rules:{
                        required:true
                    }
                   
                }
            ],
            isPay:false
        }
        this.collectBill = this.collectBill.bind(this);
    }
    
    componentDidMount(){  
        initTokenCheck(this.props);
        roleValidation(this.props);
    }

    static getDerivedStateFromProps(props, state) {
        propTokenCheck(props);
        roleValidation(props);
        return null;
    }

    collectBill(data){
        data = {mobile:data.mobile}
        this.setState({data,isPay:true})
    }
    
    render(){
        let {userInfo,data,isPay}= this.state;
        let button= {
            submit:true,
            reset:true
        }
        return(
           <div className="container-fluid form-items mt-3 mb-55">
               {isPay ? <PayBill data={data} mode="collect" />:
                <GenerateForm  data={userInfo} onSubmit={this.collectBill} button={button} title="Collect Bill" />}
              
           </div>
        )
    }
}
const mapStateToProps =(state)=>{
    return {
        userData:state
    }
}
export default connect(mapStateToProps)(CollectBill);