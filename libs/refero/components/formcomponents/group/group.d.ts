import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { QuestionnaireItem, QuestionnaireResponseItemAnswer, QuestionnaireResponseItem, Questionnaire } from '../../../types/fhir';
import { NewValueAction } from '../../../actions/newValue';
import { RenderContextType } from '../../../constants/renderContextType';
import { GlobalState } from '../../../reducers';
import { RenderContext } from '../../../util/renderContext';
import { Resources } from '../../../util/resources';
import { Path } from '../../../util/refero-core';
export interface Props {
    item: QuestionnaireItem;
    questionnaire?: Questionnaire;
    answer: QuestionnaireResponseItemAnswer;
    responseItem: QuestionnaireResponseItem;
    dispatch?: ThunkDispatch<GlobalState, void, NewValueAction>;
    path: Array<Path>;
    pdf?: boolean;
    includeSkipLink?: boolean;
    className?: string;
    resources?: Resources;
    headerTag?: number;
    attachmentErrorMessage?: string;
    renderDeleteButton: (className?: string) => JSX.Element | undefined;
    renderChildrenItems: (renderContext: RenderContext) => Array<JSX.Element> | undefined;
    repeatButton: JSX.Element;
    id?: string;
    renderContext: RenderContext;
    renderHelpButton: () => JSX.Element;
    renderHelpElement: () => JSX.Element;
    isHelpOpen?: boolean;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
}
interface State {
    counter?: number;
}
export declare class Group extends React.Component<Props, State> {
    constructor(props: Props);
    shouldComponentUpdate(nextProps: Props): boolean;
    renderAllItems: () => JSX.Element;
    isDirectChildOfRenderContextOwner: () => boolean;
    renderContextTypeGridRow: () => JSX.Element;
    renderContextTypeGrid: () => JSX.Element;
    renderGroup: () => JSX.Element;
    getColumns: () => Array<string>;
    getLocalRenderContextType: () => RenderContextType;
    getClassNames: () => string;
    getComponentToValidate: () => undefined;
    getHeaderText: () => string;
    renderGroupHeader: () => JSX.Element | null;
    render(): JSX.Element | null;
}
declare const connectedComponent: import("react-redux").ComponentClass<import("react-redux").Omit<Props & import("@helsenorge/form/components/form/validation").ValidationProps & import("../../with-common-functions").Props, keyof import("../../with-common-functions").Props> & import("../../with-common-functions").Props>;
export default connectedComponent;
