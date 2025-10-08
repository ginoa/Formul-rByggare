import { QuestionnaireItem, Questionnaire, QuestionnaireResponse } from '../types/fhir';
import { ItemAndPath } from './refero-core';
export interface QuestionnaireItemPair {
    QuestionnaireItem: QuestionnaireItem;
    QuestionnaireResponseItems: Array<ItemAndPath>;
}
export interface IQuestionnaireInspector {
    findItemWithLinkIds(...linkIds: string[]): Array<QuestionnaireItemPair>;
}
export declare class QuestionniareInspector implements IQuestionnaireInspector {
    private questionnaire;
    private questionnaireResponse;
    constructor(questionnaire: Questionnaire, questionnaireResponse: QuestionnaireResponse);
    findItemWithLinkIds(...linkIds: string[]): Array<QuestionnaireItemPair>;
    private findItemWithLinkId;
}
