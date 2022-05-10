import {ADDTRANSACTION,CLEARMESSAGE, DELETESALES, GETMILKPRICE, VERIFYSALE} from '../actions/actionTypes';
let initialState={
    message:"",
    messageCode:"",
    milkPrice:40
};

export default function transaction(state=initialState,action){
    const data=action.data;
    
    switch(action.type){
        case  ADDTRANSACTION:{
            return {...state,message:data.message,messageCode:data.messageCode}
        }
        case  VERIFYSALE:{
            return {...state,message:data.message,messageCode:data.messageCode}
        }
        case GETMILKPRICE:{
            let milkPrice = data.milkPrice ? data.milkPrice:40;
            localStorage.setItem('milkPrice',milkPrice)
            return {...state,milkPrice:data.milkPrice}
        }
        case CLEARMESSAGE:{
            return { ...state,
                message:"",
                messageCode:"",
            }
        }   
        case DELETESALES:{
            return {...state,message:data.message,messageCode:data.messageCode} 
        }
        default:
            return state;

    }
}