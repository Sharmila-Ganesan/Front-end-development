import {GETNOTIFICATION, PUSHNOTIFICATION} from './actionTypes';
  
import apiCallDispatcher from './common';

export function enablePushNotification(param){
    return apiCallDispatcher(PUSHNOTIFICATION,'post','subscribe',param);
}

export function getNotifications(){
    return apiCallDispatcher(GETNOTIFICATION,'get','notification');
}
  
  