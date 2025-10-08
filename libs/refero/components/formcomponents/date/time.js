"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_redux_1 = require("react-redux");
const time_input_1 = tslib_1.__importDefault(require("@helsenorge/date-time/components/time-input"));
const date_core_1 = require("@helsenorge/date-time/components/time-input/date-core");
const datetime_1 = tslib_1.__importDefault(require("@helsenorge/date-time/constants/datetime"));
const validation_1 = tslib_1.__importDefault(require("@helsenorge/form/components/form/validation"));
const newValue_1 = require("../../../actions/newValue");
const extensions_1 = tslib_1.__importDefault(require("../../../constants/extensions"));
const extension_1 = require("../../../util/extension");
const index_1 = require("../../../util/index");
const map_props_1 = require("../../../util/map-props");
const with_common_functions_1 = tslib_1.__importDefault(require("../../with-common-functions"));
const label_1 = tslib_1.__importDefault(require("../label"));
const sublabel_1 = tslib_1.__importDefault(require("../sublabel"));
const textview_1 = tslib_1.__importDefault(require("../textview"));
class Time extends React.Component {
    constructor(props) {
        super(props);
        this.onTimeChange = this.onTimeChange.bind(this);
        this.getValue = this.getValue.bind(this);
    }
    convertAnswerToString(answer) {
        if (answer && answer.valueTime) {
            return answer.valueTime;
        }
        if (answer && answer.valueDate) {
            return this.getTimeStringFromDate((0, date_core_1.parseDate)(String(answer.valueDate)));
        }
        if (answer && answer.valueDateTime) {
            return this.getTimeStringFromDate((0, date_core_1.parseDate)(String(answer.valueDateTime)));
        }
        return '';
    }
    ;
    getValue() {
        const { value, answer } = this.props;
        if (value) {
            return value;
        }
        if (Array.isArray(answer)) {
            return answer.map(m => this.convertAnswerToString(m)).join(', ');
        }
        return this.convertAnswerToString(answer);
    }
    getPDFValue() {
        const value = this.getValue();
        if (!value) {
            let text = '';
            if (this.props.resources && this.props.resources.ikkeBesvart) {
                text = this.props.resources.ikkeBesvart;
            }
            return text;
        }
        return value;
    }
    getTimeStringFromDate(date) {
        const momentDate = (0, moment_1.default)(date);
        return `${momentDate.hours()}${datetime_1.default.TIME_SEPARATOR}${momentDate.minutes()}`;
    }
    getMaxHour() {
        const maxTime = (0, extension_1.getExtension)(extensions_1.default.MAX_VALUE_URL, this.props.item);
        if (!maxTime) {
            return 23;
        }
        const maxTimeString = String(maxTime.valueTime);
        const hoursString = (maxTimeString || '').split(datetime_1.default.TIME_SEPARATOR)[0];
        return parseInt(hoursString, 10);
    }
    getMaxMinute() {
        const maxTime = (0, extension_1.getExtension)(extensions_1.default.MAX_VALUE_URL, this.props.item);
        if (!maxTime) {
            return 59;
        }
        const maxTimeString = String(maxTime.valueTime);
        const minuteString = (maxTimeString || '').split(datetime_1.default.TIME_SEPARATOR)[1];
        return parseInt(minuteString, 10);
    }
    getMinHour() {
        const minTime = (0, extension_1.getExtension)(extensions_1.default.MIN_VALUE_URL, this.props.item);
        if (!minTime) {
            return 0;
        }
        const minTimeString = String(minTime.valueTime);
        const hoursString = (minTimeString || '').split(datetime_1.default.TIME_SEPARATOR)[0];
        return parseInt(hoursString, 10);
    }
    getMinMinute() {
        const minTime = (0, extension_1.getExtension)(extensions_1.default.MIN_VALUE_URL, this.props.item);
        if (!minTime) {
            return 0;
        }
        const minTimeString = String(minTime.valueTime);
        const minuteString = (minTimeString || '').split(datetime_1.default.TIME_SEPARATOR)[1];
        return parseInt(minuteString, 10);
    }
    dispatchNewTime(newTime) {
        var _a;
        const { dispatch, item, path, onAnswerChange } = this.props;
        if (dispatch) {
            (_a = dispatch((0, newValue_1.newTimeValueAsync)(path, newTime, item))) === null || _a === void 0 ? void 0 : _a.then(newState => onAnswerChange(newState, path, item, { valueTime: newTime }));
        }
    }
    onTimeChange(newTime = '') {
        const validTime = this.makeValidTime(newTime);
        this.dispatchNewTime(validTime);
        if (this.props.promptLoginMessage) {
            this.props.promptLoginMessage();
        }
    }
    makeValidTime(time) {
        const values = time.split(':');
        const hours = values[0] || '00';
        const minutes = values[1] || '00';
        return this.addSeconds(`${hours.slice(-2)}:${minutes.slice(-2)}`);
    }
    addSeconds(time) {
        if (time !== '' && time.split(':').length === 2) {
            return (time += ':00');
        }
        return time;
    }
    padNumber(value) {
        if (value) {
            const values = value.split(':');
            let retVal = '';
            for (let i = 0; i < values.length; i++) {
                let timeString = '';
                if (parseInt(values[i], 10) < 10 && values[i].length === 1) {
                    timeString += '0';
                }
                timeString += values[i];
                if (i !== values.length - 1) {
                    timeString += ':';
                }
                retVal += timeString;
            }
            return retVal;
        }
        return '';
    }
    getResetButtonText() {
        if (this.props.resources && this.props.resources.resetTime) {
            return this.props.resources.resetTime;
        }
        return '';
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
        const { pdf, item, renderFieldset, id, onRenderMarkdown } = this.props;
        const subLabelText = (0, index_1.getSublabelText)(this.props.item, this.props.onRenderMarkdown, this.props.questionnaire, this.props.resources);
        if (pdf || (0, index_1.isReadOnly)(this.props.item)) {
            const value = this.getPDFValue();
            if (renderFieldset) {
                return (React.createElement(textview_1.default, { id: id, item: this.props.item, value: this.padNumber(value), onRenderMarkdown: onRenderMarkdown, helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement() }, this.props.children));
            }
            else if (value) {
                return (React.createElement("span", null,
                    ', kl. ',
                    " ",
                    this.padNumber(value)));
            }
            return React.createElement("span", null);
        }
        return (React.createElement("div", { className: "page_refero__component page_refero__component_time" },
            React.createElement(validation_1.default, Object.assign({}, this.props),
                React.createElement(time_input_1.default, { id: (0, index_1.getId)(id), value: this.getValue(), legend: React.createElement(label_1.default, { item: this.props.item, onRenderMarkdown: this.props.onRenderMarkdown, questionnaire: this.props.questionnaire, resources: this.props.resources }), subLabel: subLabelText ? React.createElement(sublabel_1.default, { subLabelText: subLabelText }) : undefined, isRequired: (0, index_1.isRequired)(item), maxHour: this.getMaxHour(), minHour: this.getMinHour(), maxMinute: this.getMaxMinute(), minMinute: this.getMinMinute(), onBlur: this.onTimeChange, className: this.props.className + ' page_refero__input', renderFieldset: this.props.renderFieldset, errorMessage: (0, extension_1.getValidationTextExtension)(item), resetButton: {
                        resetButtonText: this.getResetButtonText(),
                        onReset: this.onTimeChange,
                    }, helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement() })),
            this.props.renderDeleteButton('page_refero__deletebutton--margin-top'),
            this.props.repeatButton,
            this.props.children ? React.createElement("div", { className: "nested-fieldset nested-fieldset--full-height" }, this.props.children) : null));
    }
}
Time.defaultProps = {
    renderFieldset: true,
    path: [],
};
const withCommonFunctionsComponent = (0, with_common_functions_1.default)(Time);
const connectedComponent = (0, react_redux_1.connect)(map_props_1.mapStateToProps, map_props_1.mapDispatchToProps, map_props_1.mergeProps)(withCommonFunctionsComponent);
exports.default = connectedComponent;
//# sourceMappingURL=time.js.map