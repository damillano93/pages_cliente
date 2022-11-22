<template>
  <v-container>
    <v-container>
      <h2>{{ title }} {{ name }}</h2>
    </v-container>

    <div class="row row--dense">
      <div v-for="(button, index) in buttons" :key="index" class="col-sm-8 col-lg-4 col-12">
        <v-card outlined>
          <a
            :href="button.route"
             style="text-decoration: none;"
            >
          <v-list-item three-line>
            <v-list-item-content>
              <v-icon large >
                {{ button.icon }}
              </v-icon>

              <v-list-item-title class="text-h5 mb-1">
                {{ button.text }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ button.description }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          </a>
        </v-card>

      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "Bienvenido",
      name: "",
      isLogin: false,
      buttons: [],
      items: [
   {
            src :'/hosting_1.jpeg'
          },
          {
            src: '/hosting_2.png',
          },
          {
            src: '/hosting_3.jpg',
          },
        ],
        isMobile: false,
    };
  },
  methods: {
    getName() {
      if (localStorage.name) {
        this.isLogin = true;
        this.name = localStorage.name;
      }
    },
        onResize() {
      this.isMobile = window.innerWidth < 800;
    },
  },
  mounted() {
    if (this.$route.query.reload && localStorage.reload !== "OK") {
      localStorage.reload = "OK";
      location.reload();
    }
   
      this.buttons = [
        {
          text: "Inicio",
          route: "/home",
          description: "Inicio hosting",
          icon: "mdi-home",
        },
        {
          text: "Paginas",
          route: "/pages",
          description: "Administración de recursos",
          icon: "mdi-file",
        },
        {
          text: "Crear pagina",
          route: "/pages/add",
          description: "Creación de recursos",
          icon: "mdi-book-open-page-variant",
        }
      ];
    
   
    this.getName();
        this.onResize();

    window.addEventListener("resize", this.onResize, { passive: true });
  },
};
</script>

 <style>
.v-list-item__content {
  align-items: center;
  align-self: center;
  display: flex;
  flex-wrap: wrap;
  flex: 1 1;
  overflow: hidden;
  padding: 12px 0;
}

.list-item__icon {
  display: inline-flex;
  min-width: 24px;
}
</style>