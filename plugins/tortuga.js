let tortuga = function (par) {
  // Change the funcion name here (imperative)

  let jsonfile = `https://opensheet.elk.sh/1K821gEs1HUvW4brTu_VRziZ6nr1wPvItNMQz5P3srtg/Tortuga`; // Change the URL here (imperative)

  let namekey = `titulo`; // Change the Key for the Title of the links, if needed
  let groupkey = `Group`; // Change the Key for the Groups of the links, if needed
  let linkkey = `link`; // Change the Key for the link url of the links, if needed
  let typekey = `Type`; // Change the Key for the link type of the links, if needed

  // Don't mess with the rest, if you don't want trouble ;-)

  fetch(jsonfile)
    .then((response) => response.json())
    .then((jsondata) => {
      let dados = select(jsondata, multipatterncheck_exclude, par);
      let selectedarr = tags(dados, groupkey, ",");
      let code = `<div class="outputgrid"><span class='categoria noline' style='border: 0;'>BEM BINDO AO MERCADO DE TORTUGA</span><span class='categoria'>&nbsp;</span>`;
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
                code += `<a target='_self' href='${arr[l][linkkey]}' class='linksrecursos'>${arr[l][namekey]}</a>`;
              } else if (arr[l][typekey] == "embed") {
                code += `<a target='_self' href='javascript:embed("${arr[l][linkkey]}")' class='linksrecursos'>${arr[l][namekey]}</a>`;
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
              code += `<a target='_self' href='${arr[l][linkkey]}' class='linksrecursos'>${arr[l][namekey]}</a>`;
            } else if (arr[l][typekey] == "embed") {
              code += `<a target='_self' href='javascript:embed("${arr[l][linkkey]}")' class='linksrecursos'>${arr[l][namekey]}</a>`;
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