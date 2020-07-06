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

            <b-form-invalid-feedback id="input-1-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <validation-provider
          name="Name"
          :rules="{ required: true, min: 3 }"
          v-slot="validationContext"
        >
          <b-form-group id="example-input-group-1" label="Nome" label-for="example-input-1">
            <b-form-input
              id="example-input-1"
              name="example-input-1"
              v-model="form.name"
              :state="getValidationState(validationContext)"
              aria-describedby="input-1-live-feedback"
            ></b-form-input>

            <b-form-invalid-feedback id="input-1-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <validation-provider
          name="CPF"
          :rules="{ required: true, min: 11 }"
          v-slot="validationContext"
        >
          <b-form-group id="example-input-group-1" label="CPF" label-for="example-input-1">
            <b-form-input
              id="example-input-1"
              name="example-input-1"
              v-model="form.cpf"
              v-mask="'###.###.###-##'"
              :state="getValidationState(validationContext)"
              aria-describedby="input-1-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="input-1-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
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
            <b-form-invalid-feedback id="input-1-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

        <b-button type="submit" variant="primary">Cadastrar</b-button>
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
        name: null,
        cpf: null,
        email: null,
        senha: null,
      }

      this.$nextTick(() => {
        this.$refs.observer.reset()
      })
    },
    onSubmit() {
      this.$http.post(
        'https://ep-dsid.herokuapp.com/usuarios/',
        {
          crossDomain: true,
          data: this.form,
          headers: {
            Connection: 'keep-alive',
            Server: 'gunicorn/20.0.4',
            Vary: 'Accept, Origin, Cookie',
            Allow: 'GET, POST, HEAD, OPTIONS',
            'X-Frame-Options': 'DENY',
            'X-Content-Type-Options': 'nosniff',
            'Content-Type': 'application/json',
          },
        },
      )
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
