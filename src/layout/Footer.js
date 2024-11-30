import React from 'react';

function Footer() {
    return(
        <footer className="footer" style={{backgroundColor: '#101726'}}>
        <div className="container-fluid">
          <div className="row text-muted">
            <div className="col-6 text-start">
              {/* <p className="mb-0  text-white">
                Copyright © 2024 . 
                <a className="text-white" href="https://merapikoding.com/" target="_blank">
                 
                </a>
              </p> */}
            </div>
            <div className="col-6 text-end">
              {/* <ul className="list-inline">
                <li className="list-inline-item">
                  <a className="text-white" href="https://adminkit.io/" target="_blank" >
                    Support 
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="text-white" href="https://adminkit.io/" target="_blank" >
                    Privacy 
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="text-white" href="https://adminkit.io/" target="_blank" >
                    Terms 
                  </a>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </footer>      
    );
}

export default Footer;