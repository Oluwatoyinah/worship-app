<script>
import CameraFeed from '@/components/CameraFeed.vue'
import Draggable from '@/components/Draggable.vue'

const text = `<div>
            <p>In times like these, you need a Savior</p>
            <p>In times like these, I need an anchor</p>
            <p>Be very sure, be very sure</p>
            <p>My anchor holds and grips the solid Rock</p>
          </div>`
export default {
  components: { Draggable, CameraFeed },
  data() {
    return {
      text,
      // default values
      allProperties: {
        'font-size': '50px',
        color: 'red',
        'font-style': 'normal',
        'font-weight': '',
        'text-shadow': true,
        'text-shadow-color': 'black',
        'box-height': '200px',
        'background-image': ``,
        'background-size': 'cover',
        'background-position': 'center',
        'background-color': '#000',
        'text-align': 'left',
        'text-animation': 'fade-right',

        //  font:'areal',
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
    bottomContainerStyle() {
      return {
        backgroundImage: `url('${this.allProperties['background-image']}')`,
        backgroundSize: this.allProperties['background-size'],
        backgroundPosition: this.allProperties['background-position'],
        backgroundColor: this.allProperties['background-color'],
        backgroundRepeat: this.allProperties['background-repeat'],
        textAlign: this.allProperties['text-align'],
        backgroundRepeat: 'no-repeat',
        height: this.allProperties['box-height'],
      }
    },
    bottomContainerContentStyle() {
      return {
        fontSize: this.allProperties['font-size'],
        fontWeight: this.allProperties['font-weight'],
        color: this.allProperties.color,
        fontStyle: this.allProperties['font-style'],
        textShadow: this.allProperties['text-shadow']
          ? `2px 2px 4px ${this.allProperties['text-shadow-color']}`
          : 'none',
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
    this.startCamera()
  },

  methods: {
    // fetching the mock JSON DATA
    fetchData() {
      fetch('/video-data.json')
        .then(response => response.json())
        .then(data => {
          // fetching dummy data from data.json
          this.allProperties = { ...this.allProperties, ...data }
        })
        .catch(error => {
          console.error('Error fetching JSON data:', error)
        })
    },

    async startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        })
        this.$refs.video.srcObject = stream
      } catch (error) {
        console.error('Error accessing camera: ', error)
      }
    },
  },
}
</script>

<template>
  <div class="video-page">
    <Draggable>
      <img
        :src="allProperties.logo"
        :style="logoStyle"
        draggable="false"
        alt="logo-image"
      />
    </Draggable>
    <div class="camera-feed-box">
      <CameraFeed />
    </div>
    <div class="video-bottom-content-box" :style="bottomContainerStyle">
      <div class="video-bottom-content" :style="bottomContainerContentStyle">
        <div
          :class="animationsClass[allProperties['text-animation']]"
          v-html="text"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.camera-feed {
  width: 100%; /* Adjust as needed */
  height: auto;
  border: 1px solid #ccc; /* Optional styling */
}
</style>
