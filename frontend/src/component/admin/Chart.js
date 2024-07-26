
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    PointElement,
    LineElement,
    ArcElement,
    Legend,
    Title
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement
);

const gatlastmonth = () => {
    const labels = [];
    const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const currentMonth = new Date().getMonth();
    const remain = 11 - currentMonth;
    for (let i = currentMonth; i >= 0; i--) {
        const element = month[i];
        labels.unshift(element);
    }
    for (let i = 11; i > remain; i--) {
        const element = month[i];
        labels.push(element);
    }
    return labels;
};

const LineChart = () => {
    const labels = gatlastmonth();
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Yearly Views',
            },
        },
    };
    const data = {
        labels,
        datasets: [
            {
                label: 'Views',
                data: [12, 19, 8, 5],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Line options={options} data={data} />
        </div>
    );
};

const DoughnutChart = ({users=[]}) => {
    const data = {
        labels: ["Subscribe", "Unsubscribe"],
        datasets: [
            {
                label: 'Views',
                data: users,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Doughnut options={{ maintainAspectRatio: false }} data={data} />
        </div>
    );
};

export { LineChart, DoughnutChart };
