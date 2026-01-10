let mclipboardol = function (gurl) {
  navigator.clipboard.writeText(gurl);
};

let xenon = function (par) {
  let linkkey = `link`;
  let namekey = `titulo`;
  let groupkey = `group`; // Change the Key for the Groups of the links, if needed

  let jsonfile = `https://docs.google.com/spreadsheets/d/1Uy5dWDszjwuNJAGJZ55ANVCJA-ruHd8Ey_86cvHd28A/edit#gid=0`;
  let jsonfile2 = `https://docs.google.com/spreadsheets/d/1dZpKhn38u_M-m45DX5z9CKmeDcaLq4c-PpCZt7FaXpo/edit#gid=513250687`;

  getcsvdata(GoogleSheetCsvURL(jsonfile), function (dados) {
    let dados = select(jsondata, multipatterncheck_exclude, par);
    let selectedarr = tags(dados, groupkey, ",");
    let code = `<div class="outputgrid">`;
    let arr = orderbytemplate(dados, selectedarr, groupkey, [
      namekey,
      groupkey,
      linkkey,
    ]);
    if (arr.length > 10) {
      for (let c = 0; c < selectedarr.length; c++) {
        code += `<span class='categoria'><a href='javascript:addinput("${selectedarr[c]}");' class='grouplink'>${selectedarr[c]}</a></span>`;
        for (let l = 0; l < arr.length; l++) {
          if (arr[l][groupkey] == selectedarr[c]) {
            code += `<a href='javascript:mclipboardol("${arr[l][linkkey]}");'>${arr[l][namekey]}</a>`;
          }
        }
      }
    } else {
      let ultimoregistro = "";
      code += `<span class='categoria'>`;
      for (let c = 0; c < selectedarr.length; c++) {
        code += `<a href='javascript:addinput("${selectedarr[c]}");' class='grouplink'>${selectedarr[c]}</a> • `;
      }
      code += `</span>`;
      for (let l = 0; l < arr.length; l++) {
        if (arr[l][linkkey] != ultimoregistro) {
          code += `<a href='javascript:mclipboardol("${arr[l][linkkey]}");'>${arr[l][namekey]}</a>`;
          ultimoregistro = arr[l][linkkey];
        }
      }
    }
    code += `<div>`;
    if (arr.length == 0) {
      code = "";
    }

    code += `<span class="separaline"></span>`;

    getcsvdata(GoogleSheetCsvURL(jsonfile2), function (jsondata) {
      for (let i = 0; i < jsondata.length; i++) {
        code += `<a target='_blank' href='${jsondata[i].imagem}' class='rsslink'><div style='margin-bottom: 16px; padding-top: 100%; background-repeat: no-repeat; background-position: center center; background-size: cover; background-image: url(${jsondata[i].imagem});'></div>${jsondata[i].titulo} • ${jsondata[i].fonte}<br><br></a>`;
      }

      code += `</div>`;
      present(code);
    });
  });
};
