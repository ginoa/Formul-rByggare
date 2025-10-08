"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIE11 = exports.getDecimalValue = exports.getDecimalPattern = exports.getTextValidationErrorMessage = exports.validateText = exports.shouldRenderRepeatButton = exports.repeats = exports.getMaxLength = exports.getPDFStringValue = exports.getStringValue = exports.getLinkId = exports.getChildHeaderTag = exports.getText = exports.getSublabelText = exports.renderPrefix = exports.getId = exports.isHiddenItem = exports.isDataReceiver = exports.isRepeat = exports.isRequired = exports.isReadOnly = exports.isStringEmpty = exports.getComponentForItem = void 0;
const tslib_1 = require("tslib");
const uuid = tslib_1.__importStar(require("uuid"));
const string_utils_1 = require("@helsenorge/core-utils/string-utils");
const attachment_1 = tslib_1.__importDefault(require("../components/formcomponents/attachment/attachment"));
const boolean_1 = tslib_1.__importDefault(require("../components/formcomponents/boolean/boolean"));
const choice_1 = tslib_1.__importDefault(require("../components/formcomponents/choice/choice"));
const date_1 = tslib_1.__importDefault(require("../components/formcomponents/date/date"));
const date_time_1 = tslib_1.__importDefault(require("../components/formcomponents/date/date-time"));
const time_1 = tslib_1.__importDefault(require("../components/formcomponents/date/time"));
const decimal_1 = tslib_1.__importDefault(require("../components/formcomponents/decimal/decimal"));
const display_1 = tslib_1.__importDefault(require("../components/formcomponents/display/display"));
const group_1 = tslib_1.__importDefault(require("../components/formcomponents/group/group"));
const integer_1 = tslib_1.__importDefault(require("../components/formcomponents/integer/integer"));
const open_choice_1 = tslib_1.__importDefault(require("../components/formcomponents/open-choice/open-choice"));
const quantity_1 = tslib_1.__importDefault(require("../components/formcomponents/quantity/quantity"));
const string_1 = tslib_1.__importDefault(require("../components/formcomponents/string/string"));
const text_1 = tslib_1.__importDefault(require("../components/formcomponents/text/text"));
const extensions_1 = tslib_1.__importDefault(require("../constants/extensions"));
const renderOptionCode_1 = require("../constants/renderOptionCode");
const hyperlinkTarget_1 = require("../constants/hyperlinkTarget");
const codingsystems_1 = tslib_1.__importDefault(require("../constants/codingsystems"));
const index_1 = tslib_1.__importDefault(require("../constants/index"));
const itemType_1 = tslib_1.__importDefault(require("../constants/itemType"));
const extension_1 = require("./extension");
const codingsystem_1 = require("./codingsystem");
const marked_1 = tslib_1.__importDefault(require("marked"));
function openNewIfAbsolute(url) {
    const regex = new RegExp('^(([a-z][a-z0-9+.-]*):.*)');
    if (regex.test(url)) {
        return '_blank';
    }
    return '_self';
}
function getComponentForItem(type) {
    if (String(type) === itemType_1.default.GROUP) {
        return group_1.default;
    }
    if (String(type) === itemType_1.default.DISPLAY) {
        return display_1.default;
    }
    if (String(type) === itemType_1.default.BOOLEAN) {
        return boolean_1.default;
    }
    if (String(type) === itemType_1.default.DECIMAL) {
        return decimal_1.default;
    }
    if (String(type) === itemType_1.default.INTEGER) {
        return integer_1.default;
    }
    if (String(type) === itemType_1.default.DATE) {
        return date_1.default;
    }
    if (String(type) === itemType_1.default.DATETIME) {
        return date_time_1.default;
    }
    if (String(type) === itemType_1.default.TIME) {
        return time_1.default;
    }
    if (String(type) === itemType_1.default.STRING) {
        return string_1.default;
    }
    if (String(type) === itemType_1.default.TEXT) {
        return text_1.default;
    }
    if (String(type) === itemType_1.default.CHOICE) {
        return choice_1.default;
    }
    if (String(type) === itemType_1.default.OPENCHOICE) {
        return open_choice_1.default;
    }
    if (String(type) === itemType_1.default.ATTATCHMENT) {
        return attachment_1.default;
    }
    if (String(type) === itemType_1.default.QUANTITY) {
        return quantity_1.default;
    }
    return undefined;
}
exports.getComponentForItem = getComponentForItem;
function isStringEmpty(string) {
    return string === '' || string === null || string === undefined;
}
exports.isStringEmpty = isStringEmpty;
function isReadOnly(item) {
    if (item && item.readOnly) {
        return item.readOnly;
    }
    return false;
}
exports.isReadOnly = isReadOnly;
function isRequired(item) {
    if (item && item.required) {
        return item.required;
    }
    return false;
}
exports.isRequired = isRequired;
function isRepeat(item) {
    if (item && item.repeats) {
        return item.repeats;
    }
    return false;
}
exports.isRepeat = isRepeat;
function isDataReceiver(item) {
    return (0, extension_1.getCopyExtension)(item) !== undefined;
}
exports.isDataReceiver = isDataReceiver;
function isHiddenItem(item) {
    return ((0, extension_1.getQuestionnaireHiddenExtensionValue)(item) ||
        (0, codingsystem_1.getQuestionnaireItemCodeValue)(item, codingsystems_1.default.RenderingOptions) === renderOptionCode_1.RenderOptionCode.KunPdf);
}
exports.isHiddenItem = isHiddenItem;
function getId(id) {
    if (id) {
        return id;
    }
    return uuid.v4();
}
exports.getId = getId;
function renderPrefix(item) {
    if (!item || !item.prefix) {
        return '';
    }
    return item.prefix;
}
exports.renderPrefix = renderPrefix;
function getSublabelText(item, onRenderMarkdown, questionnaire, resources) {
    if (item) {
        const markdown = (0, extension_1.getSublabelExtensionValue)(item) || '';
        return markdown ? getMarkdownValue(markdown, item, onRenderMarkdown, questionnaire, resources === null || resources === void 0 ? void 0 : resources.linkOpensInNewTab) : '';
    }
    return '';
}
exports.getSublabelText = getSublabelText;
function getText(item, onRenderMarkdown, questionnaire, resources) {
    if (item) {
        const markdown = item._text ? (0, extension_1.getMarkdownExtensionValue)(item._text) : undefined;
        if (markdown) {
            return getMarkdownValue(markdown, item, onRenderMarkdown, questionnaire, resources === null || resources === void 0 ? void 0 : resources.linkOpensInNewTab);
        }
        else if (item.text) {
            return item.text;
        }
    }
    return '';
}
exports.getText = getText;
function getMarkdownValue(markdownText, item, onRenderMarkdown, questionnaire, srLinkText) {
    const itemValue = (0, extension_1.getHyperlinkExtensionValue)(item);
    const questionnaireValue = questionnaire ? (0, extension_1.getHyperlinkExtensionValue)(questionnaire) : undefined;
    const renderer = new marked_1.default.Renderer();
    renderer.link = (href, title, text) => {
        const urlString = `<a href=${href} ${title ? `title=${title}` : ''} target="_blank" rel="noopener noreferrer" class="external" aria-label=${openNewIfAbsolute(href) === '_blank' ? srLinkText : ''}>${text}</a>`;
        return urlString;
    };
    const rendererSameWindow = new marked_1.default.Renderer();
    rendererSameWindow.link = (href, title, text) => {
        const urlString = `<a href=${href} ${title ? `title=${title}` : ''} target="${openNewIfAbsolute(href)}" rel="noopener noreferrer" aria-label=${openNewIfAbsolute(href) === '_blank' ? srLinkText : ''}>${text}</a>`;
        return urlString;
    };
    if (onRenderMarkdown) {
        return onRenderMarkdown(item, markdownText.toString());
    }
    if (itemValue === hyperlinkTarget_1.HyperlinkTarget.SAME_WINDOW || (!itemValue && questionnaireValue === hyperlinkTarget_1.HyperlinkTarget.SAME_WINDOW)) {
        marked_1.default.setOptions({ renderer: rendererSameWindow });
        return (0, marked_1.default)(markdownText.toString());
    }
    marked_1.default.setOptions({ renderer: renderer });
    return (0, marked_1.default)(markdownText.toString());
}
function getChildHeaderTag(item, headerTag) {
    if (!headerTag || !item) {
        return index_1.default.DEFAULT_HEADER_TAG;
    }
    return hasHeader(item) ? headerTag + 1 : headerTag;
}
exports.getChildHeaderTag = getChildHeaderTag;
function hasHeader(item) {
    if (!getText(item)) {
        return false;
    }
    if (!item || item.type !== index_1.default.ITEM_TYPE_GROUP) {
        return false;
    }
    return true;
}
function getLinkId(item) {
    if (item && item.linkId) {
        return item.linkId;
    }
    return uuid.v4();
}
exports.getLinkId = getLinkId;
function getStringValue(answer) {
    var _a;
    if (answer && Array.isArray(answer)) {
        const stringAnswer = answer.filter(f => f.valueString);
        return stringAnswer.length > 0 ? stringAnswer.map(m => m.valueString).join(', ') : '';
    }
    return (_a = answer === null || answer === void 0 ? void 0 : answer.valueString) !== null && _a !== void 0 ? _a : '';
}
exports.getStringValue = getStringValue;
function getPDFStringValue(answer, resources) {
    const value = getStringValue(answer);
    if (!value) {
        let text = '';
        if (resources && resources.ikkeBesvart) {
            text = resources.ikkeBesvart;
        }
        return text;
    }
    return value;
}
exports.getPDFStringValue = getPDFStringValue;
function getMaxLength(item) {
    if (!item || !item.maxLength) {
        return undefined;
    }
    return Number(item.maxLength);
}
exports.getMaxLength = getMaxLength;
function repeats(item) {
    if (item && item.repeats) {
        return item.repeats;
    }
    return false;
}
exports.repeats = repeats;
function shouldRenderRepeatButton(item, response, index) {
    if (!repeats(item)) {
        return false;
    }
    if (!response) {
        return true;
    }
    if (index !== undefined && index !== response.length - 1) {
        return false;
    }
    const max = (0, extension_1.getMaxOccursExtensionValue)(item);
    if (response && max && response.length && Number(max) <= response.length) {
        return false;
    }
    if (item.readOnly) {
        return false;
    }
    return true;
}
exports.shouldRenderRepeatButton = shouldRenderRepeatButton;
function validateText(value, validateScriptInjection) {
    if (!validateScriptInjection) {
        return true;
    }
    return (0, string_utils_1.isValid)(value);
}
exports.validateText = validateText;
function getTextValidationErrorMessage(value, validateScriptInjection, item, resources) {
    if (validateScriptInjection && value && typeof value === 'string') {
        const invalid = (0, string_utils_1.invalidNodes)(value);
        if (invalid && invalid.length > 0) {
            return invalid.join(', ') + ' ' + (resources ? resources.validationNotAllowed : 'er ikke tillatt');
        }
    }
    return (0, extension_1.getValidationTextExtension)(item) || '';
}
exports.getTextValidationErrorMessage = getTextValidationErrorMessage;
function getDecimalPattern(item) {
    const step = (0, extension_1.getExtension)(extensions_1.default.STEP_URL, item);
    const integerPart = '[+-]?[0-9]+';
    if (step && step.valueInteger != null) {
        const value = Number(step.valueInteger);
        if (value === 0) {
            return `^${integerPart}$`;
        }
        let stepString = '';
        if (value > 1) {
            stepString = `1,${value}`;
        }
        else if (value === 1) {
            stepString = '1';
        }
        return `^${integerPart}(.[0-9]{${stepString}})?$`;
    }
}
exports.getDecimalPattern = getDecimalPattern;
function getDecimalValue(item, value) {
    const decimalPlacesExtension = (0, extension_1.getExtension)(extensions_1.default.STEP_URL, item);
    if (value && decimalPlacesExtension && decimalPlacesExtension.valueInteger != null) {
        const places = Number(decimalPlacesExtension.valueInteger);
        return Number(value.toFixed(places));
    }
    return value;
}
exports.getDecimalValue = getDecimalValue;
function isIE11() {
    return !!window['MSInputMethodContext'] && !!document['documentMode'];
}
exports.isIE11 = isIE11;
//# sourceMappingURL=index.js.map