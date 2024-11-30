import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function Login() {
    useEffect(() => {
      document.title = "Doran SMS | Login";
    }, []);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const tokenUser = 'ujicoba';

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    
    const Masuk = async (e) => {
      e.preventDefault();
      try {
        await axios.post('/login', {
          username: username,
          password: password
        }).then(response => {
          sessionStorage.setItem('data_user', JSON.stringify(response.data.user));
          sessionStorage.setItem('data_token', response.data.token);
        });
        // logUser('login');
        navigate('/');
      } catch (error) {
        if (error.response) {
          setMsg(<h5 className='text-danger'>{error.response.data.msg}</h5>);
        }
      }
    }

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
      <div className="container-fluid" style={{maxHeight: '100vh', overflow: 'hidden'}}>
        <div className="row no-gutter bg-image justify-content-center">
          {/* The image half */}
          {/* <div className="col-md-6 col-lg-7 d-none d-md-flex bg-image" ></div> */}
          {/* The content half */}
          <div className="col-md-6 col-lg-5" style={{backgroundColor: '#101726'}}>
            <div className="login d-flex align-items-center mx-2">
              {/* Demo content*/}
              <div className="container" style={{backgroundColor: '#101726'}}>
                <div className="row">
                  <h1 className="text-center mx-3 mb-3 text-white fw-bold">Doran SMS Gateway</h1>
                  <div className="d-flex flex-row align-items-center justify-content-center">
                    <img src={require(`../static/logo1.png`)} width="75px" alt="logo" />
                  </div>
                  <div className="col-12 px-4">
                    <h1 className="text-white mb-3">Login</h1>
                    <Form onSubmit={Masuk}>
                      {/* Email input */}
                      <div className="form-outline mb-2">
                        <Form.Label className="fs-7 text-white">Username</Form.Label>
                        <Form.Control type="text" className="form-control-lg" value={username} onChange={(e) => setUsername(e.target.value)}  required />
                      </div>
                      {/* Password input */}
                      <div className="form-outline mb-3" style={{ position: 'relative'}}>
                        <Form.Label className="fs-6 text-white">Password</Form.Label>
                        <Form.Control type={showPassword ? 'text' : 'password'} className="form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)}required />
                        <span onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '10px', top: '70%', transform: 'translateY(-50%)', cursor: 'pointer' }} >
                          {showPassword ? (<i className="fas fa-eye-slash"></i>) : (<i className="fas fa-eye"></i>)}
                        </span>
                      </div>
                      {/* Pesan Error */}
                      {msg ? (<h4 className="text-danger">{msg}</h4>) : ('')}
                      <Button type="submit" variant="primary" className="btn btn-primary btn-lg buttonLogin mt-3" >Login</Button>
                      {/* <p className="text-center mt-3 text-white"> <b> Forgot Password ? </b> <a className="text-primary" href="/lupapassword"> <b>click here</b> </a></p> */}
                    </Form>
                  </div>
                </div>
              </div>
              {/* End */}
            </div>
          </div>
          {/* End */}
        </div>
      </div>
    )
}

export default Login;