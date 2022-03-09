<template>
  <div class="docdog-alert docdog-alert--error">
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="28" fill="#dc0000" stroke="#ffffff" stroke-width="4" />
      <path
        d="M21.6144 40.1878C20.7581 39.3315 20.7581 37.9432 21.6144 37.087L37.1186 21.5827C37.9749 20.7264 39.3632 20.7264 40.2195 21.5827V21.5827C41.0758 22.439 41.0758 23.8273 40.2195 24.6836L24.7152 40.1878C23.859 41.0441 22.4707 41.0441 21.6144 40.1878V40.1878Z"
        fill="#ffffff"
      />
      <path
        d="M39.1554 40.1555C38.2991 41.0118 36.9108 41.0118 36.0546 40.1555L20.5503 24.6513C19.694 23.795 19.694 22.4067 20.5503 21.5504V21.5504C21.4066 20.6942 22.7949 20.6942 23.6512 21.5504L39.1554 37.0547C40.0117 37.911 40.0117 39.2993 39.1554 40.1555V40.1555Z"
        fill="#ffffff"
      />
    </svg>
    <p class="docdog-alert__heading">エラーが発生しました</p>
    <p>{{ err }}</p>
  </div>
</template>

<script>
export default {
  props: {
    err: {
      type: String,
      default: '',
    },
  },
  methods: {},
};
</script>
