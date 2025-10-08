"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_redux_1 = require("react-redux");
const languages_1 = require("@helsenorge/core-utils/constants/languages");
const date_core_1 = require("@helsenorge/date-time/components/time-input/date-core");
const newValue_1 = require("../../../actions/newValue");
const extensions_1 = tslib_1.__importDefault(require("../../../constants/extensions"));
const itemcontrol_1 = tslib_1.__importDefault(require("../../../constants/itemcontrol"));
const extension_1 = require("../../../util/extension");
const fhirpathHelper_1 = require("../../../util/fhirpathHelper");
const index_1 = require("../../../util/index");
const map_props_1 = require("../../../util/map-props");
const with_common_functions_1 = tslib_1.__importDefault(require("../../with-common-functions"));
const label_1 = tslib_1.__importDefault(require("../label"));
const sublabel_1 = tslib_1.__importDefault(require("../sublabel"));
const date_day_input_1 = require("./date-day-input");
const date_month_input_1 = require("./date-month-input");
const date_year_input_1 = require("./date-year-input");
class DateComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onDateValueChange = (newValue) => {
            var _a;
            const { dispatch, promptLoginMessage, path, item, answer, onAnswerChange } = this.props;
            const existingAnswer = (answer === null || answer === void 0 ? void 0 : answer.valueDate) || '';
            if (dispatch && newValue !== existingAnswer) {
                (_a = dispatch((0, newValue_1.newDateValueAsync)(this.props.path, newValue, this.props.item))) === null || _a === void 0 ? void 0 : _a.then(newState => onAnswerChange(newState, path, item, { valueDate: newValue }));
                if (promptLoginMessage) {
                    promptLoginMessage();
                }
            }
        };
        this.getLocaleFromLanguage = () => {
            var _a;
            if (((_a = this.props.language) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'en-gb') {
                return languages_1.LanguageLocales.ENGLISH;
            }
            return languages_1.LanguageLocales.NORWEGIAN;
        };
        this.datepicker = React.createRef();
    }
    getMaxDate() {
        const maxDate = (0, extension_1.getExtension)(extensions_1.default.DATE_MAX_VALUE_URL, this.props.item);
        if (maxDate && maxDate.valueString) {
            const fhirPathExpression = (0, fhirpathHelper_1.evaluateFhirpathExpressionToGetDate)(this.props.item, maxDate.valueString);
            return fhirPathExpression ? (0, moment_1.default)(fhirPathExpression) : undefined;
        }
        const maxDateWithExtension = this.getMaxDateWithExtension();
        return maxDateWithExtension ? (0, moment_1.default)(maxDateWithExtension) : undefined;
    }
    getMaxDateWithExtension() {
        const maxDate = (0, extension_1.getExtension)(extensions_1.default.MAX_VALUE_URL, this.props.item);
        if (maxDate && maxDate.valueDate) {
            return (0, date_core_1.parseDate)(String(maxDate.valueDate));
        }
        else if (maxDate && maxDate.valueDateTime) {
            return (0, date_core_1.parseDate)(String(maxDate.valueDateTime));
        }
        else if (maxDate && maxDate.valueInstant) {
            return (0, date_core_1.parseDate)(String(maxDate.valueInstant));
        }
        return undefined;
    }
    getMinDate() {
        const minDate = (0, extension_1.getExtension)(extensions_1.default.DATE_MIN_VALUE_URL, this.props.item);
        if (minDate && minDate.valueString) {
            const fhirPathExpression = (0, fhirpathHelper_1.evaluateFhirpathExpressionToGetDate)(this.props.item, minDate.valueString);
            return fhirPathExpression ? (0, moment_1.default)(fhirPathExpression) : undefined;
        }
        const minDateWithExtension = this.getMinDateWithExtension();
        return minDateWithExtension ? (0, moment_1.default)(minDateWithExtension) : undefined;
    }
    getMinDateWithExtension() {
        const minDate = (0, extension_1.getExtension)(extensions_1.default.MIN_VALUE_URL, this.props.item);
        if (minDate && minDate.valueDate) {
            return (0, date_core_1.parseDate)(String(minDate.valueDate));
        }
        else if (minDate && minDate.valueDateTime) {
            return (0, date_core_1.parseDate)(String(minDate.valueDateTime));
        }
        else if (minDate && minDate.valueInstant) {
            return (0, date_core_1.parseDate)(String(minDate.valueInstant));
        }
        return undefined;
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
        const subLabelText = (0, index_1.getSublabelText)(this.props.item, this.props.onRenderMarkdown, this.props.questionnaire, this.props.resources);
        const itemControls = (0, extension_1.getItemControlExtensionValue)(this.props.item);
        const labelEl = (React.createElement(label_1.default, { item: this.props.item, onRenderMarkdown: this.props.onRenderMarkdown, questionnaire: this.props.questionnaire, resources: this.props.resources }));
        const subLabelEl = subLabelText ? React.createElement(sublabel_1.default, { subLabelText: subLabelText }) : undefined;
        let element = undefined;
        if (itemControls && itemControls.some(itemControl => itemControl.code === itemcontrol_1.default.YEAR)) {
            element = (React.createElement(date_year_input_1.DateYearInput, Object.assign({ label: labelEl, subLabel: subLabelEl, helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement(), onDateValueChange: this.onDateValueChange, maxDate: this.getMaxDate(), minDate: this.getMinDate() }, this.props)));
        }
        else if (itemControls && itemControls.some(itemControl => itemControl.code === itemcontrol_1.default.YEARMONTH)) {
            element = (React.createElement(date_month_input_1.DateYearMonthInput, Object.assign({ label: labelEl, locale: this.getLocaleFromLanguage(), subLabel: subLabelEl, helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement(), onDateValueChange: this.onDateValueChange, maxDate: this.getMaxDate(), minDate: this.getMinDate() }, this.props)));
        }
        else {
            element = (React.createElement(date_day_input_1.DateDayInput, Object.assign({ locale: this.getLocaleFromLanguage(), label: labelEl, subLabel: subLabelEl, datepickerRef: this.datepicker, helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement(), onDateValueChange: this.onDateValueChange, maxDate: this.getMaxDate(), minDate: this.getMinDate() }, this.props)));
        }
        return (React.createElement("div", { className: "page_refero__component page_refero__component_date" },
            element,
            this.props.renderDeleteButton('page_refero__deletebutton--margin-top'),
            this.props.repeatButton,
            this.props.children ? React.createElement("div", { className: "nested-fieldset nested-fieldset--full-height" }, this.props.children) : null));
    }
}
DateComponent.defaultProps = {
    path: [],
};
const withCommonFunctionsComponent = (0, with_common_functions_1.default)(DateComponent);
const connectedComponent = (0, react_redux_1.connect)(map_props_1.mapStateToProps, map_props_1.mapDispatchToProps, map_props_1.mergeProps)(withCommonFunctionsComponent);
exports.default = connectedComponent;
//# sourceMappingURL=date.js.map