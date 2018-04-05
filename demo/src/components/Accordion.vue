<template>
<section class="faq anchor-faq container section">
  <div class="faq-wrapper">
    <nav class="faq__nav">
      <div
          v-for="(category, i) in categories"
          :key="`category-${i}`"
          :class="generateCategoryClasses(category)"
          @click="makeActiveCategory(category)"
      >
        {{ category }}
      </div>
    </nav>

    <transition name="accordion-fade-slide" mode="out-in">
      <div class="accordion" v-if="showAccordion">
        <div
          class="accordion__item"
          v-for="(item, i) in categoryItems"
          :key="`accordion-item-${i}`"
        >
          <div class="accordion__title" @click="makeActive(i)">
            <p class="accordion__title-text">{{ item[questionProperty] }}</p>
            <button :class="generateButtonClasses(i)"></button>
          </div>
            <collapse-transition>
              <div v-if="i === activeQuestionIndex">
                <p class="accordion__value">
                  {{ item[answerProperty] }}
                </p>
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
    name: 'Accordion',
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
      categories () {
        const uniqueCategories = this.items
          .map(item => item[this.questionsCategoryProperty])
          .filter((category, index, categories) => categories.indexOf(category) === index)
        this.activeTab = uniqueCategories[0]
        return uniqueCategories
      },
      categoryItems () {
        return this.items.filter(item => item[this.questionsCategoryProperty] === this.activeTab)
      }
    },
    methods: {
      makeActive (itemIndex) {
        this.activeQuestionIndex === itemIndex
          ? this.activeQuestionIndex = null
          : this.activeQuestionIndex = itemIndex
      },
      generateButtonClasses (buttonIndex) {
        return [
          'accordion__toggle-button',
          this.activeQuestionIndex === buttonIndex
            ? 'accordion__toggle-button_active'
            : null
        ]
      },
      makeActiveCategory (category) {
        this.showAccordion = false
        this.activeTab = category
        this.activeQuestionIndex = null
        setTimeout( () => {
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
  }

  .faq {
    width: 100%;
    padding: 0 10px;

    &-wrapper {
      max-width: 825px;
      margin: 0 auto;
    }

    &__title {
      text-align: center;
      margin-bottom: 25px;
    }

    &__nav {
      display: flex;
      justify-content: space-between;
      border: 1px solid black;
      border-radius: 5px;
    }

    &__nav-item {
      height: 60px;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid black;
      cursor: pointer;
      color: black;
      font-weight: 600;
      transition: all 0.3s;
      text-align: center;
      user-select: none;

      &_active {
        background: linear-gradient(190deg, black 15%, darkblack 75%);
      }

      &:hover {
        color: rgba(255, 255, 255, 0.8);
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
    &__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: black;
      padding: 25px 0;
      border-bottom: 1px solid black;
      cursor: pointer;

      &-text {
        margin-right: 10px;
      }
    }

    &__value {
      color: black;
      padding: 25px 0 0 25px;
    }

    &__toggle-button {
      position: relative;
      width: 16px;
      height: 16px;
      transition: all 0.3s;
      transform-origin: 50% 50%;
      padding-left: 16px;

      &_active {
        transform: rotate(45deg);
      }

      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        background: black;
      }

      &::before {
        transform: rotate(90deg);
      }
    }
  }
</style>