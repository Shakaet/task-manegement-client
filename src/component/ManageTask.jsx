import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const ManageTask = () => {

  let {user}= useContext(AuthContext)
  const [tasks, setTasks] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);

  // Fetch tasks from MongoDB
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`https://react-task-management-server-steel.vercel.app/alltask/${user?.email}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [user?.email]);

  // Handle Drag Start
  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleCategoryChange = async (id, newCategory) => {
    try {
      // Optimistically update the local state to immediately show the category change
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, category: newCategory } : task
        )
      );

      // Update the category in the database
      const updatedTask = { category: newCategory };
      const response = await axios.patch(
        `https://react-task-management-server-steel.vercel.app/tasks/${id}`,
        updatedTask
      );
  
      if (response.status === 200) {
        // Optionally, confirm or handle response here if needed
      }
    } catch (error) {
      console.error("Error updating task category:", error);
      // Rollback in case of error
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, category: task.category } : task
        )
      );
    }
  };

 

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`https://react-task-management-server-steel.vercel.app/tasks/${id}`);
      setTasks((tasks) => tasks.filter((task) => task._id !== id));

      Swal.fire("Deleted!", "Your task has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting task:", error);
      Swal.fire("Error!", "Failed to delete the task.", "error");
    }
  }
};


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Manage Tasks</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">Timestamp</th>
              <th className="p-3">Category</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {tasks.map((task) => (
              <tr
                key={task._id}
                draggable
                onDragStart={() => handleDragStart(task)}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3">{task.title}</td>
                <td className="p-3">{task.description || "N/A"}</td>
                <td className="p-3">{new Date(task.timestamp).toLocaleString()}</td>
                <td className="p-3 font-semibold">
                  {/* Category Dropdown */}
                  <select
                    value={task.category}
                    onChange={(e) =>
                      handleCategoryChange(task._id, e.target.value)
                    }
                    className="bg-blue-100 p-2 rounded-md"
                  >
                    <option value="To-Do">To-Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </td>
                <td className="p-3 flex space-x-2">
                  <Link to={`/edittask/${task._id}`} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Edit</Link>
                  <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTask;
