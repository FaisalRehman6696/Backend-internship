import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "../common-Input";
import Button from "../common-button";
import Label from "../common-Label";
import Card from "../common-Card";

const uncontrolled = () => {
  const ref = useRef();
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

    setinput({ name: "", domain: "", task: "" });
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
      <form onSubmit={Submit} className="flex w-5xl gap-2 ">
        <Input
          ref={ref}
          onChange={handleChange}
          name="name"
          value={input.name}
          type="name"
          placeholder="Name"
        />
        <Input
          onChange={handleChange}
          name="domain"
          value={input.domain}
          type="domin"
          placeholder="domain"
        />
        <Input
          onChange={handleChange}
          name="task"
          value={input.task}
          type="task"
          placeholder="task"
        />
        <Button type="submit">Submit</Button>
      </form>

      {Array.isArray(User) && User.length > 0 ? (
        User.map((item) => {
          const { id, name, domain, task } = item;

          return (
            <>
              <h1>Todo List</h1>

              <Card key={id}>
                <Label>Name: {name}</Label>
                <Label>Domain: {domain}</Label>
                <Label>Task: {task}</Label>
              </Card>
              <Button onClick={() => Edit(id)}>Edit</Button>
              <Button onClick={() => Delete(id)}>Delete</Button>
            </>
          );
        })
      ) : (
        <p>No data found</p>
      )}
    </>
  );
};

export default uncontrolled;
