"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const dompurify_1 = tslib_1.__importDefault(require("dompurify"));
const index_1 = require("../../util/index");
const Label = ({ item, onRenderMarkdown, questionnaire, resources }) => {
    return (React.createElement("span", { dangerouslySetInnerHTML: {
            __html: dompurify_1.default.sanitize(`${(0, index_1.renderPrefix)(item)} ${(0, index_1.getText)(item, onRenderMarkdown, questionnaire, resources)}`, {
                RETURN_TRUSTED_TYPE: true,
                ADD_ATTR: ['target'],
            }),
        } }));
};
exports.default = Label;
//# sourceMappingURL=label.js.map