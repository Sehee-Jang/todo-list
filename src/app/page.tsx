import Image from "next/image";
import TodosPage from "./todos/page";
export default function Home() {
  return (
    <>
      <h1>Todo List</h1>
      <TodosPage />
    </>
  );
}
