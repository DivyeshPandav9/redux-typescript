import  { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
interface Errors{
    [key:string]:string|undefined
}
const SignUp = () => {
  useAuth('token');

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [showPassword, setShowPassword] = useState<string|boolean>(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const [errors, setErrors] = useState<Errors>({});
  const validateInput = () => {
    const newErrors:Errors = {};

    if (!name || name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters long.';
    }

    if (
      !email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      newErrors.email = 'Email is not valid.';
    }
    const passwordPattern = /^.{9,}$/;

    if (!password || !passwordPattern.test(password)) {
      newErrors.password =
        'Password must contain at least 8 letters  (upper or lowercase).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForm:FormEventHandler = (e) => {
    e.preventDefault();
    if (validateInput()) {
      console.log({ name, email, password });
      const signUpData = { name, email, password };
      localStorage.setItem('signupData', JSON.stringify(signUpData));
      navigate('/');
    }
  };
  return (
    <>
      <div id="employee-form-container">
        <h2 className="form-header">Sign-up here</h2>
        <form onSubmit={handleForm} id="employee-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
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
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <input type="submit" value="Submit" className="submit-button" />
        </form>
      </div>
    </>
  );
};

export default SignUp;
