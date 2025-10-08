"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRepeatItemAsync = exports.deleteRepeatItem = exports.addRepeatItem = exports.newDateTimeValueAsync = exports.newDateTimeValue = exports.newTimeValueAsync = exports.newTimeValue = exports.newDateValueAsync = exports.newDateValue = exports.newStringValueAsync = exports.newStringValue = exports.newIntegerValueAsync = exports.newIntegerValue = exports.newDecimalValueAsync = exports.newDecimalValue = exports.removeCodingValueAsync = exports.removeCodingValue = exports.newQuantityValueAsync = exports.newQuantityValue = exports.removeCodingStringValueAsync = exports.removeCodingStringValue = exports.newCodingStringValueAsync = exports.newCodingStringValue = exports.newCodingValueAsync = exports.newCodingValue = exports.newBooleanValueAsync = exports.newBooleanValue = exports.removeAttachmentAsync = exports.removeAttachment = exports.newAttachmentAsync = exports.newAttachment = exports.REMOVE_ATTACHMENT_VALUE = exports.DELETE_REPEAT_ITEM = exports.ADD_REPEAT_ITEM = exports.REMOVE_CODING_VALUE = exports.REMOVE_CODINGSTRING_VALUE = exports.NEW_CODINGSTRING_VALUE = exports.NEW_VALUE = void 0;
const tslib_1 = require("tslib");
exports.NEW_VALUE = 'refero/NEW_VALUE';
exports.NEW_CODINGSTRING_VALUE = 'refero/NEW_CODINGSTRING_VALUE';
exports.REMOVE_CODINGSTRING_VALUE = 'refero/REMOVE_CODINGSTRING_VALUE';
exports.REMOVE_CODING_VALUE = 'refero/REMOVE_CODING_VALUE';
exports.ADD_REPEAT_ITEM = 'refero/ADD_REPEAT_ITEM';
exports.DELETE_REPEAT_ITEM = 'refero/DELETE_REPEAT_ITEM';
exports.REMOVE_ATTACHMENT_VALUE = 'refero/REMOVE_ATTACHMENT_VALUE';
function newAttachment(itemPath, value, item, multipleAnswers) {
    return {
        type: exports.NEW_VALUE,
        itemPath,
        valueAttachment: value,
        item: item,
        multipleAnswers,
    };
}
exports.newAttachment = newAttachment;
function newAttachmentAsync(itemPath, value, item, multipleAnswers) {
    return (dispatch, getState) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        dispatch(newAttachment(itemPath, value, item, multipleAnswers));
        return yield Promise.resolve(getState());
    });
}
exports.newAttachmentAsync = newAttachmentAsync;
function removeAttachment(itemPath, value, item) {
    return {
        type: exports.REMOVE_ATTACHMENT_VALUE,
        itemPath,
        valueAttachment: value,
        item: item,
    };
}
exports.removeAttachment = removeAttachment;
function removeAttachmentAsync(itemPath, value, item) {
    return (dispatch, getState) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        dispatch(removeAttachment(itemPath, value, item));
        return yield Promise.resolve(getState());
    });
}
exports.removeAttachmentAsync = removeAttachmentAsync;
function newBooleanValue(itemPath, value, item) {
    return {
        type: exports.NEW_VALUE,
        itemPath,
        valueBoolean: value,
        item: item,
    };
}
exports.newBooleanValue = newBooleanValue;
function newBooleanValueAsync(itemPath, value, item) {
    return (dispatch, getState) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        dispatch(newBooleanValue(itemPath, value, item));
        return yield Promise.resolve(getState());
    });
}
exports.newBooleanValueAsync = newBooleanValueAsync;
function newCodingValue(itemPath, value, item, multipleAnswers) {
    return {
        type: exports.NEW_VALUE,
        itemPath,
        valueCoding: value,
        item: item,
        multipleAnswers,
    };
}
exports.newCodingValue = newCodingValue;
function newCodingValueAsync(itemPath, value, item, multipleAnswers) {
    return (dispatch, getState) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        dispatch(newCodingValue(itemPath, value, item, multipleAnswers));
        return yield Promise.resolve(getState());
    });
}
exports.newCodingValueAsync = newCodingValueAsync;
function newCodingStringValue(itemPath, value, item, multipleAnswers) {
    return {
        type: exports.NEW_CODINGSTRING_VALUE,
        itemPath,
        valueString: value,
        item: item,
        multipleAnswers,
    };
}
exports.newCodingStringValue = newCodingStringValue;
function newCodingStringValueAsync(itemPath, value, item, multipleAnswers) {
    return (dispatch, getState) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        dispatch(newCodingStringValue(itemPath, value, item, multipleAnswers));
        return yield Promise.resolve(getState());
    });
}
exports.newCodingStringValueAsync = newCodingStringValueAsync;
function removeCodingStringValue(itemPath, item) {
    return {
        type: exports.REMOVE_CODINGSTRING_VALUE,
        itemPath,
        item: item,
    };
}
exports.removeCodingStringValue = removeCodingStringValue;
function removeCodingStringValueAsync(itemPath, item) {
    return (dispatch, getState) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        dispatch(removeCodingStringValue(itemPath, item));
        return yield Promise.resolve(getState());
    });
}
exports.removeCodingStringValueAsync = removeCodingStringValueAsync;
function newQuantityValue(itemPath, value, item) {
    return {
        type: exports.NEW_VALUE,
        itemPath,
        valueQuantity: value,
        item: item,
    };
}
exports.newQuantityValue = newQuantityValue;
function newQuantityValueAsync(itemPath, value, item) {
    return (dispatch, getState) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        dispatch(newQuantityValue(itemPath, value, item));
        return yield Promise.resolve(getState());
    });
}
exports.newQuantityValueAsync = newQuantityValueAsync;
function removeCodingValue(itemPath, value, item) {
    return {
        type: exports.REMOVE_CODING_VALUE,
        itemPath,
        valueCoding: value,
        item: item,
    };
}
exports.removeCodingValue = removeCodingValue;
function removeCodingValueAsync(itemPath, value, item) {
    return (dispatch, getState) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        dispatch(removeCodingValue(itemPath, value, item));
        return yield Promise.resolve(getState());
    });
}
exports.removeCodingValueAsync = removeCodingValueAsync;
function newDecimalValue(itemPath, value, item) {
    return {
        type: exports.NEW_VALUE,
        itemPath,
        valueDecimal: value,
        item: item,
    };
}
exports.newDecimalValue = newDecimalValue;
function newDecimalValueAsync(itemPath, value, item) {
    return (dispatch, getState) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        dispatch(newDecimalValue(itemPath, value, item));
        return yield Promise.resolve(getState());
    });
}
exports.newDecimalValueAsync = newDecimalValueAsync;
function newIntegerValue(itemPath, value, item) {
    return {
        type: exports.NEW_VALUE,
        itemPath,
        valueInteger: value,
        item: item,
    };
}
exports.newIntegerValue = newIntegerValue;
function newIntegerValueAsync(itemPath, value, item) {
    return (dispatch, getState) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        dispatch(newIntegerValue(itemPath, value, item));
        return yield Promise.resolve(getState());
    });
}
exports.newIntegerValueAsync = newIntegerValueAsync;
function newStringValue(itemPath, value, item) {
    return {
        type: exports.NEW_VALUE,
        itemPath,
        valueString: value,
        item: item,
    };
}
exports.newStringValue = newStringValue;
function newStringValueAsync(itemPath, value, item) {
    return (dispatch, getState) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        dispatch(newStringValue(itemPath, value, item));
        return yield Promise.resolve(getState());
    });
}
exports.newStringValueAsync = newStringValueAsync;
function newDateValue(itemPath, value, item) {
    return {
        type: exports.NEW_VALUE,
        itemPath,
        valueDate: value,
        item: item,
    };
}
exports.newDateValue = newDateValue;
function newDateValueAsync(itemPath, value, item) {
    return (dispatch, getState) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        dispatch(newDateValue(itemPath, value, item));
        return yield Promise.resolve(getState());
    });
}
exports.newDateValueAsync = newDateValueAsync;
function newTimeValue(itemPath, value, item) {
    return {
        type: exports.NEW_VALUE,
        itemPath,
        valueTime: value,
        item: item,
    };
}
exports.newTimeValue = newTimeValue;
function newTimeValueAsync(itemPath, value, item) {
    return (dispatch, getState) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        dispatch(newTimeValue(itemPath, value, item));
        return yield Promise.resolve(getState());
    });
}
exports.newTimeValueAsync = newTimeValueAsync;
function newDateTimeValue(itemPath, value, item) {
    return {
        type: exports.NEW_VALUE,
        itemPath,
        valueDateTime: value,
        item: item,
    };
}
exports.newDateTimeValue = newDateTimeValue;
function newDateTimeValueAsync(itemPath, value, item) {
    return (dispatch, getState) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        dispatch(newDateTimeValue(itemPath, value, item));
        return yield Promise.resolve(getState());
    });
}
exports.newDateTimeValueAsync = newDateTimeValueAsync;
function addRepeatItem(parentPath, item, responseItems) {
    return {
        type: exports.ADD_REPEAT_ITEM,
        parentPath,
        item,
        responseItems,
    };
}
exports.addRepeatItem = addRepeatItem;
function deleteRepeatItem(itemPath, item) {
    return {
        type: exports.DELETE_REPEAT_ITEM,
        itemPath,
        item,
    };
}
exports.deleteRepeatItem = deleteRepeatItem;
function deleteRepeatItemAsync(itemPath, item) {
    return (dispatch, getState) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        dispatch(deleteRepeatItem(itemPath, item));
        return yield Promise.resolve(getState());
    });
}
exports.deleteRepeatItemAsync = deleteRepeatItemAsync;
//# sourceMappingURL=newValue.js.map