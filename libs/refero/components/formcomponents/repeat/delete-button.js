"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const Button_1 = tslib_1.__importDefault(require("@helsenorge/designsystem-react/components/Button"));
const Icons_1 = tslib_1.__importDefault(require("@helsenorge/designsystem-react/components/Icons"));
const TrashCan_1 = tslib_1.__importDefault(require("@helsenorge/designsystem-react/components/Icons/TrashCan"));
const Modal_1 = tslib_1.__importDefault(require("@helsenorge/designsystem-react/components/Modal"));
const newValue_1 = require("../../../actions/newValue");
const map_props_1 = require("../../../util/map-props");
class DeleteButton extends React.Component {
    constructor(props) {
        super(props);
        this.onDeleteRepeatItemConfirmed = () => {
            var _a;
            if (this.props.dispatch && this.props.item && this.props.path) {
                (_a = this.props
                    .dispatch((0, newValue_1.deleteRepeatItemAsync)(this.props.path, this.props.item))) === null || _a === void 0 ? void 0 : _a.then(newState => this.props.onAnswerChange(newState, this.props.path, this.props.item, {}));
            }
            this.setState({ showConfirm: false });
        };
        this.onDeleteRepeatItem = () => {
            if (this.props.mustShowConfirm) {
                this.setState({ showConfirm: true });
            }
            else {
                this.onDeleteRepeatItemConfirmed();
            }
        };
        this.onConfirmCancel = () => {
            this.setState({ showConfirm: false });
        };
        this.state = { showConfirm: false };
    }
    render() {
        const { resources } = this.props;
        return (React.createElement(React.Fragment, null,
            React.createElement(Button_1.default, { variant: "outline", concept: "destructive", onClick: this.onDeleteRepeatItem },
                React.createElement(Icons_1.default, { svgIcon: TrashCan_1.default }),
                resources && resources.deleteButtonText ? resources.deleteButtonText : ''),
            this.state.showConfirm && resources ? (React.createElement(Modal_1.default, { onClose: this.onConfirmCancel, title: resources.confirmDeleteHeading, description: resources.confirmDeleteDescription, onSuccess: this.onDeleteRepeatItemConfirmed, primaryButtonText: resources.confirmDeleteButtonText, secondaryButtonText: resources.confirmDeleteCancelButtonText })) : null));
    }
}
const connectedComponent = (0, react_redux_1.connect)(map_props_1.mapStateToProps, map_props_1.mapDispatchToProps, map_props_1.mergeProps)(DeleteButton);
exports.default = connectedComponent;
//# sourceMappingURL=delete-button.js.map