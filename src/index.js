import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'
import configureStore from './store/configureStore'
import Overall from './components/overall'
import University from './components/university'

const store = configureStore();

const Parent = () => (
    <div>
        <Route exact path='/' component={Overall}/>
        <Route path='/:id' component={University}/>
    </div>
);

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path='/' component={Parent}/>
            </div>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));