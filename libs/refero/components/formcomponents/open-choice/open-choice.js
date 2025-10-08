"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenChoice = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const newValue_1 = require("../../../actions/newValue");
const constants_1 = require("../../../constants");
const itemcontrol_1 = tslib_1.__importDefault(require("../../../constants/itemcontrol"));
const util_1 = require("../../../util");
const choice_1 = require("../../../util/choice");
const map_props_1 = require("../../../util/map-props");
const with_common_functions_1 = tslib_1.__importDefault(require("../../with-common-functions"));
const autosuggest_view_1 = tslib_1.__importDefault(require("../choice-common/autosuggest-view"));
const textview_1 = tslib_1.__importDefault(require("../textview"));
const checkbox_view_1 = tslib_1.__importDefault(require("./checkbox-view"));
const dropdown_view_1 = tslib_1.__importDefault(require("./dropdown-view"));
const radio_view_1 = tslib_1.__importDefault(require("./radio-view"));
const text_field_1 = tslib_1.__importDefault(require("./text-field"));
class OpenChoice extends React.Component {
    constructor() {
        super(...arguments);
        this.getDataReceiverValue = (answer) => {
            return answer
                .filter((f) => { var _a; return ((_a = f.valueCoding) === null || _a === void 0 ? void 0 : _a.code) !== constants_1.OPEN_CHOICE_ID; })
                .map((el) => {
                if (el && el.valueCoding) {
                    return el.valueCoding.display;
                }
                if (el && el.valueString) {
                    return el.valueString;
                }
            });
        };
        this.getPDFValue = (item, answer) => {
            const { resources, containedResources } = this.props;
            if ((0, util_1.isDataReceiver)(item)) {
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
            const displayValues = value.filter(el => el !== constants_1.OPEN_CHOICE_ID).map(el => (0, choice_1.getDisplay)((0, choice_1.getOptions)(resources, item, containedResources), el));
            const openValue = this.getOpenValue(answer);
            if (openValue) {
                displayValues.push(openValue);
            }
            return displayValues.join(', ');
        };
        this.getOpenValue = (answer) => {
            if (Array.isArray(answer)) {
                for (let i = 0; i < answer.length; i++) {
                    const el = answer[i];
                    if (el.valueString) {
                        return el.valueString;
                    }
                }
            }
            return;
        };
        this.getValue = (item, answer) => {
            var _a, _b, _c, _d, _e;
            if (answer && Array.isArray(answer)) {
                return answer.map((el) => {
                    if (el) {
                        if (el.valueCoding && el.valueCoding.code) {
                            return el.valueCoding.code;
                        }
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
            if (!item || !item.initial || item.initial.length === 0 || !item.initial[0].valueCoding || !item.initial[0].valueCoding.code) {
                return undefined;
            }
            return [String(item.initial[0].valueCoding.code)];
        };
        this.handleStringChangeEvent = (event) => {
            const value = event.target.value;
            this.handleStringChange(value);
        };
        this.handleStringChange = (value) => {
            var _a, _b;
            const { dispatch, promptLoginMessage, path, item, onAnswerChange } = this.props;
            if (dispatch) {
                if (value.length > 0) {
                    (_a = dispatch((0, newValue_1.newCodingStringValueAsync)(this.props.path, value, this.props.item))) === null || _a === void 0 ? void 0 : _a.then(newState => onAnswerChange(newState, path, item, { valueString: value }));
                }
                else {
                    (_b = dispatch((0, newValue_1.removeCodingStringValueAsync)(this.props.path, this.props.item))) === null || _b === void 0 ? void 0 : _b.then(newState => onAnswerChange(newState, path, item, { valueString: '' }));
                }
            }
            if (promptLoginMessage) {
                promptLoginMessage();
            }
        };
        this.getAnswerValueCoding = (code, systemArg, displayArg) => {
            const display = displayArg ? displayArg : (0, choice_1.getDisplay)((0, choice_1.getOptions)(this.props.resources, this.props.item, this.props.containedResources), code);
            const valueSetSystem = code === constants_1.OPEN_CHOICE_ID ? constants_1.OPEN_CHOICE_SYSTEM : (0, choice_1.getSystem)(this.props.item, code, this.props.containedResources);
            const system = systemArg ? systemArg : valueSetSystem;
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
                    (_a = dispatch((0, newValue_1.removeCodingValueAsync)(this.props.path, coding, item))) === null || _a === void 0 ? void 0 : _a.then(newState => onAnswerChange(newState, path, item, responseAnswer));
                    if (promptLoginMessage) {
                        promptLoginMessage();
                    }
                }
                else {
                    (_b = dispatch((0, newValue_1.newCodingValueAsync)(this.props.path, coding, this.props.item, true))) === null || _b === void 0 ? void 0 : _b.then(newState => onAnswerChange(newState, path, item, responseAnswer));
                    if (promptLoginMessage) {
                        promptLoginMessage();
                    }
                }
                this.interceptHandler(coding, (0, choice_1.getItemControlValue)(item));
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
                (_a = dispatch((0, newValue_1.newCodingValueAsync)(this.props.path, coding, item))) === null || _a === void 0 ? void 0 : _a.then(newState => onAnswerChange(newState, path, item, responseAnswer));
                if (promptLoginMessage) {
                    promptLoginMessage();
                }
                this.interceptHandler(coding, (0, choice_1.getItemControlValue)(item));
            }
        };
        this.interceptHandler = (coding, type) => {
            switch (type) {
                case itemcontrol_1.default.CHECKBOX:
                    return this.multiValueHandler(coding);
                default:
                    return this.singleValueHandler(coding);
            }
        };
        this.singleValueHandler = (coding) => {
            var _a;
            const { dispatch, item, path, onAnswerChange } = this.props;
            if (dispatch) {
                if (coding.code !== constants_1.OPEN_CHOICE_ID) {
                    (_a = dispatch((0, newValue_1.removeCodingStringValueAsync)(path, item))) === null || _a === void 0 ? void 0 : _a.then(newState => onAnswerChange(newState, path, item, { valueString: '' }));
                }
            }
        };
        this.multiValueHandler = (coding) => {
            var _a;
            const { dispatch, item, path, answer, onAnswerChange } = this.props;
            if (dispatch) {
                const isShown = (0, choice_1.shouldShowExtraChoice)(answer);
                if (isShown && coding.code === constants_1.OPEN_CHOICE_ID) {
                    (_a = dispatch((0, newValue_1.removeCodingStringValueAsync)(path, item))) === null || _a === void 0 ? void 0 : _a.then(newState => onAnswerChange(newState, path, item, { valueString: '' }));
                }
            }
        };
        this.renderCheckbox = (options) => {
            return (React.createElement(checkbox_view_1.default, Object.assign({ options: options, id: this.props.id, handleChange: this.handleCheckboxChange, selected: this.getValue(this.props.item, this.props.answer), renderOpenField: () => this.renderTextField(), onRenderMarkdown: this.props.onRenderMarkdown }, this.props), this.props.children));
        };
        this.renderDropdown = (options) => {
            return (React.createElement(dropdown_view_1.default, Object.assign({ options: options, id: this.props.id, handleChange: this.handleChange, selected: this.getValue(this.props.item, this.props.answer), validateInput: (value) => (0, choice_1.validateInput)(this.props.item, value, this.props.containedResources, this.props.resources), resources: this.props.resources, renderOpenField: () => this.renderTextField(), onRenderMarkdown: this.props.onRenderMarkdown }, this.props), this.props.children));
        };
        this.renderRadio = (options) => {
            const _a = this.props, { item, resources, containedResources, children, id, answer, repeatButton } = _a, rest = tslib_1.__rest(_a, ["item", "resources", "containedResources", "children", "id", "answer", "repeatButton"]);
            return (React.createElement(radio_view_1.default, Object.assign({ options: options, item: item, getErrorMessage: (value) => (0, choice_1.getErrorMessage)(item, value, resources, containedResources), handleChange: this.handleChange, validateInput: (value) => (0, choice_1.validateInput)(item, value, containedResources, resources), id: id, selected: this.getValue(item, answer), repeatButton: repeatButton, renderOpenField: () => this.renderTextField(), answer: answer, onRenderMarkdown: this.props.onRenderMarkdown }, rest), children));
        };
        this.renderAutosuggest = () => {
            return (React.createElement(autosuggest_view_1.default, Object.assign({ handleChange: this.handleChange, id: this.props.id, clearCodingAnswer: this.clearCodingAnswer, onRenderMarkdown: this.props.onRenderMarkdown, handleStringChange: this.handleStringChange }, this.props), this.props.children));
        };
    }
    renderTextField() {
        const _a = this.props, { id, pdf, item, answer, onRenderMarkdown } = _a, other = tslib_1.__rest(_a, ["id", "pdf", "item", "answer", "onRenderMarkdown"]);
        let a = {};
        if (Array.isArray(answer)) {
            for (let i = 0; i < answer.length; i++) {
                const el = answer[i];
                if (el.valueString) {
                    a = el;
                    break;
                }
            }
        }
        else {
            a = answer;
        }
        return (React.createElement(text_field_1.default, Object.assign({ id: id, pdf: pdf, item: item, answer: a, handleStringChange: this.handleStringChangeEvent, onRenderMarkdown: onRenderMarkdown, resources: this.props.resources }, other)));
    }
    shouldComponentUpdate(nextProps) {
        var _a;
        const responseItemHasChanged = this.props.responseItem !== nextProps.responseItem;
        const helpItemHasChanged = this.props.isHelpOpen !== nextProps.isHelpOpen;
        const resourcesHasChanged = JSON.stringify(this.props.resources) !== JSON.stringify(nextProps.resources);
        const answerHasChanged = this.props.answer !== nextProps.answer;
        const repeats = (_a = this.props.item.repeats) !== null && _a !== void 0 ? _a : false;
        return responseItemHasChanged || helpItemHasChanged || resourcesHasChanged || repeats || answerHasChanged;
    }
    render() {
        const { id, item, pdf, answer, containedResources, children, onRenderMarkdown } = this.props;
        if (pdf || (0, util_1.isReadOnly)(item)) {
            return (React.createElement(textview_1.default, { id: id, item: item, value: this.getPDFValue(item, answer), onRenderMarkdown: onRenderMarkdown }, children));
        }
        return (React.createElement(React.Fragment, null, (0, choice_1.renderOptions)(item, containedResources, this.renderRadio, this.renderCheckbox, this.renderDropdown, this.props.resources, this.renderAutosuggest)));
    }
}
exports.OpenChoice = OpenChoice;
const withCommonFunctionsComponent = (0, with_common_functions_1.default)(OpenChoice);
const connectedStringComponent = (0, react_redux_1.connect)(map_props_1.mapStateToProps, map_props_1.mapDispatchToProps, map_props_1.mergeProps)(withCommonFunctionsComponent);
exports.default = connectedStringComponent;
//# sourceMappingURL=open-choice.js.map