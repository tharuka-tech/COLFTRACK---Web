import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {
  const navigate = useNavigate();

  // 🔐 Auto logout on browser back
  useEffect(() => {
    const handleBack = () => {
      signOut(auth).then(() => {
        navigate('/login', { replace: true });
      });
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handleBack);

    return () => {
      window.removeEventListener('popstate', handleBack);
    };
  }, [navigate]);

  const loanOfficers = 45;
  const riders = 75;
  const loanPlans = 25;
  const penaltyPercent = 15;
  const blacklisted = 12;
  const disabledLoanOfficers = 5;
  const disabledRiders = 3;
  const totalUsers = loanOfficers + riders;

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Monthly Income (LKR)',
        data: [250000, 320000, 410000, 370000],
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
        borderRadius: 10,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => `Rs. ${value.toLocaleString()}`,
        },
      },
    },
    plugins: {
      legend: {
        labels: { color: '#ccc' },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let value = context.raw;
            return `Rs. ${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="w-64 bg-gray-900 min-h-screen">
        <Sidebar />
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-4xl font-bold mb-8 mt-4 text-center text-green-400">
          Welcome to Admin Dashboard
        </h1>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Active Users */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-300 mb-2">Active Users</h2>
            <p className="text-4xl font-bold text-blue-400 mb-4">{totalUsers}</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
              <div className="bg-blue-950 rounded-xl p-3 text-center">
                <p>Loan Officers</p>
                <p className="text-xl font-bold text-blue-300">{loanOfficers}</p>
              </div>
              <div className="bg-purple-950 rounded-xl p-3 text-center">
                <p>Riders</p>
                <p className="text-xl font-bold text-purple-300">{riders}</p>
              </div>
            </div>
          </div>

          {/* Loan & Penalty */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-300 mb-2">Loan & Penalty</h2>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
              <div className="bg-green-950 rounded-xl p-3 text-center">
                <p>Loan Plans</p>
                <p className="text-xl font-bold text-green-300">{loanPlans}</p>
              </div>
              <div className="bg-yellow-900 rounded-xl p-3 text-center">
                <p>Penalty %</p>
                <p className="text-xl font-bold text-yellow-300">{penaltyPercent}%</p>
              </div>
            </div>
          </div>

          {/* Blacklist Customers */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-300 mb-2">Blacklist Customers</h2>
            <p className="text-4xl font-bold text-red-400 text-center">{blacklisted}</p>
          </div>

          {/* Disabled Employees */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-300 mb-2">Disabled Accounts</h2>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
              <div className="bg-gray-900 rounded-xl p-3 text-center">
                <p>Loan Officers</p>
                <p className="text-xl font-bold text-gray-300">{disabledLoanOfficers}</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-3 text-center">
                <p>Riders</p>
                <p className="text-xl font-bold text-gray-300">{disabledRiders}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Income Chart */}
        <div className="bg-white/10 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-200">Monthly Income</h3>
          <div className="w-full max-w-3xl mx-auto">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
