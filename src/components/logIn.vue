<template>
  <b-container>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
        <validation-provider
          name="Email"
          :rules="{ required: true, min: 3, email: true }"
          v-slot="validationContext"
        >
          <b-form-group id="example-input-group-1" label="Email" label-for="example-input-1">
            <b-form-input
              id="example-input-1"
              name="example-input-1"
              v-model="form.email"
              :state="getValidationState(validationContext)"
              aria-describedby="input-1-live-feedback"
            ></b-form-input>

            <b-form-invalid-feedback id="input-1-live-feedback">
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <validation-provider
          name="Senha"
          :rules="{ required: true, min: 6 }"
          v-slot="validationContext"
        >
          <b-form-group id="example-input-group-1" label="Senha" label-for="example-input-1">
            <b-form-input
              id="example-input-1"
              name="example-input-1"
              type="password"
              v-model="form.senha"
              :state="getValidationState(validationContext)"
              aria-describedby="input-1-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="input-1-live-feedback">
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <b-button type="submit" variant="primary">Login</b-button>
      </b-form>
    </validation-observer>
  </b-container>
</template>

<style>
body {
  padding: 1rem;
}
</style>

<script>
export default {
  data() {
    return {
      form: {
        name: null,
        cpf: null,
      },
    }
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    resetForm() {
      this.form = {
        email: null,
        senha: null,
      }

      this.$nextTick(() => {
        this.$refs.observer.reset()
      })
    },
    onSubmit() {
      this.$http.get(
        `https://ep-dsid.herokuapp.com/usuarios/email=${this.form.email}&senha=${this.form.senha}`,
      )
        .then((response) => {
          if (response.data.length > 0) {
            this.$store.commit('setUsuario', response.data[0])
            this.$store.commit('setIsLogOn', true)
            this.$router.push({ path: '/dash' })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
