import {
    LOGIN, SIGNUP, VERIFY, CLEARUSER,
    GETUSER, GETUSERBYID, DELETEUSER,
    CLEARMESSAGE, MOBVERIFY, OTPVERIFY, RESETPASSWORD,
    OTPREQUEST, SECUREDEPOSIT, CONTROLUSER, GETALLUSER,
    GETBRANCH, SEARCHBRANCH, UPDATELOCATION, GETIDCARDDETAILS,
    GETPAYABLEDEPOSIT, CLEARDEPOSIT, REFUNDREQUEST,WELCOMEOFFER
} from '../actions/actionTypes';

let initialState = {
    message: "",
    messageCode: "",
    token: "",
    userInfo: '',
    isNew: true,
    otp: false,
    allUser: [],
    branchInfo: '',
    branch: '',
    idCard: {},
    payableDepositDetails: ''
};

export default function users(state = initialState, action) {
    const data = action.data;

    switch (action.type) {

        case CONTROLUSER: {
            return { ...state, message: data.message, messageCode: data.messageCode }
        }
        case DELETEUSER: {
            return { ...state, message: data.message, messageCode: data.messageCode }
        }
        case SECUREDEPOSIT: {
            return { ...state, message: data.message, messageCode: data.messageCode }
        }
        case WELCOMEOFFER: {
            return { ...state, message: data.message, messageCode: data.messageCode }
        }
        
        case OTPVERIFY: {
            return { ...state, message: data.message, messageCode: data.messageCode, otp: data.otp ? true : false }
        }

        case RESETPASSWORD: {
            return { ...state, message: data.message, messageCode: data.messageCode, otp: false, isNew: true }
        }
        case OTPREQUEST: {
            return { ...state, message: data.message, messageCode: data.messageCode, otp: data.otp ? true : false, isNew: true }
        }
        case MOBVERIFY: {
            return { ...state, message: data.message, messageCode: data.messageCode, isNew: data.isNew }
        }
        case LOGIN: {
            return { ...state, message: data.message, messageCode: data.messageCode, token: data.token, userInfo: data.userInfo }
        }
        case SIGNUP: {
            return { ...state, message: data.message, messageCode: data.messageCode }
        }
        case VERIFY: {
            if (!data.token && localStorage.getItem('token')) {
                localStorage.removeItem('token');
            }
            return { ...state, message: "", messageCode: "", token: data.token, userInfo: data.userInfo }
        }
        case CLEARUSER: {
            return {
                message: "",
                messageCode: "",
                token: "",
                userInfo: '',
                isNew: true,
                otp: false
            }
        }
        case CLEARMESSAGE: {
            return {
                ...state,
                message: "",
                messageCode: ""
            }
        }
        case CLEARDEPOSIT: {
            return {
                ...state,
                payableDepositDetails: "",
            }
        }
        case GETALLUSER: {
            return { ...state, allUser: data.allUsers }
        }
        case GETUSER: {
            return { ...state, allDetails: data.allDetails }
        }
        case GETUSERBYID: {
            return { ...state, userDetails: data.allDetails }
        }
        case GETBRANCH: {
            return { ...state, branchInfo: data.branchInfo }
        }
        case SEARCHBRANCH: {
            return { ...state, branch: data.branch, message: data.message }
        }
        case UPDATELOCATION: {
            return { ...state, message: data.message, messageCode: data.messageCode }
        }
        case GETIDCARDDETAILS: {
            return { ...state, idCard: data.idCard }
        }
        case GETPAYABLEDEPOSIT: {
            return { ...state, payableDepositDetails: data.payableDepositDetails }
        }
        case REFUNDREQUEST: {
            return { ...state, message: data.message, messageCode: data.messageCode }
        }

        default:
            return state;

    }
}