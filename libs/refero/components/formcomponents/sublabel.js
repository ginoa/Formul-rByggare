"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const dompurify_1 = tslib_1.__importDefault(require("dompurify"));
const SubLabel = ({ subLabelText }) => {
    return (React.createElement("span", { className: "page_refero__sublabel", dangerouslySetInnerHTML: {
            __html: dompurify_1.default.sanitize(subLabelText, { RETURN_TRUSTED_TYPE: true, ADD_ATTR: ['target'], }),
        } }));
};
exports.default = SubLabel;
//# sourceMappingURL=sublabel.js.map