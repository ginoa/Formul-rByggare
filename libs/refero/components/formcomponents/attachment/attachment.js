"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const newValue_1 = require("../../../actions/newValue");
const extension_1 = require("../../../util/extension");
const index_1 = require("../../../util/index");
const map_props_1 = require("../../../util/map-props");
const with_common_functions_1 = tslib_1.__importDefault(require("../../with-common-functions"));
const label_1 = tslib_1.__importDefault(require("../label"));
const sublabel_1 = tslib_1.__importDefault(require("../sublabel"));
const textview_1 = tslib_1.__importDefault(require("../textview"));
const attachmenthtml_1 = tslib_1.__importDefault(require("./attachmenthtml"));
class AttachmentComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.onUpload = (files, cb) => {
            const { uploadAttachment, path, item, onAnswerChange } = this.props;
            if (uploadAttachment) {
                for (const file of files) {
                    const onSuccess = (uploadedFile, attachment) => {
                        var _a;
                        if (this.props.dispatch && attachment) {
                            (_a = this.props
                                .dispatch((0, newValue_1.newAttachmentAsync)(this.props.path, attachment, this.props.item, (0, index_1.isRepeat)(this.props.item)))) === null || _a === void 0 ? void 0 : _a.then(newState => onAnswerChange(newState, path, item, { valueAttachment: attachment }));
                        }
                        cb(true, null, uploadedFile);
                    };
                    const onError = (errorMessage) => {
                        cb(false, errorMessage);
                    };
                    uploadAttachment([file], onSuccess, onError);
                }
            }
        };
        this.onDelete = (fileId, cb) => {
            const { onDeleteAttachment, path, item, onAnswerChange } = this.props;
            if (onDeleteAttachment) {
                const onSuccess = () => {
                    var _a;
                    if (this.props.dispatch) {
                        const attachment = { url: fileId };
                        (_a = this.props
                            .dispatch((0, newValue_1.removeAttachmentAsync)(this.props.path, attachment, this.props.item))) === null || _a === void 0 ? void 0 : _a.then(newState => onAnswerChange(newState, path, item, { valueAttachment: attachment }));
                    }
                    cb(true, null);
                };
                const onError = (errormessage) => {
                    cb(false, errormessage);
                };
                onDeleteAttachment(fileId, onSuccess, onError);
            }
        };
        this.getButtonText = () => {
            let buttonText = '';
            const { resources } = this.props;
            if (resources && resources.uploadButtonText) {
                buttonText = resources.uploadButtonText;
            }
            return buttonText;
        };
        this.getAttachment = () => {
            const { answer } = this.props;
            if (Array.isArray(answer)) {
                return answer.map(v => {
                    return {
                        id: v.valueAttachment && v.valueAttachment.url ? v.valueAttachment.url : -1,
                        name: v.valueAttachment && v.valueAttachment.title ? v.valueAttachment.title : '',
                    };
                });
            }
            else {
                if (answer && answer.valueAttachment && answer.valueAttachment.url) {
                    return [
                        {
                            id: answer.valueAttachment.url,
                            name: answer.valueAttachment.title ? answer.valueAttachment.title : '',
                        },
                    ];
                }
            }
            return [];
        };
        this.getPdfValue = () => {
            const attachments = this.getAttachment();
            if (attachments) {
                return attachments.map(v => v.name).join(', ');
            }
            else if (this.props.resources) {
                return this.props.resources.ikkeBesvart;
            }
            return '';
        };
    }
    shouldComponentUpdate(nextProps) {
        var _a;
        const responseItemHasChanged = this.props.responseItem !== nextProps.responseItem;
        const helpItemHasChanged = this.props.isHelpOpen !== nextProps.isHelpOpen;
        const resourcesHasChanged = JSON.stringify(this.props.resources) !== JSON.stringify(nextProps.resources);
        const attachmentErrorMessageHasChanged = this.props.attachmentErrorMessage !== nextProps.attachmentErrorMessage;
        const repeats = (_a = this.props.item.repeats) !== null && _a !== void 0 ? _a : false;
        return responseItemHasChanged || helpItemHasChanged || resourcesHasChanged || attachmentErrorMessageHasChanged || repeats;
    }
    render() {
        const _a = this.props, { pdf, id, item, resources, onOpenAttachment, onRenderMarkdown, questionnaire } = _a, other = tslib_1.__rest(_a, ["pdf", "id", "item", "resources", "onOpenAttachment", "onRenderMarkdown", "questionnaire"]);
        const subLabelText = (0, index_1.getSublabelText)(item, onRenderMarkdown, questionnaire, resources);
        if (pdf || (0, index_1.isReadOnly)(item)) {
            return (React.createElement(textview_1.default, { id: id, item: item, value: this.getPdfValue(), onRenderMarkdown: onRenderMarkdown, helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement() }, this.props.children));
        }
        else {
            return (React.createElement(React.Fragment, null,
                React.createElement(attachmenthtml_1.default, Object.assign({ onUpload: this.onUpload, onDelete: this.onDelete, onOpen: onOpenAttachment, id: (0, index_1.getId)(id), label: React.createElement(label_1.default, { item: item, onRenderMarkdown: onRenderMarkdown, questionnaire: questionnaire, resources: resources }), subLabel: subLabelText ? React.createElement(sublabel_1.default, { subLabelText: subLabelText }) : undefined, uploadButtonText: this.getButtonText(), resources: resources, isRequired: (0, index_1.isRequired)(item), multiple: (0, index_1.isRepeat)(item), errorText: (0, extension_1.getValidationTextExtension)(item), uploadedFiles: this.getAttachment(), onRequestAttachmentLink: this.props.onRequestAttachmentLink, helpButton: this.props.renderHelpButton(), helpElement: this.props.renderHelpElement(), maxFiles: (0, extension_1.getMaxOccursExtensionValue)(item), minFiles: (0, extension_1.getMinOccursExtensionValue)(item), attachmentMaxFileSize: this.props.attachmentMaxFileSize, attachmentValidTypes: this.props.attachmentValidTypes, item: item, attachmentErrorMessage: this.props.attachmentErrorMessage }, other))));
        }
    }
}
const withCommonFunctionsComponent = (0, with_common_functions_1.default)(AttachmentComponent);
const connectedComponent = (0, react_redux_1.connect)(map_props_1.mapStateToProps, map_props_1.mapDispatchToProps, map_props_1.mergeProps)(withCommonFunctionsComponent);
exports.default = connectedComponent;
//# sourceMappingURL=attachment.js.map