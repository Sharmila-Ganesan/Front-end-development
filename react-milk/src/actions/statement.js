import {GETALLYEARSTATEMENT,GETYEARSTATEMENT, GETMONTHSTATEMENT,GETDAYSTATEMENT,PURCHASESTATEMENT} from './actionTypes';
import apiCallDispatcher from './common';

export function getStatement(param){
    let actionType=GETALLYEARSTATEMENT;
    if(param){
        if(param.day){
            actionType=GETDAYSTATEMENT;
        }else if(param.month){
            actionType=GETMONTHSTATEMENT
        }else if(param.year){
            actionType=GETYEARSTATEMENT
        }
    }
    return apiCallDispatcher(actionType,'get','statement',param,'query');
}

export function getPurchaseStatement(param){
    
    return apiCallDispatcher(PURCHASESTATEMENT,'get','pstatement',param,'query');
}