import {
  LOGIN, SIGNUP, VERIFY, CLEARUSER, GETUSER, GETUSERBYID,
  CLEARMESSAGE, MOBVERIFY, OTPVERIFY, RESETPASSWORD, OTPREQUEST, SECUREDEPOSIT,
  CONTROLUSER, DELETEUSER, GETALLUSER, GETBRANCH, SEARCHBRANCH, UPDATELOCATION, 
  GETIDCARDDETAILS, GETPAYABLEDEPOSIT, REFUNDREQUEST, CLEARDEPOSIT,WELCOMEOFFER
} from './actionTypes';

import apiCallDispatcher from './common';



export function verifyMobile(param) {
  return apiCallDispatcher(MOBVERIFY, 'post', 'verifymobile', param);
}

export function verifyOtp(param) {
  return apiCallDispatcher(OTPVERIFY, 'post', 'verifyotp', param);
}

export function resetPassword(param) {
  return apiCallDispatcher(RESETPASSWORD, 'post', 'reset', param);
}


export function requestOtp(param) {
  return apiCallDispatcher(OTPREQUEST, 'post', 'requestotp', param);
}

export function login(param) {
  return apiCallDispatcher(LOGIN, 'post', 'login', param);
}


export function signUp(param) {
  return apiCallDispatcher(SIGNUP, 'post', 'signup', param);
}


export function verify() {
  return apiCallDispatcher(VERIFY, 'get', 'verify');
}

export function deleteUser(param) {
  return apiCallDispatcher(DELETEUSER, 'delete', 'users/delete', param);
}


export function clearData() {
  return apiCallDispatcher(CLEARUSER, 'get', 'logout');
}
export function clearMessage() {
  return function (dispatch) {
    dispatch({ type: CLEARMESSAGE, data: "" });
  };
}

export function clearDepositDetails() {
  return function (dispatch) {
    dispatch({ type: CLEARDEPOSIT, data: "" });
  };
}


export function getUserById(param) {
  return apiCallDispatcher(GETUSERBYID, 'get', 'users', param, 'path');
}

export function getUser() {
  return apiCallDispatcher(GETUSER, 'get', 'users');
}
export function getAllUser() {
  return apiCallDispatcher(GETALLUSER, 'get', 'users/all');
}

export function updateSecureDeposit(param) {
  return apiCallDispatcher(SECUREDEPOSIT, 'post', 'deposit', param);
}

export function updateWelcomeOffer(param) {
  return apiCallDispatcher(WELCOMEOFFER, 'post', 'welcomeoffer', param);
}

export function updateUserAccess(param) {
  return apiCallDispatcher(CONTROLUSER, 'put', 'users/control', param);
}

export function getBranchDetails(param) {
  return apiCallDispatcher(GETBRANCH, 'post', 'branch', param);
}

export function getBranchDetailsByPincode(param) {
  return apiCallDispatcher(SEARCHBRANCH, 'get', 'branch', param, 'query');
}

export function updateUserDetails(param) {
  return apiCallDispatcher(UPDATELOCATION, 'put', 'users', param);
}

export function getIDcardDetails(param) {
  return apiCallDispatcher(GETIDCARDDETAILS, 'get', 'idcard', param, 'query');
}

export function getPayableDeposit(param) {
  return apiCallDispatcher(GETPAYABLEDEPOSIT, 'get', 'payabledeposit', param, 'query');
}

export function initateRefundRequest(param) {
  return apiCallDispatcher(REFUNDREQUEST, 'post', 'depositrefund', param);
}
