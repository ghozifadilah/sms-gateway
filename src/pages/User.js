    import React, { useEffect, useState } from 'react';
    import { useParams } from 'react-router-dom';
    import { Form, Button,InputGroup, Modal   } from "react-bootstrap";
    import axios from "axios";
    import { Link ,useNavigate } from 'react-router-dom';


    import Header from '../layout/Header';
    import Menu from '../layout/Menu';
    import Footer from '../layout/Footer';


    function User() {
    
    
    const [user_id, setuser_id] = useState('');

    const [DataResponse, setDataResponse] = useState([]);
    
    const [Total, setTotal] = useState(1); // total halaman
    const [currentPage, setCurrentPage] = useState(1); // halaman yang aktif
    const limit = 10; // jumlah item per halaman
    const [key, setKey] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const tokenUser = 'ujicoba';
    
    // Access the URL parameters
    const { pageNumber } = useParams();

    // Now you can use pageNumber in your component logic
    // For example, you can convert it to a number
    const currentPageNumber = parseInt(pageNumber);


    useEffect(() => {
        document.title = "Doran SMS| User";
    }, []);


    
    useEffect(() => {
        getUser();
    }, [currentPage]);

        // Variable Input
      const [nama, setNama] = useState(''); 
      const [username, setUsername] = useState(''); 
      const [password, setPassword] = useState(''); 
      const [email, setEmail] = useState(''); 
      const [hak_akses, setHak_akses] = useState(''); 
      const [token, setToken] = useState(''); 
      


        // dapatkan data User 
        const getUser = async () => {
            
            var pages = currentPageNumber;

            if (isNaN(currentPageNumber)) {
                pages = currentPage; // Use currentPage if currentPageNumber is NaN
            }

            const response = await axios.get(`/User?page=${pages}&limit=${limit}`,{
              headers: {
                  'usertoken': tokenUser
              }
            });

            if (response.data.length) {
            setDataResponse(response.data[0]);
            setTotal(Math.ceil(response.data[1].jumlah / limit));

            }
        }

            //Add new User
            const [newUserModal, setnewUser] = useState(false);
            const newUserModalClose = () => setnewUser(false);

            const newUserModalShow = () => {
            setnewUser(true);
            setErrorMsg('');
            setuser_id('');
            setNama('');
            setUsername('');
            setPassword('');
            setEmail('');
            setHak_akses('');
            setToken('');
      
            }
            // tambah User
            const Tambah = async (e) => {

            
            e.preventDefault();
            var isValid = validate();
            if (!isValid) return;

            try {
              await axios.post('/registrasi', {
                nama : nama, 
                username : username, 
                password : password, 
                email : email, 
                hak_akses : hak_akses, 
                token : token,
                },{
                  headers: {
                      'usertoken': tokenUser
                  }
              });

          
          
              logUser('menambah User');
              getUser();
              newUserModalClose();
      

            } catch (error) {
                if (error.response && error.response.status === 409) {
                      setErrorMsg(error.response.data.msg);
                } else {
                    // handle other errors
                    console.error('An error occurred:', error);
                }
            }

          
          }

        // Edit User 
        const [editUserModal, seteditUser] = useState(false);
        const editClose = () => {
          
            seteditUser(false);
            setuser_id('');
            setNama('');
            setUsername('');
            setPassword('');
            setEmail('');
            setHak_akses('');
            setToken('');
      
        }

        const editShow = (data) => {
            setErrorMsg('');
            console.log(data);

            seteditUser(true);
            console.log(data);
            setuser_id(data.user_id);
            setNama(data.nama);
            setUsername(data.username);
            setPassword(data.password);
            setEmail(data.email);
            setHak_akses(data.hak_akses);
            setToken(data.token);
      

        }

      const Edit = async (e) => {

        
        try {
            e.preventDefault();

            await axios.put(`/User/${user_id}`, {
            user_id:user_id,
            nama : nama, 
            username : username, 
            password : password,
            email : email, 
            hak_akses : hak_akses, 
            token : token, 
      
            },{
              headers: {
                  'usertoken': tokenUser
              }
          });
            logUser('mengubah User');
            getUser();
            editClose();
        } catch (error) {
          if (error.response && error.response.status === 409) {
            setErrorMsg(error.response.data.message);
          } else {
              // handle other errors
              console.error('An error occurred:', error);
          }
        }

         
        }


        // hapus data User 
        // Modal
        const [deleteModal, setdetele] = useState(false);
        const deleteModalClose = () => {
        setdetele(false);
        setuser_id('');
        }
        
        const deleteModalShow = (user_id) => {
        setdetele(true);
        setuser_id(user_id);
        }

        const Hapus = async (e) => {
        e.preventDefault();
        await axios.delete('/User/' + user_id, {
          headers: {
              'usertoken': tokenUser
          }
        });

        logUser('menghapus User');
        getUser();
        setdetele(false);
        
      }

    // Data Filters dalam pencarian
    const filter = async (e) => {
        e.preventDefault();

        var pages = currentPageNumber;
        if (isNaN(currentPageNumber)) {
        pages = currentPage; // Use currentPage if currentPageNumber is NaN
        }


        if (key !== '') {
        const response = await axios.get(`/User/pencarian?page=${pages}&limit=${limit}&key=${key}`, {
          headers: {
              'usertoken': tokenUser
          }
      });
  
        if (response.data.length) {
            setDataResponse(response.data[0]);
            setTotal(Math.ceil(response.data[1].jumlah / limit));

            // to link route

            //NameRoute
            navigate(`/user/search/${key}`);

        }
        } else {
            //NameRoute
            navigate(`/user/`);
            const response = await axios.get(`/User?page=${pages}&limit=${limit}`, {
              headers: {
                  'usertoken': tokenUser
              }
          });
  
        if (response.data.length) {
            setDataResponse(response.data[0]);
            setTotal(Math.ceil(response.data[1].jumlah / limit));
        }
        }
    }
            
    // handle pagination
    
    const validate = () => {
      const fields = {
        nama,
        username,
        password,
        email,
        hak_akses
      };

      for (const [key, value] of Object.entries(fields)) {
        if (value.trim() === '') {
          setErrorMsg(''+key+' tidak boleh kosong');
          return false;
        }
      }
      setErrorMsg('');
      return true;
    };

    const Pagination = (page) => {
    setCurrentPage(page);
    //NameRoute
    navigate(`/user/page/${page}`);
    };

    // membuat list item pagination
   // Function to generate the relevant page numbers
   const generatePageNumbers = (currentPage, totalPages) => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const startPage = Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
            // NameRoute
            <Link key={i} to={`/user/page/${i}`} onClick={() => Pagination(i)} className={currentPage === i ? 'active' : ''}>{i}</Link>
        );
    }

    return pageNumbers;
  };


    const logUser = async (aktifitas) => {
  
      let now = new Date();
      let date = now.toISOString().split('T')[0];
      let time = now.toTimeString().split(' ')[0];
      let timestamp = `${date} ${time}`;

      await axios.post('/log_user', {
              user_id : 2, 
              aktivitas : aktifitas, 
              timestamp : timestamp, 
              
        },{
          headers: {
              'usertoken': tokenUser
          }
      });
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
  <div  className="container-fluid p-0">
      <h1 className=" mb-3 text-white" > <strong>USER </strong> </h1>
        {/* <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Beranda</a></li>
            <li class="breadcrumb-item active" aria-current="page">User</li>
          </ol>
        </nav> */}
        <div className="row">
          <div className="col-12">
              <div style={{padding: '20px',borderRadius: '10px',backgroundColor: '#222E3C'}}  className="card">
              <div className="row">
              <div  className="col-12" >
              {/* Start Table Content */}


                <div className="row">
                  <div className="col-lg-12 d-flex justify-content-between align-items-center">
                    {/* Add User button aligned to the left */}
                    <button type="button" className="btn btn-primary  me-3"  onClick={newUserModalShow} ><i className='fa fa-plus'></i> Add User </button>

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
                        <th  scope="col">name</th> 
                        <th  scope="col">username</th> 
                        <th  scope="col">email</th> 
                        <th  scope="col">level</th> 
                      <th width="400" scope="col">action</th>
                    </tr>
                      </thead>
                      <tbody>

                      {!!DataResponse && DataResponse ? (
                          DataResponse.map((item, i) => (                   
                        <tr key={item.user_id}>
                              
                            <td  width="150" scope="row">{(currentPage - 1) * limit + i + 1}</td>

                            <td>{item.nama}</td> 
                            <td>{item.username}</td> 
                            <td>{item.email}</td> 
                            <td>
                            {item.hak_akses === 'admin' 
                            ? 'Administrator' 
                            : item.hak_akses === 'petugas' 
                            ? 'Operator' 
                            : 'Root'}
                            </td> 
                          
                            <td className='text-center'  >
                              <button type="button" className="btn btn-primary me-1"  onClick={() => editShow(item)}>Edit</button>
                              <button type="button" className="btn btn-danger me-1"  onClick={() => deleteModalShow(item.user_id)}>Delete</button>
                            </td>
                            
                        </tr>
                          ))) : (<div>No Data</div>)}
                          </tbody>
                      </table>
                      </div>
                      </div>
                  </div>        
                  <div className="pagination">
                      <a className={currentPage === 1 ? 'disabled paginationNav' : 'paginationNav'} onClick={() => Pagination(currentPage - 1)}>&laquo;</a>
                      {generatePageNumbers(currentPage, Total)}
                      <a className={currentPage === Total ? 'disabled paginationNav' : 'paginationNav'} onClick={() => Pagination(currentPage + 1)}>&raquo;</a>
                    </div>

                    {/* End konten table */}
          </div>
          </div>

              </div>
          </div>
      </div>
  </div>
</main>
        
    {/* Modal */}
    {/* ----------------------------------------------------------------------------------------------- */}
    
    <Modal show={deleteModal} onHide={deleteModalClose} size="sm">
        <Form className="form-box" onSubmit={Hapus}>
          <Modal.Header closeButton>
            <Modal.Title> Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <h5 className='textDeleteModal'>
          Are you sure to delete User data ?
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
  <Modal show={newUserModal} onHide={newUserModalClose} size="lg">
    <Form className="form-box" onSubmit={Tambah}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="card ">
        <div className="card-body p-4">
        <div className="form-group">
        <p style={{color: 'red'}}>{errorMsg}</p>
    
        
          <label>Name</label>
          <InputGroup className="mb-3 ">
            <Form.Control
              className="searchInput"
              placeholder="name"
              aria-label="name"
              aria-describedby="basic-addon2"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </InputGroup>
          
          <label>Username</label>
          <InputGroup className="mb-3 ">
            <Form.Control
              className="searchInput"
              placeholder="username"
              aria-label="username"
              aria-describedby="basic-addon2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
          
          <label>Password </label>
          <InputGroup className="mb-3 ">
            <Form.Control
              className="searchInput"
              type="password"
              placeholder="password"
              aria-label="password"
              aria-describedby="basic-addon2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          
          <label>Email</label>
          <InputGroup className="mb-3 ">
            <Form.Control
              className="searchInput"
              placeholder="email"
              aria-label="email"
              type="email"
              aria-describedby="basic-addon2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          
          <label>Level</label>
          <InputGroup className="mb-3">
              <Form.Select
                className="searchInput"
                aria-label="hak_akses"
                aria-describedby="basic-addon2"
                value={hak_akses}
                onChange={(e) => setHak_akses(e.target.value)}
              >
                <option value="">Select Level</option>
                <option value="admin">Administrator</option>
                <option value="petugas">Operator</option>
                <option value="root">Root</option>
              </Form.Select>
            </InputGroup>
          {/* option */}

        

      </div>
        </div>
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={newUserModalClose}>
          Close
        </Button>
        <Button variant="primary" type="submit">
        Save User 
        </Button>
      </Modal.Footer>
    </Form>
  </Modal>
    
{/* Edit Modal */}
<Modal show={editUserModal} onHide={editClose} size="lg">
<Form className="form-box" onSubmit={Edit}>
<Modal.Header closeButton>
<Modal.Title>Edit User Data</Modal.Title>
</Modal.Header>
<Modal.Body>
<div className="card ">
<div className="card-body p-4">
<div className="form-group">
<p style={{color: 'red'}}>{errorMsg}</p>
                
                        
                        
<label>Name</label>
<InputGroup className="mb-3 ">
  <Form.Control
    className="searchInput"
    placeholder="name"
    aria-label="name"
    aria-describedby="basic-addon2"
    value={nama}
    onChange={(e) => setNama(e.target.value)}
  />
</InputGroup>

<label>username</label>
<InputGroup className="mb-3 ">
  <Form.Control
    className="searchInput"
    placeholder="username"
    aria-label="username"
    aria-describedby="basic-addon2"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
</InputGroup>


<label>email</label>
<InputGroup className="mb-3 ">
  <Form.Control
    className="searchInput"
    placeholder="email"
    aria-label="email"
    aria-describedby="basic-addon2"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</InputGroup>

<label>Level</label>



<InputGroup className="mb-3">
              <Form.Select
                className="searchInput"
                aria-label="hak_akses"
                aria-describedby="basic-addon2"
                value={hak_akses}
                onChange={(e) => setHak_akses(e.target.value)}
              >
                <option value="">Select Level</option>
                <option value="admin">Administrator</option>
                <option value="petugas">Operator</option>
                <option value="root">Root</option>
              </Form.Select>
            </InputGroup>

          

                    
                  </div>
                    </div>
                  </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={editClose}>
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      Edit User Data
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
          
    {/* ----------------------------------------------------------------------------------------------- */}
    {/* end Modal */}
            {/* End Content */}
            
            {/* Footer */}
            <Footer />
          </div>
        </div>
      );
    }
    
    export default User;
    

