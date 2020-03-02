<template>
  <VueFaqAccordion
    @categorySelect="onCategorySelect"
    @itemSelect="onItemSelect"
    :items="myItems"
  />
</template>

<script>
import VueFaqAccordion from '../../src/vue-faq-accordion.vue'

export default {
  components: {
    VueFaqAccordion
  },
  data () {
    return {
      myItems: [
          {
            title: 'How many time zones are there in all?',
            value: 'Given a 24-hour day and 360 degrees of longitude around the Earth',
            category: 'Tab-1'
          },
          {
            title: 'How long is a day and year on Venus?',
            value: 'Venus takes 224.7 Earth days to complete one orbit around the Sun.',
            category: 'Tab-2'
          },
          {
            title: 'What animal smells like popcorn?',
            value: 'Binturongs smell like popcorn.',
            category: 'Tab-2'
          }
        ]
    }
  },
  methods: {
    onCategorySelect (args) {
      console.log('onCategorySelect', args)
    },
    onItemSelect (args) {
      console.log('onItemSelect', args)
    }
  }
}
</script>
