// src/components/Todos.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
        setLoading(false);
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
      return todo.userId === parseInt(userFilter);
    });

  if (loading) return <p>Loading todos...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h2>Todo List</h2>

      {/* Filter Controls */}
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Status:&nbsp;
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed ✅</option>
            <option value="not_completed">Not Completed ❌</option>
          </select>
        </label>

        &nbsp;&nbsp;

        <label>
          User:&nbsp;
          <select value={userFilter} onChange={(e) => setUserFilter(e.target.value)}>
            <option value="all">All Users</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Todo List */}
      <ul>
        {filteredTodos.slice(0, 20).map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong> — by {getUserName(todo.userId)}{' '}
            {todo.completed ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
