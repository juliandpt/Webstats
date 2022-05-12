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
                Sign in
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
    errorEmail: false,
    errorEmailMessage: "",
    errorPassword: false,
    errorPasswordMessage: "",
    show: false,
    email: '',
    password: ''
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
          this.$route.push('/admin')
        })
        .catch((error) => {
          console.error(error)
        })

    }
  }
};
</script>