"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GlobalContext\": function() { return /* binding */ GlobalContext; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/app */ \"./node_modules/next/app.js\");\n/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/layout */ \"./components/layout.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/api */ \"./lib/api.js\");\n/* harmony import */ var _lib_media__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/media */ \"./lib/media.js\");\n\n\n/*\nfunction MyApp({ Component, pageProps }) {\n  return <Component {...pageProps} />\n}*/ \n\n\n//import \"../assets/css/style.css\";\n\n\n\n// Store Strapi Global object in context\nconst GlobalContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_5__.createContext)({});\nconst MyApp = (param)=>{\n    let { Component , pageProps  } = param;\n    const { global , menusPl  } = pageProps;\n    //console.log('GLOBAL _app.js -----global------ ', global);\n    //console.log('MENUS _app.js menus HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHhh pageProps ', pageProps);\n    console.log(\"MENUS _app.js menus WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW menusPl \", menusPl);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_3___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                    rel: \"shortcut icon\",\n                    href: (0,_lib_media__WEBPACK_IMPORTED_MODULE_7__.getStrapiMedia)(global.attributes.Favicon)\n                }, void 0, false, {\n                    fileName: \"C:\\\\dev\\\\website\\\\frontend\\\\pages\\\\_app.js\",\n                    lineNumber: 26,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\dev\\\\website\\\\frontend\\\\pages\\\\_app.js\",\n                lineNumber: 25,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(GlobalContext.Provider, {\n                value: global.attributes,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_layout__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                    menus: menusPl,\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                        ...pageProps\n                    }, void 0, false, {\n                        fileName: \"C:\\\\dev\\\\website\\\\frontend\\\\pages\\\\_app.js\",\n                        lineNumber: 33,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"C:\\\\dev\\\\website\\\\frontend\\\\pages\\\\_app.js\",\n                    lineNumber: 32,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\dev\\\\website\\\\frontend\\\\pages\\\\_app.js\",\n                lineNumber: 31,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true);\n};\n_c = MyApp;\n// getInitialProps disables automatic static optimization for pages that don't\n// have getStaticProps. So article, category and home pages still get SSG.\n// Hopefully we can replace this with getStaticProps once this issue is fixed:\n// https://github.com/vercel/next.js/discussions/10949\nMyApp.getInitialProps = async (ctx)=>{\n    // Calls page's `getInitialProps` and fills `appProps.pageProps`\n    const appProps = await next_app__WEBPACK_IMPORTED_MODULE_2___default().getInitialProps(ctx);\n    // Fetch global site settings from Strapi\n    const globalRes = await (0,_lib_api__WEBPACK_IMPORTED_MODULE_6__.fetchAPI)(\"/global\", {\n        populate: {\n            Favicon: \"*\",\n            DefaultSeo: {\n                populate: \"*\"\n            }\n        }\n    });\n    const menusRes = await (0,_lib_api__WEBPACK_IMPORTED_MODULE_6__.fetchAPI)(\"/main-menu\", {\n        populate: {\n            MenuTab: {\n                populate: \"*\"\n            },\n            SubMenuItem: {\n                populate: {\n                    page: {\n                        populate: \"*\"\n                    }\n                }\n            }\n        }\n    });\n    const menusPlRes = await (0,_lib_api__WEBPACK_IMPORTED_MODULE_6__.fetchAPI)(\"/menus\", {\n        nested: {\n            populate: \"*\"\n        },\n        populate: {\n            //items: { populate: \"*\" },\n            items: {\n                populate: {\n                    children: {\n                        populate: \"*\"\n                    }\n                }\n            }\n        }\n    });\n    console.log(\"MENUS  _app.js menusPlRes.data ----------------------------- \", menusPlRes.data);\n    const temp = await (0,_lib_api__WEBPACK_IMPORTED_MODULE_6__.fetchAPI)(\"/menus/1\", {\n        nested: {\n            populate: \"*\"\n        },\n        populate: {\n            //items: { populate: \"*\" },\n            items: {\n                populate: {\n                    children: {\n                        populate: \"*\"\n                    }\n                }\n            }\n        }\n    });\n    console.log(\"MENUS  _app.js temp.data ----------------------------- \", temp.data);\n    let menu_items = [];\n    menusPlRes.data.map((menu)=>{\n        //console.log('MENUS  _app.js menusPlRes.data.map menu.attributes.items.data ----------------------------- ', menu.attributes.items.data);\n        //menu_items = menu.attributes.items.data;\n        menu_items = temp.attributes.items.data;\n    //menu_items.map(item => {\n    //console.log('MENUS  _app.js menusPlRes.data.map menu.attributes.items.data = ITEM  ----------------------------- ', item);\n    //console.log('item.id = ', item.id);\n    //console.log('item.attributes.title = ', item.attributes.title);\n    ///console.log('item.attributes.url = ', item.attributes.url);\n    //console.log('item.attributes.children.data = ', item.attributes.children.data);\n    //  if(item.attributes.children.data) {\n    //console.log('---item.attributes.children.data.attributes = ', item.attributes.children.data.attributes);\n    //console.log('---item.attributes.children.data.id = ', item.attributes.children.data.id);\n    //  }\n    //})\n    });\n    // Pass the data to our page via props\n    return {\n        ...appProps,\n        pageProps: {\n            global: globalRes.data,\n            /*menus: menusRes.data,*/ menusPl: menu_items\n        }\n    };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (MyApp);\nvar _c;\n$RefreshReg$(_c, \"MyApp\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJO1lBQUUsdUJBQXVCLEdBQUd6QixTQUFTMkI7UUFBVztJQUFFO0FBQzdHO0FBRUEsK0RBQWUvQixLQUFLQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL19hcHAuanM/ZTBhZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcydcbi8qXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcbiAgcmV0dXJuIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbn0qL1xuaW1wb3J0IEFwcCBmcm9tIFwibmV4dC9hcHBcIjtcbmltcG9ydCBIZWFkIGZyb20gXCJuZXh0L2hlYWRcIjtcbmltcG9ydCBMYXlvdXQgZnJvbSBcIi4uL2NvbXBvbmVudHMvbGF5b3V0XCI7XG4vL2ltcG9ydCBcIi4uL2Fzc2V0cy9jc3Mvc3R5bGUuY3NzXCI7XG5pbXBvcnQgeyBjcmVhdGVDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBmZXRjaEFQSSB9IGZyb20gXCIuLi9saWIvYXBpXCI7XG5pbXBvcnQgeyBnZXRTdHJhcGlNZWRpYSB9IGZyb20gXCIuLi9saWIvbWVkaWFcIjtcblxuLy8gU3RvcmUgU3RyYXBpIEdsb2JhbCBvYmplY3QgaW4gY29udGV4dFxuZXhwb3J0IGNvbnN0IEdsb2JhbENvbnRleHQgPSBjcmVhdGVDb250ZXh0KHt9KTtcblxuY29uc3QgTXlBcHAgPSAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSA9PiB7XG4gIGNvbnN0IHsgZ2xvYmFsLCBtZW51c1BsIH0gPSBwYWdlUHJvcHM7XG4gIC8vY29uc29sZS5sb2coJ0dMT0JBTCBfYXBwLmpzIC0tLS0tZ2xvYmFsLS0tLS0tICcsIGdsb2JhbCk7XG4gIC8vY29uc29sZS5sb2coJ01FTlVTIF9hcHAuanMgbWVudXMgSEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISGhoIHBhZ2VQcm9wcyAnLCBwYWdlUHJvcHMpO1xuICBjb25zb2xlLmxvZygnTUVOVVMgX2FwcC5qcyBtZW51cyBXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXIG1lbnVzUGwgJywgbWVudXNQbCk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDxsaW5rXG4gICAgICAgICAgcmVsPVwic2hvcnRjdXQgaWNvblwiXG4gICAgICAgICAgaHJlZj17Z2V0U3RyYXBpTWVkaWEoZ2xvYmFsLmF0dHJpYnV0ZXMuRmF2aWNvbil9XG4gICAgICAgIC8+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8R2xvYmFsQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17Z2xvYmFsLmF0dHJpYnV0ZXN9PlxuICAgICAgICA8TGF5b3V0IG1lbnVzPXttZW51c1BsfT5cbiAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICAgIDwvTGF5b3V0PlxuICAgICAgPC9HbG9iYWxDb250ZXh0LlByb3ZpZGVyPlxuICAgIDwvPlxuICApO1xufTtcblxuLy8gZ2V0SW5pdGlhbFByb3BzIGRpc2FibGVzIGF1dG9tYXRpYyBzdGF0aWMgb3B0aW1pemF0aW9uIGZvciBwYWdlcyB0aGF0IGRvbid0XG4vLyBoYXZlIGdldFN0YXRpY1Byb3BzLiBTbyBhcnRpY2xlLCBjYXRlZ29yeSBhbmQgaG9tZSBwYWdlcyBzdGlsbCBnZXQgU1NHLlxuLy8gSG9wZWZ1bGx5IHdlIGNhbiByZXBsYWNlIHRoaXMgd2l0aCBnZXRTdGF0aWNQcm9wcyBvbmNlIHRoaXMgaXNzdWUgaXMgZml4ZWQ6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdmVyY2VsL25leHQuanMvZGlzY3Vzc2lvbnMvMTA5NDlcbk15QXBwLmdldEluaXRpYWxQcm9wcyA9IGFzeW5jIChjdHgpID0+IHtcbiAgLy8gQ2FsbHMgcGFnZSdzIGBnZXRJbml0aWFsUHJvcHNgIGFuZCBmaWxscyBgYXBwUHJvcHMucGFnZVByb3BzYFxuICBjb25zdCBhcHBQcm9wcyA9IGF3YWl0IEFwcC5nZXRJbml0aWFsUHJvcHMoY3R4KTtcbiAgLy8gRmV0Y2ggZ2xvYmFsIHNpdGUgc2V0dGluZ3MgZnJvbSBTdHJhcGlcbiAgY29uc3QgZ2xvYmFsUmVzID0gYXdhaXQgZmV0Y2hBUEkoXCIvZ2xvYmFsXCIsIHtcbiAgICBwb3B1bGF0ZToge1xuICAgICAgRmF2aWNvbjogXCIqXCIsXG4gICAgICBEZWZhdWx0U2VvOiB7XG4gICAgICAgIHBvcHVsYXRlOiBcIipcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfSk7XG4gIFxuICBjb25zdCBtZW51c1JlcyA9IGF3YWl0IGZldGNoQVBJKFwiL21haW4tbWVudVwiLCB7IFxuICAgIHBvcHVsYXRlOiB7XG4gICAgICBNZW51VGFiOiB7IHBvcHVsYXRlOiBcIipcIiB9LFxuICAgICAgU3ViTWVudUl0ZW06IHsgcG9wdWxhdGU6IHtcbiAgICAgICAgcGFnZTogeyBwb3B1bGF0ZTogXCIqXCIgfSxcbiAgICAgIH0sXG4gICAgfSB9LFxuICB9KTtcblxuICBjb25zdCBtZW51c1BsUmVzID0gYXdhaXQgZmV0Y2hBUEkoXCIvbWVudXNcIiwgeyBcbiAgICBuZXN0ZWQ6IHsgcG9wdWxhdGU6IFwiKlwiIH0sXG4gICAgcG9wdWxhdGU6IHtcbiAgICAgIC8vaXRlbXM6IHsgcG9wdWxhdGU6IFwiKlwiIH0sXG4gICAgICBpdGVtczogeyBwb3B1bGF0ZToge1xuICAgICAgICBjaGlsZHJlbjogeyBwb3B1bGF0ZTogXCIqXCIgfSxcbiAgICAgIH0sXG4gICAgfSB9LFxuICB9KTtcbiAgY29uc29sZS5sb2coJ01FTlVTICBfYXBwLmpzIG1lbnVzUGxSZXMuZGF0YSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAnLCBtZW51c1BsUmVzLmRhdGEpO1xuICBjb25zdCB0ZW1wID0gYXdhaXQgZmV0Y2hBUEkoXCIvbWVudXMvMVwiLCB7IFxuICAgIG5lc3RlZDogeyBwb3B1bGF0ZTogXCIqXCIgfSxcbiAgICBwb3B1bGF0ZToge1xuICAgICAgLy9pdGVtczogeyBwb3B1bGF0ZTogXCIqXCIgfSxcbiAgICAgIGl0ZW1zOiB7IHBvcHVsYXRlOiB7XG4gICAgICAgIGNoaWxkcmVuOiB7IHBvcHVsYXRlOiBcIipcIiB9LFxuICAgICAgfSxcbiAgICB9IH0sXG4gIH0pO1xuICBjb25zb2xlLmxvZygnTUVOVVMgIF9hcHAuanMgdGVtcC5kYXRhIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICcsIHRlbXAuZGF0YSk7XG4gIGxldCBtZW51X2l0ZW1zID0gW107XG4gIG1lbnVzUGxSZXMuZGF0YS5tYXAobWVudSA9PiB7XG4gICAgLy9jb25zb2xlLmxvZygnTUVOVVMgIF9hcHAuanMgbWVudXNQbFJlcy5kYXRhLm1hcCBtZW51LmF0dHJpYnV0ZXMuaXRlbXMuZGF0YSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAnLCBtZW51LmF0dHJpYnV0ZXMuaXRlbXMuZGF0YSk7XG4gICAgLy9tZW51X2l0ZW1zID0gbWVudS5hdHRyaWJ1dGVzLml0ZW1zLmRhdGE7XG4gICAgbWVudV9pdGVtcyA9IHRlbXAuYXR0cmlidXRlcy5pdGVtcy5kYXRhO1xuICAgIC8vbWVudV9pdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAvL2NvbnNvbGUubG9nKCdNRU5VUyAgX2FwcC5qcyBtZW51c1BsUmVzLmRhdGEubWFwIG1lbnUuYXR0cmlidXRlcy5pdGVtcy5kYXRhID0gSVRFTSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gJywgaXRlbSk7XG4gICAgICAvL2NvbnNvbGUubG9nKCdpdGVtLmlkID0gJywgaXRlbS5pZCk7XG4gICAgICAvL2NvbnNvbGUubG9nKCdpdGVtLmF0dHJpYnV0ZXMudGl0bGUgPSAnLCBpdGVtLmF0dHJpYnV0ZXMudGl0bGUpO1xuICAgICAgLy8vY29uc29sZS5sb2coJ2l0ZW0uYXR0cmlidXRlcy51cmwgPSAnLCBpdGVtLmF0dHJpYnV0ZXMudXJsKTtcbiAgICAgIC8vY29uc29sZS5sb2coJ2l0ZW0uYXR0cmlidXRlcy5jaGlsZHJlbi5kYXRhID0gJywgaXRlbS5hdHRyaWJ1dGVzLmNoaWxkcmVuLmRhdGEpO1xuICAgIC8vICBpZihpdGVtLmF0dHJpYnV0ZXMuY2hpbGRyZW4uZGF0YSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCctLS1pdGVtLmF0dHJpYnV0ZXMuY2hpbGRyZW4uZGF0YS5hdHRyaWJ1dGVzID0gJywgaXRlbS5hdHRyaWJ1dGVzLmNoaWxkcmVuLmRhdGEuYXR0cmlidXRlcyk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJy0tLWl0ZW0uYXR0cmlidXRlcy5jaGlsZHJlbi5kYXRhLmlkID0gJywgaXRlbS5hdHRyaWJ1dGVzLmNoaWxkcmVuLmRhdGEuaWQpO1xuICAgIC8vICB9XG4gICAgLy99KVxuICB9KVxuICAvLyBQYXNzIHRoZSBkYXRhIHRvIG91ciBwYWdlIHZpYSBwcm9wc1xuICByZXR1cm4geyAuLi5hcHBQcm9wcywgcGFnZVByb3BzOiB7IGdsb2JhbDogZ2xvYmFsUmVzLmRhdGEsIC8qbWVudXM6IG1lbnVzUmVzLmRhdGEsKi8gbWVudXNQbDogbWVudV9pdGVtcyB9IH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNeUFwcFxuIl0sIm5hbWVzIjpbIkFwcCIsIkhlYWQiLCJMYXlvdXQiLCJjcmVhdGVDb250ZXh0IiwiZmV0Y2hBUEkiLCJnZXRTdHJhcGlNZWRpYSIsIkdsb2JhbENvbnRleHQiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsImdsb2JhbCIsIm1lbnVzUGwiLCJjb25zb2xlIiwibG9nIiwibGluayIsInJlbCIsImhyZWYiLCJhdHRyaWJ1dGVzIiwiRmF2aWNvbiIsIlByb3ZpZGVyIiwidmFsdWUiLCJtZW51cyIsImdldEluaXRpYWxQcm9wcyIsImN0eCIsImFwcFByb3BzIiwiZ2xvYmFsUmVzIiwicG9wdWxhdGUiLCJEZWZhdWx0U2VvIiwibWVudXNSZXMiLCJNZW51VGFiIiwiU3ViTWVudUl0ZW0iLCJwYWdlIiwibWVudXNQbFJlcyIsIm5lc3RlZCIsIml0ZW1zIiwiY2hpbGRyZW4iLCJkYXRhIiwidGVtcCIsIm1lbnVfaXRlbXMiLCJtYXAiLCJtZW51Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.js\n"));

/***/ })

});