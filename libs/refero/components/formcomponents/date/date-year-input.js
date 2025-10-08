"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateYearInput = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const year_input_1 = require("@helsenorge/date-time/components/year-input");
const validation_1 = require("@helsenorge/form/components/form/validation");
const util_1 = require("../../../util");
const extension_1 = require("../../../util/extension");
const textview_1 = tslib_1.__importDefault(require("../textview"));
const createDateFromYear_1 = require("../../../util/createDateFromYear");
const DateYearInput = (props) => {
    var _a, _b;
    const [answerState, setAnswerState] = React.useState(0);
    const getYear = () => {
        if (Array.isArray(props.answer)) {
            return props.answer.map(m => { var _a; return (_a = (0, createDateFromYear_1.createDateFromYear)(props.item, m)) === null || _a === void 0 ? void 0 : _a.getFullYear(); });
        }
    };
    React.useEffect(() => {
        var _a;
        props.answer ? setAnswerState(Number(props.answer.valueDate)) : setAnswerState((_a = getYear()) === null || _a === void 0 ? void 0 : _a[0]);
    }, [props.answer]);
    function getYearInputResources() {
        const { resources, item } = props;
        const validationErrorText = (0, extension_1.getValidationTextExtension)(item);
        return {
            errorInvalidYear: validationErrorText ? validationErrorText : (resources === null || resources === void 0 ? void 0 : resources.year_field_invalid) || '',
            errorRequiredYear: (resources === null || resources === void 0 ? void 0 : resources.year_field_required) || '',
            errorYearBeforeMinDate: (resources === null || resources === void 0 ? void 0 : resources.year_field_mindate) || '',
            errorYearAfterMaxDate: (resources === null || resources === void 0 ? void 0 : resources.year_field_maxdate) || '',
        };
    }
    const onYearChange = (year) => {
        props.onDateValueChange(year === 0 ? '' : year.toString());
    };
    const getPDFValue = () => {
        var _a, _b;
        const ikkeBesvartText = ((_a = props.resources) === null || _a === void 0 ? void 0 : _a.ikkeBesvart) || '';
        return (((_b = getYear()) === null || _b === void 0 ? void 0 : _b.map(m => m === null || m === void 0 ? void 0 : m.toString()).join(', ')) || ikkeBesvartText);
    };
    if (props.pdf || (0, util_1.isReadOnly)(props.item)) {
        return (React.createElement(textview_1.default, { id: props.id, item: props.item, value: getPDFValue(), onRenderMarkdown: props.onRenderMarkdown, helpButton: props.helpButton, helpElement: props.helpElement }, props.children));
    }
    return (React.createElement(validation_1.Validation, Object.assign({}, props),
        React.createElement(year_input_1.YearInput, { id: `${(0, util_1.getId)(props.id)}-year_input`, errorResources: getYearInputResources(), label: props.label, subLabel: props.subLabel, isRequired: (0, util_1.isRequired)(props.item), placeholder: (0, extension_1.getPlaceholder)(props.item), maximumYear: (_a = props.maxDate) === null || _a === void 0 ? void 0 : _a.year(), minimumYear: (_b = props.minDate) === null || _b === void 0 ? void 0 : _b.year(), value: answerState, className: props.className, onChange: onYearChange, helpButton: props.helpButton, helpElement: props.helpElement })));
};
exports.DateYearInput = DateYearInput;
//# sourceMappingURL=date-year-input.js.map