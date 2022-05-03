<template>
  <v-container
    :style="$vuetify.breakpoint.xl ? 'padding: 0 15%' : ''"
  >
    <v-row
      class="mt-8 mb-8 d-flex flex-column justify-center text-center"
    >
      <h1
        class="mx-auto mb-0"
      >
        Contactanos!
      </h1>

      <p
        class="mx-auto secondary--text"
      >
        Escribe al servicio de sugerencias y reclamaciones
      </p>
    </v-row>

    <v-row
      class="mt-8 mb-8 d-flex flex-column justify-center"
    >
      <v-col
        class="d-flex flex-row align-center justify-center"
      >
        <v-card
          flat
          elevation="0"
          class="mx-2 d-flex flex-column align-center justify-center text-center"
          v-for="(card, i) in cards"
          :key="i"
          :width="$vuetify.breakpoint.xs ? '100%' : '12rem'"
        >
          <v-img
            contain
            class="mx-3 mt-3"
            height="30"
            width="30"
            :src="card.icon"
          ></v-img>

          <v-card-text
            ref="textToCopy"
          >
            {{ card.text }}
          </v-card-text>
        </v-card>
      </v-col>     
    </v-row>

    <v-row>
      <v-col
        :class="$vuetify.breakpoint.xs ? 'd-flex flex-row alig-center justify-center pt-0' : 'd-flex flex-row alig-center justify-center'"
        :order="$vuetify.breakpoint.xs ? '1' : '2'"
      >
        <v-card
          :outlined="!$vuetify.theme.dark"
          elevation="0"
          class="pa-8"
          :width="$vuetify.breakpoint.xs ? '100%' : '38rem'"
        >
          <v-form
            ref="form"
            v-model="valid"
          >
            <v-card-text
              class="px-0 pt-0"
            >
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                >
                  <v-text-field
                    filled
                    rounded
                    required
                    clearable
                    clear-icon="mdi-window-close"
                    label="Nombre"
                    hide-details="auto"
                    class="rounded ma-0"
                    color="primary"
                    v-model="name"
                    :rules="nameRules"
                  >
                  </v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                  :class="$vuetify.breakpoint.xs ? 'pt-0' : ''"
                >
                  <v-text-field
                    filled
                    rounded
                    auto-grow
                    required
                    clearable
                    clear-icon="mdi-window-close"
                    label="Email"
                    placeholder="example@domain.com"
                    hide-details="auto"
                    class="rounded"
                    color="primary"
                    v-model="email"
                    :rules="emailRules"
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col
                  :class="$vuetify.breakpoint.xs ? 'pt-0' : ''"
                >
                  <v-textarea
                    filled
                    rounded
                    auto-grow
                    counter
                    required
                    clearable
                    clear-icon="mdi-window-close"
                    label="Mensaje"
                    class="rounded"
                    color="primary"
                    maxlength="500"
                    rows="8"
                    v-model="message"
                    :rules="messageRules"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-text
              class="pa-0"
            >
              <v-btn
                x-large
                color="primary"
                elevation="0"
                :dark="valid"
                :disabled="!valid"
                block
                :loading="loading"
                @click="sendEmail()"
              >
                Enviar Mensaje
              </v-btn>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar
      app
      right
      :text="!$vuetify.theme.dark"
      v-model="snackbarShow"
      :color="error ? 'red darken-3' : 'green darken-2'"
    >
      <v-layout
        align-center
        pr-4
      >
        <img
          src="/icons/error-white.svg"
          class="mr-1"
          height="24"
          width="24"
          v-if="error && $vuetify.theme.dark"
        >

        <img
          src="/icons/error.svg"
          class="mr-1"
          height="24"
          width="24"
          v-if="error && !$vuetify.theme.dark"
        >

        <img
          src="/icons/circle-check-white.svg"
          class="mr-1"
          height="24"
          width="24"
          v-if="!error && $vuetify.theme.dark"
        >

        <img
          src="/icons/circle-check-green.svg"
          class="mr-1"
          height="24"
          width="24"
          v-if="!error && !$vuetify.theme.dark"
        >

        {{ text }}
      </v-layout>

      <template
        v-slot:action="{ attrs }"
      >
        <v-btn
          icon
          v-bind="attrs"
          @click="snackbarShow = false"
        >
          <img
            src="/icons/close-white.svg"
            height="24"
            width="24"
            v-if="$vuetify.theme.dark"
          >

          <img
            src="/icons/close-red.svg"
            height="24"
            width="24"
            v-if="!$vuetify.theme.dark && error"
          >

          <img
            src="/icons/close-green.svg"
            height="24"
            width="24"
            v-if="!$vuetify.theme.dark && !error"
          >
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<style lang="scss" scoped>
.container {
  min-height: 100%;
}
</style>

<script>
import axios from "axios"

export default {
  head() {
    return {
      title: "Contacto",
    };
  },
  data: () => ({
    valid: false,
    loading: false,
    snackbarShow: false,
    text: '',
    error: false,
    name: '',
    nameRules: [
      value => !!value
    ],
    email: '',
    emailRules: [
      value => !!value,
      value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/.test(value),
    ],
    message: '',
    messageRules: [
      value => !!value
    ],
    cards: [
      {
        icon: "/icons/mail.svg",
        text: "jdptdev@gmail.com",
        canCopy: true,
        copied: false
      },
      {
        icon: "/icons/phone.svg",
        text: "+34 620 69 69 68",
        canCopy: true,
        copied: false
      },
      {
        icon: "/icons/location.svg",
        text: "Madrid, Spain",
        canCopy: false,
        copied: false
      }
    ]
  }),
  methods: {
    sendEmail: function () {
      this.loading = true

      let url = 'http://127.0.0.1:8080/contact/sendEmail'
      let messageParams = {
        name: this.name,
        email: this.email,
        message: this.message
      }

      axios.post(url, messageParams)
        .then((response) => {
          this.error = false
          this.$refs.form.reset()
          this.text = 'Email enviado correctamente!'
          this.loading = false
          this.snackbarShow = true
        })
        .catch((error) => {
          this.error = true
          this.text = 'Algo salio mal...'
          this.loading = false
          this.snackbarShow = true
        })
    },
    copyText: function (text, i) {
      navigator.clipboard.writeText(text);
      this.cards[i].copied = true
      setTimeout (() => {
        this.cards[i].copied = false
      }, 3000)
    }
  }
};
</script>