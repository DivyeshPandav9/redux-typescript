import './App.css';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import NavigationBar from './components/NavigationBar';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import GetEmp from './pages/GetEmp';
import AddEmp from './pages/AddEmp';
import UpdateEmp from './pages/UpdateEmp';
import withAuth from './hoc/withAuth';

const ProtectedGetEmp = withAuth(GetEmp);
const ProtectedAddEmp = withAuth(AddEmp);
const ProtectedUpdateEmp = withAuth(UpdateEmp);

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<NavigationBar />}>
        <Route path="*" element={<h2>404 page not found</h2>} />
        <Route path="/" element={<ProtectedGetEmp />} />
        <Route path="/add" element={<ProtectedAddEmp />} />
        <Route path="/update/:id" element={<ProtectedUpdateEmp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>,
    ),
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
