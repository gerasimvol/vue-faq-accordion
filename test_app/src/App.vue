<template>
  <div id="app">
    <section class="faq anchor-faq container section">
      <div class="faq-wrapper">
        <h2 class="lp-section-title faq__title">F.A.Q.</h2>
        <nav class="faq__nav">
          <div
              v-for="(category, i) in categories"
              :key="`category-${i}`"
              :class="generateCategoryClasses(category)"
              @click="makeActive(category)"
          >
            {{ category }}
          </div>
        </nav>
        <transition name="accordion-fade-slide" mode="out-in">
          <a-accordion
              v-for="(categoryAccordion, i) in categories"
              :key="`categoryAccordion-${i}`"
              v-if="categoryAccordion === activeTab"
              :items="categoryItems"
              class="faq__accordion"
          />
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
  import AAccordion from './components/HelloWorld'
  export default {
    name: 'App',
    components: {
      AAccordion
    },
    data () {
      return {
        activeTab: '',
        items: [
          {
            title: 'How can I open an account?',
            value: 'You can open an account with CFDtag through the website. In order to open an account online, go to the Real Account page, enter your individual information, and go through the procedure to create an account. Opening your account should take only a few minutes. Once you are signed in, you will be able to deposit, withdraw, and transfer funds online.',
            category: 'General Questions'
          },
          {
            title: 'Should I make a deposit in order to open an account with CFDtag?',
            value: 'You are not required to make any deposit to open an account. You will definitely need to make a minimum deposit in order to start your trading activities.',
            category: 'General Questions'
          },
          {
            title: 'How do I submit new account documents?',
            value: 'Using CFDtag’s convenient online account application form allows our clients to complete and sign all necessary documents online. As for photocopies of our clients’ ID that must be provided in order to open an account, they can be printed, scanned, or emailed to our customer service.',
            category: 'General Questions'
          },
          {
            title: 'How secure is CFDtag?',
            value: 'CFDtag considers its clients’ security a top priority. We take every possible step to protect their personal information, and to secure the payment processes. CFDtag uses the most advanced encryption technologies to prevent its clients’ data from leaking.',
            category: 'Pre ICO & ICO'
          },
          {
            title: 'I forgot my password/login details?',
            value: 'Don’t worry if you forgot your password or login details. The link below will take you to a recovery page. Enter your email to receive a new password, or contact us for additional assistance. Click here to get your password.',
            category: 'Other Questions'
          }
        ]
      }
    },
    computed: {
      categories () {
        const uniqueCategories = this.items
          .map(item => item.category)
          .filter((category, index, categories) => categories.indexOf(category) === index)
        this.activeTab = uniqueCategories[0]
        return uniqueCategories
      },
      categoryItems () {
        return this.items.filter(item => item.category === this.activeTab)
      }
    },
    methods: {
      makeActive (category) {
        this.activeTab = category
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
      border: 1px solid blue;
      border-radius: 5px;
    }
    &__nav-item {
      height: 60px;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid blue;
      cursor: pointer;
      color: white;
      font-weight: 600;
      transition: all 0.3s;
      text-align: center;
      user-select: none;

      &_active {
        background: linear-gradient(190deg, blue 15%, darkblue 75%);
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
</style>
