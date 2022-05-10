/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';


import { addTransaction, getMilkPrice, saleVerify } from '../../actions/transaction';
import { nonZeroValidation, customerIdValidation } from '../../utils/validator';

import { toast } from 'react-toastify';

import SaleProgress from '../saleProgress';
import { clearMessage } from '../../actions/users';
import { addSale, calculatePrice, setMilkPrice } from '../../config/config';
import GenerateForm from '../../utils/generateForm';
import { connectionRequest, btDisconnect, btConnect } from '../../utils/bluetooth';
import { arrayBufferToString } from '../../utils/utils';
import { phoneNumberValidation } from '../../utils/validator';


var responseReceived, reconnectTimer;

class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            record: {
                mobile: "",
                price: 0,
                quantity: 0,
                processed: 0
            },
            metadata: [...addSale],
            socketState: false,
            message: "",
            messageCode: "",
            saleProgress: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.refreshConnection = this.refreshConnection.bind(this);
        this.responseReceived = this.responseReceived.bind(this);
        this.onDeviceDisconnect = this.onDeviceDisconnect.bind(this);
        this.onDeviceConnect = this.onDeviceConnect.bind(this);
    }

    async componentDidMount() {
        responseReceived = this.responseReceived;
        this.props.dispatch(getMilkPrice());
    }

    static async getDerivedStateFromProps(props, state) {
        let { userData: { transaction: { message, messageCode, milkPrice }, userInfo } } = props;
        let { record } = state;
        if (message) {

            if (messageCode === "TC101") {
                toast.success(message);
                if (userInfo) {
                    return {
                        record: {
                            mobile: "",
                            price: 0,
                            quantity: 0,
                            processed: 0
                        }
                    }
                }
            } else if (messageCode === "TV101") {
                let ml = record.quantity + "";
                // await sendBtRequest(ml);
                // await getBtResponse(responseReceived);
                props.dispatch(addTransaction(record));
            } else {
                toast.error(message);
            }
            props.dispatch(clearMessage());
        }
        setMilkPrice(milkPrice)
        return { milkPrice };
    }

    resetRecord() {
        this.setState({
            record: {
                mobile: "",
                price: 0,
                quantity: 0,
                processed: 0
            }
        })
    }

    async refreshConnection(e) {
        try {
            console.log("refreshing");
            await connectionRequest(this.onDeviceConnect, this.onDeviceDisconnect);
        } catch (err) {
            this.setState({ socketState: false });
        }

    }
    onDeviceConnect() {
        this.setState({ socketState: true });
        reconnectTimer && clearTimeout(reconnectTimer);
    }

    async handleSubmit(data) {
        try {
            let { record, socketState } = this.state;
            // && socketState
            if (data ) {
                if (!nonZeroValidation(data.quantity) || !nonZeroValidation(data.price)) {
                    this.setState({ message: "Enter valid quantity or price", messageCode: '' });
                    return false;
                }
                record.mobile = data.mobile;
                if (data.mobile) {
                    let id = customerIdValidation(data.mobile);
                    if (!id) {
                        this.setState({ message: "Enter valid Customer Id", messageCode: '' });
                        return false;
                    }
                }
                record.price = data.price;
                record.quantity = data.quantity;
                record.customerName = data.name;
                this.setState({ record, message: "" })
                let ml = record.quantity;
                if (record.mobile && phoneNumberValidation(record.mobile)) {
                    this.props.dispatch(saleVerify(record));
                    return true;
                }
                this.props.dispatch(addTransaction(record));
                // await sendBtRequest(ml);
                // await getBtResponse(this.responseReceived);
            }
            else {
                alert("ensure the connection")
            }
        } catch (err) {
            console.log(err)
        }
    }

    responseReceived(event) {

        let { record } = this.state;
        var value = event.target.value;
        let data = arrayBufferToString(value);
        console.log("data from bt", data)
        if (data === "done") {
            this.setState({ message: `Success: Sale: quantity: ${record.quantity}, Price :${record.price}`, saleProgress: false });
            this.props.dispatch(addTransaction(record));
            this.resetRecord();
        } else if (data === "error") {
            if (record.processed > 25) {
                record.quantity = record.processed > record.quantity ? record.quantity : record.processed;
                record.price = calculatePrice(record.quantity);
                this.setState({record});
                this.props.dispatch(addTransaction(record));
                this.setState({ message: `Error:Sale : quantity: ${record.quantity}, Price :${record.price} `, saleProgress: false });
            } else {
                this.setState({ message: "Something went wrong", saleProgress: false })
            }

            this.resetRecord();
        }
        else if (!isNaN(parseInt(data))) {
            record.processed = data
            this.setState({ record, saleProgress: true });
        }
    }


    onDeviceDisconnect() {
        let { record } = this.state;
        if (record.processed > 25) {
            record.quantity = record.processed > record.quantity ? record.quantity : record.processed;
            record.price = calculatePrice(record.quantity);
            this.setState({record});
            this.props.dispatch(addTransaction(record));
            this.setState({ socketState: false, saleProgress: false, message: `Error DC:Sale: quantity: ${record.quantity}, Price :${record.price}   ` });
        } else {
            this.setState({ socketState: false, saleProgress: false });
        }
        this.resetRecord();
        reconnectTimer = setTimeout(
            () => {
                btConnect(this.onDeviceConnect);
            },
            1000
        )

    }
    componentWillUnmount() {
        this.resetRecord();
        btDisconnect();
        reconnectTimer && clearTimeout(reconnectTimer);
    }

    render() {
        let { record: { quantity, processed }, saleProgress, metadata, message, socketState } = this.state;

        let saleProg = {
            quantity,
            processed
        }
        let button = {
            submit: true,
            reset: true
        }
        return (

            <div className="col-md-6 col-sm-12 form-items mb-55">


                {saleProgress ? <SaleProgress params={saleProg}  /> : ""}

                <GenerateForm data={metadata} button={button} onSubmit={this.handleSubmit} title="Add New Sale" />
                {message ? <p className="text-primary text-center">{message}</p> : ""}
                <span className="d-flex justify-content-center">
                    <button className={`btn ${socketState ? "btn-success" : "btn-danger"}  m-3`}
                        onClick={this.refreshConnection}> {socketState ? "Connected" : "Not Connected"}</button>
                </span>

            </div>)
    }
}
const mapStateToProp = (state) => {
    return {
        userData: state
    }
}
export default connect(mapStateToProp)(Transaction);