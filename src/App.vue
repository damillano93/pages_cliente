<template>
  <div>
    <v-app>
      <v-app-bar app  style="
  background: -webkit-linear-gradient(-45deg,yellow,red);
  background: linear-gradient(-45deg, yellow,red);
">
        <div v-if="!isMobile" class="d-flex align-center mr-2">
          {{ title }}
        </div>
        <v-menu left bottom v-if="isMobile">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item 
             :to="button.route"
              v-for="(button, index) in buttons"
              :key="index"
              text
            >
              <v-list-item-title >{{ button.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div v-else>
          <div v-if="token">
            <v-btn
              :to="button.route"
              v-for="(button, index) in buttons"
              :key="index"
              text
            >
              {{ button.text }}
            </v-btn>
          </div>
        </div>
        <div>
          <v-tooltip v-if="$vuetify.theme.dark" bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="info" small fab @click="darkMode">
                <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
              </v-btn>
            </template>
            <span>Dark Mode On</span>
          </v-tooltip>

          <v-tooltip v-else bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="info" small fab @click="darkMode">
                <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
              </v-btn>
            </template>
            <span>Dark Mode Off</span>
          </v-tooltip>
        </div>
        <div class="pull-right">
          <div class="pull-right" v-if="isLogin">
            <v-avatar class="pull-right">
              <img :src="url_image" :alt="name" />
            </v-avatar>
            <a @click="logout"> Cerrar sesión </a>
          </div>
          <a
            class="pull-right"
            v-else
            href="https://pages.planestic.udistrital.edu.co/apipages/google"
          >
          
            Iniciar sesión
          </a>
        </div>
      </v-app-bar>

      <v-main>
        <router-view />
      </v-main>
    </v-app>
     <v-footer
    dark
    padless
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="teal">
        <strong >© Copyright  {{ new Date().getFullYear() }} Planestic-UD / Sitio creado y administrado por Planestic UD</strong>

        <v-spacer></v-spacer>
       <img
        class="logo-planestic2"
        src="./assets/images/logo_planestic2-01.png"
      />
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
      
      </v-card-text>
    </v-card>
  </v-footer>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      title: "Hosting UD",
      isLogin: false,
      url_image: "",
      buttons: [],
      name: "",
      token: "",
      isMobile: false,
      theme: "dark",
      myStyle: {
        backgroundColor: "#17aa5c",
        width: 700,
      },
      backStyle: {
          "background-color": "#F3F3F3"
      },
    };
  },
  beforeDestroy() {
    if (typeof window === "undefined") return;

    window.removeEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    image() {
      if (localStorage.url_image) {
        this.isLogin = true;
        this.url_image = localStorage.url_image;
      } else {
        this.isLogin = false;
      }
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      if (this.$vuetify.theme.dark) {
        localStorage.theme = "dark"
        this.backStyle = {
          "background-color": "#1e1e1e"
        }
      }
      else {
        localStorage.theme = "light"
        this.backStyle = {
          "background-color": "#F3F3F3"
        }
      }
    },
    logout() {
      localStorage.removeItem("token")
      this.$router.push({ name: "login" });
      location.reload();
    },
    onResize() {
      this.isMobile = window.innerWidth < 800;
    },
  },
  mounted() {
    if (localStorage.theme == "dark") {
      this.$vuetify.theme.dark = true
    }
    if (localStorage.theme == "light") {
      this.$vuetify.theme.dark = false
    }

    if (localStorage.name) {
      this.name = localStorage.name;
    }
    if (localStorage.token) {
      this.token = localStorage.token;
      this.buttons = [
        { text: "Inicio", route: "/home" },
        { text: "Paginas", route: "/pages" },
      ];
    }
    this.image();
    this.onResize();

    window.addEventListener("resize", this.onResize, { passive: true });
  },
};
</script>
<style >
.pull-right {
  margin-left: auto;
}

.banner-all {
  backgroundcolor: "#8b1919";
  max-height: 170px;
}
.logo-planestic1 {
  margin-left: 20px;
}
.logo-planestic2 {
  max-height: 100px;
  margin: auto;
  margin-top: 5px;
  float: right;
}


</style>