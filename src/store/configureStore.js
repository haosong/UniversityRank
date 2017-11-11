import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const middleware = [thunk];

// Add the reducer to your store on the `routing` key
// const store = createStore(
//     rootReducer,
//     applyMiddleware(...middleware)
// );

// const createStoreWithMiddleware = applyMiddleware(
//     thunk
// )(createStore);

export default function configureStore(initialState) {
    // return createStoreWithMiddleware(rootReducer, initialState);
    return createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(...middleware)
    );
}
