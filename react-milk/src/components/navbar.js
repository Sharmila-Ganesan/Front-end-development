import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { clearData } from '../actions/users';
import DashBoardConfig from '../config/dashboard';

class NavBar extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            menu: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    
    
    toggleMenu(){
        this.setState({ menu: !this.state.menu })
    }

    logOut(){     
        this.props.dispatch(clearData());
        localStorage.removeItem('token');
    }

    render(){
        let {menu}=this.state;
        let {users:{token,userInfo}}=this.props;
        const show = (menu) ? "show" : "" ;   
        let browserToken = token ? token:"";
        let navItems=[]
        if(userInfo && userInfo.role){
            navItems = DashBoardConfig[userInfo.role];
        }
        return(
            <>
            <nav className="navbar unset-justify navbar-dark nav-bg sticky-top">
                 <div className="header-toggle" data-toggle="collapse" data-target="#navbarRes" onClick={ this.toggleMenu }>
                   <i className="fa fa-user-circle-o"></i>
               </div>
               <div className="navbar-brand flex-fill text-center" onClick={ ()=>this.setState({menu:false}) }>
                  <Link className="text-decoration-none text-white" to="/home">Sivalingam Milks</Link>
               </div>
               <Link  to="/notification"  onClick={ ()=>this.setState({menu:false}) }> <i className="fa fa-bell bell-icon"></i></Link>
              
            </nav>
            <div className={"collapse custom-nav-collapse " +show} id="navbarRes" onClick={ this.toggleMenu }>
             
                   <ul className="col-md-3 col-sm-9 navbar-nav custom-nav-show" >
                        {
                            navItems && navItems.length>0 && navItems.map((item)=>{
                                return (
                                    <li className="nav-item" key={item.key}>
                                        <Link className="nav-link custom-nav-link" to={`/${item.key}`}>{item.title}</Link>
                                    </li> 
                                )
                            })
                        }
                        <li className="nav-item">
                            <Link className="nav-link custom-nav-link" to="/about">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link custom-nav-link" to="/contact">Contact Us</Link>
                        </li>
                        {
                            browserToken ? (
                                <React.Fragment>                
                                     <li className="nav-item">
                                        <Link className="nav-link custom-nav-link" to="/login" onClick={this.logOut}>Log Out</Link>
                                    </li>
                                </React.Fragment>
                            )
                            :<React.Fragment>
                                    <li className="nav-item">
                                        <Link className="nav-link custom-nav-link" to="/login" >Log In</Link>
                                    </li>
                            </React.Fragment>

                        }
                   </ul>
                   <div id="nav-layer" className="col-md-9 col-sm-3 nav-hidden-layer"></div>
                 
               </div>
            </>
          )
    }
}

const mapStateToProps = (state)=>{
    return {
        users:state.users
    }
}

export default connect(mapStateToProps)(NavBar)