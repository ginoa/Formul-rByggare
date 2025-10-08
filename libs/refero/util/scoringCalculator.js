"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoringCalculator = void 0;
const tslib_1 = require("tslib");
const extensions_1 = tslib_1.__importDefault(require("../constants/extensions"));
const scoringItemType_1 = require("../constants/scoringItemType");
const extension_1 = require("./extension");
const scoring_1 = require("./scoring");
const refero_core_1 = require("./refero-core");
const fhirpathHelper_1 = require("./fhirpathHelper");
const itemType_1 = tslib_1.__importDefault(require("../constants/itemType"));
class CalculatedScores {
    constructor() {
        this.totalScores = [];
        this.sectionScores = [];
        this.questionScores = [];
    }
    update(subRetVal) {
        this.totalScores.push(...subRetVal.totalScores);
        this.sectionScores.push(...subRetVal.sectionScores);
        this.questionScores.push(...subRetVal.questionScores);
    }
    hasTotalScores() {
        return this.totalScores.length > 0;
    }
    hasSectionScores() {
        return this.sectionScores.length > 0;
    }
    hasQuestionScores() {
        return this.questionScores.length > 0;
    }
}
class ScoringCalculator {
    constructor(questionnaire) {
        this.sectionScoreCache = {};
        this.totalScoreCache = [];
        this.itemCache = {};
        this.fhirScoreCache = {};
        this.updateQuestionnaire(questionnaire);
    }
    updateQuestionnaire(questionnaire) {
        this.sectionScoreCache = {};
        this.totalScoreCache = [];
        this.itemCache = {};
        this.fhirScoreCache = {};
        this.totalScoreItem = undefined;
        this.traverseQuestionnaire(questionnaire);
    }
    traverseQuestionnaire(qItem, level = 0) {
        const retVal = new CalculatedScores();
        if (qItem.item) {
            for (const subItem of qItem.item) {
                const subRetVal = this.traverseQuestionnaire(subItem, level + 1);
                retVal.update(subRetVal);
            }
        }
        if (level === 0) {
            this.totalScoreItem = (0, scoring_1.createDummySectionScoreItem)();
            const subRetVal = this.traverseQuestionnaire(this.totalScoreItem, level + 1);
            retVal.update(subRetVal);
        }
        if (retVal.hasTotalScores()) {
            for (const totalScore of retVal.totalScores) {
                this.totalScoreCache.push(totalScore.linkId);
                this.itemCache[totalScore.linkId] = totalScore;
            }
        }
        if (retVal.hasSectionScores()) {
            const firstSectionScore = retVal.sectionScores.shift();
            this.sectionScoreCache[firstSectionScore.linkId] = retVal.questionScores;
            this.itemCache[firstSectionScore.linkId] = firstSectionScore;
            for (const sectionScore of retVal.sectionScores) {
                this.sectionScoreCache[sectionScore.linkId] = [firstSectionScore];
                this.itemCache[sectionScore.linkId] = sectionScore;
            }
            const newRetVal = new CalculatedScores();
            newRetVal.questionScores.push(firstSectionScore);
            return newRetVal;
        }
        if (this.isOfTypeQuestionnaireItem(qItem)) {
            const type = (0, scoring_1.scoringItemType)(qItem);
            if (type === scoringItemType_1.ScoringItemType.SECTION_SCORE) {
                const newRetVal = new CalculatedScores();
                newRetVal.sectionScores.push(qItem);
                return newRetVal;
            }
            if (type === scoringItemType_1.ScoringItemType.TOTAL_SCORE) {
                const newRetVal = new CalculatedScores();
                newRetVal.totalScores.push(qItem);
                return newRetVal;
            }
            if (type === scoringItemType_1.ScoringItemType.QUESTION_SCORE) {
                const newRetVal = new CalculatedScores();
                newRetVal.questionScores.push(qItem, ...retVal.questionScores);
                return newRetVal;
            }
            if (type === scoringItemType_1.ScoringItemType.QUESTION_FHIRPATH_SCORE) {
                this.fhirScoreCache[qItem.linkId] = qItem;
            }
        }
        const newRetVal = new CalculatedScores();
        newRetVal.questionScores.push(...retVal.questionScores);
        return newRetVal;
    }
    isOfTypeQuestionnaireItem(item) {
        return item.type !== undefined;
    }
    calculateScore(questionnaireResponse) {
        const answerPad = {};
        for (const sectionScoreLinkId in this.sectionScoreCache) {
            answerPad[sectionScoreLinkId] = this.calculateSectionScore(sectionScoreLinkId, questionnaireResponse, answerPad);
        }
        for (const totalScoreLinkId of this.totalScoreCache) {
            answerPad[totalScoreLinkId] = this.calculateSectionScore(this.totalScoreItem.linkId, questionnaireResponse, answerPad);
        }
        delete answerPad[this.totalScoreItem.linkId];
        return answerPad;
    }
    calculateFhirScore(questionnaireResponse) {
        const answerPad = {};
        for (const fhirScoreLinkId in this.fhirScoreCache) {
            answerPad[fhirScoreLinkId] = this.valueOfQuestionFhirpathScoreItem(this.fhirScoreCache[fhirScoreLinkId], questionnaireResponse);
        }
        return answerPad;
    }
    calculateSectionScore(linkId, questionnaireResponse, answerPad) {
        let sum = 0;
        let hasCalculatedAtLeastOneAnswer = false;
        const dependencies = this.sectionScoreCache[linkId];
        for (const item of dependencies) {
            const result = this.valueOf(item, questionnaireResponse, answerPad);
            if (result !== undefined) {
                sum += result;
                hasCalculatedAtLeastOneAnswer = true;
            }
        }
        return hasCalculatedAtLeastOneAnswer ? sum : undefined;
    }
    valueOf(item, questionnaireResponse, answerPad) {
        const scoringType = (0, scoring_1.scoringItemType)(item);
        switch (scoringType) {
            case scoringItemType_1.ScoringItemType.SECTION_SCORE:
                return this.valueOfSectionScoreItem(item, questionnaireResponse, answerPad);
            case scoringItemType_1.ScoringItemType.QUESTION_SCORE:
                return this.valueOfQuestionScoreItem(item, questionnaireResponse);
            default:
                return;
        }
    }
    valueOfQuestionFhirpathScoreItem(item, questionnaireResponse) {
        var _a;
        const expressionExtension = (0, extension_1.getCalculatedExpressionExtension)(item);
        let value = undefined;
        if (expressionExtension) {
            const result = (0, fhirpathHelper_1.evaluateFhirpathExpressionToGetString)(questionnaireResponse, expressionExtension);
            if (result.length) {
                value = (_a = result[0]) !== null && _a !== void 0 ? _a : 0;
                value = item.type === itemType_1.default.INTEGER ? Math.round(value) : value;
                if (isNaN(value) || !isFinite(value)) {
                    value = undefined;
                }
            }
        }
        return value;
    }
    valueOfQuestionScoreItem(item, questionnaireResponse) {
        let sum = 0;
        let hasCalculatedAtLeastOneAnswer = false;
        const qrItems = (0, refero_core_1.getQuestionnaireResponseItemsWithLinkId)(item.linkId, questionnaireResponse.item || [], true);
        for (const qrItem of qrItems) {
            if (!qrItem.answer)
                continue;
            for (const answer of qrItem.answer) {
                const option = this.getAnswerMatch(answer, item);
                if (option) {
                    sum += this.getOptionScore(option);
                    hasCalculatedAtLeastOneAnswer = true;
                }
            }
        }
        return hasCalculatedAtLeastOneAnswer ? sum : undefined;
    }
    valueOfSectionScoreItem(item, questionnaireResponse, answerPad) {
        if (item.linkId in answerPad) {
            return answerPad[item.linkId];
        }
        return this.calculateSectionScore(item.linkId, questionnaireResponse, answerPad);
    }
    getOptionScore(option) {
        const extension = (0, extension_1.getExtension)(extensions_1.default.ORDINAL_VALUE, option.valueCoding);
        if (extension === null || extension === void 0 ? void 0 : extension.valueDecimal) {
            return extension === null || extension === void 0 ? void 0 : extension.valueDecimal;
        }
        return 0;
    }
    getAnswerMatch(answer, item) {
        if (answer.valueCoding) {
            if (item.answerOption) {
                for (const o of item.answerOption) {
                    if (o.valueCoding.code === answer.valueCoding.code && o.valueCoding.system === answer.valueCoding.system) {
                        return o;
                    }
                }
            }
        }
        return;
    }
    getCachedTotalOrSectionItem(linkId) {
        return this.itemCache[linkId];
    }
}
exports.ScoringCalculator = ScoringCalculator;
//# sourceMappingURL=scoringCalculator.js.map