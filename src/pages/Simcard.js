
            import React, { useEffect, useState } from 'react';
            import { useParams } from 'react-router-dom';
            import { Form, Button,InputGroup, Modal   } from "react-bootstrap";
            import axios from "axios";
            import { Link ,useNavigate } from 'react-router-dom';
        

            import Header from '../layout/Header';
            import Menu from '../layout/Menu';
            import Footer from '../layout/Footer';

            function Simcard() {
            
            
            const [id, setid] = useState('');

            const [DataResponse, setDataResponse] = useState([]);
            const [device, setDevice] = useState([]);
            
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
                document.title = "Doran SMS| Simcard";
                get_device();
                console.log('ye');
                
            }, []);


            
            useEffect(() => {
                getSimcard();
            }, [currentPage]);

                // Variable Input
                const [id_device, setId_device] = useState(''); 
                const [operator, setOperator] = useState(''); 
                const [phone_number, setPhone_number] = useState(''); 
                const [operator_signal, setOperator_signal] = useState(''); 
                const [ussd_pulsa, setUssd_pulsa] = useState(''); 
                const [pulsa, setPulsa] = useState(''); 
                const [last_check_pulsa, setLast_check_pulsa] = useState(''); 
                const [status, setStatus] = useState(''); 

               



                // dapatkan data Simcard 
                const getSimcard = async () => {
                    
                    var pages = currentPageNumber;

                    if (isNaN(currentPageNumber)) {
                        pages = currentPage; // Use currentPage if currentPageNumber is NaN
                    }

                    const response = await axios.get(`/Simcard?page=${pages}&limit=${limit}`);

                    if (response.data.length) {
                    setDataResponse(response.data[0]);
                    setTotal(Math.ceil(response.data[1].jumlah / limit));

                    }
                }

                    //Add new Simcard
                    const [newSimcardModal, setnewSimcard] = useState(false);
                    const newSimcardModalClose = () => setnewSimcard(false);
                    const newSimcardModalShow = () => {
                    setnewSimcard(true);
                    
                    setid('');
                    setId_device('');
                  setOperator('');
                  setPhone_number('');
                  setOperator_signal('');
                  setUssd_pulsa('');
                  setPulsa('');
                  setLast_check_pulsa('');
                  setStatus('');
               

                    }
                    // tambah Simcard
                    const Tambah = async (e) => {

                    
                    e.preventDefault();
                    await axios.post('/simcard', {
                      id_device : id_device, 
                      operator : operator, 
                      phone_number : phone_number, 
                      operator_signal : operator_signal, 
                      ussd_pulsa : ussd_pulsa, 
                      pulsa : pulsa, 
                      status : status, 
              
                    });
                    getSimcard();
                    newSimcardModalClose();
                    }

                // Edit Simcard 
                const [editSimcardModal, seteditSimcard] = useState(false);
                const editClose = () => {
                    seteditSimcard(false);
                    setid('');
                    setId_device('');
                  setOperator('');
                  setPhone_number('');
                  setOperator_signal('');
                  setUssd_pulsa('');
                  setPulsa('');
                  setLast_check_pulsa('');
                  setStatus('');
             

                }

                const editShow = (data) => {

                    console.log(data);

                    seteditSimcard(true);
                    console.log(data);
                    setid(data.id);
                    setId_device(data.id_device);
                  setOperator(data.operator);
                  setPhone_number(data.phone_number);
                  setOperator_signal(data.operator_signal);
                  setUssd_pulsa(data.ussd_pulsa);
                  setPulsa(data.pulsa);
                  setLast_check_pulsa(data.last_check_pulsa);
                  setStatus(data.status);
               


                }

                const Edit = async (e) => {
                    e.preventDefault();
                    await axios.put(`/Simcard/${id}`, {
                    id:id,
                     id_device : id_device, 
                  operator : operator, 
                  phone_number : phone_number, 
                  operator_signal : operator_signal, 
                  ussd_pulsa : ussd_pulsa, 
                  pulsa : pulsa, 
                  status : status, 
              

                    });
                    getSimcard();
                    editClose();
                }


                // hapus data Simcard 
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
                await axios.delete('/Simcard/' + id);
                getSimcard();
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
                const response = await axios.get(`/Simcard/pencarian?page=${pages}&limit=${limit}&key=${key}`);
                if (response.data.length) {
                    setDataResponse(response.data[0]);
                    setTotal(Math.ceil(response.data[1].jumlah / limit));

                    // to link route

                
                    navigate(`/simcard/search/${key}`);

                }
                } else {
                    navigate(`/simcard/`);
                const response = await axios.get(`/Simcard?page=${pages}&limit=${limit}`);
                if (response.data.length) {
                    setDataResponse(response.data[0]);
                    setTotal(Math.ceil(response.data[1].jumlah / limit));
                }
                }
            }
                    
            // handle pagination

            const Pagination = (page) => {
            setCurrentPage(page);
            navigate(`/simcard/page/${page}`);
            };

            // membuat list item pagination
     
              const generatePageNumbers = (currentPage, totalPages) => {
              const pageNumbers = [];
              const maxPagesToShow = 5;
              const startPage = Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
              const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
          
              for (let i = startPage; i <= endPage; i++) {
                  pageNumbers.push(
                      // NameRoute
                      <Link key={i} to={`/simcard/page/${i}`} onClick={() => Pagination(i)} className={currentPage === i ? 'active' : ''}>{i}</Link>
                  );
              }
          
              return pageNumbers;
            };


            const formatDate = (timestamp) => {
              const date = new Date(timestamp);
              const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              };
              return date.toLocaleString('en-US', options);  // Customize locale and options as needed
            };

            // =======================================
            const [checkPulsaOnProgress, setCheckPulsaOnProgress] = useState(false); 
            const check_pulsa = async (id_sim,pulsa) => {

              if (checkPulsaOnProgress === true) return alert('on progress');
              
              setCheckPulsaOnProgress(true);

              await axios.post('/gateway/check_pulsa', {
                id_simcard : id_sim, 
                token : 'tjcxaBb0c9aAcibfNrKAnGHlfkGWEJGC', 
              });

              setTimeout(() => {
                setCheckPulsaOnProgress(false);
                check_pulsa_result(id_sim,pulsa);
                console.log('ready');
                
              }, 15000);
              
            }
            const check_pulsa_result = async (id_sim, pulsa) => {
              try {
                const response = await axios.get(`/Simcard?${id_sim}`);
                if (response.data.length) {
                  const data_pulsa = response.data[0];
                  
                  if (data_pulsa.pulsa !== pulsa) {
                 
                    
                    // Update DataResponse by mapping through the current data
                    setDataResponse(prevData => 
                      prevData.map(item => 
                        item.id === id_sim 
                          ? { ...item, pulsa: data_pulsa.pulsa } // Update pulsa for matching id_sim
                          : item // Keep other items unchanged
                      )
                    );
                  }
                }
              } catch (error) {
                console.error('Error fetching pulsa data:', error);
              }
            };
            const get_device = async () => {
              try {
                const response = await axios.get(`/device`);
                if (response.data.data.length) {
               
                  setDevice(response.data.data);
                  
                }
              } catch (error) {
                console.error('Error fetching pulsa data:', error);
              }
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
                  
            <h1 className=" mb-3 text-white" > <strong>Simcard </strong> </h1>
                                        
              {checkPulsaOnProgress ? (
                
                   <p style={{color:'white',marginBottom:'5px'}}><span style={{marginRight:'5px'}} className="loader"></span>  Trying to Check Pulsa , Please wait at least 15 Seconds ...  </p>

              ) : (
                null
              )}
        
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
                          <button type="button" className="btn btn-primary  me-3"  onClick={newSimcardModalShow} ><i className='fa fa-plus'></i> Add Sim Card </button>

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
                            <div className="table-responsive">
                              <table className="table text-center">
                                <thead>
                                      <tr>
                                        <th scope="col">No</th>
                                        <th  scope="col">id_device</th> 
                                      <th  scope="col">operator</th> 
                                      <th  scope="col">phone_number</th> 
                                      {/* <th  scope="col">operator_signal</th>  */}
                                      <th  scope="col">ussd_pulsa</th> 
                                      <th  scope="col">pulsa</th> 
                                      <th  scope="col">last_check_pulsa</th> 
                                      <th  scope="col">status</th> 
                                  
                          

                                        <th scope="col">Action</th>
                                      </tr>
                                </thead>
                                <tbody>

                                {!!DataResponse && DataResponse ? (
                                    DataResponse.map((item, i) => (                   
                                  <tr  key={item.id}>
                                    
                                    <td  width="50" scope="row">{(currentPage - 1) * limit + i + 1}</td>
                                    <td>{item.id_device}</td> 
                                    <td>{item.operator}</td> 
                                    <td>{item.phone_number}</td> 
                                    {/* <td>{item.operator_signal}</td>  */}
                                    <td>{item.ussd_pulsa}</td> 
                                    <td>Rp.{item.pulsa} </td> 
                                    <td>
                                      {formatDate(item.last_check_pulsa)}
                                    
                                      </td>
                                    <td>
                                      <span style={{ color: item.status === '1' ? 'lime' : 'red' }}>
                                      {item.status === '1' 
                                      ? 'Active' 
                                      : 'Not Active'}
                                      </span>
                                    </td> 


                                  
                                    <td className='text-center'  >
                                    <button type="button" className="btn btn-primary mt-1 ms-1 "  onClick={() => check_pulsa(item.id,item.pulsa)}>Check Pulsa</button>
                                      <button type="button" className="btn btn-success mt-1 ms-1"  onClick={() => editShow(item)}>Edit</button>
                                      <button type="button" className="btn btn-danger mt-1  ms-1"  onClick={() => deleteModalShow(item.id)}>Delete</button>
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
          <Modal.Title> Delete Simcard</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <h5 className='textDeleteModal'>
          Are you sure to delete Simcard data ?
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
  <Modal show={newSimcardModal} onHide={newSimcardModalClose} size="lg">
    <Form className="form-box" onSubmit={Tambah}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Simcard Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="card ">
        <div className="card-body p-4">
        <div className="form-group">
                                       
  
          <Form.Label>Device</Form.Label>
       <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Select
            aria-label="Default select example"
            value={id_device}
            onChange={(e) => setDevice(e.target.value)}
            >
              <option value="" >Select Device</option>
              {device.map((device) => (
                  <option key={device.id} value={device.id} > ID : {device.id} | {device.nama}</option>

              ))}
              
          </Form.Select>
      </Form.Group>
       
       {/* <label>operator </label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="operator"
           aria-label="operator"
           aria-describedby="basic-addon2"
           value={operator}
           onChange={(e) => setOperator(e.target.value)}
         />
       </InputGroup> */}
       
       <label>phone_number </label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="phone_number"
           aria-label="phone_number"
           aria-describedby="basic-addon2"
           value={phone_number}
           onChange={(e) => setPhone_number(e.target.value)}
         />
       </InputGroup>
       
       <label>operator_signal </label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="operator_signal"
           aria-label="operator_signal"
           aria-describedby="basic-addon2"
           value={operator_signal}
           onChange={(e) => setOperator_signal(e.target.value)}
         />
       </InputGroup>
       
       <label>ussd_pulsa </label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="ussd_pulsa"
           aria-label="ussd_pulsa"
           aria-describedby="basic-addon2"
           value={ussd_pulsa}
           onChange={(e) => setUssd_pulsa(e.target.value)}
         />
       </InputGroup>
       
       <label>pulsa </label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="pulsa"
           aria-label="pulsa"
           aria-describedby="basic-addon2"
           value={pulsa}
           onChange={(e) => setPulsa(e.target.value)}
         />
       </InputGroup>
      
       
    


       <label>Status</label>
       <Form.Select
            className="searchInput"
            aria-label="nama_alat"
            aria-describedby="basic-addon2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >

            <option value="">Choose status</option>
            <option value="1">Active</option>
            <option value="0">Not Active</option>
         
      </Form.Select>
     
                          
            
        </div>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={newSimcardModalClose}>
            Cancel
          </Button>
          <Button variant="success" type="submit">
            Add New Simcard
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>



{/* Edit Modal */}
<Modal show={editSimcardModal} onHide={editClose} size="lg">
<Form className="form-box" onSubmit={Edit}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Simcard Data</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <div className="card ">
    <div className="card-body p-4">
    <div className="form-group">

                                          
     
          <Form.Label>Device</Form.Label>
       <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Select
            aria-label="Default select example"
            value={id_device}
            onChange={(e) => setDevice(e.target.value)}
            >
              <option value="" >Select Device</option>
              {device.map((device) => (
                  <option key={device.id} value={device.id} > ID : {device.id} | {device.nama}</option>

              ))}
              
          </Form.Select>
      </Form.Group>
       
       <label>operator</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="operator"
           aria-label="operator"
           aria-describedby="basic-addon2"
           value={operator}
           onChange={(e) => setOperator(e.target.value)}
         />
       </InputGroup>
       
       <label>phone_number</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="phone_number"
           aria-label="phone_number"
           aria-describedby="basic-addon2"
           value={phone_number}
           onChange={(e) => setPhone_number(e.target.value)}
         />
       </InputGroup>
       
       {/* <label>operator_signal</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="operator_signal"
           aria-label="operator_signal"
           aria-describedby="basic-addon2"
           value={operator_signal}
           onChange={(e) => setOperator_signal(e.target.value)}
         />
       </InputGroup> */}
       
       <label>ussd_pulsa</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="ussd_pulsa"
           aria-label="ussd_pulsa"
           aria-describedby="basic-addon2"
           value={ussd_pulsa}
           onChange={(e) => setUssd_pulsa(e.target.value)}
         />
       </InputGroup>
       
       <label>pulsa</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="pulsa"
           aria-label="pulsa"
           aria-describedby="basic-addon2"
           value={pulsa}
           onChange={(e) => setPulsa(e.target.value)}
         />
       </InputGroup>
     


       <label>Status</label>
       <Form.Select
            className="searchInput"
            aria-label="nama_alat"
            aria-describedby="basic-addon2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >

            <option value="">Choose status</option>
            <option value="1">Active</option>
            <option value="0">Not Active</option>
         
      </Form.Select>

          </div>
            </div>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={editClose}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Edit Simcard Data
            </Button>
          </Modal.Footer>
        </Form>
  </Modal>
  
            {/* ----------------------------------------------------------------------------------------------- */}
            {/* end Modal */}
                </div>
              );
            }
            
            export default Simcard;
            

    