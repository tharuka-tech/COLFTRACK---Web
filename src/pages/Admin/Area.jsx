import React, { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

import { db } from '../../../firebase';
import Sidebar from '../../component/Sidebar';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [areaInputs, setAreaInputs] = useState({});

  useEffect(() => {
    const fetchEmployeesAndAreas = async () => {
      try {
        // Step 1: Get all riders
        const riderQuery = query(
          collection(db, 'employees'),
          where('role', '==', 'rider')
        );
        const riderSnapshot = await getDocs(riderQuery);
        const riders = riderSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Step 2: Get all areas
        const areaSnapshot = await getDocs(collection(db, 'areas'));
        const areaDocs = areaSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Step 3: For each rider, find which areas they're in
        const ridersWithAreas = riders.map((rider) => {
          const assignedAreas = areaDocs
            .filter((area) => area.userIds?.includes(rider.id))
            .map((area) => area.name);
          return { ...rider, area: assignedAreas };
        });

        setUsers(ridersWithAreas);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchEmployeesAndAreas();
  }, []);

  const assignAreaToRider = async (employeeId, newArea) => {
    if (!newArea) return alert('Please enter an area');
    const areaName = newArea.trim().toLowerCase();

    try {
      const areaRef = doc(db, 'areas', areaName);
      const areaSnap = await getDoc(areaRef);

      if (areaSnap.exists()) {
        const data = areaSnap.data();
        const userIds = data.userIds || [];

        if (!userIds.includes(employeeId)) {
          await updateDoc(areaRef, {
            userIds: arrayUnion(employeeId),
          });
        } else {
          alert('This rider is already assigned to this area.');
          return;
        }
      } else {
        await setDoc(areaRef, {
          name: areaName,
          userIds: [employeeId],
        });
      }

      setAreaInputs((prev) => ({ ...prev, [employeeId]: '' }));
      alert('Area assigned successfully.');

      // Re-fetch updated user list with areas
      const updatedRiderQuery = query(
        collection(db, 'employees'),
        where('role', '==', 'rider')
      );
      const updatedRiderSnapshot = await getDocs(updatedRiderQuery);
      const updatedRiders = updatedRiderSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const areaSnapshot = await getDocs(collection(db, 'areas'));
      const areaDocs = areaSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const updatedUsersWithAreas = updatedRiders.map((rider) => {
        const assignedAreas = areaDocs
          .filter((area) => area.userIds?.includes(rider.id))
          .map((area) => area.name);
        return { ...rider, area: assignedAreas };
      });

      setUsers(updatedUsersWithAreas);
    } catch (error) {
      console.error('Error assigning area:', error);
      alert('Failed to assign area.');
    }
  };

  const removeAreaFromRider = async (employeeId, areaName) => {
    const confirm = window.confirm(`Remove rider ${employeeId} from area "${areaName}"?`);
    if (!confirm) return;

    try {
      const areaRef = doc(db, 'areas', areaName.toLowerCase());
      await updateDoc(areaRef, {
        userIds: arrayRemove(employeeId),
      });

      alert('Rider removed from area successfully.');

      // Re-fetch updated users after removal
      const updatedRiderQuery = query(
        collection(db, 'employees'),
        where('role', '==', 'rider')
      );
      const updatedRiderSnapshot = await getDocs(updatedRiderQuery);
      const updatedRiders = updatedRiderSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const areaSnapshot = await getDocs(collection(db, 'areas'));
      const areaDocs = areaSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const updatedUsersWithAreas = updatedRiders.map((rider) => {
        const assignedAreas = areaDocs
          .filter((area) => area.userIds?.includes(rider.id))
          .map((area) => area.name);
        return { ...rider, area: assignedAreas };
      });

      setUsers(updatedUsersWithAreas);
    } catch (error) {
      console.error('Error removing rider from area:', error);
      alert('Failed to remove rider from area.');
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 px-8 py-10">
        <div className="overflow-x-auto">
          <h1 className="text-4xl text-green-500 mt-5 font-bold mb-10 text-center">
            Colf Lanka Rider Area Assign
          </h1>

          <table className="max-w-full w-fit mx-auto divide-y divide-gray-200 bg-white dark:bg-gray-800 shadow-lg rounded-4xl">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase text-center">
                  User
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                  User Role
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                  Current Areas
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={user.profilepicture || ''}
                        alt="profile"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500 capitalize text-center">
                    {user.role}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500 capitalize text-center">
                    {Array.isArray(user.area) && user.area.length > 0 ? (
                      <div className="flex flex-wrap justify-center gap-1">
                        {user.area.map((area, i) => (
                          <span
                            key={i}
                            className="bg-green-300 text-black text-xs font-semibold px-2 py-1 rounded-full flex items-center"
                          >
                            {area}
                            <button
                              className="ml-2 text-red-600 font-bold"
                              onClick={() => removeAreaFromRider(user.id, area)}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    ) : (
                      'Not Assigned Yet'
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <input
                      type="text"
                      placeholder="Enter area"
                      className="border border-gray-300 text-white px-2 py-1 rounded-md mb-1 w-42 bg-transparent"
                      value={areaInputs[user.id] || ''}
                      onChange={(e) =>
                        setAreaInputs({
                          ...areaInputs,
                          [user.id]: e.target.value,
                        })
                      }
                    />
                    <button
                      onClick={() =>
                        assignAreaToRider(user.id, areaInputs[user.id])
                      }
                      className="ml-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold h-8 w-28"
                    >
                      Assign Area
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

export default function AreaScreen() {
  return (
    <div>
      <UserTable />
    </div>
  );
}
