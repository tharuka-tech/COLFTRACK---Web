import React, { useState } from 'react';
import Sidebar from '../../component/Sidebar';
import {db} from '../../../firebase';
import { setDoc, doc, collection } from "firebase/firestore";

export const AddLoan = () => {
  
  const [name,setName] = useState('');
  const [amount,setAmount] = useState('');
  const [rate,setRate] = useState('');
  const [description,setDescription] = useState('');




  const handleLoan = async  (e) => {
    e.preventDefault();
     const employeeData = {
            name,
            amount,
            rate,
            description,
            createdAt: new Date(),
          };
    
          await setDoc(doc(collection(db, "loanPlan")), employeeData);
    
          alert("Aded successful!");


          setName('');
          setAmount('');
          setRate('');
          setDescription('');
    
  }


  return (
    <div className="flex bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white min-h-screen">
      <Sidebar/>

      <div className="flex flex-col justify-center items-center w-full px-4 py-10">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-2xl ml-58">

          <h2 className="text-3xl font-bold text-center text-green-500 mb-6">
            Create New Loan Plan
          </h2>

          <form onSubmit={handleLoan} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Loan Plan Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount
                </label>
                <input
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  placeholder='Rs.'
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>




              <div>
                <label htmlFor="rate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Interest Rate
                </label>
                <input
                  id="rate"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder='%'
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

           <div>
            <label
              htmlFor="desc"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Enter a detailed description..."
            />

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300 mt-5 "
            >
              Add Plan
            </button>
          </div>
        </form>
      </div>
    </div> 
  </div>         
  )
}
