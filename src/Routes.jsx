import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About } from './containers';
import { Recipes, AddRecipe } from './containers'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/addrecipe" component={AddRecipe} />
    <Route path="/recipes" component={Recipes} />
  </Switch>
);

export default Routes;
