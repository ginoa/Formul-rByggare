"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_collapse_1 = require("react-collapse");
const Loader_1 = tslib_1.__importDefault(require("@helsenorge/designsystem-react/components/Loader"));
const NotificationPanel_1 = tslib_1.__importDefault(require("@helsenorge/designsystem-react/components/NotificationPanel"));
const autosuggest_1 = tslib_1.__importDefault(require("@helsenorge/autosuggest/components/autosuggest"));
const debounce_1 = require("@helsenorge/core-utils/debounce");
const validation_1 = tslib_1.__importDefault(require("@helsenorge/form/components/form/validation"));
const constants_1 = require("../../../constants");
const itemType_1 = tslib_1.__importDefault(require("../../../constants/itemType"));
const extension_1 = require("../../../util/extension");
const index_1 = require("../../../util/index");
const label_1 = tslib_1.__importDefault(require("../label"));
const sublabel_1 = tslib_1.__importDefault(require("../sublabel"));
class AutosuggestView extends React.Component {
    constructor(props) {
        var _a;
        super(props);
        this.debouncedOnSuggestionsFetchRequested = (0, debounce_1.debounce)(this.onSuggestionsFetchRequested, ((_a = this.props.autoSuggestProps) === null || _a === void 0 ? void 0 : _a.typingSearchDelay) || 500, false);
        const codingAnswer = this.getCodingAnswer();
        const initialInputValue = (codingAnswer === null || codingAnswer === void 0 ? void 0 : codingAnswer.code) === constants_1.OPEN_CHOICE_ID && (codingAnswer === null || codingAnswer === void 0 ? void 0 : codingAnswer.system) === constants_1.OPEN_CHOICE_SYSTEM ? this.getStringAnswer() : codingAnswer === null || codingAnswer === void 0 ? void 0 : codingAnswer.display;
        this.state = {
            inputValue: initialInputValue || '',
            lastSearchValue: '',
            system: '',
            suggestions: [],
            noSuggestionsToShow: false,
            isLoading: false,
            hasLoadError: false,
            isDirty: false,
        };
        this.debouncedOnSuggestionsFetchRequested = this.debouncedOnSuggestionsFetchRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.errorCallback = this.errorCallback.bind(this);
        this.successCallback = this.successCallback.bind(this);
        this.onSubmitValidator = this.onSubmitValidator.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }
    isOpenChoice() {
        return this.props.item.type === itemType_1.default.OPENCHOICE;
    }
    onSubmitValidator() {
        return (0, index_1.isRequired)(this.props.item) ? !!this.hasCodingAnswer() || !!this.hasStringAnswer() : true;
    }
    successCallback(valueSet) {
        if (!valueSet.compose ||
            !valueSet.compose.include ||
            valueSet.compose.include.length === 0 ||
            !valueSet.compose.include[0].concept ||
            !valueSet.compose.include[0].system) {
            this.setState({
                isLoading: false,
                noSuggestionsToShow: !this.isOpenChoice(),
                suggestions: [],
            });
            return;
        }
        this.setState({
            isLoading: false,
            system: valueSet.compose.include[0].system || '',
            suggestions: valueSet.compose.include[0].concept.map(x => {
                return { label: x.display || '', value: x.code };
            }),
        });
    }
    errorCallback() {
        this.setState({
            isLoading: false,
            hasLoadError: true,
        });
    }
    clearCodingAnswerIfExists() {
        const codingAnswer = this.getCodingAnswer();
        const hasStringAnswer = this.hasStringAnswer();
        if (codingAnswer && !hasStringAnswer) {
            this.props.clearCodingAnswer(codingAnswer);
        }
    }
    onSuggestionsFetchRequested({ value }) {
        var _a;
        if (value.length < (((_a = this.props.autoSuggestProps) === null || _a === void 0 ? void 0 : _a.minSearchCharacters) || 0)) {
            this.setState({
                suggestions: [],
            });
            return;
        }
        if (value === this.state.lastSearchValue) {
            return;
        }
        if (this.props.fetchValueSet) {
            this.setState({
                isLoading: true,
                suggestions: [],
                lastSearchValue: value,
            });
            this.clearCodingAnswerIfExists();
            this.props.fetchValueSet(value, this.props.item, this.successCallback, this.errorCallback);
        }
    }
    onChangeInput(_event, { newValue }) {
        if (newValue === '') {
            this.clearCodingAnswerIfExists();
        }
        this.setState({
            inputValue: newValue,
            isDirty: true,
            noSuggestionsToShow: false,
            hasLoadError: this.state.hasLoadError && !newValue,
        });
    }
    onSuggestionSelected(_event, { suggestion }) {
        this.setState({
            lastSearchValue: suggestion.label,
            isDirty: false,
        });
        this.props.handleChange(suggestion.value, this.state.system, suggestion.label);
    }
    onBlur(_e, { highlightedSuggestion }) {
        var _a;
        if (this.state.isDirty && highlightedSuggestion) {
            this.setState({
                lastSearchValue: highlightedSuggestion.label,
                isDirty: false,
                noSuggestionsToShow: false,
            });
            this.props.handleChange(highlightedSuggestion.value, this.state.system, highlightedSuggestion.label);
        }
        else if (this.state.isDirty && this.isOpenChoice() && this.props.handleStringChange) {
            this.setState({
                isDirty: false,
                noSuggestionsToShow: false,
            });
            const codingAnswer = this.getCodingAnswer();
            if (this.state.inputValue) {
                this.props.handleChange(constants_1.OPEN_CHOICE_ID, constants_1.OPEN_CHOICE_SYSTEM, (_a = this.props.resources) === null || _a === void 0 ? void 0 : _a.openChoiceOption);
                this.props.handleStringChange(this.state.inputValue);
            }
            else if (codingAnswer) {
                this.props.clearCodingAnswer(codingAnswer);
                this.props.handleStringChange('');
            }
        }
        else {
            this.setState({
                noSuggestionsToShow: false,
            });
        }
    }
    hasStringAnswer() {
        return !!this.getStringAnswer();
    }
    hasCodingAnswer() {
        return !!this.getCodingAnswer();
    }
    getCodingAnswer() {
        if (Array.isArray(this.props.answer)) {
            return this.props.answer.reduce((acc, x) => acc || x.valueCoding, undefined);
        }
        else if (this.props.answer) {
            return this.props.answer.valueCoding;
        }
        return undefined;
    }
    getStringAnswer() {
        if (Array.isArray(this.props.answer)) {
            return this.props.answer.reduce((acc, x) => acc || x.valueString, undefined);
        }
        else if (this.props.answer) {
            return this.props.answer.valueString;
        }
    }
    render() {
        var _a, _b, _c;
        const subLabelText = (0, index_1.getSublabelText)(this.props.item, this.props.onRenderMarkdown, this.props.questionnaire, this.props.resources);
        return (React.createElement("div", { className: "page_refero__component page_refero__component_choice page_refero__component_choice_autosuggest" },
            React.createElement(react_collapse_1.Collapse, { isOpened: true },
                React.createElement(validation_1.default, Object.assign({}, this.props),
                    React.createElement(autosuggest_1.default, { id: (0, index_1.getId)(this.props.id), label: React.createElement(label_1.default, { item: this.props.item, onRenderMarkdown: this.props.onRenderMarkdown, questionnaire: this.props.questionnaire, resources: this.props.resources }), subLabel: subLabelText ? React.createElement(sublabel_1.default, { subLabelText: subLabelText }) : undefined, className: "page_refero__autosuggest", type: "search", isRequired: (0, index_1.isRequired)(this.props.item), placeholder: (0, extension_1.getPlaceholder)(this.props.item), errorMessage: (0, extension_1.getValidationTextExtension)(this.props.item), helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement(), suggestions: this.state.suggestions, onSuggestionsFetchRequested: this.debouncedOnSuggestionsFetchRequested, onSuggestionsClearRequested: () => {
                        }, noCharacterValidation: true, onSubmitValidator: this.onSubmitValidator, onSuggestionSelected: this.onSuggestionSelected, onChange: this.onChangeInput, onBlur: this.onBlur, focusInputOnSuggestionClick: true, value: this.state.inputValue })),
                this.state.isLoading && (React.createElement("div", null,
                    React.createElement(Loader_1.default, { size: 'tiny' }))),
                this.state.noSuggestionsToShow && (React.createElement("div", { className: "page_refero__no-suggestions" }, (_b = (_a = this.props.resources) === null || _a === void 0 ? void 0 : _a.autosuggestNoSuggestions) === null || _b === void 0 ? void 0 : _b.replace('{0}', this.state.inputValue))),
                this.state.hasLoadError && React.createElement(NotificationPanel_1.default, { variant: "alert" }, (_c = this.props.resources) === null || _c === void 0 ? void 0 : _c.autoSuggestLoadError),
                this.props.renderDeleteButton('page_refero__deletebutton--margin-top'),
                this.props.repeatButton,
                this.props.children ? React.createElement("div", { className: "nested-fieldset nested-fieldset--full-height" }, this.props.children) : null)));
    }
}
exports.default = AutosuggestView;
//# sourceMappingURL=autosuggest-view.js.map