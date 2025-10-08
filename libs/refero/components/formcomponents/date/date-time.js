"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_redux_1 = require("react-redux");
const languages_1 = require("@helsenorge/core-utils/constants/languages");
const layout_change_1 = tslib_1.__importDefault(require("@helsenorge/core-utils/hoc/layout-change"));
const date_time_picker_1 = tslib_1.__importDefault(require("@helsenorge/date-time/components/date-time-picker"));
const date_time_picker_utils_1 = require("@helsenorge/date-time/components/date-time-picker/date-time-picker-utils");
const date_core_1 = require("@helsenorge/date-time/components/time-input/date-core");
const validation_1 = tslib_1.__importDefault(require("@helsenorge/form/components/form/validation"));
const newValue_1 = require("../../../actions/newValue");
const extensions_1 = tslib_1.__importDefault(require("../../../constants/extensions"));
const index_1 = tslib_1.__importDefault(require("../../../constants/index"));
const extension_1 = require("../../../util/extension");
const fhirpathHelper_1 = require("../../../util/fhirpathHelper");
const index_2 = require("../../../util/index");
const map_props_1 = require("../../../util/map-props");
const with_common_functions_1 = tslib_1.__importDefault(require("../../with-common-functions"));
const label_1 = tslib_1.__importDefault(require("../label"));
const sublabel_1 = tslib_1.__importDefault(require("../sublabel"));
const textview_1 = tslib_1.__importDefault(require("../textview"));
class DateTime extends React.Component {
    constructor() {
        super(...arguments);
        this.dispatchNewDate = (date, time) => {
            var _a;
            const { dispatch, promptLoginMessage, onAnswerChange, answer, path, item } = this.props;
            const momentDate = (0, date_time_picker_utils_1.getFullMomentDate)(date, time);
            const dateTimeString = momentDate ? momentDate.locale('nb').utc().format(index_1.default.DATE_TIME_FORMAT) : '';
            const existingAnswer = (answer === null || answer === void 0 ? void 0 : answer.valueDateTime) || '';
            if (dispatch && existingAnswer !== dateTimeString) {
                (_a = dispatch((0, newValue_1.newDateTimeValueAsync)(this.props.path, dateTimeString, this.props.item))) === null || _a === void 0 ? void 0 : _a.then(newState => onAnswerChange(newState, path, item, { valueDateTime: dateTimeString }));
            }
            if (promptLoginMessage) {
                promptLoginMessage();
            }
        };
        this.promptLogin = () => {
            if (this.props.promptLoginMessage) {
                this.props.promptLoginMessage();
            }
        };
        this.onBlur = () => {
            return true;
        };
        this.convertDateToString = (item, answer) => {
            const date = this.getDefaultDate(item, answer);
            if (date) {
                return (0, moment_1.default)(date).locale('nb').format('LLL');
            }
            return undefined;
        };
        this.getStringValue = () => {
            const { item, answer } = this.props;
            if (Array.isArray(answer)) {
                return answer.map(m => this.convertDateToString(item, m)).join(', ');
            }
            const date = this.convertDateToString(item, answer);
            let text = '';
            if (this.props.resources && this.props.resources.ikkeBesvart) {
                text = this.props.resources.ikkeBesvart;
            }
            return date !== null && date !== void 0 ? date : text;
        };
        this.getLocaleFromLanguage = () => {
            var _a;
            if (((_a = this.props.language) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'en-gb') {
                return languages_1.LanguageLocales.ENGLISH;
            }
            return languages_1.LanguageLocales.NORWEGIAN;
        };
    }
    getDefaultDate(item, answer) {
        if (answer && answer.valueDateTime) {
            return (0, date_core_1.parseDate)(String(answer.valueDateTime));
        }
        if (answer && answer.valueDate) {
            return (0, date_core_1.parseDate)(String(answer.valueDate));
        }
        if (!item || !item.initial || item.initial.length === 0) {
            return undefined;
        }
        if (!item.initial[0].valueDate && !item.initial[0].valueDateTime) {
            return undefined;
        }
        if (item.initial[0].valueDateTime) {
            return (0, date_core_1.parseDate)(String(item.initial[0].valueDateTime));
        }
        return (0, date_core_1.parseDate)(String(item.initial[0].valueDate));
    }
    getMaxDate() {
        const maxDate = (0, extension_1.getExtension)(extensions_1.default.DATE_MAX_VALUE_URL, this.props.item);
        if (maxDate && maxDate.valueString)
            return (0, fhirpathHelper_1.evaluateFhirpathExpressionToGetDate)(this.props.item, maxDate.valueString);
        return this.getMaxDateWithExtension();
    }
    getMaxDateWithExtension() {
        const maxDate = (0, extension_1.getExtension)(extensions_1.default.MAX_VALUE_URL, this.props.item);
        if (!maxDate) {
            return;
        }
        if (maxDate.valueDate) {
            return (0, date_core_1.parseDate)(String(maxDate.valueDate));
        }
        else if (maxDate.valueDateTime) {
            return (0, date_core_1.parseDate)(String(maxDate.valueDateTime));
        }
        return undefined;
    }
    getMinDate() {
        const minDate = (0, extension_1.getExtension)(extensions_1.default.DATE_MIN_VALUE_URL, this.props.item);
        if (minDate && minDate.valueString)
            return (0, fhirpathHelper_1.evaluateFhirpathExpressionToGetDate)(this.props.item, minDate.valueString);
        return this.getMinDateWithExtension();
    }
    getMinDateWithExtension() {
        const minDate = (0, extension_1.getExtension)(extensions_1.default.MIN_VALUE_URL, this.props.item);
        if (!minDate) {
            return;
        }
        if (minDate.valueDate) {
            return (0, date_core_1.parseDate)(String(minDate.valueDate));
        }
        else if (minDate.valueDateTime) {
            return (0, date_core_1.parseDate)(String(minDate.valueDateTime));
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
    toLocaleDate(moment) {
        return moment ? moment.locale(this.getLocaleFromLanguage()) : undefined;
    }
    render() {
        const _a = this.props, { item, pdf, id, onRenderMarkdown } = _a, other = tslib_1.__rest(_a, ["item", "pdf", "id", "onRenderMarkdown"]);
        if (pdf || (0, index_2.isReadOnly)(item)) {
            return (React.createElement(textview_1.default, { id: id, item: item, value: this.getStringValue(), onRenderMarkdown: onRenderMarkdown, helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement() }, this.props.children));
        }
        const valueDateTime = this.getDefaultDate(this.props.item, this.props.answer);
        const maxDateTime = this.getMaxDate();
        const minDateTime = this.getMinDate();
        const subLabelText = (0, index_2.getSublabelText)(this.props.item, this.props.onRenderMarkdown, this.props.questionnaire, this.props.resources);
        return (React.createElement("div", { className: "page_refero__component page_refero__component_datetime" },
            React.createElement(validation_1.default, Object.assign({}, other),
                React.createElement(date_time_picker_1.default, { id: (0, index_2.getId)(id), resources: { dateResources: this.props.resources }, locale: this.getLocaleFromLanguage(), dateValue: valueDateTime ? this.toLocaleDate((0, moment_1.default)(valueDateTime)) : undefined, timeValue: valueDateTime ? (0, moment_1.default)(valueDateTime).format('HH:mm') : undefined, maximumDateTime: maxDateTime ? this.toLocaleDate((0, moment_1.default)(maxDateTime)) : undefined, minimumDateTime: minDateTime ? this.toLocaleDate((0, moment_1.default)(minDateTime)) : undefined, initialDate: this.toLocaleDate((0, moment_1.default)(new Date())), onChange: this.dispatchNewDate, onBlur: this.onBlur, legend: React.createElement(label_1.default, { item: this.props.item, onRenderMarkdown: this.props.onRenderMarkdown, questionnaire: this.props.questionnaire, resources: this.props.resources }), subLabel: subLabelText ? React.createElement(sublabel_1.default, { subLabelText: subLabelText }) : undefined, isRequired: (0, index_2.isRequired)(item), errorMessage: (0, extension_1.getValidationTextExtension)(item), timeClassName: "page_refero__input", helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement() })),
            this.props.renderDeleteButton('page_refero__deletebutton--margin-top'),
            this.props.repeatButton,
            this.props.children ? React.createElement("div", { className: "nested-fieldset nested-fieldset--full-height" }, this.props.children) : null));
    }
}
const withCommonFunctionsComponent = (0, with_common_functions_1.default)(DateTime);
const connectedComponent = (0, react_redux_1.connect)(map_props_1.mapStateToProps, map_props_1.mapDispatchToProps, map_props_1.mergeProps)((0, layout_change_1.default)(withCommonFunctionsComponent));
exports.default = connectedComponent;
//# sourceMappingURL=date-time.js.map