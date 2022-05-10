import React from 'react';
import { connect } from 'react-redux';

import { initTokenCheck, propTokenCheck, roleValidation} from '../../utils/validator';



import SaleProgress from '../saleProgress';
import {  sendBtRequest,connectionRequest, getBtResponse, btDisconnect, btConnect } from '../../utils/bluetooth';
import { arrayBufferToString } from '../../utils/utils';


var responseReceived,reconnectTimer;

class EmptyCan extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
            record:{
                mobile:"",
                price: 0,
                quantity:40000,
                processed:0
            },
         
            socketState:false,
            message:"",
            messageCode:"",
            saleProgress:false          
        };
   
        this.handleSubmit = this.handleSubmit.bind(this);
        this.refreshConnection = this.refreshConnection.bind(this);
        this.responseReceived=this.responseReceived.bind(this);
        this.onDeviceDisconnect = this.onDeviceDisconnect.bind(this);
        this.onDeviceConnect = this.onDeviceConnect.bind(this);
    }

    async componentDidMount(){
        initTokenCheck(this.props);
        roleValidation(this.props);
        responseReceived=this.responseReceived;
    }

    static async getDerivedStateFromProps(props,state){
        propTokenCheck(props);
        roleValidation(props);

        return {};
    }


    resetRecord(){
        this.setState({record:{
            mobile:"",
            price: 0,
            quantity:40000,
            processed:0
        }})
    }

    async refreshConnection(e){
        try{
            console.log("refreshing");
            await connectionRequest(this.onDeviceConnect,this.onDeviceDisconnect);  
        }catch(err){
            this.setState({socketState:false});
        }
      
    }
    onDeviceConnect(){
        this.setState({socketState:true});
    }
    
    async handleSubmit(){
        try{
           
            let {socketState} = this.state; 
            if(socketState ){
                this.setState({message:""});
                let ml= "40000";
                await sendBtRequest(ml);
                await getBtResponse(responseReceived);
            
            }else{
                alert("ensure the connection")
            }
        }catch(err){
            console.log(err)
        }
    }
  
    responseReceived(event) {
        
        let {record}=this.state;
        var value = event.target.value;
        let data=arrayBufferToString(value);
        console.log("data from bt",data)
        if(data === "done"){
            console.log("process done");
            this.setState({message:`Success:Emptied : quantity ${record.quantity}`,saleProgress:false});
            this.resetRecord();
        }else if(data === "error"){
            if(record.processed >25){
                this.setState({message:`Error:Emptied : quantity ${record.processed}`,saleProgress:false});
                this.resetRecord();
            }
            else{
                this.setState({message:"Something went wrong",saleProgress:false})
            }
            this.resetRecord();
        }
        else if(!isNaN(parseInt(data))){
            record.processed=data
            this.setState({record,saleProgress:true});
        }
      }
    
    
    onDeviceDisconnect(){
        let {record}=this.state;
        if(record.processed>25){
            record.quantity = record.processed;
            this.setState({socketState:false,saleProgress:false,message:`Error DC:Emptied : quantity ${record.quantity}`});
        
        }else{
            this.setState({socketState:false, saleProgress:false});
        }
        this.resetRecord();
        reconnectTimer=setTimeout(
            ()=>{
                btConnect(this.onDeviceConnect);
            },
            1000
        )
      
    }
    componentWillUnmount(){
        this.resetRecord();
        btDisconnect();
        reconnectTimer && clearTimeout(reconnectTimer);
    }
  
    render(){
        let {record:{quantity,processed},saleProgress,message,socketState} = this.state;

        let saleProg = {
            quantity,
            processed
        }
        return(
       
            <div className="centered-items mb-55">
                <div className="empty-can-div">
                    <button className="btn btn-primary m-3" onClick={this.handleSubmit}>Empty Can</button>          
                        {message ? <p className="text-primary text-center">{message}</p>:""}
                            <button className={`btn ${socketState?"btn-success":"btn-danger"}  m-3`} 
                            onClick={this.refreshConnection}> {socketState?"Connected":"Not Connected"}</button>
                    
                    </div>
                {saleProgress ? <SaleProgress params={saleProg}  /> :""}
                
            </div>)
    }
}
const mapStateToProp = (state)=>{
    return {
        userData:state
    }
}
export default connect(mapStateToProp)(EmptyCan);
