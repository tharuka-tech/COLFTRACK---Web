import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../../../firebase';
import Sidebar from '../../component/Sidebar';


const UserTable = () => {
  const [plans, setPlans] = useState([]);


  useEffect(() => {
    const fetchLoanPlan = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "loanPlan"));
        const employeeList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPlans(employeeList);
      } catch (error) {
        console.error("Error fetching employee data: ", error.message);
      }
    };

    fetchLoanPlan();
  }, []);


  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this loan plan?");
  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "loanPlan", id));
    setPlans(plans.filter((plans) => plans.id !== id));
    alert("Loan plan deleted successfully!");
  } catch (error) {
    console.error("Error deleting loan plan:", error.message);
    alert("Failed to delete the loan plan.");
  }
};


 

 

  return (
    <div className="flex bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 px-8 py-10">
        <div className="overflow-x-auto">
          <h1 className="text-4xl text-green-500 mt-5 font-bold mb-10 text-center">
            Colf Lanka Loan Management
          </h1>

          <table className="max-w-full w-fit mx-auto divide-y divide-gray-200 bg-white dark:bg-gray-800 shadow-lg rounded-4xl">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                  Loan Plan Name
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase text-center">
                  Interst Rate (%)
                </th>
                <th className="px-6 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase text-center">
                  Description
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200">
              {plans.map((plan) => (
                <tr key={plan.id}>
                  <td className="px-6 py-4 text-sm text-gray-500 capitalize text-center">
                    {plan.name}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500 capitalize text-center">
                    {plan.amount}
                  </td>

                   <td className="px-6 py-4 text-sm text-gray-500 capitalize text-center">
                    {plan.rate}
                  </td>
                   
                   <td className="px-6 py-4 text-sm text-gray-500 capitalize text-center">
                    {plan.description}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      className="ml-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold h-8 w-28"
                    >
                      Edit
                    </button>


                    <button
                      className="ml-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold h-8 w-28"
                      onClick={() => handleDelete(plan.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function ManageLoanScreen() {
  return (
    <div>
      <UserTable />
    </div>
  );
}
