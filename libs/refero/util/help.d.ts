import { QuestionnaireItem } from '../types/fhir';
export declare function findHelpItem(parent: QuestionnaireItem): QuestionnaireItem | undefined;
export declare function isHelpItem(item: QuestionnaireItem): boolean;
export declare function getHelpItemType(item: QuestionnaireItem): string | undefined;
