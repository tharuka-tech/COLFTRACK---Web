import React from 'react'
import Navbar from '../component/Navbar'
import colfBg from "../assets/gradient.png";
import moneyBg from "../assets/money_girl2.png";
import Footer from '../component/footer';
import StaffPage from '../component/staff/StaffList';
import LoanPlans from '../component/loanplan/LoanPlanList';
import AboutUs from '../component/About';


export default function Home() {

  



  return (
    <main>
        
      <img className='absolute top-0 right-0 -z-10' src={colfBg} alt='colflankaBg'/>
      

      <Navbar/> 
    
      <section id="home" className="relative flex flex-col items-center justify-center h-[90vh] text-center px-4 overflow-hidden animate-slide-up delay-500 mt-32">
        <div className="absolute top-[15%] right-[-10%] w-[50rem] h-[30rem] bg-[#1DCD9F]/30 blur-[100px] rounded-full opacity-60 -z-10"></div>
        {/* Hero Text */}
        <h1 className="text-4xl md:text-5xl font-bold text-green-400  mb-4 drop-shadow-lg z-20 animate-fade-in ml-20">
          COLF Lanka Brings You COLFTRACK
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl z-20 animate-fade-in delay-200 ml-20">
          A Smart, Real-Time Loan Management System Made for Daily Repayments, Trusted by Thousands Across Sri Lanka.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-xl flex items-center bg-gray-200 shadow-lg rounded-full overflow-hidden border-2 border-[#1DCD9F] z-20 animate-slide-up delay-500 ml-20">
          <input
            type="text"
            placeholder="Search your balance,..."
            className="flex-1 px-6 py-3 focus:outline-none text-black placeholder:text-gray-500"
          />
          <button className="px-6 py-3 bg-[#1DCD9F] text-white font-semibold hover:bg-[#17b791] transition rounded-r-full">
            Search
          </button>
        </div>

        {/* Image with transparency */}
        <img
          src={moneyBg} // replace with your path
          alt="Loan Management Dashboard"
          className="absolute top-0 left-0 max-w-[500px] opacity-90"
        />
        
      </section>


        
      <div className="relative text-white z-10">
        <section id="aboutUs">
          <AboutUs />
        </section>


         <section id="loanplan">
          <LoanPlans />
        </section>

        <section id="staff">
          <StaffPage />
        </section>

       

        <section id="contact">
          <Footer />
        </section>
      </div>


   </main>
  )
}
