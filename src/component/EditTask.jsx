import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const EditTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the existing task data
  useEffect(() => {
    axios
      .get(`http://localhost:3000/task/${id}`)
      .then((response) => setTask(response.data))
      .catch((error) => console.error("Error fetching task:", error));
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/task/${id}`, task);
      Swal.fire("Success!", "Task updated successfully.", "success");
      navigate("/managetask"); 
    } catch (error) {
      console.error("Error updating task:", error);
      Swal.fire("Error!", "Failed to update task.", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit This Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium">Title *</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              maxLength="50"
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              maxLength="200"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description (optional)"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium">Category</label>
            <select
              name="category"
              value={task.category}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          {/* Update Task Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};
