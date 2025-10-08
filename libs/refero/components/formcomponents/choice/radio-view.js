"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_collapse_1 = require("react-collapse");
const validation_1 = tslib_1.__importDefault(require("@helsenorge/form/components/form/validation"));
const radio_group_1 = require("@helsenorge/form/components/radio-group");
const index_1 = require("../../../util/index");
const label_1 = tslib_1.__importDefault(require("../label"));
const sublabel_1 = tslib_1.__importDefault(require("../sublabel"));
const RadioView = (_a) => {
    var { options, item, questionnaire, id, handleChange, selected, validateInput, resources, children, getErrorMessage, repeatButton, renderDeleteButton, renderHelpButton, renderHelpElement, onRenderMarkdown } = _a, other = tslib_1.__rest(_a, ["options", "item", "questionnaire", "id", "handleChange", "selected", "validateInput", "resources", "children", "getErrorMessage", "repeatButton", "renderDeleteButton", "renderHelpButton", "renderHelpElement", "onRenderMarkdown"]);
    if (!options) {
        return null;
    }
    const subLabelText = (0, index_1.getSublabelText)(item, onRenderMarkdown, questionnaire, resources);
    return (React.createElement("div", { className: "page_refero__component page_refero__component_choice page_refero__component_choice_radiobutton" },
        React.createElement(react_collapse_1.Collapse, { isOpened: true },
            React.createElement(validation_1.default, Object.assign({}, other),
                React.createElement(radio_group_1.RadioGroup, { legend: React.createElement(label_1.default, { item: item, onRenderMarkdown: onRenderMarkdown, questionnaire: questionnaire, resources: resources }), subLabel: subLabelText ? React.createElement(sublabel_1.default, { subLabelText: subLabelText }) : undefined, id: (0, index_1.getId)(id), options: options, onChange: handleChange, selected: selected ? selected[0] : undefined, isRequired: (0, index_1.isRequired)(item), validator: validateInput, getErrorMessage: getErrorMessage, helpButton: renderHelpButton(), helpElement: renderHelpElement(), validateOnExternalUpdate: true, isStyleBlue: true })),
            renderDeleteButton('page_refero__deletebutton--margin-top'),
            repeatButton,
            children ? React.createElement("div", { className: "nested-fieldset nested-fieldset--full-height" }, children) : undefined)));
};
exports.default = RadioView;
//# sourceMappingURL=radio-view.js.map