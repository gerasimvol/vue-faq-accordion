import Accordion from './Accordion.vue';

module.exports = {
  install: function (Vue, options) {
    Vue.component('vue-faq-accordion', Accordion);
  }
};