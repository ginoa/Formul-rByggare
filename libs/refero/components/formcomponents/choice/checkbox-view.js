"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_collapse_1 = require("react-collapse");
const checkbox_group_1 = tslib_1.__importDefault(require("@helsenorge/form/components/checkbox-group"));
const validation_1 = tslib_1.__importDefault(require("@helsenorge/form/components/form/validation"));
const extension_1 = require("../../../util/extension");
const index_1 = require("../../../util/index");
const label_1 = tslib_1.__importDefault(require("../label"));
const sublabel_1 = tslib_1.__importDefault(require("../sublabel"));
const CheckboxView = (_a) => {
    var { options, item, questionnaire, id, handleChange, selected, resources, children, repeatButton, renderDeleteButton, renderHelpButton, renderHelpElement, onRenderMarkdown } = _a, other = tslib_1.__rest(_a, ["options", "item", "questionnaire", "id", "handleChange", "selected", "resources", "children", "repeatButton", "renderDeleteButton", "renderHelpButton", "renderHelpElement", "onRenderMarkdown"]);
    if (!options) {
        return null;
    }
    const checkboxes = options.map(el => {
        return { label: el.label, id: el.type, checked: isSelected(el, selected) };
    });
    const subLabelText = (0, index_1.getSublabelText)(item, onRenderMarkdown, questionnaire, resources);
    return (React.createElement("div", { className: "page_refero__component page_refero__component_choice page_refero__component_choice_checkbox" },
        React.createElement(react_collapse_1.Collapse, { isOpened: true },
            React.createElement(validation_1.default, Object.assign({}, other),
                React.createElement(checkbox_group_1.default, { legend: React.createElement(label_1.default, { item: item, onRenderMarkdown: onRenderMarkdown, questionnaire: questionnaire, resources: resources }), subLabel: subLabelText ? React.createElement(sublabel_1.default, { subLabelText: subLabelText }) : undefined, checkboxes: checkboxes, handleChange: handleChange, isRequired: (0, index_1.isRequired)(item), id: (0, index_1.getId)(id), max: (0, extension_1.getMaxOccursExtensionValue)(item), min: (0, extension_1.getMinOccursExtensionValue)(item), errorMessage: (0, extension_1.getValidationTextExtension)(item), helpButton: renderHelpButton(), helpElement: renderHelpElement(), validateOnExternalUpdate: true, isStyleBlue: true })),
            renderDeleteButton('page_refero__deletebutton--margin-top'),
            repeatButton,
            children ? React.createElement("div", { className: "nested-fieldset nested-fieldset--full-height" }, children) : null)));
};
function isSelected(el, selected) {
    if (selected) {
        for (let i = 0; i < selected.length; i++) {
            if (el.type === selected[i]) {
                return true;
            }
        }
    }
    return false;
}
exports.default = CheckboxView;
//# sourceMappingURL=checkbox-view.js.map