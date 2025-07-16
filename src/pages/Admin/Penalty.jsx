import React, { useState } from 'react'
import Sidebar from '../../component/Sidebar'
import { Pencil, Check, X } from 'lucide-react';

export default function PenaltyScreen() {
  const [penaltyRate, setPenaltyRate] = useState(8);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(penaltyRate);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditValue(penaltyRate);
  };

  const handleSave = () => {
    if (editValue >= 0 && editValue <= 100) {
      setPenaltyRate(editValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 px-8 py-10">
        <div className="overflow-x-auto">
          <h1 className="text-4xl text-green-500 mt-5 font-bold mb-10 text-center">
            Colf Lanka Penalty Settings
          </h1>
        </div>

        <div className="flex justify-center items-center mt-20">
          <div className="relative w-60 h-60 group">
            {/* Edit Controls */}
            {isEditing ? (
              <div className="absolute -top-2 -right-2 z-10 flex gap-1 bg-gray-800 p-1 rounded-full shadow-lg">
                <button 
                  onClick={handleSave}
                  className="p-1 rounded-full bg-green-600 hover:bg-green-700 transition-colors"
                >
                  <Check size={16} className="text-white" />
                </button>
                <button 
                  onClick={handleCancel}
                  className="p-1 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditClick}
                className="absolute -top-2 -right-2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Pencil size={18} className="text-green-600" />
              </button>
            )}

            {/* Gradient Border Circle */}
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-green-400 via-emerald-500 to-green-700 p-[5px] animate-gradient-xy">
              {/* Inner circle */}
              <div className="w-full h-full rounded-full bg-gray-900 flex flex-col justify-center items-center">
                {isEditing ? (
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(Number(e.target.value))}
                      className="w-20 bg-transparent border-b-2 border-green-500 text-4xl font-extrabold text-center focus:outline-none"
                      min="0"
                      max="100"
                      autoFocus
                    />
                    <span className="text-4xl font-extrabold">%</span>
                  </div>
                ) : (
                  <span className="text-6xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    {penaltyRate}%
                  </span>
                )}
                <p className="text-gray-400 mt-2 text-sm">Current Penalty Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-gray-300 mb-4">
            This penalty rate will be applied to all overdue payments. Changes will affect new transactions only.
          </p>
        </div>
      </div>
    </div>
  )
}