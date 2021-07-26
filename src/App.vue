<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center mr-2">
        {{title}}
      </div>
      <v-btn :to="button.route" v-for="(button, index) in buttons" :key="index" text>
        {{button.text}}
      </v-btn>
       
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
     <v-dialog
        v-model="dialog3"
        max-width="500px"
      >
        <v-card>
         
          <v-card-text>
            <v-text-field v-model="newToken" name="courses" item-value="id" item-text="shortname" label="token de moodle"/>
             <v-text-field v-model="newUrl" name="roles" item-value="id" item-text="name" label="url de moodle"/>
       <v-btn small color="success" @click="saveCred"> agregar credenciales </v-btn>
           <div>
    </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="dialog3 = false"
            >
              cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

  </v-app>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
       dialog3: false,
      title: 'PLANESTIC',
      buttons:[
        {text:'Inicio', route:'/home'},
        {text:'Paginas', route:'/pages'},
        ],
               newToken: localStorage.token,
       newUrl: localStorage.url
    }
  },
  methods: {
    saveCred(){
      localStorage.token = this.newToken
      localStorage.url = this.newUrl
      this.newUrl = ''
      this.newToken = ''
      location.reload()
    },
    del(){
      localStorage.clear()
       this.$router.push({ name: "home" });
    },
    open(){
      this.dialog3 = true
       this.newUrl = localStorage.token
      this.newToken =  localStorage.url
    }
  }
};
</script>
