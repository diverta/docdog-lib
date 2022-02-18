<template>
  <div class="docdog-button__list">
    <button type="button" class="docdog-button docdog-button--white" @click="$emit('add')">ダウンロードリストに追加する</button>
    <button type="button" class="docdog-button docdog-button--primary" @click="$emit('download')">ダウンロードする</button>
  </div>
</template>

<script>
export default {};
</script>
