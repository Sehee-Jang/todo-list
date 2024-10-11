"use client";
import axios from "axios";
import React, { useState } from "react";
import "../styles/styles.css";

type Todo = {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
};

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const handleAddTodo = () => {
    // 1. newTodo 새로운 투두
    const newTodo = { title, contents, isDone: false };
    // 2. POST
    axios.post("http://localhost:4000/todos", newTodo).then((response) => {
      setTodos([...todos, response.data]);
      setTitle("");
      setContents("");
    });
  };

  // 삭제하기
  const deleteTodo = (id: string) => {
    axios.delete(`http://localhost:4000/todos/${id}`).then(() => {
      // filter(삭제된 항목 제외)
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      // setTodos
      setTodos(filteredTodos);
    });
  };

  // 완료처리
  const compelteTodo = (id: string) => {
    const updatedTodo = { isDone: true };
    axios
      .patch(`http://localhost:4000/todos/${id}`, updatedTodo)
      .then((response) => {
        // 완료된 투두 isDone을 트루로 변경
        const updatedTodo = todos.map((todo) =>
          todo.id === id ? { ...todo, isDone: true } : todo
        );
        // 셋투두스
        setTodos(updatedTodo);
      });
  };

  // 취소처리
  const cancelTodo = (id: string) => {
    const updatedTodo = { isDone: false };

    axios
      .patch(`http://localhost:4000/todos/${id}`, updatedTodo)
      .then((response) => {
        // 완료된 투두 isDone을 트루로 변경
        const updatedTodo = todos.map((todo) =>
          todo.id === id ? { ...todo, isDone: false } : todo
        );
        // 셋투두스
        setTodos(updatedTodo);
      });
  };
  return (
    <>
      {/* 데이터 입력 */}
      <input
        type='text'
        value={title}
        placeholder='제목을 입력하세요'
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='text'
        value={contents}
        placeholder='내용을 입력하세요'
        onChange={(e) => setContents(e.target.value)}
      />
      <button onClick={handleAddTodo}>추가하기</button>

      {/* 투두 리스트 - 진행중 */}
      <h3>Working...</h3>
      <ul>
        {todos
          .filter((todo) => !todo.isDone)
          .map((todo) => (
            <li key={todo.id}>
              {todo.title}
              {todo.contents}
              <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              <button onClick={() => compelteTodo(todo.id)}>완료</button>
            </li>
          ))}
      </ul>

      {/* 투두 리스트 - 완료 */}
      <h3>Done!</h3>
      <ul>
        {todos
          .filter((todo) => todo.isDone)
          .map((todo) => (
            <li key={todo.id}>
              {todo.title}
              {todo.contents}
              <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              <button onClick={() => cancelTodo(todo.id)}>취소</button>
            </li>
          ))}
      </ul>
    </>
  );
}
