"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateYearMonthInput = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const year_month_input_1 = require("@helsenorge/date-time/components/year-month-input");
const validation_1 = require("@helsenorge/form/components/form/validation");
const util_1 = require("../../../util");
const extension_1 = require("../../../util/extension");
const textview_1 = tslib_1.__importDefault(require("../textview"));
class DateYearMonthInput extends React.Component {
    constructor() {
        super(...arguments);
        this.onYearMonthChange = (newValue) => {
            if (!newValue.year && (newValue.month === -1 || newValue.month === null)) {
                this.props.onDateValueChange('');
            }
            else {
                const newMonthValue = newValue.month === null || newValue.month === -1 ? '' : `0${newValue.month + 1}`.slice(-2);
                this.props.onDateValueChange(`${newValue.year}-${newMonthValue}`);
            }
        };
        this.getDateValueFromAnswer = (answer) => {
            if (answer && answer.valueDate) {
                return answer.valueDate;
            }
            if (answer && answer.valueDateTime) {
                return answer.valueDateTime;
            }
        };
        this.getValue = () => {
            const { answer } = this.props;
            const stringValue = this.getDateValueFromAnswer(answer);
            if (!stringValue) {
                return undefined;
            }
            else {
                const monthPart = stringValue.split('-')[1];
                const yearValue = parseInt(stringValue.split('-')[0]) || 0;
                const monthValue = monthPart === '' || monthPart === undefined ? null : parseInt(stringValue.split('-')[1]) - 1;
                return {
                    year: yearValue,
                    month: monthValue,
                };
            }
        };
        this.getMinMaxDate = (dateValue) => {
            return dateValue
                ? {
                    year: dateValue.year(),
                    month: dateValue.month(),
                }
                : undefined;
        };
        this.convertToPDFValue = (answer) => {
            const value = this.getDateValueFromAnswer(answer);
            return (0, moment_1.default)(value).locale(this.props.locale).format('MMMM YYYY');
        };
        this.getPDFValue = () => {
            var _a;
            const ikkeBesvartText = ((_a = this.props.resources) === null || _a === void 0 ? void 0 : _a.ikkeBesvart) || '';
            if (Array.isArray(this.props.answer)) {
                return this.props.answer.map(m => this.convertToPDFValue(m)).join(', ');
            }
            return ikkeBesvartText;
        };
    }
    getYearMonthInputResources() {
        const { resources, item } = this.props;
        const validationErrorText = (0, extension_1.getValidationTextExtension)(item);
        return {
            errorInvalidYearMonth: validationErrorText ? validationErrorText : (resources === null || resources === void 0 ? void 0 : resources.yearmonth_field_invalid) || '',
            errorInvalidYear: (resources === null || resources === void 0 ? void 0 : resources.yearmonth_field_invalid_year) || '',
            errorRequiredField: (resources === null || resources === void 0 ? void 0 : resources.yearmonth_field_required) || '',
            errorBeforeMinDate: (resources === null || resources === void 0 ? void 0 : resources.yearmonth_field_mindate) || '',
            errorAfterMaxDate: (resources === null || resources === void 0 ? void 0 : resources.yearmonth_field_maxdate) || '',
            selectYearPlaceholder: (resources === null || resources === void 0 ? void 0 : resources.yearmonth_field_year_placeholder) || '',
            selectMonthPlaceholder: (resources === null || resources === void 0 ? void 0 : resources.yearmonth_field_month_placeholder) || '',
        };
    }
    render() {
        if (this.props.pdf || (0, util_1.isReadOnly)(this.props.item)) {
            return (React.createElement(textview_1.default, { id: this.props.id, item: this.props.item, value: this.getPDFValue(), onRenderMarkdown: this.props.onRenderMarkdown, helpButton: this.props.helpButton, helpElement: this.props.helpElement }, this.props.children));
        }
        return (React.createElement(validation_1.Validation, Object.assign({}, this.props),
            React.createElement(year_month_input_1.YearMonthInput, { id: `${(0, util_1.getId)(this.props.id)}-yearmonth_input`, locale: this.props.locale, resources: this.getYearMonthInputResources(), legend: this.props.label, subLabel: this.props.subLabel, isRequired: (0, util_1.isRequired)(this.props.item), placeholder: (0, extension_1.getPlaceholder)(this.props.item), maximumYearMonth: this.getMinMaxDate(this.props.maxDate), minimumYearMonth: this.getMinMaxDate(this.props.minDate), value: this.getValue(), className: this.props.className, onChange: this.onYearMonthChange, helpButton: this.props.helpButton, helpElement: this.props.helpElement })));
    }
}
exports.DateYearMonthInput = DateYearMonthInput;
//# sourceMappingURL=date-month-input.js.map