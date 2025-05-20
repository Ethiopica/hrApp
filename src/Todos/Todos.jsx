// Todos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoCard from './TodoCard';
import './Todos.css';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [statusFilter, setStatusFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [todosRes, usersRes] = await Promise.all([
          axios.get('https://jsonplaceholder.typicode.com/todos'),
          axios.get('https://jsonplaceholder.typicode.com/users'),
        ]);

        setTodos(todosRes.data);
        setUsers(usersRes.data);

        // Add a 1.5-second loading delay
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Something went wrong while fetching data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : 'Unknown';
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (statusFilter === 'completed') return todo.completed;
      if (statusFilter === 'not_completed') return !todo.completed;
      return true;
    })
    .filter((todo) => {
      if (userFilter === 'all') return true;
      return todo.userId === Number(userFilter);
    });

  if (loading) return <p>Loading todos...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="todo-container">
      <h2>Todo List</h2>

      {/* Filter Controls */}
      <div className="filters">
        <label>Filter by Status:</label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed ✅</option>
          <option value="not_completed">Not Completed ❌</option>
        </select>

        <label>Filter by User:</label>
        <select value={userFilter} onChange={(e) => setUserFilter(e.target.value)}>
          <option value="all">All Users</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {filteredTodos.slice(0, 20).map((todo) => (
          <TodoCard key={todo.id} todo={todo} userName={getUserName(todo.userId)} />
        ))}
      </ul>
    </div>
  );
};

export default Todos;
