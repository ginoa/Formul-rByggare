"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncQuestionnaireResponse = void 0;
const tslib_1 = require("tslib");
const itemType_1 = tslib_1.__importDefault(require("../constants/itemType"));
const refero_core_1 = require("../util/refero-core");
const generateQuestionnaireResponse_1 = require("./generateQuestionnaireResponse");
function createNewItem(qItem) {
    const qrItem = (0, generateQuestionnaireResponse_1.createQuestionnaireResponseItem)(qItem);
    synQuestionnaireResponseItem(qItem, qrItem);
    return qrItem;
}
function copyItem(qItem, qrItem) {
    synQuestionnaireResponseItem(qItem, qrItem);
    return qrItem;
}
function syncQuestionnaireResponse(q, qr) {
    const qrItemCopy = [];
    const qrItems = createDictionary(qr.item || []);
    for (const qItem of q.item || []) {
        const linkId = qItem.linkId;
        if (qrItems[linkId]) {
            if (hasChanged(qItem, qrItems[linkId])) {
                qrItemCopy.push(createNewItem(qItem));
            }
            else {
                for (const qrItem of qrItems[linkId]) {
                    qrItemCopy.push(copyItem(qItem, qrItem));
                }
            }
        }
        else {
            qrItemCopy.push(createNewItem(qItem));
        }
    }
    qr.item = qrItemCopy;
    return qr;
}
exports.syncQuestionnaireResponse = syncQuestionnaireResponse;
function synQuestionnaireResponseItem(qItem, qrItem) {
    const qrItemCopy = [];
    const qrAnswerItemCopy = [];
    const qrItems = createDictionary(qrItem.item || []);
    const qrAnswerItems = createDictionary(qrItem.answer && qrItem.answer[0].item ? qrItem.answer[0].item : []);
    for (const subQItem of qItem.item || []) {
        const linkId = subQItem.linkId;
        if (qrItems[linkId]) {
            if (hasChanged(subQItem, qrItems[linkId])) {
                qrItemCopy.push(createNewItem(subQItem));
            }
            else {
                for (const subQrItem of qrItems[linkId]) {
                    qrItemCopy.push(copyItem(subQItem, subQrItem));
                }
            }
        }
        else if (qrAnswerItems[linkId]) {
            if (hasChanged(subQItem, qrAnswerItems[linkId])) {
                qrAnswerItemCopy.push(createNewItem(subQItem));
            }
            else {
                for (const subQrItem of qrAnswerItems[linkId]) {
                    qrAnswerItemCopy.push(copyItem(subQItem, subQrItem));
                }
            }
        }
        else {
            const newQrItem = createNewItem(subQItem);
            if (qItem.type == itemType_1.default.GROUP) {
                qrItemCopy.push(newQrItem);
            }
            else {
                qrAnswerItemCopy.push(newQrItem);
            }
        }
    }
    if (qrItemCopy.length > 0) {
        qrItem.item = qrItemCopy;
    }
    else {
        delete qrItem.item;
    }
    if (qrAnswerItemCopy.length > 0) {
        if (!qrItem.answer) {
            qrItem.answer = [];
        }
        if (!qrItem.answer[0]) {
            qrItem.answer.push({});
        }
        qrItem.answer[0].item = qrAnswerItemCopy;
    }
    else {
        if (qrItem.answer && qrItem.answer.length > 0) {
            delete qrItem.answer[0].item;
        }
    }
}
function hasChanged(qItem, qrItems) {
    const qrItemWithAnswer = qrItems.find(it => it.answer && it.answer.some(a => (0, refero_core_1.hasAnswer)(a)));
    if (!qrItemWithAnswer || !qrItemWithAnswer.answer)
        return false;
    const answer = qrItemWithAnswer.answer.find(it => (0, refero_core_1.hasAnswer)(it));
    if (!answer) {
        return false;
    }
    return !itemTypeMatchesAnswerValue(qItem.type, answer);
}
function itemTypeMatchesAnswerValue(type, answer) {
    switch (type) {
        case itemType_1.default.ATTATCHMENT:
            return (0, refero_core_1.hasAttachmentAnswer)(answer);
        case itemType_1.default.BOOLEAN:
            return (0, refero_core_1.hasBooleanAnswer)(answer);
        case itemType_1.default.CHOICE:
            return (0, refero_core_1.hasCodingAnswer)(answer);
        case itemType_1.default.DATE:
            return (0, refero_core_1.hasDateAnswer)(answer);
        case itemType_1.default.DATETIME:
            return (0, refero_core_1.hasDateTimeAnswer)(answer);
        case itemType_1.default.DECIMAL:
            return (0, refero_core_1.hasDecimalAnswer)(answer);
        case itemType_1.default.DISPLAY:
        case itemType_1.default.GROUP:
            return false;
        case itemType_1.default.INTEGER:
            return (0, refero_core_1.hasIntegerAnswer)(answer);
        case itemType_1.default.OPENCHOICE:
            return (0, refero_core_1.hasCodingAnswer)(answer) || (0, refero_core_1.hasStringAnswer)(answer);
        case itemType_1.default.QUANTITY:
            return (0, refero_core_1.hasQuantityAnswer)(answer);
        case itemType_1.default.STRING:
        case itemType_1.default.TEXT:
            return (0, refero_core_1.hasStringAnswer)(answer);
        case itemType_1.default.TIME:
            return (0, refero_core_1.hasTimeAnswer)(answer);
        default:
            return false;
    }
}
function createDictionary(qrItems) {
    const dictionary = {};
    for (const item of qrItems) {
        const linkId = transform(item.linkId);
        if (!dictionary[linkId]) {
            dictionary[linkId] = [];
        }
        dictionary[linkId].push(Object.assign(Object.assign({}, item), { linkId: linkId }));
    }
    return dictionary;
}
function transform(linkId) {
    return linkId.split('^')[0];
}
//# sourceMappingURL=syncQuestionnaireResponse.js.map