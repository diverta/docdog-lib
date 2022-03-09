<template>
  <div class="docdog-alert docdog-alert--success">
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="28" fill="#05a87c" stroke="#ffffff" stroke-width="4"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M26.8158 39.8072C26.7282 39.9632 26.618 40.11 26.4853 40.2427C25.7042 41.0238 24.4379 41.0238 23.6569 40.2427L16.5858 33.1716C15.8047 32.3906 15.8047 31.1243 16.5858 30.3432C17.3668 29.5622 18.6332 29.5622 19.4142 30.3432L25.046 35.975L38.4351 22.5858C39.2162 21.8047 40.4825 21.8047 41.2636 22.5858C42.0446 23.3668 42.0446 24.6332 41.2636 25.4142L27.1214 39.5563C27.0262 39.6516 26.9237 39.7352 26.8158 39.8072Z" fill="#ffffff"/>
    </svg>
    <!-- ToDo: Implement completion text -->
    <p class="docdog-alert__heading">{{ msg }}</p>
    <p v-if="msg2">{{ msg2 }}</p>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: '',
    },
    msg2: {
      type: String,
      default: '',
    },
  },
  methods: {},
};
</script>
