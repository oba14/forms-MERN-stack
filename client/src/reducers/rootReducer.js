import { combineReducers } from 'redux'
import form from './formReducer';
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
    form,
  errors: errorReducer
});

export default rootReducer