import React from 'react';
import { Router as BrowserRouter,  Switch, Route  } from 'react-router-dom';
import Layout from './pages/template/Layout';
import history from './history';
function App() {
  return (
    <BrowserRouter history={history} basename={"/"} >
      <div>
      <Switch>
        <Route  component={Layout} />
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
