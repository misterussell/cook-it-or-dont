import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, SignUp, SignIn, Confirm } from './containers';
import { AddRecipe, MyRecipes, Recipes } from './containers';

import Store from './Store';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/signup" render={() => <SignUp store={Store}/>} />
    <Route path="/signin" render={() => <SignIn store={Store}/>} />
    <Route path="/confirm" render={() => <Confirm store={Store}/>} />
    <Route path="/addrecipe" render={() => <AddRecipe store={Store}/>} />
    <Route path="/myrecipes" component={() => <MyRecipes store={Store}/>} />
    <Route path="/recipes" component={Recipes} />
  </Switch>
);

export default Routes;
