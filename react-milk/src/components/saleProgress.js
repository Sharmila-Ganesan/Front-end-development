import React from 'react';

class SaleProgress extends React.Component{


    render(){
        let {params:{quantity,processed}} = this.props;
        let value = Math.ceil((processed/quantity)*100);
        
        value = isNaN(value) ? 0 : value > 100 ? 100:value;
        return(
            <div className="sale-overflow">
                <div className="row p-4 process-box  mb-55">
                    <h3 className="col-12 p-1 "> Processing...</h3>
                    <div className="progress pbar">
                        <div className="progress-bar progress-bar-success progress-bar-striped " role="progressbar"
                        aria-valuenow={value} aria-valuemin="0" aria-valuemax="100" style={{width:`${value}%`}}>
                        {` ${value}% Complete`}
                        </div>
                    </div>
                    
                    <h3 className="col-12 p-1">{` Processed ${processed} ml`}</h3>
                    </div>
            </div>
        )
    }
}

export default SaleProgress;