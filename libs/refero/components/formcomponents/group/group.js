"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const dompurify_1 = tslib_1.__importDefault(require("dompurify"));
const react_redux_1 = require("react-redux");
const AnchorLink_1 = tslib_1.__importDefault(require("@helsenorge/designsystem-react/components/AnchorLink"));
const renderContextType_1 = require("../../../constants/renderContextType");
const group_item_control_1 = require("../../../util/group-item-control");
const index_1 = require("../../../util/index");
const map_props_1 = require("../../../util/map-props");
const renderContext_1 = require("../../../util/renderContext");
const with_common_functions_1 = tslib_1.__importDefault(require("../../with-common-functions"));
class Group extends React.Component {
    constructor(props) {
        super(props);
        this.renderAllItems = () => {
            const { renderContext } = this.props;
            const localRenderContextType = this.getLocalRenderContextType();
            if (localRenderContextType) {
                switch (localRenderContextType) {
                    case renderContextType_1.RenderContextType.Grid:
                        return this.renderContextTypeGrid();
                }
            }
            switch (renderContext.RenderContextType) {
                case renderContextType_1.RenderContextType.Grid:
                    return this.isDirectChildOfRenderContextOwner() ? this.renderContextTypeGridRow() : this.renderGroup();
                default:
                    return this.renderGroup();
            }
        };
        this.isDirectChildOfRenderContextOwner = () => {
            const { path, item, renderContext } = this.props;
            const myIndex = path.findIndex(p => p.linkId === item.linkId);
            if (myIndex > 0) {
                const directParentLinkId = path[myIndex - 1].linkId;
                return directParentLinkId === renderContext.Owner;
            }
            return false;
        };
        this.renderContextTypeGridRow = () => {
            const { renderContext, item } = this.props;
            renderContext.RenderChildren = (childItems, itemRenderer) => {
                const renderedChildItems = [];
                let counter = 1;
                for (const column of renderContext.Columns) {
                    const childItem = childItems.find(item => item.text === column);
                    if (childItem) {
                        renderedChildItems.push(React.createElement("td", { key: counter, className: "page_refero__grid--cell" }, itemRenderer(childItem, renderContext)));
                    }
                    else {
                        renderedChildItems.push(React.createElement("td", { key: counter, className: "page_refero__grid--cell page_refero__grid--cell-empty" }, ` `));
                    }
                    counter++;
                }
                return renderedChildItems;
            };
            return (React.createElement("tr", { key: item.linkId, className: "page_refero__grid--row" },
                React.createElement("td", { className: "page_refero__grid--cell page_refero__grid--cell-first" }, this.renderGroupHeader()),
                this.props.renderChildrenItems(renderContext)));
        };
        this.renderContextTypeGrid = () => {
            const { item } = this.props;
            const columns = this.getColumns();
            const headers = columns.map(c => React.createElement("th", { key: item.linkId + '-' + c }, c));
            headers.unshift(React.createElement("th", { key: item.linkId + 'X' }, item.text ? item.text : ''));
            const newRenderContext = new renderContext_1.RenderContext(renderContextType_1.RenderContextType.Grid, item.linkId, columns);
            return (React.createElement(React.Fragment, null,
                React.createElement("table", { id: (0, index_1.getId)(this.props.id), className: "page_refero__grid" },
                    React.createElement("thead", null,
                        React.createElement("tr", null, headers)),
                    React.createElement("tbody", null, this.props.renderChildrenItems(newRenderContext))),
                this.props.renderDeleteButton('page_refero__deletebutton--margin-top'),
                this.props.repeatButton));
        };
        this.renderGroup = () => {
            var _a;
            return (React.createElement("section", { id: (0, index_1.getId)(this.props.id), "data-sectionname": this.getHeaderText() },
                this.renderGroupHeader(),
                this.props.renderHelpElement(),
                React.createElement("div", { id: `${(0, index_1.getId)(this.props.id)}-navanchor`, className: this.getClassNames() }, this.props.renderChildrenItems(new renderContext_1.RenderContext())),
                this.props.includeSkipLink && this.props.path.length === 1 && (React.createElement(AnchorLink_1.default, { className: "page_refero__skiplink", href: "#navigator-button" }, (_a = this.props.resources) === null || _a === void 0 ? void 0 : _a.skipLinkText)),
                this.props.renderDeleteButton('page_refero__deletebutton--margin-top'),
                this.props.repeatButton));
        };
        this.getColumns = () => {
            const item = this.props.item;
            const seenColumns = {};
            const columns = [];
            if (!item.item || item.item.length === 0)
                return columns;
            for (const group of item.item) {
                if (group.item && group.item.length > 0) {
                    for (const cell of group.item) {
                        const key = cell.text || '';
                        if (key in seenColumns)
                            continue;
                        columns.push(key);
                        seenColumns[key] = 1;
                    }
                }
            }
            return columns;
        };
        this.getLocalRenderContextType = () => {
            const coding = (0, group_item_control_1.getGroupItemControl)(this.props.item);
            if (coding.length > 0) {
                switch (coding[0].code) {
                    case 'grid':
                        return renderContextType_1.RenderContextType.Grid;
                }
            }
            return renderContextType_1.RenderContextType.None;
        };
        this.getClassNames = () => {
            const classNames = ['page_refero__component', 'page_refero__component_group'];
            const coding = (0, group_item_control_1.getGroupItemControl)(this.props.item);
            if (coding.length > 0) {
                classNames.push('page_refero__itemControl_' + coding[0].code);
            }
            return classNames.join(' ');
        };
        this.getComponentToValidate = () => {
            return undefined;
        };
        this.getHeaderText = () => {
            return ((0, index_1.renderPrefix)(this.props.item) +
                ' ' +
                (0, index_1.getText)(this.props.item, this.props.onRenderMarkdown, this.props.questionnaire, this.props.resources));
        };
        this.renderGroupHeader = () => {
            if (!(0, index_1.getText)(this.props.item, this.props.onRenderMarkdown)) {
                return null;
            }
            const HeaderTag = `h${this.props.headerTag}`;
            const headerText = dompurify_1.default.sanitize(this.getHeaderText(), {
                RETURN_TRUSTED_TYPE: true,
                ADD_ATTR: ['target'],
            });
            return (React.createElement(React.Fragment, null,
                React.createElement(HeaderTag, { className: 'page_refero__heading', dangerouslySetInnerHTML: { __html: headerText } }),
                this.props.renderHelpButton()));
        };
    }
    shouldComponentUpdate(nextProps) {
        var _a;
        const responseItemHasChanged = this.props.responseItem !== nextProps.responseItem;
        const helpItemHasChanged = this.props.isHelpOpen !== nextProps.isHelpOpen;
        const repeatButtonHasChanged = this.props.repeatButton !== nextProps.repeatButton;
        const attachmentErrorMessageHasChanged = this.props.attachmentErrorMessage !== nextProps.attachmentErrorMessage;
        const resourcesHasChanged = JSON.stringify(this.props.resources) !== JSON.stringify(nextProps.resources);
        const repeats = (_a = this.props.item.repeats) !== null && _a !== void 0 ? _a : false;
        return (responseItemHasChanged ||
            helpItemHasChanged ||
            repeatButtonHasChanged ||
            attachmentErrorMessageHasChanged ||
            resourcesHasChanged ||
            repeats);
    }
    render() {
        const { pdf } = this.props;
        if (pdf) {
            return React.createElement("div", null, this.renderAllItems());
        }
        return this.renderAllItems();
    }
}
exports.Group = Group;
const withCommonFunctionsComponent = (0, with_common_functions_1.default)(Group);
const connectedComponent = (0, react_redux_1.connect)(map_props_1.mapStateToProps, map_props_1.mapDispatchToProps, map_props_1.mergeProps)(withCommonFunctionsComponent);
exports.default = connectedComponent;
//# sourceMappingURL=group.js.map