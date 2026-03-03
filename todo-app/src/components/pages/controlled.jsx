import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import Input from "./components/common-Input";
import Button from "./components/common-button";
import Card from "./components/common-Card";
import Label from "./components/common-Label";
const controlled = () => {
  const nameRef = useRef();
  const domainRef = useRef();
  const taskRef = useRef();

  const Submit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: uuidv4(),
      name: nameRef.current.value,
      domain: domainRef.current.value,
      task: taskRef.current.value,
    };

    const todo = JSON.parse(localStorage.getItem("user")) || [];
    todo.push(newTodo);
    localStorage.setItem("user", JSON.stringify(todo));
  };
  const [todos, settodos] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    settodos(data);
  }, []);
  const Delete = (id) => {
    console.log({ id });
    const remove = todos.filter((todo) => todo.id !== id);
    settodos(remove);
    localStorage.setItem("user", JSON.stringify(remove));
  };
  return (
    <>
      <h1>Todo App</h1>
      <form onSubmit={Submit} className="flex w-5xl gap-2 ">
        <Input ref={nameRef} name="name" type="name" placeholder="Name" />
        <Input
          ref={domainRef}
          name="domain"
          type="domin"
          placeholder="domain"
        />
        <Input ref={taskRef} name="task" type="task" placeholder="task" />
        <Button disabled={false} onClick={Submit} title={"Submit"} />
      </form>

      {Array.isArray(todos) && todos.length > 0 ? (
        todos.map((item) => {
          const { id, name, domain, task } = item;

          return (
            <>
              <h1>Todo List</h1>

              <Card>
                <Label>Name: {name}</Label>
                <Label>Domain: {domain}</Label>
                <Label>Task: {task}</Label>
              </Card>
              <Button disabled={true} onClick={() => Edit()} title={"Edit"} />

              <Button
                disabled={false}
                title={"Delete"}
                onClick={() => Delete(id)}
              />
            </>
          );
        })
      ) : (
        <p>No data found</p>
      )}
    </>
  );
};

export default controlled;
