"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionRequester = void 0;
const tslib_1 = require("tslib");
const newValue_1 = require("../actions/newValue");
const itemcontrol_1 = tslib_1.__importDefault(require("../constants/itemcontrol"));
const choice_1 = require("./choice");
const refero_core_1 = require("./refero-core");
class ItemAndPath {
    constructor(item, path) {
        this.item = item;
        this.path = path;
    }
}
class ActionRequester {
    constructor(questionnaire, questionnaireResponse) {
        this.actions = [];
        this.questionnaire = questionnaire;
        this.questionnaireResponse = questionnaireResponse;
    }
    addIntegerAnswer(linkId, value, index = 0) {
        const itemAndPath = this.getItemAndPath(linkId, index);
        if (itemAndPath) {
            this.actions.push((0, newValue_1.newIntegerValue)(itemAndPath.path, value, itemAndPath.item));
        }
    }
    clearIntegerAnswer(linkId, index = 0) {
        this.addIntegerAnswer(linkId, Number.NaN, index);
    }
    addDecimalAnswer(linkId, value, index = 0) {
        const itemAndPath = this.getItemAndPath(linkId, index);
        if (itemAndPath) {
            this.actions.push((0, newValue_1.newDecimalValue)(itemAndPath.path, value, itemAndPath.item));
        }
    }
    clearDecimalAnswer(linkId, index = 0) {
        this.addDecimalAnswer(linkId, Number.NaN, index);
    }
    addChoiceAnswer(linkId, value, index = 0) {
        const itemAndPath = this.getItemAndPath(linkId, index);
        if (itemAndPath) {
            this.actions.push((0, newValue_1.newCodingValue)(itemAndPath.path, value, itemAndPath.item, this.isCheckbox(itemAndPath.item)));
        }
    }
    removeChoiceAnswer(linkId, value, index = 0) {
        const itemAndPath = this.getItemAndPath(linkId, index);
        if (itemAndPath && this.isCheckbox(itemAndPath.item)) {
            this.actions.push((0, newValue_1.removeCodingValue)(itemAndPath.path, value, itemAndPath.item));
        }
    }
    addOpenChoiceAnswer(linkId, value, index = 0) {
        const itemAndPath = this.getItemAndPath(linkId, index);
        if (itemAndPath) {
            if (typeof value === 'string') {
                this.actions.push((0, newValue_1.newCodingStringValue)(itemAndPath.path, value, itemAndPath.item));
            }
            else {
                this.actions.push((0, newValue_1.newCodingValue)(itemAndPath.path, value, itemAndPath.item, this.isCheckbox(itemAndPath.item)));
            }
        }
    }
    removeOpenChoiceAnswer(linkId, value, index = 0) {
        const itemAndPath = this.getItemAndPath(linkId, index);
        if (itemAndPath) {
            if (typeof value === 'string') {
                this.actions.push((0, newValue_1.removeCodingStringValue)(itemAndPath.path, itemAndPath.item));
            }
            else if (this.isCheckbox(itemAndPath.item)) {
                this.actions.push((0, newValue_1.removeCodingValue)(itemAndPath.path, value, itemAndPath.item));
            }
        }
    }
    addBooleanAnswer(linkId, value, index = 0) {
        const itemAndPath = this.getItemAndPath(linkId, index);
        if (itemAndPath) {
            this.actions.push((0, newValue_1.newBooleanValue)(itemAndPath.path, value, itemAndPath.item));
        }
    }
    clearBooleanAnswer(linkId, index = 0) {
        this.addBooleanAnswer(linkId, false, index);
    }
    addDateAnswer(linkId, value, index = 0) {
        const itemAndPath = this.getItemAndPath(linkId, index);
        if (itemAndPath) {
            this.actions.push((0, newValue_1.newDateValue)(itemAndPath.path, value, itemAndPath.item));
        }
    }
    clearDateAnswer(linkId, index = 0) {
        this.addDateAnswer(linkId, '', index);
    }
    addTimeAnswer(linkId, value, index = 0) {
        const itemAndPath = this.getItemAndPath(linkId, index);
        if (itemAndPath) {
            this.actions.push((0, newValue_1.newTimeValue)(itemAndPath.path, value, itemAndPath.item));
        }
    }
    clearTimeAnswer(linkId, index = 0) {
        this.addTimeAnswer(linkId, '', index);
    }
    addDateTimeAnswer(linkId, value, index = 0) {
        const itemAndPath = this.getItemAndPath(linkId, index);
        if (itemAndPath) {
            this.actions.push((0, newValue_1.newDateTimeValue)(itemAndPath.path, value, itemAndPath.item));
        }
    }
    clearDateTimeAnswer(linkId, index = 0) {
        this.addDateTimeAnswer(linkId, '', index);
    }
    addQuantityAnswer(linkId, value, index = 0) {
        const itemAndPath = this.getItemAndPath(linkId, index);
        if (itemAndPath) {
            this.actions.push((0, newValue_1.newQuantityValue)(itemAndPath.path, value, itemAndPath.item));
        }
    }
    clearQuantityAnswer(linkId, index = 0) {
        this.addQuantityAnswer(linkId, {}, index);
    }
    addStringAnswer(linkId, value, index = 0) {
        const itemAndPath = this.getItemAndPath(linkId, index);
        if (itemAndPath) {
            this.actions.push((0, newValue_1.newStringValue)(itemAndPath.path, value, itemAndPath.item));
        }
    }
    clearStringAnswer(linkId, index = 0) {
        this.addStringAnswer(linkId, '', index);
    }
    getActions() {
        return this.actions;
    }
    getItemAndPath(linkId, index) {
        const item = (0, refero_core_1.getQuestionnaireDefinitionItem)(linkId, this.questionnaire.item);
        const itemsAndPaths = (0, refero_core_1.getResponseItemAndPathWithLinkId)(linkId, this.questionnaireResponse);
        if (!item || itemsAndPaths.length - 1 < index || !itemsAndPaths[index].path) {
            return;
        }
        return new ItemAndPath(item, itemsAndPaths[index].path);
    }
    isCheckbox(item) {
        return (0, choice_1.getItemControlValue)(item) === itemcontrol_1.default.CHECKBOX;
    }
}
exports.ActionRequester = ActionRequester;
//# sourceMappingURL=actionRequester.js.map