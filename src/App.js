import { Fragment, useState } from "react";

function App() {
  const [items, setItem] = useState([]);

  const [filter, setFilter] = useState("All");
  let filteredItems;
  if (filter === "All") {
    filteredItems = items;
  }
  if (filter === "complete") {
    filteredItems = items.filter((elem) => elem.status === true);
  }
  if (filter === "incomplete") {
    filteredItems = items.filter((elem) => elem.status === false);
  }

  function handleItemSubmit(item) {
    setItem((items) => [...items, item]);
    console.log(items);
  }

  const handleToggle = (id) => {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };
  function handleClear() {
    setItem([]);
  }

  return (
    <div className="container">
      <h1>TODO LIST</h1>
      <Form handleItemSubmit={handleItemSubmit} />
      <List
        items={items}
        handleToggle={handleToggle}
        filteredItems={filteredItems}
      />
      <Fileration
        filter={filter}
        setFilter={setFilter}
        handleClear={handleClear}
      />
    </div>
  );
}

export default App;

function Form({ handleItemSubmit }) {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState(false);
  function handlesubmit(e) {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      task,
      status,
    };
    handleItemSubmit(newTask);
    setTask("");
    setStatus(false);
  }
  return (
    <form onSubmit={handlesubmit}>
      <label> Task </label>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <label>Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value={true}>Complete</option>
        <option value={false}>Incomplete</option>
      </select>
      <button>Add Task</button>
    </form>
  );
}

function List({ handleToggle, filteredItems }) {
  return (
    <Fragment>
      <div className="list">
        <ul>
          {filteredItems.map((task) => (
            <ListItem key={task.id} task={task} handleToggle={handleToggle} />
          ))}
        </ul>
      </div>
    </Fragment>
  );
}
function Fileration({ filter, setFilter, handleClear }) {
  return (
    <Fragment>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="complete">completed</option>
        <option value="incomplete">incomplete</option>
        <option value="All">All</option>
      </select>
      <button className="button" onClick={handleClear}>
        Clear
      </button>
    </Fragment>
  );
}

function ListItem({ task, handleToggle }) {
  return (
    <Fragment>
      <li>
        <input
          type="checkbox"
          value={task.status}
          onChange={(id) => handleToggle(task.id)}
          checked={task.status ? "checked" : ""}
        />
        <span style={task.status ? { textDecoration: "line-through" } : {}}>
          {task.task}
        </span>
      </li>
    </Fragment>
  );
}
