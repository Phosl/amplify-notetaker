import React, { useEffect, useState } from 'react'
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import Header from './components/Header/Header';
import './style/App.scss';
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'



const initialState = { id: '', note: '' }

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
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, { input: todo }))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }



  return authState === AuthState.SignedIn && user ? (


    <div>
      <div>
        <Header user={user} />
        <input
          value={formState.name}
          placeholder="Note"
          onChange={event => setInput('note', event.target.value)}
        />

        <button onClick={addTodo}>Create Todo</button>
        {
          todos.map((todo, index) => (
            <div key={todo.id ? todo.id : index} >
              <p>{todo.note}</p>
            </div>
          ))
        }
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



