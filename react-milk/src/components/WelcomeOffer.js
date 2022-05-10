import React from 'react';
import { connect } from 'react-redux';

import GenerateForm from '../utils/generateForm';
import { welcomeOfferForm } from '../config/login';
import { updateWelcomeOffer, clearMessage } from '../actions/users';
import { initTokenCheck, propTokenCheck, roleValidation } from '../utils/validator';

import { toast } from 'react-toastify';
import Popup from './Popup';
import { welcomeOfferConfirmPopup } from '../config/config';

class WelcomeOffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            metadata: Array.from(welcomeOfferForm),
            popupData: Array.from(welcomeOfferConfirmPopup),
            showPopup: false
        }
        this.collectPayment = this.collectPayment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        initTokenCheck(this.props);
        roleValidation(this.props);
    }

    static getDerivedStateFromProps(props, state) {
        propTokenCheck(props);
        roleValidation(props);
        let { userData: { users: { message, messageCode } } } = props;
        if (message) {
            if (messageCode === "UW101") {
                toast.success(message);

            } else {
                toast.error(message);
            }
            props.dispatch(clearMessage())
            return { metadata: Array.from(welcomeOfferForm) };
        }
        return null;
    }
    handleSubmit(e) {
        try {
            let { data } = this.state;
            if (e && e.confirm && e.confirm.toLocaleLowerCase() === "confirm") {
                this.props.dispatch(updateWelcomeOffer(data))
            }
            this.setState({ showPopup: false })
        } catch (error) {
            console.log(error);
        }

    }
    collectPayment(data) {
        if (data.welcomeOffer) {
            this.setState({ data, showPopup: true })
        }
    }

    render() {
        let { metadata, showPopup, popupData } = this.state;
        let button = {
            submit: true,
            reset: true
        }
        return (
            <div className="container-fluid form-items mt-3 mb-55">
                <GenerateForm data={metadata} onSubmit={this.collectPayment} button={button} title={"WelcomeOffer"} />
                {showPopup && <Popup data={popupData} title="Confirmation"
                    onClose={() => { this.setState({ showPopup: false }) }}
                    onSubmit={this.handleSubmit} />}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userData: state
    }
}
export default connect(mapStateToProps)(WelcomeOffer);
