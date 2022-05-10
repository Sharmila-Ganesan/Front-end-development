import {ADDBRANCH,CLEARMESSAGE, GETALLBRANCH, GETAVAILABLEBRANCH, UPDATEBRANCH} from '../actions/actionTypes';

let initialState={
    message:"",
    messageCode:"",
    availableBranch:[],
    allBranch:[]
}

export default function branch(state=initialState,action){
    const data=action.data ? action.data :{};
    
    switch(action.type){
        
        case ADDBRANCH:{
            return {...state,message:data.message,messageCode:data.messageCode}
        }
        case GETAVAILABLEBRANCH:{
            return {...state,availableBranch:data.details}
        }
        case GETALLBRANCH:{
            return {...state,allBranch:data.details}
        }
        case UPDATEBRANCH:{
            return {...state,message:data.message,messageCode:data.messageCode}
        }
        case CLEARMESSAGE:{
            return{...state,message:'',messageCode:''}
        }
        default:
            return state;
    }
}