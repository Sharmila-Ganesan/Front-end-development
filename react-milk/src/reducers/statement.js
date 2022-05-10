import {GETALLYEARSTATEMENT, GETYEARSTATEMENT, GETMONTHSTATEMENT, GETDAYSTATEMENT,PURCHASESTATEMENT} from '../actions/actionTypes';

let initialState={
    allYear:[],
    allMonth:[],
    allDay:[],
    perDay:[],
    details:[]
};

export default function statement(state=initialState,action){
    const data=action.data;
    switch(action.type){
        case PURCHASESTATEMENT:{

            return {...state,details:data.details?data.details.sort((a,b)=>{return new Date(b.IssuedDate) - new Date(a.IssuedDate)}):[]}
        }
        case  GETALLYEARSTATEMENT:{
            return {...state,allYear:data.details}
        }
        case  GETYEARSTATEMENT:{
            return {...state,allMonth:data.details}
        }
        case  GETMONTHSTATEMENT:{
            return {...state,allDay:data.details}
        }
        case  GETDAYSTATEMENT:{
            return {...state,perDay:data.details}
        }
        default:
            return state;

    }
}