import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { Questionnaire, QuestionnaireItem, QuestionnaireResponseItemAnswer, QuestionnaireResponseItem } from '../../../types/fhir';
import { ValidationProps } from '@helsenorge/form/components/form/validation';
import { NewValueAction } from '../../../actions/newValue';
import { GlobalState } from '../../../reducers';
import { Path } from '../../../util/refero-core';
import { Resources } from '../../../util/resources';
export interface Props {
    item: QuestionnaireItem;
    questionnaire?: Questionnaire;
    responseItem: QuestionnaireResponseItem;
    answer: QuestionnaireResponseItemAnswer;
    dispatch?: ThunkDispatch<GlobalState, void, NewValueAction>;
    path: Array<Path>;
    pdf?: boolean;
    promptLoginMessage?: () => void;
    renderDeleteButton: (className?: string) => JSX.Element | undefined;
    id?: string;
    repeatButton: JSX.Element;
    validateScriptInjection: boolean;
    renderHelpButton: () => JSX.Element;
    renderHelpElement: () => JSX.Element;
    resources?: Resources;
    onAnswerChange: (newState: GlobalState, path: Array<Path>, item: QuestionnaireItem, answer: QuestionnaireResponseItemAnswer) => void;
    isHelpOpen?: boolean;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
    shouldExpanderRenderChildrenWhenClosed?: boolean;
}
export declare class Text extends React.Component<Props & ValidationProps, {}> {
    showCounter(): boolean;
    handleChange: (event: React.FormEvent<{}>) => void;
    debouncedHandleChange: (event: React.FormEvent<{}>) => void;
    validateText: (value: string) => boolean;
    validateWithRegex: (value: string) => boolean;
    getValidationErrorMessage: (value: string) => string;
    getRequiredErrorMessage: (item: QuestionnaireItem) => string | undefined;
    shouldComponentUpdate(nextProps: Props): boolean;
    render(): JSX.Element | null;
}
declare const connectedComponent: import("react-redux").ComponentClass<import("react-redux").Omit<Props & ValidationProps & import("../../with-common-functions").Props, keyof import("../../with-common-functions").Props> & import("../../with-common-functions").Props>;
export default connectedComponent;
