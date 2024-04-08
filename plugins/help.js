let help = function (par) {

  let jsonfile = `https://docs.google.com/spreadsheets/d/1K821gEs1HUvW4brTu_VRziZ6nr1wPvItNMQz5P3srtg/edit#gid=55677578`;
  
  getcsvdata(GoogleSheetCsvURL(jsonfile), function (dados) {

      let newarr = select(dados, multipatterncheck_exclude, par);
      let xpto = `<div class="outputgrid" style="grid-template-columns: 150px 1fr [fim] !important;">`;

        for (let i = 0; i < newarr.length; i++) {
            if (typeof newarr[i].descricao != "undefined" && newarr[i].descricao != "" && newarr[i].descricao != null) {
                xpto += `<a  href='javascript:setinput("/${newarr[i].instruction} ")'>/${newarr[i].instruction}</a><div>${newarr[i].descricao}</div>`;
            }
      }

      xpto += `</div>`;
      present(xpto);
    });

}