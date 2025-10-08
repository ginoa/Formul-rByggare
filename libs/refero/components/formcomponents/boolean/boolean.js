"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const layout_change_1 = tslib_1.__importDefault(require("@helsenorge/core-utils/hoc/layout-change"));
const checkbox_1 = require("@helsenorge/form/components/checkbox");
const validation_1 = tslib_1.__importDefault(require("@helsenorge/form/components/form/validation"));
const newValue_1 = require("../../../actions/newValue");
const extension_1 = require("../../../util/extension");
const index_1 = require("../../../util/index");
const map_props_1 = require("../../../util/map-props");
const with_common_functions_1 = tslib_1.__importDefault(require("../../with-common-functions"));
const label_1 = tslib_1.__importDefault(require("../label"));
const pdf_1 = tslib_1.__importDefault(require("./pdf"));
class Boolean extends React.Component {
    constructor() {
        super(...arguments);
        this.handleChange = () => {
            var _a;
            const { dispatch, promptLoginMessage, onAnswerChange, path, item } = this.props;
            const newValue = !this.getValue();
            if (dispatch) {
                (_a = dispatch((0, newValue_1.newBooleanValueAsync)(this.props.path, newValue, this.props.item))) === null || _a === void 0 ? void 0 : _a.then(newState => onAnswerChange(newState, path, item, { valueBoolean: newValue }));
            }
            if (promptLoginMessage) {
                promptLoginMessage();
            }
        };
        this.getLabel = () => {
            return (React.createElement(label_1.default, { item: this.props.item, onRenderMarkdown: this.props.onRenderMarkdown, questionnaire: this.props.questionnaire, resources: this.props.resources }));
        };
    }
    getValue() {
        const { item, answer } = this.props;
        if (answer && answer.valueBoolean !== undefined) {
            return answer.valueBoolean;
        }
        if (!item || !item.initial || item.initial.length === 0 || !item.initial[0].valueBoolean) {
            return false;
        }
        return item.initial[0].valueBoolean;
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
        if (this.props.pdf) {
            return React.createElement(pdf_1.default, { item: this.props.item, checked: this.getValue(), onRenderMarkdown: this.props.onRenderMarkdown });
        }
        else if ((0, index_1.isReadOnly)(this.props.item)) {
            return (React.createElement(checkbox_1.CheckBox, { label: this.getLabel(), id: (0, index_1.getId)(this.props.id), checked: this.getValue(), disabled: true, isStyleBlue: true, onChange: () => {
                }, className: "page_refero__input" }));
        }
        return (React.createElement("div", { className: "page_refero__component page_refero__component_boolean" },
            React.createElement(validation_1.default, Object.assign({}, this.props),
                React.createElement(checkbox_1.CheckBox, { label: this.getLabel(), id: (0, index_1.getId)(this.props.id), isRequired: (0, index_1.isRequired)(this.props.item), errorMessage: (0, extension_1.getValidationTextExtension)(this.props.item), checked: this.getValue(), onChange: this.handleChange, disabled: (0, index_1.isReadOnly)(this.props.item), className: "page_refero__input", helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement(), validateOnExternalUpdate: true, isStyleBlue: true })),
            this.props.renderDeleteButton('page_refero__deletebutton--margin-top'),
            this.props.repeatButton,
            this.props.children ? React.createElement("div", { className: "nested-fieldset nested-fieldset--full-height" }, this.props.children) : null));
    }
}
const withCommonFunctionsComponent = (0, with_common_functions_1.default)(Boolean);
const connectedComponent = (0, react_redux_1.connect)(map_props_1.mapStateToProps, map_props_1.mapDispatchToProps, map_props_1.mergeProps)((0, layout_change_1.default)(withCommonFunctionsComponent));
exports.default = connectedComponent;
//# sourceMappingURL=boolean.js.map