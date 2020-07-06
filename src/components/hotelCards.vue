<template lang="html">
  <b-row>
    <b-col
      v-for="hotel in hotelData"
      :key="hotel.listing_key"
      lg="3"
      md="4"
    >
      <b-card
        style="max-width: 30rem;"
        :img-src="hotel.photo.images.medium.url"
        @click="handleSelect(hotel)"
      >
        <b-card-title>
          <h5>
            {{hotel.name}}
          </h5>
        </b-card-title>
        <b-card-sub-title>
          <h5>
            <b-form-rating
            id="rating-inline"
            no-border
            inline
            readonly
            :value="hotel.rating"
            />
            <small class="text-muted">de {{ hotel.num_reviews }} avaliações</small>
          </h5>
        </b-card-sub-title>
        <b-row>
          <b-col>
            <b-card-text>
              <b>Local:</b>
                {{ hotel.location_string }}
            </b-card-text>
          </b-col>
          <b-col>
            <b-card-text>
              <b>Preço:</b> {{ formatPrice(hotel.price) }}
            </b-card-text>
          </b-col>
          </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'hotelCards',
  props: {
    hotelData: Array,
  },
  data() {
    return {
    }
  },
  methods: {
    formatPrice(value) {
      const formattedPrices = value.split(('-'))
      return formattedPrices[0]
    },
    handleSelect(hotel) {
      const formattedPrices = hotel.price.split(('-'))

      const formattedHotel = {
        id_quarto_hotel: hotel.listing_key,
        nome_hotel: hotel.name,
        nome_quarto: '1',
        descricao_quarto: 'desc quarto',
        endereco: hotel.location_string,
        cidade: hotel.location_string,
        estado: hotel.location_string,
        pais: hotel.location_strin,
        valor_diaria: formattedPrices[0].replace(/[^\d.-]/g, ''),
        disponivel: true,
      }
      this.$store.commit('setHotel', formattedHotel)
    },
  },
}
</script>

<style lang="css" scoped>
</style>
