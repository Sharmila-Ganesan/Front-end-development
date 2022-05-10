import React from 'react';
import { connect } from 'react-redux';

import { toast } from 'react-toastify';

import { clearMessage, getAllUser, getPayableDeposit, initateRefundRequest, clearDepositDetails } from '../actions/users';
import { filterRecordByDateRange, filterRecordByKey, formatDate } from '../utils/utils';
import { initTokenCheck, propTokenCheck, roleValidation } from '../utils/validator';

import '../sass/popup.scss';
class ViewUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            allUser: [],
            flag: false,
            filter: {
                branchcode: "",
                role: ""
            },
            depositDetails: {
                name: "vasanth"
            }
        }
        this.filterRecord = this.filterRecord.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.generateID = this.generateID.bind(this);
        this.viewDepositDetails = this.viewDepositDetails.bind(this);
        this.onClose = this.onClose.bind(this);
        this.initateRefund = this.initateRefund.bind(this);
    }

    componentDidMount() {
        initTokenCheck(this.props);
        roleValidation(this.props);
        this.props.dispatch(getAllUser())
    }


    static getDerivedStateFromProps(props, state) {
        propTokenCheck(props);
        roleValidation(props);
        let { userData: { users: { allUser, payableDepositDetails, message, messageCode } } } = props;
        if (message || messageCode) {

            if (messageCode === "DRU101") {
                toast.success(message);
                props.dispatch(getAllUser())
            } else {
                toast.error(message)
            }
            props.dispatch(clearMessage());
        }
        if (allUser && JSON.stringify(state.allUser) !== JSON.stringify(allUser)) {
            let branch = []
            allUser.forEach(element => {
                branch.push(element.branchcode);
            });
            branch = [...new Set(branch)]
            return { allUser, details: allUser, branch }
        }
        if (payableDepositDetails && JSON.stringify(payableDepositDetails) !== JSON.stringify(state.depositDetails)) {
            console.log("condition")
            return { showDepositPopup: true, depositDetails: payableDepositDetails }
        }

        return null;
    }

    filterRecord(e) {
        let { allUser, details, flag } = this.state;
        if (flag) {
            details = filterRecordByKey(e, details);
        } else {
            details = filterRecordByKey(e, allUser);
        }

        this.setState({ details });

    }

    handleChange(e, element) {
        let value = e.target.value;
        let { startDate, endDate, filter } = this.state;

        switch (element) {
            case "role":
                filter.role = value;
                break;
            case "branchcode":
                filter.branchcode = value;
                break;
            case "start":
                startDate = value
                break;
            case "end":
                endDate = value;
                break;
            default:
                break;
        }
        this.setState({ startDate, endDate, filter })
    }
    handleClick() {
        let { startDate, endDate, allUser: data, details, filter } = this.state;
        details = filterRecordByDateRange("createdAt", startDate, endDate, data, details, filter);
        this.setState({ details });
    }
    generateID(mobile) {
        let path = `generateid?mobile=${mobile}`;
        this.props.history.push(path);
    }
    viewDepositDetails(mobile) {
        this.props.dispatch(getPayableDeposit({ mobile }))
    }
    onClose() {
        this.setState({ showDepositPopup: false, depositDetails: "" });
        this.props.dispatch(clearDepositDetails())
    }
    initateRefund() {
        let { depositDetails } = this.state;
        this.props.dispatch(initateRefundRequest(depositDetails));
        this.onClose();
    }
    render() {
        let { details, branch, startDate, endDate, filter: { branchcode, role: userrole }, depositDetails, showDepositPopup } = this.state;
        let { userData: { users: { userInfo: { role } } } } = this.props;
        let maxDate = formatDate(new Date(), "date");
        let totalDeposit = 0;
        return (
            <div className="container-fluid form-items mt-3  mb-55">
                <label htmlFor="sortkeyrole">Filter By Role:</label>
                <select className="form-control" id="sortkeyrole" value={userrole} onChange={(e) => this.handleChange(e, "role")}>
                    <option key="alluser" value=""> All User</option>
                    <option key={"salesman"} value={"salesman"} > Salesman</option>
                    <option key={"customer"} value={"customer"} > Customer</option>
                    {role && role === "admin" && <option key={"branchmanager"} value={"branchmanager"} > Branch Manager</option>}
                </select>
                <label htmlFor="sortkeyrole">Filter By branchcode:</label>
                <select className="form-control" id="sortkeyrole" value={branchcode} onChange={(e) => this.handleChange(e, "branchcode")}>
                    <option key="allbranch" value=""> All Branch</option>
                    {
                        branch && branch.length > 0 && branch.map((element) => {
                            return (<option key={element} value={element} >{element}</option>)
                        })
                    }
                </select>
                <div className="row">
                    <div className="col-12 text-center mt-2"><h6>Filter Record by Date Range</h6></div>
                    <div className="form-group col-md-6 col-sm-12">
                        <label htmlFor="fromDate">From Date :</label>
                        <input type="date" name="fromDate" className='form-control'
                            placeholder={"from date"} value={startDate}
                            onChange={(e) => this.handleChange(e, "start")}
                            autoComplete="off" max={maxDate} />
                        <label className="input-err text-danger">{""}</label>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <label htmlFor="toDate">To Date :</label>
                        <input type="date" name="toDate" className='form-control'
                            placeholder={"To date"} value={endDate}
                            onChange={(e) => this.handleChange(e, "end")}
                            autoComplete="off" max={maxDate} />
                        <label className="input-err text-danger">{""}</label>
                    </div>
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <button className=" btn btn-primary" onClick={this.handleClick}>Apply</button>
                    </div>
                </div>

                {
                    details && details.length > 0 ?
                        <React.Fragment>
                            <table>
                                <thead>
                                    <tr>
                                        <th>S.NO</th>
                                        <th>DATE</th>
                                        <th>NAME</th>
                                        <th>MOBILE</th>
                                        <th>ROLE</th>
                                        <th>LOCATION</th>
                                        <th>DEPOSIT</th>
                                        {role !== "branchmanager" && <th>BRANCH CODE</th>}
                                        <th>GenerateId</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details.map((element, id) => {
                                        totalDeposit += element.deposit;
                                        return (
                                            <tr key={element.mobile}>
                                                <td>{id + 1}</td>
                                                <td >{formatDate(element.createdAt, "custom")}</td>
                                                <td>{element.name}</td>
                                                <td>{element.mobile}</td>
                                                <td >{element.role}</td>
                                                <td>
                                                    <a className="btn btn-primary" rel="noopener noreferrer"
                                                        target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${element.location}`}>Map</a>
                                                </td>

                                                <td>{element.deposit > 0 ? role !== "admin" ? element.deposit : <button className="btn btn-primary" onClick={() => this.viewDepositDetails(element.mobile)}> {element.deposit}</button> : ''}</td>
                                                {role !== "branchmanager" && <td>{element.branchcode}</td>}
                                                {element.role === "customer" && <td> <button className="btn btn-primary" onClick={() => this.generateID(element.mobile)}>ID Gen</button></td>}
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                            <div className="centered-items mt-2">
                                <h6 className="text-success">{"Total Deposit: " + totalDeposit}</h6>
                            </div>

                        </React.Fragment>
                        :
                        <div className="row text-center m-0 ">
                            {`No Users Found`}
                        </div>
                }
                {showDepositPopup && <div className="popup-overlay">
                    <div className="popup-container">
                        <div className="popup-header">
                            <span>Deposit Re-payable</span>
                            <span onClick={this.onClose}><i className="fa fa-times"></i></span>
                        </div>
                        <div className="popup-body">
                            <div className="customer-stmt-head">
                                <div className="col-4">Name</div>
                                <div className="col-4">Mobile</div>
                                <div className="col-4">Refund</div>
                            </div>
                            <div className="customer-stmt-row">
                                <div className="col-4">{depositDetails.name}</div>
                                <div className="col-4">{depositDetails._id}</div>
                                <div className="col-4">{depositDetails.refund}</div>
                            </div>

                        </div>
                        <div className="popup-footer">
                            <button className="btn btn-danger m-2" onClick={this.onClose} >Close</button>
                            <button className="btn btn-success m-2" onClick={this.initateRefund} >Pay</button>
                        </div>

                    </div>
                </div>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userData: state
    }
}
export default connect(mapStateToProps)(ViewUsers);