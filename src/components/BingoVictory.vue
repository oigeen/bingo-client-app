<template>
  <div>
    <!-- <h1 id="bingoVictory">BINGO</h1> -->
  </div>
</template>

<script>
export default {};
</script>

<style>
#bingoVictory {
  height: 100px;
  text-align: center;
  font-size: 48px;
  animation: blinkingAnimation 1s infinite;
}

@keyframes blinkingAnimation {
  0% {
    color: white;
    font-size: 48px;
  }
  50% {
    color: var(--primary-color);
    font-size: 72px;
  }
  100% {
    color: white;
    font-size: 48px;
  }
}
</style>