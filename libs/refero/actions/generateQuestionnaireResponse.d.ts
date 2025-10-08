import { QuestionnaireItem, QuestionnaireResponse, QuestionnaireResponseItem, Questionnaire } from '../types/fhir';
export declare function generateQuestionnaireResponse(questionnaire: Questionnaire): QuestionnaireResponse | undefined;
export declare function createQuestionnaireResponseItem(item: QuestionnaireItem): QuestionnaireResponseItem;
