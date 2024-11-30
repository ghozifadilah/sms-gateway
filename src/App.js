import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle';
import Login from './pages/Login';
import Beranda from './pages/Beranda';
import PrivateRoute from './PrivateRoute';
import User from './pages/User';

import Device from './pages/Device';
import Simcard from './pages/Simcard';
import Gateway from './pages/Gateway';
import Sending_log from './pages/Sending_log';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route exact path='/' element={<PrivateRoute />}>
            <Route path="/" element={<Beranda />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/page/:pageNumber" element={<User />}/>
            <Route path="/user/search/:searchQuery" element={<User />}/>
            <Route path="/device" element={<Device />} />
            <Route path="/device/page/:pageNumber" element={<Device />}/>
            <Route path="/device/search/:searchQuery" element={<Device />}/>
            <Route path="/Simcard" element={<Simcard />} />
            <Route path="/Simcard/page/:pageNumber" element={<Simcard />}/>
            <Route path="/Simcard/search/:searchQuery" element={<Simcard />}/>
            <Route path="/Gateway" element={<Gateway />} />
            <Route path="/Gateway/page/:pageNumber" element={<Gateway />}/>
            <Route path="/Gateway/search/:searchQuery" element={<Gateway />}/>
            <Route path="/Sending_log" element={<Sending_log />} />
            <Route path="/Sending_log/page/:pageNumber" element={<Sending_log />}/>
            <Route path="/Sending_log/search/:searchQuery" element={<Sending_log />}/>
            {/* 
            <Route path="/notifikasi" element={<Notifikasi />} />
            <Route path="/log_user" element={<LogUser />} />
            <Route path="/log_user/page/:pageNumbe" element={<LogUser />} />
            <Route path="/log_user/search/:searchQuery" element={<LogUser />} />
            <Route path="/pengujian/page/:pageNumbe" element={<Pengujian />} />
            <Route path="/pengujian/search/:searchQuery" element={<Pengujian />} />
            <Route path="/spesifikasi" element={<Spesifikasi />} />
            <Route path="/spesifikasi/page/:pageNumbe" element={<Spesifikasi />} />
            <Route path="/spesifikasi/search/:searchQuery" element={<Spesifikasi />} />
            <Route path="/daftar_alat" element={<Alat />} />
            <Route path="/daftar_alat/page/:pageNumber" element={<Alat />}/>
            <Route path="/daftar_alat/search/:searchQuery" element={<Alat />}/>
            <Route path="/cell_baterai" element={<CellBaterai />} />
            <Route path="/cell_baterai/page/:pageNumber" element={<CellBaterai />}/>
            <Route path="/cell_baterai/search/:searchQuery" element={<CellBaterai />}/>
            <Route path="/Baterai" element={<Baterai />} />
            <Route path="/Baterai/page/:pageNumber" element={<Baterai />}/>
            <Route path="/Baterai/search/:searchQuery" element={<Baterai />}/>
            <Route path="/monitoring_post_production" element={<MonitoringPostProduksi />} />
            <Route path="/monitoring_pre_production" element={<MonitoringPreProduksi />} />
            <Route path="/cetak_cell/:interval/:waktu" element={<Cetak_cell />} />
            <Route path="/cetak_detail_cell/:id" element={<Cetak_detail_cell />} />
            <Route path="/cetak_baterai/:interval/:waktu" element={<Cetak_baterai />} />
            <Route path="/cetak_detail_baterai/:id" element={<Cetak_detail_baterai />} />
            <Route path="/cetak_pre" element={<Cetak_pre />} />
            <Route path="/cetak_post" element={<Cetak_post />} /> */}
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
