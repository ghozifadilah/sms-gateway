
            import React, { useEffect, useState } from 'react';
            import { useParams } from 'react-router-dom';
            import { Form, Button,InputGroup, Modal   } from "react-bootstrap";
            import axios from "axios";
            import { Link ,useNavigate } from 'react-router-dom';
      

            import Header from '../layout/Header';
            import Menu from '../layout/Menu';
            import Footer from '../layout/Footer';

            function Sending_log() {
            
            
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
                document.title = "Doran SMS | Sendg Log";
            }, []);


            
            useEffect(() => {
                getSending_log();
            }, [currentPage]);

                // Variable Input
                const [id_gateway, setId_gateway] = useState(''); 
const [send, setSend] = useState(''); 
const [pesan, setPesan] = useState(''); 
const [status, setStatus] = useState(''); 
const [timestamp, setTimestamp] = useState(''); 



                // dapatkan data Sending_log 
                const getSending_log = async () => {
                    
                    var pages = currentPageNumber;

                    if (isNaN(currentPageNumber)) {
                        pages = currentPage; // Use currentPage if currentPageNumber is NaN
                    }

                    const response = await axios.get(`/Sending_log?page=${pages}&limit=${limit}`);

                    if (response.data.length) {
                    setDataResponse(response.data[0]);
                    setTotal(Math.ceil(response.data[1].jumlah / limit));

                    }
                }

                    //Add new Sending_log
                    const [newSending_logModal, setnewSending_log] = useState(false);
                    const newSending_logModalClose = () => setnewSending_log(false);
                    const newSending_logModalShow = () => {
                    setnewSending_log(true);
                    
                    setid('');
                    setId_gateway('');
                  setSend('');
                  setPesan('');
                  setStatus('');
                  setTimestamp('');

                    }
                    // tambah Sending_log
                    const Tambah = async (e) => {

                    
                    e.preventDefault();
                    await axios.post('/sending_log', {
                       id_gateway : id_gateway, 
send : send, 
pesan : pesan, 
status : status, 
timestamp : timestamp, 

                      });
                    getSending_log();
                    newSending_logModalClose();
                    }

                // Edit Sending_log 
                const [editSending_logModal, seteditSending_log] = useState(false);
                const editClose = () => {
                    seteditSending_log(false);
                    setid('');
                    setId_gateway('');
setSend('');
setPesan('');
setStatus('');
setTimestamp('');

                }

                const editShow = (data) => {

                    console.log(data);

                    seteditSending_log(true);
                    console.log(data);
                    setid(data.id);
                    setId_gateway(data.id_gateway);
setSend(data.send);
setPesan(data.pesan);
setStatus(data.status);
setTimestamp(data.timestamp);


                }

                const Edit = async (e) => {
                    e.preventDefault();
                    await axios.put(`/Sending_log/${id}`, {
                    id:id,
                     id_gateway : id_gateway, 
send : send, 
pesan : pesan, 
status : status, 
timestamp : timestamp, 

                    });
                    getSending_log();
                    editClose();
                }


                // hapus data Sending_log 
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
                await axios.delete('/Sending_log/' + id);
                getSending_log();
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
                const response = await axios.get(`/Sending_log/pencarian?page=${pages}&limit=${limit}&key=${key}`);
                if (response.data.length) {
                    setDataResponse(response.data[0]);
                    setTotal(Math.ceil(response.data[1].jumlah / limit));

                    // to link route

                
                    navigate(`/sending_log/search/${key}`);

                }
                } else {
                    navigate(`/sending_log/`);
                const response = await axios.get(`/Sending_log?page=${pages}&limit=${limit}`);
                if (response.data.length) {
                    setDataResponse(response.data[0]);
                    setTotal(Math.ceil(response.data[1].jumlah / limit));
                }
                }
            }

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
                    
            // handle pagination

            const Pagination = (page) => {
            setCurrentPage(page);
            navigate(`/sending_log/page/${page}`);
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
                      <Link key={i} to={`/sending_log/page/${i}`} onClick={() => Pagination(i)} className={currentPage === i ? 'active' : ''}>{i}</Link>
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
                  
            <h1 className=" mb-3 text-white" > <strong>Sending_log </strong> </h1>
                  
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
                                                    <th  scope="col">id_gateway</th> 
                                                    <th  scope="col">send</th> 
                                                    <th  scope="col">pesan</th> 
                                                    <th  scope="col">status</th> 
                                                    <th  scope="col">timestamp</th> 

                                                    <th scope="col">Action</th>
                                                  </tr>
                                            </thead>
                                            <tbody>
            
                                            {!!DataResponse && DataResponse ? (
                                                DataResponse.map((item, i) => (                   
                                              <tr>
                                                
                                                <th key={item.id} width="150" scope="row">{(currentPage - 1) * limit + i + 1}</th>
            
                                                <td>{item.id_gateway}</td> 
                                                <td>{item.send}</td> 
                                                <td>{item.pesan}</td> 
                                                <td>
                                               
                                                  <span style={{ color: item.status === 1 ? 'lime' : 'red' }}>
                                                  {item.status === 1 
                                                  ? 'Success' 
                                                  : 'Failed'}
                                                  </span>
                                                  </td> 
                                                <td>
                                                   {formatDate(item.timestamp)}
                                                </td>
                                                

                                              
                                                <td className='text-center'  >
                                         
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
                            <Modal.Title> Delete Sending_log</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
            
                          <h5 className='textDeleteModal'>
                            Are you sure to delete Sending_log data ?
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
                      <Modal show={newSending_logModal} onHide={newSending_logModalClose} size="lg">
                        <Form className="form-box" onSubmit={Tambah}>
                          <Modal.Header closeButton>
                            <Modal.Title>Add New Sending_log Data</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                          <div className="card ">
                            <div className="card-body p-4">
                            <div className="form-group">
                            
                        
                           
       <label>id_gateway Name</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="id_gateway"
           aria-label="id_gateway"
           aria-describedby="basic-addon2"
           value={id_gateway}
           onChange={(e) => setId_gateway(e.target.value)}
         />
       </InputGroup>
       
       <label>send Name</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="send"
           aria-label="send"
           aria-describedby="basic-addon2"
           value={send}
           onChange={(e) => setSend(e.target.value)}
         />
       </InputGroup>
       
       <label>pesan Name</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="pesan"
           aria-label="pesan"
           aria-describedby="basic-addon2"
           value={pesan}
           onChange={(e) => setPesan(e.target.value)}
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
       
       <label>timestamp Name</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="timestamp"
           aria-label="timestamp"
           aria-describedby="basic-addon2"
           value={timestamp}
           onChange={(e) => setTimestamp(e.target.value)}
         />
       </InputGroup>
       ;
                          
            
                          </div>
                            </div>
                          </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={newSending_logModalClose}>
                              Cancel
                            </Button>
                            <Button variant="success" type="submit">
                              Add New Sending_log
                            </Button>
                          </Modal.Footer>
                        </Form>
                      </Modal>
            
                      {/* Edit Modal */}
                      <Modal show={editSending_logModal} onHide={editClose} size="lg">
                        <Form className="form-box" onSubmit={Edit}>
                          <Modal.Header closeButton>
                            <Modal.Title>Edit Sending_log Data</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                          <div className="card ">
                            <div className="card-body p-4">
                            <div className="form-group">
            
                       
                               
                               
       <label>id_gateway</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="id_gateway"
           aria-label="id_gateway"
           aria-describedby="basic-addon2"
           value={id_gateway}
           onChange={(e) => setId_gateway(e.target.value)}
         />
       </InputGroup>
       
       <label>send</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="send"
           aria-label="send"
           aria-describedby="basic-addon2"
           value={send}
           onChange={(e) => setSend(e.target.value)}
         />
       </InputGroup>
       
       <label>pesan</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="pesan"
           aria-label="pesan"
           aria-describedby="basic-addon2"
           value={pesan}
           onChange={(e) => setPesan(e.target.value)}
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
       
       <label>timestamp</label>
       <InputGroup className="mb-3 ">
         <Form.Control
           className="searchInput"
           placeholder="timestamp"
           aria-label="timestamp"
           aria-describedby="basic-addon2"
           value={timestamp}
           onChange={(e) => setTimestamp(e.target.value)}
         />
       </InputGroup>
       ;
                            
                           
                            
                         
            
                          </div>
                            </div>
                          </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={editClose}>
                              Cancel
                            </Button>
                            <Button variant="success" type="submit">
                              Edit Sending_log Data
                            </Button>
                          </Modal.Footer>
                        </Form>
                      </Modal>
                  
            {/* ----------------------------------------------------------------------------------------------- */}
            {/* end Modal */}
                </div>
              );
            }
            
            export default Sending_log;
            

    