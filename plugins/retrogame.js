let retrogame = function (par) {
  // Change the funcion name here (imperative)

  let jsonfile = `https://docs.google.com/spreadsheets/d/1Yd1ipdV_nFu1witkBSPEXb4o9PI3Tb2rZZv3xLAVMZY/edit#gid=369862065`; // Change the URL here (imperative)

  let namekey = `Name`; // Change the Key for the Title of the links, if needed
  let groupkey = `Group`; // Change the Key for the Groups of the links, if needed
  let linkkey = `Link`; // Change the Key for the link url of the links, if needed
  let typekey = `Type`; // Change the Key for the link type of the links, if needed
  let screenshot = `screenshots`; 

  // Don't mess with the rest, if you don't want trouble ;-)

    getcsvdata(GoogleSheetCsvURL(jsonfile), function (jsondata) {

      let dados = select(jsondata, multipatterncheck_exclude, par);
      let selectedarr = tags(dados, groupkey, ",");
        let code = `

        <style>

            .thumb {
                width: calc(100% - 4px);
                aspect-ratio: 3/4;
                background-repeat: no-repeat;
                background-position: center center;
                background-size: cover;
                margin-bottom: 18px;
                border: 2px solid var(--color-link, #bdb5b5);
            }

            a:hover .thumb {
                border: 2px solid var(--color-hover, #34f8d1);
            }

        </style>
      
      
        <div class="outputgrid">
        
      `;
      let arr = orderbytemplate(dados, selectedarr, groupkey, [
        namekey,
        groupkey,
        linkkey,
        typekey,
      ]);
      if (arr.length > 10) {
        for (let c = 0; c < selectedarr.length; c++) {
          code += `<span class='categoria'><a href='javascript:addinput("${selectedarr[c]}")' class='grouplink'>${selectedarr[c]}</a></span>`;
          for (let l = 0; l < arr.length; l++) {
            if (arr[l][groupkey] == selectedarr[c]) {
                code += `<a target='_self' href='javascript:embed("${arr[l][linkkey]}")' class='linksrecursos'>
                
                <div class='thumb' style='background-image: url(${imagefromallsources(arr[l][screenshot])})'></div>
                ${arr[l][namekey]}</a>
                
                `;
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
            
              code += `<a target='_self' href='javascript:embed("${arr[l][linkkey]}")' class='linksrecursos'>
              
              <div class='thumb' style='background-image: url(${imagefromallsources(arr[l][screenshot])})'></div>
              ${arr[l][namekey]}</a>
              
              `;
            
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