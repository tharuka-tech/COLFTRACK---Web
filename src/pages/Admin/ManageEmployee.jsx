import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import Sidebar from '../../component/Sidebar';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "employees"));
        const employeeList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(employeeList);
      } catch (error) {
        console.error("Error fetching employee data: ", error.message);
      }
    };

    fetchEmployees();
  }, []);

  const handleDeactivate = async (id, index) => {
    const confirm = window.confirm("Are you sure you want to deactivate this account?");
    if (!confirm) return;

    try {
      await updateDoc(doc(db, "employees", id), { status: "Inactive" });
      const updatedUsers = [...users];
      updatedUsers[index].status = "Inactive";
      setUsers(updatedUsers);
      console.log("User deactivated");
    } catch (err) {
      console.error("Failed to deactivate user:", err);
    }
  };

  const handleActivate = async (id, index) => {
    const confirm = window.confirm("Are you sure you want to activate this account?");
    if (!confirm) return;

    try {
      await updateDoc(doc(db, "employees", id), { status: "Active" });
      const updatedUsers = [...users];
      updatedUsers[index].status = "Active";
      setUsers(updatedUsers);
      console.log("User activated");
    } catch (err) {
      console.error("Failed to activate user:", err);
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 px-8 py-10">
        <div className="overflow-x-auto">
          <h1 className='text-4xl text-green-500 mt-5 font-bold mb-10 text-center'>Colf Lanka Workforce Overview</h1>

          <table className="max-w-full w-fit mx-auto divide-y divide-gray-200 bg-white dark:bg-gray-800 shadow-lg rounded-4xl">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3  text-xs font-bold text-gray-600 dark:text-gray-300 uppercase text-center">User</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">User Role</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Last Login</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full object-cover" src={user.profilepicture || ''} alt="profile" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">{user.firstName} {user.lastName}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize text-center">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap justify-center">
                    <span className={`px-3 inline-flex text-xs font-semibold rounded-full  ${user.status === 'Active' ? 'bg-green-300 text-black' : 'bg-red-300 text-black'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{user.lastLogin? user.lastLogin : "Not Logged in Yet"}</td>
                 
                 
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.status === 'Active' && (
                      <button
                        onClick={() => handleDeactivate(user.id, index)}
                        className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold h-8 w-28"
                      >
                        Deactivate
                      </button>
                    )}
                    {user.status === 'Inactive' && (
                      <button
                        onClick={() => handleActivate(user.id, index)}
                        className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold h-8 w-28"
                      >
                        Activate
                      </button>
                    )}
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

export default function ManageEmployee() {
  return (
    <div>
      <UserTable />
    </div>
  );
}
