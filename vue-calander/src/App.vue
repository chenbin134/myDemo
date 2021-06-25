<template>
  <div id="app">
    <!-- :value='date' @input="(val)=> date = val" -->
    <calander v-model="date"></calander>
  </div>
</template>

<script>
import calander from './components/calander'
export default {
  name: 'app',
  data(){
    return {
      date:new Date(),
    }
  },
  components: {
    calander
  }
}
</script>

<style>
</style>
