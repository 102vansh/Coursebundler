import React, { useState, useEffect } from 'react';
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

const getLastTwelveMonths = () => {
    const labels = [];
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const currentMonth = new Date().getMonth();
    
    // Get last 12 months in order (starting from 11 months ago)
    for (let i = 11; i >= 0; i--) {
        const monthIndex = (currentMonth - i + 12) % 12; // Handle wrapping around to previous year
        labels.push(months[monthIndex]);
    }
    
    return labels;
};

const LineChart = ({ views = [] }) => {
    console.log("Views data received:", views); // Debugging
    const monthLabels = getLastTwelveMonths();
    
    // Ensure we have data for all 12 months (fill with 0 if missing)
    const viewData = Array(12).fill(0);
    
    // If views data is provided, use it
    if (views && views.length) {
        // Use the minimum between available data and 12 months
        const dataPoints = Math.min(views.length, 12);
        // Fill from the right (most recent months)
        for (let i = 0; i < dataPoints; i++) {
            viewData[12 - dataPoints + i] = views[i];
        }
    }
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Views for Last 12 Months',
            },
        },
    };
    
    const data = {
        labels: monthLabels,
        datasets: [
            {
                label: 'Views',
                data: viewData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.3, // Add some curve to the line
            },
        ],
    };
    
    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Line options={options} data={data} />
        </div>
    );
};

const DoughnutChart = ({ users = [0, 0] }) => {
    console.log("Users data received:", users); // Debugging
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'User Subscription Distribution',
            },
        },
    };
    
    const data = {
        labels: ['Subscribed', 'Not Subscribed'],
        datasets: [
            {
                label: 'Users',
                data: users,
                backgroundColor: [
                    'rgba(255, 193, 7, 0.8)',  // Yellow for subscribed
                    'rgba(158, 158, 158, 0.8)' // Gray for not subscribed
                ],
                borderColor: [
                    'rgba(255, 193, 7, 1)',
                    'rgba(158, 158, 158, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };
    
    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Doughnut options={options} data={data} />
        </div>
    );
};

export { LineChart, DoughnutChart };
