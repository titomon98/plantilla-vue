<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardHeader> Tabla </CCardHeader>
        <CCardBody>
          <table class="table table-info">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Direccion</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th>Nit</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente in arrayClientes" :key="cliente.id">
                <td v-text="cliente.id"></td>
                <td v-text="cliente.nombre"></td>
                <td v-text="cliente.direccion"></td>
                <td v-text="cliente.email"></td>
                <td v-text="cliente.telefono"></td>
                <td v-text="cliente.nit"></td>

                <td>
                  <CButton
                    color="warning"
                    @click="definirAccion('actualizar', cliente)"
                    >Actualizar</CButton
                  >
                  <CButton
                    color="danger"
                    @click="definirAccion('eliminar', cliente)"
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
                placeholder="Cliente"
                v-model.trim="nombre"
                :disabled="accion === 3"
              />
              <CFormLabel>Direccion</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Dir"
                v-model.trim="direccion"
                :disabled="accion === 3"
              />
              <CFormLabel>Telefono</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Cliente"
                v-model.trim="telefono"
                :disabled="accion === 3"
              />
              <CFormLabel>Correo electronico</CFormLabel>
              <CFormInput
                type="email"
                placeholder="Cliente"
                v-model.trim="email"
                :disabled="accion === 3"
              />
              <CFormLabel>Nit</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Cliente"
                v-model.trim="nit"
                :disabled="accion === 3"
              />

              <!--
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
              <CButton
                color="info"
                v-if="accion === 1"
                @click="guardarClientes()"
                >Guardar
              </CButton>
              <CButton
                color="warning"
                v-if="accion === 2"
                @click="actualizarClientes()"
                >Actualizar
              </CButton>
              <CButton
                color="danger"
                v-if="accion === 3"
                @click="eliminarClientes()"
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
  name: 'clientes',
  data() {
    return {
      arrayClientes: [],
      arrayHerencia: [],
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
    traerClientes() {
      let me = this
      axios
        .get(`http://localhost:3000/clientes/get`)
        .then(function (response) {
          me.arrayClientes = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    traerHerencia() {
      //Aqui llamar a traer los datos de la tabla que hereda
      let me = this
      axios
        .get(`http://localhost:3000/clientes/get`)
        .then(function (response) {
          me.arrayHerencia = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    guardarClientes() {
      let me = this
      axios
        .post(`http://localhost:3000/clientes/create`, {
          nombre: me.nombre,
          direccion: me.direccion,
          telefono: me.telefono,
          email: me.email, //Aqui se envian los atributos
          nit: me.nit,
          //primero como se llama en backend, luego como se declaro en frontend
        })
        .then(function (response) {
          me.traerClientes()
          console.log(response)
          me.accion = 1
          me.nombre = ''
          me.direccion = ''
          me.telefono = ''
          me.email = ''
          me.nit = ''
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    actualizarClientes() {
      let me = this
      axios
        .put(`http://localhost:3000/clientes/update`, {
          id: me.id,
          nombre: me.nombre,
          direccion: me.direccion,
          telefono: me.telefono,
          email: me.email, //Aqui se envian los atributos
          nit: me.nit,
        })
        .then(function (response) {
          me.traerClientes()
          console.log(response)
          me.accion = 1
          me.id = 0
          me.nombre = ''
          me.direccion = ''
          me.telefono = ''
          me.email = ''
          me.nit = ''
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    eliminarClientes() {
      let me = this
      axios
        .put(`http://localhost:3000/clientes/delete`, {
          id: me.id,
        })
        .then(function (response) {
          me.traerClientes()
          console.log(response)
          me.accion = 1
          me.nombre = ''
          me.direccion = ''
          me.telefono = ''
          me.email = ''
          me.nit = ''
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
          me.direccion = data['direccion']
          me.telefono = data['telefono']
          me.email = data['email']
          me.nit = data['nit']
          me.accion = 2
          break
        }
        case 'eliminar': {
          me.id = data['id']
          me.nombre = data['nombre']
          me.direccion = data['direccion']
          me.telefono = data['telefono']
          me.email = data['email']
          me.nit = data['nit']
          me.accion = 3
          break
        }
      }
    },
  },
  mounted() {
    this.traerClientes(), this.traerHerencia()
  },
}
</script>
