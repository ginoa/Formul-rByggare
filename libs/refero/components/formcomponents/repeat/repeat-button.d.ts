import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { QuestionnaireItem, QuestionnaireResponseItem } from '../../../types/fhir';
import { NewValueAction } from '../../../actions/newValue';
import { GlobalState } from '../../../reducers';
import { RenderContext } from '../../../util/renderContext';
import { Resources } from '../../../util/resources';
import { Path } from '../../../util/refero-core';
interface Props {
    item: QuestionnaireItem;
    parentPath?: Array<Path>;
    responseItems?: Array<QuestionnaireResponseItem>;
    resources?: Resources;
    dispatch?: ThunkDispatch<GlobalState, void, NewValueAction>;
    renderContext: RenderContext;
    disabled: boolean;
}
export declare const RepeatButton: React.SFC<Props>;
declare const connectedComponent: import("react-redux").ComponentClass<import("react-redux").Omit<Props, keyof import("../../with-common-functions").Props> & import("../../with-common-functions").Props>;
export default connectedComponent;
