"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IE11HackToWorkAroundBug187484 = void 0;
const index_1 = require("./index");
function IE11HackToWorkAroundBug187484() {
    if ((0, index_1.isIE11)()) {
        window.setTimeout(function () {
            const heights = ['1.51', '1.5'];
            const elem = document.getElementsByTagName('body')[0];
            const currentHeight = elem.style.lineHeight || '1.5';
            const index = heights.indexOf(currentHeight);
            const newHeight = heights[(index + 1) % 2];
            elem.style.lineHeight = newHeight;
        });
    }
}
exports.IE11HackToWorkAroundBug187484 = IE11HackToWorkAroundBug187484;
//# sourceMappingURL=hacks.js.map