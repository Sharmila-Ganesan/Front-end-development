import {GETPAIDDETAILS,GETUNPAIDDETAILS,PAY,CLEARMESSAGE, GETPENDINGBILLS,PAYREQUEST, PAYOUT, GETPAYOUT, GETSALARY} from '../actions/actionTypes';

let initialState={
    paidDetails:[],
    unpaidDetails:[],
    order:"",
    message:"",
    messageCode:"",
    pendingbills:[],
    payout:[],
    salary:[]
};

export default function payment(state=initialState,action){
    const data=action.data;
    
    switch(action.type){
        case GETPENDINGBILLS:{
            return {...state,pendingbills:data.details?data.details:[]}
        }
        case  GETUNPAIDDETAILS:{
            return {unpaidDetails:data.details?data.details:[],messageCode:data.messageCode,message:data.message}
        }
        case  GETPAIDDETAILS:{
            return {paidDetails:data.details,messageCode:data.messageCode,message:data.message}
        }
        case GETPAYOUT:{
            return {...state,payout:data.details?data.details:[]}
        } 
        case GETSALARY:{
            return {...state,salary:data.details?data.details:[]}
        }
        case PAYOUT:{
            return {...state,messageCode:data.messageCode,message:data.message}
        }
        case  PAYREQUEST:{
            return {order:data.order,messageCode:data.messageCode,message:data.message}
        }
        case  PAY:{
            return {messageCode:data.messageCode,message:data.message}
        }
        case CLEARMESSAGE:{
            return { ...state,
                message:"",
                messageCode:"",
            }
        }   
        default:
            return state;

    }
}