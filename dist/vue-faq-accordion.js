(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vue-faq-accordion", [], factory);
	else if(typeof exports === 'object')
		exports["vue-faq-accordion"] = factory();
	else
		root["vue-faq-accordion"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(1)(
	  /* script */
	  __webpack_require__(2),
	  /* template */
	  __webpack_require__(3),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "C:\\Users\\vladimir.gerasimenko\\Documents\\WORK\\vue-faq-accordion\\src\\Accordion.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] Accordion.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-edf7d8cc", Component.options)
	  } else {
	    hotAPI.reload("data-v-edf7d8cc", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 1 */
/***/ function(module, exports) {

	// this module is a runtime utility for cleaner component module output and will
	// be included in the final webpack user bundle

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  scopeId,
	  cssModules
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}

	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }

	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports

	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }

	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }

	  // inject cssModules
	  if (cssModules) {
	    var computed = Object.create(options.computed || null)
	    Object.keys(cssModules).forEach(function (key) {
	      var module = cssModules[key]
	      computed[key] = function () { return module }
	    })
	    options.computed = computed
	  }

	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	import { CollapseTransition } from 'vue2-transitions';

	export default {
	  name: 'VueFaqAccordion',
	  components: {
	    CollapseTransition
	  },
	  data() {
	    return {
	      activeTab: '',
	      activeQuestionIndex: null,
	      showAccordion: true
	    };
	  },
	  props: {
	    items: {
	      type: Array,
	      required: true
	    },
	    questionProperty: {
	      type: String,
	      default: 'title'
	    },
	    answerProperty: {
	      type: String,
	      default: 'value'
	    },
	    questionsCategoryProperty: {
	      type: String,
	      default: 'category'
	    }
	  },
	  computed: {
	    categories() {
	      const uniqueCategories = this.items.map(item => item[this.questionsCategoryProperty]).filter((category, index, categories) => categories.indexOf(category) === index);
	      this.activeTab = uniqueCategories[0];
	      return uniqueCategories;
	    },
	    categoryItems() {
	      return this.items.filter(item => item[this.questionsCategoryProperty] === this.activeTab);
	    },
	    hasNavigation() {
	      return !!this.categories[0];
	    }
	  },
	  methods: {
	    makeActive(itemIndex) {
	      this.activeQuestionIndex === itemIndex ? this.activeQuestionIndex = null : this.activeQuestionIndex = itemIndex;
	    },
	    generateButtonClasses(buttonIndex) {
	      return ['accordion__toggle-button', this.activeQuestionIndex === buttonIndex ? 'accordion__toggle-button_active' : null];
	    },
	    makeActiveCategory(category) {
	      this.showAccordion = false;
	      this.activeTab = category;
	      this.activeQuestionIndex = null;
	      setTimeout(() => {
	        this.showAccordion = true;
	      }, 300);
	    },
	    generateCategoryClasses(category) {
	      return ['faq__nav-item', this.activeTab === category ? 'faq__nav-item_active' : null];
	    }
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', {
	    staticClass: "faq"
	  }, [_c('div', {
	    staticClass: "faq-wrapper"
	  }, [(_vm.hasNavigation) ? _c('nav', {
	    staticClass: "faq__nav"
	  }, _vm._l((_vm.categories), function(category, i) {
	    return _c('div', {
	      key: ("category-" + i),
	      class: _vm.generateCategoryClasses(category),
	      on: {
	        "click": function($event) {
	          _vm.makeActiveCategory(category)
	        }
	      }
	    }, [_vm._v("\r\n        " + _vm._s(category) + "\r\n      ")])
	  })) : _vm._e(), _vm._v(" "), _c('transition', {
	    attrs: {
	      "name": "accordion-fade-slide",
	      "mode": "out-in"
	    }
	  }, [(_vm.showAccordion) ? _c('div', {
	    staticClass: "accordion"
	  }, _vm._l((_vm.categoryItems), function(item, i) {
	    return _c('div', {
	      key: ("accordion-item-" + i),
	      staticClass: "accordion__item"
	    }, [_c('div', {
	      staticClass: "accordion__title",
	      on: {
	        "click": function($event) {
	          _vm.makeActive(i)
	        }
	      }
	    }, [_c('p', {
	      staticClass: "accordion__title-text"
	    }, [_vm._v(_vm._s(item[_vm.questionProperty]))]), _vm._v(" "), _c('button', {
	      class: _vm.generateButtonClasses(i)
	    })]), _vm._v(" "), _c('collapse-transition', [(i === _vm.activeQuestionIndex) ? _c('div', [_c('p', {
	      staticClass: "accordion__value"
	    }, [_vm._v("\r\n                  " + _vm._s(item[_vm.answerProperty]) + "\r\n                ")])]) : _vm._e()])], 1)
	  })) : _vm._e()])], 1)])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-edf7d8cc", module.exports)
	  }
	}

/***/ }
/******/ ])
});
;