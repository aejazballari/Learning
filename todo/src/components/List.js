import React from 'react'
import Todo from './Todo'

export const List = ({todos, editTodo, deleteTodo}) => {
  return (
    <div>
        {
            todos.map((item) => {
                return <Todo item={item} key={item.id} editTodo={editTodo} deleteTodo={deleteTodo}/>
            })
        }
    </div>
  )
}
