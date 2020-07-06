<template>
<section class="faq" ref="rootEl">
  <div class="faq-wrapper">
    <nav v-if="hasNavigation" class="faq__nav">
      <div
        v-for="(category, i) in categories"
        :key="`category-${i}`"
        v-html="category"
        :class="generateCategoryClasses(category)"
        @click="makeActiveCategory(category, i)"
      ></div>
    </nav>

    <transition name="accordion-fade-slide" mode="out-in">
      <div v-if="showAccordion" class="accordion">
        <div
          class="accordion__item"
          v-for="(item, i) in categoryItems"
          :key="`accordion-item-${i}`"
        >
          <div :class="generateQuestionClasses(i)" @click="makeActive(i)">
            <p class="accordion__title-text" v-html="item[questionProperty]"></p>
            <button :class="generateButtonClasses(i)"></button>
          </div>
            <collapse-transition>
              <div v-if="i === activeQuestionIndex">
                  <div class="accordion__value">
                    <slot v-bind="item">
                      <div v-html="item[answerProperty]"></div>
                    </slot>
                  </div>
              </div>
            </collapse-transition>
        </div>
      </div>
    </transition>
  </div>
</section>
</template>

<script>
  import { CollapseTransition } from 'vue2-transitions'

  export default {
    name: 'VueFaqAccordion',

    components: {
      CollapseTransition
    },

    data () {
      return {
        activeTab: '',
        activeQuestionIndex: null,
        showAccordion: true
      }
    },

    props: {
      /**
       * Array of items
       * Object style {questionProperty: string, answerProperty: string, tabName: string}
       * You can change object keys names using other props (questionProperty, answerProperty, tabName)
       */
      items: {
        type: Array,
        required: true
      },
      /**
       * Key name of object in items array for specifying title of question
       */
      questionProperty: {
        type: String,
        default: 'title'
      },
      /**
       * Key name of object in items array for specifying content text of open question
       */
      answerProperty: {
        type: String,
        default: 'value'
      },
      /**
       * Key name of object in items array for specifying navigation tab name
       */
      tabName: {
        type: String,
        default: 'category'
      },
      /**
       * Color for hover and active tab/question
       * possible values: 'red', '#F00', 'rgb(255, 0, 0)'
       */
      activeColor: {
        type: String,
        default: '#D50000'
      },
      /**
       * Color for borders
       */
      borderColor: {
        type: String,
        default: '#9E9E9E'
      },
      /**
       * Color for fonts
       */
      fontColor: {
        type: String,
        default: '#000000'
      },
      /**
       * Opened by default tabName (category)
       */
      initialTab: {
        type: String,
        default: null
      },
      /**
       * Opened by default question
       * All closed by default
       */
      initialQuestionIndex: {
        type: Number,
        default: 0
      }
    },

    computed: {
      categories () {
        const uniqueCategories = this.items
          .map(item => item[this.tabName])
          .filter((category, index, categories) => categories.indexOf(category) === index)
        this.activeTab = this.initialTab || uniqueCategories[0]
        this.activeQuestionIndex = this.initialQuestionIndex || 0
        return uniqueCategories
      },
      categoryItems () {
        return this.items
          .filter(item => item[this.tabName] === this.activeTab)
      },
      hasNavigation () {
        return !!this.categories[0]
      }
    },

    methods: {
      makeActive (itemIndex) {
        this.activeQuestionIndex = this.activeQuestionIndex === itemIndex ? null : itemIndex
        this.$emit('itemSelect', { itemIndex })
      },
      generateButtonClasses (buttonIndex) {
        return [
          'accordion__toggle-button',
          this.activeQuestionIndex === buttonIndex
            ? 'accordion__toggle-button_active'
            : null
        ]
      },
      generateQuestionClasses (questionIndex) {
        return [
          'accordion__title',
          this.activeQuestionIndex === questionIndex
            ? 'accordion__title_active'
            : null
        ]
      },
      makeActiveCategory (category, categoryIndex) {
        if (this.activeTab === category) return

        this.showAccordion = false
        this.activeTab = category
        this.activeQuestionIndex = null
        setTimeout( () => {
          this.$emit('categorySelect', { categoryIndex })
          this.showAccordion = true
        }, 300 )
      },
      generateCategoryClasses (category) {
        return [
          'faq__nav-item',
          this.activeTab === category
            ? 'faq__nav-item_active'
            : null
        ]
      }
    },

    mounted () {
      this.$refs.rootEl.style.setProperty('--active-color', this.activeColor)
      this.$refs.rootEl.style.setProperty('--border-color', this.borderColor)
      this.$refs.rootEl.style.setProperty('--font-color', this.fontColor)
    }
  }
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  button {
    border: none;
    background: none;
    outline: none;
  }

  .faq {
    width: 100%;
    padding: 0 10px;

    &-wrapper {
      max-width: 825px;
    }

    &__title {
      text-align: center;
      margin-bottom: 25px;
    }

    &__nav {
      display: flex;
      justify-content: space-between;
      border: 2px solid var(--border-color);
      border-radius: 5px;
    }

    &__nav-item {
      height: 60px;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 2px solid var(--border-color);
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
      text-align: center;
      user-select: none;
      color: var(--font-color);

      &_active {
        color: var(--active-color);
      }

      &:hover {
        color: var(--active-color);
      }

      &:last-child {
        border-right: none;
      }
    }

    &__accordion {
      min-height: 250px;
    }
  }

  .accordion-fade-slide {
    &-enter-active,
    &-leave-active {
      transition: all 0.3s;
    }
    &-enter {
      transform: translateY(-25px);
      opacity: 0;
    }
    &-leave-to {
      transform: translateY(25px);
      opacity: 0;
    }
  }

  .accordion {
    border: 2px solid var(--border-color);
    border-radius: 5px;
    margin-top: 15px;

    &__item {
      border-bottom: 2px solid var(--border-color);

      &:last-child {
        border-bottom: none;
      }
    }

    &__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 25px;
      cursor: pointer;
      transition: all 0.3s;
      color: var(--font-color);

      &_active {
        color: var(--active-color);
      }

      &:hover {
        color: var(--active-color);

        .accordion__toggle-button {
          &::before,
          &::after {
            background: var(--active-color);
          }
        }
      }

      &-text {
        margin-right: 10px;
      }
    }

    &__value {
      padding: 0 25px 25px 25px;
      text-align: left;
      color: var(--font-color);
    }

    &__toggle-button {
      position: relative;
      width: 16px;
      height: 16px;
      transition: all 0.3s;
      transform-origin: 50% 50%;
      padding-left: 16px;
      cursor: pointer;

      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        transition: all 0.3s;
        background: black;
      }

      &::before {
        transform: rotate(90deg);
      }

      &_active {
        transform: rotate(45deg);

        &::before,
        &::after {
          background: var(--active-color);
        }
      }
    }
  }
</style>
