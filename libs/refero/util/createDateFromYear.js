"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDateFromYear = void 0;
function createDateFromYear(item, answer) {
    if (answer && answer.valueDate) {
        return new Date(answer.valueDate.toString() + 'T00:00Z');
    }
    else if (item.initial && item.initial[0].valueDate) {
        return new Date(item.initial[0].valueDate.toString() + 'T00:00Z');
    }
    else {
        return undefined;
    }
}
exports.createDateFromYear = createDateFromYear;
//# sourceMappingURL=createDateFromYear.js.map