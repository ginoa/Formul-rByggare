"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const getTopLevelElements_1 = require("../util/getTopLevelElements");
const renderForm_1 = tslib_1.__importDefault(require("./renderForm"));
const constants_1 = require("../constants");
const StepView = ({ isAuthorized, referoProps, resources, formItems, formDefinition, onSave, onSubmit, onStepChange }) => {
    const stepArray = [];
    const [stepIndex, setStepIndex] = React.useState(0);
    const topLevelElements = (0, getTopLevelElements_1.getTopLevelElements)(formDefinition);
    formItems === null || formItems === void 0 ? void 0 : formItems.filter(formItem => topLevelElements === null || topLevelElements === void 0 ? void 0 : topLevelElements.find(element => {
        if (formItem.props.id !== constants_1.NAVIGATOR_BLINDZONE_ID && formItem.props.item.linkId === element.linkId) {
            stepArray.push(formItem);
        }
    }));
    const stepArrayLength = stepArray.length - 1;
    const nextStep = () => {
        setStepIndex(stepIndex < stepArrayLength ? stepIndex + 1 : stepIndex);
    };
    const previousStep = () => {
        setStepIndex(stepIndex > 0 ? stepIndex - 1 : stepIndex);
    };
    React.useEffect(() => {
        onStepChange && onStepChange(stepIndex);
        window.scrollTo(0, 0);
    }, [stepIndex]);
    return (React.createElement(React.Fragment, null,
        React.createElement(renderForm_1.default, { isAuthorized: isAuthorized, isStepView: true, referoProps: referoProps, resources: resources, formItemsToBeRendered: stepArray[stepIndex], onSave: onSave, onSubmit: onSubmit, displayNextButton: stepIndex !== stepArrayLength, displayPreviousButton: stepIndex > 0, nextStep: nextStep, previousStep: previousStep })));
};
exports.default = StepView;
//# sourceMappingURL=stepView.js.map