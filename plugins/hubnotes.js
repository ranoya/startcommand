let clipper = function (gurl) {
  console.log(gurl);
  navigator.clipboard.writeText(gurl);
};

let hubnotes = function (par) {
  let code = "";
  let jsonfile = `https://docs.google.com/spreadsheets/d/1OAFTp3hglr3zj-cQzXJUqV-QROtaWtSYnCuGjwZIM5Y/edit#gid=88153848`; // Change the URL here (imperative)

  getcsvdata(GoogleSheetCsvURL(jsonfile), function (jsondata) {
    let arr = [];
    let notetags = [];

    let arrowtag = par.match(/(>\S*)/gi);

    if (arrowtag != null) {
      par = par.replace(">", "#");
      notetags[0] = arrowtag[0].replace(">", "#");

      console.log(" ------------------- " + notetags[0] + " / " + par);

      arr = select(jsondata, multipatterncheck_exclude, par);
    } else {
      arr = select(jsondata, multipatterncheck_exclude, par);
      notetags = tags(arr, "Tags", " ");
    }

    code += `
            <style>
            .tabelaflex {
                display: flex;
                gap: 16px 32px;
                width: calc(100vw - 40px);
                margin-left: 20px;
                margin-right: 4px;
                padding-bottom: 20px;
                flex-wrap: wrap;
            }

            .tabelaacoes {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr [Fim];
                gap: 16px 32px;
                width: calc(100vw - 50px);
                margin-left: 20px;
                margin-right: 20px;
                padding-bottom: 20px;
            }

            .card {
                border: 1px solid var(--line-separator, #dddddd);
                border-radius: 2px;
                padding: 10px;
                box-shadow: 2px 2px 5px #00000011;
                color: var(--text-color, #616161);
                font-size: 16px;
                line-height: 24px;

            }

            .refer {
                display: flex;
                border-top: 1px dashed #bbbbbb;
                border-bottom: 1px dashed #bbbbbb;
                gap: 0 32px;
                text-align: left;
                margin-top: 8px;
                margin-bottom: 12px;
                font-size: 10px;
                padding-bottom: 8px;
                padding-top: 8px;
            }

            .refer hr {
                border: 0;
                margin-top: 6px;
                margin-bottom: 6px;
                width: 100%;
                height: 1px;
                border-bottom: 1px dashed #bbbbbb88;
            }


            .icone {
                   height: 20px;
                   vertical-align: top;
            }

            a:hover .icone path {
              fill: var(--color-hover, #34f8d1);
            }

            

            @media screen and (max-width: 1070px) {
                .tabelaacoes {
                display: grid;
                grid-template-columns: 1fr 1fr [Fim];
                gap: 32px 32px;
                }

                .card {
                    margin-bottom: 32px;
                }
            }

            @media screen and (max-width: 650px) {
                .tabelaacoes {
                display: grid;
                grid-template-columns: 1fr [Fim];
                gap: 48px 32px;
                }

                .card {
                    margin-bottom: 48px;
                }
                
                .tabelaflex div {
                    flex-basis: calc(100% - 16px) !important;
                }
            }

            </style>
            `;

    /* if (notetags.length == 1 || notetags.length > 4) { */

    code += `<div class='tabelaflex'>`;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].Descrit.length >= 700) {
        code += `<div style='flex-basis: calc(100% - 48px)' class='card'>
                <b>${arr[i].Titulo}</b><br>
                <a href='javascript:clipper("${arr[i].Descrit} (${arr[i].Autor}, ${arr[i].Ano}, ${arr[i].Ref})");'>"${arr[i].Descrit}" (${arr[i].Autor}, ${arr[i].Ano}, ${arr[i].Ref})</a><br>
                `;
      } else if (arr[i].Descrit.length > 300 && arr[i].Descrit.length < 700) {
        code += `<div style='flex-basis: calc(50% - 48px)' class='card'>
                <b>${arr[i].Titulo}</b><br>
                <a href='javascript:clipper("${arr[i].Descrit} (${arr[i].Autor}, ${arr[i].Ano}, ${arr[i].Ref})");'>"${arr[i].Descrit}" (${arr[i].Autor}, ${arr[i].Ano}, ${arr[i].Ref})</a><br>
                `;
      } else if (arr[i].Descrit.length <= 300) {
        code += `<div style='flex-basis: calc(20% - 48px)' class='card'>
                <b>${arr[i].Titulo}</b><br>
                <a href='javascript:clipper("${arr[i].Descrit} (${arr[i].Autor}, ${arr[i].Ano}, ${arr[i].Ref})");'>"${arr[i].Descrit}" (${arr[i].Autor}, ${arr[i].Ano}, ${arr[i].Ref})</a><br>
                `;
      }

      let listalinks = arr[i].Tags.split(" ");

      code += `<div style='display: block; text-align: right;'>`;

      if (arr[i].Livro != "" && typeof arr[i].Livro != "undefined") {
        if (typeof arr[i].Link != "undefined" && arr[i].Link != "") {
          code += `<div class='refer'>
                    <div><a target='_blank' href='${arr[i].Link}'>
                      <svg class="icone" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M31 12.7742L23.3077 6H11V34H31V12.7742Z" fill="var(--color-link, #bdb5b5)"/>
                    </svg></a> <a href='javascript:clipper("${arr[i].Autor}. ${arr[i].Livro}, ${arr[i].Ano}")'>${arr[i].Autor}. ${arr[i].Livro}, ${arr[i].Ano}</a></div>
                    </div>`;
        } else {
          code += `<div class='refer'>
                    <div><a href='javascript:clipper("${arr[i].Autor}. ${arr[i].Livro}, ${arr[i].Ano}")'>${arr[i].Autor}. ${arr[i].Livro}, ${arr[i].Ano}</a></div>
                    </div>`;
        }
      }

      for (let k = 0; k < listalinks.length; k++) {
        code += `<a class='grouplink' style='margin-left: 0; margin-right: 4px; margin-bottom: 0;' href='javascript:setinput("/hubnotes ${listalinks[k]} ");'>${listalinks[k]}</a> `;
      }

      code += `</div>`;

      code += `</div>`;
    }

    code += `</div>`;

    /*  } else {

            code += `<div class='tabelaacoes'>`;

            let colunas = [];
            let regcolunas = [];
  
            for (let c = 0; c < notetags.length; c++) {
                if (typeof notetags[c] == 'undefined') {
                    notetags[c] = ''
                }

                code += `<div>`;
                code += `<div class='headtable' style='display: inline;'><a class='grouplink' style='margin-left: 0; margin-right: 4px; margin-bottom: 0;' href='javascript:setinput("/hubnotes ${notetags[c].replace('#',">")} ");' >${notetags[c]}</a></div>`;

                colunas[c] = {};

                if (notetags[c] != '') {
                    regcolunas[c] = select(arr, multipatterncheck_exclude, notetags[c]);
                } else {
                    regcolunas[c] = select(arr, multipatterncheck_exclude, "aasoimouewnqoxq");
                }

                for (let h = 0; h < regcolunas[c].length; h++) {

                    code += `<div class='card' style='margin-bottom: 16px;'><b>${regcolunas[c][h].Titulo}</b><br>${regcolunas[c][h].Descrit}<br>`;

                    if ((regcolunas[c][h].Ref != "" && typeof regcolunas[c][h].Ref != 'undefined') || (regcolunas[c][h].Exemplo != "" && typeof regcolunas[c][h].Exemplo != 'undefined')) {

                    if (typeof regcolunas[c][h].Ref == 'undefined') {
                        regcolunas[c][h].Ref == '';
                    }
                    if (typeof regcolunas[c][h].Exemplo == 'undefined') {
                        regcolunas[c][h].Exemplo == '';
                    }
                    code += `<div class='refer'>
                    <div>${regcolunas[c][h].Ref}</div>
                    <div>${regcolunas[c][h].Exemplo}</div>
                    </div>`;
                }

                    let listalinks = (regcolunas[c][h].Tags).split(" ");

                    code += `<div style='display: block; text-align: right;'>`;
                    for (let k = 0; k < listalinks.length; k++) {
                        code += `<a class='grouplink' style='margin-left: 0; margin-right: 4px; margin-bottom: 0;'  href='javascript:setinput("/hubnotes ${listalinks[k]} ");'>${listalinks[k]}</a> `;
                    }
                    code += `</div>`;


                    code += `</div>`;
                }

                code += `</div>`;
            }
            
            

            code += `</div>`;
            
        }
        */

    code += `<div>`;
    if (arr.length == 0) {
      code += ``;
    }
    present(code);
  });
};
