import { QuestionnaireItem, Extension, QuestionnaireResponse } from '../types/fhir';
export declare function evaluateFhirpathExpressionToGetDate(item: QuestionnaireItem, fhirExpression: string): Date | undefined;
export declare function evaluateFhirpathExpressionToGetString(questionnare: QuestionnaireResponse | null | undefined, fhirExtension: Extension): any;
