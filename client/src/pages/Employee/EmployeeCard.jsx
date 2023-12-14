import { useParams, Link } from 'react-router-dom';
import { BsFilePersonFill } from "react-icons/bs";
import { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeCard = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:3001/${id}`)
            .then(result => {
                setEmployee(result.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);
    return (
        <section className="md:pl-[300px] md:pr-[100px] pl-[250px] pr-[80px]">
            <h1 className="text-[40px] font-[600] leading-6">Employee's Details</h1>
            <div className='flex items-center justify-evenly'>
                <div className='mt-[90px] border-[2px] border-solid border-[#000] w-[600px] h-[400px] bg-[#F1EAFF]'>
                    <div className='flex items-center justify-evenly'>
                        <div className='w-full pl-[30px] pb-[25px] pr-[100px] flex items-center justify-evenly'>
                            <ul className='text-[15px] font-semibold leading-6  w-[200px] pl-[40px]'>
                                <li>Name: {employee.name}</li>
                                <li className='mt-[15px] '>D.O.B:  {employee.dob}</li>
                                <li className='mt-[15px]'>Age:  {employee.age}</li>
                                <li className='mt-[15px]'>Gender:  {employee.gender}</li>
                                <li className='mt-[15px]'>Department:  {employee.department}</li>
                                <li className='mt-[15px]'>Position:  {employee.position}</li>
                                <li className='mt-[15px]'>Salary:{employee.salary}</li>
                            </ul>
                        </div>
                        <div className=' flex items-center justify-end p-[10px] pl-[20px] pb-[100px]'>
                            <div className='flex flex-col gap-[100px] h-full items-center justify-evenly mt-[50px]'>
                                <BsFilePersonFill className='text-[100px] w-[250px]' />
                                <Link to={`/update/${id}`}>
                                    <button className='px-[15px] py-[9px] text-white font-[600] bg-[#000] hover:bg-gray-800 mt-0 rounded-md flex items-center gap-[10px]'>Update</button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EmployeeCard