import { useState, useEffect } from "react";
import { List } from "./components/List";

const defaultFormFields = {
  title: '',
  description: '',
}

function App() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [term, setTerm] = useState('');
  const {title, description} = formFields;
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState('')
  const handleChange = (e) => {
    const {value, name} = e.target;
    setFormFields({...formFields, [name]: value})
  };
  const handleTerm = (e) => {
    setTerm(e.target.value);
  };
console.log(term);
  const searchTodo = () => {
    if(!term) {
      getTodos()
    } else {
      console.log(term);
      fetch(`http://localhost:4000/api/todos?search=${term}`).then(res => res.json()).then(res => setTodos(res.data)).catch(e => console.log(e));
    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formFields)
  };
  const patchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formFields)
};
    if(!editId) {
      fetch('http://localhost:4000/api/todos', postOptions)
      .then(response => response.json())
      .then(() => {
        getTodos();
        setFormFields(formFields);
      });
    } else {
      fetch(`http://localhost:4000/api/todos/${editId}`, patchOptions)
      .then(response => response.json())
      .then(() => {
        getTodos();
        setEditId('');
        setFormFields(defaultFormFields)
      });
    }
  };

  const getTodos = () => {
    fetch('http://localhost:4000/api/todos').then(res => res.json()).then(res => setTodos(res.data)).catch(e => console.log(e));
  };

  useEffect(() => {
    getTodos();
  }, []);

  const deleteTodo = (id) => {
    console.log(id);
    fetch(`http://localhost:4000/api/todos/${id}`, { method: 'DELETE' })
    .then(() => getTodos());
  }

  const editTodo = (id) => {
    const todo = todos.find(item => item.id === id);
    setFormFields(todo);
    setEditId(id)
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input type='text' value={title} placeholder='title' onChange={handleChange} name='title' required/>
        <input type='text' value={description} placeholder='description' onChange={handleChange} name='description'/>
        <button type="submit">Add</button>
      </form>
      <div>
      <input type='text' value={term} placeholder='search' onChange={handleTerm} />
      <button onClick={searchTodo}>search</button>
      </div>
      <List todos={todos} deleteTodo={deleteTodo} editTodo={editTodo}/>
    </div>
  );
}

export default App;
