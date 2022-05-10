import { ADDTRANSACTION, GETMILKPRICE, VERIFYSALE, DELETESALES } from './actionTypes';
import apiCallDispatcher from './common';

export function addTransaction(param) {
  return apiCallDispatcher(ADDTRANSACTION, 'post', 'transaction', param);
}

export function saleVerify(param) {
  return apiCallDispatcher(VERIFYSALE, 'post', 'saleverify', param);
}

export function getMilkPrice() {
  return apiCallDispatcher(GETMILKPRICE, 'get', 'milkprice');
}

export function deleteTransaction(param) {
  return apiCallDispatcher(DELETESALES, 'delete', 'deltransaction', param);
}