import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers/Customers'
import Products from '../pages/Products'
import CustomerInfo from '../pages/Customers/CustomerInfo'
import Orders from '../pages/Orders/Orders'
import Pie from '../pages/Orders/Pie'
import Employees from '../pages/Employees'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/customers' component={Customers}/>
            <Route path='/customersInfo/:customerId' component={CustomerInfo}/>
            <Route path='/products' component={Products}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/pie' component={Pie}/>
            <Route path='/employees' component={Employees}/>
        </Switch>
    )
}

export default Routes
