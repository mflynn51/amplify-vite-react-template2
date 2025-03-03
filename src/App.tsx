import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';



const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <button onClick={createTodo}>+ new</button>
      <button onClick={signOut}>Sign out</button>
      <ul>
        {todos.map((todo) => (
          <li 
            onClick={() => deleteTodo(todo.id)}
            key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>

      <div>



    <div id="map" />
    <script src="https://unpkg.com/maplibre-gl@3.x/dist/maplibre-gl.js"></script>
    <script>
      const apiKey = "v1.public.eyJqdGkiOiI3NzhjODBiZS01OGVlLTQzZDQtYjJlOC1jZWNjOTJkNTI3YTQifUKuSyxdMDBCxkGqmkII1c_7L6T-ewrXS-ALCQbowQsl7HUrkOXY0Rx7KsAHjDqQRASGMNVG6plCk7AjYrZ32S5tZcCRH4Sc7TakT3cIyipnYwA1YbZ0aKTyEnHNfl5uNfzrvw4INKiDNNUJDytyf96qVPCIjNm8Ty1HIJoOtDC37yzp_dacYubxML8pugr35e3RVOGG06W2fEV9j-WvK_QfSyH6MxRltHw5cvfF4ohWJ9sUmO0-U8RPNC3xH2jB2kceMk7vnlEuoz6mBdwzVbDW0q2lPPYXuDEoYqBJfALBslmiIIQrJQVWIiiy4ZCgUJxeeeS28NGXGZvxGLd3cRI.ZWU0ZWIzMTktMWRhNi00Mzg0LTllMzYtNzlmMDU3MjRmYTkx";
      const region = "us-east-1";
      const style = "Standard";
      const colorScheme = "Light";
      

      const map = new maplibregl.Map({
        container: "map",
        style: `https://maps.geo.${region}.amazonaws.com/v2/styles/${style}/descriptor?key=${apiKey}&color-scheme=${colorScheme}`,
        center: [-123.115898, 49.295868],
        zoom: 11,
      });
      map.addControl(new maplibregl.NavigationControl(), "top-left");
    </script>



      </div>
      
    </main>
  );
}

export default App;
