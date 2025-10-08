"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const dompurify_1 = tslib_1.__importDefault(require("dompurify"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const react_collapse_1 = require("react-collapse");
const Icons_1 = tslib_1.__importDefault(require("@helsenorge/designsystem-react/components/Icons"));
const HelpSign_1 = tslib_1.__importDefault(require("@helsenorge/designsystem-react/components/Icons/HelpSign"));
const itemcontrol_1 = tslib_1.__importDefault(require("../constants/itemcontrol"));
const itemType_1 = tslib_1.__importDefault(require("../constants/itemType"));
const help_1 = require("../util/help");
const index_1 = require("../util/index");
const refero_core_1 = require("../util/refero-core");
const delete_button_1 = tslib_1.__importDefault(require("./formcomponents/repeat/delete-button"));
const repeat_button_1 = tslib_1.__importDefault(require("./formcomponents/repeat/repeat-button"));
const help_button_1 = tslib_1.__importDefault(require("./help-button/help-button"));
function withCommonFunctions(WrappedComponent) {
    return class WithCommonFunctions extends React.Component {
        constructor(props) {
            super(props);
            this.renderDeleteButton = (className) => {
                if (!this.props.visibleDeleteButton) {
                    return undefined;
                }
                let mustShowConfirm = this.hasAnwer(this.props.answer);
                if (!mustShowConfirm && this.props.responseItem && this.props.responseItem.item) {
                    mustShowConfirm = this.props.responseItem.item.some(item => (item ? this.hasAnwer(item.answer) : false));
                }
                return (React.createElement("div", { className: "page_refero__deletebutton-wrapper" },
                    React.createElement(delete_button_1.default, { className: className, item: this.props.item, path: this.props.path, resources: this.props.resources, mustShowConfirm: mustShowConfirm, onAnswerChange: this.props.onAnswerChange, renderContext: this.props.renderContext })));
            };
            this.renderRepeatButton = (item, index, path, response, responseItem) => {
                if (!item.repeats || !(0, index_1.shouldRenderRepeatButton)(item, response, index)) {
                    return undefined;
                }
                return (React.createElement("div", { className: "page_refero__repeatbutton-wrapper" },
                    React.createElement(repeat_button_1.default, { key: `item_${item.linkId}_add_repeat_item`, resources: this.props.resources, item: item, responseItems: response, parentPath: path, renderContext: this.props.renderContext, disabled: item.type !== itemType_1.default.GROUP && !(responseItem === null || responseItem === void 0 ? void 0 : responseItem.answer) })));
            };
            this.toggleHelp = (isOpen) => {
                this.setState({ isHelpVisible: isOpen });
            };
            this.renderHelpButton = () => {
                const { item, onRequestHelpButton } = this.props;
                if (!item)
                    return;
                const qItem = item;
                const helpItem = (0, help_1.findHelpItem)(qItem);
                if (!helpItem)
                    return;
                const helpItemType = (0, help_1.getHelpItemType)(helpItem) || itemcontrol_1.default.HELP;
                if (onRequestHelpButton) {
                    return (React.createElement(help_button_1.default, { item: helpItem, callback: this.toggleHelp }, onRequestHelpButton(qItem, helpItem, helpItemType, (0, index_1.getText)(helpItem), this.state.isHelpVisible)));
                }
                return (React.createElement(help_button_1.default, { item: helpItem, callback: this.toggleHelp },
                    React.createElement(Icons_1.default, { svgIcon: HelpSign_1.default })));
            };
            this.renderHelpElement = () => {
                const { item, onRequestHelpElement } = this.props;
                if (!item) {
                    return;
                }
                const qItem = item;
                const helpItem = (0, help_1.findHelpItem)(qItem);
                if (!helpItem) {
                    return;
                }
                const helpItemType = (0, help_1.getHelpItemType)(helpItem) || itemcontrol_1.default.HELP;
                if (onRequestHelpElement) {
                    return onRequestHelpElement(qItem, helpItem, helpItemType, (0, index_1.getText)(helpItem), this.state.isHelpVisible);
                }
                const collapseClasses = (0, classnames_1.default)({
                    page_refero__helpComponent: true,
                    'page_refero__helpComponent--open': this.state.isHelpVisible,
                });
                return (React.createElement(react_collapse_1.Collapse, { isOpened: this.state.isHelpVisible },
                    React.createElement("div", { className: collapseClasses, dangerouslySetInnerHTML: {
                            __html: dompurify_1.default.sanitize(`${(0, index_1.getText)(helpItem)}`, { RETURN_TRUSTED_TYPE: true, ADD_ATTR: ['target'], }),
                        } })));
            };
            this.renderItem = (item, renderContext) => {
                const { resources, containedResources, responseItem, pdf, path, headerTag, promptLoginMessage, onRenderMarkdown } = this.props;
                if ((0, help_1.isHelpItem)(item))
                    return [];
                if ((0, index_1.isHiddenItem)(item))
                    return [];
                const Comp = (0, index_1.getComponentForItem)(item.type);
                if (!Comp) {
                    return [];
                }
                let response;
                if (responseItem) {
                    const childItem = responseItem.item;
                    const childAnswer = responseItem.answer;
                    const linkId = item.linkId;
                    if (childItem) {
                        response = (0, refero_core_1.getItemWithIdFromResponseItemArray)(linkId, childItem);
                    }
                    else if (childAnswer) {
                        response = (0, refero_core_1.getItemWithIdFromResponseItemArray)(linkId, childAnswer[0].item);
                    }
                }
                const renderedItems = [];
                if (response && response.length > 0) {
                    response.forEach((responseItem, index) => {
                        renderedItems.push(React.createElement(Comp, { key: 'item_' + responseItem.linkId + (0, refero_core_1.createIdSuffix)(path, index, item.repeats), pdf: pdf, language: this.props.language, includeSkipLink: this.props.includeSkipLink, promptLoginMessage: promptLoginMessage, id: 'item_' + responseItem.linkId + (0, refero_core_1.createIdSuffix)(path, index, item.repeats), item: item, questionnaire: this.props.questionnaire, responseItem: responseItem, answer: (0, refero_core_1.getAnswerFromResponseItem)(responseItem), resources: resources, containedResources: containedResources, path: (0, refero_core_1.createPathForItem)(path, item, responseItem, index), headerTag: (0, index_1.getChildHeaderTag)(this.props.item, headerTag), onValidated: this.props.onValidated, validateScriptInjection: this.props.validateScriptInjection, addFormComponent: this.props.addFormComponent, removeFormComponent: this.props.removeFormComponent, optionalLabel: this.props.optionalLabel, requiredLabel: this.props.requiredLabel, showOptionalLabel: this.props.showOptionalLabel, showRequiredLabel: this.props.showRequiredLabel, visibleDeleteButton: (0, refero_core_1.shouldRenderDeleteButton)(item, index), repeatButton: this.renderRepeatButton(item, index, path, response, responseItem), onRequestAttachmentLink: this.props.onRequestAttachmentLink, onOpenAttachment: this.props.onOpenAttachment, onDeleteAttachment: this.props.onDeleteAttachment, uploadAttachment: this.props.uploadAttachment, onRequestHelpButton: this.props.onRequestHelpButton, onRequestHelpElement: this.props.onRequestHelpElement, attachmentErrorMessage: this.props.attachmentErrorMessage, attachmentMaxFileSize: this.props.attachmentMaxFileSize, attachmentValidTypes: this.props.attachmentValidTypes, onAnswerChange: this.props.onAnswerChange, renderContext: renderContext, onRenderMarkdown: onRenderMarkdown, fetchValueSet: this.props.fetchValueSet, autoSuggestProps: this.props.autoSuggestProps, fetchReceivers: this.props.fetchReceivers }));
                    });
                }
                return renderedItems;
            };
            this.renderChildrenItems = (renderContext) => {
                const { item } = this.props;
                if (!item || !item.item) {
                    return undefined;
                }
                if (item.type === itemType_1.default.GROUP && renderContext.RenderChildren) {
                    return renderContext.RenderChildren(item.item, this.renderItem);
                }
                const renderedItems = [];
                item.item.forEach(i => renderedItems.push(...this.renderItem(i, renderContext)));
                return renderedItems;
            };
            this.state = {
                childComponents: [],
                isHelpVisible: false,
            };
        }
        hasAnwer(answer) {
            return !!answer && Object.keys(answer).length > 0;
        }
        render() {
            if (!this.props.enable) {
                return null;
            }
            else {
                return (React.createElement(WrappedComponent, Object.assign({ renderChildrenItems: this.renderChildrenItems, renderDeleteButton: this.renderDeleteButton, renderRepeatButton: this.renderRepeatButton, renderHelpButton: this.renderHelpButton, renderHelpElement: this.renderHelpElement, isHelpOpen: this.state.isHelpVisible, onRenderMarkdown: this.props.onRenderMarkdown }, this.props), this.renderChildrenItems(this.props.renderContext)));
            }
        }
    };
}
exports.default = withCommonFunctions;
//# sourceMappingURL=with-common-functions.js.map