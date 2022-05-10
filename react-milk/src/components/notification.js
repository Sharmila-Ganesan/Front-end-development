import React from 'react';
// import ActionCards from '../components/actionCards';
import { connect } from 'react-redux';
// import DashBoardConfig from '../config/dashboard';
import Loader from '../utils/Loader';
import { initTokenCheck, propTokenCheck } from '../utils/validator';
import { formatDate, urlBase64ToUint8Array } from '../utils/utils';
import '../sass/notification.scss'
import { enablePushNotification, getNotifications } from '../actions/notification';
import {toast} from 'react-toastify';
import { clearMessage } from '../actions/users';

class Notification extends React.Component{
    constructor(props){
        super(props);
        this.state={
            notifications:[],
            isLoading:false
        }
        this.enableNotification = this.enableNotification.bind(this)

    }
    componentDidMount(){  
        initTokenCheck(this.props);
        this.props.dispatch(getNotifications())
    }
    static getDerivedStateFromProps(props, state) {
        propTokenCheck(props);
        let {userData:{notification:{notifications,isEnabled,messageCode,message}}} = props;
        
        if(notifications && JSON.stringify(notifications) !== JSON.stringify(state.notifications)){
            return {notifications}
        }
        if(messageCode){
            if(messageCode === "SA101"){
                toast.success(message);
                props.dispatch(getNotifications())
            }else{
                toast.danger(message)
            }
            props.dispatch(clearMessage());
            return {isLoading:false,isEnabled}
        }
        
        return {isEnabled};
    }
    async enableNotification(){
        try {
            this.setState({isLoading:true})
            if(window.register){
                const register = window.register;
                const publicVapidKey = "BC1kPZTpwk8AHVsi5ueSUiu6L3wzdWUkI9clTrSmuHFE3eelFHo7PEAjh9uGAY4DONbjeX_0-nhkQ1mSnh-KvtY"
                // console.log("Registering Push...");
                const subscription = await register.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
                });
                
                this.props.dispatch(enablePushNotification(subscription))
            }
            
        } catch (error) {
            console.log(error);
            this.setState({isLoading:false})
        }
       
    }

    render(){
       let {notifications:data,isEnabled,isLoading} = this.state;
        
        return(
           <div className="container-fluid  mb-55">
               <h4>Notification's</h4>
               {
                   isEnabled === "NA" &&  <div className=" warning p-3">
                   <h5>Enable push notification on this device to keep track of your purchases, bills </h5>
                   <button className="btn btn-success m-3" onClick={this.enableNotification}>Enable Now</button>
               </div>
               }
              
               <div className="notification-container p-3">
                    {
                        data && data.length>0 ? data.map((item,index)=>{
                            return(
                                <div className="notification-item mt-2" key={index}>
                                   
                                    <span>
                                    <h6 className="pl-4">{item.title +"--"} <label>{formatDate(item.time)}</label></h6>
                                    <p>{item.message}</p>
                                    </span>
                                    
                                </div>
                            )
                           
                        }):<p>No new notifications</p>
                    }
               </div>
                    {isLoading && <Loader />}
           </div>
        )
    }
}
const mapStateToProps =(state)=>{
    return {
        userData:state
    }
}

export default connect(mapStateToProps)(Notification);