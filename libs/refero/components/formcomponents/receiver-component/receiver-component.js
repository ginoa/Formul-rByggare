"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const orgenhetHierarki_1 = require("../../../types/orgenhetHierarki");
const Loader_1 = tslib_1.__importDefault(require("@helsenorge/designsystem-react/components/Loader"));
const NotificationPanel_1 = tslib_1.__importDefault(require("@helsenorge/designsystem-react/components/NotificationPanel"));
const validation_error_1 = tslib_1.__importDefault(require("@helsenorge/form/components/form/validation-error"));
const safe_select_1 = tslib_1.__importDefault(require("@helsenorge/form/components/safe-select"));
const util_1 = require("../../../util");
class ReceiverComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            receiverTreeNodes: [],
            selectedPath: [],
            selectedReceiver: '',
            isValid: false,
            isValidated: false,
            isLoading: true,
            hasLoadError: false,
        };
        this.onChangeDropdownValue = this.onChangeDropdownValue.bind(this);
        this.loadSuccessCallback = this.loadSuccessCallback.bind(this);
        this.loadErrorCallback = this.loadErrorCallback.bind(this);
    }
    componentDidMount() {
        if (this.props.fetchReceivers) {
            this.props.fetchReceivers(this.loadSuccessCallback, this.loadErrorCallback);
        }
    }
    loadSuccessCallback(receivers) {
        const pathsToEndPoint = this.props.selected ? this.findPathToEndpointNode(receivers, this.props.selected[0] || '') : [];
        const selectedPath = pathsToEndPoint.length === 1 ? pathsToEndPoint[0] : [];
        const selectedReceiver = this.getReceiverName(receivers, selectedPath);
        this.setState({
            isLoading: false,
            receiverTreeNodes: receivers,
            selectedPath: selectedPath,
            selectedReceiver: selectedReceiver,
            isValid: !!selectedReceiver,
            hasLoadError: receivers.length === 0,
        });
        if (selectedPath.length === 0 && this.props.selected && this.props.selected.length > 0) {
            this.props.clearCodingAnswer({ code: this.props.selected[0] });
        }
    }
    loadErrorCallback() {
        this.setState({
            isLoading: false,
            hasLoadError: true,
        });
    }
    findPathToEndpointNode(nodes, target, currentPath = [], finalPaths = []) {
        (nodes || []).forEach(node => {
            if (this.getEndepunktVerdi(node.EndepunktId) === target && (node.UnderOrgenheter === null || node.UnderOrgenheter.length === 0)) {
                finalPaths.push([...currentPath, node.OrgenhetId]);
            }
            else {
                this.findPathToEndpointNode(node.UnderOrgenheter, target, [...currentPath, node.OrgenhetId], finalPaths);
            }
        });
        return finalPaths;
    }
    onChangeDropdownValue(level, selectedNode) {
        const isLeafNode = selectedNode.UnderOrgenheter === null || selectedNode.UnderOrgenheter.length === 0;
        this.setState((prevState) => {
            const prevSelectedValues = prevState.selectedPath.filter((_x, index) => index < level);
            const newSelectedPath = [...prevSelectedValues, selectedNode.OrgenhetId];
            const selectedReceiver = isLeafNode ? this.getReceiverName(this.state.receiverTreeNodes, newSelectedPath) : '';
            return {
                selectedPath: newSelectedPath,
                selectedReceiver: selectedReceiver,
                isValid: !!selectedReceiver,
            };
        });
        if (isLeafNode) {
            this.props.handleChange(this.getEndepunktVerdi(selectedNode.EndepunktId) || '', '', selectedNode.Navn);
        }
        else if (this.props.selected) {
            this.props.clearCodingAnswer({ code: this.props.selected[0] });
        }
    }
    findTreeNodeFromPath(searchData, searchPath) {
        const currentSearchNode = (searchData || []).find(x => x.OrgenhetId === searchPath[0]);
        if (!currentSearchNode) {
            return undefined;
        }
        if (searchPath.length === 1) {
            return currentSearchNode;
        }
        const newSearchPath = [...searchPath];
        newSearchPath.shift();
        return this.findTreeNodeFromPath(currentSearchNode.UnderOrgenheter, newSearchPath);
    }
    getReceiverName(searchData, searchPath) {
        var _a, _b, _c;
        const receiverNodes = searchPath.map((_x, index) => {
            return this.findTreeNodeFromPath(searchData, searchPath.slice(0, index + 1));
        });
        if (((_a = receiverNodes[receiverNodes.length - 1]) === null || _a === void 0 ? void 0 : _a.UnderOrgenheter) === null ||
            ((_c = (_b = receiverNodes[receiverNodes.length - 1]) === null || _b === void 0 ? void 0 : _b.UnderOrgenheter) === null || _c === void 0 ? void 0 : _c.length) === 0) {
            return receiverNodes.map(receiverNode => receiverNode === null || receiverNode === void 0 ? void 0 : receiverNode.Navn).join(' / ');
        }
        else {
            return '';
        }
    }
    getEndepunktVerdi(endepunktId) {
        return `Endpoint/${endepunktId}`;
    }
    validateField() {
        return new Promise((resolve) => {
            this.setState({
                isValid: !!this.getReceiverName(this.state.receiverTreeNodes, this.state.selectedPath),
                isValidated: true,
            }, () => {
                resolve();
            });
        });
    }
    isValid() {
        return this.state.isValid;
    }
    getLabelText(enhetType) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (enhetType === orgenhetHierarki_1.EnhetType.Region) {
            return (_a = this.props.resources) === null || _a === void 0 ? void 0 : _a.adresseKomponent_velgHelseregion;
        }
        else if (enhetType === orgenhetHierarki_1.EnhetType.Foretak) {
            return (_b = this.props.resources) === null || _b === void 0 ? void 0 : _b.adresseKomponent_velgHelseforetak;
        }
        else if (enhetType === orgenhetHierarki_1.EnhetType.Sykehus) {
            return (_c = this.props.resources) === null || _c === void 0 ? void 0 : _c.adresseKomponent_velgSykehus;
        }
        else if (enhetType === orgenhetHierarki_1.EnhetType.Klinikk) {
            return (_d = this.props.resources) === null || _d === void 0 ? void 0 : _d.adresseKomponent_velgKlinikk;
        }
        else if (enhetType === orgenhetHierarki_1.EnhetType.Avdeling) {
            return (_e = this.props.resources) === null || _e === void 0 ? void 0 : _e.adresseKomponent_velgAvdeling;
        }
        else if (enhetType === orgenhetHierarki_1.EnhetType.Seksjon) {
            return (_f = this.props.resources) === null || _f === void 0 ? void 0 : _f.adresseKomponent_velgSeksjon;
        }
        else if (enhetType === orgenhetHierarki_1.EnhetType.Sengepost) {
            return (_g = this.props.resources) === null || _g === void 0 ? void 0 : _g.adresseKomponent_velgSengepost;
        }
        else if (enhetType === orgenhetHierarki_1.EnhetType.Poliklinikk) {
            return (_h = this.props.resources) === null || _h === void 0 ? void 0 : _h.adresseKomponent_velgPoliklinikk;
        }
        else if (enhetType === orgenhetHierarki_1.EnhetType.Tjeneste) {
            return (_j = this.props.resources) === null || _j === void 0 ? void 0 : _j.adresseKomponent_velgTjeneste;
        }
        return '';
    }
    createSelect(treeNodes, level, selectKey) {
        var _a;
        const selectOptions = treeNodes.map(node => new Option(node.Navn, node.OrgenhetId.toString()));
        const label = this.getLabelText(treeNodes[0].EnhetType);
        return (React.createElement(safe_select_1.default, { key: selectKey, id: `${(0, util_1.getId)(this.props.id)}-${selectKey}`, selectName: `${(0, util_1.getId)(this.props.id)}-${selectKey}`, showLabel: true, label: label, isRequired: true, onChange: (evt) => {
                const newValue = evt.target.value;
                const node = treeNodes.find(x => x.OrgenhetId === parseInt(newValue));
                if (node) {
                    this.onChangeDropdownValue(level, node);
                }
            }, options: selectOptions, selected: this.state.selectedPath[level] ? this.state.selectedPath[level].toString() : '', value: this.state.selectedPath[level] ? this.state.selectedPath[level].toString() : '', placeholder: new Option((_a = this.props.resources) === null || _a === void 0 ? void 0 : _a.selectDefaultPlaceholder, ''), wrapperClasses: "page_refero__receiverselect", className: "page_refero__input" }));
    }
    renderSelects() {
        const selectConfigs = [{ key: 'root', selectOptions: this.state.receiverTreeNodes }];
        this.state.selectedPath.forEach((_x, index) => {
            var _a;
            const searchPath = this.state.selectedPath.slice(0, index + 1);
            const treeNodes = (_a = this.findTreeNodeFromPath(this.state.receiverTreeNodes, searchPath)) === null || _a === void 0 ? void 0 : _a.UnderOrgenheter;
            if (treeNodes && treeNodes.length > 0) {
                return selectConfigs.push({ key: searchPath.toString(), selectOptions: treeNodes });
            }
        });
        return (React.createElement(React.Fragment, null, selectConfigs.map((config, index) => {
            return this.createSelect(config.selectOptions, index, config.key);
        })));
    }
    renderErrorMessage() {
        var _a;
        if (!this.state.isValid && this.state.isValidated) {
            return React.createElement(validation_error_1.default, { isValid: this.state.isValid, error: ((_a = this.props.resources) === null || _a === void 0 ? void 0 : _a.adresseKomponent_feilmelding) || '' });
        }
        return null;
    }
    render() {
        var _a, _b, _c, _d;
        const wrapperClasses = (0, classnames_1.default)({
            mol_validation: true,
            'mol_validation--active': !this.state.isValid && this.state.isValidated,
        });
        return (React.createElement("div", { className: wrapperClasses, id: (0, util_1.getId)(this.props.id) },
            this.renderErrorMessage(),
            React.createElement("h2", null, (_a = this.props.resources) === null || _a === void 0 ? void 0 : _a.adresseKomponent_header),
            React.createElement("div", { className: "page_refero__sublabel" }, (_b = this.props.resources) === null || _b === void 0 ? void 0 : _b.adresseKomponent_sublabel),
            this.state.isLoading && (React.createElement("div", null,
                React.createElement(Loader_1.default, null))),
            this.state.hasLoadError && (React.createElement(NotificationPanel_1.default, { variant: "alert" }, (_c = this.props.resources) === null || _c === void 0 ? void 0 : _c.adresseKomponent_loadError)),
            this.state.receiverTreeNodes.length > 0 && this.renderSelects(),
            this.state.selectedReceiver && (React.createElement("div", null,
                React.createElement("span", null, `${(_d = this.props.resources) === null || _d === void 0 ? void 0 : _d.adresseKomponent_skjemaSendesTil} `),
                React.createElement("strong", null, this.state.selectedReceiver)))));
    }
}
exports.default = ReceiverComponent;
//# sourceMappingURL=receiver-component.js.map