import React, {Component, Suspense} from 'react';

import {Link, Route} from 'react-router-dom';
import Users from "./js/containers/Users";
import AnotherComponent from "./js/components/AnotherComponent";

const AsyncPizza = React.lazy(() => import("./js/containers/Pizza"));

class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to="/">Users</Link> | <Link to="/pizza">Pizza</Link> | <Link to="/pizza/another-component">Another component</Link>
                </div>
                <div>
                    <Route path="/" exact component={Users}/>
                    <Route path="/pizza" exact render={() => <Suspense fallback={<div>Loading...</div>}><AsyncPizza/></Suspense>}/>
                    <Route path="/pizza/another-component" exact component={AnotherComponent}/>
                </div>
            </div>
        );
    }
}

export default App;