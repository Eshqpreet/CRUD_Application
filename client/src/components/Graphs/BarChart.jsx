import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(
    BarElement, CategoryScale, LinearScale, Tooltip, Legend
)

const BarChart = ({ ageData }) => {
    const data = {
        labels: ageData.map(({ age }) => age),
        datasets: [
            {
                label: "Employee Ages",
                data: ageData.map(({ count }) => count),
                backgroundColor: [
                    '#BB9CC0',
                    '#E7BCDE',
                    '#FED9ED'
                ],
                borderColor: "#000",
                borderWidth: 2,
                fontWeight: "bold",
                textColor: "#000"
            },
        ],
    };

    const options = {
    };

    return (
        <div className="flex flex-col items-center justify-evenly">
            <h4 className="md-[840px]:text-[18px] text-[16px] font-bold leading-4 m-[10px] mb-[20px]" >BarChat of Employee's Ages:</h4>
            <Bar
                data={data}
                options={options}
                className="w-[500px] m-[10px] "
            >
            </Bar>
        </div>
    );
};

export default BarChart;
