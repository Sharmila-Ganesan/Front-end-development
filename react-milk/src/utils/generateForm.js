import React from 'react';
import QrCodeReader from '../components/QrCodeReader';
// const Mousetrap = require("mousetrap");
import Mousetrap from 'mousetrap';

import {requiredValidation,lengthValidation, emailValidation, phoneNumberValidation, locationValidation} from '../utils/validator'
import { setGeoLocation } from '../config/signup';

import '../sass/form.scss';
class GenerateForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:this.props.data
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetData = this.resetData.bind(this);
        this.refreshLocation=this.refreshLocation.bind(this);
        this.hotKeyControl=this.hotKeyControl.bind(this)
    }
    componentDidMount(){     
        Mousetrap.bind('alt+o', this.hotKeyControl);
    }

    static getDerivedStateFromProps(props,state) { 
        if(JSON.stringify(props.data) !== JSON.stringify(state.data)){
            return {data:props.data}
        }
        return null
    }

    hotKeyControl(){
        var {data} = this.state;
        data.forEach((element)=>{
            if(element.qrcode){
                this.qrControl("open",element);
            }
        })
    }

    componentWillUnmount(){
        Mousetrap.unbind("alt+o");
    }

    handleChange(e,element){
        let {data} = this.state;
        let value = e.target.value;
        let objIndex = data.findIndex((obj => obj.id === element.id));
        let field = data[objIndex];
        field.value=value;
        field.err=""; 
        if(field.formula){
            let destIndex = data.findIndex((obj => obj.id === element.formula.destination));
            let dest = data[destIndex];
            dest.err="";
            dest.value = field.formula.action(value)+"";
            if(dest.value === ""){
                field.value=""
            }
        }
        this.setState({data})
    }
    handleSubmit(e){
        try {
            e.preventDefault();
            let {data} = this.state;
            let processedData={};
            let flag=false;
    
            data.forEach((element,idx) => {
                element.value +="";
                let value = element.value ? element.value.trim():"";
                if(element.rules){
    
                    let rules = element.rules;
                    if(rules.required && ! requiredValidation(value)){
                        element.err=element.title + " is Required";
                        flag=true;
                        return false;
                    }
                    if(rules.length && ! lengthValidation(value,rules.min,rules.max)){
                        element.err=element.title + " should be minimum "+rules.min+" characters and maximum "+rules.max+' characters.' ;
                        flag=true;
                        return false;
                    }
                    if(rules.mobile && !phoneNumberValidation(value)){
                        element.err="Enter valid Mobile Number";
                        flag=true;
                        return false;
                    }
                    if(rules.email && !emailValidation(value)){
                        element.err="Enter valid email";
                        flag=true;
                        return false;
                    }
                    if(rules.location && !locationValidation(value)){
                        element.err="Invalid location, ie: 8.763250, 77457080";
                        flag=true;
                        return false;
                    }
                }
                processedData[element.id]=value;
                if(element.type === "hidden"){
                    delete data[idx];
                }
            });
            if(flag){
                this.setState({data})
                return false;
            }
            this.props.onSubmit(processedData);
            this.resetData();
          
            
        } catch (error) {
            console.log(error);
            return {}      
        }
       
    }
    qrControl(mode,value){
        try {
            if(mode === "open"){
                this.setState({qrStatus:true,element:value})
            }else if(mode === "close"){
                this.setState({qrStatus:false})
            }else if(mode === "set"){
                if(value){
                value=JSON.parse(value)
                let {data,element} = this.state;
                let objIndex = data.findIndex((obj => obj && obj.id === element.id));
                let field = data[objIndex];
                field.value=value.name;
                field.err=""; 
                let qrIndex = data.findIndex((obj => obj && obj.id === "mobile"));
                if(qrIndex !== -1){
                    let qrField = data[qrIndex];
                    qrField.value=value.mobile;
                }else{
                    data.push({
                        id:"mobile",
                        value:value.mobile,
                        type:"hidden"
                    })
                }
               
                this.setState({data,qrStatus:false})
                }
            }            
        } catch (error) {
            console.log(error)
        }
        
    }
    
    async refreshLocation(){
        await setGeoLocation();
        let {data} = this.state;
        let objIndex = data.findIndex((obj => obj.id === "location"));
        let field = data[objIndex];
        field.value=localStorage.getItem('position');
        field.err=""; 
        this.setState({data,qrStatus:false})
    }
    resetData(){
        let {data} = this.state;
        data.forEach(element => {
            element.value=element.default;
        });
        this.setState({data});
    }
    render(){
        let {data,qrStatus} = this.state;
        let {button:{submit,reset}} = this.props
        return(
            <form className="custom-form" onSubmit={this.handleSubmit}>
                {this.props.title && <h4>{this.props.title}</h4>}
               
            { data && data.map(element => {
                // creating form element from object
                    if(element.type !== "hidden"){
                        return (
                            <div className="form-group col p-0 m-1" key={element.id}>
                                {element.title && <label htmlFor={element.id} className="cap form-title">{element.title +" :"}</label>}
                                {
                                    element.type === "select" ? <select className="form-control" id="sel1" value={element.value}
                                    onChange={(e)=>this.handleChange(e,element)}>
                                        {
                                            element.options && element.options.length >0 ? element.options.map((option)=>{
                                                return (<option key={option.key} value={option.key} > {option.value}</option> )
                                            }):null
                                        }
                                 
                                  </select> :
                                  <React.Fragment>
                                  <input type={element.type} name={element.id} className={`form-control  ${element.partitioned ? "partitioned":"custom-input"} ${element.err ? 'input-err':''}`} value={element.value}
                                    placeholder={element.placeholder} maxLength={element.maxLength ? element.maxLength:50} autoFocus={element.autofocus ? true:false} onChange={(e)=>this.handleChange(e,element)} autoComplete="off" readOnly={element.readOnly ? true:false}/>
                                     {element.qrcode ? <button className="btn cam-position" type="button" onClick={(e)=>this.qrControl("open",element)}><i className="fa fa-qrcode cam-color" ></i></button>:null}
                                     {element.location ? <button className="btn cam-position" type="button" onClick={this.refreshLocation}><i className="fa fa-map-marker cam-color" ></i></button>:null}
                                     {element.hint && <span>{element.hint}</span>}
                                     {element.qrcode && qrStatus ? <QrCodeReader onSucces={(value)=>this.qrControl("set",value)} onCancel={()=>this.qrControl("close")} />:null}
                                  </React.Fragment>
                                }
    
                                <label className="input-err text-danger">{element.err ? element.err :""}</label>
                            </div>
                        )     

                    }else{
                        return ''
                    }
                   
            })}
            <div className="form-group  col-12  d-flex justify-content-space-around">
                
                {reset && <input type="reset" className="btn btn-danger" value="Reset" onClick={this.resetData}/>}
                {submit && <input type="submit" id="form-submit" value="Proceed" className="btn btn-primary"/> }
            </div>
         
         </form>
        )
    }
}

export default GenerateForm;