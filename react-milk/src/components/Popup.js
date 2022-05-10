
import React from 'react';
import GenerateForm from '../utils/generateForm';
import '../sass/popup.scss'


class Popup extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
       
    }
  
    
    render(){
        try{
            let {data,title,onClose,onSubmit}=this.props;
            let button= {
                submit:true,
                reset:true
            }
            return(
             <div className="popup-overlay">
                <div className="popup-container">
                    <div className="popup-header">
                        <span>{title}</span>
                        <span onClick={onClose}><i className="fa fa-times"></i></span>
                    </div>
                    <div className="popup-body">
                        <GenerateForm data={data} onSubmit={onSubmit} button={button} title={""} />
                    </div>
                  
                </div>
             </div>
             )
        }catch(err){
            console.log(err)
        }
      
    }
}

export default Popup;