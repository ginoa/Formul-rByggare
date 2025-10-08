"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDispatchToProps = exports.mergeProps = exports.mapStateToProps = void 0;
const tslib_1 = require("tslib");
const fhir_1 = require("../types/fhir");
const form_1 = require("../reducers/form");
const refero_core_1 = require("./refero-core");
const extension_1 = require("../util/extension");
const fhirpathHelper_1 = require("../util/fhirpathHelper");
const itemType_1 = tslib_1.__importDefault(require("../constants/itemType"));
function mapStateToProps(state, originalProps) {
    getValueIfDataReceiver(state, originalProps);
    if (!originalProps.item || !originalProps.item.enableWhen) {
        return Object.assign(Object.assign({}, originalProps), { enable: true });
    }
    const enable = isEnableWhenEnabled(originalProps.item.enableWhen, originalProps.item.enableBehavior, originalProps.path || [], state);
    return Object.assign(Object.assign({}, originalProps), { enable });
}
exports.mapStateToProps = mapStateToProps;
function isEnableWhenEnabled(enableWhen, enableBehavior, path, state) {
    const enableMatches = [];
    enableWhen.forEach((enableWhen) => {
        const responseItems = (0, refero_core_1.getResponseItems)((0, form_1.getFormData)(state));
        const enableWhenQuestion = enableWhen.question;
        for (let i = 0; responseItems && i < responseItems.length; i++) {
            let responseItem = responseItems[i];
            if (!(0, refero_core_1.isInGroupContext)(path, responseItem, responseItems)) {
                continue;
            }
            if (responseItem.linkId !== enableWhen.question) {
                responseItem = (0, refero_core_1.getQuestionnaireResponseItemWithLinkid)(enableWhenQuestion, responseItems[i], path);
            }
            if (!responseItem) {
                continue;
            }
            const matchesAnswer = (0, refero_core_1.enableWhenMatchesAnswer)(enableWhen, responseItem.answer);
            enableMatches.push(matchesAnswer);
        }
    });
    return enableBehavior === fhir_1.QuestionnaireItemEnableBehaviorCodes.ALL
        ? enableMatches.every(x => x === true)
        : enableMatches.some(x => x === true);
}
function getValueIfDataReceiver(state, originalProps) {
    if (originalProps.item) {
        const extension = (0, extension_1.getCopyExtension)(originalProps.item);
        if (extension) {
            const formData = (0, form_1.getFormData)(state);
            let result = (0, fhirpathHelper_1.evaluateFhirpathExpressionToGetString)(formData === null || formData === void 0 ? void 0 : formData.Content, extension);
            if (!!(0, extension_1.getCalculatedExpressionExtension)(originalProps.item)) {
                result = result.map((m) => m.value);
            }
            originalProps.answer = getQuestionnaireResponseItemAnswer(originalProps.item.type, result);
        }
    }
}
function getQuestionnaireResponseItemAnswer(type, result) {
    let answerArray = [];
    if (type === itemType_1.default.BOOLEAN) {
        return { valueBoolean: result[0] };
    }
    result.forEach((answer) => {
        switch (String(type)) {
            case itemType_1.default.TEXT:
            case itemType_1.default.STRING:
                answerArray.push({ valueString: answer });
                break;
            case itemType_1.default.INTEGER:
                answerArray.push({ valueInteger: answer });
                break;
            case itemType_1.default.DECIMAL:
                answerArray.push({ valueDecimal: answer });
                break;
            case itemType_1.default.QUANTITY:
                answerArray.push({ valueQuantity: answer });
                break;
            case itemType_1.default.DATETIME:
                answerArray.push({ valueDateTime: answer });
                break;
            case itemType_1.default.DATE:
                answerArray.push({ valueDate: answer });
                break;
            case itemType_1.default.TIME:
                answerArray.push({ valueTime: answer });
                break;
            default: {
                if ((typeof answer) === 'string') {
                    answerArray.push({ valueString: answer });
                }
                else {
                    answerArray.push({ valueCoding: answer });
                }
            }
        }
    });
    return answerArray;
}
function mergeProps(stateProps, dispatchProps, ownProps) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}
exports.mergeProps = mergeProps;
function mapDispatchToProps(dispatch, props) {
    return {
        dispatch,
        path: props.path,
        renderContext: props.renderContext,
    };
}
exports.mapDispatchToProps = mapDispatchToProps;
//# sourceMappingURL=map-props.js.map