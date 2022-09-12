<script setup lang="ts">
import { chunk9Matrix, createBoard, solveSudoku } from '~/utils/createBoard'
const _board = createBoard()
const board = reactive(_board)
const matrix = $computed(() => chunk9Matrix(board))
const solveProblem = () => {
  console.log(board)
  solveSudoku(board)
  console.log(board)
}
</script>

<template>
  <div class="parent" max-w-400px h-400px mx-auto>
    <div
      v-for="(arr, key) in matrix" :key="key" w-full h-full border border-width-2 border-gray dark:border-white
      class="parent"
    >
      <div
        v-for="(item, index) in arr" :key="index" border border-amber transition flex :class=" !(item.toString()).includes('.') ? 'border-green' : ''"
      >
        <div v-show="item === '.' ? false : true" transition flex justify-center items-center flex-1>
          {{ item === '.' ? '' : item }}
        </div>
      </div>
    </div>
  </div>
  <button @click="solveProblem">
    hello
  </button>
  <!-- <RouterView /> -->
</template>

<style scoped>
.board {
  @apply pw-10;
  display: grid;
  grid-template-columns: repeat(9, 50px);
  grid-template-rows: repeat(9, 50px);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}

.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}

.div1 {
  grid-area: 1 / 1 / 4 / 4;
}

.div2 {
  grid-area: 1 / 4 / 4 / 7;
}

.div3 {
  grid-area: 1 / 7 / 4 / 10;
}

.div4 {
  grid-area: 4 / 1 / 7 / 4;
}

.div5 {
  grid-area: 4 / 4 / 7 / 7;
}

.div6 {
  grid-area: 4 / 7 / 7 / 10;
}

.div7 {
  grid-area: 7 / 1 / 10 / 4;
}

.div8 {
  grid-area: 7 / 4 / 10 / 7;
}

.div9 {
  grid-area: 7 / 7 / 10 / 10;
}
</style>
