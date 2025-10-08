"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const redux_1 = require("redux");
const form_1 = tslib_1.__importDefault(require("../reducers/form"));
const rootReducer = (0, redux_1.combineReducers)({
    refero: (0, redux_1.combineReducers)({ form: form_1.default }),
});
exports.default = rootReducer;
//# sourceMappingURL=index.js.map