"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const dompurify_1 = tslib_1.__importDefault(require("dompurify"));
const react_redux_1 = require("react-redux");
const typography_module_scss_1 = tslib_1.__importDefault(require("@helsenorge/designsystem-react/scss/typography.module.scss"));
const itemcontrol_1 = tslib_1.__importDefault(require("../../../constants/itemcontrol"));
const extension_1 = require("../../../util/extension");
const index_1 = require("../../../util/index");
const map_props_1 = require("../../../util/map-props");
const Display = ({ id, enable, pdf, item, questionnaire, onRenderMarkdown, resources }) => {
    const itemControls = item ? (0, extension_1.getItemControlExtensionValue)(item) : null;
    const highlightClass = itemControls && itemControls.some(itemControl => itemControl.code === itemcontrol_1.default.HIGHLIGHT)
        ? 'page_refero__component_highlight'
        : '';
    if (!enable) {
        return null;
    }
    let value = undefined;
    if (item) {
        const markdown = item._text ? (0, extension_1.getMarkdownExtensionValue)(item._text) : undefined;
        if (markdown) {
            value = (React.createElement("div", { id: (0, index_1.getId)(id), className: `page_refero__markdown ${typography_module_scss_1.default['anchorlink-wrapper']}`, dangerouslySetInnerHTML: {
                    __html: dompurify_1.default.sanitize((0, index_1.getText)(item, onRenderMarkdown, questionnaire, resources), {
                        RETURN_TRUSTED_TYPE: true,
                        ADD_ATTR: ['target'],
                    }),
                } }));
        }
        else {
            value = React.createElement("p", { id: (0, index_1.getId)(id) }, `${(0, index_1.renderPrefix)(item)} ${(0, index_1.getText)(item, onRenderMarkdown, questionnaire, resources)}`);
        }
    }
    if (pdf) {
        if (!value) {
            return null;
        }
        return React.createElement("div", null, value);
    }
    return React.createElement("div", { className: `page_refero__component page_refero__component_display ${highlightClass}` }, value);
};
const connectedComponent = (0, react_redux_1.connect)(map_props_1.mapStateToProps, map_props_1.mapDispatchToProps, map_props_1.mergeProps)(Display);
exports.default = connectedComponent;
//# sourceMappingURL=display.js.map