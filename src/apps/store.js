import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../features/LoginSlice";
import addEmployeeSlice from "../features/AddEmployeeSlice";
import allEmployeeSlice from "../features/allEmployeeSlice";
import registerSlice from "../features/RegisterSlice";
import getSingleEmployeeSlice from "../features/GetSingleEmployee";
import editEmployeeSlice from "../features/EditEmployeeSlice";
import deleteEmployeeSlice from "../features/DeleteEmployeeSlice";
import searchEmployeeSlice from "../features/SearchEmployeeSlice";
import addProjectSlice from "../features/AddProjectSlice";
import allProjectSlice from "../features/AllPojectSlice";
import editProjectSlice from "../features/EditProjectSlice";
import deleteProjectSlice from "../features/DeleteProjectSlice";
import getSingleProjectSlice from "../features/GetSingleProjectSlice";
import searchProjectSlice from "../features/SearchProjectSlice";
import addClientSlice from "../features/AddClientSlice";
import allClientSlice from "../features/AllClientSlice";
import editClientSlice from "../features/EditClientSlice";
import deleteClientSlice from "../features/DeleteClientSlice";
import getSingleClientSlice from "../features/GetSingleClientSlice";
import searchClientSlice from "../features/SearchClientSlice";
import addProductSlice from "../features/AddProductSlice";
import editProductSlice from "../features/EditProductSlice";
import allProductSlice from "../features/AllProductSlice";
import deleteProductSlice from "../features/DeleteProductSlice";
import getSingleProductSlice from "../features/GetSingleProductSlice";
import searchProductSlice from "../features/SearchProductSlice";
import allSaleSlice from "../features/AllSaleSlice";
import searchSaleSlice from "../features/SearchSaleSlice";
import getSingleSaleSlice from "../features/GetSingleSaleSlice";
import editSaleSlice from "../features/EditSaleSlice";
import  addSaleSlice  from "../features/AddSaleSlice";
import deleteSaleSlice from "../features/DeleteSaleSlice";


const store = configureStore({
    reducer:{
        register:registerSlice.reducer,
        login:loginSlice.reducer,
        //User
        addEmployee:addEmployeeSlice.reducer,
        allEmployee: allEmployeeSlice.reducer,
        getSingleEmployee: getSingleEmployeeSlice.reducer,
        editEmployee: editEmployeeSlice.reducer,
        deleteEmployee: deleteEmployeeSlice.reducer,
        searchEmployee: searchEmployeeSlice.reducer,
        // Project
        addProject:addProjectSlice.reducer,
        allProject:allProjectSlice.reducer,
        editProject:editProjectSlice.reducer,
        deleteProject:deleteProjectSlice.reducer,
        getSingleProject:getSingleProjectSlice.reducer,
        searchProject:searchProjectSlice.reducer,
        //Client
        addClient:addClientSlice.reducer,
        allClient:allClientSlice.reducer,
        editClient:editClientSlice.reducer,
        deleteClient:deleteClientSlice.reducer,
        getSingleClient:getSingleClientSlice.reducer,
        searchClient:searchClientSlice.reducer,
        //Product
        addProduct:addProductSlice.reducer,
        allProduct:allProductSlice.reducer,
        editProduct:editProductSlice.reducer,
        deleteProduct:deleteProductSlice.reducer,
        getSingleProduct:getSingleProductSlice.reducer,
        searchProduct:searchProductSlice.reducer,
        //Sale
        addSale:addSaleSlice.reducer,
        allSale:allSaleSlice.reducer,
        editSale:editSaleSlice.reducer,
        deleteSale:deleteSaleSlice.reducer,
        getSingleSale:getSingleSaleSlice.reducer,
        searchSale:searchSaleSlice.reducer,
    }
})
export default store;