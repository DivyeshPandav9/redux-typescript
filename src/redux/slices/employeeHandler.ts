import axios from 'axios';
import {EmpData} from '../../components/types'
import {
  getEmployee,
  getError,
  getOneEmp,
  getRequest,
  getSearchEmp,
  userLogout,
} from './employeeSlice';
import { AppDispatch } from '../store';


const apiUrl ='http://localhost:8000/employees';


export const getAllEmpolyees = () => async (dispatch:AppDispatch) => {
  dispatch(getRequest());
  try {
    const results = await axios.get(apiUrl);
    dispatch(getEmployee(results.data));
  } catch (error) {
    dispatch(getError(error));
  }
};

export const postEmpolyees = (empData:EmpData) => async (dispatch:AppDispatch) => {
  try {
    const reults = await axios.post(apiUrl, empData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch(getEmployee(reults.data));
  } catch (error) {
    dispatch(getError(error));
  }
};

export const deleteEmployee = (id:string) => async (dispatch:AppDispatch) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    dispatch(getAllEmpolyees());
  } catch (error) {
    dispatch(getError(error));
  }
};

export const selectEmployee = (id:string) => async (dispatch:AppDispatch) => {
  try {
    const result = await axios.get(`${apiUrl}/${id}`);
    dispatch(getOneEmp(result.data));
  } catch (error) {
    dispatch(getError(error));
  }
};

export const updateEmployee = (empData:EmpData, id:string) => async (dispatch:AppDispatch) => {
  try {
    const reults = await axios.put(
      `${apiUrl}/${id}`,
      empData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    dispatch(getEmployee(reults.data));
  } catch (error) {
    dispatch(getError(error));
  }
};
interface Employee {
  name: string;
}

export const searchEmployee = (query:string) => async (dispatch:AppDispatch) => {
  try {
    const result = await axios.get(apiUrl);

    const filteredResults = result.data.filter((employee:Employee) =>
      employee.name.toLowerCase().includes(query.toLowerCase()),
    );
    dispatch(getSearchEmp(filteredResults));
  } catch (error) {
    dispatch(getError(error));
  }
};

export const logoutUser = () => (dispatch:AppDispatch) => {
  dispatch(userLogout());
};
