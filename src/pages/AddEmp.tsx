import { FormEventHandler,  useState } from 'react';
import { useDispatch } from 'react-redux';
import { postEmpolyees } from '../redux/slices/employeeHandler';
import { useNavigate } from 'react-router';
import { getAllEmpolyees } from '../redux/slices/employeeHandler';
import Swal from 'sweetalert2';
import { AppDispatch } from '../redux/store';
import { Errors } from '../components/types';

const AddEmp = () => {


  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>();
  const [department, setDepartment] = useState<string>('');
  const [job_title, setJob_title] = useState<string>('');
  const [salary, setSalary] = useState<number>();
  const [errors, setErrors] = useState<Errors>({});

  const dispatch:AppDispatch = useDispatch();

  const validateInput = () => {
    const newErrors:Errors = {};

    if (!name || name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters long.';
    }

    if (!age || age < 0) {
      newErrors.age = 'Age must be a positive integer.';
    }

    if (!department || department.length < 3) {
      newErrors.department = 'Department must be at least 3 characters long.';
    }

    if (!job_title || job_title.length < 3) {
      newErrors.job_title = 'Job title must be at least 3 characters long.';
    }

    if (!salary || salary < 0) {
      newErrors.salary = 'Salary must be a positive integer.';
    }

    setErrors(newErrors);
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };
  const showConfirmationDialog = async (title:string) => {
    const result = await Swal.fire({
      // position: "top-end",
      icon: 'success',
      title: title || 'Your work has been saved',
      showConfirmButton: true,
    });
    return result.isConfirmed;
  };

  const handleForm:FormEventHandler = async (e) => {
    e.preventDefault();

    // Validate input before submission
    if (validateInput()) {
      const confirm = await showConfirmationDialog(
        'Employee added successfully',
      );
      if (confirm) {
        const empData = { name, age, department, job_title, salary };
        dispatch(postEmpolyees(empData));
        dispatch(getAllEmpolyees());
        navigate('/');
      }
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div id="employee-form-container">
      <h2 className="form-header">Add Employee</h2>
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
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.valueAsNumber)}
            className="form-input"
          />
          {errors.age && <div className="error-message">{errors.age}</div>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter your department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="form-input"
          />
          {errors.department && (
            <div className="error-message">{errors.department}</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter your job title"
            value={job_title}
            onChange={(e) => setJob_title(e.target.value)}
            className="form-input"
          />
          {errors.job_title && (
            <div className="error-message">{errors.job_title}</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter your salary"
            value={salary}
            onChange={(e) => setSalary(e.target.valueAsNumber)}
            className="form-input"
          />
          {errors.salary && <div className="error-message">{errors.salary}</div>}
        </div>
        <input type="submit" value="Submit" className="submit-button" />
        <input
          type="button"
          className="cancel-button"
          onClick={handleCancel}
          value={'cancel'}
        />
      </form>
    </div>
  );
};

export default AddEmp;
