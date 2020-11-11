import { combineReducers } from 'redux'
import burgerBuilderReducer from './reducers/burgerBuilderReducer'
import { orderReducer } from './reducers/orderReducer'
import { authReducer } from './reducers/authReducer'

export const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
	auth: authReducer,
})
