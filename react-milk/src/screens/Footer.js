import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Footer extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            menu: false
        };
      
    }
    
    
   removeLayer(){
       try {
        document.getElementById('navbarRes').classList.remove("show");
       } catch (error) {
           console.log(error)
       }
      
   }

    render(){     
        let {users:{token,userInfo}}=this.props;  
        let browserToken = token ? token:"";
        let role = userInfo && userInfo.role ? userInfo.role :"";
        return(
            <>
            {browserToken ?
            <div className="row footer" onClick={this.removeLayer}>
                <div className="col-3 footer-icons">
                    <Link  to="/home"><i className="fa fa-home "></i></Link>  
                </div>
                <div className="col-3 footer-icons">
                    <Link to="/statement"><i className="fa fa-file-text-o"></i></Link> 
                </div>
                {
                    role === "admin" ? <React.Fragment>
                        <div className="col-3 footer-icons">
                            <Link  to="/payout"><i className="fa fa-credit-card"></i></Link>
                        </div>
                        <div className="col-3 footer-icons">
                            <Link  to="/"> <i className="fa fa-history "></i></Link>
                        </div>
                    </React.Fragment>:
                    <React.Fragment>
                        <div className="col-3 footer-icons">
                            <Link  to="/paybill"><i className="fa fa-credit-card"></i></Link>
                        </div>
                        <div className="col-3 footer-icons">
                            <Link  to="/history"> <i className="fa fa-history "></i></Link>
                        </div>

                    </React.Fragment>

                }
                
            </div>
            
            :null}
            </>
            
           

          )
    }
}

const mapStateToProps = (state)=>{
    return {
        users:state.users
    }
}

export default connect(mapStateToProps)(Footer)
