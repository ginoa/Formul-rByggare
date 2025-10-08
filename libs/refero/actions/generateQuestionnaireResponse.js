"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestionnaireResponseItem = exports.generateQuestionnaireResponse = void 0;
const tslib_1 = require("tslib");
const index_1 = tslib_1.__importDefault(require("../constants/index"));
const itemType_1 = tslib_1.__importDefault(require("../constants/itemType"));
const status_1 = tslib_1.__importDefault(require("../constants/status"));
const createQuestionnaireResponseAnswer_1 = require("../util/createQuestionnaireResponseAnswer");
const extension_1 = require("../util/extension");
function generateQuestionnaireResponse(questionnaire) {
    const response = {
        resourceType: index_1.default.QUESTIONNAIRE_RESPONSE_RESOURCE_TYPE,
        status: status_1.default.questionnaireResponse.IN_PROGRESS,
    };
    if (!questionnaire || !questionnaire.item || questionnaire.item.length === 0) {
        return response;
    }
    if (questionnaire.url) {
        response.questionnaire = questionnaire.url;
    }
    questionnaire.item.forEach(i => {
        if (!response.item) {
            response.item = [];
        }
        for (let j = 0; j < getMinOccurs(i); j++) {
            const responseItem = createQuestionnaireResponseItem(i);
            addChildrenItemsToResponseItem(i, responseItem);
            response.item.push(responseItem);
        }
    });
    return response;
}
exports.generateQuestionnaireResponse = generateQuestionnaireResponse;
function addChildrenItemsToResponseItem(item, response) {
    if (!item.item || item.item.length === 0) {
        return;
    }
    item.item.forEach((i) => {
        for (let j = 0; j < getMinOccurs(i); j++) {
            const responseItem = createQuestionnaireResponseItem(i);
            addChildrenItemsToResponseItem(i, responseItem);
            addResponseItemtoResponse(item, response, responseItem);
        }
    });
}
function getMinOccurs(i) {
    if (i.type === itemType_1.default.ATTATCHMENT) {
        return 1;
    }
    const minoccurs = (0, extension_1.getMinOccursExtensionValue)(i);
    if (minoccurs && i.repeats) {
        return minoccurs;
    }
    return 1;
}
function addResponseItemtoResponse(questionnaireItem, responseItemForQuestionnaire, itemToAdd) {
    if (questionnaireItem.type === 'group') {
        if (!responseItemForQuestionnaire.item) {
            responseItemForQuestionnaire.item = [];
        }
        responseItemForQuestionnaire.item.push(itemToAdd);
    }
    else {
        if (!responseItemForQuestionnaire.answer) {
            responseItemForQuestionnaire.answer = [];
        }
        if (responseItemForQuestionnaire.answer.length === 0) {
            responseItemForQuestionnaire.answer.push({});
        }
        const answer = responseItemForQuestionnaire.answer[0];
        if (!answer.item) {
            answer.item = [];
        }
        answer.item.push(itemToAdd);
    }
}
function createQuestionnaireResponseItem(item) {
    const responseItem = Object.assign({ linkId: item.linkId }, (item.text && { text: item.text }));
    const answer = (0, createQuestionnaireResponseAnswer_1.createQuestionnaireResponseAnswer)(item);
    if (answer) {
        responseItem.answer = [answer];
    }
    return responseItem;
}
exports.createQuestionnaireResponseItem = createQuestionnaireResponseItem;
//# sourceMappingURL=generateQuestionnaireResponse.js.map