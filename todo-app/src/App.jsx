import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [input, setinput] = useState({
    id: uuidv4(),
    name: "",
    domain: "",
    task: "",
  });
  const [User, setUser] = useState([]);

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("User")) || [];
    setUser(getData);
  }, []);

  const Submit = (e) => {
    e.preventDefault();

    let updateTodo;
    if (edit) {
      updateTodo = [...User.filter((u) => u.id !== input.id), input];
      setedit(false);
    } else {
      const newUser = { ...input, id: uuidv4() };
      updateTodo = [...User, newUser];
    }
    setUser(updateTodo);
    localStorage.setItem("User", JSON.stringify(updateTodo));

    window.location.reload();
  };

  const handleChange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const Delete = (id) => {
    const remove = User.filter((u) => u.id !== id);
    setUser(remove);
    localStorage.setItem("User", JSON.stringify(remove));
  };

  const Edit = (id) => {
    const data = User.find((u) => u.id === id);
    setinput(data);
    setedit(true);
  };
  const [edit, setedit] = useState(false);

  return (
    <>
      <h1>Todo App</h1>
      <form onSubmit={Submit}>
        <input
          onChange={handleChange}
          name="name"
          value={input.name}
          type="name"
          placeholder="Name"
          required
        />
        <input
          onChange={handleChange}
          name="domain"
          value={input.domain}
          type="domin"
          placeholder="domain"
          required
        />
        <input
          onChange={handleChange}
          name="task"
          value={input.task}
          type="task"
          placeholder="task"
          required
        />

        <button type="submit">submit</button>
      </form>

      <div className="showdata">
        <h2>Todo List Show Data</h2>
        {Array.isArray(User) && User.length > 0 ? (
          User.map((item) => {
            const { id, name, domain, task } = item;

            // console.log(item);
            return (
              <>
                <h1>List</h1>
                <div key={id}>
                  <p>Name:{name} </p>
                  <p>Domain:{domain} </p>
                  <p>Task:{task}</p>
                  <button onClick={() => Delete(id)}>Delete</button>
                  <button onClick={() => Edit(id)}>Edit</button>
                </div>
              </>
            );
          })
        ) : (
          <p>No data found</p>
        )}
      </div>
    </>
  );
};

export default App;
