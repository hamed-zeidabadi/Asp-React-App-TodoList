/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import "./App.css";
import { useState, useEffect } from "react";
import AddItem from "./components/AddItem";
import TodoItem from "./components/TodoItem";

interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
}
const App = () => {
  const [items, setItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:5287/api/Todo");
      const todos = await response.json();
      setItems(todos);
      console.log("get todo :", todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const onDelete = async (item: TodoItem) => {
    try {
      await fetch(`http://localhost:5287/api/Todo/${item.id}`, {
        method: "DELETE",
      });

      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const onAdd = async (newTaskName: string) => {
    try {
      await fetch("http://localhost:5287/api/Todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTaskName, isCompleted: false }),
      });
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const onSave = async (oldItem: TodoItem, newName: string) => {
    try {
      await fetch(`http://localhost:5287/api/Todo/${oldItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...oldItem, title: newName }),
      });
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const toggleComplete = async (clickedItem: TodoItem) => {
    try {
      await fetch(`http://localhost:5287/api/Todo${clickedItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...clickedItem,
          isCompleted: !clickedItem.isCompleted,
        }),
      });
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div>
      <h1 className="header"> لیست کارهای روزانه </h1>
      <AddItem onAdd={onAdd} items={items} />
      <ul className="todo-list">
        {items.map((item, index) => (
          <TodoItem
            key={index}
            item={item}
            onDelete={onDelete}
            onSave={onSave}
            toggleComplete={toggleComplete}
          />
        ))}
      </ul>
    </div>
  );

  //   async function populateWeatherData() {
  //     const response = await fetch("weatherforecast");
  //     const data = await response.json();
  //     console.log(data);
  //   }
  //   populateWeatherData();
};

export default App;
