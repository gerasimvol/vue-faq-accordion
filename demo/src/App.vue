<template>
  <div id="app">
    <faq-accordion
      :items="items"
      questionProperty='title'
      answerProperty='value'
      questionsCategoryProperty='category'
    />
  </div>
</template>

<script>
  import FaqAccordion from './components/Accordion'
  export default {
    name: 'App',
    components: {
      FaqAccordion
    },
    data () {
      return {
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
    }
  }
</script>

<style lang="scss" scoped>
  * {
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
</style>
