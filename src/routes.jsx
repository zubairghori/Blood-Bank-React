import React from 'react';
import {
    Router,
    Route,
    IndexRoute,
    browserHistory
} from 'react-router'

import { App,Login, Signup, Dashboard } from './containers'
import {RegisterDonor,DonorList, DonorDetail,RecipentList,RecipentDetail,Sample} from './components'

export default (
    <Router history={browserHistory}>
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route path="/" component={App}>
            <IndexRoute component={Dashboard} />            
            <Route path="dashboard" component={Dashboard} >
                <IndexRoute component={DonorList} />
                <Route path="donorlist" component={DonorList} />
                <Route path="donorlist/:id" component={DonorDetail} />
                <Route path="recipent" component={RecipentList} />
                <Route path="recipent/:id" component={RecipentDetail} />
            </Route>
            
        </Route>
    </Router>
)