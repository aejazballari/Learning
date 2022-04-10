import React from 'react'

const Todo = ({item, deleteTodo, editTodo}) => {
    const {title, description, id} = item;
  return (
    <div style={{display: 'flex', alignItems:'center', width:'400px', justifyContent:'space-between'}}>
        <div>
        <h2>{title}</h2>
        <p>{description}</p>
        </div>
        <div>
            <button onClick={() => editTodo(id)}>edit</button>
            <button onClick={() => deleteTodo(id)}>delete</button>
        </div>
    </div>
  )
}

export default Todo