<template>
  <div class="accordion">
    <div
      class="accordion__item"
      v-for="(item, i) in items"
      :key="`accordion-item-${i}`"
    >
      <div class="accordion__title" @click="makeActive(i)">
        <p class="accordion__title-text">{{ item.title }}</p>
        <button :class="generateButtonClasses(i)"></button>
      </div>
      <collapse-transition>
        <div v-if="i === activeQuestionIndex">
          <p class="accordion__value">
            {{ item.value }}
          </p>
        </div>
      </collapse-transition>
    </div>
  </div>
</template>

<script>
  import { CollapseTransition } from 'vue2-transitions'

  export default {
    name: 'Accordion',
    components: {
      CollapseTransition
    },
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        activeQuestionIndex: null
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
      }
    },
    mounted () {
      this.$bus.$on('reset-active-question', () => {
        this.activeQuestionIndex = null
      })
    },
    destroyed () {
      this.$bus.$off('reset-active-question')
    }
  }
</script>

<style lang="scss" scoped>
  @import "~mixins";
  @import "~colors";

  .accordion {
    &__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include font(2.4rem);
      color: $c--white;
      padding: 25px 0;
      border-bottom: 1px solid $c--white;
      cursor: pointer;

      &-text {
        margin-right: 10px;
      }

      @include tablet {
        @include font(2rem);
      }
    }

    &__value {
      @include font(1.6rem, 1.5);
      color: $c--white-secondary;
      padding: 25px 0 0 25px;
    }

    &__toggle-button {
      position: relative;
      @include size(16px);
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
        @include size(100%, 2px);
        background: $c--blue;
      }

      &::before {
        transform: rotate(90deg);
      }
    }
  }
</style>