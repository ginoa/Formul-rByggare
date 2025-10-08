import { Questionnaire, QuestionnaireResponseItemAnswer, QuestionnaireResponse } from '../types/fhir';
import { FormAction } from '../actions/form';
import { NewValueAction } from '../actions/newValue';
import { GlobalState } from '../reducers/index';
export interface FormData {
    Content: QuestionnaireResponse | null | undefined;
}
export interface FormDefinition {
    Content: Questionnaire | null | undefined;
}
export interface Form {
    FormData: FormData;
    FormDefinition: FormDefinition;
    Language: string;
}
export default function reducer(state: Form | undefined, action: NewValueAction | FormAction): Form | undefined;
export declare function getFormData(state: GlobalState): FormData | null;
export declare function getFormDefinition(state: GlobalState): FormDefinition | null;
export declare function nullAnswerValue(answer: QuestionnaireResponseItemAnswer, initialAnswer?: QuestionnaireResponseItemAnswer | undefined): undefined;
