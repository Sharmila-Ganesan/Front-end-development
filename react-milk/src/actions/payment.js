import {GETUNPAIDDETAILS,GETPAIDDETAILS,PAY,PAYREQUEST, GETPENDINGBILLS, PAYOUT, GETPAYOUT, GETSALARY} from './actionTypes';
import apiCallDispatcher from './common';

export function getUnpaidDetails(param){
    return apiCallDispatcher(GETUNPAIDDETAILS,'get','payment/unpaid',param,'path');
}
export function getPaidDetails(param){
    return apiCallDispatcher(GETPAIDDETAILS,'get','payment/paid',param,'path');
}
export function requestPayment(param){
    return apiCallDispatcher(PAYREQUEST,'post','requestpayment',param);
}

export function makePayment(param){
    return apiCallDispatcher(PAY,'put','payment',param);
}

export function getPendingBills(){
    return apiCallDispatcher(GETPENDINGBILLS,'get','payment/pending');
}
export function getPayOutDetails(){
    return apiCallDispatcher(GETPAYOUT,'get','payout');
}
export function makePayout(param){
    return apiCallDispatcher(PAYOUT,'post','payout',param);
}

export function getSalaryDetails(){
    return apiCallDispatcher(GETSALARY,'get','salary');
}