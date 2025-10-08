"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderContext = void 0;
const renderContextType_1 = require("../constants/renderContextType");
class RenderContext {
    constructor(renderContextType = renderContextType_1.RenderContextType.None, owner = '', columns = []) {
        this.RenderContextType = renderContextType;
        this.Owner = owner;
        this.Columns = columns;
    }
}
exports.RenderContext = RenderContext;
//# sourceMappingURL=renderContext.js.map