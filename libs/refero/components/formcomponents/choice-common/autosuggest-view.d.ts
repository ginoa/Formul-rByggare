import * as React from 'react';
import { AutoSuggestProps } from '../../../types/autoSuggestProps';
import { ValueSet, QuestionnaireItem, Questionnaire, Coding, QuestionnaireResponseItemAnswer } from '../../../types/fhir';
import { Suggestion } from '@helsenorge/autosuggest/components/autosuggest';
import { Resources } from '../../../util/resources';
interface AutosuggestProps {
    handleChange: (code?: string, systemArg?: string, displayArg?: string) => void;
    clearCodingAnswer: (coding: Coding) => void;
    fetchValueSet?: (searchString: string, item: QuestionnaireItem, successCallback: (valueSet: ValueSet) => void, errorCallback: (error: string) => void) => void;
    autoSuggestProps?: AutoSuggestProps;
    answer: Array<QuestionnaireResponseItemAnswer> | QuestionnaireResponseItemAnswer;
    item: QuestionnaireItem;
    questionnaire?: Questionnaire;
    id?: string;
    resources?: Resources;
    renderDeleteButton: (className?: string) => JSX.Element | undefined;
    repeatButton: JSX.Element;
    children?: JSX.Element;
    handleStringChange?: (value: string) => void;
    renderHelpButton: () => JSX.Element;
    renderHelpElement: () => JSX.Element;
    onRenderMarkdown?: (item: QuestionnaireItem, markdown: string) => string;
}
interface AutosuggestState {
    inputValue: string;
    lastSearchValue: string;
    system: string;
    suggestions: Array<Suggestion>;
    noSuggestionsToShow: boolean;
    isLoading: boolean;
    hasLoadError: boolean;
    isDirty: boolean;
}
declare class AutosuggestView extends React.Component<AutosuggestProps, AutosuggestState> {
    constructor(props: AutosuggestProps);
    isOpenChoice(): boolean;
    onSubmitValidator(): boolean;
    successCallback(valueSet: ValueSet): void;
    errorCallback(): void;
    clearCodingAnswerIfExists(): void;
    onSuggestionsFetchRequested({ value }: {
        value: string;
    }): void;
    onChangeInput(_event: React.FormEvent<HTMLInputElement>, { newValue }: {
        newValue: string;
        method: string;
    }): void;
    debouncedOnSuggestionsFetchRequested: ({ value }: {
        value: string;
    }) => void;
    onSuggestionSelected(_event: React.FormEvent<HTMLInputElement>, { suggestion }: {
        suggestion: Suggestion;
    }): void;
    onBlur(_e: React.FormEvent<{}>, { highlightedSuggestion }: {
        highlightedSuggestion: Suggestion | null;
    }): void;
    hasStringAnswer(): boolean;
    hasCodingAnswer(): boolean;
    getCodingAnswer(): Coding | undefined;
    getStringAnswer(): string | undefined;
    render(): JSX.Element;
}
export default AutosuggestView;
