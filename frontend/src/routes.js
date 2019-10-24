import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import Project from './pages/Project';
import About from './pages/About';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path="/projects" exact component={Project}/>
                <Route path="/about" exact component={About}/>
            </Switch>
        </BrowserRouter>
    )
}