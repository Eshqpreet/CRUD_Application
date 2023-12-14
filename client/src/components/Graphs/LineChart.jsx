import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler } from "chart.js";

ChartJS.register(
    LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler
)

const LineChart = ({ departmentData }) => {

    const data = {
        labels: departmentData.map(({ department }) => department),
        datasets: [
            {
                label: "Employee Count by Department",
                data: departmentData.map(({ count }) => count),
                backgroundColor: (context) => {
                    const bgColor = [
                        "#FED9ED",
                        "#E7BCDE",
                        "#BB9CC0"
                    ];
                    if (!context.chart.chartArea) {
                        return;
                    }
                    // console.log(context.chart.chartArea);
                    const { ctx, data, chartArea: { top, bottom } } = context.chart;
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                    const colorTranches = 1 / (bgColor.length - 1);
                    for (let i = 0; i < bgColor.length - 1; i++) {
                        gradientBg.addColorStop(0 + i * colorTranches, bgColor[i]);
                    }
                    return gradientBg;

                },
                borderColor: "#000",
                borderWidth: 2,
                fill: true,
                tension: 0.4
            },
        ],
    };

    const options = {
        plugins: {
            legend: true,
            beginAtZero: true
        },
        scales: {
            y: {
                min: 0
            }
        }
    }


    return (
        <div className="flex flex-col items-center justify-evenly">
            <h4 className="md-[840px]:text-[18px] text-[16px] font-bold leading-4  mt-[40px]" >LineChart of Departments:</h4>
            <Line
                data={data}
                options={options}
                className="w-[525px] h-[800px] m-[20px] leading-7"
            >

            </Line>
        </div>
    )
}

export default LineChart