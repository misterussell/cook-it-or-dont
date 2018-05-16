import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, SignUp, SignIn, Confirm } from './containers';
import { Recipes, AddRecipe } from './containers'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={SignIn} />
    <Route path="/confirm" component={Confirm} />
    <Route path="/addrecipe" component={AddRecipe} />
    <Route path="/recipes" component={Recipes} />
  </Switch>
);

export default Routes;
