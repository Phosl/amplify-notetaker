import React, { useEffect, useState } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import Header from './components/Header';
import BootstrapButton  from 'react-bootstrap/Button'

const TempNotes = [
  {
    id: 1,
    note: 'ciao'
  }
]
function App() {
  // Authenticated User
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();
  const [notes, setNote] = useState();

  


  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);



  return AuthState.SignedIn === AuthState.SignedIn && user ? (


    <div>
      <Header user={user} state={AuthState} />
      <div className="flex flex-column items-center justify-center pa3 bg-washed-red"></div>
      <h1 className="code f2-1">Amplify NoteTaker</h1>
      {/* Form */}
      <form className="mb3">
        <input
          type="text"
          className="pa2 f4"
          placeholder="write your note"
        />
    <BootstrapButton
          className=""
          type="submit"
          >Add Note</BootstrapButton>
      </form>

      {/* {Note List} */}
      <div>
        {notes.map(item => (
          <div key={item.id}>{item.note}<span><button>X</button></span></div>
        ))}
      </div>
    </div>
  ) :
    ''
}

export default withAuthenticator(App);
