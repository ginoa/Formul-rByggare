"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatButton = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const Button_1 = tslib_1.__importDefault(require("@helsenorge/designsystem-react/components/Button"));
const Icons_1 = tslib_1.__importDefault(require("@helsenorge/designsystem-react/components/Icons"));
const PlusLarge_1 = tslib_1.__importDefault(require("@helsenorge/designsystem-react/components/Icons/PlusLarge"));
const newValue_1 = require("../../../actions/newValue");
const extension_1 = require("../../../util/extension");
const map_props_1 = require("../../../util/map-props");
const RepeatButton = ({ item, resources, dispatch, parentPath, responseItems, disabled }) => {
    const onAddRepeatItem = () => {
        if (dispatch && item) {
            dispatch((0, newValue_1.addRepeatItem)(parentPath, item, responseItems));
        }
    };
    let text = (0, extension_1.getRepeatsTextExtension)(item);
    if (!text && resources && resources.repeatButtonText) {
        text = resources.repeatButtonText;
    }
    return (React.createElement(Button_1.default, { onClick: onAddRepeatItem, variant: "borderless", disabled: disabled },
        React.createElement(Icons_1.default, { svgIcon: PlusLarge_1.default }),
        text));
};
exports.RepeatButton = RepeatButton;
const connectedComponent = (0, react_redux_1.connect)(map_props_1.mapStateToProps, map_props_1.mapDispatchToProps, map_props_1.mergeProps)(exports.RepeatButton);
exports.default = connectedComponent;
//# sourceMappingURL=repeat-button.js.map