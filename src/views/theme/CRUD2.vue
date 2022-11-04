<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardHeader> Tabla </CCardHeader>
        <CCardBody>
          <table class="table table-success">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>Email</th>
                <th>
                  <CButton
                    color="info"
                    v-if="accion === 1"
                    @click="guardarTipos()"
                    >Crear</CButton
                  >
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tipos in arrayTipos" :key="tipos.id">
                <td v-text="tipos.id"></td>
                <td v-text="tipos.nombre"></td>
                <td v-text="tipos.telefono"></td>
                <td v-text="tipos.email"></td>
                <td>
                  <CButton
                    color="warning"
                    @click="definirAccion('actualizar', tipos)"
                    >Actualizar</CButton
                  >
                  <CButton
                    color="danger"
                    @click="definirAccion('eliminar', tipos)"
                    >Eliminar</CButton
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardHeader> Formulario de Proveedores</CCardHeader>
        <CCardBody>
          <CForm>
            <div class="mb-3">
              <CFormLabel>Datos</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Nombre proveedor"
                v-model.trim="nombre"
                :disabled="accion === 3"
              >
              </CFormInput>
              <CFormInput
                type="text"
                placeholder="Numero Telefono"
                v-model.trim="telefono"
                :disabled="accion === 3"
              >
              </CFormInput>
              <CFormInput
                type="text"
                placeholder="Correo Electronico"
                v-model.trim="email"
                :disabled="accion === 3"
              /><!--
              <CSelect label="Tabla heredada" :options="arrayHerencia" /> -->
              <CButton
                color="warning"
                v-if="accion === 2"
                @click="actualizarTipos()"
                >Actualizar
              </CButton>
              <CButton
                color="danger"
                v-if="accion === 3"
                @click="eliminarTipos()"
                >Eliminar
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from 'axios'

export default {
  name: 'crud2',
  data() {
    return {
      arrayTipos: [],
      accion: 1, //1 para ingreso, 2 para actualizacion, 3 para eliminar
      nombre: '',
      telefono: '',
      email: '',
      id: 0,
    }
  },
  computed: {
    //aqui cuando ya querramos paginar
  },
  methods: {
    traerTipos() {
      let me = this
      axios
        .get(`http://localhost:3000/proveedores/get`)
        .then(function (response) {
          me.arrayTipos = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    guardarTipos() {
      let me = this
      axios
        .post(`http://localhost:3000/proveedores/create`, {
          nombre: me.nombre,
          telefono: me.telefono,
          email: me.email,
          //Aqui se envian los atributos
          //primero como se llama en backend, luego como se declaro en frontend
        })
        .then(function (response) {
          me.traerTipos()
          console.log(response)
          me.accion = 1
          me.nombre = ''
          me.telefono = ''
          me.email = ''
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    actualizarTipos() {
      let me = this
      axios
        .put(`http://localhost:3000/proveedores/update`, {
          id: me.id,
          nombre: me.nombre,
          telefono: me.telefono,
          email: me.email,
        })
        .then(function (response) {
          me.traerTipos()
          console.log(response)
          me.accion = 1
          me.id = 0
          me.nombre = ''
          me.telefono = ''
          me.email = ''
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    eliminarTipos() {
      let me = this
      axios
        .delete(`http://localhost:3000/proveedores/delete`, {
          id: me.id,
        })
        .then(function (response) {
          me.traerTipos()
          console.log(response)
          me.accion = 1
          me.nombre = ''
          me.telefono = ''
          me.email = ''
          me.id = 0
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    definirAccion(accion, data = []) {
      let me = this
      switch (accion) {
        case 'actualizar': {
          me.id = data['id']
          me.nombre = data['nombre']
          me.telefono = data['telefono']
          me.email = data['email']
          me.accion = 2
          break
        }
        case 'eliminar': {
          me.id = data['id']
          me.nombre = data['nombre']
          me.telefono = data['telefono']
          me.email = data['email']
          me.accion = 3
          break
        }
      }
    },
  },
  mounted() {
    this.traerTipos()
  },
}
</script>
