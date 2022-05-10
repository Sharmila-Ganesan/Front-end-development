import React from 'react';

import {Link} from 'react-router-dom';

class NotFound extends React.Component{
    
    render(){
      
        return(
            <div className="container" >
                <div className="">
                    <h1>OOPS !</h1> 
                    <h3>404 : Page not found</h3>
                    <Link className="btn btn-primary" to="/home">Retrun Home</Link>
                </div>
            </div>
        )
    }
}

export default NotFound;