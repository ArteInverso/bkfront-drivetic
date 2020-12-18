<template>
<div>
  <section v-if="errored">
    <p>Lo sentimos, no es posible obtener la información en este momento, por favor intente nuevamente mas tarde</p>
  </section>

  <section v-else>
    <div v-if="loading">Cargando...</div>

    <div v-else v-for="database_docs in info" class="DocInDB">
      {{ database_docs.iddoc }}:
      <span class="lighten">
        <span v-html="currency.symbol"></span>{{ currency.rate_float | currencydecimal }}
      </span>
    </div>

  </section>
</div>
</template>

<script>

new Vue({
  el: '#app',
  data () {
    return {
      info: null,
      loading: true,
      errored: false
    }
  },
  filters: {
    currencydecimal (value) {
      return value.toFixed(2)
    }
  },
  mounted () {
    axios
      .get('/listfiles')
      .then(response => {
        this.info = response.json()
      })
      .then(json => { this.fileInfos=json.info})
        
    
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
})
</script>