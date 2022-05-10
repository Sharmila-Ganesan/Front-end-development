import React from 'react';
import {connect} from 'react-redux';

import {toast} from 'react-toastify';

import { getAllBranches, updateBranch } from '../../actions/branch';
import { clearMessage } from '../../actions/users';
import GenerateForm from '../../utils/generateForm';
import GenerateTable from '../../utils/generateTable';
import { generateFormData } from '../../utils/utils';
// import { filterRecordByDateRange, filterRecordByKey, formatDate } from '../../utils/utils';

import { initTokenCheck, propTokenCheck, roleValidation } from '../../utils/validator';

class ViewBranch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            details:[],
            allBranch:[],
            formData:[],
            isEditable:false 
        }
        this.openEditComponent = this.openEditComponent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){  
        initTokenCheck(this.props);
        roleValidation(this.props);
        this.props.dispatch(getAllBranches());

    }


    static getDerivedStateFromProps(props, state) {
        propTokenCheck(props);
        roleValidation(props);
        let {userData:{branch:{allBranch}}}=props; 
        if(allBranch && JSON.stringify(state.allBranch) !== JSON.stringify(allBranch)){
            // let branch= []
            // allBranch.forEach(element => {
            //     branch.push(element.branchcode);
            // });
            // branch =[...new Set(branch)] 
            // return {allBranch,details:allBranch,branch}
            return {allBranch,details:allBranch}
        }
        let {userData:{branch:{message,messageCode}}}=props;
        if(message){
            if(messageCode === "BU101"){
                toast.success(message);
                props.dispatch(getAllBranches());
            }else{
                toast.error(message);
            }
            props.dispatch(clearMessage())
        }
        return null;
    }

    openEditComponent(data){
        try {
            let formData = generateFormData(data);
            let index =formData.findIndex((obj => obj && obj.id === 'branchcode'));
            let temp=formData[index];
            temp.type="hidden";
            index =formData.findIndex((obj => obj && obj.id === 'managedBy'));
            temp=formData[index];
            temp.type="hidden";
            this.setState({formData,isEditable:true})
        } catch (error) {
            console.log(error)
        }
        
    }
    handleSubmit(data){
        try {
            this.props.dispatch(updateBranch(data))
            this.setState({isEditable:false})
        } catch (error) {
            console.log(error)
        }
    }
    render(){
        let {details,isEditable,formData}= this.state;
        let option={
            action:this.openEditComponent,
            column:"Action",
            actionName:"Edit"
        }   
        let button= {
            submit:true,
            reset:true
        }
        return(
           <div className="container-fluid form-items mt-3 mb-55">
               {!isEditable ? <GenerateTable data = {details} options={option} button={button} title="View Branch"/>   :
                <GenerateForm data ={formData} onSubmit = {this.handleSubmit} button={button} title="Edit Branch" />
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
export default connect(mapStateToProps)(ViewBranch);