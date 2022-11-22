<template>
  <v-container>
    <h1>
      Pagina: /{{ model.page_name }}
      <v-icon large>
        {{ icon }}
      </v-icon>
    </h1>
    <div>
      <v-row>
        <v-col sm="12">
          <v-card class="pa-2" outlined tile>
            <h2>Información de pagina</h2>
          </v-card>
          <v-row no-gutters>
            <v-col cols="8" sm="6">
              <v-card class="pa-2" outlined tile>
                <strong>id:</strong>
              </v-card>
            </v-col>
            <v-col cols="4" sm="6">
              <v-card class="pa-2" outlined tile>
                {{ model.id }}
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="8" sm="6">
              <v-card class="pa-2" outlined tile>
                <strong>url:</strong>
              </v-card>
            </v-col>
            <v-col cols="4" sm="6">
              <v-card class="pa-2" outlined tile>
                <a :href="getUrl(model.page_name)" target="_blank">
                  {{ model.page_name }}
                </a>
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="8" sm="6">
              <v-card class="pa-2" outlined tile>
                <strong>fecha de creación:</strong>
              </v-card>
            </v-col>
            <v-col cols="4" sm="6">
              <v-card class="pa-2" outlined tile>
                {{ getDate(model.created_at) }}
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="8" sm="6">
              <v-card class="pa-2" outlined tile>
                <strong>estado:</strong>
              </v-card>
            </v-col>
            <v-col cols="4" sm="6">
              <v-card class="pa-2" outlined tile>
                Activo
              </v-card>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="8" sm="6">
              <v-card class="pa-2" outlined tile>
                <strong>tipo:</strong>
              </v-card>
            </v-col>
            <v-col cols="4" sm="6">
              <v-card class="pa-2" outlined tile>
                Wordpress
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <div>
      &nbsp;
      &nbsp;
      &nbsp;


      <v-expansion-panels>
    <v-expansion-panel >
      <v-expansion-panel-header>
       Acciones
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row justify="space-around">
          <v-icon large v-for="action in actions" :color=action.color :key="action.icon">{{ action.icon }}</v-icon>
  </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel >
      <v-expansion-panel-header>
       Metricas
      </v-expansion-panel-header>
      <v-expansion-panel-content>
      </v-expansion-panel-content>
    </v-expansion-panel>

  </v-expansion-panels>
  
    </div>
  </v-container>
</template>

<script>
import PagesService from "../../services/users";

export default {
  data() {
    return {
      model: {},
      icon: "mdi-wordpress",
      actions: [{
        color: "green darken-2",
        icon: "mdi-play",
        action: "play"
      },
      {
        color: "gray darken-2",
        icon: "mdi-pause",
        action: "pause"
      },
      {
        color: "red darken-2",
        icon: "mdi-stop",
        action: "stop"
      },]
    };
  },
  methods: {
    getPageInfo(id) {
      PagesService.getUsersByid(id)
        .then((response) => {
          if (response.data) {
            this.model = response.data[0]
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDate(date) {
      const localDate = new Date(date);
      return localDate;
    },

    getUrl(path) {

      return "https://pages.planestic.udistrital.edu.co/" + path;
    },
  },

  mounted() {
    this.message = "";
    this.getPageInfo(this.$route.params.id);
  },
};
</script>

<style>
html {
  font-family: Tahoma;
  font-size: 14px;
}

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
}

pre {
  overflow: auto;
}

pre .string {
  color: #885800;
}

pre .number {
  color: blue;
}

pre .boolean {
  color: magenta;
}

pre .null {
  color: red;
}

pre .key {
  color: green;
}

.container {
  max-width: 970px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

h1 {
  text-align: center;
  font-size: 36px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 500;
}

fieldset {
  border: 0;
}

.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-color: #ddd;
}

.panel-heading {
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;

  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.panel-body {
  padding: 15px;
}

.center {
  margin: auto;
  padding: 1px;
}

.ci {
  margin-right: 0.75rem;
}
</style>
