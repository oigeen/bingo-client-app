<template>
  <div class="big-title-container">
    <h1 id="big-title">BINGOALS</h1>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#big-title {
  height: 72px;
  font-size: 72px;
  font-family: "Luckiest Guy";
  color: var(--primary-color);
  animation: flashingColorAnimation 1s infinite;
  transition: 0ms;
}

@keyframes flashingColorAnimation {
  0% {
    font-size: 72px;
  }
  50% {
    font-size: 64px;
  }
  100% {
    font-size: 72px;
  }
}
</style>