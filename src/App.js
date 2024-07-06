import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDataFromRailsServer = async () => {
    try {
      setIsLoading(true);
      const data = await fetch("http://localhost:3000/api/v1/todos");
      const json = await data.json();
      setTodos(
        json.todos.map((todo) => ({
          id: todo.id,
          text: todo.name,
          isComplete: todo.isComplete,
        }))
      );
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromRailsServer();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <div className="loadingText">Loading...</div>
      ) : (
        <div className="todosContainer">
          <h1>初めてのRails x React 連携</h1>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <input type="checkbox" checked={todo.isComplete} />
                <p>{todo.id}</p>
                <p>{todo.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
