import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AppRouter from './components/AppRouter';
import AuthRouter from './components/AuthRouter';

import checkTokenValidity from './store/utils/checkTokenValidity';

function App() {
  const [validToken, setValidToken] = useState(false)
  const loggedIn = useSelector(state => state.user.loggedIn)

  useEffect(() => {
      checkTokenValidity() ? setValidToken(true) : setValidToken(false)
  }, [loggedIn])


  if (!validToken) return (
    <BrowserRouter>
      <AuthRouter />
    </BrowserRouter> 
  )

  return (
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
  );
}

export default App;
