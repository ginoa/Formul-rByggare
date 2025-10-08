"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const layout_change_1 = tslib_1.__importDefault(require("@helsenorge/core-utils/hoc/layout-change"));
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
class Decimal extends React.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (event) => {
            var _a;
            const { dispatch, path, item, promptLoginMessage, onAnswerChange } = this.props;
            const value = parseFloat(event.target.value);
            if (dispatch) {
                (_a = dispatch((0, newValue_1.newDecimalValueAsync)(path, value, item))) === null || _a === void 0 ? void 0 : _a.then(newState => onAnswerChange(newState, path, item, { valueDecimal: value }));
            }
            if (promptLoginMessage) {
                promptLoginMessage();
            }
        };
    }
    getValue() {
        const { item, answer } = this.props;
        if (answer && Array.isArray(answer)) {
            return answer.map(m => m.valueDecimal);
        }
        if (answer && answer.valueDecimal !== undefined && answer.valueDecimal !== null) {
            return answer.valueDecimal;
        }
        if (!item || !item.initial || item.initial.length === 0 || !item.initial[0].valueDecimal) {
            return '';
        }
    }
    getPDFValue() {
        const value = this.getValue();
        if (value === undefined || value === null || value === '') {
            let text = '';
            if (this.props.resources && this.props.resources.ikkeBesvart) {
                text = this.props.resources.ikkeBesvart;
            }
            return text;
        }
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        return value;
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
        const { id, item, pdf, onRenderMarkdown } = this.props;
        const value = this.getValue();
        const subLabelText = (0, index_1.getSublabelText)(this.props.item, this.props.onRenderMarkdown, this.props.questionnaire, this.props.resources);
        if (pdf || (0, index_1.isReadOnly)(item)) {
            return (React.createElement(textview_1.default, { id: id, item: item, value: this.getPDFValue(), onRenderMarkdown: onRenderMarkdown, helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement() }, this.props.children));
        }
        return (React.createElement("div", { className: "page_refero__component page_refero__component_decimal" },
            React.createElement(validation_1.default, Object.assign({}, this.props),
                React.createElement(safe_input_field_1.default, { type: "number", id: (0, index_1.getId)(this.props.id), inputName: (0, index_1.getId)(this.props.id), value: value ? value + '' : '', showLabel: true, label: React.createElement(label_1.default, { item: item, onRenderMarkdown: onRenderMarkdown, questionnaire: this.props.questionnaire, resources: this.props.resources }), subLabel: subLabelText ? React.createElement(sublabel_1.default, { subLabelText: subLabelText }) : undefined, isRequired: (0, index_1.isRequired)(item), placeholder: (0, extension_1.getPlaceholder)(item), max: (0, extension_1.getMaxValueExtensionValue)(item), min: (0, extension_1.getMinValueExtensionValue)(item), errorMessage: (0, extension_1.getValidationTextExtension)(item), pattern: (0, index_1.getDecimalPattern)(item), className: "page_refero__input", helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement(), validateOnExternalUpdate: true, onChange: this.handleChange })),
            this.props.renderDeleteButton('page_refero__deletebutton--margin-top'),
            this.props.repeatButton,
            this.props.children ? React.createElement("div", { className: "nested-fieldset nested-fieldset--full-height" }, this.props.children) : null));
    }
}
const withCommonFunctionsComponent = (0, with_common_functions_1.default)(Decimal);
const connectedComponent = (0, react_redux_1.connect)(map_props_1.mapStateToProps, map_props_1.mapDispatchToProps, map_props_1.mergeProps)((0, layout_change_1.default)(withCommonFunctionsComponent));
exports.default = connectedComponent;
//# sourceMappingURL=decimal.js.map