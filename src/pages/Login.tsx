import  { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
  useAuth('token');
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errors, setErrors] = useState<string>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleForm:FormEventHandler = (e) => {
    e.preventDefault();
    const signupDataString = localStorage.getItem('signupData');
    const signData = signupDataString ? JSON.parse(signupDataString) : null;
    
    if (signData) {
      if (signData.email === email && signData.password === password) {
        const token = `token-${signData.email}-${Math.random().toString(36)}`;
        localStorage.setItem('token', JSON.stringify(token));
        navigate('/');
        Toast.fire({
          icon: 'success',
          title: 'Login successfully',
        });
      } else {
        setErrors('please enter valid email address or password');
      }
    } else {
      setErrors('you need to do signup first');
    }
  };

  return (
    <>
      <div id="employee-form-container">
        <h2 className="form-header">Login Here</h2>
        <form onSubmit={handleForm} id="employee-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
              <span
                className={`password-toggle ${showPassword ? 'visible' : 'hidden'}`}
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? '🙈' : '👁'}
              </span>
            </div>
          </div>

          <input type="submit" value="Submit" className="submit-button" />

          {errors && <div className="error-message">{errors}</div>}
        </form>
      </div>
    </>
  );
};

export default Login;
