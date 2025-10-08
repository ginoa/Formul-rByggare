"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const NotificationPanel_1 = tslib_1.__importDefault(require("@helsenorge/designsystem-react/components/NotificationPanel"));
const dropzone_1 = tslib_1.__importDefault(require("@helsenorge/file-upload/components/dropzone"));
const validation_1 = require("@helsenorge/file-upload/components/dropzone/validation");
const validation_2 = tslib_1.__importDefault(require("@helsenorge/form/components/form/validation"));
const constants_1 = tslib_1.__importStar(require("../../../constants"));
const extension_1 = require("../../../util/extension");
const attachmentHtml = (_a) => {
    var { id, onUpload, onDelete, onOpen, uploadButtonText, label, subLabel, resources, isRequired, errorText, uploadedFiles, onRequestAttachmentLink, attachmentErrorMessage, helpButton, helpElement, multiple, maxFiles, attachmentMaxFileSize, attachmentValidTypes, minFiles, item, children } = _a, other = tslib_1.__rest(_a, ["id", "onUpload", "onDelete", "onOpen", "uploadButtonText", "label", "subLabel", "resources", "isRequired", "errorText", "uploadedFiles", "onRequestAttachmentLink", "attachmentErrorMessage", "helpButton", "helpElement", "multiple", "maxFiles", "attachmentMaxFileSize", "attachmentValidTypes", "minFiles", "item", "children"]);
    const maxFilesize = attachmentMaxFileSize ? attachmentMaxFileSize : constants_1.default.MAX_FILE_SIZE;
    const validFileTypes = attachmentValidTypes ? attachmentValidTypes : constants_1.VALID_FILE_TYPES;
    const deleteText = resources ? resources.deleteAttachmentText : undefined;
    return (React.createElement("div", { className: "page_refero__component page_refero__component_attachment" },
        React.createElement(validation_2.default, Object.assign({}, other),
            React.createElement(dropzone_1.default, { id: id, label: label, subLabel: subLabel, onDrop: onUpload, onDelete: onDelete, onOpenFile: onOpen, uploadButtonText: uploadButtonText, uploadedFiles: uploadedFiles, maxFileSize: maxFilesize, validMimeTypes: validFileTypes, dontShowHardcodedText: !!deleteText, deleteText: deleteText, supportedFileFormatsText: resources ? resources.supportedFileFormats : undefined, errorMessage: (file) => {
                    return getErrorMessage(validFileTypes, maxFilesize, item, errorText, file, resources);
                }, isRequired: isRequired, wrapperClasses: "page_refero__input", onRequestLink: onRequestAttachmentLink, helpButton: helpButton, helpElement: helpElement, shouldUploadMultiple: multiple, maxFiles: maxFiles, minFiles: minFiles, chooseFilesText: resources === null || resources === void 0 ? void 0 : resources.chooseFilesText })),
        attachmentErrorMessage && React.createElement(NotificationPanel_1.default, { variant: "alert" }, attachmentErrorMessage),
        children ? React.createElement("div", { className: "nested-fieldset nested-fieldset--full-height" }, children) : null));
};
function getErrorMessage(validFileTypes, maxFileSize, item, genericErrorText, file, resources) {
    if (file && resources) {
        if (!(0, validation_1.mimeTypeIsValid)(file, validFileTypes)) {
            return resources.validationFileType;
        }
        else if (!(0, validation_1.sizeIsValid)(file, maxFileSize)) {
            return resources.validationFileMax;
        }
    }
    const validationText = (0, extension_1.getValidationTextExtension)(item);
    if (validationText) {
        return validationText;
    }
    if (genericErrorText) {
        return genericErrorText;
    }
    return '';
}
exports.default = attachmentHtml;
//# sourceMappingURL=attachmenthtml.js.map