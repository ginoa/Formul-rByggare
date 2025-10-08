"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroupItemControl = void 0;
const tslib_1 = require("tslib");
const itemcontrol_1 = tslib_1.__importDefault(require("../constants/itemcontrol"));
const itemType_1 = tslib_1.__importDefault(require("../constants/itemType"));
const extension_1 = require("./extension");
function getGroupItemControl(item) {
    if (item.type !== itemType_1.default.GROUP)
        return [];
    const itemControl = (0, extension_1.getItemControlExtensionValue)(item);
    if (!itemControl)
        return [];
    const groups = itemcontrol_1.default.Group;
    const valid = Object.keys(groups).map(k => groups[k]);
    return itemControl.filter(i => valid.indexOf(i.code) != -1);
}
exports.getGroupItemControl = getGroupItemControl;
//# sourceMappingURL=group-item-control.js.map