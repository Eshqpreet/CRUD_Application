import axios from "axios";
import { useState, useEffect } from "react";
import BarChart from "../components/Graphs/BarChart";
import LineChart from "../components/Graphs/LineChart";
import PieChart from "../components/Graphs/PieChart";
import BoxPlot from "../components/Graphs/BoxPlot";

const OverviewDashboard = () => {
  const [originalEmployees, setOriginalEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [averageSalary, setAverageSalary] = useState(0);
  const [departmentData, setDepartmentData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [salaryData, setSalaryData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001")
      .then(result => {
        setOriginalEmployees(result.data);
        setEmployees(result.data);

        // Age Chart
        const ageCounts = result.data.reduce((acc, employee) => {
          const age = employee.age;
          acc[age] = (acc[age] || 0) + 1;
          return acc;
        }, {});

        const ageData = Object.keys(ageCounts).map(age => ({
          age: parseInt(age),
          count: ageCounts[age],
        }));

        console.log(ageData);
        setAgeData(ageData);

        // Total Employees
        setTotalEmployees(result.data.length);

        // Average Salary
        const totalSalary = result.data.reduce((sum, employee) => sum + parseFloat(employee.salary), 0);
        const average = totalSalary / result.data.length;
        setAverageSalary(average);

        //Department
        const departmentCounts = result.data.reduce((acc, employee) => {
          const department = employee.department;
          acc[department] = (acc[department] || 0) + 1;
          return acc;
        }, {});

        const departmentData = Object.keys(departmentCounts).map(department => ({
          department: department,
          count: departmentCounts[department],
        }));

        console.log(departmentData);
        setDepartmentData(departmentData);

        //Gender
        const genderCounts = result.data.reduce((acc, employee) => {
          const gender = employee.gender;
          acc[gender] = (acc[gender] || 0) + 1;
          return acc;
        }, {});

        const genderData = Object.keys(genderCounts).map(gender => ({
          gender: gender,
          count: genderCounts[gender],
        }));

        console.log(genderData);
        setGenderData(genderData);

        //Salary
        const salaryCounts = result.data.reduce((acc, employee) => {
          const salary = employee.salary;
          acc[salary] = (acc[salary] || 0) + 1;
          return acc;
        }, {});

        const salaryData = Object.keys(salaryCounts).map(salary => ({
          salary: salary,
          count: salaryCounts[salary],
        }));

        console.log(salaryData);
        setSalaryData(salaryData);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <section className="md:pl-[300px] md:pr-[100px] pl-[250px] pr-[80px] ">
      <h1 className="md-[840px]:text-[40px] text-[30px] font-[600] leading-6">Dashboard</h1>
      <p className="md-[840px]:text-[18px] text-[16px] font-[400] leading-5 pt-[35px]">Explore a comprehensive overview of employee data with our intuitive dashboard, providing valuable insights at a glance.</p>
      <div className="flex justify-evenly gap-[30px] items-center md-[820px]:flex-row flex-col">
        <div>
          <div className="flex flex-col items-center w-[525px] opacity-1 rounded-lg  border-solid mt-[80px] shadow-2xl">
            <BarChart ageData={ageData} />
          </div>
          <div className="flex items-center mt-[50px] gap-[50px] p-[30px]">
            <div className="rounded-full opacity-1 shadow-2xl md-[840px]:w-[200px] md-[840px]:h-[120px] w-[180px] h-[100px] text-center flex flex-col items-center justify-evenly">
              <h4 className="md-[840px]:text-[18px] text-[16px] font-bold leading-4">Total Employees:</h4>
              <p className="md-[840px]:text-[25px] text-[20px] font-semibold mt-[20px]">{totalEmployees}</p>
            </div>
            <div className="rounded-full opacity-1 shadow-2xl md-[840px]:w-[200px] md-[840px]:h-[120px] w-[180px] h-[100px] text-center flex flex-col items-center justify-evenly">
              <h4 className="md-[840px]:text-[18px] text-[16px] font-bold leading-4">Average Salary:</h4>
              <p className="md-[840px]:text-[25px] text-[20px] font-semibold mt-[20px]">{averageSalary.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md-[840px]:h-[450px] h-[400px] md-[840]:w-[550px] w-[525px] opacity-1 rounded-lg  border-solid md-[840px]:mt-[80px] mt-[20px] shadow-2xl">
          <LineChart departmentData={departmentData} />
        </div>


      </div>

      <div className="flex justify-evenly items-center gap-[30px] md-[840px]:flex-row flex-col">
        <div className="flex flex-col justify-evenly items-center md-[840px]:h-[450px] h-[350px] md-[840]:w-[550px] w-[525px] opacity-1 rounded-lg  border-solid mt-[80px] shadow-2xl">
          <PieChart genderData={genderData} />
        </div>

        <div className="flex flex-col items-center md-[840px]:h-[450px] h-[350px] md-[840]:w-[550px] w-[525px] opacity-1 rounded-lg  border-solid mt-[80px] shadow-2xl">
          <BoxPlot salaryData={salaryData} />
        </div>


      </div>


    </section>
  );
};

export default OverviewDashboard;
