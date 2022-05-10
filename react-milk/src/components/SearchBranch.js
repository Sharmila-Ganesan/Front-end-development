import React from 'react';
import {connect} from 'react-redux';
import { getBranchDetailsByPincode } from '../actions/users';
import GenerateForm from '../utils/generateForm';


class SearchBranch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            pincode:[
                {
                    id:"pincode",
                    title:"PinCode",
                    type:"Number",
                    value:"",
                    default:"",
                    rules:{
                        required:true,
                        length:true,
                        min:6,
                        max:6
                    }
                   
                }
            ],
            result:false
        }
        this.searchBranch = this.searchBranch.bind(this);
    }
    
    componentDidMount(){  
     
    }

    static getDerivedStateFromProps(props, state) {
        let {userData:{users:{branch,message}}} = props;
        if(branch && JSON.stringify(branch) !== JSON.stringify(state.branch)){
            return {branch,result:true}
        }
        if(message){
            return {result:true}
        }
        return {result:false};
    }

    searchBranch(data){
        this.props.dispatch(getBranchDetailsByPincode(data));
    }
    
    render(){
        let {pincode,result,branch}= this.state;
        let button= {
            submit:true,
            reset:true
        }
        return(
           <div className="container-fluid  mt-3  mb-55">       
                <GenerateForm  data={pincode} onSubmit={this.searchBranch} button={button} title="Search Branch By Pincode" />
                {
                    result &&(  branch ? (
                        <div className="centered-items contact-wrapper">
                            <span>
                            <h5>Branch Address</h5>
                            <p>{"Branch Name: "+branch.branchname}</p>
                            <p>{"Address: "+branch.address}</p>
                            <p>{"Pin code: "+branch.pincode}</p>
                            <p>{"Email: "+branch.email}</p>
                            <p>{"Contact No:"+branch.managedBy}</p>
                            <a className="btn btn-primary m-1" rel="noopener noreferrer" 
                                    target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${branch.location}`}>Open Map</a>
                            <button className="btn btn-primary">
                                <i className="fa fa-whatsapp"></i>
                                <a className="custom-nav-link" rel="noopener noreferrer" 
                                target="_blank" href={"https://wa.me/=91"+branch.managedBy} > 
                                &nbsp;Chat with Branch Manager</a>
                            </button>
                            <br />
                            
                            </span>
                           
                        </div   >
                    ):
                    <p className="text-danger text-center">No Branches found</p>)
                }
           </div>
        )
    }
}
const mapStateToProps =(state)=>{
    return {
        userData:state
    }
}
export default connect(mapStateToProps)(SearchBranch);