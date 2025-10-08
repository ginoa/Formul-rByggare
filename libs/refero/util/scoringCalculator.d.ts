import { Questionnaire, QuestionnaireItem, QuestionnaireResponse } from '../types/fhir';
export declare class ScoringCalculator {
    private sectionScoreCache;
    private totalScoreCache;
    private totalScoreItem;
    private itemCache;
    private fhirScoreCache;
    constructor(questionnaire: Questionnaire);
    private updateQuestionnaire;
    private traverseQuestionnaire;
    private isOfTypeQuestionnaireItem;
    calculateScore(questionnaireResponse: QuestionnaireResponse): {
        [linkId: string]: number | undefined;
    };
    calculateFhirScore(questionnaireResponse: QuestionnaireResponse): {
        [linkId: string]: number | undefined;
    };
    private calculateSectionScore;
    private valueOf;
    private valueOfQuestionFhirpathScoreItem;
    private valueOfQuestionScoreItem;
    private valueOfSectionScoreItem;
    private getOptionScore;
    private getAnswerMatch;
    getCachedTotalOrSectionItem(linkId: string): QuestionnaireItem | undefined;
}
