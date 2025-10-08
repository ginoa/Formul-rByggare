"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const dompurify_1 = tslib_1.__importDefault(require("dompurify"));
const index_1 = require("../../util/index");
const textView = ({ id, item, value, textClass, children, onRenderMarkdown, helpButton, helpElement }) => {
    return (React.createElement("div", { id: (0, index_1.getId)(id) },
        React.createElement(React.Fragment, null,
            React.createElement("b", { dangerouslySetInnerHTML: {
                    __html: dompurify_1.default.sanitize(`${(0, index_1.renderPrefix)(item)} ${(0, index_1.getText)(item, onRenderMarkdown)} `, {
                        RETURN_TRUSTED_TYPE: true,
                        ADD_ATTR: ['target'],
                    }),
                } }),
            React.createElement(React.Fragment, null, helpButton),
            React.createElement(React.Fragment, null, helpElement)),
        React.createElement("div", { className: textClass || '' }, value),
        children ? (React.createElement("span", null,
            React.createElement("br", null),
            children)) : null,
        React.createElement("br", null),
        React.createElement("br", null)));
};
exports.default = textView;
//# sourceMappingURL=textview.js.map