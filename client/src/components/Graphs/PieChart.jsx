import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

import { Pie } from "react-chartjs-2"

ChartJS.register(
    ArcElement, Tooltip, Legend
)

const PieChart = ({ genderData }) => {

    const data = {
        labels: genderData.map(({ gender }) => gender),
        datasets: [
            {
                data: genderData.map(({ count }) => count),
                backgroundColor: [
                    '#BB9CC0',
                    '#E7BCDE',
                    '#FED9ED'
                ],
                borderWidth: 2,
                borderColor: "#000"
            }
        ]
    }

    const options = {

    }

    return (
        <div className="flex flex-col items-center justify-evenly">
            <h4 className="md-[840px]:text-[18px] text-[16px] font-bold leading-4 m-[8px] mb-[10px]" >PieChart of Employee's Gender:</h4>
            <Pie
                data={data}
                options={options}
            >

            </Pie>
        </div>
    )
}

export default PieChart