"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const dompurify_1 = tslib_1.__importDefault(require("dompurify"));
const react_redux_1 = require("react-redux");
const Expander_1 = tslib_1.__importDefault(require("@helsenorge/designsystem-react/components/Expander"));
const debounce_1 = require("@helsenorge/core-utils/debounce");
const validation_1 = tslib_1.__importDefault(require("@helsenorge/form/components/form/validation"));
const safe_textarea_1 = require("@helsenorge/form/components/safe-textarea");
const newValue_1 = require("../../../actions/newValue");
const index_1 = tslib_1.__importDefault(require("../../../constants/index"));
const itemcontrol_1 = tslib_1.__importDefault(require("../../../constants/itemcontrol"));
const extension_1 = require("../../../util/extension");
const index_2 = require("../../../util/index");
const map_props_1 = require("../../../util/map-props");
const with_common_functions_1 = tslib_1.__importDefault(require("../../with-common-functions"));
const sublabel_1 = tslib_1.__importDefault(require("../sublabel"));
const textview_1 = tslib_1.__importDefault(require("../textview"));
const domPurifyHelper_1 = require("../../../util/sanitize/domPurifyHelper");
class Text extends React.Component {
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
            return this.validateWithRegex(value) && (0, index_2.validateText)(value, this.props.validateScriptInjection);
        };
        this.validateWithRegex = (value) => {
            const regexAsStr = (0, extension_1.getRegexExtension)(this.props.item);
            if (regexAsStr && value) {
                const regexp = new RegExp(regexAsStr);
                if (!regexp.test(value.toString())) {
                    return false;
                }
            }
            return true;
        };
        this.getValidationErrorMessage = (value) => {
            return (0, index_2.getTextValidationErrorMessage)(value, this.props.validateScriptInjection, this.props.item, this.props.resources);
        };
        this.getRequiredErrorMessage = (item) => {
            var _a;
            return (0, index_2.isRequired)(item) ? (_a = this.props.resources) === null || _a === void 0 ? void 0 : _a.formRequiredErrorMessage : undefined;
        };
    }
    showCounter() {
        if ((0, index_2.getMaxLength)(this.props.item) || (0, extension_1.getMinLengthExtensionValue)(this.props.item)) {
            return true;
        }
        return false;
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
        const _a = this.props, { id, item, answer, pdf, children, resources, onRenderMarkdown, questionnaire } = _a, other = tslib_1.__rest(_a, ["id", "item", "answer", "pdf", "children", "resources", "onRenderMarkdown", "questionnaire"]);
        const itemControls = (0, extension_1.getItemControlExtensionValue)(item);
        if (itemControls && itemControls.some(itemControl => itemControl.code === itemcontrol_1.default.SIDEBAR)) {
            return null;
        }
        if (itemControls && itemControls.some(itemControl => itemControl.code === itemcontrol_1.default.INLINE)) {
            return (React.createElement("div", { id: id, className: "page_refero__component page_refero__component_expandabletext" },
                React.createElement(Expander_1.default, { title: item.text ? item.text : '', renderChildrenWhenClosed: this.props.shouldExpanderRenderChildrenWhenClosed ? true : false },
                    React.createElement(React.Fragment, null, children))));
        }
        if (itemControls && itemControls.some(itemControl => itemControl.code === itemcontrol_1.default.HIGHLIGHT)) {
            return (React.createElement("div", { id: id, className: "page_refero__component page_refero__component_highlight", dangerouslySetInnerHTML: {
                    __html: dompurify_1.default.sanitize(`${(0, index_2.getText)(item, onRenderMarkdown, questionnaire, resources)}`, {
                        RETURN_TRUSTED_TYPE: true,
                        ADD_ATTR: ['target'],
                    }),
                } }));
        }
        if (pdf || (0, index_2.isReadOnly)(item)) {
            return (React.createElement(textview_1.default, { id: id, item: item, value: (0, index_2.getPDFStringValue)(answer), onRenderMarkdown: onRenderMarkdown, textClass: "page_refero__component_readonlytext", helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement() }, this.props.children));
        }
        const subLabelText = (0, index_2.getSublabelText)(item, onRenderMarkdown, questionnaire, resources);
        return (React.createElement("div", { className: "page_refero__component page_refero__component_text" },
            React.createElement(validation_1.default, Object.assign({}, other),
                React.createElement(safe_textarea_1.SafeTextarea, { id: (0, index_2.getId)(this.props.id), rows: index_1.default.DEFAULT_TEXTAREA_HEIGHT, value: (0, index_2.getStringValue)(answer), isRequired: (0, index_2.isRequired)(item), showLabel: true, label: (0, domPurifyHelper_1.SanitizeText)(`${(0, index_2.renderPrefix)(item)} ${(0, index_2.getText)(item, onRenderMarkdown, questionnaire, resources)}`), subLabel: subLabelText ? React.createElement(sublabel_1.default, { subLabelText: subLabelText }) : undefined, placeholder: (0, extension_1.getPlaceholder)(item), maxlength: (0, index_2.getMaxLength)(item), minlength: (0, extension_1.getMinLengthExtensionValue)(item), counter: this.showCounter(), onChange: (event) => {
                        event.persist();
                        this.debouncedHandleChange(event);
                    }, validator: this.validateText, errorMessage: this.getValidationErrorMessage, requiredErrorMessage: this.getRequiredErrorMessage(item), helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement(), validateOnExternalUpdate: true, stringOverMaxLengthError: resources === null || resources === void 0 ? void 0 : resources.stringOverMaxLengthError, maxLengthText: resources === null || resources === void 0 ? void 0 : resources.maxLengthText })),
            this.props.renderDeleteButton('page_refero__deletebutton--margin-top'),
            this.props.repeatButton,
            children ? React.createElement("div", { className: "nested-fieldset nested-fieldset--full-height" }, children) : null));
    }
}
exports.Text = Text;
const withCommonFunctionsComponent = (0, with_common_functions_1.default)(Text);
const connectedComponent = (0, react_redux_1.connect)(map_props_1.mapStateToProps, map_props_1.mapDispatchToProps, map_props_1.mergeProps)(withCommonFunctionsComponent);
exports.default = connectedComponent;
//# sourceMappingURL=text.js.map