let ppgmontalista = function (arr, crit) {
  let code = `<div>`;

  if (
    typeof arr["Líder " + crit] != "undefined" &&
    arr["Líder " + crit] != ""
  ) {
    code += `<b>${arr["Líder " + crit]}</b><br>`;
  }

  if (typeof arr[crit] != "undefined" && arr[crit] != "") {
    let listas = arr[crit].split(",");
    for (let i = 0; i < listas.length; i++) {
      code += listas[i].trim() + "<br>";
    }
  } else {
    code += "<br>";
  }
  code += `</div>`;
  return code;
};

let ppgcomis = function (xpar) {
  let jsonfile = `https://docs.google.com/spreadsheets/d/1tjmcRwo4mLUYKrlitWA1c41T8iWebQcpBjEw77Y5LpU/edit#gid=665266084`;

  getcsvdata(GoogleSheetCsvURL(jsonfile), function (dados) {
    let par = xpar;

    if (xpar.match(/atual/i)) {
      let anos = unique(dados, "ano");
      par = Math.max(...anos).toString();
    }

    let newarr = select(dados, multipatterncheck_exclude, par);
    let crit = "";
    let listas = [];
    let xpto = `

        
      
        <style>
            .gradecomis {
                display: grid;
                gap: 16px 16px;
                grid-template-columns: [init] 0.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr [fim];
                font-size: 14px;
                min-width: 1400px;
                overflow-x: scroll;
                padding-top: 35px;
            }

            .gradecomis div b {
                color: var(--color-hover, #34f8d1);
            }

            .tablehead {
                font-size: 10px;
                text-transform: uppercase;
                color: #aaaaaa;
                align-self: end;
                line-height: 12px;
            }

            .tablelinha {
                background-color: #999999;
                height: 1px;
                grid-column: init / fim;
            }

            .tabelanos {
                font-size: 10px;
                text-transform: uppercase;
                color: #aaaaaa;
                line-height: 12px;
                font-weight: bolder;
            }

            .comissmenu {
                width: calc(100vw - 30px);
                margin-left: 20px;
                margin-right: 20px;
                margin-bottom: 24px;
                position: fixed;
                text-align: right;
                background-color: var(--bg-color);
                margin-top: -6px;
                height: 36px;
            }

            .linksmod {
                text-decoration: none;
                font-size: 12px;
                line-height: 20px;
                color: var(--text-color, #a7caca);
                padding: 4px 10px 4px 10px;
                margin: -4px 0 -4px -10px;
            }
            .linksmod:hover {
                background-color: var(--text-color, #a7caca);
                color: var(--bg-color, #4a4a4a);
            }
        </style>
      
        <div class="comissmenu"><a class='linksmod'href='javascript:setinput("/comiss ")'>TODOS OS ANOS</a>`;

    let todosanos = unique(dados, "ano");

    for (let k = todosanos.length - 1; k >= 0; k--) {
      xpto += `<a class='linksmod' href='javascript:setinput("/comiss ${todosanos[k]} ")'>${todosanos[k]}</a>`;
    }

    xpto += "</div>";

    xpto += `
        <div class="outputgrid gradecomis">
        <div></div>
        <div class='tablehead'>Coordenação</div><div class='tablehead'>Processo Seletivo</div><div class='tablehead'>Auto-Avaliação</div><div class='tablehead'>Credenciamento</div><div class='tablehead'>Editorial Fronteiras do Design</div><div class='tablehead'>Organização dos Seminários</div><div class='tablehead'>Coleta Capes</div><div class='tablehead'>Bolsas</div><div class='tablelinha'></div>`;

    for (let i = 0; i < newarr.length; i++) {
      xpto += `<div class='tabelanos'>${newarr[i].ano}</div>`;

      // Coordenação

      xpto += ppgmontalista(newarr[i], "Coordenação");
      xpto += ppgmontalista(newarr[i], "Seleção");
      xpto += ppgmontalista(newarr[i], "Auto Avaliação");
      xpto += ppgmontalista(newarr[i], "Credenciamento");
      xpto += ppgmontalista(newarr[i], "Editorial Fronteiras");
      xpto += ppgmontalista(newarr[i], "Oranização Seminários");
      xpto += ppgmontalista(newarr[i], "Coleta Capes");
      xpto += ppgmontalista(newarr[i], "Bolsas");

      xpto += `<div class='tablelinha'></div>`;
    }

    xpto += `</div></div>`;
    present(xpto);
  });
};
