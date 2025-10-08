"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateFhirpathExpressionToGetString = exports.evaluateFhirpathExpressionToGetDate = void 0;
const tslib_1 = require("tslib");
const fhirpathLoaderHelper_1 = tslib_1.__importDefault(require("./fhirpathLoaderHelper"));
const fhirpath = require('fhirpath');
const fhirpath_r4_model = require('fhirpath/fhir-context/r4');
function evaluateFhirpathExpressionToGetDate(item, fhirExpression) {
    const result = fhirpath.evaluate(item, fhirExpression, null, fhirpathLoaderHelper_1.default);
    if (result.length > 0) {
        return new Date(result[0].asStr);
    }
    return;
}
exports.evaluateFhirpathExpressionToGetDate = evaluateFhirpathExpressionToGetDate;
function evaluateFhirpathExpressionToGetString(questionnare, fhirExtension) {
    return fhirpath.evaluate(questionnare, fhirExtension.valueString, null, fhirpath_r4_model);
}
exports.evaluateFhirpathExpressionToGetString = evaluateFhirpathExpressionToGetString;
//# sourceMappingURL=fhirpathHelper.js.map