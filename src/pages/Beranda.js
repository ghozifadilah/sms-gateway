import React, { useEffect, useState } from 'react';
import Header from '../layout/Header';
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';
import WebSocketComponent  from '../pages/ws/WebSocketComponent';
import axios from "axios";


function Beranda() {

    useEffect(() => {   
        document.title = "Doran SMS | Beranda";
     
    }, []);

    const tokenUser = 'ujicoba';

   


const StatsCard = ({ title, icon, total, change, pass,percentagePass }) => {
    return (
        <div className='col-lg-3 col-md-6 col-sm-12'>
            <div className="card p-3" style={{ borderRadius: '10px', backgroundColor: '#222E3C', height: '135px' }}>
                <h5 style={{ fontSize: '12px' }} className="card-title">{title}</h5>
                <h2 style={{ fontSize: '26px', color: pass ? '#20C997' : '#FA5252' }}>
                    <i className={icon}></i> <span style={{ fontWeight: 'bold' }}>{total}</span>
                    <span style={{ fontSize: '12px' }}> /Month</span>
                </h2>
                <h5 style={{ fontSize: '12px' }} className="card-title">{pass ? 'Passed' : 'Rejected'}</h5>
                {/* <p style={{ fontSize: '10px', color: 'white' }}>
                    {change < 0 ? <span style={{ color: percentagePass ? '#FA5252' : '#20C997' }}>{change}%</span> : <span style={{ color: '#21BE1E' }}>{change}%</span>} Since 30/days ago
                </p> */}
            </div>
        </div>
    );
};



        // ==========================================
  
  return (
    <div className='wrapper'>
        <Menu />
        <div className='main'>
            <Header />
         
            <main className="content" style={{backgroundColor: '#101726'}}>
            <h1 className=" mb-3 text-white" > <strong>Home </strong> </h1>
                <div className="container-fluid p-0">

     
                    <div className='row'>
                        {/* {statsBaterai[1] && (
                            <StatsCard
                                title="Tested Battery"
                                icon="fas fa-car-battery"
                                total={statsBaterai[1].total}
                                change={statsBaterai[1].change}
                                pass={true}
                                percentagePass={true}
                            />
                        )}
                        {statsBaterai[3] && (
                            <StatsCard
                                title="Tested Battery"
                                icon="fas fa-car-battery"
                                total={statsBaterai[3].total}
                                change={statsBaterai[3].change}
                                pass={false}
                                percentagePass={false}
                            />
                        )}
                        {statsBaterai[0] && (
                            <StatsCard
                                title="Tested Cell"
                                icon="fas fa-server"
                                total={statsBaterai[0].total}
                                change={statsBaterai[0].change}
                                pass={true}
                                percentagePass={true}
                            />
                        )}
                        {statsBaterai[2] && (
                            <StatsCard
                                title="Tested Cell"
                                icon="fas fa-server"
                                total={statsBaterai[2].total}
                                change={statsBaterai[2].change}
                                pass={false}
                                percentagePass={false}
                            />
                        )} */}
                    </div>

                    <div className="row mt-3">
                    <div className="col-12">
                        <div style={{padding: '20px',borderRadius: '10px',backgroundColor: '#222E3C'}}  className="card">
                                <div className="card-body">
                                    
                                   
                                    <div className="row">
                                        <div className="col-lg-12 d-flex justify-content-between align-items-center">
                                       
                                        </div>
                                    </div>

                                   
                                    <div style={{padding: '15px',borderRadius: '10px',backgroundColor: '#222E3C',marginTop: '5px'}}  className="card">

                                      
                                   
                                    </div>
                                 
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    </div>
  );
}

export default Beranda;
