"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableWhenMatches = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const fhir_1 = require("../types/fhir");
const date_core_1 = require("@helsenorge/date-time/components/time-input/date-core");
const EPSILON = 0.0000001;
const OPERATOR_EQUALS = fhir_1.QuestionnaireEnableOperator.Equals.code;
const OPERATOR_NOTEQUALS = fhir_1.QuestionnaireEnableOperator.NotEquals.code;
const OPERATOR_GREATEROREQUALS = fhir_1.QuestionnaireEnableOperator.GreaterOrEquals.code;
const OPERATOR_GREATERTHAN = fhir_1.QuestionnaireEnableOperator.GreaterThan.code;
const OPERATOR_LESSOREQUALS = fhir_1.QuestionnaireEnableOperator.LessOrEquals.code;
const OPERATOR_LESSTHAN = fhir_1.QuestionnaireEnableOperator.LessThan.code;
function enableWhenMatches(enableWhen, answer) {
    if (enableWhen.answerBoolean !== undefined) {
        return enableWhenMatchesBooleanAnswer(answer.valueBoolean, enableWhen.answerBoolean, enableWhen.operator);
    }
    if (enableWhen.answerDecimal || enableWhen.answerDecimal === 0) {
        return enableWhenMatchesDecimalAnswer(answer.valueDecimal, enableWhen.answerDecimal, enableWhen.operator);
    }
    if (enableWhen.answerInteger || enableWhen.answerInteger === 0) {
        return enableWhenMatchesIntegerAnswer(answer.valueInteger, enableWhen.answerInteger, enableWhen.operator);
    }
    if (enableWhen.answerDate) {
        return enableWhenMatchesDateAnswer(answer.valueDate, enableWhen.answerDate, enableWhen.operator);
    }
    if (enableWhen.answerDateTime) {
        return enableWhenMatchesDateTimeAnswer(answer.valueDateTime, enableWhen.answerDateTime, enableWhen.operator);
    }
    if (enableWhen.answerTime) {
        return enableWhenMatchesStringAnswer(answer.valueTime, enableWhen.answerTime, enableWhen.operator);
    }
    if (enableWhen.answerString || enableWhen.answerString === '') {
        return enableWhenMatchesStringAnswer(answer.valueString, enableWhen.answerString, enableWhen.operator);
    }
    if (enableWhen.answerCoding) {
        if (enableWhen.answerCoding === undefined || answer.valueCoding === undefined) {
            return false;
        }
        const isSameSystem = answer.valueCoding.system === enableWhen.answerCoding.system;
        return isSameSystem && enableWhenMatchesCodeAnswer(answer.valueCoding.code, enableWhen.answerCoding.code, enableWhen.operator);
    }
    if (enableWhen.answerQuantity) {
        if (answer.valueQuantity === undefined || enableWhen.answerQuantity === undefined) {
            return false;
        }
        const isSameSystem = answer.valueQuantity.system === enableWhen.answerQuantity.system;
        const isSameCode = answer.valueQuantity.code === enableWhen.answerQuantity.code;
        return (isSameSystem &&
            isSameCode &&
            enableWhenMatchesDecimalAnswer(answer.valueQuantity.value, enableWhen.answerQuantity.value, enableWhen.operator));
    }
    if (enableWhen.answerReference) {
        if (enableWhen.answerReference === undefined) {
            return false;
        }
        if (answer.valueCoding) {
            return enableWhenMatchesReferenceAnswer(answer.valueCoding.code, enableWhen.answerReference.reference, enableWhen.operator);
        }
        if (answer.valueReference) {
            return enableWhenMatchesReferenceAnswer(answer.valueReference.reference, enableWhen.answerReference.reference, enableWhen.operator);
        }
    }
    return false;
}
exports.enableWhenMatches = enableWhenMatches;
function enableWhenMatchesBooleanAnswer(answerValueBoolean, enableWhenAnswerBoolean, operator) {
    if (answerValueBoolean === undefined || enableWhenAnswerBoolean === undefined) {
        return false;
    }
    switch (operator) {
        case OPERATOR_EQUALS:
            return answerValueBoolean === enableWhenAnswerBoolean;
        case OPERATOR_NOTEQUALS:
            return answerValueBoolean !== enableWhenAnswerBoolean;
        case OPERATOR_GREATEROREQUALS:
            return answerValueBoolean === enableWhenAnswerBoolean;
        case OPERATOR_GREATERTHAN:
            return false;
        case OPERATOR_LESSOREQUALS:
            return answerValueBoolean === enableWhenAnswerBoolean;
        case OPERATOR_LESSTHAN:
            return false;
        default:
            return false;
    }
}
function enableWhenMatchesDecimalAnswer(answerValueDecimal, enableWhenAnswerDecimal, operator) {
    if (answerValueDecimal === undefined || enableWhenAnswerDecimal === undefined) {
        return false;
    }
    const lessThan = (first, second) => first - second < 0;
    const greaterThan = (first, second) => first - second > 0;
    const equals = (first, second) => Math.abs(first - second) <= EPSILON;
    switch (operator) {
        case OPERATOR_EQUALS:
            return equals(answerValueDecimal, enableWhenAnswerDecimal);
        case OPERATOR_NOTEQUALS:
            return !equals(answerValueDecimal, enableWhenAnswerDecimal);
        case OPERATOR_GREATEROREQUALS:
            return equals(answerValueDecimal, enableWhenAnswerDecimal) || greaterThan(answerValueDecimal, enableWhenAnswerDecimal);
        case OPERATOR_GREATERTHAN:
            return !equals(answerValueDecimal, enableWhenAnswerDecimal) && greaterThan(answerValueDecimal, enableWhenAnswerDecimal);
        case OPERATOR_LESSOREQUALS:
            return equals(answerValueDecimal, enableWhenAnswerDecimal) || lessThan(answerValueDecimal, enableWhenAnswerDecimal);
        case OPERATOR_LESSTHAN:
            return !equals(answerValueDecimal, enableWhenAnswerDecimal) && lessThan(answerValueDecimal, enableWhenAnswerDecimal);
        default:
            return false;
    }
}
function enableWhenMatchesIntegerAnswer(answerValueInteger, enableWhenAnswerInteger, operator) {
    if (answerValueInteger === undefined || enableWhenAnswerInteger === undefined) {
        return false;
    }
    switch (operator) {
        case OPERATOR_EQUALS:
            return answerValueInteger === enableWhenAnswerInteger;
        case OPERATOR_NOTEQUALS:
            return answerValueInteger !== enableWhenAnswerInteger;
        case OPERATOR_GREATEROREQUALS:
            return answerValueInteger >= enableWhenAnswerInteger;
        case OPERATOR_GREATERTHAN:
            return answerValueInteger > enableWhenAnswerInteger;
        case OPERATOR_LESSOREQUALS:
            return answerValueInteger <= enableWhenAnswerInteger;
        case OPERATOR_LESSTHAN:
            return answerValueInteger < enableWhenAnswerInteger;
        default:
            return false;
    }
}
function enableWhenMatchesDateAnswer(answerValueDate, enableWhenAnswerDate, operator) {
    if (answerValueDate === undefined || enableWhenAnswerDate === undefined) {
        return false;
    }
    const aValueDate = (0, date_core_1.parseDate)(String(answerValueDate));
    const ewAnswerDate = (0, date_core_1.parseDate)(String(enableWhenAnswerDate));
    switch (operator) {
        case OPERATOR_EQUALS:
            return (0, moment_1.default)(aValueDate).isSame(ewAnswerDate);
        case OPERATOR_NOTEQUALS:
            return !(0, moment_1.default)(aValueDate).isSame(ewAnswerDate);
        case OPERATOR_GREATEROREQUALS:
            return (0, moment_1.default)(aValueDate).isSameOrAfter(ewAnswerDate);
        case OPERATOR_GREATERTHAN:
            return (0, moment_1.default)(aValueDate).isAfter(ewAnswerDate);
        case OPERATOR_LESSOREQUALS:
            return (0, moment_1.default)(aValueDate).isSameOrBefore(ewAnswerDate);
        case OPERATOR_LESSTHAN:
            return (0, moment_1.default)(aValueDate).isBefore(ewAnswerDate);
        default:
            return false;
    }
}
function enableWhenMatchesDateTimeAnswer(answerValueDateTime, enableWhenAnswerDateTime, operator) {
    if (answerValueDateTime === undefined || enableWhenAnswerDateTime === undefined) {
        return false;
    }
    const aValueDateTime = (0, date_core_1.parseDate)(String(answerValueDateTime));
    const ewAnswerDateTime = (0, date_core_1.parseDate)(String(enableWhenAnswerDateTime));
    switch (operator) {
        case OPERATOR_EQUALS:
            return (0, moment_1.default)(aValueDateTime).isSame(ewAnswerDateTime);
        case OPERATOR_NOTEQUALS:
            return !(0, moment_1.default)(aValueDateTime).isSame(ewAnswerDateTime);
        case OPERATOR_GREATEROREQUALS:
            return (0, moment_1.default)(aValueDateTime).isSameOrAfter(ewAnswerDateTime);
        case OPERATOR_GREATERTHAN:
            return (0, moment_1.default)(aValueDateTime).isAfter(ewAnswerDateTime);
        case OPERATOR_LESSOREQUALS:
            return (0, moment_1.default)(aValueDateTime).isSameOrBefore(ewAnswerDateTime);
        case OPERATOR_LESSTHAN:
            return (0, moment_1.default)(aValueDateTime).isBefore(ewAnswerDateTime);
        default:
            return false;
    }
}
function enableWhenMatchesStringAnswer(answerValueString, enableWhenAnswerString, operator) {
    if (answerValueString === undefined || enableWhenAnswerString === undefined) {
        return false;
    }
    const compareEquals = answerValueString.localeCompare(enableWhenAnswerString);
    switch (operator) {
        case OPERATOR_EQUALS:
            return compareEquals === 0;
        case OPERATOR_NOTEQUALS:
            return compareEquals !== 0;
        case OPERATOR_GREATEROREQUALS:
            return compareEquals >= 0;
        case OPERATOR_GREATERTHAN:
            return compareEquals > 0;
        case OPERATOR_LESSOREQUALS:
            return compareEquals <= 0;
        case OPERATOR_LESSTHAN:
            return compareEquals < 0;
        default:
            return false;
    }
}
function enableWhenMatchesCodeAnswer(answerCode, enableWhenCode, operator) {
    if (answerCode === undefined || enableWhenCode === undefined) {
        return false;
    }
    switch (operator) {
        case OPERATOR_EQUALS:
            return answerCode == enableWhenCode;
        case OPERATOR_NOTEQUALS:
            return answerCode != enableWhenCode;
        case OPERATOR_GREATEROREQUALS:
            return answerCode == enableWhenCode || false;
        case OPERATOR_GREATERTHAN:
            return false;
        case OPERATOR_LESSOREQUALS:
            return answerCode == enableWhenCode || false;
        case OPERATOR_LESSTHAN:
            return false;
        default:
            return false;
    }
}
function enableWhenMatchesReferenceAnswer(answerReference, enableWhenReference, operator) {
    if (answerReference === undefined || enableWhenReference === undefined) {
        return false;
    }
    switch (operator) {
        case OPERATOR_EQUALS:
            return answerReference == enableWhenReference;
        case OPERATOR_NOTEQUALS:
            return answerReference != enableWhenReference;
        case OPERATOR_GREATEROREQUALS:
            return answerReference == enableWhenReference || false;
        case OPERATOR_GREATERTHAN:
            return false;
        case OPERATOR_LESSOREQUALS:
            return answerReference == enableWhenReference || false;
        case OPERATOR_LESSTHAN:
            return false;
        default:
            return false;
    }
}
//# sourceMappingURL=enableWhenMatcher.js.map