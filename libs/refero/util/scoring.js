"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isQuestionScoringItem = exports.isTotalScoringItem = exports.isSectionScoringItem = exports.scoringItemType = exports.createDummySectionScoreItem = void 0;
const tslib_1 = require("tslib");
const uuid = tslib_1.__importStar(require("uuid"));
const extensions_1 = tslib_1.__importDefault(require("../constants/extensions"));
const scoring_1 = tslib_1.__importDefault(require("../constants/scoring"));
const scoringItemType_1 = require("../constants/scoringItemType");
const extension_1 = require("./extension");
const itemType_1 = tslib_1.__importDefault(require("../constants/itemType"));
function createDummySectionScoreItem() {
    return {
        linkId: uuid.v4(),
        type: itemType_1.default.QUANTITY,
        extension: [
            {
                url: extensions_1.default.QUESTIONNAIRE_UNIT,
                valueCoding: {
                    system: scoring_1.default.SCORING,
                    code: scoring_1.default.SCORING_CODE,
                    display: 'score',
                },
            },
        ],
        code: [
            {
                system: scoring_1.default.SCORING_FORMULAS,
                code: scoring_1.default.Type.SECTION_SCORE,
                display: 'Sectionscore',
            },
        ],
    };
}
exports.createDummySectionScoreItem = createDummySectionScoreItem;
function scoringItemType(item) {
    if (item.code) {
        const scoring = getCodingWithScoring(item);
        switch (scoring === null || scoring === void 0 ? void 0 : scoring.code) {
            case scoring_1.default.Type.TOTAL_SCORE:
                return scoringItemType_1.ScoringItemType.TOTAL_SCORE;
            case scoring_1.default.Type.SECTION_SCORE:
                return scoringItemType_1.ScoringItemType.SECTION_SCORE;
            case scoring_1.default.Type.QUESTION_SCORE:
                return scoringItemType_1.ScoringItemType.QUESTION_SCORE;
            default:
                return scoringItemType_1.ScoringItemType.NONE;
        }
    }
    else if (item.extension) {
        const calculatedExpressionExtension = (0, extension_1.getCalculatedExpressionExtension)(item);
        return calculatedExpressionExtension ? scoringItemType_1.ScoringItemType.QUESTION_FHIRPATH_SCORE : scoringItemType_1.ScoringItemType.NONE;
    }
    return scoringItemType_1.ScoringItemType.NONE;
}
exports.scoringItemType = scoringItemType;
function isSectionScoringItem(item) {
    const scoring = getCodingWithScoring(item);
    return scoring ? scoring.code === scoring_1.default.Type.SECTION_SCORE : false;
}
exports.isSectionScoringItem = isSectionScoringItem;
function isTotalScoringItem(item) {
    const scoring = getCodingWithScoring(item);
    return scoring ? scoring.code === scoring_1.default.Type.TOTAL_SCORE : false;
}
exports.isTotalScoringItem = isTotalScoringItem;
function isQuestionScoringItem(item) {
    const scoring = getCodingWithScoring(item);
    return scoring ? scoring.code === scoring_1.default.Type.QUESTION_SCORE : false;
}
exports.isQuestionScoringItem = isQuestionScoringItem;
function getCodingWithScoring(item) {
    if (!item.code)
        return;
    const scoringTypes = [scoring_1.default.Type.QUESTION_SCORE, scoring_1.default.Type.SECTION_SCORE, scoring_1.default.Type.TOTAL_SCORE];
    for (const coding of item.code) {
        const system = coding.system;
        if (system === scoring_1.default.SCORING_FORMULAS && scoringTypes.filter(s => s === coding.code).length > 0) {
            return coding;
        }
    }
}
//# sourceMappingURL=scoring.js.map