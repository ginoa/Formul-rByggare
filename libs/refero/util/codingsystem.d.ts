import { QuestionnaireItem, Coding } from '../types/fhir';
export declare function getCode(item: QuestionnaireItem, system: string): Coding | undefined;
export declare function getQuestionnaireItemCodeValue(item: QuestionnaireItem, codesytem: string): string | undefined;
