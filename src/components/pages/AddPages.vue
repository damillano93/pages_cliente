<template>
  <v-container class="lighten-5">
    <div>
      <h1>{{ title }}</h1>
    </div>
    <v-row align="center" class="list px-3 mx-auto">
      <div class="panel-body">
        <vue-form-generator
          :schema="schema"
          :model="model"
          :options="formOptions"
        >
        </vue-form-generator>
      </div>
      <div>
        <v-alert v-if="result.state" border="top" :color="result.color" dark>
          {{ result.text }}
        </v-alert>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import VueFormGenerator from "vue-form-generator";
import UserService from "../../services/users";

export default {
  data() {
    return {
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
    submit(model) {
      UserService.createUser({name: model.name, last_name:model.last_name, email: model.email, page_name: model.page_name})
        .then(({ data }) => {
          this.result = {
            text: `la pagina se creo https://pages.planestic.udistrital.edu.co/${model.page_name}  ${data}`,
            color: "green lighten-2",
            state: true,
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