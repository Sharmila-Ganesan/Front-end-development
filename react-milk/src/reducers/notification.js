import { CLEARMESSAGE, GETNOTIFICATION, PUSHNOTIFICATION} from '../actions/actionTypes';

let initialState={
    message:"",
    messageCode:"",
    notifications:[],
    isEnables:"NA"
}

export default function notification(state=initialState,action){
    const data=action.data ? action.data :{};
    
    switch(action.type){
        case GETNOTIFICATION:{
            return {...state,notifications:data.notifications,isEnabled:data.isEnabled}
        }      
        case PUSHNOTIFICATION:{
            return {...state,message:data.message,messageCode:data.messageCode}
        }  
        case CLEARMESSAGE:{
            return { ...state,
                message:"",
                messageCode:""
            }
        }   

        default:
            return state;
    }
}