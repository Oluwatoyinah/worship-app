<template>
  <div class="draggable" :style="dragStyle" @mousedown="startDrag">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDragging: false,
      offset: { x: 0, y: 0 },
      position: { top: 15, left: 15 },
    }
  },
  computed: {
    dragStyle() {
      return {
        position: 'absolute',
        top: `${this.position.top}px`,
        left: `${this.position.left}px`,
        cursor: this.isDragging ? 'grabbing' : 'grab',
        zIndex: 1000,
      }
    },
  },
  methods: {
    startDrag(event) {
      this.isDragging = true
      this.offset.x = event.clientX - this.position.left
      this.offset.y = event.clientY - this.position.top

      // Add mousemove and mouseup listener to the window
      window.addEventListener('mousemove', this.onDrag)
      window.addEventListener('mouseup', this.stopDrag)

      // Prevent text selection while dragging
      document.body.style.userSelect = 'none'
    },
    onDrag(event) {
      if (this.isDragging) {
        this.position.left = event.clientX - this.offset.x
        this.position.top = event.clientY - this.offset.y
      }
    },
    stopDrag() {
      this.isDragging = false

      // Remove mousemove and mouseup listener from the window
      window.removeEventListener('mousemove', this.onDrag)
      window.removeEventListener('mouseup', this.stopDrag)

      // Restore text selection
      document.body.style.userSelect = ''
    },
  },
}
</script>

<style scoped>
.draggable {
  background-color: transparent;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  cursor: grab;
}
</style>
