let xenon = function (par) {

  let linkkey = `link`;
  let namekey = `titulo`;

  let jsonfile = `https://docs.google.com/spreadsheets/d/1Uy5dWDszjwuNJAGJZ55ANVCJA-ruHd8Ey_86cvHd28A/edit#gid=0`;
  
  getcsvdata(GoogleSheetCsvURL(jsonfile), function (dados) {

      let newarr = select(dados, multipatterncheck_exclude, par);
      let xpto = `<div class="outputgrid">`;

      for (let i = 0; i < newarr.length; i++) {
        xpto += `<a target='_blank' href='${newarr[i][linkkey]}'>${newarr[i][namekey]}`;
      }

      xpto += `</div>`;
      present(xpto);
    });
};