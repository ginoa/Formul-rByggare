import { QuestionnaireItem } from '../types/fhir';
import { ScoringItemType } from '../constants/scoringItemType';
export declare function createDummySectionScoreItem(): QuestionnaireItem;
export declare function scoringItemType(item: QuestionnaireItem): ScoringItemType;
export declare function isSectionScoringItem(item: QuestionnaireItem): boolean;
export declare function isTotalScoringItem(item: QuestionnaireItem): boolean;
export declare function isQuestionScoringItem(item: QuestionnaireItem): boolean;
