<template>
  <div class="container">
     <v-carousel :show-arrows="false" v-if="!isMobile">
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
    <div class="google-icon center">
      <a href="https://pages.planestic.udistrital.edu.co/apipages/google">
        <button class="btn btn-light">
          <img
            class="google-icon center"
            src="../assets/images/google-logo.png"
          />
         
        </button>
        
        <!--href="http://localhost:3000/google"-->
      </a>
      <a href="https://pages.planestic.udistrital.edu.co/apipages/google">
        <button class="btn btn-light" disabled>
          <img
            class="ms-icon center"
            src="../assets/images/microsoftlogo.png"
          />
         
        </button>
        
        <!--href="http://localhost:3000/google"-->
      </a>

    </div>
  </div>
</template>

<script>
export default {
  name: "file",
  data() {
    return {
      currentFile: null,
      message: "",
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
    test_local() {
  
        localStorage.setItem("token", "Test")
        localStorage.setItem("name", "Name Test");
    },
  },
  mounted() {
    if (this.$route.query.token) {
      if (!localStorage.token) {
        const { token, name, url_image, rol, email } = this.$route.query;
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        localStorage.setItem("url_image", url_image);
        localStorage.setItem("rol", rol);
        localStorage.setItem("email", email);
        
        //this.$router.go(this.$router.currentRoute);
      }
      this.$router.push({ name: "home", query: {reload:"OK"} });
      //this.$router.push({ name: 'files' })
    }
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
.google-icon {
  padding: 20px;
  width: 70px;
  height: 70px;
}
.ms-icon {
  width: 140px;
  height: 70px;
}
.center {
  margin: auto;
  padding: 1px;
}
.text-access {
  max-width: 300px;
  margin: auto;
}
</style>
