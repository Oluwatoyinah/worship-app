<script>
export default {
  // getting camera feed on mount
  mounted() {
    this.startCamera()
  },
  methods: {
    async startCamera() {
      this.$nextTick(async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          })
          this.$refs.video.srcObject = stream
          this.$refs.video.play()
        } catch (error) {
          console.error('Error accessing camera: ', error)
        }
      })
    },
  },
}
</script>

<template>
  <div>
    <video ref="video" class="camera-feed" autoplay playsinline muted></video>
  </div>
</template>

<style scoped>
.camera-feed {
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
  display: block;
}
</style>
