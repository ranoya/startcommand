let visseedit = function (par) {
  let jsonfile = `https://docs.google.com/spreadsheets/d/1Wu1v5jb8chg1Fi9chuT1QAPknJmVHF8Kz2cKvA6s2qw/edit?gid=1756045639#gid=1756045639`; // Change the URL here (imperative)

  let namekey = `Name`; // Change the Key for the Title of the links, if needed
  let groupkey = `Group`; // Change the Key for the Groups of the links, if needed
  let linkkey = `observabledoc`; // Change the Key for the link url of the links, if needed
  let typekey = `Type`; // Change the Key for the link type of the links, if needed

  // Don't mess with the rest, if you don't want trouble ;-)

  getcsvdata(GoogleSheetCsvURL(jsonfile), function (jsondata) {
    let dados = select(jsondata, multipatterncheck_exclude, par);
    let selectedarr = tags(dados, groupkey, ",");
    let code = `<div class="outputgrid"><span class='categoria noline' style='border: 0;'>Laboratório de Visualização e Sentidos (VISSE)</span><span class='categoria'>&nbsp;</span>`;
    let arr = orderbytemplate(dados, selectedarr, groupkey, [
      namekey,
      groupkey,
      linkkey,
      typekey,
    ]);
    if (arr.length > 10) {
      for (let c = 0; c < selectedarr.length; c++) {
        code += `
            <span class='categoria'><a href='javascript:addinput("${selectedarr[c]}")' class='grouplink'>${selectedarr[c]}</a></span>`;
        for (let l = 0; l < arr.length; l++) {
          if (arr[l][groupkey] == selectedarr[c]) {
            if (arr[l][typekey] == "self") {
              code += `<a target='_blank' href='${arr[l][linkkey]}' class='linksrecursos'>${arr[l][namekey]}</a>`;
            } else if (arr[l][typekey] == "embed") {
              code += `<a target='_blank' href='javascript:embed("${arr[l][linkkey]}")' class='linksrecursos'>${arr[l][namekey]}</a>`;
            } else {
              code += `<a target='_blank' href='${arr[l][linkkey]}' class='linksrecursos'>${arr[l][namekey]}</a>`;
            }
          }
        }
      }
    } else {
      let ultimoregistro = "";
      code += `<span class='categoria'>`;
      for (let c = 0; c < selectedarr.length; c++) {
        code += `<a href='javascript:addinput("${selectedarr[c]}")' class='grouplink'>${selectedarr[c]}</a> • `;
      }
      code += `</span>`;
      for (let l = 0; l < arr.length; l++) {
        if (arr[l][linkkey] != ultimoregistro) {
          if (arr[l][typekey] == "self") {
            code += `<a target='_blank' href='${arr[l][linkkey]}' class='linksrecursos'>${arr[l][namekey]}</a>`;
          } else if (arr[l][typekey] == "embed") {
            code += `<a target='_blank' href='javascript:embed("${arr[l][linkkey]}")' class='linksrecursos'>${arr[l][namekey]}</a>`;
          } else {
            code += `<a target='_blank' href='${arr[l][linkkey]}' class='linksrecursos'>${arr[l][namekey]}</a>`;
          }
          ultimoregistro = arr[l][linkkey];
        }
      }
    }
    code += `<div>`;
    if (arr.length == 0) {
      code = "";
    }
    present(code);
  });
};
