<template>
  <v-container>
    <div>
      <h1>{{ title }}</h1>
    </div>
    <div class="row row--dense">
      <div v-for="(button, index) in buttons" :key="index" class="col-sm-8 col-lg-4 col-12">
        <v-card outlined>
          <a :disabled=button.disabled @click="createPage(button.route)" style="text-decoration: none;">
            <v-list-item three-line>
              <v-list-item-content>
                <v-icon large>
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

    <v-dialog v-model="dialog2" max-width="800px">
      <v-card>
        <v-card-title>
          <h2>Nueva pagina</h2>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="model.name" label="name" required></v-text-field>
          <v-text-field v-model="model.email" label="e-mail" required></v-text-field>
          <v-text-field v-model="model.type" label="tipo" required></v-text-field>
          <v-text-field v-model="model.page_name" label="nombre de la pagina" required></v-text-field>

          <v-btn small color="success" @click="submit()"> Crear pagina </v-btn>
          &nbsp;
          <div>
            <p></p>
            &nbsp; &nbsp;
            <v-alert v-if="result.state" border="top" :color="result.color" dark>
              <a :href="result.url" target="_blank">
                  {{ result.text }}
                </a>
            </v-alert>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialog2 = false">
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import VueFormGenerator from "vue-form-generator";
import UserService from "../../services/users";

export default {
  data() {
    return {
      dialog2: false,
      buttons: [],
      model: {},
      title: "Crear paginas",
      result: { state: false },
      schema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: "Nombre",
            model: "name",
            placeholder: "Escriba el nombre",
            featured: true,
            required: true,

          },
          {
            type: "input",
            inputType: "text",
            label: "Apellido",
            model: "last_name",
            placeholder: "Escriba el apellido",
            featured: true,
            required: true,
          },
          {
            type: "input",
            inputType: "email",
            label: "correo electronico",
            model: "email",
            placeholder: "Escriba el correo electronico",
            validator: VueFormGenerator.validators.email,
          },
          {
            type: "radios",
            inputType: "text",
            label: "Tipo de pagina",
            model: "page_type",
            placeholder: "tipo de pagina que quiere crear",
            featured: true,
            required: true,
            values: ["WORDPRESS", "DRUPAL", "JOOMLA", "MAGENTO", "MOODLE"],
            default: "WORDPRESS",
            help: `la pagina que quiere crear`,
          },
          {
            type: "input",
            inputType: "text",
            label: "Nombre de la pagina",
            model: "page_name",
            placeholder: "Escriba el nombre de la pagina",
            featured: true,
            required: true,
          },
          {
            type: "submit",
            buttonText: "Crear Pagina",
            onSubmit: (model) => this.submit(model),
          },
        ],
      },
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },
    }
  },
  methods: {
    submit() {
      UserService.createUser({ name: this.model.name, last_name: this.model.last_name, email: this.model.email, page_name: this.model.page_name })
        .then(({ data }) => {
          this.result = {
            text: `la pagina se creo https://pages.planestic.udistrital.edu.co/${this.model.page_name}  ${data}`,
            color: "green lighten-2",
            state: true,
            url: `https://pages.planestic.udistrital.edu.co/${this.model.page_name}`,
          };
          this.model = {};
        })
        .catch((e) => {
          this.result = {
            text: `error: ${e}`,
            color: "red lighten-2",
            state: true,
          };
        });
    },
    createPage(type) {
      console.log(type)
      this.dialog2 = true
      this.model = { name: localStorage.name, last_name: localStorage.name, email: localStorage.email, page_name: "", type: type }
    },
  },
  mounted() {
    this.buttons = [
      {
        text: "Wordpress",
        route: "Wordpress",
        description: "Cms wordpress",
        icon: "mdi-wordpress",
        disabled: 0,
      },
      {
        text: "Drupal",
        route: "drupal",
        description: "Cms wordpress",
        icon: "mdi-drupal",
        disabled: 1,

      },
      {
        text: "Contenido estatico",
        route: "html",
        description: "paginas de contenido estatico",
        icon: "mdi-language-html5",
      }
    ];
  }
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