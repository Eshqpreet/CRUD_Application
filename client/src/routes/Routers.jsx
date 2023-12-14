import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import EmployeeForm from '../pages/Employee/EmployeeForm';
import EmployeeList from '../pages/Employee/EmployeeList';
import UpdateEmployee from '../pages/Employee/UpdateEmployee';
import OverviewDashboard from '../pages/OverviewDashboard';
import EmployeeCard from '../pages/Employee/EmployeeCard';

const Routers = () => {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<EmployeeList />} />
                <Route path="/employeelist" element={<EmployeeList />} />
                <Route path="/overvieweddashboard" element={<OverviewDashboard />} />
                <Route path="/create" element={<EmployeeForm />} />
                <Route path="/update/:id" element={<UpdateEmployee />} />
                <Route path="/employee/:id" element={<EmployeeCard />} />
            </Routes>
        </>
    );
};

export default Routers;
