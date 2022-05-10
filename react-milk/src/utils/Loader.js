import React from 'react';

class Loader extends React.Component{

    render(){    
        return(
            <div id= "customloader" className="custom-loader">
                <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}

export default Loader;