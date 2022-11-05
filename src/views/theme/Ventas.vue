<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardHeader>Listado de ventas</CCardHeader>
        <CCardBody>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Cliente</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tipos in arrayTipos" :key="tipos.id">
                <td v-text="tipos.id"></td>
                <td v-text="tipos.createdAt"></td>
                <td v-text="tipos.monto"></td>
                <td v-text="tipos.cliente.nombre"></td>
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
              <CFormLabel>Monto</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Monto"
                v-model.trim="monto"
                :disabled="accion === 3"
              />
              <CFormLabel>id_cliente</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Id_cliente"
                v-model.trim="id_clinte"
                :disabled="accion"
              />
              <!--
              <CSelect label="Tabla heredada" :options="arrayHerencia" /> -->
              <CFormLabel>Cliente</CFormLabel>
              <select v-model.trim="id_clinte">
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
  name: 'Ventas',
  data() {
    return {
      arrayTipos: [],
      arrayHerencia: [],
      accion: 1, //1 para ingreso, 2 para actualizacion, 3 para eliminar
      nombre: '',
      monto: 0,
      id: 0,
      id_heredado: 0,
      id_clinte: 0,
    }
  },
  computed: {
    //aqui cuando ya querramos paginar
  },
  methods: {
    traerTipos() {
      let me = this
      axios
        .get(`http://localhost:3000/venta/get`)
        .then(function (response) {
          me.arrayTipos = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    traerHerencia() {
      //Aqui llamar a traer los datos de la tabla que hereda
      let me = this
      axios
        .get(`http://localhost:3000/cliente/get`)
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
        .post(`http://localhost:3000/venta/create`, {
          monto: me.monto,
          id_clinte: me.id_clinte, //Aqui se envian los atributos
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
        .put(`http://localhost:3000/venta/update`, {
          id: me.id,
          monto: me.monto,
          id_clinte: me.id_clinte,
        })
        .then(function (response) {
          me.traerTipos()
          console.log(response)
          me.accion = 1
          me.id = 0
          me.monto = ''
          me.id_clinte = 0
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    eliminarTipos() {
      let me = this
      axios
        .delete(`http://localhost:3000/venta/delete`, {
          id: me.id,
        })
        .then(function (response) {
          me.traerTipos()
          console.log(response)
          me.accion = 1
          me.monto = ''
          me.id = 0
          me.id_clinte = 0
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
          me.monto = data['monto']
          me.id_clinte = data['id_clinte']
          me.accion = 2
          break
        }
        case 'eliminar': {
          me.id = data['id']
          me.monto = data['monto']
          me.id_clinte = data['id_clinte']
          me.accion = 3
          break
        }
      }
    },
  },
  mounted() {
    this.traerTipos(), this.traerHerencia()
  },
}
</script>
