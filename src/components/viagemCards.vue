<template lang="html">
  <div>
    <b-card
      v-for="quote in currentQuotes"
      :key="quote.Id"
      @click="handleSelect(quote)"
    >
      <b-row>
        <b-col>
          <b-card-text>
            <b>Preço:</b> R$ {{ formatPrice(quote.MinPrice) }}
          </b-card-text>
          <b-card-text>
            <b>Companhia:</b> {{ findCarrierNameById(quote.OutboundLeg.CarrierIds[0]) }}
          </b-card-text>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card-text>
            <b>Origem:</b>
              {{ findPlaceNameById(quote.OutboundLeg.OriginId) }}
            <b>Destino:</b>
              {{ findPlaceNameById(quote.OutboundLeg.DestinationId) }}
          </b-card-text>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card-text>
            <b>Data de partida:</b> {{ formatDate(quote.OutboundLeg.DepartureDate) }}
          </b-card-text>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import * as R from 'ramda'
import moment from 'moment'

export default {
  name: 'viagemCards',
  props: {
    currentCarriers: Array,
    currentPlaces: Array,
    currentQuotes: Array,
    isIda: Boolean,
  },
  data() {
    return {
    }
  },
  methods: {
    findCarrierNameById(carrierId) {
      const carrier = R.find(R.propEq('CarrierId', carrierId), this.currentCarriers)
      if (carrier) return carrier.Name
      return ''
    },
    findPlaceNameById(placeId) {
      const place = R.find(R.propEq('PlaceId', placeId), this.currentPlaces)
      if (place) return place.Name
      return ''
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    formatDate(date) {
      const momentDate = moment(date)
      return momentDate.format('DD/MM/yyyy')
    },
    formatDateISO(date) {
      const momentDate = moment(date)
      return momentDate.toISOString()
    },
    handleSelect(quote) {
      const formattedVoo = {
        id_voo: quote.id,
        nome_companhia: this.findCarrierNameById(quote.OutboundLeg.CarrierIds[0]),
        classe: 'Regular',
        data_voo: this.formatDateISO(quote.OutboundLeg.DepartureDate),
        aeroporto_origem: this.findPlaceNameById(quote.OutboundLeg.OriginId),
        aeroporto_destino: this.findPlaceNameById(quote.OutboundLeg.DestinationId),
        valor_total: quote.MinPrice,
        max_passageiros: 100,
        cheio: false,
      }
      if (this.isIda) {
        this.$store.commit('setIda', formattedVoo)
      } else {
        this.$store.commit('setVolta', formattedVoo)
      }
    },
  },
}
</script>

<style lang="css" scoped>

</style>
