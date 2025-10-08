import { ThunkDispatch } from 'redux-thunk';
import { QuestionnaireItem, QuestionnaireResponseItemAnswer } from '../../../types/fhir';
import { NewValueAction } from '../../../actions/newValue';
import { GlobalState } from '../../../reducers';
import { RenderContext } from '../../../util/renderContext';
import { Resources } from '../../../util/resources';
import { Path } from '../../../util/refero-core';
interface Props {
    item: QuestionnaireItem;
    path: Array<Path>;
    resources?: Resources;
    dispatch?: ThunkDispatch<GlobalState, void, NewValueAction>;
    mustShowConfirm: boolean;
    className?: string;
    onAnswerChange: (newState: GlobalState, path: Array<Path>, item: QuestionnaireItem, answer: QuestionnaireResponseItemAnswer) => void;
    renderContext: RenderContext;
}
declare const connectedComponent: import("react-redux").ComponentClass<import("react-redux").Omit<Props, keyof import("../../with-common-functions").Props> & import("../../with-common-functions").Props>;
export default connectedComponent;
