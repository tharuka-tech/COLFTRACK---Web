import { ChartNoAxesCombined } from "lucide-react";
import React from 'react';

export default function LoanPlanCard({ name, amount, duration, interest, description }) {
  return (
    <div className="w-72 h-auto bg-black border-2 rounded-lg border-[#1DCD9F] p-5 m-4
  shadow-[0_0_2px_#A0FFE5,inset_0_0_2px_#A0FFE5,0_0_5px_#1DCD9F,0_0_15px_#1DCD9F,0_0_30px_#1DCD9F]
  flex flex-col items-center text-center space-y-3 hover:scale-105 transition">


        <ChartNoAxesCombined className="w-10 h-10 text-sky-200 mb-2" />
      
      <h2 className="text-xl font-bold text-[#1DCD9F] ">{name}</h2>
      <p><span className="font-semibold">Loan Amount:</span> Rs. {amount}</p>
      <p><span className="font-semibold">Duration:</span> {duration}</p>
      <p><span className="font-semibold">Interest Rate:</span> {interest}</p>
      
      <p className="text-sm text-sky-100 mt-2">{description}</p>
    </div>
  );
}
