import './App.css';
import store from './apps/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Register from './components/Register';
import Login from './components/Login';
import AddProject from './components/AddProject';
import AllProject from './components/AllProject';
import EditProject from './components/EditProject';
import AddClient from './components/AddClient';
import AllClient from './components/AllClient';
import EditClient from './components/EditClient';
import AddProduct from './components/AddProduct';
import AllProduct from './components/AllProduct';
import EditProduct from './components/EditProduct';
import AddSale from './components/AddSale';
import AllSale from './components/AllSale';
import EditSale from './components/EditSale';
import AllEmployee from './components/AllEmployee';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';  // Make sure this is the correct Layout.js file
import EditEmployee from './components/EditEmployee';
import AddEmployee from './components/AddEmployee'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            {/* Standalone Pages (No Sidebar or Topbar) */}
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />

            {/* Protected Routes inside Layout */}
            <Route path="*" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="add/employee" element={<AddEmployee />} />
              <Route path="employee" element={<AllEmployee />} />
              <Route path="edit/employee/:id" element={<EditEmployee />} />
              <Route path="add/project" element={<AddProject />} />
              <Route path="project" element={<AllProject />} />
              <Route path="edit/project/:id" element={<EditProject />} />
              <Route path="add/client" element={<AddClient />} />
              <Route path="client" element={<AllClient />} />
              <Route path="edit/client/:id" element={<EditClient />} />
              <Route path="add/product" element={<AddProduct />} />
              <Route path="product" element={<AllProduct />} />
              <Route path="edit/product/:id" element={<EditProduct />} />
              <Route path="add/sale" element={<AddSale />} />
              <Route path="sale" element={<AllSale />} />
              <Route path="edit/sale/:id" element={<EditSale />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
