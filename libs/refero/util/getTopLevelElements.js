"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopLevelElements = void 0;
const extension_1 = require("./extension");
const getTopLevelElements = (formDefinition) => {
    var _a, _b;
    const topLevelElements = (_b = (_a = formDefinition.Content) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.filter(qItem => !(0, extension_1.isItemSidebar)(qItem));
    return topLevelElements;
};
exports.getTopLevelElements = getTopLevelElements;
//# sourceMappingURL=getTopLevelElements.js.map