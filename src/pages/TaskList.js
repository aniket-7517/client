import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TaskModal from './TaskModal'; 

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('https://server-1t1d.onrender.com/api/tasks', {
          headers: { 'Authorization': token },
        });
        setTasks(data.data);
      } catch (error) {
        setError('Failed to fetch tasks');
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://server-1t1d.onrender.com/api/tasks/${id}`, {
        headers: { 'Authorization': localStorage.getItem('token') },
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
      setError('Failed to delete task');
    }
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalOpen(false);
  };

  return (
    <div className="container mt-5">
  <h1 className="text-center mb-4" style={{ fontFamily: 'serif', textDecoration: "underline" }}>Task List</h1>
  <Link to="/add" className="btn btn-primary mb-3">
    Add Task
  </Link>
  {error && <div className="alert alert-danger text-center">{error}</div>}
  <div className="table-responsive">
    <table className="table table-striped table-bordered">
      <thead className="table-light">
        <tr>
          <th className="text-center col-4">Title</th>
          <th className="text-center col-4">Completed</th>
          <th className="text-center col-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <tr key={task._id}>
              <td className='ps-4'>{task.title}</td>
              <td className="text-center">{task.completed ? 'Yes' : 'No'}</td>
              <td className="text-center">
                <Link to={`/edit/${task._id}`} className="btn btn-success btn-sm me-2">Edit</Link>
                <button onClick={() => handleDelete(task._id)} className="btn btn-warning btn-sm me-2">Delete</button>
                <button onClick={() => openModal(task)} className="btn btn-primary btn-sm">View Details</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="text-center">No tasks found</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  <TaskModal isOpen={isModalOpen} onClose={closeModal} task={selectedTask} />
</div>

  );
};

export default TaskList;
