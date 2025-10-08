"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionnaireItemsWithType = exports.getQuestionnaireDefinitionItemWithLinkid = exports.getQuestionnaireDefinitionItem = exports.getResponseItemWithPath = exports.getResponseItemAndPathWithLinkId = exports.shouldRenderDeleteButton = exports.createPathForItem = exports.createIdSuffix = exports.enableWhenMatchesAnswer = exports.hasAttachmentAnswer = exports.hasStringAnswer = exports.hasIntegerAnswer = exports.hasDecimalAnswer = exports.hasTimeAnswer = exports.hasDateTimeAnswer = exports.hasDateAnswer = exports.hasQuantityAnswer = exports.hasCodingAnswer = exports.hasBooleanAnswer = exports.hasAnswer = exports.getItemWithTypeFromArray = exports.getItemsWithIdFromResponseItemArray = exports.getItemWithIdFromResponseItemArray = exports.getDefinitionItems = exports.getResponseItems = exports.getAnswerFromResponseItem = exports.getArrayContainingResponseItemFromItems = exports.getQuestionnaireResponseItemsWithLinkId = exports.getQuestionnaireResponseItemWithLinkid = exports.isInGroupContext = exports.getRootQuestionnaireResponseItemFromData = void 0;
const tslib_1 = require("tslib");
const fhir_1 = require("../types/fhir");
const itemType_1 = tslib_1.__importDefault(require("../constants/itemType"));
const enableWhenMatcher_1 = require("../util/enableWhenMatcher");
const extension_1 = require("./extension");
function getRootQuestionnaireResponseItemFromData(definitionLinkId, formData) {
    if (!formData || !formData.Content) {
        return undefined;
    }
    const content = formData.Content;
    if (!content.item || content.item.length === 0) {
        return undefined;
    }
    return getItemWithIdFromResponseItemArray(definitionLinkId, content.item);
}
exports.getRootQuestionnaireResponseItemFromData = getRootQuestionnaireResponseItemFromData;
function isInGroupContext(path, item, items) {
    const pathItem = path && path.find(p => p.linkId === item.linkId && p.index !== undefined);
    if (!pathItem) {
        return true;
    }
    const repeatingItems = getItemWithIdFromResponseItemArray(item.linkId, items) || [];
    return repeatingItems.indexOf(item) === pathItem.index;
}
exports.isInGroupContext = isInGroupContext;
function getQuestionnaireResponseItemWithLinkid(linkId, responseItem, referencePath) {
    if (!responseItem) {
        return undefined;
    }
    if (responseItem.linkId === linkId) {
        return responseItem;
    }
    for (let i = 0; responseItem.item && i < responseItem.item.length; i++) {
        if (!isInGroupContext(referencePath, responseItem.item[i], responseItem.item)) {
            continue;
        }
        const item = getQuestionnaireResponseItemWithLinkid(linkId, responseItem.item[i], referencePath);
        if (item) {
            return item;
        }
    }
    for (let i = 0; responseItem.answer && i < responseItem.answer.length; i++) {
        const answer = responseItem.answer[i];
        for (let j = 0; answer.item && j < answer.item.length; j++) {
            if (!isInGroupContext(referencePath, answer.item[j], answer.item)) {
                continue;
            }
            const item = getQuestionnaireResponseItemWithLinkid(linkId, answer.item[j], referencePath);
            if (item) {
                return item;
            }
        }
    }
    return undefined;
}
exports.getQuestionnaireResponseItemWithLinkid = getQuestionnaireResponseItemWithLinkid;
function getQuestionnaireResponseItemsWithLinkId(linkId, responseItems, recursive = false) {
    if (!responseItems) {
        return [];
    }
    let itemsWithLinkId = getItemsWithIdFromResponseItemArray(linkId, responseItems, recursive);
    if (itemsWithLinkId && itemsWithLinkId.length > 0) {
        return itemsWithLinkId;
    }
    function collectAnswerItems(items) {
        if (items.length === 0)
            return [];
        let answers = [];
        answers = answers.concat(...items.map(i => i.answer || []));
        let subItems = [];
        subItems = subItems.concat(...items.map(i => i.item || []));
        return answers.concat(...collectAnswerItems(subItems));
    }
    const answers = collectAnswerItems(responseItems);
    let items = [];
    items = items.concat(...answers.map(a => a.item || []));
    itemsWithLinkId = getItemsWithIdFromResponseItemArray(linkId, items, false);
    return itemsWithLinkId;
}
exports.getQuestionnaireResponseItemsWithLinkId = getQuestionnaireResponseItemsWithLinkId;
function getArrayContainingResponseItemFromItems(linkId, items) {
    for (const item of items) {
        if (item.linkId === linkId) {
            return items;
        }
        if (item.item) {
            const result = getArrayContainingResponseItemFromItems(linkId, item.item);
            if (result)
                return result;
        }
        if (item.answer) {
            const result = getArrayContainingResponseItemFromAnswers(linkId, item.answer);
            if (result)
                return result;
        }
    }
    return undefined;
}
exports.getArrayContainingResponseItemFromItems = getArrayContainingResponseItemFromItems;
function getArrayContainingResponseItemFromAnswers(linkId, answers) {
    for (const answer of answers) {
        if (answer.item) {
            const result = getArrayContainingResponseItemFromItems(linkId, answer.item);
            if (result)
                return result;
        }
    }
    return undefined;
}
function getAnswerFromResponseItem(responseItem) {
    if (!responseItem) {
        return undefined;
    }
    if (!responseItem.answer || responseItem.answer.length === 0) {
        return undefined;
    }
    if (responseItem.answer.length > 1) {
        return responseItem.answer;
    }
    return responseItem.answer[0];
}
exports.getAnswerFromResponseItem = getAnswerFromResponseItem;
function getResponseItems(formData) {
    if (!formData || !formData.Content) {
        return undefined;
    }
    const response = formData.Content;
    if (!response.item || response.item.length === 0) {
        return undefined;
    }
    return response.item;
}
exports.getResponseItems = getResponseItems;
function getDefinitionItems(formDefinition) {
    if (!formDefinition || !formDefinition.Content) {
        return undefined;
    }
    const definition = formDefinition.Content;
    if (!definition.item || definition.item.length === 0) {
        return undefined;
    }
    return definition.item;
}
exports.getDefinitionItems = getDefinitionItems;
function getItemWithIdFromResponseItemArray(linkId, responseItems) {
    if (!responseItems || responseItems.length === 0) {
        return undefined;
    }
    const filteredItems = responseItems.filter(i => i.linkId === linkId);
    if (!filteredItems || filteredItems.length === 0) {
        return undefined;
    }
    return filteredItems;
}
exports.getItemWithIdFromResponseItemArray = getItemWithIdFromResponseItemArray;
function getItemsWithIdFromResponseItemArray(linkId, responseItems, recurse = false) {
    if (!responseItems || responseItems.length === 0) {
        return [];
    }
    const filteredItems = responseItems.filter(i => i.linkId === linkId);
    if (recurse) {
        const reducer = (acc, val) => {
            if (val.item) {
                acc.push(...getItemsWithIdFromResponseItemArray(linkId, val.item, recurse));
            }
            return acc;
        };
        return responseItems.reduce(reducer, filteredItems);
    }
    return filteredItems;
}
exports.getItemsWithIdFromResponseItemArray = getItemsWithIdFromResponseItemArray;
function getItemWithTypeFromArray(type, items) {
    if (!items || items.length === 0) {
        return undefined;
    }
    let filteredItems = [];
    if (type === itemType_1.default.ATTATCHMENT) {
        filteredItems = items.filter(i => i.answer && i.answer[0] && i.answer[0].valueAttachment !== null && i.answer[0].valueAttachment !== undefined);
    }
    if (!filteredItems || filteredItems.length === 0) {
        return undefined;
    }
    return filteredItems;
}
exports.getItemWithTypeFromArray = getItemWithTypeFromArray;
function hasAnswer(answer) {
    if (!answer) {
        return false;
    }
    return (hasBooleanAnswer(answer) ||
        hasCodingAnswer(answer) ||
        hasQuantityAnswer(answer) ||
        hasDateAnswer(answer) ||
        hasDateTimeAnswer(answer) ||
        hasTimeAnswer(answer) ||
        hasDecimalAnswer(answer) ||
        hasIntegerAnswer(answer) ||
        hasStringAnswer(answer) ||
        hasAttachmentAnswer(answer));
}
exports.hasAnswer = hasAnswer;
function hasBooleanAnswer(answer) {
    return answer.valueBoolean === true || answer.valueBoolean === false;
}
exports.hasBooleanAnswer = hasBooleanAnswer;
function hasCodingAnswer(answer) {
    const coding = answer.valueCoding;
    const codingValue = coding && coding.code ? String(coding.code) : null;
    return codingValue !== null && codingValue !== undefined && codingValue !== '';
}
exports.hasCodingAnswer = hasCodingAnswer;
function hasQuantityAnswer(answer) {
    return answer.valueQuantity != null && (!!answer.valueQuantity.value || answer.valueQuantity.value === 0);
}
exports.hasQuantityAnswer = hasQuantityAnswer;
function hasDateAnswer(answer) {
    return !!answer.valueDate;
}
exports.hasDateAnswer = hasDateAnswer;
function hasDateTimeAnswer(answer) {
    return !!answer.valueDateTime;
}
exports.hasDateTimeAnswer = hasDateTimeAnswer;
function hasTimeAnswer(answer) {
    return !!answer.valueTime;
}
exports.hasTimeAnswer = hasTimeAnswer;
function hasDecimalAnswer(answer) {
    return !!answer.valueDecimal || answer.valueDecimal === 0;
}
exports.hasDecimalAnswer = hasDecimalAnswer;
function hasIntegerAnswer(answer) {
    return !!answer.valueInteger || answer.valueInteger === 0;
}
exports.hasIntegerAnswer = hasIntegerAnswer;
function hasStringAnswer(answer) {
    return !!answer.valueString;
}
exports.hasStringAnswer = hasStringAnswer;
function hasAttachmentAnswer(answer) {
    return answer.valueAttachment != null && !!answer.valueAttachment.id;
}
exports.hasAttachmentAnswer = hasAttachmentAnswer;
function enableWhenMatchesAnswer(enableWhen, answers) {
    if (!enableWhen)
        return false;
    answers = answers || [];
    if (enableWhen.operator === fhir_1.QuestionnaireEnableOperator.Exists.code && enableWhen.answerBoolean === false) {
        return !answers.some(a => hasAnswer(a));
    }
    if (enableWhen.operator === fhir_1.QuestionnaireEnableOperator.Exists.code && enableWhen.answerBoolean === true) {
        return answers.some(a => hasAnswer(a));
    }
    if (answers.length === 0) {
        return false;
    }
    let matches = false;
    answers.forEach((answer) => {
        matches = matches || (0, enableWhenMatcher_1.enableWhenMatches)(enableWhen, answer);
    });
    return matches;
}
exports.enableWhenMatchesAnswer = enableWhenMatchesAnswer;
function createIdSuffix(path, index = 0, repeats) {
    let suffix = '';
    if (path) {
        path.forEach(p => {
            if (p.index) {
                suffix += '^' + p.index;
            }
        });
    }
    if (!repeats)
        return suffix;
    return suffix + '^' + index;
}
exports.createIdSuffix = createIdSuffix;
function createPathForItem(path, item, responseItem, index) {
    let newPath;
    if (path === null || path === undefined) {
        newPath = [];
    }
    else {
        newPath = copyPath(path);
    }
    index = item.repeats ? index : undefined;
    if (item && responseItem) {
        newPath.push(Object.assign({ linkId: responseItem.linkId }, (item.repeats && { index })));
    }
    return newPath;
}
exports.createPathForItem = createPathForItem;
function shouldRenderDeleteButton(item, index) {
    if (!item.repeats) {
        return false;
    }
    if (index === 0) {
        return false;
    }
    const minOccurs = (0, extension_1.getMinOccursExtensionValue)(item);
    if (minOccurs) {
        if (index >= minOccurs) {
            return true;
        }
    }
    else {
        return true;
    }
    return false;
}
exports.shouldRenderDeleteButton = shouldRenderDeleteButton;
function copyPath(path) {
    const newPath = [];
    for (let i = 0; i < path.length; i++) {
        newPath.push(Object.assign({}, path[i]));
    }
    return newPath;
}
function getResponseItemAndPathWithLinkId(linkId, item, currentPath = []) {
    var _a, _b;
    const response = [];
    let index = 0;
    const seen = {};
    for (const i of (_a = item.item) !== null && _a !== void 0 ? _a : []) {
        index = i.linkId in seen ? seen[i.linkId] : 0;
        response.push(...getResponseItemAndPathWithLinkIdTraverse(linkId, i, currentPath, index));
        seen[i.linkId] = index + 1;
    }
    if (isOfTypeQuestionnaireResponseItem(item)) {
        for (const answer of (_b = item.answer) !== null && _b !== void 0 ? _b : []) {
            if (answer.item) {
                for (const i of answer.item) {
                    index = i.linkId in seen ? seen[i.linkId] : 0;
                    response.push(...getResponseItemAndPathWithLinkIdTraverse(linkId, i, currentPath, index));
                    seen[i.linkId] = index + 1;
                }
            }
            else {
                if (item.linkId === linkId) {
                    response.push(...[{ item: item, path: copyPath(currentPath) }]);
                }
            }
        }
    }
    return response;
}
exports.getResponseItemAndPathWithLinkId = getResponseItemAndPathWithLinkId;
function getResponseItemAndPathWithLinkIdTraverse(linkId, item, currentPath, currentIndex) {
    currentPath.push({ linkId: item.linkId, index: currentIndex });
    let response = [];
    if (item.linkId === linkId) {
        response = [{ item: item, path: copyPath(currentPath) }];
    }
    else {
        response = getResponseItemAndPathWithLinkId(linkId, item, currentPath);
    }
    currentPath.pop();
    return response;
}
function isOfTypeQuestionnaireResponseItem(item) {
    return item.answer !== undefined;
}
function getResponseItemWithPath(path, formData) {
    if (!path || path.length === 0) {
        return undefined;
    }
    if (!formData.Content || !formData.Content.item) {
        return undefined;
    }
    const rootItems = getRootQuestionnaireResponseItemFromData(path[0].linkId, formData);
    if (!rootItems || rootItems.length === 0) {
        return undefined;
    }
    let item = rootItems[path[0].index || 0];
    for (let i = 1; i < path.length; i++) {
        let itemsWithLinkIdFromPath = getItemWithIdFromResponseItemArray(path[i].linkId, item.item);
        if (!itemsWithLinkIdFromPath || itemsWithLinkIdFromPath.length === 0) {
            const itemsFromAnswer = item.answer && item.answer.map(a => a.item).reduce((a, b) => (a || []).concat(b || []));
            itemsWithLinkIdFromPath = getItemWithIdFromResponseItemArray(path[i].linkId, itemsFromAnswer);
            if (!itemsWithLinkIdFromPath || itemsWithLinkIdFromPath.length === 0) {
                break;
            }
        }
        item = itemsWithLinkIdFromPath[path[i].index || 0];
    }
    return item;
}
exports.getResponseItemWithPath = getResponseItemWithPath;
function getQuestionnaireDefinitionItem(linkId, definitionItems) {
    let definitionItem;
    for (let i = 0; definitionItems && i < definitionItems.length; i++) {
        definitionItem = definitionItems[i];
        if (definitionItem.linkId !== linkId) {
            definitionItem = getQuestionnaireDefinitionItemWithLinkid(linkId, definitionItems[i]);
        }
        if (definitionItem === undefined || definitionItem === null) {
            continue;
        }
        break;
    }
    return definitionItem;
}
exports.getQuestionnaireDefinitionItem = getQuestionnaireDefinitionItem;
function getQuestionnaireDefinitionItemWithLinkid(linkId, definitionItem, index = 0) {
    if (!definitionItem) {
        return undefined;
    }
    const hasItems = definitionItem.item && definitionItem.item.length > 0;
    if (!hasItems) {
        return undefined;
    }
    const itemsWithLinkId = getQuestionnaireItemWithIdFromArray(linkId, definitionItem.item);
    if (itemsWithLinkId && itemsWithLinkId.length >= index) {
        return itemsWithLinkId[index];
    }
    for (let i = 0; definitionItem.item && i < definitionItem.item.length; i++) {
        const item = getQuestionnaireDefinitionItemWithLinkid(linkId, definitionItem.item[i]);
        if (item) {
            return item;
        }
    }
}
exports.getQuestionnaireDefinitionItemWithLinkid = getQuestionnaireDefinitionItemWithLinkid;
function getQuestionnaireItemWithIdFromArray(linkId, items) {
    if (!items || items.length === 0) {
        return undefined;
    }
    const filteredItems = items.filter(i => i.linkId === linkId);
    if (!filteredItems || filteredItems.length === 0) {
        return undefined;
    }
    return filteredItems;
}
function getQuestionnaireItemsWithType(type, items, itemsWithType) {
    if (items === undefined)
        return;
    if (!itemsWithType)
        itemsWithType = [];
    getItemLinkIdsWithType(type, items, itemsWithType);
    items.forEach(item => getQuestionnaireItemsWithType(type, item.item, itemsWithType));
    return itemsWithType;
}
exports.getQuestionnaireItemsWithType = getQuestionnaireItemsWithType;
function getItemLinkIdsWithType(type, items, itemsWithType) {
    if (items !== undefined) {
        items
            .filter(f => f.type === type)
            .forEach(f => itemsWithType.push(f));
    }
}
//# sourceMappingURL=refero-core.js.map