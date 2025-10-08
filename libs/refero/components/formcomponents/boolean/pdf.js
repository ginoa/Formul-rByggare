"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const index_1 = require("../../../util/index");
const pdf = ({ item, checked, children, onRenderMarkdown }) => {
    return (React.createElement("div", null,
        checked ? React.createElement("b", null, "[ X ]") : React.createElement("b", null, "[\u00A0\u00A0\u00A0\u00A0]"),
        " ",
        `${(0, index_1.renderPrefix)(item)} ${(0, index_1.getText)(item, onRenderMarkdown)}`,
        children ? (React.createElement("span", null,
            React.createElement("br", null),
            children)) : null,
        React.createElement("br", null),
        React.createElement("br", null)));
};
exports.default = pdf;
//# sourceMappingURL=pdf.js.map