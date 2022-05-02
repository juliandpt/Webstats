<template>
  <v-container>
    <v-footer
      padless
      color="transparent"
    >
      <v-card
        flat
        tile
        width="100%"
        color="transparent"
        class="text-center"
      >
        <v-card-text
          class="px-0 pb-0"
        >
          Webstats © {{ new Date().getFullYear() }}. All rights reserved
        </v-card-text>
      </v-card>
    </v-footer>
  </v-container>
</template>