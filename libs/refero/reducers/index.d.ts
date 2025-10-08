import { Reducer } from 'redux';
import { Form } from '../reducers/form';
export interface GlobalState {
    refero: ReferoState;
}
export interface ReferoState {
    form: Form;
}
declare const rootReducer: Reducer<{}>;
export default rootReducer;
