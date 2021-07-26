<template>
  <div>
    <v-row
      justify="center"
    >
      <v-btn
        color="primary"
        class="ma-2"
        dark
        @click="dialog2 = true"
      >
        Agregar cursos
      </v-btn>
      <v-menu
        bottom
        offset-y
      >
      </v-menu>

      <v-dialog
        v-model="dialog2"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            Agregar cursos
          </v-card-title>
          <v-card-text>
            <v-select
              :items="select"
              label="A Select List"
              item-value="text"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="dialog2 = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
     
    </v-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog2: false,
        select: [
          { text: 'State 1' },
          { text: 'State 2' },
          { text: 'State 3' },
          { text: 'State 4' },
          { text: 'State 5' },
          { text: 'State 6' },
          { text: 'State 7' },
        ],
      }
    },
  }
</script>