<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardHeader> Tabla </CCardHeader>
        <CCardBody>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Estado</th>
                <td>Tipo de usuario</td>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tipos in arrayUsuario" :key="tipos.id">
                <td v-text="tipos.id"></td>
                <td v-text="tipos.user"></td>
                <td v-text="tipos.estado"></td>
                <td v-text="tipos.tipo_usuario.nombre"></td>
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
        <CCardHeader> Formulario </CCardHeader>
        <CCardBody>
          <CForm>
            <div class="mb-3">
              <CFormLabel>Nombre</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Tipo de usuario"
                v-model.trim="nombre"
                :disabled="accion === 3"
              /><!--
              <CSelect label="Tabla heredada" :options="arrayHerencia" /> -->
              <select>
                <option
                  v-for="heredados in arrayHerencia"
                  :key="heredados.id"
                  :value="heredados.id"
                  v-text="heredados.nombre"
                  :v-model="id_heredado"
                />
              </select>
              <CButton color="info" v-if="accion === 1" @click="guardarTipos()"
                >Guardar
              </CButton>
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
  name: 'Typography',
  data() {
    return {
      arrayTipos: [],
      arrayHerencia: [],
      arrayUsuario: [],
      accion: 1, //1 para ingreso, 2 para actualizacion, 3 para eliminar
      nombre: '',
      id: 0,
      id_heredado: 0,
    }
  },
  computed: {
    //aqui cuando ya querramos paginar
  },
  methods: {
    traerTipos() {
      let me = this
      axios
        .get(`http://localhost:3000/tipo_usuario/get`)
        .then(function (response) {
          me.arrayTipos = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    traerUsuario() {
      let me = this
      axios
        .get(`http://localhost:3000/usuario/get`)
        .then(function (response) {
          me.arrayUsuario = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    traerHerencia() {
      //Aqui llamar a traer los datos de la tabla que hereda
      let me = this
      axios
        .get(`http://localhost:3000/tipo_usuario/get`)
        .then(function (response) {
          me.arrayHerencia = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    guardarTipos() {
      let me = this
      axios
        .post(`http://localhost:3000/tipo_usuario/create`, {
          nombre: me.nombre, //Aqui se envian los atributos
          //primero como se llama en backend, luego como se declaro en frontend
        })
        .then(function (response) {
          me.traerTipos()
          console.log(response)
          me.accion = 1
          me.nombre = ''
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    actualizarTipos() {
      let me = this
      axios
        .put(`http://localhost:3000/tipo_usuario/update`, {
          id: me.id,
          nombre: me.nombre,
        })
        .then(function (response) {
          me.traerTipos()
          console.log(response)
          me.accion = 1
          me.id = 0
          me.nombre = ''
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    eliminarTipos() {
      let me = this
      axios
        .put(`http://localhost:3000/tipo_usuario/delete`, {
          id: me.id,
        })
        .then(function (response) {
          me.traerTipos()
          console.log(response)
          me.accion = 1
          me.nombre = ''
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
          me.accion = 2
          break
        }
        case 'eliminar': {
          me.id = data['id']
          me.nombre = data['nombre']
          me.accion = 3
          break
        }
      }
    },
  },
  mounted() {
    this.traerTipos(), this.traerHerencia(), this.traerUsuario()
  },
}
</script>
