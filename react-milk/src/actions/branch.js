import {ADDBRANCH, GETALLBRANCH, GETAVAILABLEBRANCH, UPDATEBRANCH} from './actionTypes';
import apiCallDispatcher from './common';

export function addNewBranch(param){
    return apiCallDispatcher(ADDBRANCH,'post','addbranch',param);
}

export function getAvailableBranches(){
    return apiCallDispatcher(GETAVAILABLEBRANCH,'get','getavailablebranch');
}


export function getAllBranches(){
    return apiCallDispatcher(GETALLBRANCH,'get','allbranch');
}

export function updateBranch(param){
    return apiCallDispatcher(UPDATEBRANCH,'put','updatebranch',param);
}