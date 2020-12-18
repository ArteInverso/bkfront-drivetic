import http from "../http-commons";

class UploadFilesService {
    upload(form, onUploadProgress) {
        let uploaded_file = new FormData();
        const util = require('util')
        uploaded_file.append("uploaded_file", form.uploaded_file[0]);
        let iddoc = form.iddoc;
        let fecvencimientodoc = form.fecvencimientodoc;
        let nomdoc = form.nomdoc;
        let idusuario = form.idusuario;
        console.log(util.inspect(uploaded_file, false, null, true /* enable colors */ ))
        console.log(uploaded_file)
        console.log(form.uploaded_file)
        console.log(util.inspect(form.uploaded_file, false, null, true /* enable colors */ ))
        typeof(uploaded_file)
        typeof(form.uploaded_file)

        return http.post("/upload-file", uploaded_file, {
                params: {
                    iddoc,
                    fecvencimientodoc,
                    nomdoc,
                    idusuario
                }
            },

            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },

                onUploadProgress

            });
    }

    getFiles() {
        return http.get("/listfiles");
    }
}

export default new UploadFilesService();