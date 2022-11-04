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
                <th>Producto</th>
                <th>Categoria</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tipos in arrayTipos" :key="tipos.id">
                <td v-text="tipos.id"></td>
                <td v-text="tipos.product"></td>
                <td v-text="tipos.category"></td>
                <td v-text="tipos.cant"></td>
                <td v-text="tipos.total"></td>
                <td v-text="tipos.date"></td>
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
  name: 'crud1',
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
        .get(`http://localhost:3000/compras/get`)
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
