<template lang="html">
  <div class="main">
    <b-row>
      <b-col
        v-if="storeIda.valor_total"
      >
        <b-card
          title="Ida"
          title-tag="h1"
          sub-title="Dados do voo selecionado"
          sub-title-tag="h4"
          cols="10"
          offset="1"
        >
          <b-card-text>
            <b>Preço:</b> R$ {{ formatPrice(storeIda.valor_total) }}
          </b-card-text>
          <b-card-text>
            <b>Companhia:</b> {{ storeIda.nome_companhia }}
          </b-card-text>
          <b-card-text>
            <b>Origem:</b>
              {{ storeIda.aeroporto_origem }}
          </b-card-text>
          <b-card-text>
            <b>Destino:</b>
              {{ storeIda.aeroporto_destino }}
          </b-card-text>
          <b-card-text>
            <b>Data de partida:</b> {{ formatDate(storeIda.data_voo) }}
          </b-card-text>
        </b-card>
      </b-col>
      <b-col
        v-if="storeVolta.valor_total"
      >
        <b-card
          title="Volta"
          title-tag="h1"
          sub-title="Dados do voo selecionado"
          sub-title-tag="h4"
          cols="10"
          offset="1"
        >
          <b-card-text>
            <b>Preço:</b> R$ {{ formatPrice(storeVolta.valor_total) }}
          </b-card-text>
          <b-card-text>
            <b>Companhia:</b> {{ storeVolta.nome_companhia }}
          </b-card-text>
          <b-card-text>
            <b>Origem:</b>
              {{ storeVolta.aeroporto_origem }}
          </b-card-text>
          <b-card-text>
            <b>Destino:</b>
              {{ storeVolta.aeroporto_destino }}
          </b-card-text>
          <b-card-text>
            <b>Data de partida:</b> {{ formatDate(storeVolta.data_voo) }}
          </b-card-text>
        </b-card>
      </b-col>
      <b-col
        v-if="storeHotel.quarto_hotel"
      >
        <b-card
          title="Hotel"
          title-tag="h1"
          sub-title="Dados do hotel selecionado"
          sub-title-tag="h4"
          cols="10"
          offset="1"
        >
          <b-row>
            <b-col>
              <b-card-text>
                <b>Nome:</b> {{ storeHotel.quarto_hotel.nome_hotel }}
              </b-card-text>
              <b-card-text>
                <b>Diária:</b>
                  R$ {{ formatPrice(storeHotel.quarto_hotel.valor_diaria) }}
              </b-card-text>
              <b-card-text>
                <b>Endereco:</b> {{ storeHotel.quarto_hotel.endereco }}
              </b-card-text>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row
      v-if="storeHotel.quarto_hotel || storeVolta.valor_total || storeIda.valor_total"
      class="mb-3"
    >
      <b-col
        lg=10
        offset-lg=1
      >
        <b-button block variant="primary" @click="handleComprar">Comprar Pacote</b-button>
      </b-col>
    </b-row>
    <b-row
      v-else
      class="mb-3 mt-5"
    >
      <b-col
        lg=10
        offset-lg=1
      >
        <h2> Sem pacotes selecionados acesse a home para buscar</h2>
      </b-col>
    </b-row>
    <b-row
      class="mb-3 mt-5"
    >
      <b-col
        lg=10
        offset-lg=1
      >
        <h2> Pacotes Reservados</h2>
      </b-col>
    </b-row>
  <b-row v-for="compra in compras"  :key="compra.id">
    <b-col
      v-if="compra.reserva_voo.voos[0].valor_total"
    >
      <b-card
        title="Ida"
        title-tag="h1"
        sub-title="Dados do voo selecionado"
        sub-title-tag="h4"
        cols="10"
        offset="1"
      >
        <b-card-text>
          <b>Preço:</b> R$ {{ formatPrice(compra.reserva_voo.voos[0].valor_total) }}
        </b-card-text>
        <b-card-text>
          <b>Companhia:</b> {{ compra.reserva_voo.voos[0].nome_companhia }}
        </b-card-text>
        <b-card-text>
          <b>Origem:</b>
            {{ compra.reserva_voo.voos[0].aeroporto_origem }}
        </b-card-text>
        <b-card-text>
          <b>Destino:</b>
            {{ compra.reserva_voo.voos[0].aeroporto_destino }}
        </b-card-text>
        <b-card-text>
          <b>Data de partida:</b> {{ formatDate(compra.reserva_voo.voos[0].data_voo) }}
        </b-card-text>
      </b-card>
    </b-col>
    <b-col
      v-if="compra.reserva_voo.voos[0].valor_total"
    >
      <b-card
        title="Volta"
        title-tag="h1"
        sub-title="Dados do voo selecionado"
        sub-title-tag="h4"
        cols="10"
        offset="1"
      >
        <b-card-text>
          <b>Preço:</b> R$ {{ formatPrice(compra.reserva_voo.voos[1].valor_total) }}
        </b-card-text>
        <b-card-text>
          <b>Companhia:</b> {{ compra.reserva_voo.voos[1].nome_companhia }}
        </b-card-text>
        <b-card-text>
          <b>Origem:</b>
            {{ compra.reserva_voo.voos[1].aeroporto_origem }}
        </b-card-text>
        <b-card-text>
          <b>Destino:</b>
            {{ compra.reserva_voo.voos[1].aeroporto_destino }}
        </b-card-text>
        <b-card-text>
          <b>Data de partida:</b> {{ formatDate(compra.reserva_voo.voos[1].data_voo) }}
        </b-card-text>
      </b-card>
    </b-col>
    <b-col
      v-if="storeHotel.reserva_hotel"
    >
      <b-card
        title="Hotel"
        title-tag="h1"
        sub-title="Dados do hotel selecionado"
        sub-title-tag="h4"
        cols="10"
        offset="1"
      >
        <b-row>
          <b-col>
            <b-card-text>
              <b>Nome:</b> {{ storeHotel.reserva_hotel.quarto_hotel.nome_hotel }}
            </b-card-text>
            <b-card-text>
              <b>Diária:</b>
                R$ {{ formatPrice(storeHotel.reserva_hotel.quarto_hotel.valor_diaria) }}
            </b-card-text>
            <b-card-text>
              <b>Endereco:</b> {{ storeHotel.reserva_hotel.quarto_hotel.endereco }}
            </b-card-text>
            <b-card-text>
              <b>Data de entrada:</b> {{ formatDate(storeHotel.reserva_hotel.data_entrada) }}
            </b-card-text>
            <b-card-text>
              <b>Data de partida:</b> {{ formatDate(storeHotel.reserva_hotel.data_partida) }}
            </b-card-text>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      compras: [],
    }
  },
  methods: {
    handleComprar() {
      if (!this.storeIsLogOn) {
        this.$router.push({ path: '/sing_up' })
      } else {
        this.$http.post(
          'https://ep-dsid.herokuapp.com/reservas/', {
            usuario: this.$store.state.usuario.id,
            reserva_voo: {
              voos: [
                this.storeIda,
                this.storeVolta,
              ],
              num_passageiros: Number(this.form.adultos) + Number(this.form.menores),
            },
            reserva_hotel: this.storeHotel,
          },
        )
          .then(() => {
            this.$store.commit('selectedIda', {})
            this.$store.commit('selectedVolta', {})
            this.$store.commit('selectedHotel', {})
            this.$bvModal.show('bv-modal-success')
          })
          .catch((error) => {
            console.log(error)
          })
      }
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
    getCompras() {
      this.$http.get(
        `https://ep-dsid.herokuapp.com/usuarios/id/${this.$store.state.usuario.id}/reservas/`,
      )
        .then((response) => {
          console.log(response.data)
          this.compras = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  computed: {
    storeIda() {
      return this.$store.state.selectedIda
    },
    storeVolta() {
      return this.$store.state.selectedVolta
    },
    storeHotel() {
      return this.$store.state.selectedHotel
    },
    storeIsLogOn() {
      return this.$store.state.isLogOn
    },
    storeUsuario() {
      return this.$store.state.usuario
    },
  },
  mounted() {
    if (this.storeIsLogOn) {
      this.getCompras()
    } else {
      this.$router.push({ path: '/' })
    }
  },
}
</script>

<style lang="css" scoped>
</style>
