import {combineReducers} from 'redux';
import users from './users';
import transaction from './transaction';
import payment from './payment';
import statement from './statement';
import branch from './branch';
import notification from './notification'

export default combineReducers({
    users,
    transaction,
    payment,
    statement,
    branch,
    notification
})