import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Form, Button,InputGroup, Modal   } from "react-bootstrap";
import SimpleBar from "simplebar";

function Header() {

    const [DataResponse, setDataResponse] = useState([]);
    const [total, setTotal] = useState(0);
    const tokenUser = 'ujicoba';
    const navigate = useNavigate();

     // Variable Input
     const [userID, setUserID] = useState(''); 
     const [nama, setNama] = useState(''); 
     const [username, setUsername] = useState(''); 
     const [password, setPassword] = useState(''); 
     const [email, setEmail] = useState(''); 
     const [hak_akses, setHak_akses] = useState(''); 
     const [token, setToken] = useState(''); 
     const [oldpassword, setOldPassword] = useState(''); 
     const [newpassword, setNewPassword] = useState(''); 

     const [isEditable, setIsEditable] = useState(false); // untuk edit profile agar form dapat di isi
     const [btnProfile, setBtnProfile] = useState('Edit Profile');
     const [msg, setMsg] = useState('');
     const [errMsg, setErrMsg] = useState('');
     const [showPassword, setShowPassword] = useState(false);
     const [showPasswordOld, setShowPasswordOld] = useState(false);

     const togglePasswordVisibility = () => {
       setShowPassword(!showPassword);
     };

     const togglePasswordVisibilityOld = () => {
       setShowPasswordOld(!showPasswordOld);
     };

    //  function
     function editButton(param) {
      
      if (isEditable === true) {

        if (param === 'cancel') {
          setIsEditable(false)
          setBtnProfile('Edit Profile')
        }else{
          const isError = Edit()
          if (!isError) {
            setIsEditable(false)
            setBtnProfile('Edit Profile')
          }
          // TODO ubah data profile
       
        }
 
      } else {
        setIsEditable(true)
        setBtnProfile('Save Profile')
      }

     }

     
    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
    
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    };

    // Modal
    const [profileModal, setProfileModal] = useState(false);
    const [changePasswordModal, setChangePasswordModal] = useState(false);
    
    const profileModalClose = () => {
      setProfileModal(false);
      setMsg('');
      setErrMsg('');
    }
    const changePasswordClose = () => {
      setChangePasswordModal(false);
      setMsg('');
      setErrMsg('');
    }
        
    const profileModalShow = () => {
      setProfileModal(true);

    }
        
    const changePasswordModalShow = () => {
      setChangePasswordModal(true);
      setProfileModal(false);
    }

    
    const Edit = async (e) => {
      var datatoken = sessionStorage.getItem('data_token');
  
      try {
          const response = await axios.put(`/User/${userID}`, {
              user_id: userID,
              nama: nama,
              username: username,
              password: password,
              email: email,
              hak_akses: hak_akses,
              token: datatoken,
          }, {
              headers: {
                  'usertoken': datatoken
              }
          });
  
          if (response.status === 200) {
             
              sessionStorage.setItem('data_user', JSON.stringify(response.data));
              setMsg('Edit Profile Berhasil');
              return false;
          }
      } catch (error) {
          console.error('There was an error!', error);
          if (error.response && error.response.status === 409) {
            setErrMsg(error.response.data.message);
            return true;
          } else {
              // handle other errors
              console.error('An error occurred:', error);
          }
      }
  }
    
    const submitNewPassword = async (e) => {
      var datatoken = sessionStorage.getItem('data_token');
  
      try {
          const response = await axios.post(`/gantipassword`, {
              username: username,
              password: oldpassword,
              newpassword: newpassword,
          }, {
              headers: {
                  'usertoken': datatoken
              }
          });
  
          if (response.status === 200) {
             
             
              setMsg(<span className='text-success' >Password changed successfully!</span>); 

              setTimeout(() => {
                setChangePasswordModal(false);
                setMsg('');
                setErrMsg('');
                setOldPassword('');
                setNewPassword('');
              }, 1000);

          }
      } catch (error) {

        setMsg(<span className='text-danger' >the old password is wrong!</span>);
          // Handle the error appropriately here
      }
  }


  const get_notification = async () => {
   
    const response = await axios.get(`/notifikasi/unread`,{
      headers: {
        'usertoken': tokenUser
      }
    });
    if (response.data.length) {
      setDataResponse(response.data);
      setTotal(response.data.length)
    }
    
  }

  


  const readNotif = async (e) => {
                 
    await axios.put(`/notifikasi/update`, {
       fill:'filler',
       },{
         headers: {
             'usertoken': tokenUser
         }
       });
       get_notification();
       navigate('/notifikasi');

   }

   
  //  Hamburger menu
  const initialize = () => {
    initializeSimplebar();
    initializeSidebarCollapse();
  }
  
  const initializeSimplebar = () => {
    const simplebarElement = document.getElementsByClassName("js-simplebar")[0];
  
    if(simplebarElement){
      const simplebarInstance = new SimpleBar(document.getElementsByClassName("js-simplebar")[0]);
  
      /* Recalculate simplebar on sidebar dropdown toggle */
      const sidebarDropdowns = document.querySelectorAll(".js-sidebar [data-bs-parent]");
      
      sidebarDropdowns.forEach(link => {
        link.addEventListener("shown.bs.collapse", () => {
          simplebarInstance.recalculate();
        });
        link.addEventListener("hidden.bs.collapse", () => {
          simplebarInstance.recalculate();
        });
      });
    }
  }
  
  const initializeSidebarCollapse = () => {
    const sidebarElement = document.getElementsByClassName("js-sidebar")[0];
    const sidebarToggleElement = document.getElementsByClassName("js-sidebar-toggle")[0];
  
    if(sidebarElement && sidebarToggleElement) {
      sidebarToggleElement.addEventListener("click", () => {
        sidebarElement.classList.toggle("collapsed");
  
        sidebarElement.addEventListener("transitionend", () => {
          window.dispatchEvent(new Event("resize"));
        });
      });
    }
  }
        
    useEffect(() => {
        // get_notification();
        // get local storage
        var data = sessionStorage.getItem('data_user');
        initialize();
        data = JSON.parse(data);
        setUserID(data.user_id);
        setNama(data.nama);
        setPassword(data.password)
        setUsername(data.username)
        setEmail(data.email)
        setHak_akses(data.hak_akses)
        setToken(data.token)
    }, []);



    return(
      <>
      <nav className="navbar navbar-expand navbar-light navbar-bg">
        <a className="sidebar-toggle js-sidebar-toggle">
          <i className="hamburger align-self-center" />
        </a>
        <div className="navbar-collapse collapse">
          <ul className="navbar-nav navbar-align">
            <li className="nav-item dropdown me-5">
             
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0"
                aria-labelledby="alertsDropdown"
              >
                <div className="dropdown-menu-header">{total} Notifications</div>
               

                <div className="list-group">
                {!!DataResponse && DataResponse ? (
                  DataResponse.map((item, i) => (          
                  <a key={i} href="#" className="list-group-item">
                    <div className="row g-0 align-items-center">
                      <div className="col-10">
                        <div className="text-dark">{item.notifikasi}</div>
                        
                        <div className="small mt-1"> {formatTimestamp(item.timestamp)}</div>
                      </div>
                    </div>
                  </a>
             ))) : (
                  <a href="#" className="list-group-item">
                  <div className="row g-0 align-items-center">
                    <div className="col-10">
                      <div className="text-dark">No New Notifications</div>
                    </div>
                  </div>
                  </a>
             )}

              
                </div>
                <div className="dropdown-menu-footer">
                  <a onClick={readNotif} className="text-muted">
                    View All Notifications
                  </a>
                </div>
              </div>
            </li>
           
            <li className="nav-item dropdown ">
              <a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown" >
                <i className="align-middle" data-feather="user" />
              </a>
              <a className="nav-link dropdown-toggle d-none d-sm-inline-block text-light" href="#" data-bs-toggle="dropdown" >
                <img src="img/avatars/avatar.jpg" className="avatar img-fluid rounded me-3" alt="name" />
                <span className="text-light">{nama}</span>
              
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <a className="dropdown-item" onClick={() => setProfileModal(true)}>
                  <i className="fas fa-user"></i> Profile
                </a>
                <a 
                    className="dropdown-item" 
                    href="/login" 
                    onClick={() => sessionStorage.clear()}
                  >
                    <i className="fas fa-sign-out-alt"></i> Log out
                  </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
        {/* modal ubah user */}
        <Modal show={profileModal} onHide={profileModalClose} size="md">
        {/* onSubmit={Hapus} */}
        <Form className="form-box" >
          <Modal.Header closeButton>
            <Modal.Title> Profile </Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <p style={{color: 'green'}} >{msg}</p>
             <p style={{color: 'red'}} >{errMsg}</p>
             {/* Form */}
             <div className="form-group">

                  <label>Name</label>
                  <InputGroup className="mb-3 ">
                    <Form.Control
                        disabled={!isEditable}
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
                        disabled={!isEditable}
                      className="searchInput"
                      placeholder="username"
                      aria-label="username"
                      aria-describedby="basic-addon2"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </InputGroup>
                  
                  <label>Email</label>
                  <InputGroup className="mb-3 ">
                    <Form.Control
                        disabled={!isEditable}
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
                  <p>{hak_akses}</p>
                 
                  {/* option */}

              </div>
              <a className="btn btn-primary"  onClick={() => editButton('save')} > <i className="fa fa-user"></i> {btnProfile}</a>
              {!isEditable &&  <a className="btn btn-primary ms-3" onClick={() => changePasswordModalShow()} > <i className="fa fa-key"></i> Change Password</a>}
              {isEditable &&  <a className="btn btn-secondary ms-3"  onClick={() => editButton('cancel')} > Close Edit</a>}
             
             {/* End Form */}
          </Modal.Body>
          <Modal.Footer>
       
          <Button variant="secondary" onClick={profileModalClose}>
            Close
          </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* modal ubah password */}
       {/* modal ubah user */}
       <Modal show={changePasswordModal} onHide={changePasswordClose} size="md">
        {/* onSubmit={Hapus} */}
        <Form className="form-box" >
          <Modal.Header closeButton>
            <Modal.Title> Change Password </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
          {msg}
             {/* Form */}
             <div className="form-group">

                  <label>Old Password</label>
                  
                  <InputGroup className="mb-3 ">
                    <Form.Control
                      className="searchInput"
                      placeholder="Old Password"
                      aria-label="name"
                      aria-describedby="basic-addon2"
                      value={oldpassword}
                      type={showPasswordOld ? 'text' : 'password'}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                 <span onClick={togglePasswordVisibilityOld} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} >
                      {showPasswordOld ? (<i className="fas fa-eye-slash"></i>) : (<i className="fas fa-eye"></i>)}
                    </span>
            
                  </InputGroup>
                
              
                  <label>New Password</label>
                  <InputGroup className="mb-3 ">
                    <Form.Control
                      className="searchInput"
                      placeholder="New Password"
                      aria-label="password"
                      aria-describedby="basic-addon2"
                      value={newpassword}
                      type={showPassword ? 'text' : 'password'}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  <span onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} >
                      {showPassword ? (<i className="fas fa-eye-slash"></i>) : (<i className="fas fa-eye"></i>)}
                    </span>
              
                  </InputGroup>
                 
                 
                  {/* option */}

              </div>
      
             
             {/* End Form */}
          </Modal.Body>
          <Modal.Footer>
       
          <Button variant="primary" onClick={submitNewPassword}>
            Change Password
          </Button>
          <Button variant="secondary" onClick={changePasswordClose}>
            Close
          </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      </>
    );
}

export default Header;