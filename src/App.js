import React, { useEffect, useState } from 'react'
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

import { createTodo, deleteTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Card from './components/Card/Card';
import CardVideo from './components/CardVideo/CardVideo';


const initialState = { note: '' }

function App() {
  // Authenticated User
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])



  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)

    });
  }, []);


  useEffect(() => {
    fetchTodos()
  }, [])


  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)

    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      if (!formState.note) return
      const todo = { ...formState }
      setFormState(initialState)
      const result = await API.graphql(graphqlOperation(createTodo, { input: todo }))
      setTodos([result.data.createTodo, ...todos])
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  async function delTodo(todoId) {
    try {
      const input = { id: todoId }
      console.log(input)
      const result = await API.graphql(graphqlOperation(deleteTodo, { input: input }))
      const deleteTodoId = result.data.deleteTodo.id;
      const updateTodos = todos.filter(todo => todo.id !== deleteTodoId)
      setTodos(updateTodos)
    }
    catch (err) {
      console.log('error deleting todo:', err)
    }
  }

  const handleUpdateTodo = (todo) => {
    console.log(formState)
    setFormState(todo)
    // note exist 
  }

  return authState === AuthState.SignedIn && user ? (


    <div className="app row flex-xl-nowrap no-gutters">
      <Sidebar user={user} />
      <Header user={user} />
      <div className=" main-content col-12 col-md-9 col-xl-10">
        <div className="main-wrapper">
          <div className="row no-margin">
            <div className="col-12">
              <div className="avatar area-avatar">
                <div className="avatar-img"></div>
                <div className="avatar-bkg"></div>
                <div className="avatar-gradient"></div>
              </div>
            </div>

          </div>
          <div className="row no-margin">
            <div className="col-3">
              <Card />
            </div>
            <div className="col-3">

              <CardVideo />

            </div>
            <div className="col-6">
              <Card />
            </div>

          </div>
          <div className="col-12">
            <div className="card card-shadow my-4 ">
              <div className="card-header">Aggiungi una nota</div>
              <div className="card-body">
                <input
                  value={formState.note}
                  placeholder="Note"
                  onChange={event => setInput('note', event.target.value)}
                />
              </div>
              <div className="card-footer bg-light">
                <div className="flex-between-center row">
                  <div className="col-auto">
                    <select className="custom-select">
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                  </div>
                  <div className="col-auto">
                    <button onClick={addTodo}>Create Todo</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card card-shadow">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">nota</th>
                    <th scope="col">createdAt</th>
                    <th scope="col">updatedAt</th>
                    <th scope="col">...</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    todos.map((todo, index) => (
                      <tr key={index} onClick={() => handleUpdateTodo(todo)}>
                        <th scope="row"><div className="fs--1">{todo.id}</div></th>
                        <td>{todo.note}</td>
                        <td>{todo.createdAt}</td>
                        <td>{todo.updatedAt}</td>
                        <th scope="col"><button onClick={() => delTodo(todo.id)}>delete Todo</button></th>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-12">
            <hr />
            <div className="label">h1</div>
            <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h1>
            <div className="label">h2</div>
            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
            <div className="label">h3</div>
            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h3>
            <div className="label">h4</div>
            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h4>
            <div className="label">h5</div>
            <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h5>
            <div className="label">h6</div>
            <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h6>
            <hr />
            <div className="label">font small 1</div>
            <div className="fs--1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            <div className="label">font small 2</div>
            <div className="fs--2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          </div>
        </div>
      </div>

    </div>
  ) :
    <AmplifyAuthenticator usernameAlias="email" >

      {/* override sign in form params */}
      <AmplifySignIn slot="sign-in" usernameAlias="email" />

      {/* override sign up form params */}
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: "email",
            label: "Email",
            placeholder: "Email",
            required: true
          },
          {
            type: "password",
            label: "Password",
            placeholder: "Password",
            required: true,
          },
        ]}
      />
    </AmplifyAuthenticator>
}

export default App;



