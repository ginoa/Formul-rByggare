"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.String = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const debounce_1 = require("@helsenorge/core-utils/debounce");
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
class String extends React.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (event) => {
            var _a;
            const { dispatch, promptLoginMessage, path, item, onAnswerChange } = this.props;
            const value = event.target.value;
            if (dispatch) {
                (_a = dispatch((0, newValue_1.newStringValueAsync)(this.props.path, value, this.props.item))) === null || _a === void 0 ? void 0 : _a.then(newState => onAnswerChange(newState, path, item, { valueString: value }));
            }
            if (promptLoginMessage) {
                promptLoginMessage();
            }
        };
        this.debouncedHandleChange = (0, debounce_1.debounce)(this.handleChange, 250, false);
        this.validateText = (value) => {
            return (0, index_1.validateText)(value, this.props.validateScriptInjection);
        };
        this.getValidationErrorMessage = (value) => {
            return (0, index_1.getTextValidationErrorMessage)(value, this.props.validateScriptInjection, this.props.item, this.props.resources);
        };
        this.getRequiredErrorMessage = (item) => {
            var _a;
            return (0, index_1.isRequired)(item) ? (_a = this.props.resources) === null || _a === void 0 ? void 0 : _a.formRequiredErrorMessage : undefined;
        };
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
        const { id, item, questionnaire, pdf, resources, answer, onRenderMarkdown } = this.props;
        if (pdf || (0, index_1.isReadOnly)(item)) {
            return (React.createElement(textview_1.default, { id: id, item: item, value: (0, index_1.getPDFStringValue)(answer, resources), onRenderMarkdown: onRenderMarkdown, textClass: "page_refero__component_readonlytext", helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement() }, this.props.children));
        }
        const subLabelText = (0, index_1.getSublabelText)(item, onRenderMarkdown, questionnaire, resources);
        return (React.createElement("div", { className: "page_refero__component page_refero__component_string" },
            React.createElement(validation_1.default, Object.assign({}, this.props),
                React.createElement(safe_input_field_1.default, { type: "text", id: (0, index_1.getId)(this.props.id), inputName: (0, index_1.getId)(this.props.id), value: (0, index_1.getStringValue)(answer), onChangeValidator: this.validateText, showLabel: true, label: React.createElement(label_1.default, { item: item, onRenderMarkdown: onRenderMarkdown, questionnaire: questionnaire, resources: resources }), subLabel: subLabelText ? React.createElement(sublabel_1.default, { subLabelText: subLabelText }) : undefined, isRequired: (0, index_1.isRequired)(item), placeholder: (0, extension_1.getPlaceholder)(item), minLength: (0, extension_1.getMinLengthExtensionValue)(item), maxLength: (0, index_1.getMaxLength)(item), onChange: (event) => {
                        event.persist();
                        this.debouncedHandleChange(event);
                    }, pattern: (0, extension_1.getRegexExtension)(item), errorMessage: this.getValidationErrorMessage, requiredErrorMessage: this.getRequiredErrorMessage(item), className: "page_refero__input", helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement(), validateOnExternalUpdate: true, stringOverMaxLengthError: resources === null || resources === void 0 ? void 0 : resources.stringOverMaxLengthError })),
            this.props.renderDeleteButton('page_refero__deletebutton--margin-top'),
            this.props.repeatButton,
            this.props.children ? React.createElement("div", { className: "nested-fieldset nested-fieldset--full-height" }, this.props.children) : null));
    }
}
exports.String = String;
const withCommonFunctionsComponent = (0, with_common_functions_1.default)(String);
const connectedComponent = (0, react_redux_1.connect)(map_props_1.mapStateToProps, map_props_1.mapDispatchToProps, map_props_1.mergeProps)((0, layout_change_1.default)(withCommonFunctionsComponent));
exports.default = connectedComponent;
//# sourceMappingURL=string.js.map