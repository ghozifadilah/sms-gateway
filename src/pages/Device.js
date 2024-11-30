
            import React, { useEffect, useState } from 'react';
            import { useParams } from 'react-router-dom';
            import { Form, Button,InputGroup, Modal   } from "react-bootstrap";
            import axios from "axios";
            import { Link ,useNavigate } from 'react-router-dom';
   

            import Header from '../layout/Header';
            import Menu from '../layout/Menu';
            import Footer from '../layout/Footer';

            function Device() {
            
            
            const [id, setid] = useState('');

            const [DataResponse, setDataResponse] = useState([]);
            
            const [Total, setTotal] = useState(1); // total halaman
            const [currentPage, setCurrentPage] = useState(1); // halaman yang aktif
            const limit = 10; // jumlah item per halaman
            const [key, setKey] = useState('');

            const navigate = useNavigate();

            // Access the URL parameters
            const { pageNumber } = useParams();

            // Now you can use pageNumber in your component logic
            // For example, you can convert it to a number
            const currentPageNumber = parseInt(pageNumber);


            useEffect(() => {
                document.title = "Doran SMS | Device";
            }, []);


            
            useEffect(() => {
                getDevice();
            }, [currentPage]);

                // Variable Input
                const [nama, setNama] = useState(''); 
                const [model, setModel] = useState(''); 
                const [sim_total, setSim_total] = useState(''); 
                const [port, setPort] = useState(''); 
                const [baudrate, setBaudrate] = useState(''); 
                const [status, setStatus] = useState(''); 
           



                // dapatkan data Device 
                const getDevice = async () => {
                    
                    var pages = currentPageNumber;

                    if (isNaN(currentPageNumber)) {
                        pages = currentPage; // Use currentPage if currentPageNumber is NaN
                    }

                    const response = await axios.get(`/Device?page=${pages}&limit=${limit}`);

                    if (response.data.length) {
                    setDataResponse(response.data[0]);
                    setTotal(Math.ceil(response.data[1].jumlah / limit));

                    }
                }

                    //Add new Device
                    const [newDeviceModal, setnewDevice] = useState(false);
                    const newDeviceModalClose = () => setnewDevice(false);
                    const newDeviceModalShow = () => {
                    setnewDevice(true);
                    
                    setid('');
                    setNama('');
                    setModel('');
                    setSim_total('');
                    setPort('');
                    setBaudrate('');
                    setStatus('');


                    }
                    // tambah Device
                    const Tambah = async (e) => {

                    
                    e.preventDefault();
                    await axios.post('/device', {
                       nama : nama, 
                      model : model, 
                      sim_total : sim_total, 
                      port : port, 
                      baudrate : baudrate, 
                      status : status, 


                      });
                    getDevice();
                    newDeviceModalClose();
                    }

                // Edit Device 
                const [editDeviceModal, seteditDevice] = useState(false);
                const editClose = () => {
                    seteditDevice(false);
                    setid('');
                    setNama('');
                    setModel('');
                    setSim_total('');
                    setPort('');
                    setBaudrate('');
                    setStatus('');


                }

                const editShow = (data) => {

                    console.log(data);

                    seteditDevice(true);
                    console.log(data);
                    setid(data.id);
                    setNama(data.nama);
                    setModel(data.model);
                    setSim_total(data.sim_total);
                    setPort(data.port);
                    setBaudrate(data.baudrate);
                    setStatus(data.status);



                }

                const Edit = async (e) => {
                    e.preventDefault();
                    await axios.put(`/Device/${id}`, {
                    id:id,
                     nama : nama, 
                  model : model, 
                  sim_total : sim_total, 
                  port : port, 
                  baudrate : baudrate, 
                  status : status, 


                    });
                    getDevice();
                    editClose();
                }


                // hapus data Device 
                // Modal
                const [deleteModal, setdetele] = useState(false);
                const deleteModalClose = () => {
                setdetele(false);
                setid('');
                }
                
                const deleteModalShow = (id) => {
                setdetele(true);
                setid(id);
                }

                const Hapus = async (e) => {
                e.preventDefault();
                await axios.delete('/Device/' + id);
                getDevice();
                setdetele(false);
                }

            // filter data dalam pencarian
            const filter = async (e) => {
                e.preventDefault();

                var pages = currentPageNumber;
                if (isNaN(currentPageNumber)) {
                pages = currentPage; // Use currentPage if currentPageNumber is NaN
                }


                if (key !== '') {
                const response = await axios.get(`/Device/pencarian?page=${pages}&limit=${limit}&key=${key}`);
                if (response.data.length) {
                    setDataResponse(response.data[0]);
                    setTotal(Math.ceil(response.data[1].jumlah / limit));

                    // to link route

                
                    navigate(`/device/search/${key}`);

                }
                } else {
                    navigate(`/device/`);
                const response = await axios.get(`/Device?page=${pages}&limit=${limit}`);
                if (response.data.length) {
                    setDataResponse(response.data[0]);
                    setTotal(Math.ceil(response.data[1].jumlah / limit));
                }
                }
            }
                    
            // handle pagination

            const Pagination = (page) => {
            setCurrentPage(page);
            navigate(`/device/page/${page}`);
            };

       

            const generatePageNumbers = (currentPage, totalPages) => {
              const pageNumbers = [];
              const maxPagesToShow = 5;
              const startPage = Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
              const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
          
              for (let i = startPage; i <= endPage; i++) {
                  pageNumbers.push(
                      // NameRoute
                      <Link key={i} to={`/device/page/${i}`} onClick={() => Pagination(i)} className={currentPage === i ? 'active' : ''}>{i}</Link>
                  );
              }
          
              return pageNumbers;
            };



            return (
              // <div className='wrapper'>
              <div className="wrapper">

              {/* Side Bar */}
              <Menu />

              <div className="main">

              {/* Navbar */}
              <Header />
            
                    {/* Main Content */}
                    <main className="content" style={{backgroundColor: '#101726'}}>
                          <div className="container-fluid p-0">
                          <h1 className=" mb-3 text-white" > <strong>Device </strong> </h1>
         
                  
                            <div className="row">
                              <div className="col-12">
                              <div style={{padding: '20px',borderRadius: '10px',backgroundColor: '#222E3C'}}  className="card">
                                 
                                  <div className="card-body">
            
                                      {/* Start Content Table */}
                
                                  <div className="row justifty-content-center">
                                    <div className="col-12 MenuContainerLog ps-3">
                                 


                    <div className="row">
                        <div className="col-lg-12 d-flex justify-content-between align-items-center">
                          {/* Add User button aligned to the left */}
                          <button type="button" className="btn btn-primary  me-3"  onClick={newDeviceModalShow} ><i className='fa fa-plus'></i> Add Device </button>

                          {/* Search form aligned to the right */}
                          <Form onSubmit={filter} className="d-flex">
                            <InputGroup className="mb-1">
                              <Form.Control
                                style={{ borderRadius: '5px' }}
                                className="CrudSearch"
                                placeholder="Search ..."
                                aria-label="Cari"
                                aria-describedby="basic-addon2"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                              />
                              <Button
                                style={{ borderRadius: '5px' }}
                                className="btn btn-primary ms-2 btnSearch"
                                type="submit"
                              >
                                Search
                              </Button>
                            </InputGroup>
                          </Form>
                        </div>
                      </div>
                                      

                        <div className="card mt-2 " style={{background: '#16202b',color: '#fff'}}>
                          <div className="card-body">
                          <div className="table-responsive ">
                            <table className="table text-center ">
                                            <thead>
                                                  <tr>
                                                    <th scope="col">No</th>
                                                    <th  scope="col">nama</th> 
                                                    <th  scope="col">model</th> 
                                                    <th  scope="col">sim_total</th> 
                                                    <th  scope="col">port</th> 
                                                    <th  scope="col">baudrate</th> 
                                                    <th  scope="col">status</th> 
                                                    <th scope="col">Action</th>
                                                  </tr>
                                            </thead>
                                            <tbody>
            
                                            {!!DataResponse && DataResponse ? (
                                                DataResponse.map((item, i) => (                   
                                              <tr>
                                                
                                                <th key={item.id} width="150" scope="row">{(currentPage - 1) * limit + i + 1}</th>
            
                                                <td>{item.nama}</td> 
                                          <td>{item.model}</td> 
                                          <td>{item.sim_total}</td> 
                                          <td>{item.port}</td> 
                                          <td>{item.baudrate}</td> 
                                          <td>
                                            <span style={{ color: item.status === '1' ? 'lime' : 'red' }}>
                                            {item.status === '1' 
                                            ? 'Active' 
                                            : 'Not Active'}
                                            </span>
                                          </td> 
                                       

                                              
                                                <td className='text-center'  >
                                                  <button type="button" className="btn btn-success me-1"  onClick={() => editShow(item)}>Edit</button>
                                                  <button type="button" className="btn btn-danger me-1"  onClick={() => deleteModalShow(item.id)}>Delete</button>
                                                </td>
                                                
                                              </tr>
                                              ))) : (<div>Tidak ada data</div>)}
                                            </tbody>
                                          </table>
                                          </div>
                                        </div>
                                      </div>        
                                          <div className="pagination ms-2">
                                          <a className={currentPage === 1 ? 'disabled paginationNav' : 'paginationNav'} onClick={() => Pagination(currentPage - 1)}>&laquo;</a>
                                          {generatePageNumbers(currentPage, Total)}
                                          <a className={currentPage === Total ? 'disabled paginationNav' : 'paginationNav'} onClick={() => Pagination(currentPage + 1)}>&raquo;</a>
                                          </div>
                                       </div>
                                     </div>
                           
            
                                      {/* End Content Table */}
            
            
                                  </div>
                                </div>
                              </div>
                            </div>
                  
                          </div>
                    </main>
                    {/* End Content */}
                    
                    {/* Footer */}
                    <Footer />
                  </div>
            
            {/* Modal */}
            {/* ----------------------------------------------------------------------------------------------- */}
            
            <Modal show={deleteModal} onHide={deleteModalClose} size="sm">
                        <Form className="form-box" onSubmit={Hapus}>
                          <Modal.Header closeButton>
                            <Modal.Title> Delete Device</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
            
                          <h5 className='textDeleteModal'>
                            Are you sure to delete Device data ?
                          </h5>
            
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={deleteModalClose}>
                              Cancel
                            </Button>
                            <Button variant="danger" type="submit">
                              Delete
                            </Button>
                          </Modal.Footer>
                        </Form>
                      </Modal>
            
                      {/* Add Modal */}
                      <Modal show={newDeviceModal} onHide={newDeviceModalClose} size="lg">
                        <Form className="form-box" onSubmit={Tambah}>
                          <Modal.Header closeButton>
                            <Modal.Title>Add New Device Data</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                          <div className="card ">
                            <div className="card-body p-4">
                            <div className="form-group">
                            
                        
                           
       <label>nama Name</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="nama"
           aria-label="nama"
           aria-describedby="basic-addon2"
           value={nama}
           onChange={(e) => setNama(e.target.value)}
         />
       </InputGroup>
       
       <label>model Name</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="model"
           aria-label="model"
           aria-describedby="basic-addon2"
           value={model}
           onChange={(e) => setModel(e.target.value)}
         />
       </InputGroup>
       
       <label>sim_total Name</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="sim_total"
           aria-label="sim_total"
           aria-describedby="basic-addon2"
           value={sim_total}
           onChange={(e) => setSim_total(e.target.value)}
         />
       </InputGroup>
       
       <label>port Name</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="port"
           aria-label="port"
           aria-describedby="basic-addon2"
           value={port}
           onChange={(e) => setPort(e.target.value)}
         />
       </InputGroup>
       
       <label>baudrate Name</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="baudrate"
           aria-label="baudrate"
           aria-describedby="basic-addon2"
           value={baudrate}
           onChange={(e) => setBaudrate(e.target.value)}
         />
       </InputGroup>
       
       <label>status Name</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="status"
           aria-label="status"
           aria-describedby="basic-addon2"
           value={status}
           onChange={(e) => setStatus(e.target.value)}
         />
       </InputGroup>
       
    
                          
            
                          </div>
                            </div>
                          </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={newDeviceModalClose}>
                              Cancel
                            </Button>
                            <Button variant="success" type="submit">
                              Add New Device
                            </Button>
                          </Modal.Footer>
                        </Form>
                      </Modal>
            
                      {/* Edit Modal */}
                      <Modal show={editDeviceModal} onHide={editClose} size="lg">
                        <Form className="form-box" onSubmit={Edit}>
                          <Modal.Header closeButton>
                            <Modal.Title>Edit Device Data</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                          <div className="card ">
                            <div className="card-body p-4">
                            <div className="form-group">
            
                       
                               
                               
                        <label>nama</label>
                        <InputGroup className="mb-3 ">
                          <Form.Control
                            className="searchInput"
                            placeholder="nama"
                            aria-label="nama"
                            aria-describedby="basic-addon2"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                          />
                        </InputGroup>
                        
                        <label>model</label>
                        <InputGroup className="mb-3 ">
                          <Form.Control
                            className="searchInput"
                            placeholder="model"
                            aria-label="model"
                            aria-describedby="basic-addon2"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                          />
                        </InputGroup>
                        
                        <label>sim_total</label>
                        <InputGroup className="mb-3 ">
                          <Form.Control
                            className="searchInput"
                            placeholder="sim_total"
                            aria-label="sim_total"
                            aria-describedby="basic-addon2"
                            value={sim_total}
                            onChange={(e) => setSim_total(e.target.value)}
                          />
                        </InputGroup>
                        
                        <label>port</label>
                        <InputGroup className="mb-3 ">
                          <Form.Control
                            className="searchInput"
                            placeholder="port"
                            aria-label="port"
                            aria-describedby="basic-addon2"
                            value={port}
                            onChange={(e) => setPort(e.target.value)}
                          />
                        </InputGroup>
                        
                        <label>baudrate</label>
                        <InputGroup className="mb-3 ">
                          <Form.Control
                            className="searchInput"
                            placeholder="baudrate"
                            aria-label="baudrate"
                            aria-describedby="basic-addon2"
                            value={baudrate}
                            onChange={(e) => setBaudrate(e.target.value)}
                          />
                        </InputGroup>
                        
                        <label>status</label>
                        <InputGroup className="mb-3 ">
                          <Form.Control
                            className="searchInput"
                            placeholder="status"
                            aria-label="status"
                            aria-describedby="basic-addon2"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          />
                        </InputGroup>
                    
                                              
                         
            
                          </div>
                            </div>
                          </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={editClose}>
                              Cancel
                            </Button>
                            <Button variant="success" type="submit">
                              Edit Device Data
                            </Button>
                          </Modal.Footer>
                        </Form>
                      </Modal>
                  
            {/* ----------------------------------------------------------------------------------------------- */}
            {/* end Modal */}
                </div>
              );
            }
            
            export default Device;
            

    