/*
 * @Author: your name
 * @Date: 2019-11-19 11:53:18
 * @LastEditTime: 2019-11-20 09:59:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo-app\src\Page.js
 */
import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/NotFound';
import Login from './Login';
import App from './App';

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/Login" push />} />
            <Route path="/app" component={App} />
            <Route path="/404" component={NotFound} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);
