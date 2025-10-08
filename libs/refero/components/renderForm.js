"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const form_1 = tslib_1.__importStar(require("@helsenorge/form/components/form"));
const RenderForm = ({ isAuthorized, isStepView, referoProps, resources, formItemsToBeRendered, onSave, onSubmit, displayNextButton, displayPreviousButton, nextStep, previousStep, }) => {
    const displayPauseButtonInNormalView = referoProps.onSave ? onSave : undefined;
    const displayPauseButtonInStepView = displayPreviousButton ? previousStep : undefined;
    const buttonOrderStepView = {
        1: form_1.ButtonType.pauseButton,
        2: form_1.ButtonType.submitButton,
        3: form_1.ButtonType.cancelButton,
        4: form_1.ButtonType.draftButton,
    };
    const buttonOrderNormalView = {
        1: form_1.ButtonType.submitButton,
        2: form_1.ButtonType.pauseButton,
        3: form_1.ButtonType.cancelButton,
        4: form_1.ButtonType.draftButton,
    };
    return (React.createElement(React.Fragment, null,
        isAuthorized && (React.createElement(React.Fragment, null,
            React.createElement(form_1.default, { action: "#", disabled: referoProps.blockSubmit, submitButtonText: displayNextButton ? resources.nextStep : resources.formSend, errorMessage: resources.formError, onSubmit: displayNextButton ? nextStep : onSubmit, requiredLabel: resources.formRequired, optionalLabel: resources.formOptional, cancelButtonText: resources.formCancel, pauseButtonText: displayPreviousButton ? resources.previousStep : resources.formSave, onPause: isStepView ? displayPauseButtonInStepView : displayPauseButtonInNormalView, pauseButtonClasses: `${isStepView ? 'page_refero__pausebutton_stepView' : 'page_refero__pausebutton'}`, pauseButtonType: "display", submitButtonType: "display", cancelButtonType: "display", pauseButtonLevel: "secondary", buttonOrder: isStepView ? buttonOrderStepView : buttonOrderNormalView, onCancel: referoProps.onCancel, buttonClasses: "page_refero__saveblock", validationSummaryPlacement: referoProps.validationSummaryPlacement, validationSummary: {
                    enable: true,
                    header: resources.validationSummaryHeader,
                }, submitButtonDisabled: referoProps.submitButtonDisabled, pauseButtonDisabled: referoProps.saveButtonDisabled, onFieldsNotCorrectlyFilledOut: referoProps.onFieldsNotCorrectlyFilledOut }, formItemsToBeRendered))),
        !isAuthorized && (React.createElement(React.Fragment, null,
            React.createElement(form_1.default, { action: "#", disabled: referoProps.blockSubmit, errorMessage: resources.formError, requiredLabel: resources.formRequired, optionalLabel: resources.formOptional, buttonOrder: isStepView ? buttonOrderStepView : buttonOrderNormalView, triggerPreventDefaultOnSubmit: true, validationSummaryPlacement: referoProps.validationSummaryPlacement, validationSummary: {
                    enable: true,
                    header: resources.validationSummaryHeader,
                }, submitButtonDisabled: referoProps.submitButtonDisabled, pauseButtonDisabled: referoProps.saveButtonDisabled, onFieldsNotCorrectlyFilledOut: referoProps.onFieldsNotCorrectlyFilledOut }),
            formItemsToBeRendered,
            React.createElement("div", { className: "page_refero__buttonwrapper page_refero__saveblock" }, referoProps.loginButton)))));
};
exports.default = RenderForm;
//# sourceMappingURL=renderForm.js.map