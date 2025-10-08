"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldShowExtraChoice = exports.getIndexOfAnswer = exports.validateInput = exports.isAllowedValue = exports.getErrorMessage = exports.getItemControlValue = exports.renderOptions = exports.getDisplay = exports.getSystem = exports.getOptions = exports.hasOptions = exports.hasCanonicalValueSet = void 0;
const tslib_1 = require("tslib");
const extensions_1 = tslib_1.__importDefault(require("../constants/extensions"));
const index_1 = tslib_1.__importStar(require("../constants/index"));
const itemcontrol_1 = tslib_1.__importDefault(require("../constants/itemcontrol"));
const itemType_1 = tslib_1.__importDefault(require("../constants/itemType"));
const extension_1 = require("./extension");
const index_2 = require("./index");
function hasCanonicalValueSet(item) {
    return !!item.answerValueSet && item.answerValueSet.substr(0, 4) === 'http';
}
exports.hasCanonicalValueSet = hasCanonicalValueSet;
function hasOptions(resources, item, containedResources) {
    const options = getOptions(resources, item, containedResources);
    return !!options && options.length > 0;
}
exports.hasOptions = hasOptions;
function getOptions(resources, item, containedResources) {
    if (!item) {
        return undefined;
    }
    let options;
    if (item.answerValueSet) {
        if (item.answerValueSet.startsWith('#')) {
            options = getContainedOptions(item, containedResources);
        }
    }
    else if (item.answerOption) {
        options = getInlineOptions(item, (0, index_2.isReadOnly)(item));
    }
    else if (hasExtensionOptions(item)) {
        options = getExtensionOptions(item, (0, index_2.isReadOnly)(item));
    }
    if (item.type === itemType_1.default.OPENCHOICE) {
        if (!options) {
            options = [];
        }
        options.push({
            label: resources === null || resources === void 0 ? void 0 : resources.openChoiceOption,
            type: index_1.OPEN_CHOICE_ID,
        });
    }
    return options;
}
exports.getOptions = getOptions;
function getSystem(item, code, containedResources) {
    if (item.answerValueSet && item.answerValueSet.startsWith('#')) {
        const id = item.answerValueSet.replace('#', '');
        const resource = getContainedResource(id, containedResources);
        if (resource && resource.compose) {
            return resource.compose.include[0].system;
        }
    }
    else if (item.answerOption && code) {
        const matchingCode = item.answerOption.filter(x => x.valueCoding && x.valueCoding.code === code);
        return matchingCode.length > 0 ? matchingCode[0].valueCoding.system : undefined;
    }
    return undefined;
}
exports.getSystem = getSystem;
function getDisplay(options, value) {
    if (!options || options.length === 0) {
        return undefined;
    }
    let display;
    options.forEach(o => {
        if (o.type === value) {
            display = o.label;
            return;
        }
    });
    return display;
}
exports.getDisplay = getDisplay;
function renderOptions(item, containedResources, renderRadio, renderCheckbox, renderDropdown, resources, renderAutosuggest, renderReceiverComponent) {
    const itemControlValue = getItemControlValue(item);
    const options = getOptions(resources, item, containedResources);
    if (hasOptions(resources, item, containedResources) && !hasCanonicalValueSet(item)) {
        if (itemControlValue) {
            switch (itemControlValue) {
                case itemcontrol_1.default.DROPDOWN:
                    return renderDropdown(options);
                case itemcontrol_1.default.CHECKBOX:
                    return renderCheckbox(options);
                case itemcontrol_1.default.RADIOBUTTON:
                    return renderRadio(options);
                default:
                    break;
            }
        }
        else if (isAboveDropdownThreshold(options)) {
            return renderDropdown(options);
        }
        return renderRadio(options);
    }
    else if (hasCanonicalValueSet(item) && itemControlValue === itemcontrol_1.default.AUTOCOMPLETE) {
        return renderAutosuggest();
    }
    else if (renderReceiverComponent && itemControlValue === itemcontrol_1.default.RECEIVERCOMPONENT) {
        return renderReceiverComponent();
    }
    return null;
}
exports.renderOptions = renderOptions;
function isAboveDropdownThreshold(options) {
    if (!options) {
        return false;
    }
    return options.length > index_1.default.CHOICE_DROPDOWN_TRESHOLD;
}
function getItemControlValue(item) {
    const itemControl = (0, extension_1.getItemControlExtensionValue)(item);
    if (itemControl) {
        for (let i = 0; i < itemControl.length; i++) {
            if (itemControl[i] && itemControl[i].code) {
                if (itemControl[i].code === itemcontrol_1.default.CHECKBOX) {
                    return itemcontrol_1.default.CHECKBOX;
                }
                if (itemControl[i].code === itemcontrol_1.default.DROPDOWN) {
                    return itemcontrol_1.default.DROPDOWN;
                }
                if (itemControl[i].code === itemcontrol_1.default.RADIOBUTTON) {
                    return itemcontrol_1.default.RADIOBUTTON;
                }
                if (itemControl[i].code === itemcontrol_1.default.AUTOCOMPLETE) {
                    return itemcontrol_1.default.AUTOCOMPLETE;
                }
                if (itemControl[i].code === itemcontrol_1.default.RECEIVERCOMPONENT) {
                    return itemcontrol_1.default.RECEIVERCOMPONENT;
                }
            }
        }
    }
    return undefined;
}
exports.getItemControlValue = getItemControlValue;
function getErrorMessage(item, value, resources, containedResources) {
    if (!resources || !item) {
        return '';
    }
    const extensionText = (0, extension_1.getValidationTextExtension)(item);
    if (extensionText) {
        return extensionText;
    }
    if (!value && (0, index_2.isRequired)(item) && resources) {
        return resources.oppgiVerdi;
    }
    if (!isAllowedValue(item, value, containedResources, resources)) {
        return resources.oppgiGyldigVerdi;
    }
    return '';
}
exports.getErrorMessage = getErrorMessage;
function isAllowedValue(item, value, containedResources, resources) {
    if (!item) {
        return true;
    }
    if (item.answerValueSet || item.answerValueSet) {
        const allowedValues = getOptions(resources, item, containedResources);
        if (!allowedValues || allowedValues.length === 0) {
            return true;
        }
        const matches = allowedValues.filter((a) => a.type === value);
        return matches.length > 0;
    }
    return true;
}
exports.isAllowedValue = isAllowedValue;
function validateInput(item, value, containedResources, resources) {
    if ((0, index_2.isRequired)(item) && !value) {
        return false;
    }
    if (!isAllowedValue(item, value, containedResources, resources)) {
        return false;
    }
    return true;
}
exports.validateInput = validateInput;
function getIndexOfAnswer(code, answer) {
    if (answer && Array.isArray(answer)) {
        return answer.findIndex(el => {
            if (el && el.valueCoding && el.valueCoding.code) {
                return el.valueCoding.code === code;
            }
            return false;
        });
    }
    else if (answer && !Array.isArray(answer) && answer.valueCoding && answer.valueCoding.code === code) {
        return 0;
    }
    return -1;
}
exports.getIndexOfAnswer = getIndexOfAnswer;
function shouldShowExtraChoice(answer) {
    if (!answer) {
        return false;
    }
    if (Array.isArray(answer)) {
        for (let i = 0; i < answer.length; i++) {
            const el = answer[i];
            if (el.valueCoding && el.valueCoding.code === index_1.OPEN_CHOICE_ID) {
                return true;
            }
        }
        return false;
    }
    return !!answer.valueCoding && !!answer.valueCoding.code && answer.valueCoding.code === index_1.OPEN_CHOICE_ID;
}
exports.shouldShowExtraChoice = shouldShowExtraChoice;
function hasExtensionOptions(item) {
    if (item.extension) {
        return item.extension.filter((it) => it.url === extensions_1.default.OPTION_REFERENCE).length > 0;
    }
    return false;
}
function getExtensionOptions(item, readOnly) {
    if (!item || !item.extension) {
        return undefined;
    }
    return item.extension
        .filter((it) => it.url === extensions_1.default.OPTION_REFERENCE)
        .map((it) => createRadiogroupOptionFromQuestionnaireExtension(it, readOnly))
        .filter((it) => it !== undefined);
}
function getInlineOptions(item, readOnly) {
    if (!item || !item.answerOption) {
        return undefined;
    }
    return item.answerOption
        .map((it) => createRadiogroupOptionFromQuestionnaireOption(it, readOnly))
        .filter((it) => it !== undefined);
}
function createRadiogroupOptionFromQuestionnaireExtension(extension, readOnly) {
    if (extension.valueReference) {
        return createRadiogroupOptionFromValueReference(extension.valueReference, readOnly);
    }
    return undefined;
}
function createRadiogroupOptionFromQuestionnaireOption(option, readOnly) {
    if (option.valueString) {
        return createRadiogroupOptionFromValueString(option.valueString, readOnly);
    }
    else if (option.valueInteger) {
        return createRadiogroupOptionFromValueInteger(option.valueInteger, readOnly);
    }
    else if (option.valueTime) {
        return createRadiogroupOptionFromValueTime(option.valueTime, readOnly);
    }
    else if (option.valueDate) {
        return createRadiogroupOptionFromValueDate(option.valueDate, readOnly);
    }
    else if (option.valueReference) {
        return createRadiogroupOptionFromValueReference(option.valueReference, readOnly);
    }
    else if (option.valueCoding) {
        return createRadiogroupOptionFromValueCoding(option.valueCoding, readOnly);
    }
    return undefined;
}
function createRadiogroupOptionFromValueCoding(coding, readOnly) {
    return createRadiogroupOption(String(coding.code), String(coding.display), readOnly);
}
function createRadiogroupOptionFromValueReference(reference, readOnly) {
    return createRadiogroupOption(String(reference.reference), String(reference.display), readOnly);
}
function createRadiogroupOptionFromValueDate(value, readOnly) {
    return createRadiogroupOption(String(value), String(value), readOnly);
}
function createRadiogroupOptionFromValueTime(value, readOnly) {
    return createRadiogroupOption(String(value), String(value), readOnly);
}
function createRadiogroupOptionFromValueInteger(value, readOnly) {
    return createRadiogroupOption(String(value), String(value), readOnly);
}
function createRadiogroupOptionFromValueString(value, readOnly) {
    return createRadiogroupOption(value, value, readOnly);
}
function getContainedOptions(item, containedResources) {
    if (!item || !item.answerValueSet) {
        return undefined;
    }
    const id = item.answerValueSet.replace('#', '');
    const resource = getContainedResource(id, containedResources);
    if (!resource) {
        return undefined;
    }
    else if (resource.compose && resource.compose.include) {
        return getComposedOptions(resource, (0, index_2.isReadOnly)(item));
    }
    else if (resource.expansion) {
        return getExpansionOptions(resource, (0, index_2.isReadOnly)(item));
    }
    return undefined;
}
function getComposedOptions(valueSet, disabled) {
    if (!valueSet.compose || !valueSet.compose.include) {
        return undefined;
    }
    const include = valueSet.compose.include;
    if (!include || include.length === 0) {
        return undefined;
    }
    const options = [];
    include.map((i) => {
        if (!i.concept || i.concept.length === 0) {
            return;
        }
        i.concept.map((r) => {
            options.push(createRadiogroupOption(String(r.code), String(r.display), disabled));
        });
    });
    return options;
}
function getExpansionOptions(valueSet, disabled) {
    if (!valueSet.expansion) {
        return undefined;
    }
    if (!valueSet.expansion.contains) {
        return undefined;
    }
    const options = [];
    valueSet.expansion.contains.map((r) => {
        options.push(createRadiogroupOption(String(r.code), String(r.display), disabled));
    });
    return options;
}
function createRadiogroupOption(type, label, disabled) {
    return {
        type: type,
        label: label,
        disabled,
    };
}
function getContainedResource(id, containedResources) {
    if (!containedResources) {
        return undefined;
    }
    const resource = containedResources.filter((r) => {
        const valueSet = r;
        return String(valueSet.id) === id;
    });
    if (!resource || resource.length === 0) {
        return undefined;
    }
    return resource[0];
}
//# sourceMappingURL=choice.js.map