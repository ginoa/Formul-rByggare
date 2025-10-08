"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nullAnswerValue = exports.getFormDefinition = exports.getFormData = void 0;
const tslib_1 = require("tslib");
const immer_1 = tslib_1.__importStar(require("immer"));
const fhir_1 = require("../types/fhir");
const languages_1 = require("@helsenorge/core-utils/constants/languages");
const form_1 = require("../actions/form");
const generateQuestionnaireResponse_1 = require("../actions/generateQuestionnaireResponse");
const newValue_1 = require("../actions/newValue");
const syncQuestionnaireResponse_1 = require("../actions/syncQuestionnaireResponse");
const createQuestionnaireResponseAnswer_1 = require("../util/createQuestionnaireResponseAnswer");
const extension_1 = require("../util/extension");
const index_1 = require("../util/index");
const refero_core_1 = require("../util/refero-core");
(0, immer_1.enableES5)();
const initialState = {
    FormData: {
        Content: null,
    },
    FormDefinition: {
        Content: null,
    },
    Language: languages_1.LanguageLocales.NORWEGIAN.toLowerCase(),
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case newValue_1.NEW_VALUE:
            return processNewValueAction(action, state);
        case newValue_1.REMOVE_ATTACHMENT_VALUE:
            return processRemoveAttachmentValueAction(action, state);
        case newValue_1.REMOVE_CODING_VALUE:
            return processRemoveCodingValueAction(action, state);
        case newValue_1.NEW_CODINGSTRING_VALUE:
            return processNewCodingStringValueAction(action, state);
        case newValue_1.REMOVE_CODINGSTRING_VALUE:
            return processRemoveCodingStringValueAction(action, state);
        case newValue_1.ADD_REPEAT_ITEM:
            return processAddRepeatItemAction(action, state);
        case newValue_1.DELETE_REPEAT_ITEM:
            return processDeleteRepeatItemAction(action, state);
        case form_1.SET_SKJEMA_DEFINITION:
            return processSetSkjemaDefinition(action, state);
        default:
            return state;
    }
}
exports.default = reducer;
function getFormData(state) {
    if (!state.refero.form.FormData) {
        return null;
    }
    return state.refero.form.FormData;
}
exports.getFormData = getFormData;
function getArrayToAddGroupTo(itemToAddTo) {
    if (!itemToAddTo) {
        return undefined;
    }
    if (itemToAddTo.answer) {
        return itemToAddTo.answer[0].item;
    }
    else if (itemToAddTo.item) {
        return itemToAddTo.item;
    }
}
function processAddRepeatItemAction(action, state) {
    return (0, immer_1.default)(state, draft => {
        if (!action.parentPath) {
            return state;
        }
        let arrayToAddItemTo = [];
        if (action.parentPath.length === 0 && draft.FormData.Content) {
            arrayToAddItemTo = draft.FormData.Content.item;
        }
        else if (action.parentPath.length > 0) {
            const itemToAddTo = (0, refero_core_1.getResponseItemWithPath)(action.parentPath, draft.FormData);
            arrayToAddItemTo = getArrayToAddGroupTo(itemToAddTo);
        }
        if (!arrayToAddItemTo || arrayToAddItemTo.length === 0) {
            return;
        }
        if (!action.responseItems || action.responseItems.length === 0) {
            return;
        }
        const newItem = copyItem(action.responseItems[0], undefined, draft.FormDefinition.Content, state.FormDefinition.Content);
        if (!newItem) {
            return;
        }
        const indexToInsert = arrayToAddItemTo.map(o => o.linkId).lastIndexOf(newItem.linkId);
        arrayToAddItemTo.splice(indexToInsert + 1, 0, newItem);
    });
}
function processDeleteRepeatItemAction(action, state) {
    return (0, immer_1.default)(state, draft => {
        if (!action.itemPath) {
            return state;
        }
        let arrayToDeleteItem = [];
        if (action.itemPath.length === 1 && draft.FormData.Content) {
            arrayToDeleteItem = draft.FormData.Content.item;
        }
        else if (action.itemPath.length > 0) {
            const parentPath = action.itemPath.slice(0, -1);
            const itemToAddTo = (0, refero_core_1.getResponseItemWithPath)(parentPath, draft.FormData);
            arrayToDeleteItem = getArrayToAddGroupTo(itemToAddTo);
        }
        if (!arrayToDeleteItem || arrayToDeleteItem.length === 0) {
            return;
        }
        if (!action.item) {
            return;
        }
        const definitionLinkId = action.item.linkId;
        const index = action.itemPath[action.itemPath.length - 1].index;
        let itemIndexInArray = 0;
        for (let i = 0; i <= arrayToDeleteItem.length - 1; i++) {
            if (arrayToDeleteItem[i].linkId === definitionLinkId) {
                if (itemIndexInArray === index) {
                    arrayToDeleteItem.splice(i, 1);
                    break;
                }
                itemIndexInArray++;
            }
        }
    });
}
function copyItem(source, target, questionnaireDraft, questionnaire) {
    var _a, _b;
    if (!target) {
        target = { linkId: source.linkId };
        if (source.text) {
            target.text = source.text;
        }
    }
    for (let i = 0; source.item && i < source.item.length; i++) {
        if (!target.item) {
            target.item = [];
        }
        const newResponseItem = {
            linkId: source.item[i].linkId,
        };
        if (source.item[i].text) {
            newResponseItem.text = source.item[i].text;
        }
        const numberOfItemsWithSameLinkId = target.item.filter(item => item.linkId === newResponseItem.linkId).length;
        if (numberOfItemsWithSameLinkId > 0) {
            const defItem = (0, refero_core_1.getQuestionnaireDefinitionItem)(newResponseItem.linkId, questionnaireDraft.item);
            const minOccurs = defItem ? (0, extension_1.getMinOccursExtensionValue)(defItem) || 1 : 1;
            if (numberOfItemsWithSameLinkId >= minOccurs) {
                continue;
            }
        }
        target.item.push(newResponseItem);
        copyItem(source.item[i], newResponseItem, questionnaireDraft, questionnaire);
    }
    const defItem = (0, refero_core_1.getQuestionnaireDefinitionItem)(source.linkId, questionnaireDraft.item);
    if (defItem && defItem.type !== 'attachment') {
        for (let i = 0; source.answer && i < source.answer.length; i++) {
            if (!source.answer[i].item || ((_a = source.answer[i].item) === null || _a === void 0 ? void 0 : _a.length) === 0)
                continue;
            if (!target.answer) {
                target.answer = [];
            }
            const answer = source.answer[i];
            const targetAnswer = {
                item: [],
            };
            for (let j = 0; answer && answer.item && j < answer.item.length; j++) {
                const newResponseItem = {
                    linkId: answer.item[j].linkId,
                    answer: getInitialAnswerForCopyItem(source, questionnaire, answer.item[j]),
                    text: (_b = answer.item[j]) === null || _b === void 0 ? void 0 : _b.text,
                };
                targetAnswer.item.push(newResponseItem);
                target.text = source.text;
                copyItem(answer.item[j], newResponseItem, questionnaireDraft, questionnaire);
            }
            target.answer.push(targetAnswer);
        }
    }
    return target;
}
function getInitialAnswerForCopyItem(source, questionnaire, qrItem) {
    let initialAnswer = undefined;
    const item = (0, refero_core_1.getQuestionnaireDefinitionItem)(source.linkId, questionnaire.item);
    if (item) {
        const qitem = (0, refero_core_1.getQuestionnaireDefinitionItemWithLinkid)(qrItem.linkId, item);
        if (qitem) {
            initialAnswer = (0, createQuestionnaireResponseAnswer_1.createQuestionnaireResponseAnswer)(qitem);
        }
    }
    return initialAnswer !== undefined ? [initialAnswer] : [];
}
function runEnableWhen(action, state, draft) {
    if (action.item && draft.FormData.Content) {
        const qrItemsToClear = [];
        const responseItems = (0, refero_core_1.getResponseItems)(draft.FormData);
        const calculatedResponseItems = JSON.parse(JSON.stringify(responseItems));
        calculateEnableWhenItemsToClear([action.item], state.FormData, state.FormDefinition, action.itemPath, qrItemsToClear, calculatedResponseItems);
        if (responseItems && responseItems.length > 0) {
            for (let w = 0; w < qrItemsToClear.length; w++) {
                const qrItemWithEnableWhen = getResponseItemWithLinkIdPossiblyContainingRepeat(qrItemsToClear[w].linkId, responseItems, action.itemPath);
                if (qrItemWithEnableWhen) {
                    removeAddedRepeatingItems(qrItemsToClear[w].qItemWithEnableWhen, qrItemWithEnableWhen, responseItems);
                    wipeAnswerItems(qrItemWithEnableWhen, qrItemsToClear[w].qItemWithEnableWhen);
                }
                else {
                    const qrItemWithEnableWhen = (0, refero_core_1.getResponseItemAndPathWithLinkId)(qrItemsToClear[w].linkId, draft.FormData.Content);
                    for (let r = 0; r < qrItemWithEnableWhen.length; r++) {
                        removeAddedRepeatingItems(qrItemsToClear[w].qItemWithEnableWhen, qrItemWithEnableWhen[r].item, responseItems);
                        wipeAnswerItems(qrItemWithEnableWhen[r].item, qrItemsToClear[w].qItemWithEnableWhen);
                    }
                }
            }
        }
    }
}
function processRemoveCodingValueAction(action, state) {
    return (0, immer_1.default)(state, draft => {
        const responseItem = (0, refero_core_1.getResponseItemWithPath)(action.itemPath || [], draft.FormData);
        if (!responseItem || !responseItem.answer || !responseItem.answer.length) {
            return;
        }
        if (action.valueCoding) {
            responseItem.answer = responseItem.answer
                .map(el => {
                if (el && el.item && el.valueCoding && el.valueCoding.code && action.valueCoding) {
                    return {
                        item: el.item,
                    };
                }
                return el;
            })
                .filter(el => {
                if (el && el.valueCoding && el.valueCoding.code && action.valueCoding) {
                    return el.valueCoding.code !== action.valueCoding.code;
                }
                return true;
            });
            if (responseItem.answer.length === 0) {
                delete responseItem.answer;
            }
        }
        runEnableWhen(action, state, draft);
    });
}
function processRemoveCodingStringValueAction(action, state) {
    return (0, immer_1.default)(state, draft => {
        const responseItem = (0, refero_core_1.getResponseItemWithPath)(action.itemPath || [], draft.FormData);
        if (!responseItem || !responseItem.answer || !responseItem.answer.length) {
            return;
        }
        responseItem.answer = responseItem.answer.filter(el => {
            return el && el.valueString ? false : true;
        });
        if (responseItem.answer.length === 0) {
            delete responseItem.answer;
        }
        runEnableWhen(action, state, draft);
    });
}
function processRemoveAttachmentValueAction(action, state) {
    return (0, immer_1.default)(state, draft => {
        const responseItem = (0, refero_core_1.getResponseItemWithPath)(action.itemPath || [], draft.FormData);
        if (!responseItem || !responseItem.answer || !responseItem.answer.length) {
            return;
        }
        if (action.valueAttachment) {
            const attachmentToRemove = action.valueAttachment.url;
            responseItem.answer = responseItem.answer.filter(el => el && el.valueAttachment && el.valueAttachment.url !== attachmentToRemove);
        }
        if (responseItem.answer.length === 0) {
            delete responseItem.answer;
        }
    });
}
function processNewValueAction(action, state) {
    return (0, immer_1.default)(state, draft => {
        const responseItem = (0, refero_core_1.getResponseItemWithPath)(action.itemPath || [], draft.FormData);
        if (!responseItem) {
            return;
        }
        let hasAnswer = false;
        if (!responseItem.answer) {
            responseItem.answer = [];
        }
        let answer = responseItem.answer[0];
        if (!answer) {
            answer = {};
            responseItem.answer.push(answer);
        }
        if (action.valueBoolean !== undefined) {
            hasAnswer = true;
            answer.valueBoolean = action.valueBoolean;
        }
        if (action.valueDecimal !== undefined && !isNaN(action.valueDecimal)) {
            hasAnswer = true;
            answer.valueDecimal = action.valueDecimal;
        }
        if (action.valueInteger !== undefined && !isNaN(action.valueInteger)) {
            hasAnswer = true;
            answer.valueInteger = action.valueInteger;
        }
        if (!(0, index_1.isStringEmpty)(action.valueDate)) {
            hasAnswer = true;
            answer.valueDate = action.valueDate;
        }
        if (!(0, index_1.isStringEmpty)(action.valueDateTime)) {
            hasAnswer = true;
            answer.valueDateTime = action.valueDateTime;
        }
        if (!(0, index_1.isStringEmpty)(action.valueTime)) {
            hasAnswer = true;
            answer.valueTime = action.valueTime;
        }
        if (!(0, index_1.isStringEmpty)(action.valueString)) {
            hasAnswer = true;
            answer.valueString = action.valueString;
        }
        if (action.valueQuantity && action.valueQuantity.value !== undefined) {
            hasAnswer = true;
            answer.valueQuantity = action.valueQuantity;
        }
        if (action.valueCoding) {
            hasAnswer = true;
            const coding = {
                code: action.valueCoding.code,
                display: action.valueCoding.display,
            };
            if (action.valueCoding.system !== undefined && action.valueCoding.system !== null) {
                coding.system = action.valueCoding.system;
            }
            if (action.multipleAnswers) {
                if (Object.keys(answer).length === 0) {
                    answer.valueCoding = coding;
                }
                else {
                    const newAnswer = {};
                    newAnswer.valueCoding = coding;
                    responseItem.answer.push(newAnswer);
                }
            }
            else {
                answer.valueCoding = coding;
            }
        }
        if (action.valueAttachment && Object.keys(action.valueAttachment).length > 0) {
            hasAnswer = true;
            const attachment = {
                url: action.valueAttachment.url,
                title: action.valueAttachment.title,
                data: action.valueAttachment.data,
                contentType: action.valueAttachment.contentType,
                creation: action.valueAttachment.creation,
                hash: action.valueAttachment.hash,
                size: action.valueAttachment.size,
                language: action.valueAttachment.language,
            };
            if (action.multipleAnswers) {
                if (Object.keys(answer).length === 0) {
                    answer.valueAttachment = attachment;
                }
                else {
                    const newAnswer = {};
                    newAnswer.valueAttachment = attachment;
                    responseItem.answer.push(newAnswer);
                }
            }
            else {
                answer.valueAttachment = attachment;
            }
        }
        if (!hasAnswer) {
            nullAnswerValue(answer);
            if (Object.keys(answer).filter(prop => !prop.startsWith('value')).length === 0) {
                if (responseItem.answer && responseItem.answer.length === 1) {
                    delete responseItem.answer;
                }
            }
        }
        runEnableWhen(action, state, draft);
    });
}
function processNewCodingStringValueAction(action, state) {
    return (0, immer_1.default)(state, draft => {
        const responseItem = (0, refero_core_1.getResponseItemWithPath)(action.itemPath || [], draft.FormData);
        if (!responseItem) {
            return;
        }
        if (!responseItem.answer) {
            responseItem.answer = [];
        }
        if (!(0, index_1.isStringEmpty)(action.valueString)) {
            let found = -1;
            for (let i = 0; i < responseItem.answer.length; i++) {
                if (!(0, index_1.isStringEmpty)(responseItem.answer[i].valueString)) {
                    found = i;
                    break;
                }
            }
            const newAnswer = {
                valueString: action.valueString,
            };
            if (found >= 0) {
                responseItem.answer[found] = newAnswer;
            }
            else {
                responseItem.answer.push(newAnswer);
            }
        }
    });
}
function getResponseItemWithLinkIdPossiblyContainingRepeat(linkId, items, path) {
    const findResponseItem = (linkId, items) => {
        for (const item of items) {
            const result = (0, refero_core_1.getQuestionnaireResponseItemWithLinkid)(linkId, item, path || []);
            if (result)
                return result;
        }
    };
    return findResponseItem(linkId, items);
}
function calculateEnableWhenItemsToClear(items, formData, formDefinition, path, qrItemsToClear, responseItems) {
    if (!items || !formData.Content) {
        return;
    }
    const definitionItems = (0, refero_core_1.getDefinitionItems)(formDefinition);
    if (!responseItems || responseItems.length === 0) {
        return;
    }
    const qitemsWithEnableWhen = [];
    for (let i = 0; i < items.length; i++) {
        if (definitionItems) {
            qitemsWithEnableWhen.push(...getItemsWithEnableWhen(items[i].linkId, definitionItems));
        }
    }
    if (!qitemsWithEnableWhen || qitemsWithEnableWhen.length === 0) {
        return;
    }
    for (const qItemWithEnableWhen of qitemsWithEnableWhen) {
        const enableWhenClauses = qItemWithEnableWhen.enableWhen;
        if (!enableWhenClauses) {
            continue;
        }
        const qrItemsWithEnableWhen = (0, refero_core_1.getResponseItemAndPathWithLinkId)(qItemWithEnableWhen.linkId, formData.Content);
        for (const qrItemWithEnableWhen of qrItemsWithEnableWhen) {
            const enableMatches = [];
            const enableBehavior = qItemWithEnableWhen.enableBehavior;
            enableWhenClauses.forEach((enableWhen) => {
                const enableWhenQuestionItem = (0, refero_core_1.getQuestionnaireDefinitionItem)(enableWhen.question, definitionItems);
                if (!enableWhenQuestionItem)
                    return;
                const responseItem = getResponseItemWithLinkIdPossiblyContainingRepeat(enableWhen.question, responseItems, path);
                if (responseItem) {
                    const matchesAnswer = (0, refero_core_1.enableWhenMatchesAnswer)(enableWhen, responseItem.answer);
                    enableMatches.push(matchesAnswer);
                }
            });
            const enable = enableBehavior === fhir_1.QuestionnaireItemEnableBehaviorCodes.ALL
                ? enableMatches.every(x => x === true)
                : enableMatches.some(x => x === true);
            if (!enable) {
                const item = getResponseItemWithLinkIdPossiblyContainingRepeat(qrItemWithEnableWhen.item.linkId, responseItems, path);
                if (item) {
                    removeAddedRepeatingItems(qItemWithEnableWhen, item, responseItems);
                    wipeAnswerItems(item, qItemWithEnableWhen);
                }
                qrItemsToClear.push({
                    qItemWithEnableWhen: qItemWithEnableWhen,
                    linkId: qrItemWithEnableWhen.item.linkId,
                });
            }
        }
    }
    calculateEnableWhenItemsToClear(qitemsWithEnableWhen, formData, formDefinition, path, qrItemsToClear, responseItems);
    qitemsWithEnableWhen.forEach(i => i.item && calculateEnableWhenItemsToClear(i.item, formData, formDefinition, path, qrItemsToClear, responseItems));
}
function removeAddedRepeatingItems(defItem, repeatingItemLinkId, responseItems) {
    if (defItem.repeats) {
        const arrayToDeleteItem = (0, refero_core_1.getArrayContainingResponseItemFromItems)(repeatingItemLinkId.linkId, responseItems);
        const minOccurs = (0, extension_1.getMinOccursExtensionValue)(defItem);
        if (arrayToDeleteItem) {
            const keepThreshold = minOccurs ? minOccurs : 1;
            let repeatingItemIndex = arrayToDeleteItem.filter(item => item.linkId === repeatingItemLinkId.linkId).length;
            for (let i = arrayToDeleteItem.length - 1; i >= 0; i--) {
                const e = arrayToDeleteItem[i];
                if (e.linkId === defItem.linkId) {
                    if (repeatingItemIndex > keepThreshold) {
                        arrayToDeleteItem.splice(i, 1);
                    }
                    repeatingItemIndex--;
                }
            }
        }
    }
}
function getFormDefinition(state) {
    if (!state.refero.form.FormDefinition) {
        return null;
    }
    return state.refero.form.FormDefinition;
}
exports.getFormDefinition = getFormDefinition;
function wipeAnswerItems(answerItem, item) {
    if (!answerItem || !item) {
        return undefined;
    }
    if (answerItem.answer) {
        answerItem.answer.forEach(answer => {
            resetAnswerValue(answer, item);
        });
        for (let i = answerItem.answer.length - 1; i >= 0; i--) {
            const a = answerItem.answer[i];
            if (Object.keys(a).length === 0)
                answerItem.answer.splice(i, 1);
        }
    }
    for (let i = 0; answerItem.item && item.item && i < answerItem.item.length; i++) {
        wipeAnswerItems(answerItem.item[i], item.item[i]);
    }
    for (let i = 0; answerItem.answer && item.item && i < answerItem.answer.length; i++) {
        const nestedItems = answerItem.answer[i].item;
        if (nestedItems && nestedItems.length > 0) {
            for (let j = 0; j < nestedItems.length; j++) {
                wipeAnswerItems(nestedItems[j], item.item[i]);
            }
        }
    }
}
function resetAnswerValue(answer, item) {
    const initialAnswer = (0, createQuestionnaireResponseAnswer_1.createQuestionnaireResponseAnswer)(item);
    nullAnswerValue(answer, initialAnswer);
}
function nullAnswerValue(answer, initialAnswer = undefined) {
    if (!answer) {
        return undefined;
    }
    if (answer.valueBoolean !== undefined) {
        initialAnswer ? (answer.valueBoolean = initialAnswer.valueBoolean) : (answer.valueBoolean = false);
    }
    else if (answer.valueCoding !== undefined) {
        initialAnswer ? (answer.valueCoding = initialAnswer.valueCoding) : delete answer.valueCoding;
    }
    else if (answer.valueDate !== undefined) {
        initialAnswer ? (answer.valueDate = initialAnswer.valueDate) : delete answer.valueDate;
    }
    else if (answer.valueDateTime !== undefined) {
        initialAnswer ? (answer.valueDateTime = initialAnswer.valueDateTime) : delete answer.valueDateTime;
    }
    else if (answer.valueDecimal !== undefined) {
        initialAnswer ? (answer.valueDecimal = initialAnswer.valueDecimal) : delete answer.valueDecimal;
    }
    else if (answer.valueInteger !== undefined) {
        initialAnswer ? (answer.valueInteger = initialAnswer.valueInteger) : delete answer.valueInteger;
    }
    else if (answer.valueString !== undefined) {
        initialAnswer ? (answer.valueString = initialAnswer.valueString) : delete answer.valueString;
    }
    else if (answer.valueTime !== undefined) {
        initialAnswer ? (answer.valueTime = initialAnswer.valueTime) : delete answer.valueTime;
    }
    else if (answer.valueQuantity !== undefined) {
        initialAnswer ? (answer.valueQuantity = initialAnswer.valueQuantity) : delete answer.valueQuantity;
    }
    else if (answer.valueAttachment !== undefined) {
        initialAnswer ? (answer.valueAttachment = initialAnswer.valueAttachment) : delete answer.valueAttachment;
    }
}
exports.nullAnswerValue = nullAnswerValue;
function getItemsWithEnableWhen(linkId, definitionItems) {
    const relatedItems = [];
    const getQuestionnaireItemHasEnableWhenLinkid = function (linkId, definitionItem) {
        if (!definitionItem) {
            return undefined;
        }
        const hasItems = definitionItem.item && definitionItem.item.length > 0;
        if (!hasItems) {
            return undefined;
        }
        const itemsEnableWhenMatchLinkId = getItemEnableWhenQuestionMatchIdFromArray(linkId, definitionItem.item);
        if (itemsEnableWhenMatchLinkId && itemsEnableWhenMatchLinkId.length >= 0) {
            itemsEnableWhenMatchLinkId.forEach(i => {
                relatedItems.push(i);
            });
        }
        for (let i = 0; definitionItem.item && i < definitionItem.item.length; i++) {
            getQuestionnaireItemHasEnableWhenLinkid(linkId, definitionItem.item[i]);
        }
    };
    for (let k = 0; k < definitionItems.length; k++) {
        const enableWhen = definitionItems[k].enableWhen;
        if (enableWhen) {
            for (let n = 0; n < enableWhen.length; n++) {
                if (enableWhen[n].question === linkId) {
                    relatedItems.push(definitionItems[k]);
                }
            }
        }
        getQuestionnaireItemHasEnableWhenLinkid(linkId, definitionItems[k]);
    }
    return relatedItems;
}
function getItemEnableWhenQuestionMatchIdFromArray(linkId, definitionItems) {
    if (!definitionItems) {
        return [];
    }
    const matchedItems = [];
    for (let i = 0; i < definitionItems.length; i++) {
        const enableWhen = definitionItems[i].enableWhen;
        if (!enableWhen) {
            continue;
        }
        for (let j = 0; j < enableWhen.length; j++) {
            if (enableWhen[j].question === linkId) {
                matchedItems.push(definitionItems[i]);
            }
        }
    }
    return matchedItems;
}
function processSetSkjemaDefinition(action, state) {
    if (!action.questionnaire) {
        return state;
    }
    const formDefinition = {
        Content: action.questionnaire,
    };
    let formData;
    if (action.questionnaireResponse && action.syncQuestionnaireResponse) {
        formData = { Content: (0, syncQuestionnaireResponse_1.syncQuestionnaireResponse)(action.questionnaire, action.questionnaireResponse) };
    }
    else if (action.questionnaireResponse) {
        formData = { Content: action.questionnaireResponse };
    }
    else if (state.FormData === initialState.FormData) {
        formData = { Content: (0, generateQuestionnaireResponse_1.generateQuestionnaireResponse)(action.questionnaire) };
    }
    else {
        formData = state.FormData;
    }
    return Object.assign(Object.assign({}, state), { FormDefinition: formDefinition, FormData: formData, Language: action.language || state.Language });
}
//# sourceMappingURL=form.js.map