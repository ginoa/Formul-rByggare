"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHyperlinkExtensionValue = exports.getCopyExtension = exports.getCalculatedExpressionExtension = exports.getQuestionnaireHiddenExtensionValue = exports.getSublabelExtensionValue = exports.getMarkdownExtensionValue = exports.getItemControlExtensionValue = exports.getRepeatsTextExtension = exports.getRegexExtension = exports.getMinLengthExtensionValue = exports.getMaxOccursExtensionValue = exports.getMinOccursExtensionValue = exports.getMinValueExtensionValue = exports.getMaxValueExtensionValue = exports.getQuestionnaireUnitExtensionValue = exports.getPlaceholder = exports.getExtension = exports.isItemSidebar = exports.getSidebarSections = exports.getNavigatorExtension = exports.getPresentationButtonsExtension = exports.getValidationTextExtension = void 0;
const tslib_1 = require("tslib");
const extensions_1 = tslib_1.__importDefault(require("../constants/extensions"));
const itemcontrol_1 = tslib_1.__importDefault(require("../constants/itemcontrol"));
const itemType_1 = tslib_1.__importDefault(require("../constants/itemType"));
const presentationButtonsType_1 = require("../constants/presentationButtonsType");
const index_1 = require("../util/index");
function getValidationTextExtension(item) {
    const validationTextExtension = getExtension(extensions_1.default.VALIDATIONTEXT_URL, item);
    if (!validationTextExtension || !validationTextExtension.valueString) {
        return undefined;
    }
    return validationTextExtension.valueString;
}
exports.getValidationTextExtension = getValidationTextExtension;
function getPresentationButtonsExtension(questionniare) {
    const extension = getExtension(extensions_1.default.PRESENTATION_BUTTONS, questionniare);
    if (!extension || !extension.valueCoding || !extension.valueCoding.code) {
        return null;
    }
    switch (extension.valueCoding.code) {
        case 'none':
            return presentationButtonsType_1.PresentationButtonsType.None;
        case 'static':
            return presentationButtonsType_1.PresentationButtonsType.Static;
        case 'sticky':
            return presentationButtonsType_1.PresentationButtonsType.Sticky;
    }
    return null;
}
exports.getPresentationButtonsExtension = getPresentationButtonsExtension;
function getNavigatorExtension(questionniare) {
    var _a;
    const navigatorExtension = getExtension(extensions_1.default.NAVIGATOR, questionniare);
    return (_a = navigatorExtension === null || navigatorExtension === void 0 ? void 0 : navigatorExtension.valueCodeableConcept) === null || _a === void 0 ? void 0 : _a.coding;
}
exports.getNavigatorExtension = getNavigatorExtension;
function getSidebarSections(questionniare, onRenderMarkdown) {
    var _a;
    const items = [];
    const getSidebarItems = (currentItem, currentItems) => {
        var _a;
        const itemControls = getItemControlExtensionValue(currentItem);
        if (currentItem.type === itemType_1.default.TEXT &&
            itemControls &&
            itemControls.some(itemControl => itemControl.code === itemcontrol_1.default.SIDEBAR)) {
            items.push({
                item: currentItem,
                markdownText: (0, index_1.getText)(currentItem, onRenderMarkdown),
            });
        }
        (_a = currentItem.item) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            getSidebarItems(item, currentItems);
        });
    };
    (_a = questionniare.item) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
        getSidebarItems(item, items);
    });
    return items;
}
exports.getSidebarSections = getSidebarSections;
function isItemSidebar(item) {
    const itemControls = getItemControlExtensionValue(item);
    return itemControls !== undefined && itemControls.some(itemControl => itemControl.code === itemcontrol_1.default.SIDEBAR);
}
exports.isItemSidebar = isItemSidebar;
function getExtension(url, item) {
    if (!item || !item.extension || item.extension.length === 0) {
        return undefined;
    }
    const filteredExtension = item.extension.filter((e) => e.url === url);
    if (!filteredExtension || filteredExtension.length === 0) {
        return undefined;
    }
    return filteredExtension[0];
}
exports.getExtension = getExtension;
function getPlaceholder(item) {
    if (!item || !item.extension || item.extension.length === 0) {
        return undefined;
    }
    const extension = getExtension(extensions_1.default.ENTRY_FORMAT_URL, item);
    if (!extension) {
        return undefined;
    }
    return extension.valueString;
}
exports.getPlaceholder = getPlaceholder;
function getQuestionnaireUnitExtensionValue(item) {
    if (!item || !item.extension || item.extension.length === 0) {
        return undefined;
    }
    const extension = getExtension(extensions_1.default.QUESTIONNAIRE_UNIT, item);
    if (!extension) {
        return undefined;
    }
    return extension.valueCoding;
}
exports.getQuestionnaireUnitExtensionValue = getQuestionnaireUnitExtensionValue;
function getMaxValueExtensionValue(item) {
    const maxValue = getExtension(extensions_1.default.MAX_VALUE_URL, item);
    if (maxValue && maxValue.valueDecimal !== null && maxValue.valueDecimal !== undefined) {
        return Number(maxValue.valueDecimal);
    }
    if (maxValue && maxValue.valueInteger !== null && maxValue.valueInteger !== undefined) {
        return Number(maxValue.valueInteger);
    }
    return undefined;
}
exports.getMaxValueExtensionValue = getMaxValueExtensionValue;
function getMinValueExtensionValue(item) {
    const minValue = getExtension(extensions_1.default.MIN_VALUE_URL, item);
    if (minValue && minValue.valueDecimal !== null && minValue.valueDecimal !== undefined) {
        return Number(minValue.valueDecimal);
    }
    if (minValue && minValue.valueInteger !== null && minValue.valueInteger !== undefined) {
        return Number(minValue.valueInteger);
    }
    return undefined;
}
exports.getMinValueExtensionValue = getMinValueExtensionValue;
function getMinOccursExtensionValue(item) {
    const minValue = getExtension(extensions_1.default.MIN_OCCURS_URL, item);
    if (minValue && minValue.valueInteger !== null && minValue.valueInteger !== undefined) {
        return Number(minValue.valueInteger);
    }
    return undefined;
}
exports.getMinOccursExtensionValue = getMinOccursExtensionValue;
function getMaxOccursExtensionValue(item) {
    const maxValue = getExtension(extensions_1.default.MAX_OCCURS_URL, item);
    if (maxValue && maxValue.valueInteger !== null && maxValue.valueInteger !== undefined) {
        return Number(maxValue.valueInteger);
    }
    return undefined;
}
exports.getMaxOccursExtensionValue = getMaxOccursExtensionValue;
function getMinLengthExtensionValue(item) {
    const minLength = getExtension(extensions_1.default.MIN_LENGTH_URL, item);
    if (minLength && minLength.valueInteger) {
        return Number(minLength.valueInteger);
    }
    return undefined;
}
exports.getMinLengthExtensionValue = getMinLengthExtensionValue;
function getRegexExtension(item) {
    const regexExtension = getExtension(extensions_1.default.REGEX_URL, item);
    if (!regexExtension || !regexExtension.valueString) {
        return undefined;
    }
    return regexExtension.valueString;
}
exports.getRegexExtension = getRegexExtension;
function getRepeatsTextExtension(item) {
    const repeatsTextExtension = getExtension(extensions_1.default.REPEATSTEXT_URL, item);
    if (!repeatsTextExtension || !repeatsTextExtension.valueString) {
        return undefined;
    }
    return repeatsTextExtension.valueString;
}
exports.getRepeatsTextExtension = getRepeatsTextExtension;
function getItemControlExtensionValue(item) {
    const itemControlExtension = getExtension(extensions_1.default.ITEMCONTROL_URL, item);
    if (!itemControlExtension || !itemControlExtension.valueCodeableConcept || !itemControlExtension.valueCodeableConcept.coding) {
        return undefined;
    }
    return itemControlExtension.valueCodeableConcept.coding;
}
exports.getItemControlExtensionValue = getItemControlExtensionValue;
function getMarkdownExtensionValue(item) {
    const markdownExtension = getExtension(extensions_1.default.MARKDOWN_URL, item);
    if (!markdownExtension || !markdownExtension.valueMarkdown) {
        return undefined;
    }
    return markdownExtension.valueMarkdown;
}
exports.getMarkdownExtensionValue = getMarkdownExtensionValue;
function getSublabelExtensionValue(item) {
    const markdownExtension = getExtension(extensions_1.default.SUBLABEL, item);
    if (!markdownExtension || !markdownExtension.valueMarkdown) {
        return undefined;
    }
    return markdownExtension.valueMarkdown;
}
exports.getSublabelExtensionValue = getSublabelExtensionValue;
function getQuestionnaireHiddenExtensionValue(item) {
    const questionnaireHiddenExtension = getExtension(extensions_1.default.QUESTIONNAIRE_HIDDEN, item);
    if (!questionnaireHiddenExtension || !questionnaireHiddenExtension.valueBoolean) {
        return false;
    }
    return questionnaireHiddenExtension.valueBoolean;
}
exports.getQuestionnaireHiddenExtensionValue = getQuestionnaireHiddenExtensionValue;
function getCalculatedExpressionExtension(item) {
    const calculatedExpressionExtension = getExtension(extensions_1.default.CALCULATED_EXPRESSION, item);
    if (!calculatedExpressionExtension ||
        calculatedExpressionExtension.valueString === null ||
        calculatedExpressionExtension.valueString === undefined) {
        return;
    }
    return calculatedExpressionExtension;
}
exports.getCalculatedExpressionExtension = getCalculatedExpressionExtension;
function getCopyExtension(item) {
    const extension = getExtension(extensions_1.default.Copy_EXPRESSION, item);
    if (!extension || !extension.valueString) {
        return;
    }
    return extension;
}
exports.getCopyExtension = getCopyExtension;
function getHyperlinkExtensionValue(item) {
    const hyperlinkExtension = getExtension(extensions_1.default.HYPERLINK, item);
    if (hyperlinkExtension && hyperlinkExtension.valueCoding && hyperlinkExtension.valueCoding.code) {
        return parseInt(hyperlinkExtension.valueCoding.code);
    }
    return undefined;
}
exports.getHyperlinkExtensionValue = getHyperlinkExtensionValue;
//# sourceMappingURL=extension.js.map