"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSkjemaDefinition = exports.SET_SKJEMA_DEFINITION = void 0;
exports.SET_SKJEMA_DEFINITION = 'refero/SET_SKJEMA_DEFINITION';
function setSkjemaDefinition(skjemaDefinition, questionnaireResponse, language, syncQuestionnaireResponse) {
    return {
        type: exports.SET_SKJEMA_DEFINITION,
        questionnaire: skjemaDefinition,
        questionnaireResponse: questionnaireResponse,
        language: language,
        syncQuestionnaireResponse: syncQuestionnaireResponse,
    };
}
exports.setSkjemaDefinition = setSkjemaDefinition;
//# sourceMappingURL=form.js.map