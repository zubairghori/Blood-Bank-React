import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import AuthReducer from './reducers/authReducer';
import DonorReducer from './reducers/donorReducer';
import RecipentReducer from "./reducers/recipentReducer"
import AuthMiddleware from './middleware/authMiddleware'
import DonorMiddleware from './middleware/donorMiddleware'
import RecipentMiddleware from "./middleware/recipentMiddleware"

export {
    AuthMiddleware,
    DonorMiddleware,
    RecipentMiddleware
}


//const middleware = applyMiddleware(thunk,logger());
const middleware = compose(
      applyMiddleware(thunk,logger()),
    //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
export const rootReducer = combineReducers({
    AuthReducer,
    DonorReducer,
    RecipentReducer
// more reducers go here
})

export let store = createStore(
    rootReducer,
    middleware
    //,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);