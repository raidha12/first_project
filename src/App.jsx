import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  const addTask = () => {
    if (editId !== null) {
      const updated = data.map((t) =>
        t.id === editId ? { ...t, name: task } : t);
      setData(updated);
      setEditId(null);
    } else {
      setData([...data, { id: Date.now(), name: task }]);
    }
    setTask("");
  };

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const deleteTask = (id) => {
    const filtered = data.filter((t) => t.id !== id);
    setData(filtered);
  };

  const editTask = (id) => {
    const toEdit = data.find((t) => t.id === id);

    if (toEdit) {
      setTask(toEdit.name);
      setEditId(id);
    }
  }

  return (
    <div className="app">
      <h2>To-Do List</h2>
      <div className="input-wrapper">
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>{editId ? "Update" : "Add"}</button>
      </div>

      <ul>
        {data.map((t) => (
          <li key={t.id}>
            {t.name}
            <div className="manage-btns">
              <button onClick={() => editTask(t.id)}>Edit</button>
              <button onClick={() => deleteTask(t.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
