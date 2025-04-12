import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { MdDeleteSweep } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinihsed] = useState(true)
  useEffect(() => {
    let toStringify = localStorage.getItem("todos");
    if (toStringify) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const SaveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setshowFinihsed(!showFinished);
  }


  const handelAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    SaveToLs();
  };
  const handelDelete = (e, id) => {
    let confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    SaveToLs();
  };

  const handelDeleteAll = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all todos?"
    );
    if (!confirmDelete) return;

    setTodos([]);
    localStorage.removeItem("todos");
  };

  const handelEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    SaveToLs();
  };
  const handelChange = (e) => {
    setTodo(e.target.value);
  };
  const handelCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    SaveToLs();
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:conatiner bg-purple-100 p-6 rounded-lg transition-colors md:w-1/2 md:mx-auto mt-6">
      <h1 className="text-center font-bold bg-violet-600 rounded-xl py-2 text-white">TodoBhai - "List Bana, Kaam Khatam Kar, Bindass Reh!"</h1>
        <div className="addTodo my-5 ">
          <h2 className="text-lg font-bold text-violet-700">Add a Todo</h2>
          <input
            value={todo}
            onChange={handelChange}
            type="text"
            className="border border-gray-300 rounded px-2 py-1 my-3 w-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={handelAdd} disabled={todo.length<3}
            className="bg-purple-600 disabled:bg-purple-400 text-white px-3 py-1 mx-5 rounded hover:bg-purple-900 cursor-pointer"
          >
            <BiSave />
          </button>
          <button
            onClick={handelDeleteAll}
            className="bg-red-600 text-white px-3 py-1 mx-2 rounded hover:bg-red-700 whitespace-nowrap cursor-pointer"
          >
            <MdDeleteSweep />
          </button>
        </div>
        <input className="my-4" onChange={toggleFinished} type="checkbox" checked = {showFinished} /> Show Finished
        <h2 className="text-lg font-semibold mt-4">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="my-3">No Todos Added</div>}
          {todos.map((item) => {
            return ( (showFinished || !item.isCompleted) &&
              <div
                key={item.id}
                className="todo flex my-3 md:w-1/2 justify-between"
              >
                <div className="flex gap-5 items-center">
                  <input
                    name={item.id}
                    onChange={handelCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {" "}
                    {item.todo}
                  </div>
                </div>
                <div className="buttons ml-4 flex h-full gap-2">
                  <button
                    onClick={(e) => handelEdit(e, item.id)}
                    className=" bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-900 cursor-pointer"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handelDelete(e, item.id);
                    }}
                    className="bg-purple-600 text-white px-3 py-1 mx-2 rounded hover:bg-purple-900 cursor-pointer"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
