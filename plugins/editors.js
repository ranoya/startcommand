let editors = function (par) {
  // Change the funcion name here (imperative)

  let jsonfile = `https://docs.google.com/spreadsheets/d/10wpfmMWn3igQF4rJBYCo8OR90igO1tfKwcmrot0ult0/edit?gid=0#gid=0`; // Change the URL here (imperative)

  getcsvdata(GoogleSheetCsvURL(jsonfile), function (jsondata) {
    let code = `
    
    
        <style>
            .blocorec {
            border: 1px solid var(--text-color, #bbbbbb);
            padding: 20px;
            }

            .outputgrid {
            gap: 20px 20px;
            }

        </style>
    
        <div class="outputgrid">`;

    let desktop = select(
      jsondata,
      multipatterncheck_exclude,
      par + " IDE DESKTOP"
    );
    let online = select(
      jsondata,
      multipatterncheck_exclude,
      par + " IDE ONLINE"
    );
    let onlinepreview = select(
      jsondata,
      multipatterncheck_exclude,
      par + " COM WEB PREVIEW"
    );
    let livecode = select(
      jsondata,
      multipatterncheck_exclude,
      par + " LIVECODE"
    );

    code += `<div class="blocorec">IDE Desktop<br><br>`;
    for (let i = 0; i < desktop.length; i++) {
      code += `<a target="_blank" class="linkrecursos" href="${desktop[i].Link}">${desktop[i].Name}</a><br>`;
    }
    code += `</div>`;

    code += `<div class="blocorec">IDE Online<br><br>`;
    for (let i = 0; i < online.length; i++) {
      code += `<a target="_blank" class="linkrecursos" href="${online[i].Link}">${online[i].Name}</a><br>`;
    }
    code += `</div>`;

    code += `<div class="blocorec">IDE Online com Preview<br><br>`;
    for (let i = 0; i < onlinepreview.length; i++) {
      code += `<a target="_blank" class="linkrecursos" href="${onlinepreview[i].Link}">${onlinepreview[i].Name}</a><br>`;
    }
    code += `</div>`;

    code += `<div class="blocorec">Livecode<br><br>`;
    for (let i = 0; i < livecode.length; i++) {
      code += `<a target="_blank" class="linkrecursos" href="${livecode[i].Link}">${livecode[i].Name}</a><br>`;
    }
    code += `</div>`;

    present(code);
  });
};
