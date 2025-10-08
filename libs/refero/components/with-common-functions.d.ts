import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AutoSuggestProps } from '../types/autoSuggestProps';
import { Resource, Questionnaire, QuestionnaireResponseItem, QuestionnaireItem, QuestionnaireResponseItemAnswer, Attachment, ValueSet } from '../types/fhir';
import { OrgenhetHierarki } from '../types/orgenhetHierarki';
import { TextMessage } from '../types/text-message';
import { UploadedFile } from '@helsenorge/file-upload/components/dropzone';
import { FormChild } from '@helsenorge/form/components/form';
import { ValidationProps } from '@helsenorge/form/components/form/validation';
import { NewValueAction } from '../actions/newValue';
import { GlobalState } from '../reducers';
import { Path } from '../util/refero-core';
import { RenderContext } from '../util/renderContext';
import { Resources } from '../util/resources';
export interface Props {
    resources?: Resources;
    responseItem?: QuestionnaireResponseItem;
    containedResources?: Resource[];
    item?: QuestionnaireItem;
    questionnaire?: Questionnaire | null;
    headerTag?: number;
    pdf?: boolean;
    language?: string;
    includeSkipLink?: boolean;
    promptLoginMessage?: () => void;
    path?: Array<Path>;
    enable?: boolean;
    id?: string;
    answer?: QuestionnaireResponseItemAnswer | Array<QuestionnaireResponseItemAnswer>;
    addFormComponent?: (component: FormChild) => void;
    removeFormComponent?: (component: FormChild) => void;
    onValidated?: (valid: boolean | undefined) => void;
    optionalLabel?: string;
    requiredLabel?: string;
    validateScriptInjection?: boolean;
    showOptionalLabel?: boolean;
    showRequiredLabel?: boolean;
    dispatch?: ThunkDispatch<GlobalState, void, NewValueAction>;
    visibleDeleteButton?: boolean;
    repeatButton?: JSX.Element;
    attachmentErrorMessage?: string;
    attachmentMaxFileSize?: number;
    attachmentValidTypes?: Array<string>;
    onRequestAttachmentLink?: (file: string) => string;
    onOpenAttachment?: (fileId: string) => void;
    onDeleteAttachment?: (fileId: string, onSuccess: () => void, onError: (errormessage: TextMessage | null) => void) => void;
    uploadAttachment?: (files: File[], onSuccess: (uploadedFile: UploadedFile, attachment: Attachment) => void, onError: (errormessage: TextMessage | null) => void) => void;
    onRequestHelpButton?: (item: QuestionnaireItem, itemHelp: QuestionnaireItem, helpType: string, helpText: string, opening: boolean) => JSX.Element;
    onRequestHelpElement?: (item: QuestionnaireItem, itemHelp: QuestionnaireItem, helpType: string, helpText: string, opening: boolean) => JSX.Element;
    onAnswerChange?: (newState: GlobalState, path: Array<Path>, item: QuestionnaireItem, answer: QuestionnaireResponseItemAnswer) => void;
    renderContext: RenderContext;
    isHelpOpen?: boolean;
    onRenderMarkdown?: (item: QuestionnaireItem, markup: string) => string;
    fetchValueSet?: (searchString: string, item: QuestionnaireItem, successCallback: (valueSet: ValueSet) => void, errorCallback: (error: string) => void) => void;
    autoSuggestProps?: AutoSuggestProps;
    fetchReceivers?: (successCallback: (receivers: Array<OrgenhetHierarki>) => void, errorCallback: () => void) => void;
}
interface EnhancedProps {
    renderChildrenItems?: (renderContext: RenderContext) => Array<JSX.Element> | undefined;
    renderDeleteButton?: () => JSX.Element | undefined;
}
interface State {
    childComponents?: Array<React.Component<Props>>;
    isHelpVisible: boolean;
}
export default function withCommonFunctions<T>(WrappedComponent: React.ComponentClass<T & EnhancedProps>): {
    new (props: T & ValidationProps & Props): {
        renderDeleteButton: (className?: string) => JSX.Element | undefined;
        renderRepeatButton: (item: QuestionnaireItem, index: number, path?: Array<Path>, response?: Array<QuestionnaireResponseItem>, responseItem?: QuestionnaireResponseItem) => JSX.Element | undefined;
        hasAnwer(answer: QuestionnaireResponseItemAnswer | QuestionnaireResponseItemAnswer[] | undefined): boolean;
        toggleHelp: (isOpen: boolean) => void;
        renderHelpButton: () => JSX.Element | undefined;
        renderHelpElement: () => JSX.Element | undefined;
        renderItem: (item: QuestionnaireItem, renderContext: RenderContext) => Array<JSX.Element | undefined>;
        renderChildrenItems: (renderContext: RenderContext) => Array<JSX.Element | undefined> | undefined;
        render(): JSX.Element | null;
        context: any;
        setState<K extends keyof State>(state: State | ((prevState: Readonly<State>, props: Readonly<T & ValidationProps & Props>) => State | Pick<State, K> | null) | Pick<State, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<T & ValidationProps & Props> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<State>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<T & ValidationProps & Props>, nextState: Readonly<State>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<T & ValidationProps & Props>, prevState: Readonly<State>): any;
        componentDidUpdate?(prevProps: Readonly<T & ValidationProps & Props>, prevState: Readonly<State>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<T & ValidationProps & Props>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<T & ValidationProps & Props>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<T & ValidationProps & Props>, nextState: Readonly<State>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<T & ValidationProps & Props>, nextState: Readonly<State>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
};
export {};
