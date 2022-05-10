import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';



class About extends React.Component{
    constructor(props){
        super(props);
        this.state={
                    
        };
       
    }

    render(){
        return(
            <div className="container p-2 text-dark mb-55">
                <h5 className="text-center mt-3">Sivalingam Milks - Refund and Cancellation Policy</h5>
                <div className="text-justify  p-3">
                    <h5> Cancellation Policy</h5>
                    <p>We don’t provide services that are applicable for Cancellation.</p>
                    <br />
                    <h5>Refund Policy</h5>  
                    <p> Similar to cancellation the refund option was not available with our range of services as we are delivering Fresh Milk ..</p>        
                </div>    
            
                <div className="centered-items">
                    <h6 > 
                        <Link className="custom-link text-center" to="/terms">Terms and Condition</Link>     
                        <span> | </span>
                        <Link className="custom-link text-center" to="/privacy">Privacy Policy</Link>  
                    </h6>
                </div>
           
            </div>
        )
    }
}
const mapStateToProp = (state)=>{
    return {
        userData:state
    }
}

export default connect(mapStateToProp)(About) 