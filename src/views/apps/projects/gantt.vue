<template>
    <div class="container">
      <gantt class="left-container" :tasks="tasks"></gantt>
    </div>
  </template>
  
  <script>
  import Gantt from '../../../components/gantt-comp.vue';
  
  export default {
    name: 'app',
    components: {Gantt},
    data () {
      return {
        tasks: {
          data: [
            {id: 1, text: 'Task #1', start_date: '2020-01-17', duration: 3, progress: 0.6},
            {id: 2, text: 'Task #2', start_date: '2020-01-20', duration: 3, progress: 0.4}
          ],
          links: [
            {id: 1, source: 1, target: 2, type: '0'}
          ]
        },
      }
    }
  }
  </script>
  
  <style>
    .container {
      height: 100%;
      width: 100%;
    }
  
    .left-container {
      overflow: hidden;
      position: relative;
      min-height:400px;
    }
  </style>