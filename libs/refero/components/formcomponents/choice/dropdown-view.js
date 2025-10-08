"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_collapse_1 = require("react-collapse");
const layout_change_1 = tslib_1.__importDefault(require("@helsenorge/core-utils/hoc/layout-change"));
const validation_1 = tslib_1.__importDefault(require("@helsenorge/form/components/form/validation"));
const safe_select_1 = tslib_1.__importDefault(require("@helsenorge/form/components/safe-select"));
const extension_1 = require("../../../util/extension");
const index_1 = require("../../../util/index");
const label_1 = tslib_1.__importDefault(require("../label"));
const sublabel_1 = tslib_1.__importDefault(require("../sublabel"));
class DropdownView extends React.Component {
    render() {
        const _a = this.props, { options, item, questionnaire, id, handleChange, selected, validateInput, resources, children, repeatButton, renderDeleteButton, renderHelpButton, renderHelpElement, onRenderMarkdown } = _a, other = tslib_1.__rest(_a, ["options", "item", "questionnaire", "id", "handleChange", "selected", "validateInput", "resources", "children", "repeatButton", "renderDeleteButton", "renderHelpButton", "renderHelpElement", "onRenderMarkdown"]);
        if (!options) {
            return null;
        }
        const dropdownOptions = options.map((o) => {
            return new Option(o.label, o.type);
        });
        const subLabelText = (0, index_1.getSublabelText)(item, onRenderMarkdown, questionnaire, resources);
        let placeholder;
        if ((0, extension_1.getPlaceholder)(item)) {
            placeholder = new Option((0, extension_1.getPlaceholder)(item), '');
        }
        else if (resources) {
            placeholder = new Option(resources.selectDefaultPlaceholder, '');
        }
        return (React.createElement("div", { className: "page_refero__component page_refero__component_choice page_refero__component_choice_dropdown" },
            React.createElement(react_collapse_1.Collapse, { isOpened: true },
                React.createElement(validation_1.default, Object.assign({}, other),
                    React.createElement(safe_select_1.default, { id: (0, index_1.getId)(id), selectName: (0, index_1.getId)(id), showLabel: true, label: React.createElement(label_1.default, { item: item, onRenderMarkdown: onRenderMarkdown, questionnaire: questionnaire, resources: resources }), subLabel: subLabelText ? React.createElement(sublabel_1.default, { subLabelText: subLabelText }) : undefined, isRequired: (0, index_1.isRequired)(item), onChange: (evt) => handleChange(evt.target.value), options: dropdownOptions, selected: selected ? selected[0] : undefined, value: selected ? selected[0] : undefined, placeholder: placeholder, onChangeValidator: validateInput, errorMessage: (0, extension_1.getValidationTextExtension)(item), className: "page_refero__input", helpButton: renderHelpButton(), helpElement: renderHelpElement() })),
                renderDeleteButton('page_refero__deletebutton--margin-top'),
                repeatButton,
                children ? React.createElement("div", { className: "nested-fieldset nested-fieldset--full-height" }, children) : null)));
    }
}
exports.default = (0, layout_change_1.default)(DropdownView);
//# sourceMappingURL=dropdown-view.js.map