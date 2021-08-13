<template>
  <v-container class="lighten-5">
    <v-container>
      <h2>{{ title }} {{ name }}</h2>
    </v-container>
              <v-carousel :show-arrows="false" v-if="!isMobile">
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
    <div class="row row--dense">
      <div
        v-for="(button, index) in buttons"
        :key="index"
        class="col-sm-6 col-lg-4 col-12"
      >
        <div
          class="overflow-hidden v-sheet v-sheet--outlined theme--light rounded"
          min-height="61"
          style="min-height: 61px"
        >
          <a
            :href="button.route"
            class="v-list-item v-list-item--link theme--light"
            tabindex="0"
          >
            <div class="v-list-item__icon">
              <v-icon x-large :title="button.text">{{ button.icon }}</v-icon>
            </div>
            <div class="v-list-item__content">
              <div class="v-list-item__title">{{ button.text }}</div>
              <div class="v-list-item__subtitle">{{ button.description }}</div>
            </div>
          </a>
        </div>
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
          description: "Inicio repositorio",
          icon: "mdi-home",
        },
        {
          text: "Paginas",
          route: "/pages",
          description: "Administración de recursos",
          icon: "mdi-file",
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