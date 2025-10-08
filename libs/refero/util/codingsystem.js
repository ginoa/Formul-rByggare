"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionnaireItemCodeValue = exports.getCode = void 0;
function getCode(item, system) {
    if (!item || !item.code || item.code.length === 0) {
        return undefined;
    }
    const filteredCode = item.code.filter((e) => e.system === system);
    if (!filteredCode || filteredCode.length === 0) {
        return undefined;
    }
    return filteredCode[0];
}
exports.getCode = getCode;
function getQuestionnaireItemCodeValue(item, codesytem) {
    const codingSystem = getCode(item, codesytem);
    if (!codingSystem) {
        return undefined;
    }
    return codingSystem.code;
}
exports.getQuestionnaireItemCodeValue = getQuestionnaireItemCodeValue;
//# sourceMappingURL=codingsystem.js.map