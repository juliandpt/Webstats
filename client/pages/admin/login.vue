<template>
  <v-container
    class="d-flex align-center"
    :style="$vuetify.breakpoint.xl ? 'padding: 0 15%; height: 100%;' : 'height: 100%;'"
  >
    <v-row>
      <v-col
        md=6
        sm=12
        class="d-flex justify-center align-center"
        v-if="!$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
      >
        <img
          src="@/static/images/pc.png"
          height="auto"
          width="100%"
        >
      </v-col>

      <v-col
        md=6
        sm=12
        class="d-flex align-center justify-end"
      >
        <v-card
          color="transparent"
          elevation="0"
          class="pa-0"
          width="100%"
          :max-width="$vuetify.breakpoint.xs ? '100%' : '75%'"
        >
          <v-form
            v-model="valid"
          >
            <v-card-title
              :class="$vuetify.breakpoint.xs ? 'justify-center' : 'mb-5'"
            >
              <h1>
                Hola, Admin!
              </h1>
            </v-card-title>

            <v-card-subtitle
              :class="$vuetify.breakpoint.xs ? 'mb-5 mt-0 text-center primary--text' : 'mb-5 primary--text'"
            >
              <span>
                Inicia sesión para acceder al dashboard de Webstats.
              </span>
            </v-card-subtitle>

            <v-card-text
              class="pt-0 pb-3"
              v-if="serverError"
            >
              <v-alert
                color="error"
                type="error"
              >
                Error del servidor
              </v-alert>
            </v-card-text>

            <v-card-text
              class="pt-0 pb-3"
            >
              <v-text-field
                outlined
                required
                clearable
                persistent-hint
                clear-icon="mdi-window-close"
                label="email"
                color="primary"
                v-model="email"
                :error="errorEmail"
                :rules="emailRules"
                :append-icon="email === '' || email == null ? 'mdi-email-outline' : ''"
                :error-messages="errorEmail ? errorEmailMessage : ''"
                @keyup.enter="login()"
              >
              </v-text-field>
            </v-card-text>

            <v-card-text
              class="pt-0 pb-3"
            >
              <v-text-field
                outlined
                auto-grow
                required
                persistent-hint
                label="contraseña"
                color="primary"
                v-model="password"
                @click:append="show = !show"
                :rules="passwordRules"
                :append-icon="show ? 'mdi-lock-open-variant-outline' : 'mdi-lock-outline'"
                :type="show ? 'text' : 'password'"
                :error="errorPassword"
                :error-messages="errorPassword ? errorPasswordMessage : ''"
                @keyup.enter="login()"
              ></v-text-field>
            </v-card-text>

            <v-card-text
              class="pt-0 pb-4"
            >
              <v-btn
                block
                x-large
                color="primary"
                elevation="0"
                dark
                :loading="loading"
                @click="login()"
              >
                Iniciar Sesión
              </v-btn>
            </v-card-text>
          </v-form>

          <p
            class="mx-4 my-0 text-center"
          >
            - or -
          </p>

          <v-card-text
              class=" pb-4"
            >
              <v-btn
                x-large
                block
                color="error"
                elevation="0"
                :outlined="!$vuetify.theme.dark"
                to="/"
              >
                Home
              </v-btn>
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: "Sign in",
    };
  },
  data: () => ({
    valid: false,
    loading: false,
    serverError: false,
    errorEmail: false,
    errorEmailMessage: "email no encontrado",
    errorPassword: false,
    errorPasswordMessage: "Contraseña incorrecta",
    show: false,

    email: '',
    emailRules: [
      value => !!value,
      value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/.test(value),
    ],
    password: '',
    passwordRules: [
      value => !!value
    ],
  }),
  methods: {
    login: function () {
      this.loading = true

      let payload = {
        email: this.email,
        password: this.password
      }

      this.$axios.post('/admin/login', payload)
        .then((response) => {
          localStorage.setItem('token', response.data.token)
          this.$axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
          this.$router.push('/admin')
          
        })
        .catch((error) => {
          this.loading = false

          if (error.response.status === 404) {
            this.errorEmail = true
          }
          else if (error.response.status === 400) {
            this.errorEmail = false
            this.errorPassword = true
          }
          else {
            this.serverError = true
          }
        })

    }
  }
};
</script>