import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import TodoList from './TodoList/Todolist'
import "./TodoList/Todolist.css"
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';


function App() {
  

  return (
    <>
  <ChakraProvider theme={theme}>
    <TodoList />
  </ChakraProvider>
    </>
  
  )
}

export default App
