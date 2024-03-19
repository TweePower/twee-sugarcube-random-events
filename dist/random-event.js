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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tags */ \"./src/Tags.ts\");\n/* harmony import */ var _DebugLogCollector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DebugLogCollector */ \"./src/DebugLogCollector.ts\");\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\n\n\nvar ConstraintsVerificator = /** @class */ (function () {\n    function ConstraintsVerificator(randomEventHistory) {\n        this.randomEventHistory = randomEventHistory;\n    }\n    ConstraintsVerificator.prototype.verify = function (randomEvent, rewriteConfiguration) {\n        var _a, _b, _c, _d;\n        var result = true;\n        var usedLimitationStrategyTags = [];\n        var debugLogCollector = new _DebugLogCollector__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        var compiledTags = randomEvent.tags.getCompiledTags();\n        if (rewriteConfiguration.isValidateIsEnable === true) {\n            var checkResult = this.verifyIsEnable((_a = rewriteConfiguration.isEnable) !== null && _a !== void 0 ? _a : randomEvent.isEnabled);\n            result = checkResult.result;\n            debugLogCollector\n                .addLog(checkResult.result, \"verify IsEnable using: \".concat(rewriteConfiguration.isEnable ? 'rewrite configuration' : 'definition configuration'), 2).increaseLevel()\n                .merge(checkResult.debugLogCollector)\n                .decreaseLevel();\n        }\n        else {\n            debugLogCollector.addLog(true, 'skip IsEnable verify', 2);\n        }\n        if (result) {\n            if (rewriteConfiguration.isValidateFilter === true) {\n                var checkResult = this.verifyFilter((_b = rewriteConfiguration.filter) !== null && _b !== void 0 ? _b : randomEvent.filter);\n                result = checkResult.result;\n                debugLogCollector\n                    .addLog(checkResult.result, \"verify filter using: \".concat(rewriteConfiguration.filter ? 'rewrite configuration' : 'definition configuration'), 2).increaseLevel()\n                    .merge(checkResult.debugLogCollector)\n                    .decreaseLevel();\n            }\n            else {\n                debugLogCollector.addLog(true, 'skip filter verify', 2);\n            }\n        }\n        if (result) {\n            if (rewriteConfiguration.isValidateLimitationStrategy) {\n                var checkResult = this.verifyLimitationStrategy(compiledTags, (_c = rewriteConfiguration.limitationStrategy) !== null && _c !== void 0 ? _c : randomEvent.limitationStrategy, randomEvent.name);\n                result = checkResult.result;\n                debugLogCollector\n                    .addLog(checkResult.result, \"verify limitationStrategy using: \".concat(rewriteConfiguration.limitationStrategy ? 'rewrite configuration' : 'definition configuration'), 2).increaseLevel()\n                    .merge(checkResult.debugLogCollector)\n                    .decreaseLevel();\n                usedLimitationStrategyTags = checkResult.additionalData.usedLimitationStrategyTags;\n            }\n            else {\n                debugLogCollector.addLog(true, 'skip limitationStrategy verify', 2);\n            }\n        }\n        if (result) {\n            if (rewriteConfiguration.isValidateThreshold) {\n                var checkResult = this.verifyThreshold((_d = rewriteConfiguration.threshold) !== null && _d !== void 0 ? _d : randomEvent.threshold);\n                result = checkResult.result;\n                debugLogCollector\n                    .addLog(checkResult.result, \"verify threshold using: \".concat(rewriteConfiguration.threshold ? 'rewrite configuration' : 'definition configuration'), 2).increaseLevel()\n                    .merge(checkResult.debugLogCollector)\n                    .decreaseLevel();\n            }\n            else {\n                debugLogCollector.addLog(true, 'skip threshold verify', 2);\n            }\n        }\n        return {\n            result: result,\n            debugLogCollector: debugLogCollector,\n            additionalData: {\n                usedLimitationStrategyTags: usedLimitationStrategyTags\n            }\n        };\n    };\n    ConstraintsVerificator.prototype.verifyIsEnable = function (isEnabled) {\n        return {\n            result: isEnabled,\n            debugLogCollector: new _DebugLogCollector__WEBPACK_IMPORTED_MODULE_1__[\"default\"]().addLog(isEnabled, isEnabled ? 'event enabled' : 'event disabled', 3)\n        };\n    };\n    ConstraintsVerificator.prototype.verifyFilter = function (filter) {\n        var debugLogCollector = new _DebugLogCollector__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        if (filter !== null) {\n            try {\n                if (!Scripting.evalJavaScript(Scripting.parse(filter))) {\n                    debugLogCollector.addLog(false, 'filter expression returns false', 3);\n                    return { result: false, debugLogCollector: debugLogCollector };\n                }\n            }\n            catch (err) {\n                err.message = \"bad evaluation: \" + err.message;\n                throw err;\n            }\n        }\n        debugLogCollector.addLog(true, 'filter expression returns true', 3);\n        return { result: true, debugLogCollector: debugLogCollector };\n    };\n    ConstraintsVerificator.prototype.verifyLimitationStrategy = function (compiledTags, limitationStrategyList, passageName) {\n        var _this = this;\n        var debugLogCollector = new _DebugLogCollector__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        var usedLimitationStrategyTags = [];\n        var isSuccess = true;\n        if (limitationStrategyList.length > 0) {\n            if (limitationStrategyList.isTaged) {\n                limitationStrategyList.all().forEach(function (limitationStrategy) {\n                    // skip all next if already found limitation which is not passed\n                    if (isSuccess === false) {\n                        return;\n                    }\n                    // without limitation\n                    if (limitationStrategy.max <= 0) {\n                        debugLogCollector.addLog(true, 'limitationStrategy max value <= 0', 3);\n                        return;\n                    }\n                    if (limitationStrategy.tags.length > 0) {\n                        var limitationStrategyTags = __spreadArray([], limitationStrategy.tags.getCompiledTags(), true);\n                        // skip checking limitationStrategy when current compiled tags have not included `limitation.tags`\n                        for (var i = 0; i < limitationStrategyTags.length; i++) {\n                            if (!compiledTags.includes(limitationStrategyTags[i])) {\n                                debugLogCollector\n                                    .addLog(false, \"tag '\".concat(limitationStrategyTags[i], \"' not found in current tags\"), 3)\n                                    .increaseLevel()\n                                    .increaseLevel()\n                                    .addLog(null, \"current tags   : \".concat(compiledTags.join(', ')), 3)\n                                    .addLog(null, \"limitation tags: \".concat(limitationStrategyTags.join(', ')), 3)\n                                    .decreaseLevel()\n                                    .decreaseLevel();\n                                return;\n                            }\n                        }\n                        var fullLimitationStrategyTags = __spreadArray(__spreadArray([], limitationStrategyTags, true), (limitationStrategy.isSeparate ? [passageName] : []), true);\n                        var fullLimitationStrategyTagsKey = (new _Tags__WEBPACK_IMPORTED_MODULE_0__[\"default\"](fullLimitationStrategyTags)).toStringKey();\n                        var actualFiredTagCount = _this.randomEventHistory.getActualFiredTagCount(fullLimitationStrategyTagsKey);\n                        if (actualFiredTagCount >= limitationStrategy.max) {\n                            isSuccess = false;\n                            debugLogCollector.addLog(false, \"limitationStrategy with tags ['\".concat(limitationStrategyTags.join(', '), \"'] have max value \").concat(limitationStrategy.max, \" but already fired \").concat(actualFiredTagCount, \" times\"), 3);\n                            return;\n                        }\n                        else {\n                            usedLimitationStrategyTags.push(fullLimitationStrategyTags);\n                            debugLogCollector.addLog(true, \"limitationStrategy with tags ['\".concat(limitationStrategyTags.join(', '), \"'] have max value \").concat(limitationStrategy.max, \" and already fired \").concat(actualFiredTagCount, \" times\"), 3);\n                        }\n                    }\n                    else {\n                        var actualFiredEventCount = _this.randomEventHistory.getActualFiredEventCount(passageName);\n                        if (actualFiredEventCount >= limitationStrategy.max) {\n                            isSuccess = false;\n                            debugLogCollector.addLog(false, \"limitationStrategy without tags have max value \".concat(limitationStrategy.max, \" but already fired \").concat(actualFiredEventCount, \" times\"), 3);\n                            return;\n                        }\n                        else {\n                            debugLogCollector.addLog(true, \"limitationStrategy without tags have max value \".concat(limitationStrategy.max, \" and already fired \").concat(actualFiredEventCount, \" times\"), 3);\n                        }\n                    }\n                });\n                if (isSuccess && usedLimitationStrategyTags.length <= 0) {\n                    isSuccess = false;\n                    debugLogCollector.addLog(false, \"not found any limitationStrategy where current tags cover all limitationStrategy tags (current tags: \".concat(compiledTags.join(', ')), 3);\n                }\n            }\n            else {\n                limitationStrategyList.all().forEach(function (limitationStrategy) {\n                    // without limitation\n                    if (limitationStrategy.max <= 0) {\n                        debugLogCollector.addLog(true, 'limitationStrategy max value <= 0', 3);\n                        return;\n                    }\n                    var actualFiredEventCount = _this.randomEventHistory.getActualFiredEventCount(passageName);\n                    if (actualFiredEventCount >= limitationStrategy.max) {\n                        isSuccess = false;\n                        debugLogCollector.addLog(false, \"random event have max value \".concat(limitationStrategy.max, \" but already fired \").concat(actualFiredEventCount, \" times\"), 3);\n                        return;\n                    }\n                    else {\n                        debugLogCollector.addLog(true, \"random event have max value \".concat(limitationStrategy.max, \" and already fired \").concat(actualFiredEventCount, \" times\"), 3);\n                    }\n                });\n            }\n        }\n        return {\n            result: isSuccess,\n            debugLogCollector: debugLogCollector,\n            additionalData: { usedLimitationStrategyTags: usedLimitationStrategyTags }\n        };\n    };\n    ConstraintsVerificator.prototype.verifyThreshold = function (threshold) {\n        var debugLogCollector = new _DebugLogCollector__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        var thresholdResult = 0;\n        if (typeof threshold !== 'number' || isNaN(threshold) || threshold % 1 !== 0) {\n            try {\n                thresholdResult = Scripting.evalJavaScript(Scripting.parse(threshold.toString()));\n            }\n            catch (err) {\n                err.message = \"bad evaluation: \" + err.message;\n                throw err;\n            }\n        }\n        else {\n            thresholdResult = threshold;\n        }\n        var randomValue = Math.floor(Math.random() * 100);\n        if (randomValue > thresholdResult) {\n            debugLogCollector.addLog(false, \"random value is greater than threshold (random=\".concat(randomValue, \" > threshold=\").concat(thresholdResult, \")\"), 3);\n            return { result: false, debugLogCollector: debugLogCollector };\n        }\n        debugLogCollector.addLog(true, 'threshold passed (random=' + randomValue + ' <= threshold=' + thresholdResult + ')', 3);\n        return { result: true, debugLogCollector: debugLogCollector };\n    };\n    return ConstraintsVerificator;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConstraintsVerificator);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/ConstraintsVerificator.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/TypeChecker */ \"./src/tools/TypeChecker.ts\");\n/* harmony import */ var _enum_GroupType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enum/GroupType */ \"./src/enum/GroupType.ts\");\n\n\nvar Group = /** @class */ (function () {\n    function Group(name, weight, type, sequentialIndex, sequentialCount) {\n        this.name = name;\n        this.weight = weight;\n        this.type = type;\n        this.sequentialIndex = sequentialIndex;\n        this.sequentialCount = sequentialCount;\n    }\n    Group.createFromGroupDefinition = function (groupDefinition // eslint-disable-line @typescript-eslint/no-explicit-any\n    ) {\n        var _a, _b;\n        if (typeof groupDefinition === 'string') {\n            return new Group(groupDefinition.toLowerCase(), 10, _enum_GroupType__WEBPACK_IMPORTED_MODULE_1__.GroupType.Random, null, null);\n        }\n        else {\n            if (_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isObject(groupDefinition)) {\n                if (!_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isString(groupDefinition.name)) {\n                    throw new Error(\"\\\"definition.group.name\\\" should be string\");\n                }\n                if (groupDefinition.weight !== undefined && !_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isInteger(groupDefinition.weight)) {\n                    throw new Error(\"\\\"definition.group.weight\\\" should be integer\");\n                }\n                if (groupDefinition.type !== undefined && groupDefinition.type !== 'random' && groupDefinition.type !== 'sequential') {\n                    throw new Error(\"\\\"definition.group.type\\\" should be \\\"random\\\" or \\\"sequential\\\"\");\n                }\n                if (groupDefinition.type === 'sequential') {\n                    if (groupDefinition.sequentialIndex === undefined) {\n                        throw new Error(\"\\\"definition.group.sequentialIndex\\\" is requered when \\\"definition.group.type\\\" = \\\"sequential\\\"\");\n                    }\n                    if (!_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isInteger(groupDefinition.sequentialIndex)) {\n                        throw new Error(\"\\\"definition.group.sequentialIndex\\\" should be integer\");\n                    }\n                    if (groupDefinition.sequentialCount !== undefined && !_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isInteger(groupDefinition.sequentialCount)) {\n                        throw new Error(\"\\\"definition.group.sequentialCount\\\" should be integer\");\n                    }\n                }\n                return new Group(groupDefinition.name.toLowerCase(), (_a = groupDefinition.weight) !== null && _a !== void 0 ? _a : 10, groupDefinition.type === 'sequential' ? _enum_GroupType__WEBPACK_IMPORTED_MODULE_1__.GroupType.Sequential : _enum_GroupType__WEBPACK_IMPORTED_MODULE_1__.GroupType.Random, groupDefinition.type === 'sequential' ? groupDefinition.sequentialIndex : null, groupDefinition.type === 'sequential' ? ((_b = groupDefinition.sequentialCount) !== null && _b !== void 0 ? _b : 1) : null);\n            }\n            else {\n                throw new Error(\"\\\"definition.group\\\" should be string, object\");\n            }\n        }\n    };\n    return Group;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Group);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/Group.ts?");

/***/ }),

/***/ "./src/GroupList.ts":
/*!**************************!*\
  !*** ./src/GroupList.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Group__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Group */ \"./src/Group.ts\");\n\nvar GroupList = /** @class */ (function () {\n    function GroupList(groups) {\n        var _this = this;\n        this.groups = groups;\n        this.nameIndex = {};\n        this.groups = groups;\n        this.groups.forEach(function (group, index) {\n            if (_this.nameIndex[group.name] !== undefined) {\n                throw new Error(\"\\\"definition.group.name\\\" should be unique in one RE\");\n            }\n            _this.nameIndex[group.name] = index;\n        });\n    }\n    GroupList.createFromGroupsDefinition = function (groupsDefinitions) {\n        if (groupsDefinitions === undefined) {\n            return new GroupList([]);\n        }\n        else {\n            if (!Array.isArray(groupsDefinitions)) {\n                groupsDefinitions = [groupsDefinitions];\n            }\n            return new GroupList(groupsDefinitions.map(function (groupsDefinition) {\n                return _Group__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createFromGroupDefinition(groupsDefinition);\n            }));\n        }\n    };\n    Object.defineProperty(GroupList.prototype, \"length\", {\n        get: function () {\n            return this.groups.length;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    GroupList.prototype.all = function () {\n        return this.groups;\n    };\n    GroupList.prototype.getByName = function (groupName) {\n        if (this.nameIndex[groupName] === undefined) {\n            return null;\n        }\n        return this.groups[this.nameIndex[groupName]];\n    };\n    return GroupList;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GroupList);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/GroupList.ts?");

/***/ }),

/***/ "./src/LimitationStrategy.ts":
/*!***********************************!*\
  !*** ./src/LimitationStrategy.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/TypeChecker */ \"./src/tools/TypeChecker.ts\");\n/* harmony import */ var _Tags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tags */ \"./src/Tags.ts\");\n\n\nvar LimitationStrategy = /** @class */ (function () {\n    function LimitationStrategy(max, isSeparate, tags) {\n        this.max = max;\n        this.isSeparate = isSeparate;\n        this.tags = tags;\n        if (tags.isHaveTweeScriptTags) {\n            throw new Error(\"\\\"definition.limitationStrategy[...].tags\\\" should be string\");\n        }\n    }\n    LimitationStrategy.createFromLimitationStrategyDefinition = function (limitationStrategyDefinition) {\n        var _a;\n        if (!_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isInteger(limitationStrategyDefinition.max)) {\n            throw new Error(\"\\\"definition.limitationStrategy[...].max\\\" should be integer\");\n        }\n        if (limitationStrategyDefinition.max < 0) {\n            throw new Error(\"\\\"definition.limitationStrategy[...].max\\\" should equal or greater than 0\");\n        }\n        if (limitationStrategyDefinition.isSeparate !== undefined && !_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isBoolean(limitationStrategyDefinition.isSeparate)) {\n            throw new Error(\"\\\"definition.limitationStrategy[...].isSeparate\\\" should be boolean\");\n        }\n        return new LimitationStrategy(limitationStrategyDefinition.max, (_a = limitationStrategyDefinition.isSeparate) !== null && _a !== void 0 ? _a : false, _Tags__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createFromTagsDefinition(limitationStrategyDefinition.tags));\n    };\n    return LimitationStrategy;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LimitationStrategy);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/LimitationStrategy.ts?");

/***/ }),

/***/ "./src/LimitationStrategyList.ts":
/*!***************************************!*\
  !*** ./src/LimitationStrategyList.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/TypeChecker */ \"./src/tools/TypeChecker.ts\");\n/* harmony import */ var _LimitationStrategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LimitationStrategy */ \"./src/LimitationStrategy.ts\");\n\n\nvar LimitationStrategyList = /** @class */ (function () {\n    function LimitationStrategyList(limitationStrategies) {\n        var _this = this;\n        this.limitationStrategies = limitationStrategies;\n        this.isTaged = false;\n        var tagsValidation = {};\n        this.limitationStrategies.forEach(function (limitationStrategy) {\n            if (!_this.isTaged && limitationStrategy.tags.length > 0) {\n                _this.isTaged = true;\n            }\n            if (tagsValidation[limitationStrategy.tags.toStringKey()] !== undefined) {\n                throw new Error(\"\\\"definition.limitationStrategy\\\" should containg uniq tag sets (tags: \\\"\".concat(limitationStrategy.tags.tags.map(function (tag) { return tag.tag; }).join('\", \"'), \"\\\")\"));\n            }\n            tagsValidation[limitationStrategy.tags.toStringKey()] = true;\n        });\n    }\n    LimitationStrategyList.createFromLimitationStrategiesDefinition = function (limitationStrategiesDefinition) {\n        if (limitationStrategiesDefinition === undefined) {\n            return new LimitationStrategyList([]);\n        }\n        else {\n            if (!_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isArray(limitationStrategiesDefinition)) {\n                throw new Error(\"\\\"definition.limitationStrategy\\\" should be array\");\n            }\n            return new LimitationStrategyList(limitationStrategiesDefinition.map(function (limitationStrategyDefinition) {\n                return _LimitationStrategy__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createFromLimitationStrategyDefinition(limitationStrategyDefinition);\n            }));\n        }\n    };\n    Object.defineProperty(LimitationStrategyList.prototype, \"length\", {\n        get: function () {\n            return this.limitationStrategies.length;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    LimitationStrategyList.prototype.all = function () {\n        return this.limitationStrategies;\n    };\n    return LimitationStrategyList;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LimitationStrategyList);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/LimitationStrategyList.ts?");

/***/ }),

/***/ "./src/Lock.ts":
/*!*********************!*\
  !*** ./src/Lock.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Lock = /** @class */ (function () {\n    function Lock() {\n        this.lockData = {\n            isLocked: false,\n            isForce: false,\n        };\n    }\n    Lock.prototype.acquire = function () {\n        if (this.lockData.isForce === false) {\n            this.lockData.isLocked = true;\n        }\n    };\n    Lock.prototype.release = function () {\n        if (this.lockData.isForce === false) {\n            this.lockData.isLocked = false;\n        }\n    };\n    Lock.prototype.forceAcquire = function () {\n        this.lockData.isLocked = true;\n        this.lockData.isForce = true;\n    };\n    Lock.prototype.forceRelease = function () {\n        this.lockData.isLocked = false;\n        this.lockData.isForce = false;\n    };\n    Object.defineProperty(Lock.prototype, \"isLocked\", {\n        get: function () {\n            return this.lockData.isLocked;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Lock.prototype, \"isForce\", {\n        get: function () {\n            return this.lockData.isForce;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    return Lock;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Lock);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/Lock.ts?");

/***/ }),

/***/ "./src/RandomEvent.ts":
/*!****************************!*\
  !*** ./src/RandomEvent.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tags */ \"./src/Tags.ts\");\n/* harmony import */ var _GroupList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GroupList */ \"./src/GroupList.ts\");\n/* harmony import */ var _LimitationStrategyList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LimitationStrategyList */ \"./src/LimitationStrategyList.ts\");\n\n\n\nvar RandomEvent = /** @class */ (function () {\n    function RandomEvent(name, isEnabled, groups, filter, type, threshold, tags, limitationStrategy) {\n        this.name = name;\n        this.isEnabled = isEnabled;\n        this.groups = groups;\n        this.filter = filter;\n        this.type = type;\n        this.threshold = threshold;\n        this.tags = tags;\n        this.limitationStrategy = limitationStrategy;\n    }\n    RandomEvent.createFromDefinition = function (definition) {\n        if (typeof definition.name !== 'string') {\n            throw new Error(\"\\\"definition.name\\\" should be string\");\n        }\n        if (definition.isEnabled === undefined) {\n            definition.isEnabled = true;\n        }\n        else {\n            if (typeof definition.isEnabled !== 'boolean') {\n                throw new Error(\"\\\"definition.isEnabled\\\" should be boolean (name: \".concat(definition.name, \")\"));\n            }\n        }\n        try {\n            // TODO rename definition.group to definition.groups\n            definition.groups = _GroupList__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createFromGroupsDefinition(definition.group);\n        }\n        catch (e) {\n            e.message = \"\".concat(e.message, \" (name: \").concat(definition.name, \")\");\n            throw e;\n        }\n        if (definition.filter === undefined) {\n            definition.filter = null;\n        }\n        else {\n            if (definition.filter !== null && typeof definition.filter !== 'string') {\n                throw new Error(\"\\\"definition.filter\\\" should be string or null (name: \".concat(definition.name, \")\"));\n            }\n        }\n        if (definition.type === undefined) {\n            definition.type = 'embaded';\n        }\n        else {\n            if (definition.type !== 'embaded' && definition.type !== 'goto') {\n                throw new Error(\"\\\"definition.type\\\" should be \\\"embaded\\\" or \\\"goto\\\" (name: \".concat(definition.name, \")\"));\n            }\n        }\n        if (definition.threshold === undefined) {\n            definition.threshold = 100;\n        }\n        else {\n            if (typeof definition.threshold === 'number') {\n                if (definition.threshold < 0) {\n                    throw new Error(\"\\\"definition.threshold\\\" should be >= than 0 (name: \".concat(definition.name, \")\"));\n                }\n                if (definition.threshold > 100) {\n                    throw new Error(\"\\\"definition.threshold\\\" should be <= than 100 (name: \".concat(definition.name, \")\"));\n                }\n            }\n        }\n        try {\n            definition.tags = _Tags__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createFromTagsDefinition(definition.tags);\n        }\n        catch (e) {\n            e.message = \"\".concat(e.message, \" (name: \").concat(definition.name, \")\");\n            throw e;\n        }\n        try {\n            definition.limitationStrategy = _LimitationStrategyList__WEBPACK_IMPORTED_MODULE_2__[\"default\"].createFromLimitationStrategiesDefinition(definition.limitationStrategy);\n        }\n        catch (e) {\n            e.message = \"\".concat(e.message, \" (name: \").concat(definition.name, \")\");\n            throw e;\n        }\n        return new this(definition.name, definition.isEnabled, definition.groups, definition.filter, definition.type, definition.threshold, definition.tags, definition.limitationStrategy);\n    };\n    return RandomEvent;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RandomEvent);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/RandomEvent.ts?");

/***/ }),

/***/ "./src/RandomEventApp.ts":
/*!*******************************!*\
  !*** ./src/RandomEventApp.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/TypeChecker */ \"./src/tools/TypeChecker.ts\");\n/* harmony import */ var _RandomEventCollection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RandomEventCollection */ \"./src/RandomEventCollection.ts\");\n/* harmony import */ var _RandomEventHistory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RandomEventHistory */ \"./src/RandomEventHistory.ts\");\n/* harmony import */ var _RandomEventCollector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RandomEventCollector */ \"./src/RandomEventCollector.ts\");\n/* harmony import */ var _Tags__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tags */ \"./src/Tags.ts\");\n/* harmony import */ var _Lock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Lock */ \"./src/Lock.ts\");\n/* harmony import */ var _StateLoader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./StateLoader */ \"./src/StateLoader.ts\");\n/* harmony import */ var _DebugLogCollector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DebugLogCollector */ \"./src/DebugLogCollector.ts\");\n/* harmony import */ var _ConstraintsVerificator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ConstraintsVerificator */ \"./src/ConstraintsVerificator.ts\");\n/* harmony import */ var _enum_GroupType__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./enum/GroupType */ \"./src/enum/GroupType.ts\");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\n\n\n\n\n\n\n\n\n\n\nvar RandomEventApp = /** @class */ (function () {\n    function RandomEventApp(randomEventTag, randomEventDefinitionRegex, debugLevel) {\n        if (randomEventTag === void 0) { randomEventTag = 'random_event'; }\n        if (randomEventDefinitionRegex === void 0) { randomEventDefinitionRegex = /<<RandomEventDefinition>>(.*)<<\\/RandomEventDefinition>>/gms; }\n        if (debugLevel === void 0) { debugLevel = 0; }\n        var _this = this;\n        this.randomEventTag = randomEventTag;\n        this.acquireLock = function () { return _this.lock.acquire(); };\n        this.releaseLock = function () { return _this.lock.release(); };\n        this.forceAcquireLock = function () { return _this.lock.forceAcquire(); };\n        this.forceReleaseLock = function () { return _this.lock.forceRelease(); };\n        this.loadState = function (variables) { return _this.stateLoader.loadState(variables); };\n        this.setStateAsLoaded = function () { return _this.stateLoader.forceSetIsLoadedFlag(true); };\n        this.resetStateLoadedFlag = function () { return _this.stateLoader.resetIsLoadedFlag(); };\n        this.has = function (passageName) { return _this.randomEventCollection.has(passageName); };\n        this.find = function (passageName) { return _this.randomEventCollection.find(passageName); };\n        this.randomEventCollection = new _RandomEventCollection__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        this.randomEventHistory = new _RandomEventHistory__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n        this.randomEventCollector = new _RandomEventCollector__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.randomEventCollection, randomEventTag, randomEventDefinitionRegex);\n        this.stateLoader = new _StateLoader__WEBPACK_IMPORTED_MODULE_6__[\"default\"](this.randomEventCollection, this.randomEventHistory);\n        this.lock = new _Lock__WEBPACK_IMPORTED_MODULE_5__[\"default\"]();\n        this.debugLogCollector = new _DebugLogCollector__WEBPACK_IMPORTED_MODULE_7__[\"default\"](debugLevel);\n        this.constraintsVerificator = new _ConstraintsVerificator__WEBPACK_IMPORTED_MODULE_8__[\"default\"](this.randomEventHistory);\n    }\n    RandomEventApp.prototype.init = function () {\n        this.randomEventCollector.init();\n    };\n    Object.defineProperty(RandomEventApp.prototype, \"isLocked\", {\n        get: function () {\n            return this.lock.isLocked;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    ;\n    Object.defineProperty(RandomEventApp.prototype, \"isForceLocked\", {\n        get: function () {\n            return this.lock.isForce;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    ;\n    RandomEventApp.prototype.enable = function (passageName) {\n        if (!this.randomEventCollection.has(passageName)) {\n            if (!Story.has(passageName)) {\n                throw new Error(\"passage \\\"\".concat(passageName, \"\\\" does not exist\"));\n            }\n            throw new Error(\"passage \\\"\".concat(passageName, \"\\\" exist but without tag \\\"\").concat(this.randomEventTag, \"\\\"\"));\n        }\n        this.randomEventCollection.enable(passageName);\n        this.randomEventHistory.enable(passageName);\n    };\n    RandomEventApp.prototype.disable = function (passageName) {\n        if (!this.randomEventCollection.has(passageName)) {\n            if (!Story.has(passageName)) {\n                throw new Error(\"passage \\\"\".concat(passageName, \"\\\" does not exist\"));\n            }\n            throw new Error(\"passage \\\"\".concat(passageName, \"\\\" exist but without tag \\\"\").concat(this.randomEventTag, \"\\\"\"));\n        }\n        this.randomEventCollection.disable(passageName);\n        this.randomEventHistory.disable(passageName);\n    };\n    RandomEventApp.prototype.enableByTag = function (tag) {\n        var _this = this;\n        tag = tag.toLowerCase();\n        this.randomEventCollection.getEventsNamesByTag(tag).forEach(function (passageName) {\n            _this.randomEventCollection.enable(passageName);\n            _this.randomEventHistory.enable(passageName, false);\n        });\n        this.randomEventHistory.store();\n    };\n    RandomEventApp.prototype.disableByTag = function (tag) {\n        var _this = this;\n        tag = tag.toLowerCase();\n        this.randomEventCollection.getEventsNamesByTag(tag).forEach(function (passageName) {\n            _this.randomEventCollection.disable(passageName);\n            _this.randomEventHistory.disable(passageName, false);\n        });\n        this.randomEventHistory.store();\n    };\n    RandomEventApp.prototype.resetFiredCounterByRandomEvent = function (passageName) {\n        if (!this.randomEventCollection.has(passageName)) {\n            if (!Story.has(passageName)) {\n                throw new Error(\"passage \\\"\".concat(passageName, \"\\\" does not exist\"));\n            }\n            throw new Error(\"passage \\\"\".concat(passageName, \"\\\" exist but without tag \\\"\").concat(this.randomEventTag, \"\\\"\"));\n        }\n        this.randomEventHistory.resetRandomEventFiredCounter(passageName);\n    };\n    RandomEventApp.prototype.resetFiredCounterByTag = function (tag) {\n        var _this = this;\n        tag = tag.toLowerCase();\n        this.randomEventHistory.resetTagFiredCounter(tag, false);\n        this.randomEventCollection.getEventsNamesByTag(tag).forEach(function (passageName) {\n            _this.randomEventHistory.resetRandomEventFiredCounter(passageName, false);\n        });\n        this.randomEventCollection.getEventsNamesByLimitationStrategyTag(tag).forEach(function (passageName) {\n            _this.randomEventHistory.resetRandomEventFiredCounter(passageName, false);\n        });\n        this.randomEventCollection.getTagGroupsByLimitationStrategyTag(tag).forEach(function (tags) {\n            var tagsStringKey = (new _Tags__WEBPACK_IMPORTED_MODULE_4__[\"default\"](tags)).toStringKey();\n            _this.randomEventHistory.resetTagFiredCounter(tagsStringKey, false);\n        });\n        this.randomEventHistory.store();\n    };\n    RandomEventApp.prototype.runRandomEvent = function (passageName, rewriteConfiguration) {\n        this.debugLogCollector.clear();\n        rewriteConfiguration = __assign({\n            isValidateIsEnable: true,\n            isEnable: null,\n            isValidateFilter: true,\n            filter: null,\n            isValidateLimitationStrategy: true,\n            limitationStrategy: null,\n            isValidateThreshold: true,\n            threshold: null,\n        }, (rewriteConfiguration !== null && rewriteConfiguration !== void 0 ? rewriteConfiguration : {}));\n        if (!this.randomEventCollection.has(passageName)) {\n            if (!Story.has(passageName)) {\n                throw new Error(\"passage \\\"\".concat(passageName, \"\\\" does not exist\"));\n            }\n            throw new Error(\"passage \\\"\".concat(passageName, \"\\\" exist but without tag \\\"\").concat(this.randomEventTag, \"\\\"\"));\n        }\n        var randomEvent = this.randomEventCollection.get(passageName);\n        this.debugLogCollector.addLog(null, \"Start random event \".concat(randomEvent.name), 1);\n        this.debugLogCollector.increaseLevel();\n        var result = true;\n        if (this.lock.isLocked) {\n            result = false;\n            this.debugLogCollector.addLog(null, \"Skip because lock already acquired\", 1);\n            return {\n                isSuccess: result,\n                debugLogCollector: this.debugLogCollector,\n                randomEvent: randomEvent,\n                usedTags: []\n            };\n        }\n        try {\n            var compiledTags = randomEvent.tags.getCompiledTags();\n            var checkResult = this.constraintsVerificator.verify(randomEvent, rewriteConfiguration);\n            result = checkResult.result;\n            this.debugLogCollector\n                .addLog(null, \"Verify:\", 2)\n                .increaseLevel()\n                .merge(checkResult.debugLogCollector)\n                .decreaseLevel();\n            return {\n                isSuccess: result,\n                debugLogCollector: this.debugLogCollector,\n                randomEvent: randomEvent,\n                usedTags: randomEvent.limitationStrategy.isTaged ? checkResult.additionalData.usedLimitationStrategyTags : [compiledTags]\n            };\n        }\n        catch (err) {\n            // TODO add data to error\n            throw err;\n        }\n    };\n    RandomEventApp.prototype.runGroup = function (groupName, groupThreshold, rewriteConfiguration) {\n        var _this = this;\n        groupName = groupName.toLowerCase();\n        this.debugLogCollector.clear();\n        rewriteConfiguration = __assign({\n            isValidateIsEnable: true,\n            isEnable: null,\n            isValidateFilter: true,\n            filter: null,\n            isValidateLimitationStrategy: true,\n            limitationStrategy: null,\n            isValidateThreshold: true,\n            threshold: null,\n        }, (rewriteConfiguration !== null && rewriteConfiguration !== void 0 ? rewriteConfiguration : {}));\n        if (!this.randomEventCollection.hasGroup(groupName)) {\n            throw new Error(\"group \\\"\".concat(groupName, \"\\\" does not exist\"));\n        }\n        this.debugLogCollector.addLog(null, \"Start group \".concat(groupName), 1);\n        this.debugLogCollector.increaseLevel();\n        var result = true;\n        if (this.lock.isLocked) {\n            result = false;\n            this.debugLogCollector.addLog(null, \"Skip because lock already acquired\", 1);\n            return {\n                isSuccess: result,\n                debugLogCollector: this.debugLogCollector,\n            };\n        }\n        if (_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isNumber(groupThreshold) || _tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isString(groupThreshold)) {\n            try {\n                var checkResult = this.constraintsVerificator.verifyThreshold(groupThreshold);\n                result = checkResult.result;\n                this.debugLogCollector\n                    .addLog(null, 'Verify group threshold', 2)\n                    .increaseLevel()\n                    .merge(checkResult.debugLogCollector)\n                    .decreaseLevel();\n            }\n            catch (err) {\n                // TODO add data to error\n                throw err;\n            }\n            if (result === false) {\n                return {\n                    isSuccess: result,\n                    debugLogCollector: this.debugLogCollector,\n                };\n            }\n            rewriteConfiguration.isValidateThreshold = false;\n        }\n        this.debugLogCollector\n            .increaseLevel()\n            .addLog(null, 'Verify random events in group', 1)\n            .increaseLevel();\n        var totalWeight = 0;\n        var sucessRandomEventsResults = [];\n        var passageNames = this.randomEventCollection.getEventsNamesByGroup(groupName);\n        for (var groupIndex = 0; groupIndex < passageNames.length; groupIndex++) {\n            var passageName = passageNames[groupIndex];\n            if (!this.randomEventCollection.has(passageName)) {\n                if (!Story.has(passageName)) {\n                    throw new Error(\"passage \\\"\".concat(passageName, \"\\\" does not exist\"));\n                }\n                throw new Error(\"passage \\\"\".concat(passageName, \"\\\" exist but without tag \\\"\").concat(this.randomEventTag, \"\\\"\"));\n            }\n            var randomEvent = this.randomEventCollection.get(passageName);\n            var group = randomEvent.groups.getByName(groupName);\n            if (group === null) {\n                throw new Error(\"Can't find group \\\"\".concat(groupName, \"\\\" in random event \").concat(randomEvent.name));\n            }\n            this.debugLogCollector\n                .addLog(null, \"Random event \".concat(randomEvent.name, \" with weight \").concat(group.weight), 1)\n                .increaseLevel();\n            try {\n                var compiledTags = randomEvent.tags.getCompiledTags();\n                var checkResult = this.constraintsVerificator.verify(randomEvent, rewriteConfiguration);\n                var result_1 = checkResult.result;\n                this.debugLogCollector\n                    .addLog(null, \"Verify\", 2)\n                    .increaseLevel()\n                    .merge(checkResult.debugLogCollector)\n                    .decreaseLevel();\n                if (result_1) {\n                    totalWeight += group.weight;\n                    sucessRandomEventsResults.push({\n                        isSuccess: result_1,\n                        randomEvent: randomEvent,\n                        usedTags: randomEvent.limitationStrategy.isTaged ? checkResult.additionalData.usedLimitationStrategyTags : [compiledTags],\n                        group: group,\n                    });\n                }\n            }\n            catch (err) {\n                // TODO add data to error\n                throw err;\n            }\n            this.debugLogCollector.decreaseLevel();\n        }\n        if (sucessRandomEventsResults.length <= 0) {\n            result = false;\n            this.debugLogCollector.addLog(false, \"not found any suitable random events in group\", 2);\n            return {\n                isSuccess: result,\n                debugLogCollector: this.debugLogCollector,\n            };\n        }\n        var winnerRandomEventResult = null;\n        if (sucessRandomEventsResults[0].group.type === _enum_GroupType__WEBPACK_IMPORTED_MODULE_9__.GroupType.Sequential) {\n            this.debugLogCollector\n                .addLog(true, \"Find winner event\", 2)\n                .increaseLevel();\n            var sucessRandomEventsSequentialResults = sucessRandomEventsResults.filter(function (sucessRandomEventsResult) {\n                return _this.randomEventHistory.getHistoryFiredEventCount(sucessRandomEventsResult.randomEvent.name) < sucessRandomEventsResult.group.sequentialCount;\n            });\n            this.debugLogCollector.addLog(true, \"sequential search found \".concat(sucessRandomEventsSequentialResults.length, \" siutable events\"), 3);\n            if (sucessRandomEventsSequentialResults.length > 0) {\n                winnerRandomEventResult = sucessRandomEventsSequentialResults.sort(function (a, b) {\n                    return a.group.sequentialIndex - b.group.sequentialIndex;\n                })[0];\n                this.debugLogCollector.addLog(true, \"winner random event: \".concat(winnerRandomEventResult.randomEvent.name), 3);\n                return {\n                    isSuccess: result,\n                    debugLogCollector: this.debugLogCollector,\n                    randomEvent: winnerRandomEventResult.randomEvent,\n                    usedTags: winnerRandomEventResult.usedTags,\n                    group: winnerRandomEventResult.group,\n                };\n            }\n        }\n        var winnerWeight = Math.floor(Math.random() * totalWeight);\n        this.debugLogCollector.addLog(true, \"total weight: \".concat(totalWeight, \" | wittner weight: \").concat(winnerWeight), 3);\n        for (var i = 0; i < sucessRandomEventsResults.length; i++) {\n            winnerWeight -= sucessRandomEventsResults[i].group.weight;\n            if (winnerWeight <= 0) {\n                winnerRandomEventResult = sucessRandomEventsResults[i];\n                break;\n            }\n        }\n        this.debugLogCollector.addLog(true, \"winner random event: \".concat(winnerRandomEventResult.randomEvent.name), 3);\n        return {\n            isSuccess: result,\n            debugLogCollector: this.debugLogCollector,\n            randomEvent: winnerRandomEventResult.randomEvent,\n            usedTags: winnerRandomEventResult.usedTags,\n            group: winnerRandomEventResult.group,\n        };\n    };\n    RandomEventApp.prototype.incrementCounters = function (randomEvent, usedTags) {\n        var _this = this;\n        this.randomEventHistory.incrementRandomEventFiredCounter(randomEvent.name, false);\n        usedTags.forEach(function (tags) {\n            _this.randomEventHistory.incrementTagsFiredCounter(__spreadArray(__spreadArray([], tags, true), [new _Tags__WEBPACK_IMPORTED_MODULE_4__[\"default\"](tags).toStringKey()], false), false);\n        });\n        this.randomEventHistory.store();\n        this.stateLoader.forceSetIsLoadedFlag(true);\n    };\n    return RandomEventApp;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RandomEventApp);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/RandomEventApp.ts?");

/***/ }),

/***/ "./src/RandomEventCollection.ts":
/*!**************************************!*\
  !*** ./src/RandomEventCollection.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _RandomEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RandomEvent */ \"./src/RandomEvent.ts\");\n/* harmony import */ var _enum_GroupType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enum/GroupType */ \"./src/enum/GroupType.ts\");\n/* harmony import */ var _Tags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tags */ \"./src/Tags.ts\");\n/* harmony import */ var _tools_TypeChecker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tools/TypeChecker */ \"./src/tools/TypeChecker.ts\");\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\n\n\n\n\nvar RandomEventCollection = /** @class */ (function () {\n    function RandomEventCollection() {\n        this.items = {};\n        this.tagIndex = {};\n        this.limitationStrategyTagIndex = {};\n        this.groupIndex = {};\n        this.validationGroup = {};\n    }\n    RandomEventCollection.prototype.cleanUp = function () {\n        this.validationGroup = {};\n    };\n    RandomEventCollection.prototype.add = function (randomEvent) {\n        var _this = this;\n        if (!(randomEvent instanceof _RandomEvent__WEBPACK_IMPORTED_MODULE_0__[\"default\"])) {\n            throw new Error(\"randomEvent should be instance of RandomEvent\");\n        }\n        // Build search indexes + validation\n        randomEvent.groups.all().forEach(function (group) {\n            if (_this.validationGroup[group.name] === undefined) {\n                _this.validationGroup[group.name] = {\n                    type: group.type.toString(),\n                    indexes: [group.sequentialIndex],\n                };\n            }\n            else {\n                if (_this.validationGroup[group.name].type !== group.type) {\n                    throw new Error(\"Group type should be the same. Group name: \\\"\".concat(group.name, \"\\\". Passage name: \\\"\").concat(randomEvent.name, \"\\\". Other passages: \\\"\").concat(_this.groupIndex[group.name].join(\", \"), \"\\\"\"));\n                }\n                if (group.type === _enum_GroupType__WEBPACK_IMPORTED_MODULE_1__.GroupType.Sequential) {\n                    if (_this.validationGroup[group.name].indexes.includes(group.sequentialIndex)) {\n                        throw new Error(\"Random event with sequentialIndex \".concat(group.sequentialIndex, \" should be unique (name: \").concat(randomEvent.name, \" ,group: \\\"\").concat(group.name, \"\\\")\"));\n                    }\n                    _this.validationGroup[group.name].indexes.push(group.sequentialIndex);\n                }\n            }\n            if (_this.groupIndex[group.name] === undefined) {\n                _this.groupIndex[group.name] = [];\n            }\n            _this.groupIndex[group.name].push(randomEvent.name);\n        });\n        var stringTags = __spreadArray([], randomEvent.tags.getStringTags(), true);\n        stringTags.forEach(function (tag) {\n            if (_this.tagIndex[tag] === undefined) {\n                _this.tagIndex[tag] = [];\n            }\n            _this.tagIndex[tag].push(randomEvent.name);\n        });\n        if (randomEvent.limitationStrategy.length > 0 && randomEvent.limitationStrategy.isTaged) {\n            randomEvent.limitationStrategy.all().forEach(function (limitationStrategy) {\n                limitationStrategy.tags.getStringTags().forEach(function (tag) {\n                    if (_this.limitationStrategyTagIndex[tag] === undefined) {\n                        _this.limitationStrategyTagIndex[tag] = {\n                            events: [],\n                            tagGroups: {},\n                        };\n                    }\n                    _this.limitationStrategyTagIndex[tag].events.push(randomEvent.name);\n                    var limitationStrategyTags = __spreadArray([], limitationStrategy.tags.getStringTags(), true);\n                    if (limitationStrategy.isSeparate) {\n                        limitationStrategyTags.push(randomEvent.name);\n                    }\n                    _this.limitationStrategyTagIndex[tag].tagGroups[new _Tags__WEBPACK_IMPORTED_MODULE_2__[\"default\"](limitationStrategyTags).toStringKey()] = limitationStrategyTags;\n                });\n            });\n        }\n        this.items[randomEvent.name] = randomEvent;\n    };\n    RandomEventCollection.prototype.has = function (name) {\n        if (!_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_3__[\"default\"].isString(name)) {\n            throw new Error(\"Invalid \\\"RandomEventCollection.has\\\" argument type\");\n        }\n        return this.items[name] !== undefined;\n    };\n    RandomEventCollection.prototype.get = function (name) {\n        if (!this.has(name)) {\n            throw new Error(\"Random event with name \".concat(name, \" doesn't exist\"));\n        }\n        return this.items[name];\n    };\n    RandomEventCollection.prototype.find = function (name) {\n        return this.has(name) ? this.items[name] : null;\n    };\n    RandomEventCollection.prototype.enable = function (name) {\n        if (!this.has(name)) {\n            throw new Error(\"Random event with name \".concat(name, \" doesn't exist\"));\n        }\n        this.items[name].isEnabled = true;\n    };\n    RandomEventCollection.prototype.disable = function (name) {\n        if (!this.has(name)) {\n            throw new Error(\"Random event with name \".concat(name, \" doesn't exist\"));\n        }\n        this.items[name].isEnabled = false;\n    };\n    RandomEventCollection.prototype.getEventsNamesByTag = function (tag) {\n        if (this.tagIndex[tag] === undefined) {\n            return [];\n        }\n        return this.tagIndex[tag];\n    };\n    RandomEventCollection.prototype.getEventsNamesByLimitationStrategyTag = function (tag) {\n        if (this.limitationStrategyTagIndex[tag] === undefined) {\n            return [];\n        }\n        return this.limitationStrategyTagIndex[tag].events;\n    };\n    RandomEventCollection.prototype.getTagGroupsByLimitationStrategyTag = function (tag) {\n        if (this.limitationStrategyTagIndex[tag] === undefined) {\n            return [];\n        }\n        return Object.values(this.limitationStrategyTagIndex[tag].tagGroups);\n    };\n    RandomEventCollection.prototype.hasGroup = function (group) {\n        return this.groupIndex[group] !== undefined;\n    };\n    RandomEventCollection.prototype.getEventsNamesByGroup = function (group) {\n        var _a;\n        return (_a = this.groupIndex[group]) !== null && _a !== void 0 ? _a : [];\n    };\n    return RandomEventCollection;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RandomEventCollection);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/RandomEventCollection.ts?");

/***/ }),

/***/ "./src/RandomEventCollector.ts":
/*!*************************************!*\
  !*** ./src/RandomEventCollector.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/TypeChecker */ \"./src/tools/TypeChecker.ts\");\n/* harmony import */ var _RandomEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RandomEvent */ \"./src/RandomEvent.ts\");\n\n\nvar RandomEventCollector = /** @class */ (function () {\n    function RandomEventCollector(randomEventCollection, randomEventTag, randomEventDefinitionRegex) {\n        this.randomEventCollection = randomEventCollection;\n        this.randomEventTag = randomEventTag;\n        this.randomEventDefinitionRegex = randomEventDefinitionRegex;\n        this.isInit = false;\n    }\n    RandomEventCollector.prototype.init = function () {\n        var _this = this;\n        if (this.isInit) {\n            return;\n        }\n        var randomEventPassages = Story.lookup().filter(function (passge) { return passge.tags.includes(_this.randomEventTag); });\n        randomEventPassages.forEach(function (passage) {\n            _this.randomEventDefinitionRegex.lastIndex = 0;\n            var randomEventDefinitionResult = _this.randomEventDefinitionRegex.exec(passage.element.textContent);\n            if (randomEventDefinitionResult === null) {\n                throw new Error(\"Random event definition not found in \".concat(passage.title));\n            }\n            var randomEventDefinition = randomEventDefinitionResult[1];\n            var randomEventDefinitionEvalResult;\n            try {\n                eval('randomEventDefinitionEvalResult = ' + randomEventDefinition);\n                if (!_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isObject(randomEventDefinitionEvalResult)) {\n                    throw new Error(\"Random event definition JSON should contain object\");\n                }\n            }\n            catch (e) {\n                e.message = \"Invalid random event definition JSON in passage \".concat(passage.title, \": \").concat(e.message);\n                throw e;\n            }\n            randomEventDefinitionEvalResult.name = passage.title;\n            _this.randomEventCollection.add(_RandomEvent__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createFromDefinition(randomEventDefinitionEvalResult));\n            passage.element.textContent = passage.element.textContent.replace(randomEventDefinitionResult[0], '').trim();\n        });\n        this.randomEventCollection.cleanUp();\n        this.isInit = true;\n    };\n    return RandomEventCollector;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RandomEventCollector);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/RandomEventCollector.ts?");

/***/ }),

/***/ "./src/RandomEventHistory.ts":
/*!***********************************!*\
  !*** ./src/RandomEventHistory.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar RandomEventHistory = /** @class */ (function () {\n    function RandomEventHistory() {\n        this.actualFiredEvents = {};\n        this.actualFiredTags = {};\n        this.historyFiredEvents = {};\n        this.historyFiredTags = {};\n        this.forceEventStatus = {};\n    }\n    RandomEventHistory.prototype.loadFromSerilizedString = function (serializedString) {\n        var _this = this;\n        var state = JSON.parse(serializedString);\n        Object.keys(state.e).forEach(function (randomeEventName) {\n            if (state.e[randomeEventName].a !== undefined) {\n                _this.actualFiredEvents[randomeEventName] = state.e[randomeEventName].a;\n            }\n            if (state.e[randomeEventName].h !== undefined) {\n                _this.historyFiredEvents[randomeEventName] = state.e[randomeEventName].h;\n            }\n            if (state.e[randomeEventName].s !== undefined) {\n                _this.forceEventStatus[randomeEventName] = state.e[randomeEventName].s === 1;\n            }\n        });\n        Object.keys(state.t).forEach(function (tag) {\n            if (state.t[tag].a !== undefined) {\n                _this.actualFiredTags[tag] = state.t[tag].a;\n            }\n            if (state.t[tag].h !== undefined) {\n                _this.historyFiredTags[tag] = state.t[tag].h;\n            }\n        });\n    };\n    RandomEventHistory.prototype.serialize = function () {\n        var _this = this;\n        var result = { e: {}, t: {} };\n        Object.keys(this.actualFiredEvents).forEach(function (randomeEventName) {\n            if (result.e[randomeEventName] === undefined) {\n                result.e[randomeEventName] = {};\n            }\n            result.e[randomeEventName].a = _this.actualFiredEvents[randomeEventName];\n        });\n        Object.keys(this.historyFiredEvents).forEach(function (randomeEventName) {\n            if (result.e[randomeEventName] === undefined) {\n                result.e[randomeEventName] = {};\n            }\n            result.e[randomeEventName].h = _this.historyFiredEvents[randomeEventName];\n        });\n        Object.keys(this.forceEventStatus).forEach(function (randomeEventName) {\n            if (result.e[randomeEventName] === undefined) {\n                result.e[randomeEventName] = {};\n            }\n            result.e[randomeEventName].s = _this.forceEventStatus[randomeEventName] === true ? 1 : 0;\n        });\n        Object.keys(this.actualFiredTags).forEach(function (tag) {\n            if (result.t[tag] === undefined) {\n                result.t[tag] = {};\n            }\n            result.t[tag].a = _this.actualFiredTags[tag];\n        });\n        Object.keys(this.historyFiredTags).forEach(function (tag) {\n            if (result.t[tag] === undefined) {\n                result.t[tag] = {};\n            }\n            result.t[tag].h = _this.historyFiredTags[tag];\n        });\n        return JSON.stringify(result);\n    };\n    RandomEventHistory.prototype.store = function () {\n        State.variables.randomEventHistory = this.serialize();\n    };\n    /** @deprecated only for backward compatibility */\n    RandomEventHistory.prototype.setActualRandomEventFiredCounter = function (randomeEventName, count) {\n        randomeEventName = randomeEventName.toLowerCase();\n        this.actualFiredEvents[randomeEventName] = count;\n    };\n    /** @deprecated only for backward compatibility */\n    RandomEventHistory.prototype.setActualTagFiredCounter = function (tag, count) {\n        tag = tag.toLowerCase();\n        this.actualFiredTags[tag] = count;\n    };\n    /** @deprecated only for backward compatibility */\n    RandomEventHistory.prototype.setHistoryRandomEventFiredCounter = function (randomeEventName, count) {\n        randomeEventName = randomeEventName.toLowerCase();\n        this.historyFiredEvents[randomeEventName] = count;\n    };\n    /** @deprecated only for backward compatibility */\n    RandomEventHistory.prototype.setHistoryTagFiredCounter = function (tag, count) {\n        tag = tag.toLowerCase();\n        this.historyFiredTags[tag] = count;\n    };\n    RandomEventHistory.prototype.enable = function (randomeEventName, isStoreImmediately) {\n        if (isStoreImmediately === void 0) { isStoreImmediately = true; }\n        randomeEventName = randomeEventName.toLowerCase();\n        this.forceEventStatus[randomeEventName] = true;\n        if (isStoreImmediately) {\n            this.store();\n        }\n    };\n    RandomEventHistory.prototype.disable = function (randomeEventName, isStoreImmediately) {\n        if (isStoreImmediately === void 0) { isStoreImmediately = true; }\n        randomeEventName = randomeEventName.toLowerCase();\n        this.forceEventStatus[randomeEventName] = false;\n        if (isStoreImmediately) {\n            this.store();\n        }\n    };\n    RandomEventHistory.prototype.incrementRandomEventFiredCounter = function (randomeEventName, isStoreImmediately) {\n        if (isStoreImmediately === void 0) { isStoreImmediately = true; }\n        randomeEventName = randomeEventName.toLowerCase();\n        this.actualFiredEvents[randomeEventName] = this.actualFiredEvents[randomeEventName] === undefined ? 1 : this.actualFiredEvents[randomeEventName] + 1;\n        this.historyFiredEvents[randomeEventName] = this.historyFiredEvents[randomeEventName] === undefined ? 1 : this.historyFiredEvents[randomeEventName] + 1;\n        if (isStoreImmediately) {\n            this.store();\n        }\n    };\n    RandomEventHistory.prototype.incrementTagsFiredCounter = function (tags, isStoreImmediately) {\n        var _this = this;\n        if (isStoreImmediately === void 0) { isStoreImmediately = true; }\n        if (tags !== null) {\n            var uniqueTags = tags.filter(function (tag, index, array) { return array.indexOf(tag) === index; });\n            uniqueTags.forEach(function (tag) {\n                tag = tag.toLowerCase();\n                _this.actualFiredTags[tag] = _this.actualFiredTags[tag] === undefined ? 1 : _this.actualFiredTags[tag] + 1;\n                _this.historyFiredTags[tag] = _this.historyFiredTags[tag] === undefined ? 1 : _this.historyFiredTags[tag] + 1;\n            });\n            if (isStoreImmediately) {\n                this.store();\n            }\n        }\n    };\n    RandomEventHistory.prototype.resetRandomEventFiredCounter = function (randomeEventName, isStoreImmediately) {\n        if (isStoreImmediately === void 0) { isStoreImmediately = true; }\n        randomeEventName = randomeEventName.toLowerCase();\n        if (this.actualFiredEvents[randomeEventName] !== undefined) {\n            delete this.actualFiredEvents[randomeEventName];\n        }\n        if (isStoreImmediately) {\n            this.store();\n        }\n    };\n    RandomEventHistory.prototype.resetTagFiredCounter = function (tag, isStoreImmediately) {\n        if (isStoreImmediately === void 0) { isStoreImmediately = true; }\n        tag = tag.toLowerCase();\n        if (this.actualFiredTags[tag] !== undefined) {\n            delete this.actualFiredTags[tag];\n        }\n        if (isStoreImmediately) {\n            this.store();\n        }\n    };\n    RandomEventHistory.prototype.getActualFiredEventCount = function (randomeEventName) {\n        var _a;\n        randomeEventName = randomeEventName.toLowerCase();\n        return (_a = this.actualFiredEvents[randomeEventName]) !== null && _a !== void 0 ? _a : 0;\n    };\n    RandomEventHistory.prototype.getActualFiredTagCount = function (tag) {\n        var _a;\n        tag = tag.toLowerCase();\n        return (_a = this.actualFiredTags[tag]) !== null && _a !== void 0 ? _a : 0;\n    };\n    RandomEventHistory.prototype.getHistoryFiredEventCount = function (randomeEventName) {\n        var _a;\n        randomeEventName = randomeEventName.toLowerCase();\n        return (_a = this.historyFiredEvents[randomeEventName]) !== null && _a !== void 0 ? _a : 0;\n    };\n    RandomEventHistory.prototype.getHistoryFiredTagCount = function (tag) {\n        var _a;\n        tag = tag.toLowerCase();\n        return (_a = this.historyFiredTags[tag]) !== null && _a !== void 0 ? _a : 0;\n    };\n    return RandomEventHistory;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RandomEventHistory);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/RandomEventHistory.ts?");

/***/ }),

/***/ "./src/StateLoader.ts":
/*!****************************!*\
  !*** ./src/StateLoader.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/TypeChecker */ \"./src/tools/TypeChecker.ts\");\n\nvar StateLoader = /** @class */ (function () {\n    function StateLoader(randomEventCollection, randomEventHistory) {\n        this.randomEventCollection = randomEventCollection;\n        this.randomEventHistory = randomEventHistory;\n        this.isLoaded = false;\n    }\n    StateLoader.prototype.forceSetIsLoadedFlag = function (isLoaded) {\n        this.isLoaded = isLoaded;\n    };\n    StateLoader.prototype.resetIsLoadedFlag = function () {\n        this.isLoaded = false;\n    };\n    StateLoader.prototype.loadState = function (variables) {\n        var _this = this;\n        if (!this.isLoaded) {\n            this.oldLoadState(variables);\n            if (!this.isLoaded) {\n                if (variables.randomEventHistory !== undefined) {\n                    this.randomEventHistory.loadFromSerilizedString(variables.randomEventHistory);\n                    Object.keys(this.randomEventHistory.forceEventStatus).forEach(function (randomEventName) {\n                        if (_this.randomEventHistory.forceEventStatus[randomEventName]) {\n                            _this.randomEventCollection.enable(randomEventName);\n                        }\n                        else {\n                            _this.randomEventCollection.disable(randomEventName);\n                        }\n                    });\n                    this.isLoaded = true;\n                }\n            }\n        }\n    };\n    /** @deprecated only for backward compatibility */\n    StateLoader.prototype.oldLoadState = function (variables) {\n        var _this = this;\n        if (!this.isLoaded) {\n            if (variables.randomEventFiredEvents !== undefined) {\n                var firedEvents_1 = JSON.parse(variables.randomEventFiredEvents);\n                Object.keys(firedEvents_1).forEach(function (firedEventsKey) {\n                    if (firedEventsKey !== \"\") {\n                        if (_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isInteger(firedEvents_1[firedEventsKey]) && firedEvents_1[firedEventsKey] > 0) {\n                            _this.randomEventHistory.setActualRandomEventFiredCounter(firedEventsKey.toLowerCase(), firedEvents_1[firedEventsKey]);\n                            _this.randomEventHistory.setHistoryRandomEventFiredCounter(firedEventsKey.toLowerCase(), firedEvents_1[firedEventsKey]);\n                        }\n                        else {\n                            _this.randomEventHistory.setHistoryRandomEventFiredCounter(firedEventsKey.toLowerCase(), 1);\n                        }\n                    }\n                });\n                delete variables.randomEventFiredEvents;\n                this.isLoaded = true;\n            }\n            if (variables.randomEventFiredTags !== undefined) {\n                var firedTags_1 = JSON.parse(variables.randomEventFiredTags);\n                Object.keys(firedTags_1).forEach(function (firedTagsKey) {\n                    if (firedTagsKey !== \"\") {\n                        if (_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isInteger(firedTags_1[firedTagsKey]) && firedTags_1[firedTagsKey] > 0) {\n                            _this.randomEventHistory.setActualTagFiredCounter(firedTagsKey.toLowerCase(), firedTags_1[firedTagsKey]);\n                            _this.randomEventHistory.setHistoryTagFiredCounter(firedTagsKey.toLowerCase(), firedTags_1[firedTagsKey]);\n                        }\n                        else {\n                            _this.randomEventHistory.setHistoryTagFiredCounter(firedTagsKey.toLowerCase(), 1);\n                        }\n                    }\n                });\n                delete variables.randomEventFiredTags;\n                this.isLoaded = true;\n            }\n            if (variables.randomEventEnabledEvents !== undefined) {\n                var enabledEvents = JSON.parse(variables.randomEventEnabledEvents);\n                if (_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isArray(enabledEvents)) {\n                    enabledEvents.forEach(function (eventName) {\n                        if (_this.randomEventCollection.has(eventName)) {\n                            _this.randomEventCollection.enable(eventName);\n                            _this.randomEventHistory.enable(eventName, false);\n                        }\n                    });\n                }\n                delete variables.randomEventEnabledEvents;\n                this.isLoaded = true;\n            }\n            if (variables.randomEventDisabledEvents !== undefined) {\n                var disabledEvents = JSON.parse(variables.randomEventDisabledEvents);\n                if (_tools_TypeChecker__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isArray(disabledEvents)) {\n                    disabledEvents.forEach(function (eventName) {\n                        if (_this.randomEventCollection.has(eventName)) {\n                            _this.randomEventCollection.disable(eventName);\n                            _this.randomEventHistory.disable(eventName, false);\n                        }\n                    });\n                }\n                delete variables.randomEventDisabledEvents;\n                this.isLoaded = true;\n            }\n            if (this.isLoaded) {\n                this.randomEventHistory.store();\n            }\n        }\n    };\n    return StateLoader;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StateLoader);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/StateLoader.ts?");

/***/ }),

/***/ "./src/Tags.ts":
/*!*********************!*\
  !*** ./src/Tags.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Tags = /** @class */ (function () {\n    function Tags(tags) {\n        var _this = this;\n        this.isHaveTweeScriptTags = false;\n        this.tags = [];\n        this.stringTags = [];\n        tags.forEach(function (tag) {\n            if (Tags.isHaveTweeScript(tag)) {\n                _this.tags.push({\n                    isHaveTweeScript: true,\n                    tag: tag,\n                });\n                _this.isHaveTweeScriptTags = true;\n            }\n            else {\n                tag = tag.toLowerCase().trim().replace(' ', '__');\n                _this.tags.push({\n                    isHaveTweeScript: false,\n                    tag: tag,\n                });\n                _this.stringTags.push(tag);\n            }\n        });\n        this.stringTags.sort();\n        if (!this.isHaveTweeScriptTags) {\n            this.tags = null;\n        }\n    }\n    Tags.isHaveTweeScript = function (tag) {\n        return !(/^\\w+[\\w_\\- ]+$/.test(tag));\n    };\n    Tags.createFromTagsDefinition = function (tagsDefinition) {\n        if (tagsDefinition === undefined) {\n            return new Tags([]);\n        }\n        else {\n            if (!Array.isArray(tagsDefinition)) {\n                throw new Error(\"\\\"definition.tags\\\" should be array\");\n            }\n            return new Tags(tagsDefinition.map(function (tag) {\n                if (typeof tag !== 'string') {\n                    throw new Error(\"\\\"definition.tags[...]\\\" should be string\");\n                }\n                return tag;\n            }));\n        }\n    };\n    Object.defineProperty(Tags.prototype, \"length\", {\n        get: function () {\n            if (!this.isHaveTweeScriptTags) {\n                return this.stringTags.length;\n            }\n            else {\n                return this.tags.length;\n            }\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Tags.prototype.getStringTags = function () {\n        return this.stringTags;\n    };\n    Tags.prototype.getCompiledTags = function () {\n        if (!this.isHaveTweeScriptTags) {\n            return this.stringTags;\n        }\n        else {\n            return this.tags.map(function (tag) {\n                if (!tag.isHaveTweeScript) {\n                    return tag.tag;\n                }\n                else {\n                    try {\n                        return Scripting.evalJavaScript((Scripting.parse(tag.tag))).toLowerCase().trim().replace(' ', '__');\n                    }\n                    catch (err) {\n                        throw new Error(\"Invalid random event scripted tag: \" + tag.tag);\n                    }\n                }\n            }).sort();\n        }\n    };\n    Tags.prototype.toStringKey = function () {\n        return this.getCompiledTags().join('_');\n    };\n    return Tags;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tags);\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/Tags.ts?");

/***/ }),

/***/ "./src/enum/GroupType.ts":
/*!*******************************!*\
  !*** ./src/enum/GroupType.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GroupType: () => (/* binding */ GroupType)\n/* harmony export */ });\nvar GroupType;\n(function (GroupType) {\n    GroupType[\"Random\"] = \"random\";\n    GroupType[\"Sequential\"] = \"sequential\";\n})(GroupType || (GroupType = {}));\n\n\n//# sourceURL=webpack://RandomEventAppExport/./src/enum/GroupType.ts?");

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
        'random_event',
        /<<RandomEventDefinition>>(.*)<<\/RandomEventDefinition>>/gms,
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
                var debugLog = 'RE "' + result.randomEvent.name + '"';
                if (result.debugLogCollector.debugLevel > 0) {
                    debugLog = result.debugLogCollector.toString();
                }
                this.debugView.name = 'RE "' + result.randomEvent.name + '"';
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
                re.incrementCounters(result.randomEvent, result.usedTags);

                if (result.randomEvent.type === 'embaded') {
                    var $el = jQuery(this.output);
                    $el.wiki(Story.get(result.randomEvent.name).processText());
                } else {
                    re.acquireLock();
                    setTimeout(function() { Engine.play(result.randomEvent.name, true), Engine.minDomActionDelay });
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
                re.incrementCounters(result.randomEvent, result.usedTags);

                if (result.randomEvent.type === 'embaded') {
                    var $el = jQuery(this.output);
                    $el.wiki(Story.get(result.randomEvent.name).processText());
                } else {
                    re.acquireLock();
                    setTimeout(function() { Engine.play(result.randomEvent.name, true), Engine.minDomActionDelay });
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
            return re.randomEventHistory.getHistoryFiredEventCount(passageName) > 0;
        }

        return re.randomEventHistory.getActualFiredEventCount(passageName) > 0;
    }

    window.isRETagFired = (tag = '', isUseHistory = true) => {
        if (isUseHistory) {
            return re.randomEventHistory.getHistoryFiredTagCount(tag) > 0;
        }

        return re.randomEventHistory.getActualFiredTagCount(tag) > 0;
    }
}());
