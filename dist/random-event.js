// repository: https://github.com/TweePower/twee-sugarcube-random-events
(function () {
    'use strict';

/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var RandomEventAppExport;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ConstraintsVerificator.ts":
/*!***************************************!*\
  !*** ./src/ConstraintsVerificator.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _DebugLogCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DebugLogCollector */ \"./src/DebugLogCollector.ts\");\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\n\nvar ConstraintsVerificator = /** @class */ (function () {\n    function ConstraintsVerificator(sugarcubeFacade, tagsManager, history) {\n        this.sugarcubeFacade = sugarcubeFacade;\n        this.tagsManager = tagsManager;\n        this.history = history;\n    }\n    ConstraintsVerificator.prototype.verify = function (passageMetadata, rewriteConfiguration) {\n        var _a, _b, _c, _d;\n        var result = true;\n        var usedLimitationStrategyTags = [];\n        var debugLogCollector = new _DebugLogCollector__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        var compiledTags = this.tagsManager.prepareTags(passageMetadata.tags);\n        if (rewriteConfiguration.isValidateIsEnable === true) {\n            var checkResult = this.verifyIsEnable((_a = rewriteConfiguration.isEnable) !== null && _a !== void 0 ? _a : passageMetadata.isEnabled);\n            result = checkResult.result;\n            debugLogCollector\n                .addLog(checkResult.result, \"verify IsEnable using: \".concat(rewriteConfiguration.isEnable ? 'rewrite configuration' : 'definition configuration'), 2).increaseLevel()\n                .merge(checkResult.debugLogCollector)\n                .decreaseLevel();\n        }\n        else {\n            debugLogCollector.addLog(true, 'skip IsEnable verify', 2);\n        }\n        if (result) {\n            if (rewriteConfiguration.isValidateFilter === true) {\n                var checkResult = this.verifyFilter((_b = rewriteConfiguration.filter) !== null && _b !== void 0 ? _b : passageMetadata.filter);\n                result = checkResult.result;\n                debugLogCollector\n                    .addLog(checkResult.result, \"verify filter using: \".concat(rewriteConfiguration.filter ? 'rewrite configuration' : 'definition configuration'), 2).increaseLevel()\n                    .merge(checkResult.debugLogCollector)\n                    .decreaseLevel();\n            }\n            else {\n                debugLogCollector.addLog(true, 'skip filter verify', 2);\n            }\n        }\n        if (result) {\n            if (rewriteConfiguration.isValidateLimitationStrategy) {\n                var checkResult = this.verifyLimitationStrategy(compiledTags, (_c = rewriteConfiguration.limitationStrategy) !== null && _c !== void 0 ? _c : passageMetadata.limitationStrategy, passageMetadata.name);\n                result = checkResult.result;\n                debugLogCollector\n                    .addLog(checkResult.result, \"verify limitationStrategy using: \".concat(rewriteConfiguration.limitationStrategy ? 'rewrite configuration' : 'definition configuration'), 2).increaseLevel()\n                    .merge(checkResult.debugLogCollector)\n                    .decreaseLevel();\n                usedLimitationStrategyTags = checkResult.additionalData.usedLimitationStrategyTags;\n            }\n            else {\n                debugLogCollector.addLog(true, 'skip limitationStrategy verify', 2);\n            }\n        }\n        if (result) {\n            if (rewriteConfiguration.isValidateThreshold) {\n                var checkResult = this.verifyThreshold((_d = rewriteConfiguration.threshold) !== null && _d !== void 0 ? _d : passageMetadata.threshold);\n                result = checkResult.result;\n                debugLogCollector\n                    .addLog(checkResult.result, \"verify threshold using: \".concat(rewriteConfiguration.threshold ? 'rewrite configuration' : 'definition configuration'), 2).increaseLevel()\n                    .merge(checkResult.debugLogCollector)\n                    .decreaseLevel();\n            }\n            else {\n                debugLogCollector.addLog(true, 'skip threshold verify', 2);\n            }\n        }\n        return {\n            result: result,\n            debugLogCollector: debugLogCollector,\n            additionalData: {\n                usedLimitationStrategyTags: usedLimitationStrategyTags\n            }\n        };\n    };\n    ConstraintsVerificator.prototype.verifyIsEnable = function (isEnabled) {\n        return {\n            result: isEnabled,\n            debugLogCollector: new _DebugLogCollector__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().addLog(isEnabled, isEnabled ? 'event enabled' : 'event disabled', 3)\n        };\n    };\n    ConstraintsVerificator.prototype.verifyFilter = function (filter) {\n        var debugLogCollector = new _DebugLogCollector__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        if (filter !== null) {\n            try {\n                if (!this.sugarcubeFacade.runTeweeScript(filter)) {\n                    debugLogCollector.addLog(false, 'filter expression returns false', 3);\n                    return { result: false, debugLogCollector: debugLogCollector };\n                }\n            }\n            catch (err) {\n                err.message = \"bad evaluation: \" + err.message;\n                throw err;\n            }\n        }\n        debugLogCollector.addLog(true, 'filter expression returns true', 3);\n        return { result: true, debugLogCollector: debugLogCollector };\n    };\n    ConstraintsVerificator.prototype.verifyLimitationStrategy = function (compiledTags, limitationStrategyList, passageName) {\n        var _this = this;\n        var debugLogCollector = new _DebugLogCollector__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        var usedLimitationStrategyTags = [];\n        var isSuccess = true;\n        if (limitationStrategyList.length > 0) {\n            if (limitationStrategyList.isTaged) {\n                limitationStrategyList.all().forEach(function (limitationStrategy) {\n                    // skip all next if already found limitation which is not passed\n                    if (isSuccess === false) {\n                        return;\n                    }\n                    // without limitation\n                    if (limitationStrategy.max <= 0) {\n                        debugLogCollector.addLog(true, 'limitationStrategy max value <= 0', 3);\n                        return;\n                    }\n                    if (limitationStrategy.tags.length > 0) {\n                        var limitationStrategyTags = __spreadArray([], _this.tagsManager.prepareTags(limitationStrategy.tags), true);\n                        // skip checking limitationStrategy when current compiled tags have not included `limitation.tags`\n                        for (var i = 0; i < limitationStrategyTags.length; i++) {\n                            if (!compiledTags.includes(limitationStrategyTags[i])) {\n                                debugLogCollector\n                                    .addLog(false, \"tag '\".concat(limitationStrategyTags[i], \"' not found in current tags\"), 3)\n                                    .increaseLevel()\n                                    .increaseLevel()\n                                    .addLog(null, \"current tags   : \".concat(compiledTags.join(', ')), 3)\n                                    .addLog(null, \"limitation tags: \".concat(limitationStrategyTags.join(', ')), 3)\n                                    .decreaseLevel()\n                                    .decreaseLevel();\n                                return;\n                            }\n                        }\n                        var fullLimitationStrategyTags = __spreadArray(__spreadArray([], limitationStrategyTags, true), (limitationStrategy.isSeparate ? [passageName] : []), true);\n                        var fullLimitationStrategyTagsKey = _this.tagsManager.convertTagsToStringKey(fullLimitationStrategyTags);\n                        var actualFiredTagCount = _this.history.getActualFiredTagCount(fullLimitationStrategyTagsKey);\n                        if (actualFiredTagCount >= limitationStrategy.max) {\n                            isSuccess = false;\n                            debugLogCollector.addLog(false, \"limitationStrategy with tags ['\".concat(limitationStrategyTags.join(', '), \"'] have max value \").concat(limitationStrategy.max, \" but already fired \").concat(actualFiredTagCount, \" times\"), 3);\n                            return;\n                        }\n                        else {\n                            usedLimitationStrategyTags.push(fullLimitationStrategyTags);\n                            debugLogCollector.addLog(true, \"limitationStrategy with tags ['\".concat(limitationStrategyTags.join(', '), \"'] have max value \").concat(limitationStrategy.max, \" and already fired \").concat(actualFiredTagCount, \" times\"), 3);\n                        }\n                    }\n                    else {\n                        var actualFiredEventCount = _this.history.getActualFiredEventCount(passageName);\n                        if (actualFiredEventCount >= limitationStrategy.max) {\n                            isSuccess = false;\n                            debugLogCollector.addLog(false, \"limitationStrategy without tags have max value \".concat(limitationStrategy.max, \" but already fired \").concat(actualFiredEventCount, \" times\"), 3);\n                            return;\n                        }\n                        else {\n                            debugLogCollector.addLog(true, \"limitationStrategy without tags have max value \".concat(limitationStrategy.max, \" and already fired \").concat(actualFiredEventCount, \" times\"), 3);\n                        }\n                    }\n                });\n                if (isSuccess && usedLimitationStrategyTags.length <= 0) {\n                    isSuccess = false;\n                    debugLogCollector.addLog(false, \"not found any limitationStrategy where current tags cover all limitationStrategy tags (current tags: \".concat(compiledTags.join(', ')), 3);\n                }\n            }\n            else {\n                limitationStrategyList.all().forEach(function (limitationStrategy) {\n                    // without limitation\n                    if (limitationStrategy.max <= 0) {\n                        debugLogCollector.addLog(true, 'limitationStrategy max value <= 0', 3);\n                        return;\n                    }\n                    var actualFiredEventCount = _this.history.getActualFiredEventCount(passageName);\n                    if (actualFiredEventCount >= limitationStrategy.max) {\n                        isSuccess = false;\n                        debugLogCollector.addLog(false, \"random event have max value \".concat(limitationStrategy.max, \" but already fired \").concat(actualFiredEventCount, \" times\"), 3);\n                        return;\n                    }\n                    else {\n                        debugLogCollector.addLog(true, \"random event have max value \".concat(limitationStrategy.max, \" and already fired \").concat(actualFiredEventCount, \" times\"), 3);\n                    }\n                });\n            }\n        }\n        return {\n            result: isSuccess,\n            debugLogCollector: debugLogCollector,\n            additionalData: { usedLimitationStrategyTags: usedLimitationStrategyTags }\n        };\n    };\n    ConstraintsVerificator.prototype.verifyThreshold = function (threshold) {\n        var debugLogCollector = new _DebugLogCollector__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        var thresholdResult = 0;\n        if (typeof threshold !== 'number' || isNaN(threshold) || threshold % 1 !== 0) {\n            try {\n                thresholdResult = this.sugarcubeFacade.runTeweeScript(threshold.toString());\n            }\n            catch (err) {\n                err.message = \"bad evaluation: \" + err.message;\n                throw err;\n            }\n        }\n        else {\n            thresholdResult = threshold;\n        }\n        var randomValue = Math.floor(Math.random() * 100);\n        if (randomValue > thresholdResult) {\n            debugLogCollector.addLog(false, \"random value is greater than threshold (random=\".concat(randomValue, \" > threshold=\").concat(thresholdResult, \")\"), 3);\n            return { result: false, debugLogCollector: debugLogCollector };\n        }\n        debugLogCollector.addLog(true, 'threshold passed (random=' + randomValue + ' <= threshold=' + thresholdResult + ')', 3);\n        return { result: true, debugLogCollector: debugLogCollector };\n    };\n    return ConstraintsVerificator;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConstraintsVerificator);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/ConstraintsVerificator.ts?");

/***/ }),

/***/ "./src/DebugLogCollector.ts":
/*!**********************************!*\
  !*** ./src/DebugLogCollector.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar DebugLogCollector = /** @class */ (function () {\n    function DebugLogCollector(debugLevel) {\n        if (debugLevel === void 0) { debugLevel = 0; }\n        this.debugLevel = debugLevel;\n        this.currentLevel = 0;\n        this.logs = [];\n        if (debugLevel !== 0 && debugLevel !== 1 && debugLevel !== 2 && debugLevel !== 3) {\n            throw new Error(\"Debug level should be 0, 1, 2 or 3\");\n        }\n    }\n    DebugLogCollector.prototype.addLog = function (result, message, debugLevel, level) {\n        this.logs.push({\n            result: result,\n            message: message,\n            debugLevel: debugLevel,\n            level: level === undefined ? this.currentLevel : level,\n        });\n        return this;\n    };\n    DebugLogCollector.prototype.merge = function (debugLogCollector) {\n        var _this = this;\n        debugLogCollector.all().forEach(function (log) { return _this.addLog(log.result, log.message, log.debugLevel, log.level + _this.currentLevel); });\n        return this;\n    };\n    DebugLogCollector.prototype.increaseLevel = function () {\n        this.currentLevel++;\n        return this;\n    };\n    DebugLogCollector.prototype.decreaseLevel = function () {\n        this.currentLevel--;\n        if (this.currentLevel < 0) {\n            this.currentLevel = 0;\n        }\n        return this;\n    };\n    Object.defineProperty(DebugLogCollector.prototype, \"length\", {\n        get: function () {\n            return this.logs.length;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    DebugLogCollector.prototype.all = function () {\n        return this.logs;\n    };\n    DebugLogCollector.prototype.toString = function () {\n        var _this = this;\n        return this.logs\n            .filter(function (log) { return log.debugLevel <= _this.debugLevel; })\n            .map(function (log) { return ('  '.repeat(log.level)) + (log.result === true ? '+ ' : (log.result === false ? '- ' : '')) + log.message; })\n            .join(\"\\n\");\n    };\n    DebugLogCollector.prototype.clear = function () {\n        this.currentLevel = 0;\n        this.logs = [];\n        return this;\n    };\n    return DebugLogCollector;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DebugLogCollector);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/DebugLogCollector.ts?");

/***/ }),

/***/ "./src/Group.ts":
/*!**********************!*\
  !*** ./src/Group.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/TypeChecker */ \"./src/tools/TypeChecker.ts\");\n/* harmony import */ var _enum_GroupTypeEnum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enum/GroupTypeEnum */ \"./src/enum/GroupTypeEnum.ts\");\n\n\nvar Group = /** @class */ (function () {\n    function Group(name, weight, type, sequentialIndex, sequentialCount) {\n        this.name = name;\n        this.weight = weight;\n        this.type = type;\n        this.sequentialIndex = sequentialIndex;\n        this.sequentialCount = sequentialCount;\n    }\n    Group.createFromGroupPassageMetadata = function (groupDefinition // eslint-disable-line @typescript-eslint/no-explicit-any\n    ) {\n        var _a, _b;\n        if (typeof groupDefinition === 'string') {\n            return new Group(groupDefinition.toLowerCase(), 10, _enum_GroupTypeEnum__WEBPACK_IMPORTED_MODULE_1__.GroupTypeEnum.Random, null, null);\n        }\n        else {\n            if (_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isObject(groupDefinition)) {\n                if (!_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isString(groupDefinition.name)) {\n                    throw new Error(\"\\\"definition.group.name\\\" should be string\");\n                }\n                if (groupDefinition.weight !== undefined && !_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isInteger(groupDefinition.weight)) {\n                    throw new Error(\"\\\"definition.group.weight\\\" should be integer\");\n                }\n                if (groupDefinition.type !== undefined && groupDefinition.type !== 'random' && groupDefinition.type !== 'sequential') {\n                    throw new Error(\"\\\"definition.group.type\\\" should be \\\"random\\\" or \\\"sequential\\\"\");\n                }\n                if (groupDefinition.type === 'sequential') {\n                    if (groupDefinition.sequentialIndex === undefined) {\n                        throw new Error(\"\\\"definition.group.sequentialIndex\\\" is requered when \\\"definition.group.type\\\" = \\\"sequential\\\"\");\n                    }\n                    if (!_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isInteger(groupDefinition.sequentialIndex)) {\n                        throw new Error(\"\\\"definition.group.sequentialIndex\\\" should be integer\");\n                    }\n                    if (groupDefinition.sequentialCount !== undefined && !_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isInteger(groupDefinition.sequentialCount)) {\n                        throw new Error(\"\\\"definition.group.sequentialCount\\\" should be integer\");\n                    }\n                }\n                return new Group(groupDefinition.name.toLowerCase(), (_a = groupDefinition.weight) !== null && _a !== void 0 ? _a : 10, groupDefinition.type === 'sequential' ? _enum_GroupTypeEnum__WEBPACK_IMPORTED_MODULE_1__.GroupTypeEnum.Sequential : _enum_GroupTypeEnum__WEBPACK_IMPORTED_MODULE_1__.GroupTypeEnum.Random, groupDefinition.type === 'sequential' ? groupDefinition.sequentialIndex : null, groupDefinition.type === 'sequential' ? ((_b = groupDefinition.sequentialCount) !== null && _b !== void 0 ? _b : 1) : null);\n            }\n            else {\n                throw new Error(\"\\\"definition.group\\\" should be string, object\");\n            }\n        }\n    };\n    return Group;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Group);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/Group.ts?");

/***/ }),

/***/ "./src/GroupList.ts":
/*!**************************!*\
  !*** ./src/GroupList.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Group__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Group */ \"./src/Group.ts\");\n\nvar GroupList = /** @class */ (function () {\n    function GroupList(groups) {\n        var _this = this;\n        this.groups = groups;\n        this.nameIndex = {};\n        this.groups = groups;\n        this.groups.forEach(function (group, index) {\n            if (_this.nameIndex[group.name] !== undefined) {\n                throw new Error(\"\\\"definition.group.name\\\" should be unique in one RE\");\n            }\n            _this.nameIndex[group.name] = index;\n        });\n    }\n    GroupList.createFromGroupsPassageMetadata = function (groupsDefinitions) {\n        if (groupsDefinitions === undefined) {\n            return new GroupList([]);\n        }\n        else {\n            if (!Array.isArray(groupsDefinitions)) {\n                groupsDefinitions = [groupsDefinitions];\n            }\n            return new GroupList(groupsDefinitions.map(function (groupsDefinition) {\n                return _Group__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createFromGroupPassageMetadata(groupsDefinition);\n            }));\n        }\n    };\n    Object.defineProperty(GroupList.prototype, \"length\", {\n        get: function () {\n            return this.groups.length;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    GroupList.prototype.all = function () {\n        return this.groups;\n    };\n    GroupList.prototype.getByName = function (groupName) {\n        if (this.nameIndex[groupName] === undefined) {\n            return null;\n        }\n        return this.groups[this.nameIndex[groupName]];\n    };\n    return GroupList;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GroupList);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/GroupList.ts?");

/***/ }),

/***/ "./src/History.ts":
/*!************************!*\
  !*** ./src/History.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar History = /** @class */ (function () {\n    function History(sugarcubeFacade) {\n        this.sugarcubeFacade = sugarcubeFacade;\n        this.actualFiredEvents = {};\n        this.actualFiredTags = {};\n        this.historyFiredEvents = {};\n        this.historyFiredTags = {};\n        this.forceEventStatus = {};\n    }\n    History.prototype.loadFromSerilizedString = function (serializedString) {\n        var _this = this;\n        var state = JSON.parse(serializedString);\n        Object.keys(state.e).forEach(function (passageName) {\n            if (state.e[passageName].a !== undefined) {\n                _this.actualFiredEvents[passageName] = state.e[passageName].a;\n            }\n            if (state.e[passageName].h !== undefined) {\n                _this.historyFiredEvents[passageName] = state.e[passageName].h;\n            }\n            if (state.e[passageName].s !== undefined) {\n                _this.forceEventStatus[passageName] = state.e[passageName].s === 1;\n            }\n        });\n        Object.keys(state.t).forEach(function (tag) {\n            if (state.t[tag].a !== undefined) {\n                _this.actualFiredTags[tag] = state.t[tag].a;\n            }\n            if (state.t[tag].h !== undefined) {\n                _this.historyFiredTags[tag] = state.t[tag].h;\n            }\n        });\n    };\n    History.prototype.serialize = function () {\n        var _this = this;\n        var result = { e: {}, t: {} };\n        Object.keys(this.actualFiredEvents).forEach(function (passageName) {\n            if (result.e[passageName] === undefined) {\n                result.e[passageName] = {};\n            }\n            result.e[passageName].a = _this.actualFiredEvents[passageName];\n        });\n        Object.keys(this.historyFiredEvents).forEach(function (passageName) {\n            if (result.e[passageName] === undefined) {\n                result.e[passageName] = {};\n            }\n            result.e[passageName].h = _this.historyFiredEvents[passageName];\n        });\n        Object.keys(this.forceEventStatus).forEach(function (passageName) {\n            if (result.e[passageName] === undefined) {\n                result.e[passageName] = {};\n            }\n            result.e[passageName].s = _this.forceEventStatus[passageName] === true ? 1 : 0;\n        });\n        Object.keys(this.actualFiredTags).forEach(function (tag) {\n            if (result.t[tag] === undefined) {\n                result.t[tag] = {};\n            }\n            result.t[tag].a = _this.actualFiredTags[tag];\n        });\n        Object.keys(this.historyFiredTags).forEach(function (tag) {\n            if (result.t[tag] === undefined) {\n                result.t[tag] = {};\n            }\n            result.t[tag].h = _this.historyFiredTags[tag];\n        });\n        return JSON.stringify(result);\n    };\n    History.prototype.store = function () {\n        this.sugarcubeFacade.saveVariable('randomEventHistory', this.serialize());\n    };\n    /** @deprecated only for backward compatibility */\n    History.prototype.setActualRandomEventFiredCounter = function (passageName, count) {\n        passageName = passageName.toLowerCase();\n        this.actualFiredEvents[passageName] = count;\n    };\n    /** @deprecated only for backward compatibility */\n    History.prototype.setActualTagFiredCounter = function (tag, count) {\n        tag = tag.toLowerCase();\n        this.actualFiredTags[tag] = count;\n    };\n    /** @deprecated only for backward compatibility */\n    History.prototype.setHistoryRandomEventFiredCounter = function (passageName, count) {\n        passageName = passageName.toLowerCase();\n        this.historyFiredEvents[passageName] = count;\n    };\n    /** @deprecated only for backward compatibility */\n    History.prototype.setHistoryTagFiredCounter = function (tag, count) {\n        tag = tag.toLowerCase();\n        this.historyFiredTags[tag] = count;\n    };\n    History.prototype.enable = function (passageName, isStoreImmediately) {\n        if (isStoreImmediately === void 0) { isStoreImmediately = true; }\n        passageName = passageName.toLowerCase();\n        this.forceEventStatus[passageName] = true;\n        if (isStoreImmediately) {\n            this.store();\n        }\n    };\n    History.prototype.disable = function (passageName, isStoreImmediately) {\n        if (isStoreImmediately === void 0) { isStoreImmediately = true; }\n        passageName = passageName.toLowerCase();\n        this.forceEventStatus[passageName] = false;\n        if (isStoreImmediately) {\n            this.store();\n        }\n    };\n    History.prototype.incrementRandomEventFiredCounter = function (passageName, isStoreImmediately) {\n        if (isStoreImmediately === void 0) { isStoreImmediately = true; }\n        passageName = passageName.toLowerCase();\n        this.actualFiredEvents[passageName] = this.actualFiredEvents[passageName] === undefined ? 1 : this.actualFiredEvents[passageName] + 1;\n        this.historyFiredEvents[passageName] = this.historyFiredEvents[passageName] === undefined ? 1 : this.historyFiredEvents[passageName] + 1;\n        if (isStoreImmediately) {\n            this.store();\n        }\n    };\n    History.prototype.incrementTagsFiredCounter = function (tags, isStoreImmediately) {\n        var _this = this;\n        if (isStoreImmediately === void 0) { isStoreImmediately = true; }\n        if (tags !== null) {\n            var uniqueTags = tags.filter(function (tag, index, array) { return array.indexOf(tag) === index; });\n            uniqueTags.forEach(function (tag) {\n                tag = tag.toLowerCase();\n                _this.actualFiredTags[tag] = _this.actualFiredTags[tag] === undefined ? 1 : _this.actualFiredTags[tag] + 1;\n                _this.historyFiredTags[tag] = _this.historyFiredTags[tag] === undefined ? 1 : _this.historyFiredTags[tag] + 1;\n            });\n            if (isStoreImmediately) {\n                this.store();\n            }\n        }\n    };\n    History.prototype.resetRandomEventFiredCounter = function (passageName, isStoreImmediately) {\n        if (isStoreImmediately === void 0) { isStoreImmediately = true; }\n        passageName = passageName.toLowerCase();\n        if (this.actualFiredEvents[passageName] !== undefined) {\n            delete this.actualFiredEvents[passageName];\n        }\n        if (isStoreImmediately) {\n            this.store();\n        }\n    };\n    History.prototype.resetTagFiredCounter = function (tag, isStoreImmediately) {\n        if (isStoreImmediately === void 0) { isStoreImmediately = true; }\n        tag = tag.toLowerCase();\n        if (this.actualFiredTags[tag] !== undefined) {\n            delete this.actualFiredTags[tag];\n        }\n        if (isStoreImmediately) {\n            this.store();\n        }\n    };\n    History.prototype.getActualFiredEventCount = function (passageName) {\n        var _a;\n        passageName = passageName.toLowerCase();\n        return (_a = this.actualFiredEvents[passageName]) !== null && _a !== void 0 ? _a : 0;\n    };\n    History.prototype.getActualFiredTagCount = function (tag) {\n        var _a;\n        tag = tag.toLowerCase();\n        return (_a = this.actualFiredTags[tag]) !== null && _a !== void 0 ? _a : 0;\n    };\n    History.prototype.getHistoryFiredEventCount = function (passageName) {\n        var _a;\n        passageName = passageName.toLowerCase();\n        return (_a = this.historyFiredEvents[passageName]) !== null && _a !== void 0 ? _a : 0;\n    };\n    History.prototype.getHistoryFiredTagCount = function (tag) {\n        var _a;\n        tag = tag.toLowerCase();\n        return (_a = this.historyFiredTags[tag]) !== null && _a !== void 0 ? _a : 0;\n    };\n    return History;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (History);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/History.ts?");

/***/ }),

/***/ "./src/Lock.ts":
/*!*********************!*\
  !*** ./src/Lock.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Lock = /** @class */ (function () {\n    function Lock() {\n        this.lockData = {\n            isLocked: false,\n            isForce: false,\n        };\n    }\n    Lock.prototype.acquire = function () {\n        if (this.lockData.isForce === false) {\n            this.lockData.isLocked = true;\n        }\n    };\n    Lock.prototype.release = function () {\n        if (this.lockData.isForce === false) {\n            this.lockData.isLocked = false;\n        }\n    };\n    Lock.prototype.forceAcquire = function () {\n        this.lockData.isLocked = true;\n        this.lockData.isForce = true;\n    };\n    Lock.prototype.forceRelease = function () {\n        this.lockData.isLocked = false;\n        this.lockData.isForce = false;\n    };\n    Object.defineProperty(Lock.prototype, \"isLocked\", {\n        get: function () {\n            return this.lockData.isLocked;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Lock.prototype, \"isForce\", {\n        get: function () {\n            return this.lockData.isForce;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    return Lock;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Lock);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/Lock.ts?");

/***/ }),

/***/ "./src/PassageMetadata.ts":
/*!********************************!*\
  !*** ./src/PassageMetadata.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _PassageMetadata_model_PassageMetadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PassageMetadata/model/PassageMetadata */ \"./src/PassageMetadata/model/PassageMetadata.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar PassageMetadata = /** @class */ (function (_super) {\n    __extends(PassageMetadata, _super);\n    function PassageMetadata(name, metadata, // eslint-disable-line @typescript-eslint/no-explicit-any\n    isEnabled, groups, filter, type, threshold, tags, limitationStrategy) {\n        var _this = _super.call(this, name, metadata) || this;\n        _this.isEnabled = isEnabled;\n        _this.groups = groups;\n        _this.filter = filter;\n        _this.type = type;\n        _this.threshold = threshold;\n        _this.tags = tags;\n        _this.limitationStrategy = limitationStrategy;\n        return _this;\n    }\n    return PassageMetadata;\n}(_PassageMetadata_model_PassageMetadata__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PassageMetadata);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/PassageMetadata.ts?");

/***/ }),

/***/ "./src/PassageMetadata/PassageMetadataApp.ts":
/*!***************************************************!*\
  !*** ./src/PassageMetadata/PassageMetadataApp.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _PassageMetadataCollection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PassageMetadataCollection */ \"./src/PassageMetadata/PassageMetadataCollection.ts\");\n/* harmony import */ var _PassageMetadataCollector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PassageMetadataCollector */ \"./src/PassageMetadata/PassageMetadataCollector.ts\");\n/* harmony import */ var _PassageMetadataFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PassageMetadataFactory */ \"./src/PassageMetadata/PassageMetadataFactory.ts\");\n/* harmony import */ var _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./error/PassageMetadataError */ \"./src/PassageMetadata/error/PassageMetadataError.ts\");\n\n\n\n\nvar PassageMetadataApp = /** @class */ (function () {\n    function PassageMetadataApp(sugarcubeFacade, passageMetadataRegex, mode, // all\n    modeParams) {\n        if (passageMetadataRegex === void 0) { passageMetadataRegex = /<<PassageMetadata>>(.*)<<\\/PassageMetadata>>/gms; }\n        if (mode === void 0) { mode = 'byTag'; }\n        if (modeParams === void 0) { modeParams = { filterTag: 'passage_metadata' }; }\n        this.sugarcubeFacade = sugarcubeFacade;\n        this.passageMetadataRegex = passageMetadataRegex;\n        this.mode = mode;\n        this.modeParams = modeParams;\n    }\n    PassageMetadataApp.prototype.init = function () {\n        this.passageMetadataCollection = this.createPassageMetadataCollection();\n        this.passageMetadataFactory = this.createPassageMetadataFactory();\n        this.passageMetadataCollector = new _PassageMetadataCollector__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.sugarcubeFacade, this.passageMetadataRegex, this.mode, this.modeParams);\n        return this;\n    };\n    PassageMetadataApp.prototype.createPassageMetadataCollection = function () {\n        return new _PassageMetadataCollection__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    };\n    PassageMetadataApp.prototype.createPassageMetadataFactory = function () {\n        return new _PassageMetadataFactory__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    };\n    PassageMetadataApp.prototype.collect = function () {\n        try {\n            this.passageMetadataCollector.collect(this.passageMetadataCollection, this.passageMetadataFactory);\n        }\n        catch (error) {\n            if (error instanceof _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_3__[\"default\"]) {\n                error.message += \" (\" + Object.keys(error.scope).map(function (scopeKey) { return \"\".concat(scopeKey, \": \").concat(error.scope[scopeKey]); }).join(', ');\n            }\n            throw error;\n        }\n    };\n    return PassageMetadataApp;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PassageMetadataApp);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/PassageMetadata/PassageMetadataApp.ts?");

/***/ }),

/***/ "./src/PassageMetadata/PassageMetadataCollection.ts":
/*!**********************************************************!*\
  !*** ./src/PassageMetadata/PassageMetadataCollection.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error/PassageMetadataError */ \"./src/PassageMetadata/error/PassageMetadataError.ts\");\n/* harmony import */ var _model_PassageMetadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/PassageMetadata */ \"./src/PassageMetadata/model/PassageMetadata.ts\");\n\n\nvar PassageMetadataCollection = /** @class */ (function () {\n    function PassageMetadataCollection() {\n        this.items = {};\n    }\n    PassageMetadataCollection.prototype.add = function (passageMetadata) {\n        if (!(passageMetadata instanceof _model_PassageMetadata__WEBPACK_IMPORTED_MODULE_1__[\"default\"])) {\n            throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"passage metadata should be instance of PassageMetadata\");\n        }\n        this.items[passageMetadata.name] = passageMetadata;\n    };\n    PassageMetadataCollection.prototype.has = function (name) {\n        if (typeof name !== 'string') {\n            throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"name should be string\");\n        }\n        return this.items[name] !== undefined;\n    };\n    PassageMetadataCollection.prototype.get = function (name) {\n        if (!this.has(name)) {\n            throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"PassageMetadata with name \".concat(name, \" doesn't exist\"));\n        }\n        return this.items[name];\n    };\n    PassageMetadataCollection.prototype.find = function (name) {\n        return this.has(name) ? this.items[name] : null;\n    };\n    return PassageMetadataCollection;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PassageMetadataCollection);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/PassageMetadata/PassageMetadataCollection.ts?");

/***/ }),

/***/ "./src/PassageMetadata/PassageMetadataCollector.ts":
/*!*********************************************************!*\
  !*** ./src/PassageMetadata/PassageMetadataCollector.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error/PassageMetadataError */ \"./src/PassageMetadata/error/PassageMetadataError.ts\");\n\nvar PassageMetadataCollector = /** @class */ (function () {\n    function PassageMetadataCollector(sugarcubeFacade, passageMetadataRegex, mode, // all\n    modeParams) {\n        if (passageMetadataRegex === void 0) { passageMetadataRegex = /<<PassageMetadata>>(.*)<<\\/PassageMetadata>>/gms; }\n        if (mode === void 0) { mode = 'byTag'; }\n        if (modeParams === void 0) { modeParams = { filterTag: 'passage_metadata' }; }\n        this.sugarcubeFacade = sugarcubeFacade;\n        this.passageMetadataRegex = passageMetadataRegex;\n        this.mode = mode;\n        this.modeParams = modeParams;\n    }\n    PassageMetadataCollector.prototype.collect = function (passageMetadataCollection, passageMetadataFactory) {\n        var _this = this;\n        var passages = this.sugarcubeFacade.getAllPassages();\n        if (this.mode === 'byTag') {\n            if (typeof this.modeParams.filterTag !== 'string') {\n                throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('modeParams.filterTag should be string');\n            }\n            passages = passages.filter(function (passge) { return passge.tags.includes(_this.modeParams.filterTag); });\n        }\n        passages.forEach(function (passage) {\n            _this.passageMetadataRegex.lastIndex = 0;\n            var passageMetadataRegexResult = _this.passageMetadataRegex.exec(passage.element.textContent);\n            if (_this.mode === 'byTag' && passageMetadataRegexResult === null) {\n                throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"Passage metadata not found in \".concat(passage.title));\n            }\n            try {\n                var passageMetadataEvalResult = _this.createPassageMetadataObject(passageMetadataRegexResult[1]);\n                passageMetadataEvalResult.name = passage.title;\n                passageMetadataCollection.add(passageMetadataFactory.create(passageMetadataEvalResult));\n            }\n            catch (error) {\n                throw _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fromPreviousError(error, { 'passage': passage.title });\n            }\n            // remove definition from passage\n            passage.element.textContent = passage.element.textContent.replace(passageMetadataRegexResult[0], '');\n        });\n    };\n    PassageMetadataCollector.prototype.createPassageMetadataObject = function (passageMetadata) {\n        var passageMetadataEvalResult;\n        try {\n            eval('passageMetadataEvalResult = ' + passageMetadata);\n            if (typeof passageMetadataEvalResult !== 'object'\n                || Array.isArray(passageMetadataEvalResult)\n                || passageMetadataEvalResult === null) {\n                throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"Passage metadata JSON should contain object\");\n            }\n        }\n        catch (error) {\n            throw new _error_PassageMetadataError__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"Invalid passage metadata JSON: \".concat(error.message));\n        }\n        return passageMetadataEvalResult;\n    };\n    return PassageMetadataCollector;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PassageMetadataCollector);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/PassageMetadata/PassageMetadataCollector.ts?");

/***/ }),

/***/ "./src/PassageMetadata/PassageMetadataFactory.ts":
/*!*******************************************************!*\
  !*** ./src/PassageMetadata/PassageMetadataFactory.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _model_PassageMetadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/PassageMetadata */ \"./src/PassageMetadata/model/PassageMetadata.ts\");\n\nvar PassageMetadataFactory = /** @class */ (function () {\n    function PassageMetadataFactory() {\n    }\n    PassageMetadataFactory.prototype.create = function (passageMetadataObject) {\n        return new _model_PassageMetadata__WEBPACK_IMPORTED_MODULE_0__[\"default\"](passageMetadataObject.name, passageMetadataObject);\n    };\n    return PassageMetadataFactory;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PassageMetadataFactory);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/PassageMetadata/PassageMetadataFactory.ts?");

/***/ }),

/***/ "./src/PassageMetadata/error/PassageMetadataError.ts":
/*!***********************************************************!*\
  !*** ./src/PassageMetadata/error/PassageMetadataError.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar PassageMetadataError = /** @class */ (function (_super) {\n    __extends(PassageMetadataError, _super);\n    function PassageMetadataError(message, scope) {\n        if (scope === void 0) { scope = {}; }\n        var _this = _super.call(this, message) || this;\n        _this.scope = {};\n        _this.scope = scope;\n        Object.setPrototypeOf(_this, PassageMetadataError.prototype);\n        return _this;\n    }\n    PassageMetadataError.fromPreviousError = function (previousError, scope) {\n        if (scope === void 0) { scope = {}; }\n        var error = new PassageMetadataError(previousError.message);\n        error.stack = previousError.stack;\n        error.scope = __assign(__assign({}, scope), (previousError instanceof PassageMetadataError) ? previousError.scope : {});\n        return error;\n    };\n    return PassageMetadataError;\n}(Error));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PassageMetadataError);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/PassageMetadata/error/PassageMetadataError.ts?");

/***/ }),

/***/ "./src/PassageMetadata/model/PassageMetadata.ts":
/*!******************************************************!*\
  !*** ./src/PassageMetadata/model/PassageMetadata.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar PassageMetadata = /** @class */ (function () {\n    function PassageMetadata(name, metadata) {\n        this.name = name;\n        this.metadata = metadata;\n    }\n    return PassageMetadata;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PassageMetadata);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/PassageMetadata/model/PassageMetadata.ts?");

/***/ }),

/***/ "./src/PassageMetadataApp.ts":
/*!***********************************!*\
  !*** ./src/PassageMetadataApp.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _PassageMetadata_PassageMetadataApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PassageMetadata/PassageMetadataApp */ \"./src/PassageMetadata/PassageMetadataApp.ts\");\n/* harmony import */ var _PassageMetadataCollection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PassageMetadataCollection */ \"./src/PassageMetadataCollection.ts\");\n/* harmony import */ var _factory_PassageMetadataFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factory/PassageMetadataFactory */ \"./src/factory/PassageMetadataFactory.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\n\nvar PassageMetadataApp = /** @class */ (function (_super) {\n    __extends(PassageMetadataApp, _super);\n    function PassageMetadataApp(tagsManager, limitationStrategyFactory, sugarcubeFacade, passageMetadataRegex, mode, // all\n    modeParams) {\n        if (passageMetadataRegex === void 0) { passageMetadataRegex = /<<PassageMetadata>>(.*)<<\\/PassageMetadata>>/gms; }\n        if (mode === void 0) { mode = 'byTag'; }\n        if (modeParams === void 0) { modeParams = { filterTag: 'passage_metadata' }; }\n        var _this = _super.call(this, sugarcubeFacade, passageMetadataRegex, mode, modeParams) || this;\n        _this.tagsManager = tagsManager;\n        _this.limitationStrategyFactory = limitationStrategyFactory;\n        return _this;\n    }\n    PassageMetadataApp.prototype.createPassageMetadataCollection = function () {\n        return new _PassageMetadataCollection__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.tagsManager);\n    };\n    PassageMetadataApp.prototype.createPassageMetadataFactory = function () {\n        return new _factory_PassageMetadataFactory__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.limitationStrategyFactory);\n    };\n    PassageMetadataApp.prototype.collect = function () {\n        _super.prototype.collect.call(this);\n        this.passageMetadataCollection.cleanUp();\n    };\n    return PassageMetadataApp;\n}(_PassageMetadata_PassageMetadataApp__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PassageMetadataApp);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/PassageMetadataApp.ts?");

/***/ }),

/***/ "./src/PassageMetadataCollection.ts":
/*!******************************************!*\
  !*** ./src/PassageMetadataCollection.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _PassageMetadata_PassageMetadataCollection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PassageMetadata/PassageMetadataCollection */ \"./src/PassageMetadata/PassageMetadataCollection.ts\");\n/* harmony import */ var _enum_GroupTypeEnum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enum/GroupTypeEnum */ \"./src/enum/GroupTypeEnum.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\n\n\nvar PassageMetadataCollection = /** @class */ (function (_super) {\n    __extends(PassageMetadataCollection, _super);\n    function PassageMetadataCollection(tagsManager) {\n        var _this = _super.call(this) || this;\n        _this.tagsManager = tagsManager;\n        _this.tagIndex = {};\n        _this.limitationStrategyTagIndex = {};\n        _this.groupIndex = {};\n        _this.validationGroup = {};\n        return _this;\n    }\n    PassageMetadataCollection.prototype.add = function (passageMetadata) {\n        var _this = this;\n        _super.prototype.add.call(this, passageMetadata);\n        // Build search indexes + validation\n        passageMetadata.groups.all().forEach(function (group) {\n            if (_this.validationGroup[group.name] === undefined) {\n                _this.validationGroup[group.name] = {\n                    type: group.type.toString(),\n                    indexes: [group.sequentialIndex],\n                };\n            }\n            else {\n                if (_this.validationGroup[group.name].type !== group.type) {\n                    throw new Error(\"Group type should be the same. Group name: \\\"\".concat(group.name, \"\\\". Passage name: \\\"\").concat(passageMetadata.name, \"\\\". Other passages: \\\"\").concat(_this.groupIndex[group.name].join(\", \"), \"\\\"\"));\n                }\n                if (group.type === _enum_GroupTypeEnum__WEBPACK_IMPORTED_MODULE_1__.GroupTypeEnum.Sequential) {\n                    if (_this.validationGroup[group.name].indexes.includes(group.sequentialIndex)) {\n                        throw new Error(\"Random event with sequentialIndex \".concat(group.sequentialIndex, \" should be unique (name: \").concat(passageMetadata.name, \" ,group: \\\"\").concat(group.name, \"\\\")\"));\n                    }\n                    _this.validationGroup[group.name].indexes.push(group.sequentialIndex);\n                }\n            }\n            if (_this.groupIndex[group.name] === undefined) {\n                _this.groupIndex[group.name] = [];\n            }\n            _this.groupIndex[group.name].push(passageMetadata.name);\n        });\n        var stringTags = __spreadArray([], passageMetadata.tags.stringTags, true);\n        stringTags.forEach(function (tag) {\n            if (_this.tagIndex[tag] === undefined) {\n                _this.tagIndex[tag] = [];\n            }\n            _this.tagIndex[tag].push(passageMetadata.name);\n        });\n        if (passageMetadata.limitationStrategy.length > 0 && passageMetadata.limitationStrategy.isTaged) {\n            passageMetadata.limitationStrategy.all().forEach(function (limitationStrategy) {\n                _this.tagsManager.prepareTags(limitationStrategy.tags).forEach(function (tag) {\n                    if (_this.limitationStrategyTagIndex[tag] === undefined) {\n                        _this.limitationStrategyTagIndex[tag] = {\n                            events: [],\n                            tagGroups: {},\n                        };\n                    }\n                    _this.limitationStrategyTagIndex[tag].events.push(passageMetadata.name);\n                    var limitationStrategyTags = __spreadArray([], _this.tagsManager.prepareTags(limitationStrategy.tags), true);\n                    if (limitationStrategy.isSeparate) {\n                        limitationStrategyTags.push(passageMetadata.name);\n                    }\n                    _this.limitationStrategyTagIndex[tag].tagGroups[_this.tagsManager.convertTagsToStringKey(limitationStrategyTags)] = limitationStrategyTags;\n                });\n            });\n        }\n    };\n    PassageMetadataCollection.prototype.get = function (name) {\n        return _super.prototype.get.call(this, name);\n    };\n    PassageMetadataCollection.prototype.find = function (name) {\n        return _super.prototype.find.call(this, name);\n    };\n    PassageMetadataCollection.prototype.cleanUp = function () {\n        this.validationGroup = {};\n    };\n    PassageMetadataCollection.prototype.enable = function (name) {\n        this.get(name).isEnabled = true;\n    };\n    PassageMetadataCollection.prototype.disable = function (name) {\n        this.get(name).isEnabled = false;\n    };\n    PassageMetadataCollection.prototype.getEventsNamesByTag = function (tag) {\n        if (this.tagIndex[tag] === undefined) {\n            return [];\n        }\n        return this.tagIndex[tag];\n    };\n    PassageMetadataCollection.prototype.getEventsNamesByLimitationStrategyTag = function (tag) {\n        if (this.limitationStrategyTagIndex[tag] === undefined) {\n            return [];\n        }\n        return this.limitationStrategyTagIndex[tag].events;\n    };\n    PassageMetadataCollection.prototype.getTagGroupsByLimitationStrategyTag = function (tag) {\n        if (this.limitationStrategyTagIndex[tag] === undefined) {\n            return [];\n        }\n        return Object.values(this.limitationStrategyTagIndex[tag].tagGroups);\n    };\n    PassageMetadataCollection.prototype.hasGroup = function (group) {\n        return this.groupIndex[group] !== undefined;\n    };\n    PassageMetadataCollection.prototype.getEventsNamesByGroup = function (group) {\n        var _a;\n        return (_a = this.groupIndex[group]) !== null && _a !== void 0 ? _a : [];\n    };\n    return PassageMetadataCollection;\n}(_PassageMetadata_PassageMetadataCollection__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PassageMetadataCollection);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/PassageMetadataCollection.ts?");

/***/ }),

/***/ "./src/RandomEventApp.ts":
/*!*******************************!*\
  !*** ./src/RandomEventApp.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/TypeChecker */ \"./src/tools/TypeChecker.ts\");\n/* harmony import */ var _History__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./History */ \"./src/History.ts\");\n/* harmony import */ var _Lock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Lock */ \"./src/Lock.ts\");\n/* harmony import */ var _StateLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StateLoader */ \"./src/StateLoader.ts\");\n/* harmony import */ var _DebugLogCollector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DebugLogCollector */ \"./src/DebugLogCollector.ts\");\n/* harmony import */ var _ConstraintsVerificator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ConstraintsVerificator */ \"./src/ConstraintsVerificator.ts\");\n/* harmony import */ var _enum_GroupTypeEnum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./enum/GroupTypeEnum */ \"./src/enum/GroupTypeEnum.ts\");\n/* harmony import */ var _PassageMetadataApp__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PassageMetadataApp */ \"./src/PassageMetadataApp.ts\");\n/* harmony import */ var _facade_SugarcubeFacade__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./facade/SugarcubeFacade */ \"./src/facade/SugarcubeFacade.ts\");\n/* harmony import */ var _TagsManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TagsManager */ \"./src/TagsManager.ts\");\n/* harmony import */ var _factory_LimitationStrategyFactory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./factory/LimitationStrategyFactory */ \"./src/factory/LimitationStrategyFactory.ts\");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\n\n\n\n\n\n\n\n\n\n\n\nvar RandomEventApp = /** @class */ (function () {\n    function RandomEventApp(passageMetadataRegex, passageMetadataMode, // all\n    passageMetadataModeParams, debugLevel) {\n        if (passageMetadataRegex === void 0) { passageMetadataRegex = /<<PassageMetadata>>(.*)<<\\/PassageMetadata>>/gms; }\n        if (passageMetadataMode === void 0) { passageMetadataMode = 'byTag'; }\n        if (passageMetadataModeParams === void 0) { passageMetadataModeParams = { filterTag: 'passage_metadata' }; }\n        if (debugLevel === void 0) { debugLevel = 0; }\n        var _this = this;\n        this.passageMetadataModeParams = passageMetadataModeParams;\n        this.acquireLock = function () { return _this.lock.acquire(); };\n        this.releaseLock = function () { return _this.lock.release(); };\n        this.forceAcquireLock = function () { return _this.lock.forceAcquire(); };\n        this.forceReleaseLock = function () { return _this.lock.forceRelease(); };\n        this.loadState = function (variables) { return _this.stateLoader.loadState(variables); };\n        this.setStateAsLoaded = function () { return _this.stateLoader.forceSetIsLoadedFlag(true); };\n        this.resetStateLoadedFlag = function () { return _this.stateLoader.resetIsLoadedFlag(); };\n        this.has = function (passageName) { return _this.passageMetadataCollection.has(passageName); };\n        this.find = function (passageName) { return _this.passageMetadataCollection.find(passageName); };\n        this.sugarcubeFacade = new _facade_SugarcubeFacade__WEBPACK_IMPORTED_MODULE_8__[\"default\"]();\n        this.tagsManager = new _TagsManager__WEBPACK_IMPORTED_MODULE_9__[\"default\"](this.sugarcubeFacade);\n        this.limitationStrategyFactory = new _factory_LimitationStrategyFactory__WEBPACK_IMPORTED_MODULE_10__[\"default\"](this.tagsManager);\n        this.passageMetadataApp = new _PassageMetadataApp__WEBPACK_IMPORTED_MODULE_7__[\"default\"](this.tagsManager, this.limitationStrategyFactory, this.sugarcubeFacade, passageMetadataRegex, passageMetadataMode, passageMetadataModeParams);\n        this.passageMetadataApp.init();\n        this.passageMetadataCollection = this.passageMetadataApp.passageMetadataCollection;\n        this.history = new _History__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.sugarcubeFacade);\n        this.stateLoader = new _StateLoader__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.passageMetadataApp.passageMetadataCollection, this.history);\n        this.lock = new _Lock__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n        this.debugLogCollector = new _DebugLogCollector__WEBPACK_IMPORTED_MODULE_4__[\"default\"](debugLevel);\n        this.constraintsVerificator = new _ConstraintsVerificator__WEBPACK_IMPORTED_MODULE_5__[\"default\"](this.sugarcubeFacade, this.tagsManager, this.history);\n    }\n    RandomEventApp.prototype.init = function () {\n        this.passageMetadataApp.collect();\n    };\n    Object.defineProperty(RandomEventApp.prototype, \"isLocked\", {\n        get: function () {\n            return this.lock.isLocked;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    ;\n    Object.defineProperty(RandomEventApp.prototype, \"isForceLocked\", {\n        get: function () {\n            return this.lock.isForce;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    ;\n    RandomEventApp.prototype.enable = function (passageName) {\n        if (!this.passageMetadataCollection.has(passageName)) {\n            if (!this.sugarcubeFacade.hasPassage(passageName)) {\n                throw new Error(\"passage \\\"\".concat(passageName, \"\\\" does not exist\"));\n            }\n            throw new Error(\"passage \\\"\".concat(passageName, \"\\\" exist but without tag \\\"\").concat(this.passageMetadataModeParams.filterTag, \"\\\"\"));\n        }\n        this.passageMetadataCollection.enable(passageName);\n        this.history.enable(passageName);\n    };\n    RandomEventApp.prototype.disable = function (passageName) {\n        if (!this.passageMetadataCollection.has(passageName)) {\n            if (!this.sugarcubeFacade.hasPassage(passageName)) {\n                throw new Error(\"passage \\\"\".concat(passageName, \"\\\" does not exist\"));\n            }\n            throw new Error(\"passage \\\"\".concat(passageName, \"\\\" exist but without tag \\\"\").concat(this.passageMetadataModeParams.filterTag, \"\\\"\"));\n        }\n        this.passageMetadataCollection.disable(passageName);\n        this.history.disable(passageName);\n    };\n    RandomEventApp.prototype.enableByTag = function (tag) {\n        var _this = this;\n        tag = tag.toLowerCase();\n        this.passageMetadataCollection.getEventsNamesByTag(tag).forEach(function (passageName) {\n            _this.passageMetadataCollection.enable(passageName);\n            _this.history.enable(passageName, false);\n        });\n        this.history.store();\n    };\n    RandomEventApp.prototype.disableByTag = function (tag) {\n        var _this = this;\n        tag = tag.toLowerCase();\n        this.passageMetadataCollection.getEventsNamesByTag(tag).forEach(function (passageName) {\n            _this.passageMetadataCollection.disable(passageName);\n            _this.history.disable(passageName, false);\n        });\n        this.history.store();\n    };\n    RandomEventApp.prototype.resetFiredCounterByRandomEvent = function (passageName) {\n        if (!this.passageMetadataCollection.has(passageName)) {\n            if (!this.sugarcubeFacade.hasPassage(passageName)) {\n                throw new Error(\"passage \\\"\".concat(passageName, \"\\\" does not exist\"));\n            }\n            throw new Error(\"passage \\\"\".concat(passageName, \"\\\" exist but without tag \\\"\").concat(this.passageMetadataModeParams.filterTag, \"\\\"\"));\n        }\n        this.history.resetRandomEventFiredCounter(passageName);\n    };\n    RandomEventApp.prototype.resetFiredCounterByTag = function (tag) {\n        var _this = this;\n        tag = tag.toLowerCase();\n        this.history.resetTagFiredCounter(tag, false);\n        this.passageMetadataCollection.getEventsNamesByTag(tag).forEach(function (passageName) {\n            _this.history.resetRandomEventFiredCounter(passageName, false);\n        });\n        this.passageMetadataCollection.getEventsNamesByLimitationStrategyTag(tag).forEach(function (passageName) {\n            _this.history.resetRandomEventFiredCounter(passageName, false);\n        });\n        this.passageMetadataCollection.getTagGroupsByLimitationStrategyTag(tag).forEach(function (tags) {\n            var tagsStringKey = _this.tagsManager.convertTagsToStringKey(tags);\n            _this.history.resetTagFiredCounter(tagsStringKey, false);\n        });\n        this.history.store();\n    };\n    RandomEventApp.prototype.runRandomEvent = function (passageName, rewriteConfiguration) {\n        this.debugLogCollector.clear();\n        rewriteConfiguration = __assign({\n            isValidateIsEnable: true,\n            isEnable: null,\n            isValidateFilter: true,\n            filter: null,\n            isValidateLimitationStrategy: true,\n            limitationStrategy: null,\n            isValidateThreshold: true,\n            threshold: null,\n        }, (rewriteConfiguration !== null && rewriteConfiguration !== void 0 ? rewriteConfiguration : {}));\n        if (!this.passageMetadataCollection.has(passageName)) {\n            if (!this.sugarcubeFacade.hasPassage(passageName)) {\n                throw new Error(\"passage \\\"\".concat(passageName, \"\\\" does not exist\"));\n            }\n            throw new Error(\"passage \\\"\".concat(passageName, \"\\\" exist but without tag \\\"\").concat(this.passageMetadataModeParams.filterTag, \"\\\"\"));\n        }\n        var passageMetadata = this.passageMetadataCollection.get(passageName);\n        this.debugLogCollector.addLog(null, \"Start random event \".concat(passageMetadata.name), 1);\n        this.debugLogCollector.increaseLevel();\n        var result = true;\n        if (this.lock.isLocked) {\n            result = false;\n            this.debugLogCollector.addLog(null, \"Skip because lock already acquired\", 1);\n            return {\n                isSuccess: result,\n                debugLogCollector: this.debugLogCollector,\n                passageMetadata: passageMetadata,\n                usedTags: []\n            };\n        }\n        try {\n            var compiledTags = this.tagsManager.prepareTags(passageMetadata.tags);\n            var checkResult = this.constraintsVerificator.verify(passageMetadata, rewriteConfiguration);\n            result = checkResult.result;\n            this.debugLogCollector\n                .addLog(null, \"Verify:\", 2)\n                .increaseLevel()\n                .merge(checkResult.debugLogCollector)\n                .decreaseLevel();\n            return {\n                isSuccess: result,\n                debugLogCollector: this.debugLogCollector,\n                passageMetadata: passageMetadata,\n                usedTags: passageMetadata.limitationStrategy.isTaged ? checkResult.additionalData.usedLimitationStrategyTags : [compiledTags]\n            };\n        }\n        catch (err) {\n            // TODO add data to error\n            throw err;\n        }\n    };\n    RandomEventApp.prototype.runGroup = function (groupName, groupThreshold, rewriteConfiguration) {\n        var _this = this;\n        groupName = groupName.toLowerCase();\n        this.debugLogCollector.clear();\n        rewriteConfiguration = __assign({\n            isValidateIsEnable: true,\n            isEnable: null,\n            isValidateFilter: true,\n            filter: null,\n            isValidateLimitationStrategy: true,\n            limitationStrategy: null,\n            isValidateThreshold: true,\n            threshold: null,\n        }, (rewriteConfiguration !== null && rewriteConfiguration !== void 0 ? rewriteConfiguration : {}));\n        if (!this.passageMetadataCollection.hasGroup(groupName)) {\n            throw new Error(\"group \\\"\".concat(groupName, \"\\\" does not exist\"));\n        }\n        this.debugLogCollector.addLog(null, \"Start group \".concat(groupName), 1);\n        this.debugLogCollector.increaseLevel();\n        var result = true;\n        if (this.lock.isLocked) {\n            result = false;\n            this.debugLogCollector.addLog(null, \"Skip because lock already acquired\", 1);\n            return {\n                isSuccess: result,\n                debugLogCollector: this.debugLogCollector,\n            };\n        }\n        if (_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isNumber(groupThreshold) || _tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isString(groupThreshold)) {\n            try {\n                var checkResult = this.constraintsVerificator.verifyThreshold(groupThreshold);\n                result = checkResult.result;\n                this.debugLogCollector\n                    .addLog(null, 'Verify group threshold', 2)\n                    .increaseLevel()\n                    .merge(checkResult.debugLogCollector)\n                    .decreaseLevel();\n            }\n            catch (err) {\n                // TODO add data to error\n                throw err;\n            }\n            if (result === false) {\n                return {\n                    isSuccess: result,\n                    debugLogCollector: this.debugLogCollector,\n                };\n            }\n            rewriteConfiguration.isValidateThreshold = false;\n        }\n        this.debugLogCollector\n            .increaseLevel()\n            .addLog(null, 'Verify random events in group', 1)\n            .increaseLevel();\n        var totalWeight = 0;\n        var sucessRandomEventsResults = [];\n        var passageNames = this.passageMetadataCollection.getEventsNamesByGroup(groupName);\n        for (var groupIndex = 0; groupIndex < passageNames.length; groupIndex++) {\n            var passageName = passageNames[groupIndex];\n            if (!this.passageMetadataCollection.has(passageName)) {\n                if (!this.sugarcubeFacade.hasPassage(passageName)) {\n                    throw new Error(\"passage \\\"\".concat(passageName, \"\\\" does not exist\"));\n                }\n                throw new Error(\"passage \\\"\".concat(passageName, \"\\\" exist but without tag \\\"\").concat(this.passageMetadataModeParams.filterTag, \"\\\"\"));\n            }\n            var passageMetadata = this.passageMetadataCollection.get(passageName);\n            var group = passageMetadata.groups.getByName(groupName);\n            if (group === null) {\n                throw new Error(\"Can't find group \\\"\".concat(groupName, \"\\\" in random event \").concat(passageMetadata.name));\n            }\n            this.debugLogCollector\n                .addLog(null, \"Random event \".concat(passageMetadata.name, \" with weight \").concat(group.weight), 1)\n                .increaseLevel();\n            try {\n                var compiledTags = this.tagsManager.prepareTags(passageMetadata.tags);\n                var checkResult = this.constraintsVerificator.verify(passageMetadata, rewriteConfiguration);\n                var result_1 = checkResult.result;\n                this.debugLogCollector\n                    .addLog(null, \"Verify\", 2)\n                    .increaseLevel()\n                    .merge(checkResult.debugLogCollector)\n                    .decreaseLevel();\n                if (result_1) {\n                    totalWeight += group.weight;\n                    sucessRandomEventsResults.push({\n                        isSuccess: result_1,\n                        passageMetadata: passageMetadata,\n                        usedTags: passageMetadata.limitationStrategy.isTaged ? checkResult.additionalData.usedLimitationStrategyTags : [compiledTags],\n                        group: group,\n                    });\n                }\n            }\n            catch (err) {\n                // TODO add data to error\n                throw err;\n            }\n            this.debugLogCollector.decreaseLevel();\n        }\n        if (sucessRandomEventsResults.length <= 0) {\n            result = false;\n            this.debugLogCollector.addLog(false, \"not found any suitable random events in group\", 2);\n            return {\n                isSuccess: result,\n                debugLogCollector: this.debugLogCollector,\n            };\n        }\n        var winnerRandomEventResult = null;\n        if (sucessRandomEventsResults[0].group.type === _enum_GroupTypeEnum__WEBPACK_IMPORTED_MODULE_6__.GroupTypeEnum.Sequential) {\n            this.debugLogCollector\n                .addLog(true, \"Find winner event\", 2)\n                .increaseLevel();\n            var sucessRandomEventsSequentialResults = sucessRandomEventsResults.filter(function (sucessRandomEventsResult) {\n                return _this.history.getHistoryFiredEventCount(sucessRandomEventsResult.passageMetadata.name) < sucessRandomEventsResult.group.sequentialCount;\n            });\n            this.debugLogCollector.addLog(true, \"sequential search found \".concat(sucessRandomEventsSequentialResults.length, \" siutable events\"), 3);\n            if (sucessRandomEventsSequentialResults.length > 0) {\n                winnerRandomEventResult = sucessRandomEventsSequentialResults.sort(function (a, b) {\n                    return a.group.sequentialIndex - b.group.sequentialIndex;\n                })[0];\n                this.debugLogCollector.addLog(true, \"winner random event: \".concat(winnerRandomEventResult.passageMetadata.name), 3);\n                return {\n                    isSuccess: result,\n                    debugLogCollector: this.debugLogCollector,\n                    passageMetadata: winnerRandomEventResult.passageMetadata,\n                    usedTags: winnerRandomEventResult.usedTags,\n                    group: winnerRandomEventResult.group,\n                };\n            }\n        }\n        var winnerWeight = Math.floor(Math.random() * totalWeight);\n        this.debugLogCollector.addLog(true, \"total weight: \".concat(totalWeight, \" | wittner weight: \").concat(winnerWeight), 3);\n        for (var i = 0; i < sucessRandomEventsResults.length; i++) {\n            winnerWeight -= sucessRandomEventsResults[i].group.weight;\n            if (winnerWeight <= 0) {\n                winnerRandomEventResult = sucessRandomEventsResults[i];\n                break;\n            }\n        }\n        this.debugLogCollector.addLog(true, \"winner random event: \".concat(winnerRandomEventResult.passageMetadata.name), 3);\n        return {\n            isSuccess: result,\n            debugLogCollector: this.debugLogCollector,\n            passageMetadata: winnerRandomEventResult.passageMetadata,\n            usedTags: winnerRandomEventResult.usedTags,\n            group: winnerRandomEventResult.group,\n        };\n    };\n    RandomEventApp.prototype.incrementCounters = function (passageMetadata, usedTags) {\n        var _this = this;\n        this.history.incrementRandomEventFiredCounter(passageMetadata.name, false);\n        usedTags.forEach(function (tags) {\n            _this.history.incrementTagsFiredCounter(__spreadArray(__spreadArray([], tags, true), [_this.tagsManager.convertTagsToStringKey(tags)], false), false);\n        });\n        this.history.store();\n        this.stateLoader.forceSetIsLoadedFlag(true);\n    };\n    return RandomEventApp;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RandomEventApp);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/RandomEventApp.ts?");

/***/ }),

/***/ "./src/StateLoader.ts":
/*!****************************!*\
  !*** ./src/StateLoader.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/TypeChecker */ \"./src/tools/TypeChecker.ts\");\n\nvar StateLoader = /** @class */ (function () {\n    function StateLoader(passageMetadataCollection, history) {\n        this.passageMetadataCollection = passageMetadataCollection;\n        this.history = history;\n        this.isLoaded = false;\n    }\n    StateLoader.prototype.forceSetIsLoadedFlag = function (isLoaded) {\n        this.isLoaded = isLoaded;\n    };\n    StateLoader.prototype.resetIsLoadedFlag = function () {\n        this.isLoaded = false;\n    };\n    StateLoader.prototype.loadState = function (variables) {\n        var _this = this;\n        if (!this.isLoaded) {\n            this.oldLoadState(variables);\n            if (!this.isLoaded) {\n                if (variables.randomEventHistory !== undefined) {\n                    this.history.loadFromSerilizedString(variables.randomEventHistory);\n                    Object.keys(this.history.forceEventStatus).forEach(function (passageName) {\n                        if (_this.history.forceEventStatus[passageName]) {\n                            _this.passageMetadataCollection.enable(passageName);\n                        }\n                        else {\n                            _this.passageMetadataCollection.disable(passageName);\n                        }\n                    });\n                    this.isLoaded = true;\n                }\n            }\n        }\n    };\n    /** @deprecated only for backward compatibility */\n    StateLoader.prototype.oldLoadState = function (variables) {\n        var _this = this;\n        if (!this.isLoaded) {\n            if (variables.randomEventFiredEvents !== undefined) {\n                var firedEvents_1 = JSON.parse(variables.randomEventFiredEvents);\n                Object.keys(firedEvents_1).forEach(function (firedEventsKey) {\n                    if (firedEventsKey !== \"\") {\n                        if (_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isInteger(firedEvents_1[firedEventsKey]) && firedEvents_1[firedEventsKey] > 0) {\n                            _this.history.setActualRandomEventFiredCounter(firedEventsKey.toLowerCase(), firedEvents_1[firedEventsKey]);\n                            _this.history.setHistoryRandomEventFiredCounter(firedEventsKey.toLowerCase(), firedEvents_1[firedEventsKey]);\n                        }\n                        else {\n                            _this.history.setHistoryRandomEventFiredCounter(firedEventsKey.toLowerCase(), 1);\n                        }\n                    }\n                });\n                delete variables.randomEventFiredEvents;\n                this.isLoaded = true;\n            }\n            if (variables.randomEventFiredTags !== undefined) {\n                var firedTags_1 = JSON.parse(variables.randomEventFiredTags);\n                Object.keys(firedTags_1).forEach(function (firedTagsKey) {\n                    if (firedTagsKey !== \"\") {\n                        if (_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isInteger(firedTags_1[firedTagsKey]) && firedTags_1[firedTagsKey] > 0) {\n                            _this.history.setActualTagFiredCounter(firedTagsKey.toLowerCase(), firedTags_1[firedTagsKey]);\n                            _this.history.setHistoryTagFiredCounter(firedTagsKey.toLowerCase(), firedTags_1[firedTagsKey]);\n                        }\n                        else {\n                            _this.history.setHistoryTagFiredCounter(firedTagsKey.toLowerCase(), 1);\n                        }\n                    }\n                });\n                delete variables.randomEventFiredTags;\n                this.isLoaded = true;\n            }\n            if (variables.randomEventEnabledEvents !== undefined) {\n                var enabledEvents = JSON.parse(variables.randomEventEnabledEvents);\n                if (_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isArray(enabledEvents)) {\n                    enabledEvents.forEach(function (eventName) {\n                        if (_this.passageMetadataCollection.has(eventName)) {\n                            _this.passageMetadataCollection.enable(eventName);\n                            _this.history.enable(eventName, false);\n                        }\n                    });\n                }\n                delete variables.randomEventEnabledEvents;\n                this.isLoaded = true;\n            }\n            if (variables.randomEventDisabledEvents !== undefined) {\n                var disabledEvents = JSON.parse(variables.randomEventDisabledEvents);\n                if (_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isArray(disabledEvents)) {\n                    disabledEvents.forEach(function (eventName) {\n                        if (_this.passageMetadataCollection.has(eventName)) {\n                            _this.passageMetadataCollection.disable(eventName);\n                            _this.history.disable(eventName, false);\n                        }\n                    });\n                }\n                delete variables.randomEventDisabledEvents;\n                this.isLoaded = true;\n            }\n            if (this.isLoaded) {\n                this.history.store();\n            }\n        }\n    };\n    return StateLoader;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StateLoader);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/StateLoader.ts?");

/***/ }),

/***/ "./src/Tags.ts":
/*!*********************!*\
  !*** ./src/Tags.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Tags = /** @class */ (function () {\n    function Tags(tags) {\n        var _this = this;\n        this.isHaveTweeScriptTags = false;\n        this.tags = [];\n        this.stringTags = [];\n        tags.forEach(function (tag) {\n            if (Tags.isHaveTweeScript(tag)) {\n                _this.tags.push({\n                    isHaveTweeScript: true,\n                    tag: tag,\n                });\n                _this.isHaveTweeScriptTags = true;\n            }\n            else {\n                tag = tag.toLowerCase().trim().replace(' ', '__');\n                _this.tags.push({\n                    isHaveTweeScript: false,\n                    tag: tag,\n                });\n                _this.stringTags.push(tag);\n            }\n        });\n        this.stringTags.sort();\n        if (!this.isHaveTweeScriptTags) {\n            this.tags = null;\n        }\n    }\n    Tags.isHaveTweeScript = function (tag) {\n        return !(/^\\w+[\\w_\\- ]+$/.test(tag));\n    };\n    Tags.createFromTagsDefinition = function (tagsDefinition) {\n        if (tagsDefinition === undefined) {\n            return new Tags([]);\n        }\n        else {\n            if (!Array.isArray(tagsDefinition)) {\n                throw new Error(\"\\\"definition.tags\\\" should be array\");\n            }\n            return new Tags(tagsDefinition.map(function (tag) {\n                if (typeof tag !== 'string') {\n                    throw new Error(\"\\\"definition.tags[...]\\\" should be string\");\n                }\n                return tag;\n            }));\n        }\n    };\n    Object.defineProperty(Tags.prototype, \"length\", {\n        get: function () {\n            if (!this.isHaveTweeScriptTags) {\n                return this.stringTags.length;\n            }\n            else {\n                return this.tags.length;\n            }\n        },\n        enumerable: false,\n        configurable: true\n    });\n    return Tags;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tags);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/Tags.ts?");

/***/ }),

/***/ "./src/TagsManager.ts":
/*!****************************!*\
  !*** ./src/TagsManager.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tags */ \"./src/Tags.ts\");\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\n\nvar TagsManager = /** @class */ (function () {\n    function TagsManager(sugarcubeFacade) {\n        this.sugarcubeFacade = sugarcubeFacade;\n    }\n    TagsManager.isTagHaveTweeScript = function (tag) {\n        return !(/^\\w+[\\w_\\- ]+$/.test(tag));\n    };\n    TagsManager.prototype.prepareTags = function (tags) {\n        var _this = this;\n        if (tags instanceof _Tags__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n            if (tags.isHaveTweeScriptTags) {\n                return tags.tags.map(function (tag) {\n                    if (!tag.isHaveTweeScript) {\n                        return tag.tag;\n                    }\n                    else {\n                        try {\n                            return _this.sugarcubeFacade.runTeweeScript(tag.tag).toLowerCase().trim().replace(' ', '__');\n                        }\n                        catch (err) {\n                            throw new Error(\"Invalid random event scripted tag: \" + tag.tag);\n                        }\n                    }\n                }).sort();\n            }\n            else {\n                return __spreadArray([], tags.stringTags, true).sort();\n            }\n        }\n        else {\n            return tags.map(function (tag) {\n                if (!TagsManager.isTagHaveTweeScript(tag)) {\n                    return tag;\n                }\n                else {\n                    try {\n                        return _this.sugarcubeFacade.runTeweeScript(tag).toLowerCase().trim().replace(' ', '__');\n                    }\n                    catch (err) {\n                        throw new Error(\"Invalid random event scripted tag: \" + tag);\n                    }\n                }\n            }).sort();\n        }\n    };\n    TagsManager.prototype.convertTagsToStringKey = function (tags) {\n        return this.prepareTags(tags).join('_');\n    };\n    return TagsManager;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TagsManager);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/TagsManager.ts?");

/***/ }),

/***/ "./src/enum/GroupTypeEnum.ts":
/*!***********************************!*\
  !*** ./src/enum/GroupTypeEnum.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GroupTypeEnum: () => (/* binding */ GroupTypeEnum)\n/* harmony export */ });\nvar GroupTypeEnum;\n(function (GroupTypeEnum) {\n    GroupTypeEnum[\"Random\"] = \"random\";\n    GroupTypeEnum[\"Sequential\"] = \"sequential\";\n})(GroupTypeEnum || (GroupTypeEnum = {}));\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/enum/GroupTypeEnum.ts?");

/***/ }),

/***/ "./src/facade/SugarcubeFacade.ts":
/*!***************************************!*\
  !*** ./src/facade/SugarcubeFacade.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// TODO: Add specific errors\nvar SugarcubeFacade = /** @class */ (function () {\n    function SugarcubeFacade() {\n    }\n    SugarcubeFacade.prototype.getAllPassages = function () {\n        return Story.lookup();\n    };\n    SugarcubeFacade.prototype.runTeweeScript = function (expression) {\n        // TODO: cache result decorator\n        return Scripting.evalJavaScript(Scripting.parse(expression));\n    };\n    SugarcubeFacade.prototype.hasPassage = function (passageName) {\n        return Story.has(passageName);\n    };\n    SugarcubeFacade.prototype.saveVariable = function (name, value) {\n        State.variables[name] = value;\n    };\n    return SugarcubeFacade;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SugarcubeFacade);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/facade/SugarcubeFacade.ts?");

/***/ }),

/***/ "./src/factory/LimitationStrategyFactory.ts":
/*!**************************************************!*\
  !*** ./src/factory/LimitationStrategyFactory.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tools/TypeChecker */ \"./src/tools/TypeChecker.ts\");\n/* harmony import */ var _model_LimitationStrategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../model/LimitationStrategy */ \"./src/model/LimitationStrategy.ts\");\n/* harmony import */ var _model_LimitationStrategyList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/LimitationStrategyList */ \"./src/model/LimitationStrategyList.ts\");\n/* harmony import */ var _Tags__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Tags */ \"./src/Tags.ts\");\n\n\n\n\nvar LimitationStrategyFactory = /** @class */ (function () {\n    function LimitationStrategyFactory(tagsManager) {\n        this.tagsManager = tagsManager;\n    }\n    LimitationStrategyFactory.prototype.createLimitationStrategyListFromPassageMetadata = function (limitationStrategyPassageMetadata) {\n        var _this = this;\n        if (limitationStrategyPassageMetadata === undefined) {\n            return new _model_LimitationStrategyList__WEBPACK_IMPORTED_MODULE_2__[\"default\"]([]);\n        }\n        else {\n            if (!_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isArray(limitationStrategyPassageMetadata)) {\n                throw new Error(\"\\\"passageMetadata.limitationStrategy\\\" should be array\");\n            }\n            var limitationStrategyList = new _model_LimitationStrategyList__WEBPACK_IMPORTED_MODULE_2__[\"default\"](limitationStrategyPassageMetadata.map(function (limitationStrategyPassageMetadataItem) {\n                return _this.createLimitationStrategyFromPassageMetadata(limitationStrategyPassageMetadataItem);\n            }));\n            var tagsValidation_1 = {};\n            limitationStrategyList.all().forEach(function (limitationStrategy) {\n                var tagsStringKey = _this.tagsManager.convertTagsToStringKey(limitationStrategy.tags);\n                if (tagsValidation_1[tagsStringKey] !== undefined) {\n                    throw new Error(\"\\\"passageMetadata.limitationStrategy\\\" should containg uniq tag sets (tags: \\\"\".concat(limitationStrategy.tags.tags.map(function (tag) { return tag.tag; }).join('\", \"'), \"\\\")\"));\n                }\n                tagsValidation_1[tagsStringKey] = true;\n            });\n            return limitationStrategyList;\n        }\n    };\n    LimitationStrategyFactory.prototype.createLimitationStrategyFromPassageMetadata = function (limitationStrategyPassageMetadata) {\n        var _a;\n        if (!_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isInteger(limitationStrategyPassageMetadata.max)) {\n            throw new Error(\"\\\"passageMetadata.limitationStrategy[...].max\\\" should be integer\");\n        }\n        if (limitationStrategyPassageMetadata.max < 0) {\n            throw new Error(\"\\\"passageMetadata.limitationStrategy[...].max\\\" should equal or greater than 0\");\n        }\n        if (limitationStrategyPassageMetadata.isSeparate !== undefined && !_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isBoolean(limitationStrategyPassageMetadata.isSeparate)) {\n            throw new Error(\"\\\"passageMetadata.limitationStrategy[...].isSeparate\\\" should be boolean\");\n        }\n        return new _model_LimitationStrategy__WEBPACK_IMPORTED_MODULE_1__[\"default\"](limitationStrategyPassageMetadata.max, (_a = limitationStrategyPassageMetadata.isSeparate) !== null && _a !== void 0 ? _a : false, _Tags__WEBPACK_IMPORTED_MODULE_3__[\"default\"].createFromTagsDefinition(limitationStrategyPassageMetadata.tags));\n    };\n    return LimitationStrategyFactory;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LimitationStrategyFactory);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/factory/LimitationStrategyFactory.ts?");

/***/ }),

/***/ "./src/factory/PassageMetadataFactory.ts":
/*!***********************************************!*\
  !*** ./src/factory/PassageMetadataFactory.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _GroupList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GroupList */ \"./src/GroupList.ts\");\n/* harmony import */ var _PassageMetadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../PassageMetadata */ \"./src/PassageMetadata.ts\");\n/* harmony import */ var _PassageMetadata_PassageMetadataFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../PassageMetadata/PassageMetadataFactory */ \"./src/PassageMetadata/PassageMetadataFactory.ts\");\n/* harmony import */ var _Tags__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Tags */ \"./src/Tags.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\n\n\nvar PassageMetadataFactory = /** @class */ (function (_super) {\n    __extends(PassageMetadataFactory, _super);\n    function PassageMetadataFactory(limitationStrategyFactory) {\n        var _this = _super.call(this) || this;\n        _this.limitationStrategyFactory = limitationStrategyFactory;\n        return _this;\n    }\n    PassageMetadataFactory.prototype.create = function (passageMetadataObject) {\n        if (typeof passageMetadataObject.name !== 'string') {\n            throw new Error(\"\\\"PassageMetadata.name\\\" should be string\");\n        }\n        if (passageMetadataObject.isEnabled === undefined) {\n            passageMetadataObject.isEnabled = true;\n        }\n        else {\n            if (typeof passageMetadataObject.isEnabled !== 'boolean') {\n                throw new Error(\"\\\"definition.isEnabled\\\" should be boolean (name: \".concat(passageMetadataObject.name, \")\"));\n            }\n        }\n        try {\n            passageMetadataObject.groups = _GroupList__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createFromGroupsPassageMetadata(passageMetadataObject.groups);\n        }\n        catch (e) {\n            e.message = \"\".concat(e.message, \" (name: \").concat(passageMetadataObject.name, \")\");\n            throw e;\n        }\n        if (passageMetadataObject.filter === undefined) {\n            passageMetadataObject.filter = null;\n        }\n        else {\n            if (passageMetadataObject.filter !== null && typeof passageMetadataObject.filter !== 'string') {\n                throw new Error(\"\\\"definition.filter\\\" should be string or null (name: \".concat(passageMetadataObject.name, \")\"));\n            }\n        }\n        if (passageMetadataObject.type === undefined) {\n            passageMetadataObject.type = 'embedded';\n        }\n        else {\n            if (passageMetadataObject.type !== 'embedded' && passageMetadataObject.type !== 'goto') {\n                throw new Error(\"\\\"definition.type\\\" should be \\\"embedded\\\" or \\\"goto\\\" (name: \".concat(passageMetadataObject.name, \")\"));\n            }\n        }\n        if (passageMetadataObject.threshold === undefined) {\n            passageMetadataObject.threshold = 100;\n        }\n        else {\n            if (typeof passageMetadataObject.threshold === 'number') {\n                if (passageMetadataObject.threshold < 0) {\n                    throw new Error(\"\\\"definition.threshold\\\" should be >= than 0 (name: \".concat(passageMetadataObject.name, \")\"));\n                }\n                if (passageMetadataObject.threshold > 100) {\n                    throw new Error(\"\\\"definition.threshold\\\" should be <= than 100 (name: \".concat(passageMetadataObject.name, \")\"));\n                }\n            }\n        }\n        try {\n            passageMetadataObject.tags = _Tags__WEBPACK_IMPORTED_MODULE_3__[\"default\"].createFromTagsDefinition(passageMetadataObject.tags);\n        }\n        catch (e) {\n            e.message = \"\".concat(e.message, \" (name: \").concat(passageMetadataObject.name, \")\");\n            throw e;\n        }\n        try {\n            passageMetadataObject.limitationStrategy = this.limitationStrategyFactory.createLimitationStrategyListFromPassageMetadata(passageMetadataObject.limitationStrategy);\n        }\n        catch (e) {\n            e.message = \"\".concat(e.message, \" (name: \").concat(passageMetadataObject.name, \")\");\n            throw e;\n        }\n        return new _PassageMetadata__WEBPACK_IMPORTED_MODULE_1__[\"default\"](passageMetadataObject.name, passageMetadataObject, passageMetadataObject.isEnabled, passageMetadataObject.groups, passageMetadataObject.filter, passageMetadataObject.type, passageMetadataObject.threshold, passageMetadataObject.tags, passageMetadataObject.limitationStrategy);\n    };\n    return PassageMetadataFactory;\n}(_PassageMetadata_PassageMetadataFactory__WEBPACK_IMPORTED_MODULE_2__[\"default\"]));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PassageMetadataFactory);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/factory/PassageMetadataFactory.ts?");

/***/ }),

/***/ "./src/model/LimitationStrategy.ts":
/*!*****************************************!*\
  !*** ./src/model/LimitationStrategy.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar LimitationStrategy = /** @class */ (function () {\n    function LimitationStrategy(max, isSeparate, tags) {\n        this.max = max;\n        this.isSeparate = isSeparate;\n        this.tags = tags;\n        if (tags.isHaveTweeScriptTags) {\n            throw new Error(\"\\\"definition.limitationStrategy[...].tags\\\" should be string\");\n        }\n    }\n    return LimitationStrategy;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LimitationStrategy);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/model/LimitationStrategy.ts?");

/***/ }),

/***/ "./src/model/LimitationStrategyList.ts":
/*!*********************************************!*\
  !*** ./src/model/LimitationStrategyList.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar LimitationStrategyList = /** @class */ (function () {\n    function LimitationStrategyList(limitationStrategies) {\n        var _this = this;\n        this.limitationStrategies = limitationStrategies;\n        this.isTaged = false;\n        this.limitationStrategies.forEach(function (limitationStrategy) {\n            if (!_this.isTaged && limitationStrategy.tags.length > 0) {\n                _this.isTaged = true;\n            }\n        });\n    }\n    Object.defineProperty(LimitationStrategyList.prototype, \"length\", {\n        get: function () {\n            return this.limitationStrategies.length;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    LimitationStrategyList.prototype.all = function () {\n        return this.limitationStrategies;\n    };\n    return LimitationStrategyList;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LimitationStrategyList);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/model/LimitationStrategyList.ts?");

/***/ }),

/***/ "./src/tools/TypeChecker.ts":
/*!**********************************!*\
  !*** ./src/tools/TypeChecker.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar TypeChecker = /** @class */ (function () {\n    function TypeChecker() {\n    }\n    TypeChecker.isString = function (variable) {\n        return typeof variable === 'string' || variable instanceof String;\n    };\n    TypeChecker.isBoolean = function (variable) {\n        return typeof variable == \"boolean\" || variable instanceof Boolean;\n    };\n    TypeChecker.isArray = function (variable) {\n        return Object.prototype.toString.call(variable) === '[object Array]';\n    };\n    TypeChecker.isInteger = function (variable) {\n        return TypeChecker.isNumber(variable) && variable % 1 === 0;\n    };\n    TypeChecker.isFloat = function (variable) {\n        return TypeChecker.isNumber(variable) && variable % 1 !== 0;\n    };\n    TypeChecker.isNumber = function (variable) {\n        return typeof variable === 'number' && !isNaN(variable);\n    };\n    TypeChecker.isStringInteger = function (variable) {\n        return TypeChecker.isString(variable) && !isNaN(variable) && TypeChecker.isInteger(parseFloat(variable));\n    };\n    TypeChecker.isStringFloat = function (variable) {\n        return TypeChecker.isString(variable) && !isNaN(variable) && TypeChecker.isFloat(parseFloat(variable));\n    };\n    TypeChecker.isStringNumber = function (variable) {\n        return TypeChecker.isString(variable) && !isNaN(variable) && TypeChecker.isNumber(parseFloat(variable));\n    };\n    TypeChecker.isObject = function (variable) {\n        return typeof variable === 'object' && !Array.isArray(variable) && variable !== null;\n    };\n    return TypeChecker;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TypeChecker);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/tools/TypeChecker.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/RandomEventApp.ts");
/******/ 	RandomEventAppExport = __webpack_exports__;
/******/ 	
/******/ })()
;

    var RandomEventApp = RandomEventAppExport.default;

    ////////////////////////////////
    // Initialize random event block
    ////////////////////////////////

    var re = new RandomEventApp(
        /<<PassageMetadata>>(.*)<<\/PassageMetadata>>/gms,
        'byTag',
        { filterTag: 'passage_metadata' },
        3, // max debug level
    );
    re.init();

    // TODO start: If somebody knows how to rewrite these more beautifully/correctly, please let me know :)
    $(document).on(':passageend', function() {
        re.releaseLock();
    });

    Engine = new Proxy(Engine, {
        get: function(target, prop) {
            if (prop === 'backward' || prop === 'forward') {
                jQuery.event.trigger({
                    type: ':called_' + prop,
                });
            }

            return target[prop];
        }
    });

    $(document).on(':called_backward', function() {
        re.resetStateLoadedFlag();
    });
    $(document).on(':called_forward', function() {
        re.resetStateLoadedFlag();
    });

    Config.navigation.override = (destinationPassage) => {
        if (re.isLocked && !re.has(destinationPassage)) {
            // if random event fired in <<button>> or <<link>>, return previous passage to normal history forward work
            return passage();
        }

        return destinationPassage;
    };

    Save.onLoad.add((save) => {
        if (save.state.history.length > 0) {
            var historyVariables = save.state.history[save.state.history.length-1].variables;

            re.loadState(historyVariables);
        }
        re.setStateAsLoaded();
    });
    // TODO end

    ///////////////////////////
    // Macros declaration block
    ///////////////////////////

    Macro.add('REEnable', {
        handler: function() {
            if (this.args.length === 0) {
				return this.error('No random event passage name specified');
			}

            var randomEventPassageName;
			if (typeof this.args[0] === 'object') {
				randomEventPassageName = this.args[0].link;
			} else {
				randomEventPassageName = this.args[0];
			}

            try {
                re.loadState(State.variables);
                re.enable(randomEventPassageName);
            } catch (err) {
                this.error(err.message);
            }
        },
    });

    // TODO: Currently work only with 1 tag, will add possibility to pass multiply tags later
    Macro.add('REEnableByTag', {
        handler: function() {
            if (this.args.length !== 1) {
				return this.error('Need to pass just 1 tag');
			}

            if (typeof this.args[0] !== 'string') {
                return this.error('Random event tag should be a string value');
            }

            try {
                re.loadState(State.variables);
                re.enableByTag(this.args[0]);
            } catch(err) {
                this.error(err.message);
            }
        },
    });

    Macro.add('REDisable', {
        handler: function() {
            if (this.args.length === 0) {
				return this.error('No random event passage name specified');
			}

            var randomEventPassageName;
			if (typeof this.args[0] === 'object') {
				randomEventPassageName = this.args[0].link;
			} else {
				randomEventPassageName = this.args[0];
			}

            try {
                re.loadState(State.variables);
                re.disable(randomEventPassageName);
            } catch (err) {
                this.error(err.message);
            }
        },
    });

    // TODO: Currently work only with 1 tag, will add possibility to pass multiply tags later
    Macro.add('REDisableByTag', {
        handler: function() {
            if (this.args.length !== 1) {
				return this.error('Need to pass just 1 tag');
			}

            if (typeof this.args[0] !== 'string') {
                return this.error('Random event tag should be a string value');
            }

            try {
                re.loadState(State.variables);
                re.disableByTag(this.args[0]);
            } catch(err) {
                this.error(err.message);
            }
        },
    });

    Macro.add('REReset', {
        handler: function() {
            if (this.args.length === 0) {
				return this.error('No random event passage name specified');
			}

            var randomEventPassageName;
			if (typeof this.args[0] === 'object') {
				randomEventPassageName = this.args[0].link;
			} else {
				randomEventPassageName = this.args[0];
			}

            try {
                re.loadState(State.variables);
                re.resetFiredCounterByRandomEvent(randomEventPassageName);
            } catch (err) {
                this.error(err.message);
            }
        },
    });

    // TODO: Currently work only with 1 tag, will add possibility to pass multiply tags later
    Macro.add('REResetByTag', {
        handler: function() {
            if (this.args.length !== 1) {
				return this.error('Need to pass just 1 tag');
			}

            if (typeof this.args[0] !== 'string') {
                return this.error('Random event tag should be a string value');
            }

            try {
                re.loadState(State.variables);
                re.resetFiredCounterByTag(this.args[0]);
            } catch (err) {
                this.error(err.message);
            }
        },
    });

    Macro.add('RE', {
        handler: function() {
            debugger;
            if (this.args.length === 0) {
				return this.error('No random event passage name specified');
			}

            var randomEventPassageName;
			if (typeof this.args[0] === 'object') {
				randomEventPassageName = this.args[0].link;
			} else {
				randomEventPassageName = this.args[0];
			}

            try {
                // TODO: maybe need to add more rewrite widget arguments
                var result = re.runRandomEvent(randomEventPassageName, {
                    threshold: this.args[1]
                });
            } catch (err) {
                this.error(err.message);
            }

            if (Config.debug) {
                var debugLog = 'RE "' + result.passageMetadata.name + '"';
                if (result.debugLogCollector.debugLevel > 0) {
                    debugLog = result.debugLogCollector.toString();
                }
                this.debugView.name = 'RE "' + result.passageMetadata.name + '"';
                this.debugView.title = debugLog;
                this.debugView.modes({
                    nonvoid: true,
                    hidden: false,
                    invalid: !result.isSuccess
                });

                if (result.debugLogCollector.debugLevel > 0) {
                    console.log(debugLog);
                }
            }

            if (result.isSuccess) {
                re.incrementCounters(result.passageMetadata, result.usedTags);

                if (result.passageMetadata.type === 'embedded') {
                    var $el = jQuery(this.output);
                    $el.wiki(Story.get(result.passageMetadata.name).processText());
                } else {
                    re.acquireLock();
                    setTimeout(function() { Engine.play(result.passageMetadata.name, true), Engine.minDomActionDelay });
                }
            }
        },
    });

    Macro.add('REGroup', {
        handler: function() {
            if (typeof this.args[0] !== 'string') {
                return this.error('Random event group name should be a string value');
            }
            var groupName = this.args[0].toLowerCase();

            try {
                // TODO: maybe need to add more rewrite widget arguments
                var result = re.runGroup(groupName, this.args[1]);
            } catch (err) {
                this.error(err.message);
            }

            if (Config.debug) {
                var debugLog = 'REGroup "' + groupName + '"';
                if (result.debugLogCollector.debugLevel > 0) {
                    debugLog = result.debugLogCollector.toString();
                }
                this.debugView.name = 'REGroup "' + groupName + '"';
                this.debugView.title = debugLog;
                this.debugView.modes({
                    nonvoid: true,
                    hidden: false,
                    invalid: !result.isSuccess
                });

                if (result.debugLogCollector.debugLevel > 0) {
                    console.log(debugLog);
                }
            }

            if (result.isSuccess) {
                re.incrementCounters(result.passageMetadata, result.usedTags);

                if (result.passageMetadata.type === 'embedded') {
                    var $el = jQuery(this.output);
                    $el.wiki(Story.get(result.passageMetadata.name).processText());
                } else {
                    re.acquireLock();
                    setTimeout(function() { Engine.play(result.passageMetadata.name, true), Engine.minDomActionDelay });
                }
            }
        },
    });

    ///////////////////////
    // Public methods block
    ///////////////////////

    window.isHasRE = (passageName = '') => {
        return re.has(passageName);
    }

    window.isPassageRE = function() {
        return re.has(passage());
    }

    window.isPreviousRE = function() {
        return randomEventCollection.has(previous());
    }

    window.isREFired = (passageName = '', isUseHistory = true) => {
        if (isUseHistory) {
            return re.history.getHistoryFiredEventCount(passageName) > 0;
        }

        return re.history.getActualFiredEventCount(passageName) > 0;
    }

    window.isRETagFired = (tag = '', isUseHistory = true) => {
        if (isUseHistory) {
            return re.history.getHistoryFiredTagCount(tag) > 0;
        }

        return re.history.getActualFiredTagCount(tag) > 0;
    }
}());
