"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_1 = require("react");
const HelpButton = ({ item, children, callback }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
        callback(!isOpen);
    };
    if (!item)
        return null;
    return (React.createElement("span", { className: "page_refero__helpButton", onClick: handleToggle }, children));
};
exports.default = HelpButton;
//# sourceMappingURL=help-button.js.map