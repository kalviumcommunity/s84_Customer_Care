import React, { useState, useEffect } from "react";
import axios from "axios";
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    age: "",
  });
  const [password, setPassword] = useState("");
  const [actionType, setActionType] = useState(null); // 'edit' or 'delete'
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      // Update to the correct endpoint to fetch all users
      const response = await axios.get("http://localhost:8000/users/all");
      console.log("Users API Response:", response.data);
  
      // Check if the response is an array or contains user data in some other way
      if (Array.isArray(response.data)) {
        setUsers(response.data); // If it's an array, set users
      } else if (response.data.users && Array.isArray(response.data.users)) {
        setUsers(response.data.users); // If 'users' is an array, set users
      } else {
        setError("No users found in the response.");
        setUsers([]); // Set users to an empty array if the response is invalid
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users.");
      setUsers([]); // Set users to an empty array in case of error
    }
  };
  

  // Effect to fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle edit button click
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      age: user.age,
    });
  };

  // Handle user update
  const handleUpdate = async (user) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/users/${user._id}`,
        formData
      );
      console.log("User updated:", response.data);
      fetchUsers(); // Refresh user list
      setEditingUser(null); // Close the edit modal
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user.");
    }
  };

  // Handle password verification and proceed with action
  const verifyPasswordAndProceed = () => {
    if (password === "correct-password") { // Replace with actual verification
      if (actionType === "edit") {
        handleUpdate(editingUser);
      } else if (actionType === "delete") {
        handleDelete(editingUser._id);
      }
    } else {
      setError("Incorrect password.");
    }
  };

  // Handle delete button click
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/users/${userId}`);
      console.log("User deleted:", userId);
      fetchUsers(); // Refresh user list after deletion
      setShowPasswordModal(false); // Close the modal
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user.");
    }
  };

  // Show password verification modal for delete/edit
  const showPasswordVerification = (userId, type) => {
    setActionType(type); // 'edit' or 'delete'
    setEditingUser(users.find((user) => user._id === userId));
    setShowPasswordModal(true);
  };

  return (
    <div className="user-management-container">
      <div className="user-management-header">
        <h1>User Management</h1>
        <p>Manage and monitor user accounts</p>
      </div>

      {error && <div className="error-message">{error}</div>} {/* Display error message */}

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(users || []).map((user) => (
            <tr key={user._id}>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.age}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => showPasswordVerification(user._id, "delete")}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Password Verification Modal */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-header">
              {actionType === "edit" ? "Edit User" : "Delete User"}
            </h3>
            <p>Please enter your password to confirm this action:</p>
            <input
              type="password"
              className="modal-input"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
            {error && <div className="error-message">{error}</div>}
            <div className="modal-buttons">
              <button
                className="modal-button cancel-button"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
              <button
                className="modal-button confirm-button"
                onClick={verifyPasswordAndProceed}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-header">Edit User</h3>
            <input
              type="text"
              name="firstName"
              className="modal-input"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              className="modal-input"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <input
              type="email"
              name="email"
              className="modal-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="username"
              className="modal-input"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
            <input
              type="number"
              name="age"
              className="modal-input"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
            />
            <div className="modal-buttons">
              <button
                className="modal-button cancel-button"
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </button>
              <button
                className="modal-button confirm-button"
                onClick={() => handleUpdate(editingUser)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
