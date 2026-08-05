<template>
  <main class="landing-page-wrapper">
    <DisasterDetector />
  </main>
</template>

<script>
import DisasterDetector from '@/components/DisasterDetector.vue'

export default {
  name: 'LandingExpoView',
  components: {
    DisasterDetector
  }
}
</script>

<style scoped>
.landing-page-wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: #f8fafc;
}
</style>