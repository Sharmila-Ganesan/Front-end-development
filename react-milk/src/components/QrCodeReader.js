

import React from 'react';

import QrReader from 'react-qr-reader';

class QrCodeReader extends React.Component{
  
    
    render(){
        let {onCancel,onSucces}=this.props;
        return(
            <div className="full-overley" tabIndex="0"  onKeyPress={(e)=>{
                if(e.key){
                    onCancel();
                }   
            }}>
                <div className="popup-main">
                    <QrReader
                        delay={300}
                        showViewFinder={false}
                        facingMode={"environment"}
                        onError={(err)=>{console.log(err);onCancel()}}
                        onScan={(data)=>{onSucces(data)}}
                        style={{ width: '100%' }}
                    />
                    <span className="qr-cancel">
                     <button className="btn btn-danger " type="button" onClick={onCancel}>Cancel</button>
                    </span>
                </div>
               
            </div>
        )
    }
}

export default QrCodeReader;