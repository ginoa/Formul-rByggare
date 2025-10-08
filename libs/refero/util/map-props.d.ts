import { ThunkDispatch } from 'redux-thunk';
import { NewValueAction } from '../actions/newValue';
import { Props } from '../components/with-common-functions';
import { GlobalState } from '../reducers/index';
export declare function mapStateToProps(state: GlobalState, originalProps: Props): Props;
export declare function mergeProps(stateProps: Props, dispatchProps: Props, ownProps: Props): Props;
export declare function mapDispatchToProps(dispatch: ThunkDispatch<GlobalState, void, NewValueAction>, props: Props): Props;
