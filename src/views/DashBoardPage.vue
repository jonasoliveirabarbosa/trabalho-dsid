<template>
  <div class="home">
    <dash-board />
  </div>
</template>

<script>
import dashBoard from '@/components/dashBoard'

export default {
  name: 'singUpPage',
  components: {
    dashBoard,
  },
  data() {
    return {
      reservaList: [],
    }
  },
  methods: {

  },
  mounted() {
    // this.getFlights()
  },
}
</script>
