import React from 'react';
import { connect } from 'react-redux';

import { getPurchaseStatement } from '../actions/statement';
import { deleteTransaction } from '../actions/transaction';

import { initTokenCheck, propTokenCheck, roleValidation } from '../utils/validator';
import { formatDate, searchByValue } from '../utils/utils';
import { toast } from 'react-toastify';
import { clearMessage } from '../actions/users';


class DeleteSales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            data: [],
            startDate: formatDate(new Date(), "date"),
            endDate: formatDate(new Date(), "date"),
            role: "",
            salesman: "",
            customer: "",
            totalAmount: 0,
            totalQuantity: 0,
            branchcode: "",
            saleTime: '',
            isAllSelected: false,
            selectedIds: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.filterRecord = this.filterRecord.bind(this);
        this.handleSelectItems = this.handleSelectItems.bind(this);
        this.deleteSales = this.deleteSales.bind(this);
    }


    componentDidMount() {

        let { userData: { users: { userInfo: { role } } }, from } = this.props;
        if (!from) {
            initTokenCheck(this.props);
            roleValidation(this.props);
        }
        this.setState({ role });
        this.props.dispatch(getPurchaseStatement());
    }

    static getDerivedStateFromProps(props, state) {

        let { userData: {
            users: { userInfo: { role } },
            transaction: { message, messageCode },
            statement: { details }
        },
            from } = props;
        if (!from) {
            propTokenCheck(props);
            roleValidation(props);
        }
        if (messageCode === "DS101") {
            toast.success(message);
            props.dispatch(getPurchaseStatement());
            props.dispatch(clearMessage())
        }
        if (JSON.stringify(details) !== JSON.stringify(state.data)) {

            return { data: details, details, role }
        }


        return { role };
    }

    handleChange(e, element) {
        let value = e.target.value;
        let { startDate, endDate, details, salesman, customer, data, totalAmount, totalQuantity, cumtotal, cumquantity, branchcode } = this.state;
        switch (element) {
            case "start":
                startDate = value
                break;
            case "end":
                endDate = value;
                break;

            case "salesman":
                salesman = value;
                if (value) {
                    let [temp, ttl, ttq] = searchByValue(data, "salesmanId", value);
                    totalAmount = ttl;
                    totalQuantity = ttq;
                    details = temp;
                } else {
                    details = data;
                    totalAmount = cumtotal;
                    totalQuantity = cumquantity;
                }
                break;
            case "customer":
                customer = value;
                if (value) {
                    let [temp, ttl, ttq] = searchByValue(data, "customerId", value);
                    totalAmount = ttl;
                    totalQuantity = ttq;
                    details = temp;
                } else {
                    details = data;
                    totalAmount = cumtotal;
                    totalQuantity = cumquantity;
                }
                break;
            case "branch":
                branchcode = value;
                if (value) {
                    let [temp, ttl, ttq] = searchByValue(data, "branchcode", value);
                    totalAmount = ttl;
                    totalQuantity = ttq;
                    details = temp;
                } else {
                    details = data;
                    totalAmount = cumtotal;
                    totalQuantity = cumquantity;
                }
                break;
            default:
                break;
        }
        this.setState({ startDate, endDate, salesman, customer, details, totalAmount, totalQuantity, branchcode })
    }
    handleClick() {
        let { startDate, endDate } = this.state;
        let param = {
            startDate,
            endDate
        }
        this.props.dispatch(getPurchaseStatement(param));
    }
    filterRecord(e) {
        let { data, details, totalQuantity, totalAmount, saleTime, cumquantity, cumtotal } = this.state;
        let key = e.target.value;
        saleTime = key;
        details = []
        if (key) {
            totalAmount = 0;
            totalQuantity = 0;
            data.forEach(element => {
                details.push(element);
                let tempDate = new Date(element.Date).getHours();
                if (key === "AM" && tempDate < 12) {

                    totalAmount += parseInt(element.price);
                    totalQuantity += parseInt(element.quantity);
                } else if (key === "PM" && tempDate >= 12) {
                    details.push(element);
                    totalAmount += parseInt(element.price);
                    totalQuantity += parseInt(element.quantity);
                }

            });

        } else {
            totalAmount = cumtotal;
            totalQuantity = cumquantity;
            details = data;
        }

        this.setState({ details, totalAmount, totalQuantity, saleTime })

    }
    handleSelectItems(index) {
        let { details, isAllSelected, selectedIds } = this.state;
        if (!selectedIds) {
            selectedIds = [];
        }
        if (index > -1) {
            let actionItem = details[index];

            if (actionItem.isSelected) {
                selectedIds = selectedIds.filter(id => id !== actionItem._id);
            } else {
                selectedIds.push(actionItem._id);
            }

            details[index].isSelected = !details[index].isSelected;

        } else {
            isAllSelected = !isAllSelected;
            selectedIds = details.map((sale, index) => {
                details[index].isSelected = isAllSelected;
                return sale._id
            });
            if (!isAllSelected) {
                selectedIds = [];
            }

        }
        isAllSelected = selectedIds.length === details.length;
        this.setState({ isAllSelected, details, selectedIds })

    }

    deleteSales() {
        const { selectedIds } = this.state;
        this.props.dispatch(deleteTransaction({ transactionIds: selectedIds }))
        this.setState({ selectedIds: [], isAllSelected: false })
    }
    render() {
        let { details, startDate, endDate, salesman, customer, branchcode, isAllSelected, selectedIds } = this.state;
        let { from } = this.props;
        let maxDate = formatDate(new Date(), "date");

        return (
            <div className={"mb-55 " + (from ? "col-md-6 col-sm-12" : "container-fluid mt-3 ")}>
                <div className="row m-1">
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
                <div className="row m-1">

                    <h5 className="col-12">Filter By</h5>
                    <div className="form-group col-6">
                        <label htmlFor="salesmanId">By Salesman :</label>
                        <input type="number" name="salesmanId" className='form-control'
                            placeholder={"SalesmanId"} value={salesman}
                            onChange={(e) => this.handleChange(e, "salesman")}
                            autoComplete="off" />
                        <label className="input-err text-danger">{""}</label>
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="customerId">By Customer :</label>
                        <input type="number" name="customerId" className='form-control'
                            placeholder={"Customer Id"} value={customer}
                            onChange={(e) => this.handleChange(e, "customer")}
                            autoComplete="off" />
                        <label className="input-err text-danger">{""}</label>
                    </div>


                    <div className="form-group col-6">
                        <label htmlFor="branch">By Branch :</label>
                        <input type="text" name="branch" className='form-control'
                            placeholder={"Branch"} value={branchcode}
                            onChange={(e) => this.handleChange(e, "branch")}
                            autoComplete="off" />
                        <label className="input-err text-danger">{""}</label>

                    </div>


                </div>
                <div className="centered-items">
                    <button className="btn btn-primary m-2" disabled={selectedIds.length === 0} onClick={this.deleteSales}>Delete Sales</button>
                </div>
                <h5>Sales Table {selectedIds.length} -selected</h5>
                <table>

                    <thead>
                        <tr>
                            <th>
                                <input name="selectall" type='checkbox' checked={isAllSelected} onChange={() => this.handleSelectItems()} />
                            </th>
                            <th>Transaction Id</th>
                            <th>Salesman Id</th>
                            <th>customerId</th>
                            <th>branchcode</th>
                            <th>Date</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details && details.length > 0 ?
                            details.map((detail, index) => {
                                return (<tr key={index}>
                                    <td>
                                        <input name={"delcheckbox" + index} type='checkbox' checked={detail.isSelected ? true : false} onChange={() => this.handleSelectItems(index)} />
                                    </td>
                                    <td>{detail._id}</td>
                                    <td>{detail.salesmanId}</td>
                                    <td>{detail.customerId ? <a title={detail.customerId} href={"tel:+91" + detail.customerId}>{detail.customerName}</a> : ""}</td>
                                    <td>{detail.branchcode}</td>
                                    <td>{formatDate(detail.Date)}</td>
                                    <td>{detail.quantity + "ml"}</td>
                                    <td>&#8377;{detail.price}</td>
                                </tr>);
                            }) : <tr><td colSpan="8">No record(s) found</td></tr>
                        }

                    </tbody>
                </table>

            </div>

        )
    }

}
const mapStateToProps = (state) => {
    return {
        userData: state
    }
}
export default connect(mapStateToProps)(DeleteSales);