"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Choice = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const newValue_1 = require("../../../actions/newValue");
const choice_1 = require("../../../util/choice");
const index_1 = require("../../../util/index");
const map_props_1 = require("../../../util/map-props");
const with_common_functions_1 = tslib_1.__importDefault(require("../../with-common-functions"));
const autosuggest_view_1 = tslib_1.__importDefault(require("../choice-common/autosuggest-view"));
const receiver_component_wrapper_1 = tslib_1.__importDefault(require("../receiver-component/receiver-component-wrapper"));
const textview_1 = tslib_1.__importDefault(require("../textview"));
const checkbox_view_1 = tslib_1.__importDefault(require("./checkbox-view"));
const dropdown_view_1 = tslib_1.__importDefault(require("./dropdown-view"));
const radio_view_1 = tslib_1.__importDefault(require("./radio-view"));
class Choice extends React.Component {
    constructor(props) {
        super(props);
        this.getValue = (item, answer) => {
            var _a, _b, _c, _d, _e;
            if (answer && Array.isArray(answer)) {
                return answer.map((el) => {
                    if (el && el.valueCoding && el.valueCoding.code) {
                        return el.valueCoding.code;
                    }
                });
            }
            else if (answer && !Array.isArray(answer) && answer.valueCoding && answer.valueCoding.code) {
                if (((_a = answer.valueCoding) === null || _a === void 0 ? void 0 : _a.code) === ((_b = item.initial) === null || _b === void 0 ? void 0 : _b[0].valueCoding.code) && ((_c = answer.valueCoding) === null || _c === void 0 ? void 0 : _c.display) === undefined) {
                    this.resetInitialAnswer(answer.valueCoding.code);
                }
                return [answer.valueCoding.code];
            }
            const initialSelectedOption = (_d = item.answerOption) === null || _d === void 0 ? void 0 : _d.filter(x => x.initialSelected);
            if (initialSelectedOption && initialSelectedOption.length > 0) {
                return [(_e = initialSelectedOption[0].valueCoding) === null || _e === void 0 ? void 0 : _e.code];
            }
            if (!item || !item.initial || item.initial.length === 0 || !item.initial[0].valueCoding || !!item.initial[0].valueCoding.code) {
                return undefined;
            }
            return [String(item.initial[0].valueCoding.code)];
        };
        this.getDataReceiverValue = (answer) => {
            return answer.map((el) => {
                if (el && el.valueCoding && el.valueCoding.display) {
                    return el.valueCoding.display;
                }
            });
        };
        this.getPDFValue = (item, answer) => {
            const { resources, containedResources } = this.props;
            if ((0, index_1.isDataReceiver)(item)) {
                return this.getDataReceiverValue(answer).join(', ');
            }
            const value = this.getValue(item, answer);
            if (!value) {
                let text = '';
                if (resources && resources.ikkeBesvart) {
                    text = resources.ikkeBesvart;
                }
                return text;
            }
            return Array.isArray(value) ? value.map(el => (0, choice_1.getDisplay)((0, choice_1.getOptions)(this.props.resources, item, containedResources), el)).join(', ') : value;
        };
        this.getAnswerValueCoding = (code, systemArg, displayArg) => {
            const display = displayArg ? displayArg : (0, choice_1.getDisplay)((0, choice_1.getOptions)(this.props.resources, this.props.item, this.props.containedResources), code);
            const system = systemArg ? systemArg : (0, choice_1.getSystem)(this.props.item, code, this.props.containedResources);
            return { code, display, system };
        };
        this.resetInitialAnswer = (code) => {
            var _a, _b;
            const { dispatch, answer, promptLoginMessage, item, onAnswerChange, path } = this.props;
            if (dispatch && code) {
                const coding = this.getAnswerValueCoding(code);
                const responseAnswer = { valueCoding: coding };
                if ((0, choice_1.getIndexOfAnswer)(code, answer) > -1) {
                    (_a = dispatch((0, newValue_1.removeCodingValueAsync)(path, coding, item))) === null || _a === void 0 ? void 0 : _a.then(newState => onAnswerChange(newState, path, item, responseAnswer));
                    if (promptLoginMessage) {
                        promptLoginMessage();
                    }
                }
                (_b = dispatch((0, newValue_1.newCodingValueAsync)(path, coding, item, true))) === null || _b === void 0 ? void 0 : _b.then(newState => onAnswerChange(newState, path, item, responseAnswer));
                if (promptLoginMessage) {
                    promptLoginMessage();
                }
            }
        };
        this.handleCheckboxChange = (code) => {
            var _a, _b;
            const { dispatch, answer, promptLoginMessage, item, onAnswerChange, path } = this.props;
            if (dispatch && code) {
                const coding = this.getAnswerValueCoding(code);
                const responseAnswer = { valueCoding: coding };
                if ((0, choice_1.getIndexOfAnswer)(code, answer) > -1) {
                    (_a = dispatch((0, newValue_1.removeCodingValueAsync)(path, coding, item))) === null || _a === void 0 ? void 0 : _a.then(newState => onAnswerChange(newState, path, item, responseAnswer));
                    if (promptLoginMessage) {
                        promptLoginMessage();
                    }
                }
                else {
                    (_b = dispatch((0, newValue_1.newCodingValueAsync)(path, coding, item, true))) === null || _b === void 0 ? void 0 : _b.then(newState => onAnswerChange(newState, path, item, responseAnswer));
                    if (promptLoginMessage) {
                        promptLoginMessage();
                    }
                }
            }
        };
        this.clearCodingAnswer = (coding) => {
            var _a;
            const { dispatch, promptLoginMessage, item, onAnswerChange, path } = this.props;
            if (dispatch) {
                const responseAnswer = { valueCoding: coding };
                (_a = dispatch((0, newValue_1.removeCodingValueAsync)(path, coding, item))) === null || _a === void 0 ? void 0 : _a.then(newState => onAnswerChange(newState, path, item, responseAnswer));
                if (promptLoginMessage) {
                    promptLoginMessage();
                }
            }
        };
        this.handleChange = (code, systemArg, displayArg) => {
            var _a;
            const { dispatch, promptLoginMessage, item, onAnswerChange, path } = this.props;
            if (dispatch && code) {
                const coding = this.getAnswerValueCoding(code, systemArg, displayArg);
                const responseAnswer = { valueCoding: coding };
                (_a = dispatch((0, newValue_1.newCodingValueAsync)(path, coding, item))) === null || _a === void 0 ? void 0 : _a.then(newState => onAnswerChange(newState, path, item, responseAnswer));
                if (promptLoginMessage) {
                    promptLoginMessage();
                }
            }
        };
        this.renderCheckbox = (options) => {
            return (React.createElement(checkbox_view_1.default, Object.assign({ options: options, id: this.props.id, handleChange: this.handleCheckboxChange, selected: this.getValue(this.props.item, this.props.answer), onRenderMarkdown: this.props.onRenderMarkdown }, this.props), this.props.children));
        };
        this.renderDropdown = (options) => {
            return (React.createElement(dropdown_view_1.default, Object.assign({ options: options, id: this.props.id, handleChange: this.handleChange, selected: this.getValue(this.props.item, this.props.answer), validateInput: (value) => (0, choice_1.validateInput)(this.props.item, value, this.props.containedResources, this.props.resources), resources: this.props.resources, onRenderMarkdown: this.props.onRenderMarkdown }, this.props), this.props.children));
        };
        this.renderRadio = (options) => {
            return (React.createElement(radio_view_1.default, Object.assign({ options: options, getErrorMessage: (value) => (0, choice_1.getErrorMessage)(this.props.item, value, this.props.resources, this.props.containedResources), handleChange: this.handleChange, validateInput: (value) => (0, choice_1.validateInput)(this.props.item, value, this.props.containedResources, this.props.resources), id: this.props.id, selected: this.getValue(this.props.item, this.props.answer), onRenderMarkdown: this.props.onRenderMarkdown }, this.props), this.props.children));
        };
        this.renderAutosuggest = () => {
            return (React.createElement(autosuggest_view_1.default, Object.assign({ handleChange: this.handleChange, id: this.props.id, clearCodingAnswer: this.clearCodingAnswer, onRenderMarkdown: this.props.onRenderMarkdown }, this.props), this.props.children));
        };
        this.renderReceiverComponent = () => {
            return (React.createElement(receiver_component_wrapper_1.default, Object.assign({ handleChange: this.handleChange, id: this.props.id, selected: this.getValue(this.props.item, this.props.answer), clearCodingAnswer: this.clearCodingAnswer, fetchReceivers: this.props.fetchReceivers }, this.props), this.props.children));
        };
        this.state = {
            valid: true,
            validated: false,
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
        const { id, item, pdf, answer, containedResources, children, onRenderMarkdown } = this.props;
        if (pdf || (0, index_1.isReadOnly)(item)) {
            return (React.createElement(textview_1.default, { id: id, item: item, value: this.getPDFValue(item, answer), onRenderMarkdown: onRenderMarkdown }, children));
        }
        return (React.createElement(React.Fragment, null, (0, choice_1.renderOptions)(item, containedResources, this.renderRadio, this.renderCheckbox, this.renderDropdown, this.props.resources, this.renderAutosuggest, this.renderReceiverComponent)));
    }
}
exports.Choice = Choice;
const withCommonFunctionsComponent = (0, with_common_functions_1.default)(Choice);
const connectedComponent = (0, react_redux_1.connect)(map_props_1.mapStateToProps, map_props_1.mapDispatchToProps, map_props_1.mergeProps)(withCommonFunctionsComponent);
exports.default = connectedComponent;
//# sourceMappingURL=choice.js.map