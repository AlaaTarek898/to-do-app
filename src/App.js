import { Fragment, useState } from "react";

function App() {
  const [items, setItem] = useState([]);

  const [filter, setFilter] = useState("All");
  let filteredItems;
  if (filter === "All") {
    filteredItems = items;
  }
  if (filter === "complete") {
    filteredItems = items.filter(
      (elem) => elem.status === true || elem.status === "true"
    );
    console.log(filteredItems);
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
  function handleDelete(e, clickedid) {
    const deleteOperation = items.filter((el) => clickedid !== el.id);
    setItem(deleteOperation);
  }

  return (
    <div className="container">
      <h1>TODO LIST</h1>
      <Form handleItemSubmit={handleItemSubmit} />
      <List
        items={items}
        handleToggle={handleToggle}
        filteredItems={filteredItems}
        handleDelete={handleDelete}
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
    console.log(newTask);
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

function List({ handleToggle, filteredItems, handleDelete }) {
  return (
    <Fragment>
      <div className="list">
        <ul>
          {filteredItems.map((task) => (
            <ListItem
              key={task.id}
              task={task}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </Fragment>
  );
}

function ListItem({ task, handleToggle, handleDelete }) {
  return (
    <Fragment>
      <li>
        <span className="item">
          <input
            type="checkbox"
            value={task.status}
            onChange={(id) => handleToggle(task.id)}
            checked={task.status ? "checked" : ""}
          />
          <span style={task.status ? { textDecoration: "line-through" } : {}}>
            {task.task}
          </span>
        </span>

        <button className="delete1" onClick={(e) => handleDelete(e, task.id)}>
          Delete
        </button>
      </li>
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
