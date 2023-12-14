import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateEmployee = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [toastKey, setToastKey] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    age: "",
    gender: "male",
    email: "",
    department: "",
    position: "",
    salary: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/getUser/${id}`)
      .then(result => {
        console.log(result);
        setFormData(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/update/${id}`, formData)
      .then(result => {
        console.log("Server response:", result.data);
        setToastKey((prevKey) => prevKey + 1);  // Force rerender
        navigate("/");
        toast.success('Successfully Updated!', {
          key: toastKey,
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
      .catch(err => {
        console.error("Error submitting form:", err);

        if (err.response) {
          // The server responded with a status code other than 2xx
          console.error("Server error data:", err.response.data);
          console.error("Server error status:", err.response.status);
        } else if (err.request) {
          // The request was made but no response was received
          console.error("No response received from the server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", err.message);
        }
      });
      // toast.error('Error!', {
      //   key: toastKey,
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
    console.log("Form submitted:", formData);
  };

  return (
    <section className="pl-[250px] md:pl-[300px]  ">
      <h1 className="text-[30px] md-[840px]:text-[40px] font-[600] leading-6">
        Update the Employee Details
      </h1>
      <p className="text-[16px] md-[840px]:text-[18px] font-[400] leading-5 pt-[20px] md:pt-[35px]">
        Update the Employee's Details here by providing the updated details to ensure accurate and complete information.
      </p>

      <div className="w-full md-[840px]:w-[700px] mx-auto mt-[40px]">
        <h3 className="text-center mx-auto text-[18px] md-[840px]:text-[22px] font-semibold">
          Employee Form
        </h3>
        <form onSubmit={handleSubmit} className="bg-[#F1EAFF] space-y-4 md:space-y-8 mt-[20px] border-[3px] rounded-lg border-solid border-[#000] p-[15px] md:p-[30px]">
          <div className="flex flex-col md:flex-row items-center justify-between mx-[20px]">
            <label htmlFor="name" className="form_label">
              Enter the Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="example"
              className="form_input mt-1 md:ml-2"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mx-[20px]">
            <label htmlFor="dob" className="form_label">
              Enter the Date Of Birth
            </label>
            <input
              type="text"
              id="dob"
              placeholder="DD/MM/YYYY"
              className="form_input mt-1 md:ml-2"
              value={formData.dob}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mx-[20px]">
            <label htmlFor="age" className="form_label">
              Enter the Age
            </label>
            <input
              type="number"
              id="age"
              placeholder="25"
              className="form_input mt-1 md:ml-2"
              value={formData.age}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mx-[20px] pr-[60px]">
            <label htmlFor="gender" className="form_label">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              className="w-[80px] text-center h-[40px] border-solid border-[1.5px] border-[#000] rounded-md mt-1 md:ml-2"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between mx-[20px]">
            <label htmlFor="email" className="form_label">
              Enter the Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="form_input mt-1 md:ml-2"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mx-[20px]">
            <label htmlFor="department" className="form_label">
              Enter the Department
            </label>
            <input
              type="text"
              id="department"
              placeholder="IT"
              className="form_input mt-1 md:ml-2"
              value={formData.department}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mx-[20px]">
            <label htmlFor="position" className="form_label">
              Enter the Position
            </label>
            <input
              type="text"
              id="position"
              placeholder="Senior Developer"
              className="form_input mt-1 md:ml-2"
              value={formData.position}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mx-[20px]">
            <label htmlFor="salary" className="form_label">
              Enter the Salary
            </label>
            <input
              type="number"
              id="salary"
              placeholder="70,000"
              className="form_input mt-1 md:ml-2"
              value={formData.salary}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-evenly md-[840px]:justify-evenly pl-[50px]">
            <button
              type="submit"
              className="bg-black text-white w-full md:w-[400px] px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Update
            </button>
            {/* <ToastContainer/> */}
          </div>
        </form>
      </div>
    </section>
  )
}

export default UpdateEmployee