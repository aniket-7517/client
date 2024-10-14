import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../animation/AddEditTask.css"

function AddEditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: '', description: '', completed: false });
  const [error, setError] = useState(null);

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login page if not logged in
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTask = async () => {
      if (id) {
        const token = localStorage.getItem('token');
        try {
          const { data } = await axios.get(`https://server-1t1d.onrender.com/api/tasks/${id}`, {
            headers: { 'Authorization': token },
          });
          setTask(data.data);
        } catch (error) {
          setError('Failed to fetch task');
        }
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (id) {
        await axios.put(`https://server-1t1d.onrender.com/api/tasks/${id}`, task, {
          headers: { 'Authorization': token },
        });
        alert('Update successfully');
      } else {
        await axios.post('https://server-1t1d.onrender.com/api/tasks', task, {
          headers: { 'Authorization': token },
        });
        alert('Task added successfully');
      }
      navigate('/tasklist');
    } catch (error) {
      setError('Failed to save task');
    }
  };

  return (
    <div className="container col-sm-6" style={{ marginTop: "100px" }}>
      <h1 className="text-center mb-4" style={{ fontFamily: 'serif', textDecoration: "underline" }}>
        {id ? 'Edit Task' : 'Add Task'}
      </h1>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <div className='border shadow p-5 form-container'> {/* Added form-container class here */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Task Title</label>
            <input
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              placeholder="Enter task title"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Task Description</label>
            <textarea
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              placeholder="Enter task description"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => setTask({ ...task, completed: e.target.checked })}
              className="form-check-input"
              id="completedCheckbox"
            />
            <label className="form-check-label" htmlFor="completedCheckbox">Completed</label>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            {id ? 'Update' : 'Create'} Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditTask;
