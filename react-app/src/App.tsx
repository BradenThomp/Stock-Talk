import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import { Home } from './Pages/home';


function App() {
  return (
    <main>
      <Switch>
        <Route path='/' component={Home} exact/>
      </Switch>
    </main>
  );
}

export default App;
