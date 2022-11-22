<template>
 <v-container>
   <div>
    <h1  align="center" >{{ h1.text }}  <v-icon :title="title.text" >{{h1.icon}}</v-icon></h1>
    </div>
  <v-row align="center" class="list px-3 mx-auto">

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
             <v-btn small color="success" :href="add.route">
        {{add.button}}
      </v-btn>

  </v-row>
  <v-spacer></v-spacer>
   <v-spacer></v-spacer>
   &nbsp;
  <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
    >

      <template v-slot:[`item.page_name`]="{ item }">
        <a :href="item.page_name" target="_blank">
         https://pages.planestic.udistrital.edu.co/{{ item.page_name }}
        </a>
    </template>
    <template v-slot:[`item.created_at`]="{ item }">
        {{ getDate(item.created_at) }}
      </template>
     <template v-slot:[`item.actions`]="{ item }">
            <v-icon small :title="actions.edit.title"  class="mr-2" @click="editUser(item.id)">{{actions.edit.icon}}</v-icon>
            <v-icon small :title="actions.detail.title" class="mr-2" @click="detailUser(item.id)">{{actions.detail.icon}}</v-icon>
            <v-icon small :title="actions.delete.title" class="mr-2" @click="deleteUser(item.id)">{{actions.delete.icon}}</v-icon>
          </template>
    </v-data-table>
 </v-container>
</template>

<script>
import UserService from '../../services/users';

export default {
  name: "users-list",
  data() {
    return {
    h1:{ text: "Listado de paginas", icon: "mdi-account" },
    search: '',
    find: { label: 'Buscar por nombre', button: 'Buscar' },
    add: { button: 'Agregar', route: '/pages/add' },
    users: [],
    title: "",
    headers: [
      { text: "Nombre", value: "name", align: "start", sortable: false },
       { text: "Apellido", value: "last_name", sortable: false },
      { text: "Pagina", value:   "page_name", sortable: false },
      { text: "Creado", value: "created_at", sortable: false },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    actions:{
    edit: {  title: "Editar pagina", icon: "mdi-pencil" },
    detail:{  title: "Detalle de pagina", icon: " mdi-format-list-bulleted" },
    delete:{ title: "Eliminar pagina", icon: "mdi-delete" },
    }
  };
  },
  methods: {
    retrieveUsers() {   
      UserService.getUsersByEmail(localStorage.email)
        .then((response) => {
          this.users = response.data
        })
        .catch((e) => {
          console.log(e);
        });
        
    },

    refreshList() {
      this.retrieveUsers();
    },


    removeAllUsers() {
      
    },
    getDate(date) {
      const localDate = new Date(date);
      return localDate;
    },
    
    searchTitle() {
       UserService.getUsersByEmail(this.title)
        .then((response) => {
          this.users = response.data
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editUser(id) {
      this.$router.push({ name: "editusers", params: { id: id } });
    },
        detailUser(id) {
      this.$router.push({ name: "detailpages", params: { id: id } });
    },
    deleteUser(id) {
      UserService.deleteUsersById(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayUser(user) {
      return {
        id: user.id,
        title: user.title.length > 30 ? user.title.substr(0, 30) + "..." : user.title,
        description: user.description.length > 30 ? user.description.substr(0, 30) + "..." : user.description,
        status: user.published ? "Published" : "Pending",
      };
    },
  },
  mounted() {
    this.retrieveUsers();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
