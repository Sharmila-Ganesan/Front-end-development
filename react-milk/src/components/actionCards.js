import React from 'react';

class ActionCards extends React.Component{

    render(){
        let {data,handleClick} = this.props;
        return(
            <div className="row dashboard-items justify-content-center">
                {
                    data && data.length>0 && data.map((element)=>{
                        return (<div className="col-md-3 col-lg-3 col-sm-12 custom-card" key={element.key}
                         onClick={()=>handleClick(element.key)}>{element.title}</div>)
                    })
                }
                
               
            </div>
        )
    }
}

export default ActionCards;