import { useState, useEffect } from "react";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeList = () => {
    const [originalEmployees, setOriginalEmployees] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        axios.get("http://localhost:3001")
            .then(result => {
                setOriginalEmployees(result.data);
                setEmployees(result.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleSearch = () => {
        const filteredEmployees = originalEmployees.filter((employee) =>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setEmployees(filteredEmployees);
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:3001/delete/${id}`)
            .then((result) => {
                console.log(result);

                // Update state to trigger a re-render
                setOriginalEmployees((prevEmployees) =>
                    prevEmployees.filter((employee) => employee._id !== id)
                );
                setEmployees((prevEmployees) =>
                    prevEmployees.filter((employee) => employee._id !== id)
                );

                toast.success('Successfully Deleted!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
            .catch((err) => {
                toast.error('Error!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                console.log(err);
            });
    };

    // Sorting Logic as per the name
    const handleSort = () => {
        const sortedEmployees = [...employees].sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            if (sortOrder === "asc") {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });

        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        setEmployees(sortedEmployees);
    };

    const sortIcon = sortOrder === "asc" ? <FaSortAlphaDown /> : <FaSortAlphaDownAlt />;

    return (
        <section className="md:pl-[300px] md:pr-[100px] pl-[250px] pr-[80px]">
            <h1 className="md:text-4xl text-3xl font-semibold">Employees</h1>
            <p className="md:text-base text-sm font-normal pt-3">
                Presenting Our Distinguished Team of Employees.
            </p>
            <div className="flex items-center mt-4 md:justify-between flex-col md:flex-row">
                <div className="md:w-96 w-full md:mr-4 md:mt-0 mt-4 bg-white border border-solid border-black rounded-md overflow-hidden flex items-center">
                    <input
                        type="search"
                        className="py-1 pl-4 pr-2 w-full focus:outline-none cursor-pointer"
                        placeholder="Search Employee By Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="px-8 py-2 text-white font-semibold bg-black hover:bg-gray-800 rounded-md"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                <div className="flex items-center mt-4 gap-4">
                    <button
                        className="px-4 py-2 text-white font-semibold bg-black hover:bg-gray-800 rounded-md flex items-center gap-2"
                        onClick={handleSort}
                    >
                        Sort {sortIcon}
                    </button>
                    <Link to="/create">
                        <button className="px-4 py-2 text-white font-semibold bg-black hover:bg-gray-800 rounded-md flex items-center gap-2">
                            New Employee 
                        </button>
                    </Link>
                </div>
            </div>
            <div className="mt-4 w-full">
                <table className="w-full border-collapse">
                    <thead className="text-sm font-semibold">
                        <tr className="bg-[#E5D4FF]">
                            <th className="border">Name</th>
                            <th className="border">DOB</th>
                            <th className="border">Age</th>
                            <th className="border">Gender</th>
                            <th className="border">Email</th>
                            <th className="border">Department</th>
                            <th className="border">Position</th>
                            <th className="border">Salary</th>
                            <th className="border">Action</th>
                        </tr>
                    </thead>

                    <tbody className="text-center border-solid border-black">
                        {employees.map((user, index) => (
                            <tr key={index}>
                                <td className="border">{user.name}</td>
                                <td className="border">{user.dob}</td>
                                <td className="border">{user.age}</td>
                                <td className="border">{user.gender}</td>
                                <td className="border">{user.email}</td>
                                <td className="border">{user.department}</td>
                                <td className="border">{user.position}</td>
                                <td className="border">{user.salary}</td>
                                <td className="border">
                                    <div className="flex items-center justify-evenly p-3">
                                        <Link to={`/update/${user._id}`}>
                                            <button className="abtn">Edit</button>
                                        </Link>
                                        <Link to={{ pathname: `/employee/${user._id}` }}>
                                            <button className="abtn">View</button>
                                        </Link>
                                        <button className="abtn w-16" onClick={(e) => handleDelete(user._id)}>
                                            Delete
                                        </button>
                                        <ToastContainer />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default EmployeeList;
