<template>
  <div class="hello">
    <b-col lg="10"
    offset-lg="1"
    md="12">
      <b-card
        title="Pacotes de viagens"
        title-tag="h2"
        sub-title="Encontre pacotes de viagem"
        sub-title-tag="h4"
        cols="10"
        offset="1"
      >
        <validation-observer ref="observer" v-slot="{ handleSubmit }">
          <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
            <b-form-row>
              <b-col>
                <validation-provider
                  name="origem"
                  rules="required"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="origen-input"
                    label="Origem:"
                    label-for="input-2"
                  >
                    <v-select
                      class="style-chooser"
                      :searchable="true"
                      placeholder="Insira seu local de origen"
                      v-model="form.origem"
                      label="PlaceName"
                      @search="getLocalesOrigem"
                      :options="origemOptions"
                      :reduce="place => place.PlaceId"
                      :state="getValidationState(validationContext)"
                    >
                      <template v-slot:no-options="{ search, searching }">
                       <template v-if="searching">
                         Sem resultados para <em>{{ search }}</em>
                         <span v-if="search.length < 3"> insira pelo menos 3 caracteres</span>.
                       </template>
                        <em style="opacity: 0.5;" v-else>
                          Comece a digitar para procurar um local.
                        </em>
                     </template>
                    </v-select>
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col>
                <validation-provider
                  name="destino"
                  rules="required"
                  v-slot="validationContext"
                >
                  <b-form-group
                    label="Destino:"
                    label-for="destino-input"
                  >
                    <v-select
                      class="style-chooser"
                      @search="getLocalesDestino"
                      placeholder="Insira seu local de origen"
                      v-model="form.destino"
                      label="PlaceName"
                      :searchable="true"
                      :reduce="place => place.PlaceId"
                      :options="destinoOptions"
                      :state="getValidationState(validationContext)"
                    >
                      <template v-slot:no-options="{ search, searching }">
                        <template v-if="searching">
                          Sem resultados para <em>{{ search }}</em>.
                        </template>
                        <em style="opacity: 0.5;" v-else>
                          Comece a digitar para procurar um local.
                        </em>
                     </template>
                    </v-select>
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col>
                <validation-provider
                  name="origem"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="origen-input"
                    label="Hotel:"
                  >
                    <v-select
                      class="style-chooser"
                      :searchable="true"
                      placeholder="Insira o local do hotel"
                      v-model="form.hotel"
                      :getOptionLabel="getLabeLHotelPlace"
                      @search="getLocalesHotels"
                      :options="localHotelOptions"
                      :reduce="place => place.result_object"
                      :state="getValidationState(validationContext)"
                    >
                      <template v-slot:no-options="{ search, searching }">
                       <template v-if="searching">
                         Sem resultados para <em>{{ search }}</em>
                         <span v-if="search.length < 3"> insira pelo menos 3 caracteres</span>.
                       </template>
                        <em style="opacity: 0.5;" v-else>
                          Comece a digitar para procurar um local.
                        </em>
                     </template>
                    </v-select>
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-form-row>
            <b-form-row>
              <b-col
                lg="6"
                md="6"
              >
              <b-form-row>
                <b-col
                  lg="6"
                  md="6"
                >
                  <validation-provider
                  name="ida"
                  rules="required|beforeTarget:@volta|futureDate"
                  v-slot="validationContext"
                  >
                    <b-form-group
                      id="input-group-datas"
                      label="Partida:"
                      label-for="ida-input"
                    >
                      <b-form-datepicker
                        id="ida-input"
                        v-model="form.dataIda"
                        class="mb-2"
                        placeholder="Selecione a data da partida"
                        locale="pt-BR"
                        label-no-date-selected="Data não selecionada"
                        :state="getValidationState(validationContext)"
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                      />
                      <b-form-invalid-feedback>
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col
              lg="6"
              md="6"
              >
                <validation-provider
                  name="volta"
                  rules="required|futureDate"
                  v-slot="validationContext"
                >
                  <b-form-group
                    id="input-group-datas"
                    label="Volta:"
                    label-for="ida-input"
                  >
                    <b-form-datepicker
                      id="volta-input"
                      v-model="form.dataVolta"
                      class="mb-2"
                      placeholder="Selecione a data da volta"
                      label-no-date-selected="Data não selecionada"
                      locale="pt-BR"
                      :state="getValidationState(validationContext)"
                      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-form-row>
          </b-col>
          <b-col
            lg="6"
            md="6"
          >
            <b-form-row>
              <b-col
                lg="6"
                md="6"
              >
                <validation-provider
                name="adultos"
                rules="hasPassanger:@menores"
                v-slot="validationContext"
                >
                  <b-form-group
                    id="input-group-pessoas"
                    label="Adultos:"
                    label-for="adultos-input"
                  >
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-button
                          variant="outline-primary"
                          @click="decrementAdultos()"
                        >
                          <b-icon-dash />
                        </b-button>
                      </b-input-group-prepend>
                      <b-form-input
                        id="adultos-input"
                        v-mask="'##'"
                        v-model="form.adultos"
                        :state="getValidationState(validationContext)"
                      />
                      <b-input-group-append>
                          <b-button
                            variant="outline-primary"
                            @click="incrementAdultos()"
                          >
                            <b-icon-plus />
                          </b-button>
                        </b-input-group-append>
                      </b-input-group>
                      <b-form-invalid-feedback>
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col
                  lg="6"
                  md="6"
                >
                  <validation-provider
                    name="menores"
                    v-slot="validationContext"
                  >
                    <b-form-group
                      id="input-group-pessoas"
                      label="Menores:"
                      label-for="menores-input"
                    >
                      <b-input-group>
                        <b-input-group-prepend>
                          <b-button
                            variant="outline-primary"
                            @click="decrementMenores()"
                          >
                            <b-icon-dash />
                          </b-button>
                        </b-input-group-prepend>
                        <b-form-input
                          id="menores-input"
                          v-mask="'##'"
                          v-model="form.menores"
                          :state="getValidationState(validationContext)"
                        />
                        <b-input-group-append>
                          <b-button
                            variant="outline-primary"
                            @click="incrementMenores()"
                            >
                            <b-icon-plus />
                          </b-button>
                        </b-input-group-append>
                      </b-input-group>
                      <b-form-invalid-feedback>
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-form-row>
            </b-col>
            </b-form-row>
            <b-button
              variant="primary"
              type="submit"
            >
              Buscar Passagems
            </b-button>
          </b-form>
        </validation-observer>
      </b-card>
    </b-col>
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
        v-if="storeHotel.nome_hotel"
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
                <b>Nome:</b> {{ storeHotel.nome_hotel }}
              </b-card-text>
              <b-card-text>
                <b>Diária:</b>
                  R$ {{ formatPrice(storeHotel.valor_diaria) }}
              </b-card-text>
              <b-card-text>
                <b>Endereco:</b> {{ storeHotel.endereco }}
              </b-card-text>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row
      v-if="storeHotel.nome_hotel || storeVolta.valor_total || storeIda.valor_total"
      class="mb-3"
    >
      <b-col
        lg=10
        offset-lg=1
      >
        <b-button block variant="primary" @click="handleComprar">Comprar Pacote</b-button>
      </b-col>
    </b-row>
    <b-col>
      <b-tabs content-class="mt-3">
        <b-tab title="Ida" active>
          <viagem-cards
            :current-carriers="currentCarriers"
            :current-places="currentPlaces"
            :current-quotes="currentQuotes"
            :is-ida="true"
          />
        </b-tab>
        <b-tab title="Volta">
          <viagem-cards
            :current-carriers="currentVoltaCarriers"
            :current-places="currentVoltaPlaces"
            :current-quotes="currentVoltaQuotes"
            :is-ida="false"
          />
        </b-tab>
        <b-tab title="Hoteis">
          <hotel-cards :hotel-data="hotelData" />
        </b-tab>
      </b-tabs>
    </b-col>
  </div>
</template>
<script>
import * as R from 'ramda'
import moment from 'moment'
import viagemCards from '@/components/viagemCards'
import hotelCards from '@/components/hotelCards'

export default {
  name: 'HelloWorld',
  data() {
    return {
      form: {
        origem: '',
        destino: '',
        classe: null,
        dataIda: '',
        dataVolta: '',
        adultos: 0,
        menores: 0,
        hotel: '',
      },
      classes: [
        {
          text: 'Selecione A classe',
          value: null,
        },
        'Econômica',
        'Premium economy',
        'Executiva',
        'Primeira Classe',
      ],
      origemOptions: [],
      destinoOptions: [],
      localHotelOptions: [],
      currentCarriers: [],
      currentPlaces: [],
      currentQuotes: [],
      currentVoltaCarriers: [],
      currentVoltaPlaces: [],
      currentVoltaQuotes: [],
      hotelData: [],
    }
  },
  components: {
    viagemCards,
    hotelCards,
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
  },
  methods: {
    incrementAdultos() {
      this.form.adultos = Number(this.form.adultos) + 1
    },
    decrementAdultos() {
      if (Number(this.form.adultos) !== 0) {
        this.form.adultos = Number(this.form.adultos) - 1
      }
    },
    incrementMenores() {
      this.form.menores = Number(this.form.menores) + 1
    },
    decrementMenores() {
      if (Number(this.form.menores) !== 0) {
        this.form.menores = Number(this.form.menores) - 1
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    getLocalesHotels(query) {
      if (query.length >= 3) {
        this.$http({
          method: 'GET',
          url: 'https://tripadvisor1.p.rapidapi.com/locations/auto-complete',
          headers: {
            'content-type': 'application/octet-stream',
            'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
            'x-rapidapi-key': '9cd8fc055dmsh2c162693b5d2701p154ceajsn1ca4dab87141',
            useQueryString: true,
          },
          params: {
            lang: 'pt_BR',
            units: 'km',
            query,
          },
        })
          .then((response) => {
            this.localHotelOptions = response.data.data
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    getLabeLHotelPlace(place) {
      if (R.is(String, place)) {
        return place
      }

      if (place.result_object) {
        return place.result_object.name
      }
      return ''
    },
    getLocalesOrigem(query) {
      if (query.length >= 3) {
        this.$http({
          method: 'GET',
          url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/BR/BRL/pt-BR/',
          headers: {
            'content-type': 'application/octet-stream',
            'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
            'x-rapidapi-key': '9cd8fc055dmsh2c162693b5d2701p154ceajsn1ca4dab87141',
            useQueryString: true,
          },
          params: {
            query,
          },
        })
          .then((response) => {
            this.origemOptions = response.data.Places
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    async getHotels() {
      const idaMomentDate = moment(this.idaData, 'YYYY-MM-DD')
      const voltaMomentDate = moment(this.voltaData, 'YYYY-MM-DD')

      if (!this.form.hotel) {
        return
      }

      this.$http({
        method: 'GET',
        url: 'https://tripadvisor1.p.rapidapi.com/hotels/list',
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
          'x-rapidapi-key': '9cd8fc055dmsh2c162693b5d2701p154ceajsn1ca4dab87141',
          useQueryString: true,
        },
        params: {
          subcategory: 'hotel',
          lang: 'pt_BR',
          currency: 'BRL',
          nights: idaMomentDate.diff(voltaMomentDate, 'days'),
          hotel_class: '1%2C2%2C3',
          order: 'asc',
          checkin: this.dataIda,
          sort: 'recommended',
          child_rm_ages: this.formatMenoresField(this.form.menores),
          adults: this.form.adultos,
          rooms: '1',
          location_id: this.form.hotel.location_id,
        },
      })
        .then((response) => {
          this.hotelData = response.data.data
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    formatMenoresField(menoresNumber) {
      let searchString = ''
      for (let i = 0; i < menoresNumber; i++) {
        searchString += '10,'
      }
      return searchString
    },
    getLocalesDestino(query) {
      if (query.length >= 3) {
        this.$http({
          method: 'GET',
          url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/BR/BRL/pt-BR/',
          headers: {
            'content-type': 'application/octet-stream',
            'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
            'x-rapidapi-key': '9cd8fc055dmsh2c162693b5d2701p154ceajsn1ca4dab87141',
            useQueryString: true,
          },
          params: {
            query,
          },
        })
          .then((response) => {
            this.destinoOptions = response.data.Places
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    onSubmit() {
      this.getHotels()
      this.updateIdaData()
      this.updateVoltaData()
    },
    updateIdaData() {
      this.$http({
        method: 'GET',
        url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/BR/BRL/pt-BR/${this.form.origem}/${this.form.destino}/${this.form.dataIda}`,
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
          'x-rapidapi-key': '9cd8fc055dmsh2c162693b5d2701p154ceajsn1ca4dab87141',
          useQueryString: true,
        },
      })
        .then((response) => {
          console.log(response)
          this.currentQuotes = response.data.Quotes
          this.currentPlaces = response.data.Places
          this.currentCarriers = response.data.Carriers
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateVoltaData() {
      this.$http({
        method: 'GET',
        url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/BR/BRL/pt-BR/${this.form.destino}/${this.form.origem}/${this.form.dataVolta}`,
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
          'x-rapidapi-key': '9cd8fc055dmsh2c162693b5d2701p154ceajsn1ca4dab87141',
          useQueryString: true,
        },
      })
        .then((response) => {
          console.log(response)
          this.currentVoltaQuotes = response.data.Quotes
          this.currentVoltaPlaces = response.data.Places
          this.currentVoltaCarriers = response.data.Carriers
        })
        .catch((error) => {
          console.log(error)
        })
    },
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
    handleComprar() {
      if (!this.isLogOn) {
        this.$router.push({ path: '/sing_up' })
      }
      // return momentDate.format('DD/MM/yyyy')
    },
  },
  mounted() {
    // this.getFlights()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
