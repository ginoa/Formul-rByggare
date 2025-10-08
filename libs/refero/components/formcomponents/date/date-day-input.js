"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateDayInput = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const date_range_picker_1 = require("@helsenorge/date-time/components/date-range-picker");
const validation_1 = require("@helsenorge/form/components/form/validation");
const date_core_1 = require("@helsenorge/date-time/components/time-input/date-core");
const index_1 = tslib_1.__importDefault(require("../../../constants/index"));
const util_1 = require("../../../util");
const extension_1 = require("../../../util/extension");
const index_2 = require("../../../util/index");
const textview_1 = tslib_1.__importDefault(require("../textview"));
class DateDayInput extends React.Component {
    constructor() {
        super(...arguments);
        this.isValidDate = (date) => {
            if (date instanceof Date) {
                const text = Date.prototype.toString.call(date);
                return text !== 'Invalid Date';
            }
            return false;
        };
        this.onDateChange = (value) => {
            const newValue = value ? (0, moment_1.default)(value).format(index_1.default.DATE_FORMAT) : '';
            this.props.onDateValueChange(newValue);
        };
        this.getPDFValue = () => {
            var _a;
            const date = this.getValue();
            const ikkeBesvartText = ((_a = this.props.resources) === null || _a === void 0 ? void 0 : _a.ikkeBesvart) || '';
            return date ? date.map(m => (0, moment_1.default)(m).format('D. MMMM YYYY')).join(', ') : ikkeBesvartText;
        };
        this.getSingleDateValue = () => {
            const date = this.getValue();
            return date ? this.toLocaleDate((0, moment_1.default)(date[0])) : undefined;
        };
    }
    getDatepickerErrorPhrases() {
        const { resources, item } = this.props;
        const validationErrorText = (0, extension_1.getValidationTextExtension)(item);
        return {
            errorInvalidDate: validationErrorText ? validationErrorText : (resources === null || resources === void 0 ? void 0 : resources.filterDateErrorDateFormat) || '',
            errorAfterMaxDate: (resources === null || resources === void 0 ? void 0 : resources.errorAfterMaxDate) || '',
            errorBeforeMinDate: (resources === null || resources === void 0 ? void 0 : resources.errorBeforeMinDate) || '',
            errorInvalidDateRange: '',
            errorRequiredDate: (resources === null || resources === void 0 ? void 0 : resources.dateRequired) || '',
            errorRequiredDateRange: '',
            errorInvalidMinimumNights: '',
        };
    }
    getDateAnswerValue(answer) {
        if (answer && answer.valueDate) {
            return answer.valueDate;
        }
        if (answer && answer.valueDateTime) {
            return answer.valueDateTime;
        }
    }
    getValue() {
        const { item, answer } = this.props;
        if (answer && Array.isArray(answer)) {
            return answer.map(m => (0, date_core_1.parseDate)(String(this.getDateAnswerValue(m))));
        }
        if (Array.isArray(item.initial)) {
            return item.initial.map(m => (0, date_core_1.parseDate)(String(this.getDateAnswerValue(m))));
        }
        if (answer) {
            const parsedDate = [(0, date_core_1.parseDate)(String(this.getDateAnswerValue(answer)))];
            if (this.isValidDate(parsedDate[0]) === true) {
                return parsedDate;
            }
            else {
                return undefined;
            }
        }
    }
    toLocaleDate(moment) {
        return moment ? moment.locale(this.props.locale) : undefined;
    }
    render() {
        if (this.props.pdf || (0, index_2.isReadOnly)(this.props.item)) {
            return (React.createElement(textview_1.default, { id: this.props.id, item: this.props.item, value: this.getPDFValue(), onRenderMarkdown: this.props.onRenderMarkdown, helpButton: this.props.helpButton, helpElement: this.props.helpElement }, this.props.children));
        }
        return (React.createElement(validation_1.Validation, Object.assign({}, this.props),
            React.createElement(date_range_picker_1.DateRangePicker, { type: "single", id: `${(0, util_1.getId)(this.props.id)}-datepicker_input`, locale: this.props.locale, errorResources: this.getDatepickerErrorPhrases(), resources: this.props.resources, label: this.props.label, subLabel: this.props.subLabel, isRequired: (0, util_1.isRequired)(this.props.item), placeholder: (0, extension_1.getPlaceholder)(this.props.item), ref: this.props.datepickerRef, maximumDate: this.toLocaleDate(this.props.maxDate), minimumDate: this.toLocaleDate(this.props.minDate), singleDateValue: this.getSingleDateValue(), className: this.props.className, onDateChange: this.onDateChange, validationErrorRenderer: this.props.validationErrorRenderer, helpButton: this.props.helpButton, helpElement: this.props.helpElement })));
    }
}
exports.DateDayInput = DateDayInput;
//# sourceMappingURL=date-day-input.js.map