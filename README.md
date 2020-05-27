# vue-faq-accordion


[![npm](https://img.shields.io/npm/v/vue-faq-accordion.svg)](https://www.npmjs.com/package/vue-faq-accordion)
[![npm](https://img.shields.io/npm/dt/vue-faq-accordion.svg)](https://www.npmjs.com/package/vue-faq-accordion)


#### 🗃 Simple and smooth vue accordion. Perfect for your FAQ section.

![FAQ Section demo](https://media.giphy.com/media/XKU7gqsiq2KRAPoHZm/giphy.gif)

#### 💡 [Live demo here](https://codesandbox.io/s/vue-faq-accordion-gh6yl)

### 🛠 Install

```bash
npm i vue-faq-accordion
```
```bash
yarn add vue-faq-accordion
```

### 🚀 Usage

```vue
<template>
  <VueFaqAccordion 
    :items="myItems"
  />
</template>

<script>
import VueFaqAccordion from 'vue-faq-accordion'

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
  }
}
</script>
```

### ⚙ Props 
```js
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
  * possible format: 'red', '#F00', 'rgba(255, 0, 0, 1)'
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
    default: null
  }
  
}
```

### 🔥 Events

| Event | Payload | Description |
| -| - | -|
| categorySelect | `{ categoryIndex }` | Emitted on category change |
| itemSelect | `{ itemIndex }` | Emitted on item open |

### 📎 Slots

You can define own item markup via slots:
```vue
<VueFaqAccordion
  :items="myItems"
  v-slot="itemData"
>
  <img :src="itemData.imageSrc">
</VueFaqAccordion>
```
- item data is available via scoped slot (v-slot="itemData")
- don't add margins to this element (animation become choppy)
