let clipboardo4 = function (gurl) {
     navigator.clipboard.writeText(gurl);
}

let omnispaces = function (par) {
  // Change the funcion name here (imperative)

  let jsonfile = `https://opensheet.elk.sh/1uO7ljxlgVjRtQ8xKk-eWSMnFHQhe2yMrLBRYiudH7tU/Registros`; // Change the URL here (imperative)

  let namekey = `titulo`; // Change the Key for the Title of the links, if needed
  let groupkey = `tipo`; // Change the Key for the Groups of the links, if needed
  let linkkey = `link`; // Change the Key for the link url of the links, if needed
  


  fetch(jsonfile)
    .then((response) => response.json())
    .then((jsondata) => {
      let dados = select(jsondata, multipatterncheck_exclude, "OMNI_ " + par);
      let selectedarr = tags(dados, groupkey, ",");
      let code = `<div class="outputgrid">`;
      let arr = orderbytemplate(dados, selectedarr, groupkey, [
        namekey,
        groupkey,
        linkkey
      ]);
      if (arr.length > 10) {
        for (let c = 0; c < selectedarr.length; c++) {
          code += `<span class='categoria'><a href='javascript:addinput("${selectedarr[c]}");' class='grouplink'>${selectedarr[c]}</a></span>`;
          for (let l = 0; l < arr.length; l++) {
              if (arr[l][groupkey] == selectedarr[c]) {
                
                code += `<a href='javascript:clipboardo4("${arr[l][linkkey]}");'>${arr[l][namekey]}</a>`;
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
            code += `<a href='javascript:clipboardo4("${arr[l][linkkey]}");'>${arr[l][namekey]}</a>`;
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