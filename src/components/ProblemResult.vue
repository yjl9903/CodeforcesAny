<template>
  <div v-if="show" class="has-text-centered">
    <div :style="{ lineHeight: result.points > 0 ? '1.5' : '3' }">
      <span class="has-text-weight-bold" :style="{ color: fontColor }">{{
        (result.points > 0 ? '+' : '-') +
          (result.rejectedAttemptCount > 0 ? result.rejectedAttemptCount : '')
      }}</span>
    </div>
    <div
      v-if="
        result.bestSubmissionTimeSeconds !== undefined &&
          result.bestSubmissionTimeSeconds !== null
      "
    >
      <div v-if="result.points > 0" class="has-text-weight-light">
        {{ (result.bestSubmissionTimeSeconds / 60).toFixed(0) }}
      </div>
    </div>
    <div v-else-if="result.time !== undefined && result.time !== null">
      <div class="has-text-weight-light" style="font-size: 0.8em">
        {{ result.time }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProblemResult',
  props: {
    result: Object
  },
  computed: {
    show() {
      return (
        this.result &&
        (this.result.points > 0 || this.result.rejectedAttemptCount > 0)
      );
    },
    fontColor() {
      if (this.result.points > 0) {
        return '#21BA45';
      } else {
        return '#DB2828';
      }
    }
  }
};
</script>

<style scoped></style>
