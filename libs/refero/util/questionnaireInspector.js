"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionniareInspector = void 0;
const refero_core_1 = require("./refero-core");
class QuestionniareInspector {
    constructor(questionnaire, questionnaireResponse) {
        this.questionnaire = questionnaire;
        this.questionnaireResponse = questionnaireResponse;
    }
    findItemWithLinkIds(...linkIds) {
        const questionnaireItemPairs = [];
        for (const linkId of linkIds) {
            const pair = this.findItemWithLinkId(linkId);
            if (pair) {
                questionnaireItemPairs.push(pair);
            }
        }
        return questionnaireItemPairs;
    }
    findItemWithLinkId(linkId) {
        const qItem = (0, refero_core_1.getQuestionnaireDefinitionItem)(linkId, this.questionnaire.item);
        if (!qItem)
            return null;
        const qrItems = (0, refero_core_1.getResponseItemAndPathWithLinkId)(linkId, this.questionnaireResponse);
        return {
            QuestionnaireItem: qItem,
            QuestionnaireResponseItems: qrItems,
        };
    }
}
exports.QuestionniareInspector = QuestionniareInspector;
//# sourceMappingURL=questionnaireInspector.js.map