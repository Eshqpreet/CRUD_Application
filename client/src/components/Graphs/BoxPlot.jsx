import { useLayoutEffect } from 'react';
import { BoxPlotChart } from '@sgratzl/chartjs-chart-boxplot';

const BoxPlot = ({ salaryData }) => {
  useLayoutEffect(() => {
    const salaries = salaryData.map((employee) => parseFloat(employee.salary));

    const min = Math.min(...salaries);
    const lowerQuartile = calculatePercentile(salaries, 25);
    const median = calculatePercentile(salaries, 50);
    const mean = calculateMean(salaries);
    const upperQuartile = calculatePercentile(salaries, 75);
    const max = Math.max(...salaries);

    console.log(min, lowerQuartile, median, mean, upperQuartile, max);

    const data = {
      labels: ['Salary'],
      datasets: [
        {
          label: 'Salary Distribution',
          data: [[min, lowerQuartile, median, upperQuartile, max]],
          backgroundColor: ['#E7BCDE'],
          outlierColor: '#FFC0D9',
          padding: 0,
          itemRadius: 0,
          borderColor: '#000',
          borderWidth: 2,
        },
      ],
    };

    const config = {
      type: 'boxplot',
      data: data,
      options: {
        responsive: true,
        legend: {
          display: false,
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const canvas = document.getElementById('boxplotChart');
    const existingChart = canvas.chart; // Get the existing chart instance

    // Destroy the existing chart if it exists
    if (existingChart) {
      existingChart.destroy();
    }

    // Create a new chart
    const newChart = new BoxPlotChart(canvas.getContext('2d'), config);

    // Attach the new chart instance to the canvas
    canvas.chart = newChart;

    // Clean up function
    return () => {
      // Ensure the chart is destroyed when the component unmounts
      if (newChart) {
        newChart.destroy();
      }
    };
  }, [salaryData]);

  function calculatePercentile(data, percentile) {
    const index = (percentile / 100) * (data.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const fraction = index - lower;
    return (data[lower] * (1 - fraction)) + (data[upper] * fraction);
  }

  function calculateMean(data) {
    const sum = data.reduce((acc, value) => acc + value, 0);
    return sum / data.length;
  }

  return (
    <div className='flex flex-col items-center justify-evenly w-[500px] mt-[40px]'>
      <h4 className="md-[840px]:text-[18px] text-[16px] font-bold leading-4 m-[8px] mb-[30px]" >BoxPlot of Employee's Salaries:</h4>
      <canvas id="boxplotChart"></canvas>
    </div>
  );
};

export default BoxPlot;
