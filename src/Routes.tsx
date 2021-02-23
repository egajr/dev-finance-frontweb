import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import NewTransaction from './Transactions';
import Home from './Home';
import Navbar from './Navbar';
import React from "react";

function Routes() {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route path={'/transactions'} exact component={NewTransaction} />
                <Route path={'/'} exact component={Home} />
                <Link to={'/transactions'}> Nova Transação </Link>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;