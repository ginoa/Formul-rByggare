import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AutoSuggestProps } from '../../../types/autoSuggestProps';
import { QuestionnaireItem, QuestionnaireResponseItemAnswer, Resource, Coding, QuestionnaireResponseItem, ValueSet } from '../../../types/fhir';
import { OrgenhetHierarki } from '../../../types/orgenhetHierarki';
import { ValidationProps } from '@helsenorge/form/components/form/validation';
import { Options } from '@helsenorge/form/components/radio-group';
import { NewValueAction } from '../../../actions/newValue';
import { GlobalState } from '../../../reducers';
import { Resources } from '../../../util/resources';
import { Path } from '../../../util/refero-core';
export interface ChoiceProps {
    item: QuestionnaireItem;
    answer: Array<QuestionnaireResponseItemAnswer> | QuestionnaireResponseItemAnswer;
    resources?: Resources;
    containedResources?: Resource[];
    dispatch?: ThunkDispatch<GlobalState, void, NewValueAction>;
    path: Array<Path>;
    id?: string;
    pdf?: boolean;
    promptLoginMessage?: () => void;
    headerTag?: number;
    responseItem: QuestionnaireResponseItem;
    renderDeleteButton: () => JSX.Element | undefined;
    repeatButton: JSX.Element;
    renderHelpButton: () => JSX.Element;
    renderHelpElement: () => JSX.Element;
    isHelpOpen?: boolean;
    onAnswerChange: (newState: GlobalState, path: Array<Path>, item: QuestionnaireItem, answer: QuestionnaireResponseItemAnswer) => void;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
    fetchValueSet?: (searchString: string, item: QuestionnaireItem, successCallback: (valueSet: ValueSet) => void, errorCallback: (error: string) => void) => void;
    autoSuggestProps?: AutoSuggestProps;
    fetchReceivers?: (successCallback: (receivers: Array<OrgenhetHierarki>) => void, errorCallback: () => void) => void;
}
interface ChoiceState {
    valid: boolean;
    validated: boolean;
}
export declare class Choice extends React.Component<ChoiceProps & ValidationProps, ChoiceState> {
    constructor(props: ChoiceProps & ValidationProps);
    getValue: (item: QuestionnaireItem, answer: Array<QuestionnaireResponseItemAnswer> | QuestionnaireResponseItemAnswer) => (string | undefined)[] | undefined;
    getDataReceiverValue: (answer: Array<QuestionnaireResponseItemAnswer>) => (string | undefined)[];
    getPDFValue: (item: QuestionnaireItem, answer: Array<QuestionnaireResponseItemAnswer> | QuestionnaireResponseItemAnswer) => string;
    getAnswerValueCoding: (code: string, systemArg?: string, displayArg?: string) => Coding;
    resetInitialAnswer: (code: string) => void;
    handleCheckboxChange: (code?: string) => void;
    clearCodingAnswer: (coding: Coding) => void;
    handleChange: (code?: string, systemArg?: string, displayArg?: string) => void;
    renderCheckbox: (options: Array<Options> | undefined) => JSX.Element;
    renderDropdown: (options: Array<Options> | undefined) => JSX.Element;
    renderRadio: (options: Array<Options> | undefined) => JSX.Element;
    renderAutosuggest: () => JSX.Element;
    renderReceiverComponent: () => JSX.Element;
    shouldComponentUpdate(nextProps: ChoiceProps): boolean;
    render(): JSX.Element | null;
}
declare const connectedComponent: import("react-redux").ComponentClass<import("react-redux").Omit<ChoiceProps & ValidationProps & import("../../with-common-functions").Props, keyof import("../../with-common-functions").Props> & import("../../with-common-functions").Props>;
export default connectedComponent;
