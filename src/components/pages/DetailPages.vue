<template>
  <v-container class="grey lighten-5">
    <h1>{{ title }}</h1>
    <v-row align="center" class="list px-3 mx-auto">
      <v-card class="mx-auto" max-width="344">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
        ></v-img>

        <v-card-text>
          <h3 class="title primary--text">
            {{ text.firstName }} {{ model.firstName }}
          </h3>
          <h3 class="title primary--text">
            {{ text.lastName }} {{ model.lastName }}
          </h3>
          <h3 class="title primary--text">
            {{ text.email }} {{ model.email }}
          </h3>
          <h3 class="title primary--text">
            {{ text.userName }} {{ model.userName }}
          </h3>
          <v-icon small class="mr-2" @click="editUser(model.email)"
            >mdi-pencil</v-icon
          >
          <v-icon small @click="deleteUser(model.id)">mdi-delete</v-icon>
        </v-card-text>
      </v-card>
    </v-row>
    <v-btn small color="success" @click="getCourses"> ver cursos </v-btn>
    &nbsp;
          <v-btn small color="primary"  @click="dialog2 = true" >
        Agregar cursos
      </v-btn>
        <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>{{title2}}</v-card-title>

        <v-data-table
          :headers="headers"
          :items="courses"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editCourses(item.id)">mdi-pencil</v-icon>
            <v-icon small class="mr-2" @click="detailCourses(item.id)">mdi-domain</v-icon>
            <v-icon small @click="deleteCourses(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="courses.length > 0">

        </v-card-actions>
      </v-card>
    </v-col>
     <v-dialog
        v-model="dialog2"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            Agregar cursos
          </v-card-title>
          <v-card-text>
            <v-select :items="allCourses" v-model="newCourse" name="courses" item-value="id" item-text="shortname" label="Select a course"/>
             <v-select :items="roles" v-model="newRoleId" name="roles" item-value="id" item-text="name" label="Select a role"/>
       <v-btn small color="success" @click="addCourses"> agregar curso </v-btn>
           <div>
      <v-alert v-if="result.state" border="top" :color="result.color" dark>
        {{ result.text }}
      </v-alert>
    </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="dialog2 = false"
            >
              cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
import moodle from "../../services/moodle";
import MoodleService from "../../services/moodle";
export default {
  data() {
    return {
      title: "DETAIL USER",
       title2: "COURSES",
       result: { state: false},
      model: {},
      text: {
        firstName: "Nombre:",
        lastName: "Apellido:",
        email: "Email:",
        userName: "Nombre de usuario:",
      },
      courses: [],
      headers: [
        { text: "shortname",  value: "shortname", align: "start", sortable: false },
        { text: "categoryid", value: "categoryid", sortable: false },
        { text: "fullname", value: "fullname", sortable: false },
        { text: "displayname", value: "displayname", sortable: false },
        { text: "summary", value: "summary", sortable: false },
        { text: "visible", value: "visible", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
       dialog2: false,
       allCourses : [],
       roles: [
         {id: "1", name: "manager"},
         {id: "2", name: "coursecreator"},
         {id: "3", name: "editingteacher"},
         {id: "4", name: "teacher"},
         {id: "5", name: "student"},
         {id: "6", name: "guest"},
         {id: "7", name: "user"},
         {id: "8", name: "frontpage"},
       ],
       newCourse: "",
       newRoleId: ""
    };
  },
  methods: {
    getUser(email) {
      MoodleService.getUsersByEmail(email)
        .then((response) => {
          this.model = {
            id: response.data.users[0].id,
            userName: response.data.users[0].username,
            password: response.data.users[0].password,
            firstName: response.data.users[0].firstname,
            lastName: response.data.users[0].lastname,
            email: response.data.users[0].email,
          };
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editUser(id) {
      this.$router.push({ name: "editusers", params: { id: id } });
    },
    deleteUser(id) {
      moodle
        .deleteUsersById(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getCourses() {
      const id = this.model.id
      console.log(id)
      
      MoodleService.getCoursesByUserId(id)
        .then((response) => {
          this.courses = response.data;
          console.log(this.courses);
        })
        .catch((e) => {
          console.log(e);
        });
        
    },
        getallCourses() {
      
      MoodleService.getCourses()
        .then((response) => {
          this.allCourses = response.data;
          console.log(this.allCourses);
        })
        .catch((e) => {
          console.log(e);
        });
        
    },
    addCourses(){
        const idCourse =  this.newCourse
        const idUser = this.model.id 
        const idRole =  this.newRoleId

        const data = {
          roleId: idRole,
          courseId: idCourse,
          userId: idUser
        }
          MoodleService.enrolUsers(data)
          .then((response) => {
          this.result = {
              text: `el curso usuario se agrego al curso ${response}`,
              color: "green lighten-2",
              state: true
            }
          this.newCourse = ''
          this.newRoleId = ''
        })
        .catch((e) => {
          console.log(e);
        });

        console.log(idCourse, idUser)
    },
  },

  mounted() {
    this.message = "";
    this.getUser(this.$route.params.id);
    this.getallCourses()
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
</style>