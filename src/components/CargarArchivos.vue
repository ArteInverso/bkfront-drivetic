<template>
  <div >
    <div v-if="form.currentFile" class="progress">
      <div
        class="progress-bar progress-bar-info progress-bar-striped"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="200"
        :style="{ width: progress + '%' }"
      >
        {{ progress }}%
      </div>
    </div>
      <label for="iddoc">id</label>
        <input type="number" class="form-control" id="iddoc" placeholder="id archivo" v-model="form.iddoc">
      <label for="fecvencimientodoc">Fecha vencimiento</label>
        <input type="date" class="form-control" id="fecvencimientodoc" placeholder="fecha vencimiento" v-model="form.fecvencimientodoc">
      <label for="nomdoc">Nombre</label>
        <input type="text" class="form-control" id="nomdoc" placeholder="nombre del archivo" v-model="form.nomdoc">
      <label for="idusuario">Id Usuario</label>
        <input type="number" class="form-control" id="idusuario" placeholder="id usuaio" v-model="form.idusuario">
    <label class="btn btn-default">
      <input type="file" ref="file" @change="selectFile" />
    </label>

    <button class="btn btn-success" :disabled="!form.uploaded_file" @click="upload">
      Cargar
    </button>
    <div class="alert alert-light" role="alert">{{ message }}</div>

    <div class="card">
      <div class="card-header">Lista de Archivos</div>
      <ul class="list-group list-group-flush">
        <table class="table table-dark">
        <thead>
          <th scope="row">id</th>
          <th scope="row">nombre</th>
          <th scope="row">Link</th>
          <th scope="row" data-type="date" data-format-string="Do MMMM YYYY">Fecha</th>
        </thead>  
                <tr v-for=" dato in fileinfos " :key="dato.id">
                <td>{{ dato.iddoc }}</td>
                <td>{{ dato.nomdoc }}</td>
                <td>{{ dato.pathdoc }}</td>
                <td>{{ dato.fecvencimientodoc }}</td>
            </tr>
        </table>
      </ul>
    </div>
  </div>
</template>


<script>

import UploadService from "../services/CargasArchivosService";


export default {
  name: "upload-files",
  data() {
    return {
      form: {
      uploaded_file: undefined,
      currentFile: undefined,
      iddoc: 0,
      nomdoc: '',
      fecvencimientodoc: '',
      idusuario: 0,
      },
      progress: 0,
      message: "",
      fileinfos: [],   
      fileInfos: []
    };
  },
  methods: {
        selectFile() {
      this.form.uploaded_file = this.$refs.file.files;
           }, 
          upload() {
      this.progress = 0;

      UploadService.upload(this.form, event => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then(response => {
          this.message = response.data.message;
          return UploadService.getFiles();
        })
        .then(files => {
          this.fileInfos = files.data;
        })
        .catch(() => {
          this.progress = 0;
          this.message = "No se pudo cargar el archivo!";
          this.currentFile = undefined;
        });

      this.selectedFiles = undefined;
    }
  },
      mounted() {
    UploadService.getFiles().then(response => {
      this.fileinfos = response.data;
    });
  }
};

</script>