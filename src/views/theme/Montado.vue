<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardHeader>
          En este componente deben realizar su propio CRUD
        </CCardHeader>
        <CCardBody>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tipos in arrayTipos" :key="tipos.id">
                <td v-text="tipos.id"></td>
                <td v-text="tipos.nombre"></td>
                <td v-text="tipos.estado"></td>
              </tr>
            </tbody>
          </table>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MONTADO',
  data() {
    return {
      arrayTipos: [],
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
  },
  mounted() {
    this.traerTipos()
  },
}
</script>
