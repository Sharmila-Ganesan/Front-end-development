import React from 'react';
import {connect} from 'react-redux';
import exportFromJSON from 'export-from-json'

import { getPurchaseStatement } from '../actions/statement';

import { initTokenCheck, propTokenCheck, roleValidation } from '../utils/validator';
import { formatDate,searchByValue } from '../utils/utils';


class PurchaseStatement extends React.Component{
    constructor(props){
        super(props);
        this.state={
           details:[],
           data:[],
           startDate:formatDate(new Date(),"date"),
           endDate:formatDate(new Date(),"date"),
           role:"",
           salesman:"",
           customer:"",
           totalAmount:0,
           totalQuantity:0,
           branchcode:"",
           saleTime:''
        }
       this.handleClick=this.handleClick.bind(this);
       this.handleChange=this.handleChange.bind(this);
       this.exportToCsv=this.exportToCsv.bind(this);
       this.filterRecord = this.filterRecord.bind(this);
    }


    componentDidMount(){  
       
        let { userData:{users:{userInfo:{role}}},from} = this.props;
        if(!from){
            initTokenCheck(this.props);
            roleValidation(this.props);
        }
        this.setState({role});
        this.props.dispatch(getPurchaseStatement()); 
    }
 
    static getDerivedStateFromProps(props,state){
        
        let {userData:{users:{userInfo:{role}},statement:{details}},from}=props;
        if(!from){
            propTokenCheck(props);
            roleValidation(props);
        }
       
        let {totalAmount,totalQuantity,saleTime,cumtotal,cumquantity}=state;
        if(JSON.stringify(details) !== JSON.stringify(state.data)){
            totalAmount=0;
            totalQuantity=0;
            let tempDate = new Date().getHours();
            saleTime = tempDate >=12  ? "PM" :"AM";
            let tempDetails = [];
            cumtotal = 0;
            cumquantity = 0;
            details.forEach(element => {
                let elementTime = new Date(element.Date).getHours()
                if(saleTime === "AM" && elementTime < 12){
                    tempDetails.push(element);
                    totalAmount += parseInt(element.price);
                    totalQuantity += parseInt(element.quantity);
                }else if(saleTime === "PM" && elementTime >= 12){
                    tempDetails.push(element);
                    totalAmount += parseInt(element.price);
                    totalQuantity += parseInt(element.quantity);
                }
                cumtotal += parseInt(element.price);
                cumquantity += parseInt(element.quantity);

            });
            return {data:details,details:tempDetails,totalAmount,cumtotal,totalQuantity,cumquantity,role,saleTime}
        }
      
        
        return {role};
    }
    exportToCsv(){
        try{
            let {data}  = this.state;
            const fileName = formatDate(new Date(),"date")+'-statement'
            const exportType = 'csv'
            
            let tempdata = [...data];
            tempdata = tempdata.map(element => {
                element.Date = formatDate(new Date(element.Date),"date");
                return element;
            });
            exportFromJSON({ data:tempdata, fileName, exportType })
    
        }catch(err){
            console.log(err);
        }
    }
   
    handleChange(e,element){
        let value = e.target.value;
        let {startDate,endDate,details,salesman,customer,data,totalAmount,totalQuantity,cumtotal,cumquantity,branchcode}=this.state;
        switch(element){
            case "start":
                startDate=value
                break;
            case "end":
                endDate=value;
                break;

            case "salesman":
                salesman=value;
                if(value){
                    let [temp,ttl,ttq]= searchByValue(data,"salesmanId",value);
                    totalAmount=ttl;
                    totalQuantity=ttq;
                    details=temp;
                }else{
                    details=data;
                    totalAmount=cumtotal;
                    totalQuantity=cumquantity;
                }
                break;
            case "customer":
                customer=value;
                if(value){
                    let [temp,ttl,ttq]= searchByValue(data,"customerId",value);
                    totalAmount=ttl;
                    totalQuantity=ttq;
                    details=temp;
                }else{
                    details=data;
                    totalAmount=cumtotal;
                    totalQuantity=cumquantity;
                }
                break;
            case "branch":
                branchcode=value;
                if(value){
                    let [temp,ttl,ttq]= searchByValue(data,"branchcode",value);
                    totalAmount=ttl;
                    totalQuantity=ttq;
                    details=temp;
                }else{
                    details=data;
                    totalAmount=cumtotal;
                    totalQuantity=cumquantity;
                }
                break;
            default:
                break;
        }
        this.setState({startDate,endDate,salesman,customer,details,totalAmount,totalQuantity,branchcode})
    }
    handleClick(){
        let {startDate,endDate}=this.state;
        let param ={
            startDate,
            endDate
        }
        this.props.dispatch(getPurchaseStatement(param));  
    }
    filterRecord(e){
        let {data,details,totalQuantity,totalAmount,saleTime,cumquantity,cumtotal}=this.state;
        let key = e.target.value;
        saleTime = key;
        details=[]
        if(key){
            totalAmount = 0;
            totalQuantity = 0;
            data.forEach(element => {
                let tempDate = new Date(element.Date).getHours();
                if(key === "AM" && tempDate < 12){
                    details.push(element);
                    totalAmount += parseInt(element.price);
                    totalQuantity += parseInt(element.quantity);
                }else if(key === "PM" && tempDate >= 12){
                    details.push(element);
                    totalAmount += parseInt(element.price);
                    totalQuantity += parseInt(element.quantity);
                }
                
            });
            
        }else{
            totalAmount = cumtotal;
            totalQuantity = cumquantity; 
            details =data;
        }

        this.setState({details,totalAmount,totalQuantity,saleTime})

    }
    render(){
        let {details,startDate,endDate,salesman,customer,role,totalAmount,totalQuantity,branchcode,saleTime}=this.state;
        let {from} = this.props;
        let maxDate = formatDate(new Date(),"date");
        totalQuantity=totalQuantity>1000 ? (totalQuantity/1000)+" Ltr": totalQuantity+" ml";
        return(
          <div className={"mb-55 "+(from ? "col-md-6 col-sm-12":"container-fluid mt-3 ")}>
              {
                  from ? <h6 >LAST PURCHASES</h6> :
                  <React.Fragment>
              <h4 className="text-center"> Statement</h4>
              <div className="row m-1">
                <div className="form-group col-md-6 col-sm-12">
                        <label htmlFor="fromDate">From Date :</label>
                        <input type="date" name="fromDate" className='form-control'
                        placeholder={"from date"} value={startDate}
                        onChange={(e)=>this.handleChange(e,"start")}
                        autoComplete="off" max={maxDate}/>
                        <label className="input-err text-danger">{""}</label>
                </div>
                <div className="form-group col-md-6 col-sm-12">
                        <label htmlFor="toDate">To Date :</label>
                        <input type="date" name="toDate" className='form-control'
                        placeholder={"To date"} value={endDate}
                        onChange={(e)=>this.handleChange(e,"end")}
                         autoComplete="off"  max={maxDate}/>
                        <label className="input-err text-danger">{""}</label>
                </div>
                <div className="col-12 d-flex align-items-center justify-content-center">
                    <button className=" btn btn-primary" onClick={this.handleClick}>Apply</button>
                </div>
                {
                    role && (role !== "customer" && role !== "salesman") ?
                 
                       
                        <div className="row m-1">
                            
                        <h5 className="col-12">Filter By</h5>
                        <div className="form-group col-6">
                            <label htmlFor="salesmanId">By Salesman :</label>
                            <input type="number" name="salesmanId" className='form-control'
                            placeholder={"SalesmanId"} value={salesman}
                            onChange={(e)=>this.handleChange(e,"salesman")}
                            autoComplete="off" />
                            <label className="input-err text-danger">{""}</label>
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="customerId">By Customer :</label>
                            <input type="number" name="customerId" className='form-control'
                            placeholder={"Customer Id"} value={customer}
                            onChange={(e)=>this.handleChange(e,"customer")}
                            autoComplete="off" />
                            <label className="input-err text-danger">{""}</label>
                        </div>
                        
                        
                        {
                            role === "admin" &&   <div className="form-group col-6">
                            <label htmlFor="branch">By Branch :</label>
                            <input type="text" name="branch" className='form-control'
                            placeholder={"Branch"} value={branchcode}
                            onChange={(e)=>this.handleChange(e,"branch")}
                            autoComplete="off" />
                            <label className="input-err text-danger">{""}</label>
                        </div>
             
                        }
                      
                        </div>:null
                }
              
              
              </div>
              <div className="d-flex justify-content-end m-3">
                <button className="btn btn-primary " onClick={this.exportToCsv}><i className="fa fa-file-text-o"></i> Export to CSV </button>
              </div>        
                  </React.Fragment>
              }
                {totalAmount>0 && !from ? <div className="col-12 text-center mt-2">
            <h6 className="text-primary">{"Total Amount: "} <span>&#8377; </span> {totalAmount}</h6>
            <h6 className="text-success">{"Total Quantity: "+ totalQuantity}</h6>
            </div> :""}
              {
                  !from && role !== 'customer' && <div className="form-group col-md-6 col-sm-12">
                  <label htmlFor="byTime">Filter By Time :</label>
                  <select className="form-control" id="byTime" value={saleTime} onChange={this.filterRecord}>                   
                      <option key="" value=""> Full Day</option>     
                      <option key="am" value="AM" > Morning(AM)</option>   
                      <option key="pm" value="PM" > Evening (PM)</option>       
                  </select>
                </div>
              }

              <div className="statement-bg">
              {role === 'customer' ? <div className="customer-stmt">
                    <div className="customer-stmt-head text-center">
                        <h6 className="col-6">DATE &amp; TIME</h6>
                        <h6 className="col-3">QUANTITY</h6>
                        <h6  className="col-3">PRICE</h6>
                    </div>
                    <div className="customer-stmt-body">
                    {details && details.length>0 ? 
                        details.map((detail,index)=>{
                            return(<div key={index} className="customer-stmt-row text-center">
                                <span className="col-6">{formatDate(detail.Date)}</span>
                                <span className="col-3">{detail.quantity+"ML"}</span>
                                <span className="col-3">&#8377;{detail.price}</span>
                            </div>)
                        })
                        :
                        <div className="col-12 d-flex align-items-center justify-content-center mt-2">
                            <h6 className="text-primary">  No details found</h6>
                        </div>}
                            </div>
                  </div>
              
              :
                <React.Fragment>
                    
               
                  {details && details.length>0 ? 
                  details.map((detail,index)=>{
                      return(
                        <div className="row statement-item" key={index}> 
                            <span className="col-5 head-text">Date</span>
                            <span className="col-4 head-text">Quantity</span>
                            <span className="col-3 head-text">Price</span>
                            <span className="col-5 date-text">{formatDate(detail.Date)}</span>
                            <span className="col-4 content-text">{detail.quantity+"ml"}</span>
                            <span className="col-3 content-text">&#8377;{detail.price}</span>
                            {role !== 'customer' && 
                                <React.Fragment>
                                    <span className="col-6 head-text">Transaction ID</span>
                                    <span className="col-6 head-text">Customer Name</span>
                                    <span className="col-6 content-text">{detail._id}</span>
                                    
                                    <span  className="col-6 content-text">{detail.customerId ? <a title={detail.customerId} href={"tel:+91"+detail.customerId}>{detail.customerName}</a>:""}</span> 
                                    {
                                        role !== 'salesman' && 
                                        <React.Fragment>
                                            <span className="col-6 head-text">Salesman Id</span>
                                            <span className="col-6 content-text">{detail.salesmanId}</span>
                                            {
                                              role !== 'branchmanager' &&  
                                              <React.Fragment>
                                                     <span className="col-6 head-text">Branch</span>
                                              <span className="col-6 content-text">{detail.branchcode}</span>
                                              </React.Fragment>
                                            } 
                                            
                                        </React.Fragment> 
                                    }
                                </React.Fragment>
                            } 
                        </div>

                      )
                    
                  })
                  :<div className="col-12 d-flex align-items-center justify-content-center mt-2">
                        <h6 className="text-primary">  No details found</h6>
                    </div>
                  }
                   </React.Fragment>
              }
              </div>
              
          </div>
        )
    }
    
}
const mapStateToProps =(state)=>{
    return {
        userData:state
    }
}
export default connect(mapStateToProps)(PurchaseStatement);