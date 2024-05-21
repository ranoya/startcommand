let retro = function (par) {
  getcsvdata(
    GoogleSheetCsvURL(
      "https://docs.google.com/spreadsheets/d/10wpfmMWn3igQF4rJBYCo8OR90igO1tfKwcmrot0ult0/edit#gid=1636087015"
    ),
    function (dados) {
      let newarr = select(dados, multipatterncheck_exclude, par);
      let xpto = `<div class="outputgrid">`;

      for (let i = 0; i < newarr.length; i++) {
        xpto += `<a target='_blank' href='${newarr[i].link}'>${newarr[i].nome}`;
      }

      xpto += `</div>`;
      present(xpto);
    }
  );
};
