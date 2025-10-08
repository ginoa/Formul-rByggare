"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const validation_1 = tslib_1.__importDefault(require("@helsenorge/form/components/form/validation"));
const util_1 = require("../../../util");
const receiver_component_1 = tslib_1.__importDefault(require("./receiver-component"));
class ReceiverComponentWrapper extends React.Component {
    render() {
        var _a;
        return (React.createElement("div", { className: "page_refero__component page_refero__receivercomponent", id: `${(0, util_1.getId)(this.props.id)}-wrapper` },
            React.createElement(validation_1.default, Object.assign({}, this.props),
                React.createElement(receiver_component_1.default, Object.assign({}, this.props, { label: (_a = this.props.resources) === null || _a === void 0 ? void 0 : _a.adresseKomponent_header })))));
    }
}
exports.default = ReceiverComponentWrapper;
//# sourceMappingURL=receiver-component-wrapper.js.map