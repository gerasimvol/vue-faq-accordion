<template>
  <div>
    <!-- DEFAULT -->
    <VueFaqAccordion
      @categorySelect="onCategorySelect"
      @itemSelect="onItemSelect"
      :items="myItems"
    />

    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>

    <!-- WITH SCOPED SLOTS and INITIAL OPEN VALUES-->
    <VueFaqAccordion
        @categorySelect="onCategorySelect"
        @itemSelect="onItemSelect"
        :items="myItems"
        v-slot="itemData"
        initialTab="Tab-2"
        :initialQuestionIndex="1"
    >
      <!-- any html -->
      <!-- and item data if available via itemData -->
      <!-- don't add margins to this element (animation become choppy) -->
      <small>{{ itemData }}</small>
    </VueFaqAccordion>
  </div>
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
