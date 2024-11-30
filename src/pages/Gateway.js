
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
                document.title = "Doran sms | SMS Gateway API";
                get_simcard();
            }, []);


            
            useEffect(() => {
                getGateway();
            }, [currentPage]);

                // Variable Input
                const [id_simcard, setId_simcard] = useState(''); 
              const [nama, setNama] = useState(''); 
              const [token_api, setToken_api] = useState(''); 
              const [status, setStatus] = useState(''); 

              const [simcard, setSimcard] = useState([]); // data semua simcard

              const get_simcard = async () => {
                try {
                  const response = await axios.get(`/simcard`);
                  if (response.data.length) {
                 
                    setSimcard(response.data);
                    
                  }
                } catch (error) {
                  console.error('Error fetching pulsa data:', error);
                }
              };
              

                // dapatkan data Gateway 
                const getGateway = async () => {
                    
                    var pages = currentPageNumber;

                    if (isNaN(currentPageNumber)) {
                        pages = currentPage; // Use currentPage if currentPageNumber is NaN
                    }

                    const response = await axios.get(`/Gateway?page=${pages}&limit=${limit}`);

                    if (response.data.length) {
                    setDataResponse(response.data[0]);
                    setTotal(Math.ceil(response.data[1].jumlah / limit));

                    }
                }

                    //Add new Gateway
                    const [newGatewayModal, setnewGateway] = useState(false);
                    const newGatewayModalClose = () => setnewGateway(false);
                    const newGatewayModalShow = () => {
                    setnewGateway(true);
                    
                    setid('');
                    setId_simcard('');
                    setNama('');
                    setToken_api('');
                    setStatus('');

                    }
                    // tambah Gateway
              const Tambah = async (e) => {

                  e.preventDefault();
                  await axios.post('/gateway', {
                      id_simcard : id_simcard, 
                    nama : nama, 
                    token_api : generateRandomToken(32), 
                    status : status, 

                    });
                  getGateway();
                  newGatewayModalClose();
                  }

                // Edit Gateway 
                const [editGatewayModal, seteditGateway] = useState(false);
                const editClose = () => {
                    seteditGateway(false);
                    setid('');
                    setId_simcard('');
                    setNama('');
                    setToken_api('');
                    setStatus('');

                }

                const editShow = (data) => {

                    console.log(data);

                    seteditGateway(true);
                    console.log(data);
                    setid(data.id);
                    setId_simcard(data.id_simcard);
                    setNama(data.nama);
                    setToken_api(data.token_api);
                    setStatus(data.status);


                }

                const Edit = async (e) => {
                    e.preventDefault();
                    await axios.put(`/Gateway/${id}`, {
                    id:id,
                     id_simcard : id_simcard, 
                      nama : nama, 
                      token_api : token_api, 
                      status : status, 

                    });
                    getGateway();
                    editClose();
                }


                // hapus data Gateway 
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
                // Modal
                const [smsModal, setSmsModal] = useState(false);
                const smsModalClose = () => {
                  setSmsModal(false);
                  setSmsOnProgress(false);
                  setSuccess(false);
                }
                
                const smsModalShow = (id) => {
                  setSmsModal(true);
             
                }

                const Hapus = async (e) => {
                e.preventDefault();
                await axios.delete('/Gateway/' + id);
                getGateway();
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
                const response = await axios.get(`/Gateway/pencarian?page=${pages}&limit=${limit}&key=${key}`);
                if (response.data.length) {
                    setDataResponse(response.data[0]);
                    setTotal(Math.ceil(response.data[1].jumlah / limit));

                    // to link route

                
                    navigate(`/gateway/search/${key}`);

                }
                } else {
                    navigate(`/gateway/`);
                const response = await axios.get(`/Gateway?page=${pages}&limit=${limit}`);
                if (response.data.length) {
                    setDataResponse(response.data[0]);
                    setTotal(Math.ceil(response.data[1].jumlah / limit));
                }
                }
            }
                    
            // handle pagination

            const Pagination = (page) => {
            setCurrentPage(page);
            navigate(`/gateway/page/${page}`);
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
                      <Link key={i} to={`/gateway/page/${i}`} onClick={() => Pagination(i)} className={currentPage === i ? 'active' : ''}>{i}</Link>
                  );
              }
          
              return pageNumbers;
            };


            function generateRandomToken(length) {
              const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
              let token = '';
              for (let i = 0; i < length; i++) {
                  token += characters.charAt(Math.floor(Math.random() * characters.length));
              }
              return token;
            }

            const [numberRecipient, setNumberRecipient] = useState(''); 
            const [msgRecipient, setMsgRecipient] = useState(''); 
            const [idGateway, setIdGetway] = useState(''); 
            const [smsOnProgress, setSmsOnProgress] = useState(false); 
            const [smsSuccess, setSuccess] = useState(false); 
            
            const sendingSms = async (e) => {
              e.preventDefault();

              if (msgRecipient.length > 160 || numberRecipient === '' || idGateway === '') {
                return;
              }

              if (smsOnProgress === true) return alert('on progress');
              setSmsOnProgress(true);

              initSms();

              setSuccess(false);
                setTimeout(() => {
                  setSmsOnProgress(false);
                    console.log('ready');
                    setSuccess(true);
              }, 3000);

            }

            const initSms = async () => {
           
              await axios.post('/gateway/send', {
                number : numberRecipient,
                message : msgRecipient,
                token : idGateway, 
              });
              console.log(numberRecipient);
              console.log(msgRecipient);
              console.log(idGateway);
            

            }

          
            const isiPesan = (e) => {
            
              if (e.target.value.length > 160) {
                 return;
              }
              setMsgRecipient(e.target.value);
            }


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
  
            <h1 className=" mb-3 text-white" > <strong>SMS Gateway API</strong> </h1>
  
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
                          <div className='d-flex align-items-center'> 

                            <button type="button" className="btn btn-primary  me-3"  onClick={newGatewayModalShow} ><i className='fa fa-plus'></i> Add Gateway </button>
                            <button type="button" className="btn btn-primary  me-3"  onClick={smsModalShow} ><i className='fa fa-paper-plane'></i> Send SMS </button>
                          </div>

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
                                        <th  scope="col">id_simcard</th> 
                                        <th  scope="col">nama</th> 
                                        <th  scope="col">token_api</th> 
                                        <th  scope="col">status</th> 

                                        <th scope="col">Action</th>
                                      </tr>
                                </thead>
                                <tbody>

                                {!!DataResponse && DataResponse ? (
                                    DataResponse.map((item, i) => (                   
                                  <tr key={item.id} >
                                    
                                    <td width="150" scope="row">{(currentPage - 1) * limit + i + 1}</td>

                                    <td>{item.id_simcard}</td> 
                                    <td>{item.nama}</td> 
                                    <td>{item.token_api}</td> 
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
                    <Modal.Title> Delete Gateway</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
    
                  <h5 className='textDeleteModal'>
                    Are you sure to delete Gateway data ?
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



    <Modal show={smsModal} onHide={smsModalClose}>
        <Form className="form-box" onSubmit={sendingSms}>
          <Modal.Header closeButton>
            <Modal.Title>Send SMS</Modal.Title>
          </Modal.Header>
          <Modal.Body>

        <Form.Label>Select Gateway</Form.Label>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Select
            aria-label="Default select example"
            value={idGateway}
            onChange={(e) => setIdGetway(e.target.value)}
            >
              <option value="" >Select Gateway</option>
              {DataResponse.map((gateway) => (
                  gateway.status === '1' && (
                    <option key={gateway.id} value={gateway.token_api}>
                      {gateway.nama}
                    </option>
                  )
              ))}
              
          </Form.Select>
        </Form.Group>
        <label>Number Recipient </label>

            <InputGroup className="mb-3">
              <Form.Control
                className="searchInput"
                placeholder="Number Recipient"
                aria-label="id_simcard"
                aria-describedby="basic-addon2"
                value={numberRecipient}
                type="number"
                onChange={(e) => setNumberRecipient(e.target.value)}
              />
            </InputGroup>

            {/* Text Area for Message */}
            <label>Massage </label>
            <InputGroup className="mb-3">
              <Form.Control
                as="textarea"
                rows={4} // You can adjust the number of rows
                className="searchInput"
                placeholder="Message"
                aria-label="id_simcard"
                aria-describedby="basic-addon2"
                value={msgRecipient}
                onChange={(e) => isiPesan(e)}
              />
            </InputGroup>

            <p style={{ color: msgRecipient.length === 160 ? 'red' : 'black' }}>
              {msgRecipient.length}/160
            </p>


            {smsOnProgress ? (    
                <p style={{color:'black',marginBottom:'5px'}}><span style={{marginRight:'5px'}} className="loader"></span>  Trying to Send SMS , Please wait ...  </p>
            ) : (
              null
            )}
            { smsSuccess ? (    
               <p style={{color: 'green'}}>Massage sent ! </p>
            ) : (
              null
            )}

           
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={smsModalClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit"  >
              Send
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

            
                    {/* Add Modal */}
                      <Modal show={newGatewayModal} onHide={newGatewayModalClose} size="lg">
                        <Form className="form-box" onSubmit={Tambah}>
                          <Modal.Header closeButton>
                            <Modal.Title>Add New Gateway Data</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                          <div className="card ">
                            <div className="card-body p-4">
                            <div className="form-group">
                            
                    
                        <Form.Label>ID Simcard</Form.Label>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Select
                              aria-label="Default select example"
                              value={id_simcard}
                              onChange={(e) => setId_simcard(e.target.value)}
                              >
                                <option value="" >Select Sim ID card</option>
                                {simcard.map((simcard) => (
                                    simcard.status === '1' && (
                                      <option key={simcard.id} value={simcard.id}>
                                        {simcard.operator} - ID {simcard.id}
                                      </option>
                                    )
                                ))}
                                
                            </Form.Select>
                          </Form.Group>
                                          
                        <label>nama </label>
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
                            <Button variant="secondary" onClick={newGatewayModalClose}>
                              Cancel
                            </Button>
                            <Button variant="success" type="submit">
                              Add New Gateway
                            </Button>
                          </Modal.Footer>
                        </Form>
                      </Modal>
            
                      {/* Edit Modal */}
                      <Modal show={editGatewayModal} onHide={editClose} size="lg">
                        <Form className="form-box" onSubmit={Edit}>
                          <Modal.Header closeButton>
                            <Modal.Title>Edit Gateway Data</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                          <div className="card ">
                            <div className="card-body p-4">
                            <div className="form-group">
            
                       
                               
                                 
                        <Form.Label>ID Simcard</Form.Label>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Select
                              aria-label="Default select example"
                              value={id_simcard}
                              onChange={(e) => setId_simcard(e.target.value)}
                              >
                                <option value="" >Select Sim ID card</option>
                                {simcard.map((simcard) => (
                                    simcard.status === '1' && (
                                      <option key={simcard.id} value={simcard.id}>
                                        {simcard.operator} - ID {simcard.id}
                                      </option>
                                    )
                                ))}
                                
                            </Form.Select>
                          </Form.Group>
                                
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
                              Edit Gateway Data
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
            

    