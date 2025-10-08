"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizeText = void 0;
const tslib_1 = require("tslib");
const dompurify_1 = tslib_1.__importDefault(require("dompurify"));
function SanitizeText(textToSanitize) {
    const sanitizedResult = dompurify_1.default.sanitize(textToSanitize, {
        RETURN_TRUSTED_TYPE: true,
        ADD_ATTR: ['target'],
    });
    if (sanitizedResult !== undefined) {
        return sanitizedResult.toString();
    }
    return sanitizedResult;
}
exports.SanitizeText = SanitizeText;
//# sourceMappingURL=domPurifyHelper.js.map