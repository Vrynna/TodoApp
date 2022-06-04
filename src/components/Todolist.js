import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Todo from './Todo'

// const alltodos = [
//     {description : "Einkaufen", done : true},
//     {description : "Sport", done : false},
//     {description : "Programmieren", done : false}
// ];

const Todolist = () => {

    //states zum speichern und ändern von Daten
    const [openCount, countOpenTodos] = useState(0);
    const [todos, setTodos] = useState(/*alltodos*/ /*[]*/ () => {
        const items = localStorage.getItem("items");
        const parsed = JSON.parse(items);
        return parsed;
    });
    const [textinput, settextinput] = useState("");


    //Event-handler function die den Text erfasst.
    const changeText = (e) => {
        settextinput(e.target.value);
    }

    const submit = (e) => {
        e.preventDefault();

        const newTodos = [...todos, {description: textinput, done: false}];
        setTodos(newTodos);
    }

    

    const deleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    } 

    useEffect(() => {

        const countOpen = () => {
            const donetodos = todos.filter((item) => {
                return !item.done
            });
            countOpenTodos(donetodos.length);
        };

        localStorage.setItem("items", JSON.stringify(todos));

        countOpen();
    }, [todos]);



    const changeTodo = (index) => {
        const newTodos = [...todos];
        if(newTodos[index].done) {
            newTodos[index].done = false;
        } else {
            newTodos[index].done = true;
        }
        setTodos(newTodos);
    };

  return (
    <div className="shadow-sm hover:shadow-lg">
        <div className="text-center bg-gray-900 text-white py-4 font-semibold">
            <h1 className="text-3xl">Unsere Todos</h1>
            <h2>Offene Todos: {openCount}</h2>
            <form className="grid grid-cols-3 py-2">
                <input type="text" placeholder="Neues Todo..." className="col-span-2 py-2 text-gray-900" onChange={changeText}></input>
                <input type="submit" value="Add Todo" className="col-span-1 cursor-pointer" onClick={submit}></input>
            </form>
        </div>
        {todos.map((item, index) => {
            return (
                <Todo description={item.description} done={item.done} key={index} index={index} onChangeTodo={changeTodo} onDeleteTodo={deleteTodo}></Todo>
            );
        })}
    </div>
  );
}

export default Todolist;