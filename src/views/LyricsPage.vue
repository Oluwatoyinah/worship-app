<script>
import Draggable from '@/components/Draggable.vue'
import { Marquee } from 'vue-fast-marquee'

const text = `<div>
            <p>In times like these, you need a Savior</p>
            <p>In times like these, I need an anchor</p>
            <p>Be very sure, be very sure</p>
            <p>My anchor holds and grips the solid Rock</p>
          </div>`
export default {
  components: { Draggable, Marquee },
  data() {
    return {
      text,
      // default values
      allProperties: {
        // font and text properties
        font: '',
        'font-size': '50px',
        'font-style': 'normal',
        'font-weight': 'normal',
        color: 'red',
        'text-align': 'left',
        'text-animation': 'fade-right',

        // background properties
        'background-image': ``,
        'background-size': 'cover',
        'background-position': 'center',
        'background-color': '#000',

        logo: '',
        'logo-size': '50px',
        'logo-rounded': true,
        'show-scroll-text': false,
        'scroll-text': '',
        'scroll-text-size': '8px',
        'scroll-text-background-color': 'red',
        'scroll-text-color': 'white',
      },

      animationsClass: {
        'fade-up': 'fade-up-text',
        'fade-down': 'fade-down-text',
        'fade-right': 'fade-right-text',
        'fade-left': 'fade-left-text',
        'fade-in': 'fade-in-text',
      },
    }
  },
  computed: {
    containerStyle() {
      return {
        backgroundImage: `url('${this.allProperties['background-image']}')`,
        backgroundSize: this.allProperties['background-size'],
        backgroundPosition: this.allProperties['background-position'],
        backgroundColor: this.allProperties['background-color'],
        backgroundRepeat: this.allProperties['background-repeat'],
        textAlign: this.allProperties['text-align'],
        backgroundRepeat: 'no-repeat',
      }
    },
    contentStyle() {
      return {
        fontWeight: this.allProperties['font-weight'],
        fontSize: this.allProperties['font-size'],
        color: this.allProperties.color,
        fontStyle: this.allProperties['font-style'],
        fontFamily: this.allProperties.font,
      }
    },
    scrollStyle() {
      return {
        fontSize: this.allProperties['scroll-text-size'],
        color: this.allProperties['scroll-text-color'],
        backgroundColor: this.allProperties['scroll-text-background-color'],
      }
    },
    logoStyle() {
      return {
        width: this.allProperties['logo-size'],
        maxWidth: '100%',
        borderRadius: this.allProperties['logo-rounded'] ? '100%' : '0',
      }
    },
  },
  mounted() {
    // Fetch the data on component mount
    this.fetchData()
  },
  methods: {
    // fetching the mock JSON DATA
    async fetchData() {
      try {
        const response = await fetch('/data.json')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        this.allProperties = { ...this.allProperties, ...data }
      } catch (error) {
        console.error('Error fetching JSON data:', error)
      }
    },
  },
}
</script>

<template>
  <div class="lyrics-page" :style="containerStyle" v-cloak>
    <Draggable>
      <img
        :src="allProperties.logo"
        :style="logoStyle"
        draggable="false"
        alt="logo-image"
      />
    </Draggable>

    <div class="lyrics-page-content" :style="contentStyle">
      <div
        :class="animationsClass[allProperties['text-animation']]"
        v-html="text"
      ></div>
    </div>

    <div
      class="scroll-content"
      v-show="allProperties['show-scroll-text']"
      :style="scrollStyle"
    >
      <Marquee>
        <div v-html="allProperties['scroll-text']"></div>
      </Marquee>
    </div>
  </div>
</template>

<style scoped></style>
