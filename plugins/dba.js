let dba = function (par) {

  let linkkey = `link`;
  let namekey = `titulo`;

  let jsonfile = `https://docs.google.com/spreadsheets/d/1K821gEs1HUvW4brTu_VRziZ6nr1wPvItNMQz5P3srtg/edit#gid=1867039310`;
  
  getcsvdata(GoogleSheetCsvURL(jsonfile), function (dados) {

      let newarr = select(dados, multipatterncheck_exclude, par);
      let xpto = `<div class="outputgrid">`;

      for (let i = 0; i < newarr.length; i++) {
        xpto += `<a href='javascript:embed("${newarr[i][linkkey]}");'>${newarr[i][namekey]}`;
      }

      xpto += `</div>`;
      present(xpto);
    });
};

