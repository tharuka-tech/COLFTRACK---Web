import React, {  useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc, setDoc,deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import Sidebar from '../../component/Sidebar';


const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "customers"));
        const customerList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(customerList);
      } catch (error) {
        console.error("Error fetching customer data: ", error.message);
      }
    };

    fetchCustomers();
  }, []);

    const handleCancel = async (id, index) => {
      const confirm = window.confirm("Are you sure you want to cancel this account?");
      if (!confirm) return;

      try {
        const user = users[index]; // get customer data

        const rejectedData = {
          cusId: user.id,
          nic: user.nic,
          name: user.name,
          address: user.address,
          phoneNum: user.contact,
          loanType: user.loanType,
          profilepicture: user.customerPicture || "",
          status: "Rejected",
          createdAt: new Date(),
        };

        // Step 1: Add to rejCustomers collection
        await setDoc(doc(db, "rejCustomers", user.id), rejectedData);

        // Step 2: Delete from customers collection
        await deleteDoc(doc(db, "customers", user.id));

        // Step 3: Remove user from UI
        const updatedUsers = [...users];
        updatedUsers.splice(index, 1); // remove from UI list
        setUsers(updatedUsers);

        alert("Customer rejected and removed from active list.");
      } catch (err) {
        console.error("Failed to deactivate user:", err);
        alert("Something went wrong. Could not cancel.");
      }
    };

    const handleApprove = async (id, index) => {
      const confirm = window.confirm("Are you sure you want to approve this account?");
      if (!confirm) return;

      try {
        await updateDoc(doc(db, "customers", id), { status: "Approved" });
        const updatedUsers = [...users];
        updatedUsers[index].status = "Approved";
        setUsers(updatedUsers);
        console.log("User activated");
      } catch (err) {
        console.error("Failed to activate user:", err);
      }

  };


  const handlBlacklist = async (id,index) =>{
        confirm = window.confirm("Are you want to add blacklist ?")
        if(!confirm) return;

      }

  return (
    <div className="flex bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 px-8 py-10">
        <div className="overflow-x-auto">
          <h1 className="text-4xl text-green-500 mt-5 font-bold mb-10 text-center">
            Colf Lanka Customer Overview
          </h1>

          <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase text-center">Customer Name</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase text-center">NIC</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase text-center">Phone Number</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase text-center">Loan Type</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase text-center">Address</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase text-center">Assign Area</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase text-center">Created At</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase text-center">Status</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase text-center">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={user.customerPicture || ''}
                        alt="profile"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 capitalize text-center">{user.nic}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center">{user.contact}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 capitalize text-center">{user.loanType}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 capitalize text-center">{user.address}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 capitalize text-center">{user.area}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center">
                    {user.createdAt?.toDate().toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    }) || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 inline-flex text-xs font-semibold rounded-full ${user.status === 'Approved' ? 'bg-green-300 text-black capitalize p-1' : user.status === 'pending' ? 'bg-yellow-300 text-black capitalize p-1' : 'bg-red-300 text-black'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">

                    {user.status === "Approved" &&  
                      
                      <button
                        onClick={() => handlBlacklist(user.id, index)}
                        className="bg-red-500 text-black px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        Blacklist
                      </button>}
                    
                    
                    {user.status === "pending" && 
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => handleApprove(user.id, index)}
                          className="bg-green-500 text-black px-3 py-1 rounded-full text-xs font-semibold"
                        >
                          Approve
                        </button>
                        
                        <button
                          onClick={() => handleCancel(user.id, index)}
                          className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold mt-2"
                        >
                          Cancel
                        </button>
                      </div>
                    }
                    
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

export default function ManageCustomer() {
  return (
    <div>
      <UserTable />
    </div>
  );
}
