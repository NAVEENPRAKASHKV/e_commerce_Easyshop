import React from "react";

const Profile = ({
  userDetails,
  isEditing,
  handleInputChange,
  saveChanges,
  toggleEdit,
}) => {
  return (
    <div className="w-full">
      <div className="w-full max-w-4xl bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Profile Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center md:col-span-1">
            <img
              src=""
              alt=""
              className="w-32 h-32 bg-zinc-200 object-cover rounded-full mb-4"
            />
            <label
              htmlFor="profilePic"
              className="block font-medium text-gray-700"
            >
              change Profile pic
            </label>
            <input
              type="file"
              name="profilePic"
              id="profilePic"
              disabled={!isEditing}
              className={`hidden mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isEditing ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          {/* User Details */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex w-full gap-4">
              <div className="w-full">
                <label className="block  font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={userDetails?.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
              <div className="w-full">
                <label className="block w-full font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={userDetails?.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
            </div>
            <div className="flex w-full gap-4">
              <div className="w-full">
                <label className="block font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userDetails?.email}
                  disabled={true}
                  className={`mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>

              <div className="w-full">
                <label className="block font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phone"
                  value={userDetails?.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          {isEditing ? (
            <>
              <button
                onClick={saveChanges}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={toggleEdit}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={toggleEdit}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
