"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const validation_1 = tslib_1.__importDefault(require("@helsenorge/form/components/form/validation"));
const safe_input_field_1 = tslib_1.__importDefault(require("@helsenorge/form/components/safe-input-field"));
const newValue_1 = require("../../../actions/newValue");
const extension_1 = require("../../../util/extension");
const index_1 = require("../../../util/index");
const map_props_1 = require("../../../util/map-props");
const with_common_functions_1 = tslib_1.__importDefault(require("../../with-common-functions"));
const label_1 = tslib_1.__importDefault(require("../label"));
const sublabel_1 = tslib_1.__importDefault(require("../sublabel"));
const textview_1 = tslib_1.__importDefault(require("../textview"));
class Quantity extends React.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (event) => {
            var _a;
            const { dispatch, promptLoginMessage, path, item, onAnswerChange } = this.props;
            const extension = (0, extension_1.getQuestionnaireUnitExtensionValue)(this.props.item);
            if (extension) {
                const quantity = {
                    unit: extension.display,
                    system: extension.system,
                    code: extension.code,
                };
                const value = Number(parseFloat(event.target.value));
                if (value != null && !isNaN(value) && isFinite(value)) {
                    quantity.value = value;
                }
                if (dispatch) {
                    (_a = dispatch((0, newValue_1.newQuantityValueAsync)(this.props.path, quantity, this.props.item))) === null || _a === void 0 ? void 0 : _a.then(newState => onAnswerChange(newState, path, item, { valueQuantity: quantity }));
                }
                if (promptLoginMessage) {
                    promptLoginMessage();
                }
            }
        };
        this.getUnit = () => {
            const valueCoding = (0, extension_1.getQuestionnaireUnitExtensionValue)(this.props.item);
            if (valueCoding && valueCoding.display) {
                return valueCoding.display;
            }
            return '';
        };
    }
    getValue() {
        const { answer } = this.props;
        if (answer && Array.isArray(answer)) {
            return answer.map(m => m.valueQuantity.value);
        }
        if (answer && answer.valueQuantity !== undefined && answer.valueQuantity !== null) {
            return answer.valueQuantity.value;
        }
    }
    getPDFValue() {
        const value = this.getValue();
        if (value === undefined || value === null) {
            let text = '';
            if (this.props.resources && this.props.resources.ikkeBesvart) {
                text = this.props.resources.ikkeBesvart;
            }
            return text;
        }
        if (Array.isArray(value)) {
            return value.map(m => `${m} ${this.getUnit()}`).join(', ');
        }
        return `${value} ${this.getUnit()}`;
    }
    shouldComponentUpdate(nextProps) {
        var _a;
        const responseItemHasChanged = this.props.responseItem !== nextProps.responseItem;
        const helpItemHasChanged = this.props.isHelpOpen !== nextProps.isHelpOpen;
        const answerHasChanged = this.props.answer !== nextProps.answer;
        const resourcesHasChanged = JSON.stringify(this.props.resources) !== JSON.stringify(nextProps.resources);
        const repeats = (_a = this.props.item.repeats) !== null && _a !== void 0 ? _a : false;
        return responseItemHasChanged || helpItemHasChanged || resourcesHasChanged || repeats || answerHasChanged;
    }
    render() {
        const { id, item, questionnaire, onRenderMarkdown } = this.props;
        if (this.props.pdf || (0, index_1.isReadOnly)(item)) {
            return (React.createElement(textview_1.default, { id: id, item: this.props.item, value: this.getPDFValue(), onRenderMarkdown: onRenderMarkdown, helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement() }, this.props.children));
        }
        const value = this.getValue();
        const subLabelText = (0, index_1.getSublabelText)(item, onRenderMarkdown, questionnaire, this.props.resources);
        return (React.createElement("div", { className: "page_refero__component page_refero__component_quantity" },
            React.createElement(validation_1.default, Object.assign({}, this.props),
                React.createElement(safe_input_field_1.default, { size: "xSmall", type: "number", id: (0, index_1.getId)(this.props.id), inputName: (0, index_1.getId)(this.props.id), value: value !== undefined ? value + '' : '', showLabel: true, label: React.createElement(label_1.default, { item: item, onRenderMarkdown: onRenderMarkdown, questionnaire: questionnaire, resources: this.props.resources }), subLabel: subLabelText ? React.createElement(sublabel_1.default, { subLabelText: subLabelText }) : undefined, isRequired: (0, index_1.isRequired)(item), placeholder: (0, extension_1.getPlaceholder)(item), max: (0, extension_1.getMaxValueExtensionValue)(item), min: (0, extension_1.getMinValueExtensionValue)(item), onChange: this.handleChange, errorMessage: (0, extension_1.getValidationTextExtension)(item), pattern: (0, index_1.getDecimalPattern)(item), className: "page_refero__quantity", helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement(), validateOnExternalUpdate: true },
                    React.createElement("span", { className: "page_refero__unit" }, this.getUnit()))),
            this.props.renderDeleteButton('page_refero__deletebutton--margin-top'),
            React.createElement("div", null, this.props.repeatButton),
            this.props.children ? React.createElement("div", { className: "nested-fieldset nested-fieldset--full-height" }, this.props.children) : null));
    }
}
const withCommonFunctionsComponent = (0, with_common_functions_1.default)(Quantity);
const connectedComponent = (0, react_redux_1.connect)(map_props_1.mapStateToProps, map_props_1.mapDispatchToProps, map_props_1.mergeProps)(withCommonFunctionsComponent);
exports.default = connectedComponent;
//# sourceMappingURL=quantity.js.map