"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHelpItemType = exports.isHelpItem = exports.findHelpItem = void 0;
const tslib_1 = require("tslib");
const itemcontrol_1 = tslib_1.__importDefault(require("../constants/itemcontrol"));
const itemType_1 = tslib_1.__importDefault(require("../constants/itemType"));
const extension_1 = require("./extension");
function findHelpItem(parent) {
    if (parent.item === undefined)
        return;
    for (const childItem of parent.item) {
        if (isHelpItem(childItem))
            return childItem;
    }
    return;
}
exports.findHelpItem = findHelpItem;
function isHelpItem(item) {
    const itemControl = getHelpItemControl(item);
    return itemControl ? true : false;
}
exports.isHelpItem = isHelpItem;
function getHelpItemType(item) {
    const itemControl = getHelpItemControl(item);
    if (!itemControl)
        return;
    return itemControl.code;
}
exports.getHelpItemType = getHelpItemType;
function getHelpItemControl(item) {
    if (item.type !== itemType_1.default.TEXT)
        return;
    const itemControl = (0, extension_1.getItemControlExtensionValue)(item);
    if (!itemControl)
        return;
    for (let i = 0; i < itemControl.length; i++) {
        if (itemControl[i] && itemControl[i].code) {
            if (itemControl[i].code === itemcontrol_1.default.HELP || itemControl[i].code == itemcontrol_1.default.HELPLINK) {
                return itemControl[i];
            }
        }
    }
    return;
}
//# sourceMappingURL=help.js.map