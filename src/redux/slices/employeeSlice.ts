import { createSlice } from '@reduxjs/toolkit';
import { initialStateType } from '../../components/types';
const tokenString = localStorage.getItem('token');
const currentUser = tokenString ? JSON.parse(tokenString) : null;

const initialState:initialStateType = {
  empList: [],
  error : {
    message:''
  },
  updateList: {
    name: '', 
    age: 0,
    department: '',
    job_title: '',
    salary: 0
  },
  searchList: [],
  loading: false,
  currentUser:currentUser
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getEmployee: (state, action) => {
      state.loading = false;
      state.empList = action.payload;
    },
    getError: (state, action) => {
      state.error = action.payload;
    },
    getOneEmp: (state, action) => {
      state.updateList = action.payload;
    },
    getSearchEmp: (state, action) => {
      state.searchList = action.payload;
    },
    userLogout: (state) => {
      localStorage.removeItem('token');
      state.currentUser = null;
    },
  },
});

export const {
  getRequest,
  getEmployee,
  getError,
  getOneEmp,
  getSearchEmp,
  userLogout,
} = employeeSlice.actions;

export const employeeReducers = employeeSlice.reducer;
