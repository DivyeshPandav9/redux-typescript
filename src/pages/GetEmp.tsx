import  { FormEvent, useEffect, useState } from 'react';
import {Todo} from '../components/types'
import {
  deleteEmployee,
  getAllEmpolyees,
  searchEmployee,
} from '../redux/slices/employeeHandler';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../redux/hooks';


const GetEmp = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isSearching, setIsSearching] = useState(false);

  const data = useAppSelector((state) => state.employee.empList);
  const searchData = useAppSelector((state) => state.employee.searchList);
  const loading = useAppSelector((state) => state.employee.loading);
  // const error = useAppSelector((state) => state.employee.error);


  const showConfirmationDialog = async (title:string, text:string) => {
    const result = await Swal.fire({
      title: title || 'Are you sure?',
      text: text || "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      await Swal.fire({
        title: 'Deleted!',
        text: 'Employee has been deleted.',
        icon: 'success',
      });
    }
    return result.isConfirmed;
  };

  const deleteHandle = async (id:string) => {
    const confirmed = await showConfirmationDialog(
      'Delete User',
      'Are you sure you want to delete this user?',
    );
    if (confirmed) {
      dispatch(deleteEmployee(id));
    }
  };

  const updateHandle = (id:string) => {
    navigate(`/update/${id}`);
  };


  const handleSearch: React.FormEventHandler<HTMLInputElement> = (e: FormEvent<HTMLInputElement>) => {
    const query = (e.target as HTMLInputElement).value;
    dispatch(searchEmployee(query));
    setIsSearching(query.length > 0);
};

  useEffect(() => {
    dispatch(getAllEmpolyees());
  }, [dispatch]);

  return (
    <>
      <p className="form-header">Employee Details</p>
      {
      // error ? (
      //   <h2>{error?.message}</h2>
      // ) :
       (
        <>
          <div className="search-container">
            <label className="search-label" htmlFor="search">
              Search{' '}
            </label>
            <input
              onChange={handleSearch}
              className="search-input"
              id="search"
              type="text"
              placeholder="search employee by name"
            />
          </div>

          <div className="item-container">
            <table className="item-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Job Title</th>
                  <th>Salary</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr style={{ textAlign: 'center' }}>loading....</tr>
                ) : isSearching ? (
                  searchData.length > 0 ? (
                    searchData.map((item:Todo, index:number) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.job_title}</td>
                        <td>{item.salary}</td>
                        <td>{item.department}</td>
                        <td>
                          <button
                            className="delete-button"
                            onClick={() => deleteHandle(item.id)}
                          >
                            delete
                          </button>{' '}
                          <button
                            className="update-button"
                            onClick={() => updateHandle(item.id)}
                          >
                            update
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center' }}>
                        No data found
                      </td>
                    </tr>
                  )
                ) : data.length > 0 ? (
                  data.map((item:Todo, index:number) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.job_title}</td>
                      <td>{item.salary}</td>
                      <td>{item.department}</td>
                      <td>
                        <button
                          className="delete-button"
                          onClick={() => deleteHandle(item.id)}
                        >
                          delete
                        </button>{' '}
                        <button
                          className="update-button"
                          onClick={() => updateHandle(item.id)}
                        >
                          update
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center' }}>
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default GetEmp;