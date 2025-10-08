"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const validation_1 = tslib_1.__importDefault(require("@helsenorge/form/components/form/validation"));
const safe_input_field_1 = tslib_1.__importDefault(require("@helsenorge/form/components/safe-input-field"));
const extension_1 = require("../../../util/extension");
const index_1 = require("../../../util/index");
const label_1 = tslib_1.__importDefault(require("../label"));
const sublabel_1 = tslib_1.__importDefault(require("../sublabel"));
const textview_1 = tslib_1.__importDefault(require("../textview"));
const textField = (_a) => {
    var { id, pdf, item, questionnaire, answer, handleStringChange, children, onRenderMarkdown, resources } = _a, other = tslib_1.__rest(_a, ["id", "pdf", "item", "questionnaire", "answer", "handleStringChange", "children", "onRenderMarkdown", "resources"]);
    if (pdf) {
        return (React.createElement(textview_1.default, { item: item, value: (0, index_1.getPDFStringValue)(answer) }, children));
    }
    const subLabelText = (0, index_1.getSublabelText)(item, onRenderMarkdown, questionnaire, resources);
    return (React.createElement(validation_1.default, Object.assign({}, other),
        React.createElement(safe_input_field_1.default, { type: "text", id: (0, index_1.getId)(id), inputName: (0, index_1.getId)(id), value: (0, index_1.getStringValue)(answer), showLabel: false, label: React.createElement(label_1.default, { item: item, onRenderMarkdown: onRenderMarkdown, questionnaire: questionnaire, resources: resources }), subLabel: subLabelText ? React.createElement(sublabel_1.default, { subLabelText: subLabelText }) : undefined, isRequired: (0, index_1.isRequired)(item), placeholder: (0, extension_1.getPlaceholder)(item), minLength: (0, extension_1.getMinLengthExtensionValue)(item), maxLength: (0, index_1.getMaxLength)(item), readOnly: (0, index_1.isReadOnly)(item), onBlur: handleStringChange, pattern: (0, extension_1.getRegexExtension)(item), errorMessage: (0, extension_1.getValidationTextExtension)(item), validateOnExternalUpdate: true })));
};
exports.default = textField;
//# sourceMappingURL=text-field.js.map