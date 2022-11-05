<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardHeader> Tabla </CCardHeader>
        <CCardBody>
          <table class="table table-info table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="proveedor in arrayProveedor" :key="proveedor.id">
                <td v-text="proveedor.id"></td>
                <td v-text="proveedor.nombre"></td>
                <td v-text="proveedor.telefono"></td>
                <td v-text="proveedor.email"></td>

                <td>
                  <CButton
                    color="warning"
                    @click="definirAccion('actualizar', proveedor)"
                    >Actualizar</CButton
                  >
                  <CButton
                    color="danger"
                    @click="definirAccion('eliminar', proveedor)"
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
                @click="guardarProveedor()"
                >Guardar
              </CButton>
              <CButton
                color="warning"
                v-if="accion === 2"
                @click="actualizarProveedor()"
                >Actualizar
              </CButton>
              <CButton
                color="danger"
                v-if="accion === 3"
                @click="eliminarProveedor()"
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
      arrayProveedor: [],
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
    traerProveedor() {
      let me = this
      axios
        .get(`http://localhost:3000/proveedores/get`)
        .then(function (response) {
          me.arrayProveedor = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    traerHerencia() {
      //Aqui llamar a traer los datos de la tabla que hereda
      let me = this
      axios
        .get(`http://localhost:3000/proveedores/get`)
        .then(function (response) {
          me.arrayHerencia = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    guardarProveedor() {
      let me = this
      axios
        .post(`http://localhost:3000/proveedores/create`, {
          nombre: me.nombre,
          telefono: me.telefono,
          email: me.email, //Aqui se envian los atributos
          //primero como se llama en backend, luego como se declaro en frontend
        })
        .then(function (response) {
          me.traerProveedor()
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
    actualizarProveedor() {
      let me = this
      axios
        .put(`http://localhost:3000/proveedores/update`, {
          id: me.id,
          nombre: me.nombre,
          telefono: me.telefono,
          email: me.email, //Aqui se envian los atributos
        })
        .then(function (response) {
          me.traerProveedor()
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
    eliminarProveedor() {
      let me = this
      axios
        .put(`http://localhost:3000/proveedores/delete`, {
          id: me.id,
        })
        .then(function (response) {
          me.traerProveedor()
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
    this.traerProveedor(), this.traerHerencia()
  },
}
</script>
