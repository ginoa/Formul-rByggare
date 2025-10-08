import { Questionnaire, QuestionnaireResponse } from '../types/fhir';
export declare type SET_SKJEMA_DEFINITION = 'refero/SET_SKJEMA_DEFINITION';
export declare const SET_SKJEMA_DEFINITION: SET_SKJEMA_DEFINITION;
export interface FormAction {
    questionnaire: Questionnaire;
    questionnaireResponse?: QuestionnaireResponse;
    language?: string;
    syncQuestionnaireResponse?: boolean;
    type: string;
}
export declare function setSkjemaDefinition(skjemaDefinition: Questionnaire, questionnaireResponse?: QuestionnaireResponse, language?: string, syncQuestionnaireResponse?: boolean): FormAction;
