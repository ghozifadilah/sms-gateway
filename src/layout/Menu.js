import React from 'react';
import { useLocation, Link } from 'react-router-dom';



function Menu() {
    const location = useLocation();

    const isActive = (path) => {
      if (path === '/') {
        return location.pathname === '/' ? 'active' : '';
      }
      return location.pathname.startsWith(path) ? 'active' : '';
    };
  
  
    return (
      <nav id="sidebar" className="sidebar js-sidebar">
        <div className="sidebar-content js-simplebar">
          <a className="sidebar-brand" href="/">
            <span className="align-middle">
              <div className='row mt-4'>
                <div className='col-3'>
                <img  src={`${process.env.PUBLIC_URL}/img/logo1.png`} className="avatar-custom img-fluid " alt="Logo" />
                </div>
                <div className='col-9'>
                  <p style={{ fontSize: '15px', color: 'white', alignItems: 'left',fontWeight: '700',marginTop:'5px' }} className='text-uppercase'>
                  Doran SMS
                  </p>
                </div>
              </div>
            </span>
          </a>
          <ul className="sidebar-nav" style={{ fontSize: '15px' }}>
       
            <li className={`sidebar-item ${isActive('/')}`}>
              <Link className="sidebar-link" to="/">
                <i className="fas fa-home"></i>{" "}
                <span className="align-middle">Home</span>
              </Link>
            </li>

            <li className={`sidebar-item ${isActive('/gateway')}`}>
              <Link className="sidebar-link" to="/gateway">
                <i className="fas fa-sms"></i>{" "}
                <span className="align-middle">Sms Gateway API</span>
              </Link>
            </li>

            <li className={`sidebar-item ${isActive('/simcard')}`}>
              <Link className="sidebar-link" to="/simcard">
                <i className="fas fa-phone"></i>{" "}
                <span className="align-middle">Sim Card</span>
              </Link>
            </li>
       
            <li className={`sidebar-item ${isActive('/device')}`}>
              <Link className="sidebar-link" to="/device">
                <i className="fas fa-tools"></i>{" "}
                <span className="align-middle">Device</span>
              </Link>
            </li>
          
            <li className={`sidebar-item ${isActive('/user')}`}>
              <Link className="sidebar-link" to="/user">
                <i className="fas fa-user"></i>{" "}
                <span className="align-middle">User</span>
              </Link>
            </li>
            <li className={`sidebar-item ${isActive('/Sending_log')} `}>
              <Link className="sidebar-link" to="/Sending_log">
                <i className="fas fa-list"></i>{" "}
                <span className="align-middle">Sending Log</span>
              </Link>
            </li>
        
          </ul>
        </div>
      </nav>
    );
}

export default Menu;
