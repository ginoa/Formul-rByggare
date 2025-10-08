"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldFormBeDisplayedAsStepView = void 0;
const shouldFormBeDisplayedAsStepView = (formDefinition) => {
    var _a, _b;
    let shouldDisplay = false;
    (_b = (_a = formDefinition.Content) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.find(qItem => {
        var _a;
        return (_a = qItem.extension) === null || _a === void 0 ? void 0 : _a.find(extension => {
            var _a, _b;
            return (_b = (_a = extension.valueCodeableConcept) === null || _a === void 0 ? void 0 : _a.coding) === null || _b === void 0 ? void 0 : _b.find(coding => {
                if (coding.code === 'step') {
                    shouldDisplay = true;
                }
            });
        });
    });
    return shouldDisplay;
};
exports.shouldFormBeDisplayedAsStepView = shouldFormBeDisplayedAsStepView;
//# sourceMappingURL=shouldFormBeDisplayedAsStepView.js.map