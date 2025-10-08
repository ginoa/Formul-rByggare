import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { QuestionnaireItem, QuestionnaireResponseItemAnswer, QuestionnaireResponseItem, Questionnaire } from '../../../types/fhir';
import { ValidationProps } from '@helsenorge/form/components/form/validation';
import { NewValueAction } from '../../../actions/newValue';
import { GlobalState } from '../../../reducers';
import { Resources } from '../../../util/resources';
import { Path } from '../../../util/refero-core';
export interface Props {
    item: QuestionnaireItem;
    questionnaire?: Questionnaire;
    responseItem: QuestionnaireResponseItem;
    answer: QuestionnaireResponseItemAnswer;
    path: Array<Path>;
    dispatch?: ThunkDispatch<GlobalState, void, NewValueAction>;
    pdf?: boolean;
    promptLoginMessage?: () => void;
    id?: string;
    resources?: Resources;
    visibleDeleteButton: boolean;
    renderDeleteButton: (className?: string) => JSX.Element | undefined;
    repeatButton: JSX.Element;
    oneToTwoColumn: boolean;
    validateScriptInjection: boolean;
    renderHelpButton: () => JSX.Element;
    renderHelpElement: () => JSX.Element;
    onAnswerChange: (newState: GlobalState, path: Array<Path>, item: QuestionnaireItem, answer: QuestionnaireResponseItemAnswer) => void;
    isHelpOpen?: boolean;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
}
export declare class String extends React.Component<Props & ValidationProps, {}> {
    handleChange: (event: React.FormEvent<{}>) => void;
    debouncedHandleChange: (event: React.FormEvent<{}>) => void;
    shouldComponentUpdate(nextProps: Props): boolean;
    validateText: (value: string) => boolean;
    getValidationErrorMessage: (value: string) => string;
    getRequiredErrorMessage: (item: QuestionnaireItem) => string | undefined;
    render(): JSX.Element | null;
}
declare const connectedComponent: import("react-redux").ComponentClass<import("react-redux").Omit<Props & ValidationProps & import("../../with-common-functions").Props & React.RefAttributes<React.Component<{}, {}, any>>, keyof import("../../with-common-functions").Props> & import("../../with-common-functions").Props>;
export default connectedComponent;
