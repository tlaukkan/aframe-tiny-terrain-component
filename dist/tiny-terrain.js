/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/color-interpolate/index.js":
/*!*************************************************!*\
  !*** ./node_modules/color-interpolate/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\r\n * @module  color-interpolate\r\n * Pick color from palette by index\r\n */\r\n\r\nconst parse = __webpack_require__(/*! color-parse */ \"./node_modules/color-parse/index.js\");\r\nconst hsl = __webpack_require__(/*! color-space/hsl */ \"./node_modules/color-space/hsl.js\");\r\nconst lerp = __webpack_require__(/*! lerp */ \"./node_modules/lerp/index.js\");\r\nconst clamp = __webpack_require__(/*! mumath/clamp */ \"./node_modules/mumath/clamp.js\");\r\n\r\nmodule.exports = interpolate;\r\n\r\nfunction interpolate (palette) {\r\n\tpalette = palette.map(c => {\r\n\t\tc = parse(c);\r\n\t\tif (c.space != 'rgb') {\r\n\t\t\tif (c.space != 'hsl') throw `${c.space} space is not supported.`;\r\n\t\t\tc.values = hsl.rgb(c.values);\r\n\t\t}\r\n\t\tc.values.push(c.alpha);\r\n\t\treturn c.values;\r\n\t});\r\n\r\n\treturn (t, mix = lerp) => {\r\n\t\tt = clamp(t, 0, 1);\r\n\r\n\t\tlet idx = ( palette.length - 1 ) * t,\r\n\t\t\tlIdx = Math.floor( idx ),\r\n\t\t\trIdx = Math.ceil( idx );\r\n\r\n\t\tt = idx - lIdx;\r\n\r\n\t\tlet lColor = palette[lIdx], rColor = palette[rIdx];\r\n\r\n\t\tlet result = lColor.map((v, i) => {\r\n\t\t\tv = mix(v, rColor[i], t);\r\n\t\t\tif (i < 3) v = Math.round(v);\r\n\t\t\treturn v;\r\n\t\t});\r\n\r\n\t\tif (result[3] === 1) {\r\n\t\t\treturn `rgb(${result.slice(0,3)})`;\r\n\t\t}\r\n\t\treturn `rgba(${result})`;\r\n\t};\r\n}\r\n\n\n//# sourceURL=webpack:///./node_modules/color-interpolate/index.js?");

/***/ }),

/***/ "./node_modules/color-name/index.js":
/*!******************************************!*\
  !*** ./node_modules/color-name/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\r\n\t\"aliceblue\": [240, 248, 255],\r\n\t\"antiquewhite\": [250, 235, 215],\r\n\t\"aqua\": [0, 255, 255],\r\n\t\"aquamarine\": [127, 255, 212],\r\n\t\"azure\": [240, 255, 255],\r\n\t\"beige\": [245, 245, 220],\r\n\t\"bisque\": [255, 228, 196],\r\n\t\"black\": [0, 0, 0],\r\n\t\"blanchedalmond\": [255, 235, 205],\r\n\t\"blue\": [0, 0, 255],\r\n\t\"blueviolet\": [138, 43, 226],\r\n\t\"brown\": [165, 42, 42],\r\n\t\"burlywood\": [222, 184, 135],\r\n\t\"cadetblue\": [95, 158, 160],\r\n\t\"chartreuse\": [127, 255, 0],\r\n\t\"chocolate\": [210, 105, 30],\r\n\t\"coral\": [255, 127, 80],\r\n\t\"cornflowerblue\": [100, 149, 237],\r\n\t\"cornsilk\": [255, 248, 220],\r\n\t\"crimson\": [220, 20, 60],\r\n\t\"cyan\": [0, 255, 255],\r\n\t\"darkblue\": [0, 0, 139],\r\n\t\"darkcyan\": [0, 139, 139],\r\n\t\"darkgoldenrod\": [184, 134, 11],\r\n\t\"darkgray\": [169, 169, 169],\r\n\t\"darkgreen\": [0, 100, 0],\r\n\t\"darkgrey\": [169, 169, 169],\r\n\t\"darkkhaki\": [189, 183, 107],\r\n\t\"darkmagenta\": [139, 0, 139],\r\n\t\"darkolivegreen\": [85, 107, 47],\r\n\t\"darkorange\": [255, 140, 0],\r\n\t\"darkorchid\": [153, 50, 204],\r\n\t\"darkred\": [139, 0, 0],\r\n\t\"darksalmon\": [233, 150, 122],\r\n\t\"darkseagreen\": [143, 188, 143],\r\n\t\"darkslateblue\": [72, 61, 139],\r\n\t\"darkslategray\": [47, 79, 79],\r\n\t\"darkslategrey\": [47, 79, 79],\r\n\t\"darkturquoise\": [0, 206, 209],\r\n\t\"darkviolet\": [148, 0, 211],\r\n\t\"deeppink\": [255, 20, 147],\r\n\t\"deepskyblue\": [0, 191, 255],\r\n\t\"dimgray\": [105, 105, 105],\r\n\t\"dimgrey\": [105, 105, 105],\r\n\t\"dodgerblue\": [30, 144, 255],\r\n\t\"firebrick\": [178, 34, 34],\r\n\t\"floralwhite\": [255, 250, 240],\r\n\t\"forestgreen\": [34, 139, 34],\r\n\t\"fuchsia\": [255, 0, 255],\r\n\t\"gainsboro\": [220, 220, 220],\r\n\t\"ghostwhite\": [248, 248, 255],\r\n\t\"gold\": [255, 215, 0],\r\n\t\"goldenrod\": [218, 165, 32],\r\n\t\"gray\": [128, 128, 128],\r\n\t\"green\": [0, 128, 0],\r\n\t\"greenyellow\": [173, 255, 47],\r\n\t\"grey\": [128, 128, 128],\r\n\t\"honeydew\": [240, 255, 240],\r\n\t\"hotpink\": [255, 105, 180],\r\n\t\"indianred\": [205, 92, 92],\r\n\t\"indigo\": [75, 0, 130],\r\n\t\"ivory\": [255, 255, 240],\r\n\t\"khaki\": [240, 230, 140],\r\n\t\"lavender\": [230, 230, 250],\r\n\t\"lavenderblush\": [255, 240, 245],\r\n\t\"lawngreen\": [124, 252, 0],\r\n\t\"lemonchiffon\": [255, 250, 205],\r\n\t\"lightblue\": [173, 216, 230],\r\n\t\"lightcoral\": [240, 128, 128],\r\n\t\"lightcyan\": [224, 255, 255],\r\n\t\"lightgoldenrodyellow\": [250, 250, 210],\r\n\t\"lightgray\": [211, 211, 211],\r\n\t\"lightgreen\": [144, 238, 144],\r\n\t\"lightgrey\": [211, 211, 211],\r\n\t\"lightpink\": [255, 182, 193],\r\n\t\"lightsalmon\": [255, 160, 122],\r\n\t\"lightseagreen\": [32, 178, 170],\r\n\t\"lightskyblue\": [135, 206, 250],\r\n\t\"lightslategray\": [119, 136, 153],\r\n\t\"lightslategrey\": [119, 136, 153],\r\n\t\"lightsteelblue\": [176, 196, 222],\r\n\t\"lightyellow\": [255, 255, 224],\r\n\t\"lime\": [0, 255, 0],\r\n\t\"limegreen\": [50, 205, 50],\r\n\t\"linen\": [250, 240, 230],\r\n\t\"magenta\": [255, 0, 255],\r\n\t\"maroon\": [128, 0, 0],\r\n\t\"mediumaquamarine\": [102, 205, 170],\r\n\t\"mediumblue\": [0, 0, 205],\r\n\t\"mediumorchid\": [186, 85, 211],\r\n\t\"mediumpurple\": [147, 112, 219],\r\n\t\"mediumseagreen\": [60, 179, 113],\r\n\t\"mediumslateblue\": [123, 104, 238],\r\n\t\"mediumspringgreen\": [0, 250, 154],\r\n\t\"mediumturquoise\": [72, 209, 204],\r\n\t\"mediumvioletred\": [199, 21, 133],\r\n\t\"midnightblue\": [25, 25, 112],\r\n\t\"mintcream\": [245, 255, 250],\r\n\t\"mistyrose\": [255, 228, 225],\r\n\t\"moccasin\": [255, 228, 181],\r\n\t\"navajowhite\": [255, 222, 173],\r\n\t\"navy\": [0, 0, 128],\r\n\t\"oldlace\": [253, 245, 230],\r\n\t\"olive\": [128, 128, 0],\r\n\t\"olivedrab\": [107, 142, 35],\r\n\t\"orange\": [255, 165, 0],\r\n\t\"orangered\": [255, 69, 0],\r\n\t\"orchid\": [218, 112, 214],\r\n\t\"palegoldenrod\": [238, 232, 170],\r\n\t\"palegreen\": [152, 251, 152],\r\n\t\"paleturquoise\": [175, 238, 238],\r\n\t\"palevioletred\": [219, 112, 147],\r\n\t\"papayawhip\": [255, 239, 213],\r\n\t\"peachpuff\": [255, 218, 185],\r\n\t\"peru\": [205, 133, 63],\r\n\t\"pink\": [255, 192, 203],\r\n\t\"plum\": [221, 160, 221],\r\n\t\"powderblue\": [176, 224, 230],\r\n\t\"purple\": [128, 0, 128],\r\n\t\"rebeccapurple\": [102, 51, 153],\r\n\t\"red\": [255, 0, 0],\r\n\t\"rosybrown\": [188, 143, 143],\r\n\t\"royalblue\": [65, 105, 225],\r\n\t\"saddlebrown\": [139, 69, 19],\r\n\t\"salmon\": [250, 128, 114],\r\n\t\"sandybrown\": [244, 164, 96],\r\n\t\"seagreen\": [46, 139, 87],\r\n\t\"seashell\": [255, 245, 238],\r\n\t\"sienna\": [160, 82, 45],\r\n\t\"silver\": [192, 192, 192],\r\n\t\"skyblue\": [135, 206, 235],\r\n\t\"slateblue\": [106, 90, 205],\r\n\t\"slategray\": [112, 128, 144],\r\n\t\"slategrey\": [112, 128, 144],\r\n\t\"snow\": [255, 250, 250],\r\n\t\"springgreen\": [0, 255, 127],\r\n\t\"steelblue\": [70, 130, 180],\r\n\t\"tan\": [210, 180, 140],\r\n\t\"teal\": [0, 128, 128],\r\n\t\"thistle\": [216, 191, 216],\r\n\t\"tomato\": [255, 99, 71],\r\n\t\"turquoise\": [64, 224, 208],\r\n\t\"violet\": [238, 130, 238],\r\n\t\"wheat\": [245, 222, 179],\r\n\t\"white\": [255, 255, 255],\r\n\t\"whitesmoke\": [245, 245, 245],\r\n\t\"yellow\": [255, 255, 0],\r\n\t\"yellowgreen\": [154, 205, 50]\r\n};\n\n//# sourceURL=webpack:///./node_modules/color-name/index.js?");

/***/ }),

/***/ "./node_modules/color-parse/index.js":
/*!*******************************************!*\
  !*** ./node_modules/color-parse/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {/**\r\n * @module color-parse\r\n */\r\n\r\n\r\n\r\nvar names = __webpack_require__(/*! color-name */ \"./node_modules/color-name/index.js\")\r\nvar isObject = __webpack_require__(/*! is-plain-obj */ \"./node_modules/is-plain-obj/index.js\")\r\nvar defined = __webpack_require__(/*! defined */ \"./node_modules/defined/index.js\")\r\n\r\nmodule.exports = parse\r\n\r\n/**\r\n * Base hues\r\n * http://dev.w3.org/csswg/css-color/#typedef-named-hue\r\n */\r\n//FIXME: use external hue detector\r\nvar baseHues = {\r\n\tred: 0,\r\n\torange: 60,\r\n\tyellow: 120,\r\n\tgreen: 180,\r\n\tblue: 240,\r\n\tpurple: 300\r\n}\r\n\r\n/**\r\n * Parse color from the string passed\r\n *\r\n * @return {Object} A space indicator `space`, an array `values` and `alpha`\r\n */\r\nfunction parse (cstr) {\r\n\tvar m, parts = [], alpha = 1, space\r\n\r\n\tif (typeof cstr === 'string') {\r\n\t\t//keyword\r\n\t\tif (names[cstr]) {\r\n\t\t\tparts = names[cstr].slice()\r\n\t\t\tspace = 'rgb'\r\n\t\t}\r\n\r\n\t\t//reserved words\r\n\t\telse if (cstr === 'transparent') {\r\n\t\t\talpha = 0\r\n\t\t\tspace = 'rgb'\r\n\t\t\tparts = [0,0,0]\r\n\t\t}\r\n\r\n\t\t//hex\r\n\t\telse if (/^#[A-Fa-f0-9]+$/.test(cstr)) {\r\n\t\t\tvar base = cstr.slice(1)\r\n\t\t\tvar size = base.length\r\n\t\t\tvar isShort = size <= 4\r\n\t\t\talpha = 1\r\n\r\n\t\t\tif (isShort) {\r\n\t\t\t\tparts = [\r\n\t\t\t\t\tparseInt(base[0] + base[0], 16),\r\n\t\t\t\t\tparseInt(base[1] + base[1], 16),\r\n\t\t\t\t\tparseInt(base[2] + base[2], 16)\r\n\t\t\t\t]\r\n\t\t\t\tif (size === 4) {\r\n\t\t\t\t\talpha = parseInt(base[3] + base[3], 16) / 255\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\telse {\r\n\t\t\t\tparts = [\r\n\t\t\t\t\tparseInt(base[0] + base[1], 16),\r\n\t\t\t\t\tparseInt(base[2] + base[3], 16),\r\n\t\t\t\t\tparseInt(base[4] + base[5], 16)\r\n\t\t\t\t]\r\n\t\t\t\tif (size === 8) {\r\n\t\t\t\t\talpha = parseInt(base[6] + base[7], 16) / 255\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\tif (!parts[0]) parts[0] = 0\r\n\t\t\tif (!parts[1]) parts[1] = 0\r\n\t\t\tif (!parts[2]) parts[2] = 0\r\n\r\n\t\t\tspace = 'rgb'\r\n\t\t}\r\n\r\n\t\t//color space\r\n\t\telse if (m = /^((?:rgb|hs[lvb]|hwb|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms)a?)\\s*\\(([^\\)]*)\\)/.exec(cstr)) {\r\n\t\t\tvar name = m[1]\r\n\t\t\tvar base = name.replace(/a$/, '')\r\n\t\t\tspace = base\r\n\t\t\tvar size = base === 'cmyk' ? 4 : base === 'gray' ? 1 : 3\r\n\t\t\tparts = m[2].trim()\r\n\t\t\t\t.split(/\\s*,\\s*/)\r\n\t\t\t\t.map(function (x, i) {\r\n\t\t\t\t\t//<percentage>\r\n\t\t\t\t\tif (/%$/.test(x)) {\r\n\t\t\t\t\t\t//alpha\r\n\t\t\t\t\t\tif (i === size)\treturn parseFloat(x) / 100\r\n\t\t\t\t\t\t//rgb\r\n\t\t\t\t\t\tif (base === 'rgb') return parseFloat(x) * 255 / 100\r\n\t\t\t\t\t\treturn parseFloat(x)\r\n\t\t\t\t\t}\r\n\t\t\t\t\t//hue\r\n\t\t\t\t\telse if (base[i] === 'h') {\r\n\t\t\t\t\t\t//<deg>\r\n\t\t\t\t\t\tif (/deg$/.test(x)) {\r\n\t\t\t\t\t\t\treturn parseFloat(x)\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\t//<base-hue>\r\n\t\t\t\t\t\telse if (baseHues[x] !== undefined) {\r\n\t\t\t\t\t\t\treturn baseHues[x]\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t\treturn parseFloat(x)\r\n\t\t\t\t})\r\n\r\n\t\t\tif (name === base) parts.push(1)\r\n\t\t\talpha = parts[size] === undefined ? 1 : parts[size]\r\n\t\t\tparts = parts.slice(0, size)\r\n\t\t}\r\n\r\n\t\t//named channels case\r\n\t\telse if (cstr.length > 10 && /[0-9](?:\\s|\\/)/.test(cstr)) {\r\n\t\t\tparts = cstr.match(/([0-9]+)/g).map(function (value) {\r\n\t\t\t\treturn parseFloat(value)\r\n\t\t\t})\r\n\r\n\t\t\tspace = cstr.match(/([a-z])/ig).join('').toLowerCase()\r\n\t\t}\r\n\t}\r\n\r\n\t//numeric case\r\n\telse if (!isNaN(cstr)) {\r\n\t\tspace = 'rgb'\r\n\t\tparts = [cstr >>> 16, (cstr & 0x00ff00) >>> 8, cstr & 0x0000ff]\r\n\t}\r\n\r\n\t//object case - detects css cases of rgb and hsl\r\n\telse if (isObject(cstr)) {\r\n\t\tvar r = defined(cstr.r, cstr.red, cstr.R, null)\r\n\r\n\t\tif (r !== null) {\r\n\t\t\tspace = 'rgb'\r\n\t\t\tparts = [\r\n\t\t\t\tr,\r\n\t\t\t\tdefined(cstr.g, cstr.green, cstr.G),\r\n\t\t\t\tdefined(cstr.b, cstr.blue, cstr.B)\r\n\t\t\t]\r\n\t\t}\r\n\t\telse {\r\n\t\t\tspace = 'hsl'\r\n\t\t\tparts = [\r\n\t\t\t\tdefined(cstr.h, cstr.hue, cstr.H),\r\n\t\t\t\tdefined(cstr.s, cstr.saturation, cstr.S),\r\n\t\t\t\tdefined(cstr.l, cstr.lightness, cstr.L, cstr.b, cstr.brightness)\r\n\t\t\t]\r\n\t\t}\r\n\r\n\t\talpha = defined(cstr.a, cstr.alpha, cstr.opacity, 1)\r\n\r\n\t\tif (cstr.opacity != null) alpha /= 100\r\n\t}\r\n\r\n\t//array\r\n\telse if (Array.isArray(cstr) || global.ArrayBuffer && ArrayBuffer.isView && ArrayBuffer.isView(cstr)) {\r\n\t\tparts = [cstr[0], cstr[1], cstr[2]]\r\n\t\tspace = 'rgb'\r\n\t\talpha = cstr.length === 4 ? cstr[3] : 1\r\n\t}\r\n\r\n\treturn {\r\n\t\tspace: space,\r\n\t\tvalues: parts,\r\n\t\talpha: alpha\r\n\t}\r\n}\r\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/color-parse/index.js?");

/***/ }),

/***/ "./node_modules/color-space/hsl.js":
/*!*****************************************!*\
  !*** ./node_modules/color-space/hsl.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * @module color-space/hsl\n */\n\n\nvar rgb = __webpack_require__(/*! ./rgb */ \"./node_modules/color-space/rgb.js\");\n\nmodule.exports = {\n\tname: 'hsl',\n\tmin: [0,0,0],\n\tmax: [360,100,100],\n\tchannel: ['hue', 'saturation', 'lightness'],\n\talias: ['HSL'],\n\n\trgb: function(hsl) {\n\t\tvar h = hsl[0] / 360,\n\t\t\t\ts = hsl[1] / 100,\n\t\t\t\tl = hsl[2] / 100,\n\t\t\t\tt1, t2, t3, rgb, val;\n\n\t\tif (s === 0) {\n\t\t\tval = l * 255;\n\t\t\treturn [val, val, val];\n\t\t}\n\n\t\tif (l < 0.5) {\n\t\t\tt2 = l * (1 + s);\n\t\t}\n\t\telse {\n\t\t\tt2 = l + s - l * s;\n\t\t}\n\t\tt1 = 2 * l - t2;\n\n\t\trgb = [0, 0, 0];\n\t\tfor (var i = 0; i < 3; i++) {\n\t\t\tt3 = h + 1 / 3 * - (i - 1);\n\t\t\tif (t3 < 0) {\n\t\t\t\tt3++;\n\t\t\t}\n\t\t\telse if (t3 > 1) {\n\t\t\t\tt3--;\n\t\t\t}\n\n\t\t\tif (6 * t3 < 1) {\n\t\t\t\tval = t1 + (t2 - t1) * 6 * t3;\n\t\t\t}\n\t\t\telse if (2 * t3 < 1) {\n\t\t\t\tval = t2;\n\t\t\t}\n\t\t\telse if (3 * t3 < 2) {\n\t\t\t\tval = t1 + (t2 - t1) * (2 / 3 - t3) * 6;\n\t\t\t}\n\t\t\telse {\n\t\t\t\tval = t1;\n\t\t\t}\n\n\t\t\trgb[i] = val * 255;\n\t\t}\n\n\t\treturn rgb;\n\t}\n};\n\n\n//extend rgb\nrgb.hsl = function(rgb) {\n\tvar r = rgb[0]/255,\n\t\t\tg = rgb[1]/255,\n\t\t\tb = rgb[2]/255,\n\t\t\tmin = Math.min(r, g, b),\n\t\t\tmax = Math.max(r, g, b),\n\t\t\tdelta = max - min,\n\t\t\th, s, l;\n\n\tif (max === min) {\n\t\th = 0;\n\t}\n\telse if (r === max) {\n\t\th = (g - b) / delta;\n\t}\n\telse if (g === max) {\n\t\th = 2 + (b - r) / delta;\n\t}\n\telse if (b === max) {\n\t\th = 4 + (r - g)/ delta;\n\t}\n\n\th = Math.min(h * 60, 360);\n\n\tif (h < 0) {\n\t\th += 360;\n\t}\n\n\tl = (min + max) / 2;\n\n\tif (max === min) {\n\t\ts = 0;\n\t}\n\telse if (l <= 0.5) {\n\t\ts = delta / (max + min);\n\t}\n\telse {\n\t\ts = delta / (2 - max - min);\n\t}\n\n\treturn [h, s * 100, l * 100];\n};\n\n\n//# sourceURL=webpack:///./node_modules/color-space/hsl.js?");

/***/ }),

/***/ "./node_modules/color-space/rgb.js":
/*!*****************************************!*\
  !*** ./node_modules/color-space/rgb.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * RGB space.\n *\n * @module  color-space/rgb\n */\n\n\nmodule.exports = {\n\tname: 'rgb',\n\tmin: [0,0,0],\n\tmax: [255,255,255],\n\tchannel: ['red', 'green', 'blue'],\n\talias: ['RGB']\n};\n\n\n//# sourceURL=webpack:///./node_modules/color-space/rgb.js?");

/***/ }),

/***/ "./node_modules/defined/index.js":
/*!***************************************!*\
  !*** ./node_modules/defined/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function () {\n    for (var i = 0; i < arguments.length; i++) {\n        if (arguments[i] !== undefined) return arguments[i];\n    }\n};\n\n\n//# sourceURL=webpack:///./node_modules/defined/index.js?");

/***/ }),

/***/ "./node_modules/is-plain-obj/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-plain-obj/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar toString = Object.prototype.toString;\n\nmodule.exports = function (x) {\n\tvar prototype;\n\treturn toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));\n};\n\n\n//# sourceURL=webpack:///./node_modules/is-plain-obj/index.js?");

/***/ }),

/***/ "./node_modules/lerp/index.js":
/*!************************************!*\
  !*** ./node_modules/lerp/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function lerp(v0, v1, t) {\n    return v0*(1-t)+v1*t\n}\nmodule.exports = lerp\n\n//# sourceURL=webpack:///./node_modules/lerp/index.js?");

/***/ }),

/***/ "./node_modules/mumath/clamp.js":
/*!**************************************!*\
  !*** ./node_modules/mumath/clamp.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\r\n * Clamp value.\r\n * Detects proper clamp min/max.\r\n *\r\n * @param {number} a Current value to cut off\r\n * @param {number} min One side limit\r\n * @param {number} max Other side limit\r\n *\r\n * @return {number} Clamped value\r\n */\r\n\r\nmodule.exports = function(a, min, max){\r\n\treturn max > min ? Math.max(Math.min(a,max),min) : Math.max(Math.min(a,min),max);\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/mumath/clamp.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/* global AFRAME, THREE */\nvar interpolate = __webpack_require__(/*! color-interpolate */ \"./node_modules/color-interpolate/index.js\");\n\nif (typeof AFRAME === 'undefined') {\n    throw new Error('AFRAME not available.');\n}\n\nif (typeof THREE === 'undefined') {\n    throw new Error('THREE not available.');\n}\n\nvar TinyTerrain = function TinyTerrain() {\n    _classCallCheck(this, TinyTerrain);\n\n    this.heightFunctions = new Map();\n    this.heightFunctions.set('default', function (x, y) {\n        return 0;\n    });\n\n    this.colorFunctions = new Map();\n    this.colorFunctions.set('default', function (y, colorPalette, paletteRangeMin, paletteRangeMax, paletteAccuracy, colorCache) {\n        var i = ((y - paletteRangeMin) / (paletteRangeMax - paletteRangeMin)).toFixed(paletteAccuracy);\n        if (!colorCache.has(i)) {\n            colorCache.set(i, colorPalette(i));\n        }\n        return colorCache.get(i);\n    });\n};\n\nvar Triangle = function Triangle(i, j, primary) {\n    _classCallCheck(this, Triangle);\n\n    this.i = i;\n    this.j = j;\n    this.primary = primary;\n};\n\nwindow.TINY_TERRAIN = new TinyTerrain();\n\n// Unit vectors\nvar ui = 1 / Math.sin(Math.PI / 3);\nvar uj = 1;\n\nAFRAME.registerComponent('tiny-terrain', {\n    schema: {\n        x: { type: 'number', default: 0 },\n        y: { type: 'number', default: 0 },\n        z: { type: 'number', default: 0 },\n        radiusEdgeCount: { type: 'number', default: 300 },\n        edgeLength: { type: 'number', default: 1 },\n        heightFunction: { type: 'string', default: 'default' },\n        colorFunction: { type: 'string', default: 'default' },\n        palette: { type: 'string', default: '#4f654e, #606f4e, #818553, #9b9557, #bab269, #c4bc74' },\n        paletteAccuracy: { type: 'number', default: 2 },\n        paletteRangeMin: { type: 'number', default: -10 },\n        paletteRangeMax: { type: 'number', default: 10 }\n    },\n\n    /**\r\n     * Initial creation and setting of the mesh.\r\n     */\n    init: function init() {\n        var _this = this;\n\n        var data = this.data;\n        var el = this.el;\n\n        this.edgeLength = data.edgeLength;\n        this.edgeLengthSquared = this.edgeLength * this.edgeLength;\n        this.radiusEdgeCount = data.radiusEdgeCount;\n        this.radiusEdgeCountSquared = this.radiusEdgeCount * this.radiusEdgeCount;\n        this.terrainUpdateDistanceSquared = Math.pow(this.radiusEdgeCount / 2, 2);\n        var paletteRangeMin = data.paletteRangeMin;\n        var paletteRangeMax = data.paletteRangeMax;\n        var palette = data.palette.split(\",\").map(function (item) {\n            return item.trim();\n        });\n        var paletteAccuracy = data.paletteAccuracy;\n        var colorPalette = interpolate(palette);\n        var colorCache = new Map();\n\n        var getHeight = window.TINY_TERRAIN.heightFunctions.get(data.heightFunction);\n        var getColor = window.TINY_TERRAIN.colorFunctions.get(data.colorFunction);\n\n        this.triangles = new Array(Math.pow(2 * this.radiusEdgeCount + 1, 2));\n        this.vertices = new Array(2 * this.radiusEdgeCount + 1);\n        this.vertexIndices = new Array(2 * this.radiusEdgeCount + 1);\n        this.primaryFaces = new Array(2 * this.radiusEdgeCount + 1);\n        this.secondaryFaces = new Array(2 * this.radiusEdgeCount + 1);\n\n        for (var i = 0; i < 2 * this.radiusEdgeCount + 1; i++) {\n            this.vertices[i] = new Array(2 * this.radiusEdgeCount + 1);\n            this.vertexIndices[i] = new Array(2 * this.radiusEdgeCount + 1);\n            this.primaryFaces[i] = new Array(2 * this.radiusEdgeCount + 1);\n            this.secondaryFaces[i] = new Array(2 * this.radiusEdgeCount + 1);\n        }\n\n        this.geometry = new THREE.Geometry();\n\n        var getTriangleDistanceSquared = function getTriangleDistanceSquared(i, j, primary) {\n            if (primary) {\n                return Math.pow((i + 0.5) * ui + j * ui / 2, 2) + Math.pow((j + 0.5) * uj, 2);\n            } else {\n                return Math.pow((i + 1) * ui + j * ui / 2, 2) + Math.pow((j + 0.5) * uj, 2);\n            }\n        };\n\n        var updateVertex = function updateVertex(i, j, cx, cy, cz, vi, add) {\n            var x = cx + _this.edgeLength * (i * ui + j * ui / 2);\n            var z = cz + _this.edgeLength * (j * uj);\n            var y = cy + getHeight(x, z);\n            if (!_this.vertices[i + _this.radiusEdgeCount][j + _this.radiusEdgeCount]) {\n                var vertex = new THREE.Vector3(x, y, z);\n                _this.vertices[i + _this.radiusEdgeCount][j + _this.radiusEdgeCount] = vertex;\n                _this.vertexIndices[i + _this.radiusEdgeCount][j + _this.radiusEdgeCount] = vi;\n\n                _this.geometry.vertices.push(vertex);\n                return vi + 1;\n            } else {\n                if (!add) {\n                    var _vertex = _this.vertices[i + _this.radiusEdgeCount][j + _this.radiusEdgeCount];\n                    _vertex.x = x;_vertex.y = y;_vertex.z = z;\n                }\n            }\n            return vi;\n        };\n\n        var updateVertices = function updateVertices(i, j, cx, cy, cz, vi, primary, add) {\n            if (primary) {\n                vi = updateVertex(i, j, cx, cy, cz, vi, add);\n                vi = updateVertex(i, j + 1, cx, cy, cz, vi, add);\n                vi = updateVertex(i + 1, j, cx, cy, cz, vi, add);\n            } else {\n                vi = updateVertex(i, j + 1, cx, cy, cz, vi, add);\n                vi = updateVertex(i + 1, j + 1, cx, cy, cz, vi, add);\n                vi = updateVertex(i + 1, j, cx, cy, cz, vi, add);\n            }\n            return vi;\n        };\n\n        var setFaceVertexColor = function setFaceVertexColor(face, index, vi0, cy) {\n            face.vertexColors[index] = new THREE.Color(getColor(_this.geometry.vertices[vi0].y - cy, colorPalette, paletteRangeMin, paletteRangeMax, paletteAccuracy, colorCache));\n        };\n\n        var getVertexIndex = function getVertexIndex(i, j) {\n            return _this.vertexIndices[i + _this.radiusEdgeCount][j + _this.radiusEdgeCount];\n        };\n\n        var updateFaces = function updateFaces(i, j, cx, cy, cz, primary, add) {\n            var vi0 = primary ? getVertexIndex(i, j) : getVertexIndex(i, j + 1);\n            var vi1 = primary ? getVertexIndex(i, j + 1) : getVertexIndex(i + 1, j + 1);\n            var vi2 = primary ? getVertexIndex(i + 1, j) : getVertexIndex(i + 1, j);\n\n            var faces = primary ? _this.primaryFaces : _this.secondaryFaces;\n            var face = add ? new THREE.Face3(vi0, vi1, vi2) : faces[i + _this.radiusEdgeCount][j + _this.radiusEdgeCount];\n            setFaceVertexColor(face, 0, vi0, cy);\n            setFaceVertexColor(face, 1, vi1, cy);\n            setFaceVertexColor(face, 2, vi2, cy);\n\n            if (add) {\n                _this.geometry.faces.push(face);\n                faces[i + _this.radiusEdgeCount][j + _this.radiusEdgeCount] = face;\n            }\n        };\n\n        this.updateTerrain = function (cx, cy, cz, add) {\n\n            var vi = 0;\n            _this.triangles.forEach(function (t) {\n                vi = updateVertices(t.i, t.j, cx, cy, cz, vi, t.primary, add);\n                updateFaces(t.i, t.j, cx, cy, cz, t.primary, add);\n            });\n\n            _this.geometry.computeFaceNormals();\n            _this.geometry.computeVertexNormals();\n            _this.geometry.computeBoundingSphere();\n            _this.geometry.verticesNeedUpdate = true;\n            _this.geometry.elementsNeedUpdate = true;\n\n            if (add) {\n                _this.material = new THREE.MeshLambertMaterial({ color: 0xffffff, vertexColors: THREE.VertexColors });\n                _this.wireMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd, wireframe: true, vertexColors: THREE.VertexColors });\n                _this.mesh = new THREE.Mesh(_this.geometry, _this.material);\n                _this.wire = new THREE.Mesh(_this.geometry, _this.wireMaterial);\n                el.setObject3D('mesh', _this.mesh);\n                el.setObject3D('wire', _this.wire);\n            }\n        };\n\n        var cx = data.x;\n        var cy = data.y;\n        var cz = data.z;\n        this.cx = cx;\n        this.cy = cy;\n        this.cz = cz;\n\n        for (var _i = -this.radiusEdgeCount; _i < this.radiusEdgeCount; _i += 1) {\n            for (var j = -this.radiusEdgeCount; j < this.radiusEdgeCount; j += 1) {\n                if (getTriangleDistanceSquared(_i, j, true) <= this.radiusEdgeCountSquared) {\n                    this.triangles.push(new Triangle(_i, j, true));\n                }\n                if (getTriangleDistanceSquared(_i, j, false) <= this.radiusEdgeCountSquared) {\n                    this.triangles.push(new Triangle(_i, j, false));\n                }\n            }\n        }\n\n        this.updateTerrain(cx, cy, cz, true);\n    },\n\n    update: function update(oldData) {\n        var data = this.data;\n\n        var cx = (data.x / (2 * ui)).toFixed() * 2 * ui;\n        var cy = data.y;\n        var cz = (data.z / (4 * uj)).toFixed() * 4 * uj;\n\n        if ((this.cx - cx) * (this.cx - cx) + (this.cz - cz) * (this.cz - cz) >= this.terrainUpdateDistanceSquared * this.edgeLengthSquared) {\n            console.log('recalculated terrain at : ' + this.data.x + ',' + this.data.y);\n            this.cx = cx;\n            this.cy = cy;\n            this.cz = cz;\n            this.updateTerrain(cx, cy, cz, false);\n        }\n    }\n\n});\n\nAFRAME.registerPrimitive('a-tiny-terrain', {\n    defaultComponents: {\n        terrain: {}\n    },\n    mappings: {\n        'x': 'tiny-terrain.x',\n        'y': 'tiny-terrain.y',\n        'z': 'tiny-terrain.z',\n        'radius-edge-count': 'tiny-terrain.radiusEdgeCount',\n        'edge-length': 'tiny-terrain.edgeLength',\n        'height-function': 'tiny-terrain.heightFunction',\n        'color-function': 'tiny-terrain.colorFunction',\n        'palette': 'tiny-terrain.palette',\n        'palette-accuracy': 'tiny-terrain.paletteAccuracy',\n        'palette-range-min': 'tiny-terrain.paletteRangeMin',\n        'palette-range-max': 'tiny-terrain.paletteRangeMax'\n    }\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });