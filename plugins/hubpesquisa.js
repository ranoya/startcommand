let hubpesquisa = function (npar) {

    let par = [];
    let kc = 0;
    for (let k = 0; k < npar.length; k++) {
        if (typeof npar.Atividade != "undefined" && npar.Atividade != "" && npar.Pessoa != "Ranoya") {
            par[kc] = {};
            par[kc] = npar[k];
            kc++;
        }
    }



  clearInterval(voltaaoinput);
  // Change the funcion name here (imperative)
    
  let semano = function (str) {
  let datafull = str.match(/(\d{1,2})\/(\d{1,2})\/(\d{1,4})/i);
  if (datafull != null && typeof datafull != "undefined" && datafull != "") {
    return datafull[1] + "/" + datafull[2];
  } else {
    return str;
  }
}
    
  let deltaanos = function (arr) {
    let anos = [];

    for (let a = 0; a < arr.length; a++) {
        anos[extraiano(arr[a].Inicio)] = true;
        anos[extraiano(arr[a].Fim)] = true;
    }

    let listano = [];

    let i = 0;

    for (let k in anos) {
        listano[i] = k;
        i++;
    }

    return {
            inicial: Math.min(...listano),
            final: Math.max(...listano)
        };
  }

    let extraiano = function (valor) {
        let patt = /\d\d\d\d/gi;
        let arr = valor.match(patt);
        return arr[0];
    }

    let extraimes = function (valor) {
        let patt = /\d{1,2}/gi;
        let arr = valor.match(patt);
        return arr[1];
    }

    let extraidata = function (dt) {
        let patt = /(\d\d\d\d)/i;

        let hoje = "01/" + (parseInt(dt.getMonth()) + 1) + "/" + dt.getFullYear();

        return hoje;
    }

    let contames = function (dataA, dataB) {
        let anoI = extraiano(dataA);
        let anoF = extraiano(dataB);
        let mesI = extraimes(dataA);
        let mesF = extraimes(dataB);

        let conta = 0;
        let mescomeca = mesI;

        for (let an = anoI; an <= anoF; an++) {
            while (mescomeca < 12) {
                if (an < anoF || (an == anoF && mescomeca <= mesF)) {
                    mescomeca++;
                    conta++;
                } else {
                    mescomeca = 50;
                }
            }

            mescomeca = 0;
        }

        return conta;
    }

    let menordata = function (arr) {
        let menorano = deltaanos(arr).inicial;

        let menormes = 12;

        for (let i = 0; i < arr.length; i++) {
            if (extraiano(arr[i].Inicio) == menorano) {
                if (extraimes(arr[i].Inicio) <= menormes) {
                    menormes = extraimes(arr[i].Inicio);
                }
            }
        }

        return "01/" + menormes + "/" + menorano;
    }

    let maiordata = function (arr) {
        let maiorano = deltaanos(arr).final;

        let menormes = 1;

        for (let i = 0; i < arr.length; i++) {
            if (extraiano(arr[i].Fim) == maiorano) {
                if (extraimes(arr[i].Fim) >= menormes) {
                    menormes = extraimes(arr[i].Fim);
                }
            }
        }

        return "01/" + menormes + "/" + maiorano;
    }

    let adicionames = function (dataI, meses) {
        let anoI = extraiano(dataI);
        let mesI = extraimes(dataI);

        let mesA = mesI;
        let anoA = anoI;

        for (let i = 0; i < meses; i++) {
            mesA++;
            if (mesA > 12) {
                mesA = 1;
                anoA++;
            }
        }

        return "01/" + mesA + "/" + anoA;
    }

    let levantataxos = function (arr, grupo) {
        let newarr = [];
        for (let i = 0; i < arr.length; i++) {
            let separa = arr[i][grupo].split(",");

            for (let k = 0; k < separa.length; k++) {
                if (separa[k] != "") {
                    newarr[separa[k].trim()] = true;
                }
            }
        }

        let resultarray = [];
        let c = 0;

        for (let t in newarr) {
            resultarray[c] = t;
            c++;
        }

        return resultarray;
    }

    let taxoarr = function (arr, taxo) {
        let newarr = [];
        let na = 0;

        let listacriterios = levantataxos(arr, taxo);

        for (let i = 0; i < listacriterios.length; i++) {
            for (let r = 0; r < arr.length; r++) {
                let patt = listacriterios[i];
                if (arr[r][taxo].match(listacriterios[i]) && listacriterios[i] != "") {
                    newarr[na] = arr[r];
                    na++;
                }
            }
        }

        return newarr;
    }

    let quantosnataxo = function (arr, grupo, qualtaxo) {
        let quantos = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i][grupo].match(qualtaxo) && arr[i].Atividade != "") {
                quantos++;
            }
        }

        return quantos;
    }

    bolddata = function (data) {
  let xpto = data.replace(/\//gi, " <span class='datafraco'>/</span> ");

  return xpto;
}

    let listanos = function (arr) {
        let datas = levantataxos(arr, "Inicio");
        let anos = [];
        for (let i = 0; i < datas.length; i++) {
            anos[i] = {};
            anos[i].registro = extraiano(datas[i]);
        }

        let relacao = levantataxos(anos, "registro");

        return relacao;
    }

    let timelinerMeses = function (arr, taxo, esp) {
    let whitsp = 25;
    let hoje = extraidata(new Date());

    let vazios = 0;
    for (let c = 0; c < arr.length; c++) {
        if (arr[c].Atividade == "") {
            vazios++;
        }
    }

    let totalY = (arr.length + 1.5 - vazios) * whitsp + 60;
    let agrupa = [];

    if (typeof esp != "undefined") {
        whitsp = esp;
    }

    let paddingtop = (whitsp - 20) / 2;

    let colunas = contames(menordata(arr), maiordata(arr));

    let nomemeses = [
        "",
        "JAN",
        "FEV",
        "MAR",
        "ABR",
        "MAI",
        "JUN",
        "JUL",
        "AGO",
        "SET",
        "OUT",
        "NOV",
        "DEZ"
    ];

    if (taxo != "" && typeof taxo != "undefined") {
        agrupa = taxoarr(arr, taxo);
        totalY = (agrupa.length - vazios) * whitsp + 60;
    }

    // identifica o tamanho em pixels do primeiro texto escrito
    let primeirotermo = -5000;
    for (let f = 0; f < arr.length; f++) {
        if (extraiano(arr[f].Inicio) == deltaanos(arr).inicial) {
            if (arr[f].Atividade.length > primeirotermo) {
                primeirotermo = arr[f].Atividade.length / 1.75;
            }
        }
    }
    if (primeirotermo > 30) {
        primeirotermo = 30;
    }

    let html = `<svg class='timeliner' width='${
    primeirotermo * 20 + colunas * 20 + 5
  }' viewBox='0 0 ${
    primeirotermo * 20 + colunas * 20 + 5
  } ${totalY + 30}'>
`;

    // desenha os meses

    let iniciaano = 0;

    for (
        let tempo = 0; tempo <= contames(menordata(arr), maiordata(arr)); tempo++
    ) {
        html += `<text class='timelinemarks' x='0' y='0' style='transform: matrix(0, -1, 1, 0, ${
      primeirotermo * 20 + tempo * 20 + 3
    }, 25);'>${
      nomemeses[parseInt(extraimes(adicionames(menordata(arr), tempo)))]
    }</text>
`;

        if (iniciaano != extraiano(adicionames(menordata(arr), tempo))) {
            iniciaano = extraiano(adicionames(menordata(arr), tempo));

            html += `<text text-anchor="end" class='timelinemarks' x='0' y='0' style='transform: matrix(0, -1, 1, 0, ${
        primeirotermo * 20 + tempo * 20 + 3
      }, ${totalY + 5});'>${iniciaano}</text>
`;
        }
    }

    if (taxo == "" || typeof taxo == "undefined") {
        // pinta hoje
        html += `<rect x='${
      primeirotermo * 20 + (contames(menordata(arr), hoje) - 1) * 20
    }' y='30' width='20' height='${totalY - 30}' class='timeliner_hoje' />
`;

        // desenha linhas dos anos

        for (let la = 0; la <= colunas; la++) {
            html += `<line class='timelinerlinhasano' x1='${
        primeirotermo * 20 + la * 20
      }' y1='30' x2='${primeirotermo * 20 + la * 20}' y2='${totalY}' />
`;
        }


        // desenha blocos
        let yb = 0;
        for (let y = 0; y < arr.length; y++) {
            html += `<rect x='${
        primeirotermo * 20 + (contames(menordata(arr), arr[y].Inicio) - 1) * 20
      }' y='${47 + yb * whitsp}' width='${
        contames(arr[y].Inicio, arr[y].Fim) * 20
      }' height='18' class='timelinebox ${arr[y].Estado}' />
`;
            if (y < arr.length - 1 && arr[y + 1].Atividade != "") {
                yb++;
            }
        }

        // desenha os termos
        let ib = 0;
        for (let i = 0; i < arr.length; i++) {
            html += `<text text-anchor="end" x='${
        primeirotermo * 20 +
        (contames(menordata(arr), arr[i].Inicio) - 1) * 20 -
        8
      }' y='${60 + ib * whitsp}' class='timelinelabels'>${
        arr[i].Atividade
      }</text>
`;
            if (arr[i].Atividade != "") {
                ib++;
            }
        }






    } else {
        // desenha blocos taxonomicos
        let pretaxo = 0;
        let qualcss = "";
        let listataxos = levantataxos(arr, taxo);
        let contaitens = 0;

        for (let lt = 0; lt < listataxos.length; lt++) {
            contaitens = quantosnataxo(arr, taxo, listataxos[lt]);

            if (qualcss == "timelinerfundoB") {
                qualcss = "timelinerfundoA";
            } else {
                qualcss = "timelinerfundoB";
            }
            html += `<rect class='${qualcss}' x='0' y='${pretaxo + 45}' width='${
        primeirotermo * 20 + colunas * 20 + 5
      }' height='${contaitens * whitsp}' />

<text text-anchor='end' x='${primeirotermo * 20 + colunas * 20 - 10}' y='${
        pretaxo + 75
      }' class='timelinercategoria'>${listataxos[lt]}</text>
`;
            pretaxo += contaitens * whitsp;
        }

        // pinta hoje
        html += `<rect x='${
      primeirotermo * 20 + (contames(menordata(arr), hoje) - 1) * 20
    }' y='47' width='20' height='${totalY - 62}' class='timeliner_hoje' />
`;

        // desenha linhas dos anos

        for (let la = 0; la <= colunas; la++) {
            html += `<line class='timelinerlinhasano' x1='${
        primeirotermo * 20 + la * 20
      }' y1='30' x2='${primeirotermo * 20 + la * 20}' y2='${totalY}' />
`;
        }

        // desenha blocos
        let yb = 0;
        for (let y = 0; y < agrupa.length; y++) {
            html += `<rect x='${
        primeirotermo * 20 +
        (contames(menordata(agrupa), agrupa[y].Inicio) - 1) * 20
      }' y='${47 + paddingtop + yb * whitsp}' width='${
        contames(agrupa[y].Inicio, agrupa[y].Fim) * 20
      }' height='18' class='timelinebox ${agrupa[y].Estado}' />
`;

            if (y < agrupa.length - 1 && agrupa[y + 1].Atividade != "") {
                yb++;
            }
        }


        // desenha os termos
        let ib = 0;
        for (let i = 0; i < agrupa.length; i++) {
            html += `<text text-anchor="end" x='${
        primeirotermo * 20 +
        (contames(menordata(agrupa), agrupa[i].Inicio) - 1) * 20 -
        8
      }' y='${60 + paddingtop + ib * whitsp}' class='timelinelabels'>${
        agrupa[i].Atividade
      }</text>
`;
            if (i < agrupa.length - 1 && agrupa[i + 1].Atividade != "") {
                ib++;
            }
        }
    }

    html += "</svg>";
    return html;
    }
    

  timeliner_cronologia = function (arr) {
  let conta = 0;
  let myhtml = "<div class='timeliner-cronologia'>";

  let jafoi = "";

  for (let z = 0; z < arr.length; z++) {
    if (typeof arr[z].Fim == "undefined" || arr[z].Fim == "") {
      let qualano1 = arr[z].Inicio; // extraiano
      if (qualano1 == jafoi) {
        qualano1 =
          "<div style='width: 100%; text-align: center; margin-left: -4px;'>—</div>";
      }
      jafoi = arr[z].Inicio; // extraiano

      let inserelinks = "";
      if (
        typeof arr[z].ProdutosLinksAcoes != "undefined" &&
        typeof arr[z].ProdutosLinksAcoes != ""
      ) {
        inserelinks =
          "<br><br>" + arr[z].ProdutosLinksAcoes;
      }

      let insereevidencias = "";
      let evidencias = "";
      if (typeof arr[z].Produtos != "undefined" && arr[z].Produtos != "") {
        evidencias = arr[z].Produtos.split(",");
        if (evidencias.length > 0) {
          insereevidencias += `<br><br><div class='timeliner_cronologia_gridprodutos'>`;
          for (let n = 0; n < evidencias.length; n++) {
            insereevidencias += `<iframe frameborder=0 class='timeliner_evidencia' src='${evidencias[n]}'></iframe>`;
          }
          insereevidencias += `</div><br><br>`;
        }
      }

      myhtml += `<div class='timeliner_cronologia_ano cronopar${conta%2}'><div style='width: 100%; text-align: center; margin-left: -4px;'>—</div></div><div class='datascronologia'><div class='cronologiadata'>${bolddata(
        semano(qualano1)
      )}</div></div><strong>${arr[z].Titulo}</strong><div class='cronoexplicacao'>${
        arr[z].Atividade
      }${insereevidencias}${inserelinks}
      </div>`;
      conta++;
    }
  }

  let jafoi1 = "";
  let jafoi2 = "";

  for (let z = 0; z < arr.length; z++) {
    if (typeof arr[z].Fim != "undefined" && arr[z].Fim != "") {
      let qualano1 = arr[z].Inicio; //extraiano
      let qualano2 = arr[z].Fim; // extraiano

      if (qualano1 == jafoi1 && qualano2 == jafoi2) {
        qualano1 = "";
        qualano2 = "";
      }
      jafoi1 = arr[z].Inicio; // extraiano
      jafoi2 = arr[z].Fim; // extraiano

      let inserelinks = "";
      if (
        typeof arr[z].ProdutosLinksAcoes != "undefined" &&
        typeof arr[z].ProdutosLinksAcoes != ""
      ) {
        inserelinks =
          "<br><br>" + arr[z].ProdutosLinksAcoes;
      }

      let insereevidencias = "";
      let evidencias = "";
      if (typeof arr[z].Produtos != "undefined" && arr[z].Produtos != "") {
        evidencias = arr[z].Produtos.toString().split(",");
        if (evidencias.length > 0) {
          insereevidencias += `<br><br><div class='timeliner_cronologia_gridprodutos'>`;
          for (let n = 0; n < evidencias.length; n++) {
            insereevidencias += `<iframe frameborder=0 class='timeliner_cronologia_evidencia' src='${evidencias[n]}'></iframe>`;
          }
          insereevidencias += `</div>`;
        }
      }

      myhtml += `<div class='timeliner_cronologia_ano cronopar${
        conta % 2
      }'><div style='width: 100%; text-align: center; margin-left: -4px;'>â—</div></div><div class='datascronologia'><div class='cronologiadata'>${bolddata(
        semano(qualano2)
      )} <span class='datafraco'> - </span> ${bolddata(semano(qualano1))}</div></div><strong>${
        arr[z].Titulo
      }</strong><div class='cronoexplicacao'>${
        arr[z].Atividade
      }${insereevidencias}${inserelinks}<br><br></div>`;
      conta++;
    }
  }

  myhtml +=
    "<div class='timeliner_cronologia_ano lista_final'><div style='width: 100%; text-align: center; margin-left: -4px;'>â—</div></div><div></div><div></div><div></div></div>";

  return myhtml;
}



    let jsonfile = `https://opensheet.elk.sh/1DwFrWE_8oLFejn_zXzU1Fl9HbyOJG3PoarlaDuH2Tc8/ToDo`; // Change the URL here (imperative)

  // Don't mess with the rest, if you don't want trouble ;-)

    fetch(jsonfile)
        .then((response) => response.json())
        .then((jsondata) => {


      
            if (typeof sessionStorage.getItem('tipo') == 'undefined' || sessionStorage.getItem('tipo') == "" || sessionStorage.getItem('tipo') == null) {
                sessionStorage.setItem('tipo', "atividade");
            }

            let dados = select(jsondata, multipatterncheck_exclude, par);
            let arr = select(dados, multipatterncheck_add, "task cronograma ");
            let code = `
        <style>
        
         .listatodo {
            display: grid;
            grid-template-columns: 3fr 1fr 1fr 0.7fr 1fr 2fr [ultimacol] 2fr [fim];
            gap: 8px 16px;
            width: calc(100vw - 50px);
            margin-left: 20px;
            margin-right: 20px;
            padding-bottom: 20px;
            color: var(--text-color, #616161);
         }

         .blocotime {
            display: block;
            width: 100%;
            padding-bottom: 20px;
            overflow-x: scroll;
         }

         .headtable {
            margin-top: 8px;
            color: var(--color-link, #96a4a4);
            text-transform: uppercase;
            font-size: 11px;
            position: relative;
            z-index: 10;
            background-color: var(--bg-color, #fef6e4);
            top: 0;
            left: 0;
            display: block;
         }

         .separatodo {
            grid-column: 1 / fim;
            border-top: 1px solid var(--line-separator, #dddddd);
            color: var(--text-color, #bbbbbb);
            text-transform: uppercase;
            font-size: 11px;
            margin-top: 10px;
        }

        .listabotoes {
            display: grid;
            grid-template-columns: 1fr auto auto [fim];
            gap: 8px 32px;
            width: calc(100vw - 70px);
            margin-left: 20px;
            margin-right: 20px;
            padding-right: 20px;
            padding-bottom: 20px;
            padding-top: 3px;
            position: sticky;
            top: -7px;
            z-index: 15;
            background-color: var(--bg-color,#fef6e4);
        }

        </style>

        `;


            // caso o view seja para atividades
            if (sessionStorage.getItem('tipo') == "atividade") {
                code += `

        <div class='listabotoes'>
        <div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='https://docs.google.com/spreadsheets/d/1DwFrWE_8oLFejn_zXzU1Fl9HbyOJG3PoarlaDuH2Tc8/edit#gid=444640757'>Gerenciar [ <b>${arr.length}</b> ]</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","atividade"); addinput("")'>To-do</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","timeline"); addinput("")'>Timeline</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","cronograma"); addinput("")'>Cronograma</a></div>
        <div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("task ")'>Tasks</a></div>
        <div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("urgente ")'>Urgente</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:setinput("/hubpesquisa ")'>/</a></div>
        </div>

        <div class="listatodo">
        <div class='headtable'>Atividade</div><div class='headtable'><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","pessoa"); addinput("")'>Pessoa</a></div><div class='headtable'><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","ação"); addinput("")'>Ação</a></div><div class='headtable'><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","status"); addinput("")'>Status</a></div><div class='headtable'>Para</div><div class='headtable'>Parado porque?</div><div class='headtable'>Impactos</div>
        <span class="separatodo"></span>
        `;
        
      
                for (let l = 0; l < arr.length; l++) {

                    if (typeof arr[l].Parado == 'undefined') {
                        arr[l].Parado = "";
                    }

                    if (typeof arr[l].ProdutosLinksAcoes == 'undefined') {
                        arr[l].ProdutosLinksAcoes = "";
                    }

                    if (typeof arr[l].Fim == 'undefined') {
                        arr[l].Fim = "";
                    }
            
                    if (typeof arr[l].Estado == 'undefined') {
                        arr[l].Estado = "na fila";
                    }
            
            
                    if (arr[l].Ativo != '' && arr[l].Atividade != '') {

                        if (par != `arquivado` && arr[l].Estado != `arquivado`) {

                            code += `
                <div style='min-width: 360px'>${arr[l].Atividade}</div><div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("${arr[l]['Pessoa']} ")'>${arr[l]['Pessoa']}</a></div><div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("${arr[l]['Ação']} ")'>${arr[l]['Ação']}</a></div><div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("${arr[l]['Estado']} ")'>${arr[l]['Estado']}</a></div><div>${arr[l]['Fim']}</div><div>${arr[l]['Parado']}</div><div>${arr[l]['ProdutosLinksAcoes']}</div>
                <span class="separatodo"></span>
                `;
                        }
                    }
                }
            }


            if (sessionStorage.getItem('tipo') == "ação") {

                let quaisacoes = tags(arr, "Ação", ",");

                let colunasgrid = "";
                for (let c = 0; c < quaisacoes.length; c++) {
                    colunasgrid += "1fr ";
                }

                code += `
            <style>
            .tabelaacoes {
                display: grid;
                grid-template-columns: ${colunasgrid} [Fim];
                gap: 16px 32px;
                width: calc(100vw - 50px);
                margin-left: 20px;
                margin-right: 20px;
                padding-bottom: 20px;

            }

            .cardtodo {
                border: 1px solid var(--line-separator, #dddddd);
                border-radius: 2px;
                padding: 10px;
                box-shadow: 2px 2px 5px #00000011;
                color: var(--text-color, #616161);
                font-size: 13px;
            }

            .cardstatus {
                display: block;
                width: calc(100% - 20px);
                color: var(--text-color, #616161);
            }
            .cardfim {
                display: block;
                width: calc(100% - 20px);
                color: var(--text-color, #616161);
            }
            .cardparado {
                display: block;
                width: calc(100% - 20px);
                font-size: 10px;
            }
            </style>

            <div class='listabotoes'>
            <div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='https://docs.google.com/spreadsheets/d/1DwFrWE_8oLFejn_zXzU1Fl9HbyOJG3PoarlaDuH2Tc8/edit#gid=444640757'>Gerenciar [ <b>${arr.length}</b> ]</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","atividade"); addinput("")'>To-do</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","timeline"); addinput("")'>Timeline</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","cronograma"); addinput("")'>Cronograma</a></div>
            <div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","atividade"); addinput("")'>Atividade</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","pessoa"); addinput("")'>Pessoa</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","status"); addinput("")'>Status</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("urgente ")'>Urgente</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("task ")'>Tasks</a></div>
            <div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:setinput("/hubpesquisa ")'>/</a></div>
            </div>

            <div class='tabelaacoes'>
            `;

                let listasatvidadespacoes = [];

                let tamanhodaslinhas = 0;

                for (let c = 0; c < quaisacoes.length; c++) {
                    listasatvidadespacoes[c] = select(arr, multipatterncheck_exclude, quaisacoes[c]);

                    if (tamanhodaslinhas < listasatvidadespacoes[c].length) {
                        tamanhodaslinhas = listasatvidadespacoes[c].length;
                    }

                    code += `<div class='headtable'>${quaisacoes[c]} [<b> ${listasatvidadespacoes[c].length} </b>]</div>`;
                }

                for (let linha = 0; linha < tamanhodaslinhas; linha++) {
                    for (let c = 0; c < quaisacoes.length; c++) {
            

                
                        if (listasatvidadespacoes[c].length <= linha) {
                            listasatvidadespacoes[c][linha] = [];
                            listasatvidadespacoes[c][linha]['Atividade'] = "";
                            listasatvidadespacoes[c][linha]['Estado'] = "";
                            listasatvidadespacoes[c][linha]['Fim'] = "";
                            listasatvidadespacoes[c][linha]['Parado'] = "";
                        }
                
                        if (typeof listasatvidadespacoes[c][linha].Parado == 'undefined') {
                            listasatvidadespacoes[c][linha].Parado = "";
                        }

                        if (typeof listasatvidadespacoes[c][linha].ProdutosLinksAcoes == 'undefined') {
                            listasatvidadespacoes[c][linha].ProdutosLinksAcoes = "";
                        }

                        if (typeof listasatvidadespacoes[c][linha].Fim == 'undefined') {
                            listasatvidadespacoes[c][linha].Fim = "";
                        }
            
                        if (typeof listasatvidadespacoes[c][linha].Estado == 'undefined') {
                            listasatvidadespacoes[c][linha].Estado = "na fila";
                        }

                        if (listasatvidadespacoes[c][linha].Atividade == '') {
                            code += `<div></div>`;
                        } else {
                
                            code += `<div class='cardtodo'><div class='cardstatus'><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("${listasatvidadespacoes[c][linha]['Estado']} ")'>${listasatvidadespacoes[c][linha]['Estado']}</a></div><br>
                        <a class="nomelink" href='javascript:addinput(" ${listasatvidadespacoes[c][linha]['Pessoa']} ");'>${listasatvidadespacoes[c][linha]['Pessoa']}</a><br><br>
                        <b>${listasatvidadespacoes[c][linha]['Atividade']}</b><br>
                         <div class='cardfim'>${listasatvidadespacoes[c][linha]['Fim']}</div><br>
                         <div class='cardparado'>${listasatvidadespacoes[c][linha]['Parado']}</div>
                         </div>`;
                        }

                    }


                }

                code += `<div style='grid-column: 1 / Fim;'><br><br></div>`;

            }




            if (sessionStorage.getItem('tipo') == "pessoa") {

                let quaisacoes = tags(arr, "Pessoa", ",");

                let colunasgrid = "";
                for (let c = 0; c < quaisacoes.length; c++) {
                    colunasgrid += "1fr ";
                }

                code += `
            <style>
            .tabelaacoes {
                display: grid;
                grid-template-columns: ${colunasgrid} [Fim];
                gap: 16px 32px;
                width: calc(100vw - 50px);
                margin-left: 20px;
                margin-right: 20px;
                padding-bottom: 20px

            }

            .cardtodo {
                border: 1px solid var(--line-separator, #dddddd);
                border-radius: 2px;
                padding: 10px;
                box-shadow: 2px 2px 5px #00000011;
                color: var(--text-color, #616161);
                font-size: 13px;
            }

            .cardstatus {
                display: block;
                width: calc(100% - 20px);
                color: var(--text-color, #616161);

            }
            .cardfim {
                display: block;
                width: calc(100% - 20px);
                color: var(--text-color, #616161);

            }
            .cardparado {
                display: block;
                width: calc(100% - 20px);
                font-size: 10px;
            }
            </style>

            <div class='listabotoes'>
            <div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='https://docs.google.com/spreadsheets/d/1DwFrWE_8oLFejn_zXzU1Fl9HbyOJG3PoarlaDuH2Tc8/edit#gid=444640757'>Gerenciar [ <b>${arr.length}</b> ]</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","atividade"); addinput("")'>To-do</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","timeline"); addinput("")'>Timeline</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","cronograma"); addinput("")'>Cronograma</a></div>
            <div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","atividade"); addinput("")'>Atividade</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","ação"); addinput("")'>Ação</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","status"); addinput("")'>Status</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("urgente ")'>Urgente</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("task ")'>Tasks</a></div>
            <div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:setinput("/hubpesquisa ")'>/</a></div>
            </div>

            <div class='tabelaacoes'>
            `;

                let listasatvidadespacoes = [];

                let tamanhodaslinhas = 0;

                for (let c = 0; c < quaisacoes.length; c++) {
                    listasatvidadespacoes[c] = select(arr, multipatterncheck_exclude, quaisacoes[c]);

                    if (tamanhodaslinhas < listasatvidadespacoes[c].length) {
                        tamanhodaslinhas = listasatvidadespacoes[c].length;
                    }

                    code += `<div class='headtable'>${quaisacoes[c]} [<b> ${listasatvidadespacoes[c].length} </b>]</div>`;
                }

                for (let linha = 0; linha < tamanhodaslinhas; linha++) {
                    for (let c = 0; c < quaisacoes.length; c++) {
            

                
                        if (listasatvidadespacoes[c].length <= linha) {
                            listasatvidadespacoes[c][linha] = [];
                            listasatvidadespacoes[c][linha]['Atividade'] = "";
                            listasatvidadespacoes[c][linha]['Estado'] = "";
                            listasatvidadespacoes[c][linha]['Fim'] = "";
                            listasatvidadespacoes[c][linha]['Parado'] = "";
                        }
                
                        if (typeof listasatvidadespacoes[c][linha].Parado == 'undefined') {
                            listasatvidadespacoes[c][linha].Parado = "";
                        }

                        if (typeof listasatvidadespacoes[c][linha].ProdutosLinksAcoes == 'undefined') {
                            listasatvidadespacoes[c][linha].ProdutosLinksAcoes = "";
                        }

                        if (typeof listasatvidadespacoes[c][linha].Fim == 'undefined') {
                            listasatvidadespacoes[c][linha].Fim = "";
                        }
            
                        if (typeof listasatvidadespacoes[c][linha].Estado == 'undefined') {
                            listasatvidadespacoes[c][linha].Estado = "na fila";
                        }

                        if (listasatvidadespacoes[c][linha].Atividade == '') {
                            code += `<div></div>`;
                        } else {
                
                            code += `<div class='cardtodo'><div class='cardstatus'><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("${listasatvidadespacoes[c][linha]['Estado']} ")'>${listasatvidadespacoes[c][linha]['Estado']}</a></div><br>
                        <b>${listasatvidadespacoes[c][linha]['Atividade']}</b><br>
                         <div class='cardfim'>${listasatvidadespacoes[c][linha]['Fim']}</div><br>
                         <div class='cardparado'>${listasatvidadespacoes[c][linha]['Parado']}</div>
                         </div>`;
                        }

                    }


                }

                code += `<div style='grid-column: 1 / Fim;'><br><br></div>`;

            }






            if (sessionStorage.getItem('tipo') == "status") {

                let quaisacoes = ['na fila', 'fazendo', 'feito'];
 
                let colunasgrid = "";
                for (let c = 0; c < quaisacoes.length; c++) {
                    colunasgrid += "1fr ";
                }

                code += `
            <style>
            .tabelaacoes {
                display: grid;
                grid-template-columns: ${colunasgrid} [Fim];
                gap: 16px 32px;
                width: calc(100vw - 50px);
                margin-left: 20px;
                margin-right: 20px;
                padding-bottom: 20px;
            }

            .cardtodo {
                border: 1px solid var(--line-separator, #dddddd);
                border-radius: 2px;
                padding: 10px;
                box-shadow: 2px 2px 5px #00000011;
                color: var(--text-color, #616161);
                font-size: 13px;
            }

            .cardstatus {
                display: block;
                width: calc(100% - 20px);
                color: var(--text-color, #616161);
            }
            .cardfim {
                display: block;
                width: calc(100% - 20px);
                color: var(--text-color, #616161);
            }
            .cardparado {
                display: block;
                width: calc(100% - 20px);
                font-size: 10px;
            }
            </style>

            <div class='listabotoes'>
            <div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='https://docs.google.com/spreadsheets/d/1DwFrWE_8oLFejn_zXzU1Fl9HbyOJG3PoarlaDuH2Tc8/edit#gid=444640757'>Gerenciar [ <b>${arr.length}</b> ]</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","atividade"); addinput("")'>To-do</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","timeline"); addinput("")'>Timeline</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","cronograma"); addinput("")'>Cronograma</a></div>
            <div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","atividade"); addinput("")'>Atividade</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","ação"); addinput("")'>Ação</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","pessoa"); addinput("")'>Pessoa</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("urgente ")'>Urgente</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("task ")'>Tasks</a></div>
            <div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:setinput("/hubpesquisa ")'>/</a></div>
            </div>

            <div class='tabelaacoes'>
            `;

                let listasatvidadespacoes = [];

                let tamanhodaslinhas = 0;

                for (let c = 0; c < quaisacoes.length; c++) {
                    listasatvidadespacoes[c] = select(arr, multipatterncheck_exclude, quaisacoes[c]);

                    if (tamanhodaslinhas < listasatvidadespacoes[c].length) {
                        tamanhodaslinhas = listasatvidadespacoes[c].length;
                    }

                    code += `<div class='headtable'>${quaisacoes[c]} [<b> ${listasatvidadespacoes[c].length} </b>]</div>`;
                }

                for (let linha = 0; linha < tamanhodaslinhas; linha++) {
                    for (let c = 0; c < quaisacoes.length; c++) {
            

                
                        if (listasatvidadespacoes[c].length <= linha) {
                            listasatvidadespacoes[c][linha] = [];
                            listasatvidadespacoes[c][linha]['Atividade'] = "";
                            listasatvidadespacoes[c][linha]['Ação'] = "";
                            listasatvidadespacoes[c][linha]['Fim'] = "";
                            listasatvidadespacoes[c][linha]['Parado'] = "";
                        }
                
                        if (typeof listasatvidadespacoes[c][linha].Parado == 'undefined') {
                            listasatvidadespacoes[c][linha].Parado = "";
                        }

                        if (typeof listasatvidadespacoes[c][linha].ProdutosLinksAcoes == 'undefined') {
                            listasatvidadespacoes[c][linha].ProdutosLinksAcoes = "";
                        }

                        if (typeof listasatvidadespacoes[c][linha].Fim == 'undefined') {
                            listasatvidadespacoes[c][linha].Fim = "";
                        }
            
                        if (typeof listasatvidadespacoes[c][linha]['Ação'] == 'undefined') {
                            listasatvidadespacoes[c][linha]['Ação'] = "";
                        }

                        if (listasatvidadespacoes[c][linha].Atividade == '') {
                            code += `<div></div>`;
                        } else {
                
                            code += `<div class='cardtodo'><div class='cardstatus'><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("${listasatvidadespacoes[c][linha]['Ação']} ")'>${listasatvidadespacoes[c][linha]['Ação']}</a></div><br>
                        <a class="nomelink" href='javascript:addinput(" ${listasatvidadespacoes[c][linha]['Pessoa']} ");'>${listasatvidadespacoes[c][linha]['Pessoa']}</a><br><br>
                        <b>${listasatvidadespacoes[c][linha]['Atividade']}</b><br> 
                         <div class='cardfim'>${listasatvidadespacoes[c][linha]['Fim']}</div><br>
                         <div class='cardparado'>${listasatvidadespacoes[c][linha]['Parado']}</div>
                         </div>`;
                        }

                    }


                }

                code += `<div style='grid-column: 1 / Fim;'><br><br></div>`;

            }

            if (sessionStorage.getItem('tipo') == "timeline") {



                dados = select(jsondata, multipatterncheck_exclude, par);
                let basearr = select(dados, multipatterncheck_add, "timeline");
                arr = [];
                let conta = 0;
            
                for (let i = 0; i < basearr.length; i++) {
                    if (typeof basearr[i].Inicio != 'undefined' && basearr[i].Inicio != "" && typeof basearr[i].Fim != 'undefined' && basearr[i].Fim != "") {
                        arr[conta] = {}
                        arr[conta] = basearr[i];
                        conta++;
                    }
                }

                code += `
            <style>
                            .timeliner-resume {
                                display: grid;
                                grid-template-columns: [init] 40px [startmarks] 120px [endmarks] 1fr 2fr [fim];
                                gap: 0 0;

                            }

                            .timeliner-resume strong {
                                padding-right: 25px;
                            }

                            .timeliner_resume_links {
                                display: block;
                                width: 100%;
                                padding-top: 16px;
                                font-size: 12px;
                                padding-bottom: 4px;
                            }

                            .timeliner_resume_gridprodutos {
                                display: grid;
                                grid-template-columns: 1fr 1fr 1fr;
                                gap: 10px 10px;
                            }

                            .timeliner_evidencia {
                                width: 100%;
                                height: 240px;
                            }

                            .timeliner-resume strong {
                                padding-right: 25px;
                            }

                            .timeliner_resume_links {
                                display: block;
                                width: 100%;
                                padding-top: 16px;
                                font-size: 12px;
                                padding-bottom: 4px;
                            }

                            .timeliner_resume_gridprodutos {
                                display: grid;
                                grid-template-columns: 1fr 1fr 1fr;
                                gap: 10px 10px;
                            }

                            .timeliner_evidencia {
                                width: 100%;
                                height: 240px;
                            }

                            .timeliner-lista {
                                display: grid;
                                grid-template-columns: [init] 50px [startmarks] 50px [endmarks] 1fr [fim];
                                gap: 0 0;

                            }

                            .timelinerlinhasano {
                                stroke-width: thinline;
                                stroke: var(--ranoyav2-detalhes3, #b2a4a8);
                                opacity: 0.1;

                            }

                            .timelinelabels {
                                font-size: 14px;
                                line-height: 20px;
                                font-weight: 800;
                                fill: var(--ranoyav2-texto, black);

                            }

                            .timelinelabels a {
                                fill: var(--ranoyav2-detalhes, #9f2440);
                            }

                            .timelinelabels a:hover {
                                text-decoration: underline;
                            }

                            .timelinemarks {
                                font-size: 9px;
                                line-height: 20px;
                                font-family: Helvetica, Arial, sans-serif !important;
                                font-weight: lighter;
                            }

                            .timelinebox {
                                stroke: none;
                                stroke-width: 1;
                                fill: var(--ranoyav2-texto, #776378);
                            }

                            .fingindo {
                                fill: #00FF00;
                            }

                            .andamento {
                                fill: var(--ranoyav2-invert, #9f2440);
                            }

                            .timelinerfundoA {
                                fill: #00000003;
                            }

                            .timelinerfundoB {
                                fill: #00000008;
                            }

                            .timelinercategoria {
                                fill: #00ffff44;
                                font-family: Helvetica, Arial, sans-serif !important;
                                font-size: 28px !important;
                                font-weight: bolder;
                                line-height: 28px;
                                fill: var(--ranoyav2-alfalite, #f4757522);
                            }

                            .timeliner_hoje {
                                fill: #FF00001a;
                            }

                            .grid_prioridadesvis {
                                display: grid;
                                grid-template-columns: auto 1fr;
                                gap: 8px 16px;
                            }

                            .prioridadesvis_grupo {
                                font-weight: bolder;
                            }

                            .cronologiadata {

                                font-size: 13px;
                                line-height: 13px;
                                text-align: right;
                                width: 250px;

                                transform-origin: top right;
                                transform: rotate(-90deg);
                            }

                            .datascronologia {

                                min-height: 160px;
                                border-right: 5px solid red;
                                position: relative;
                                left: -250px;

                            }

                            .timeliner-cronologia {
                                display: grid;
                                grid-template-columns: [init] 5px [startmarks] 40px [endmarks] 1fr 3fr [fim];
                                gap: 0 0;

                            }

                            .timeliner-cronologia strong {
                                padding-right: 25px;
                            }

                            .timeliner_cronologia_links {
                                display: block;
                                width: 100%;
                                padding-top: 16px;
                                font-size: 12px;
                                padding-bottom: 4px;
                            }

                            .timeliner_cronologia_gridprodutos {
                                display: grid;
                                grid-template-columns: 1fr 1fr 1fr;
                                gap: 10px 10px;
                            }


                            .timeliner_cronologia_links {
                                display: block;
                                width: 100%;
                                padding-top: 16px;
                                font-size: 12px;
                                padding-bottom: 4px;
                            }

                            .timeliner_cronologia_gridprodutos {
                                display: grid;
                                grid-template-columns: 1fr 1fr 1fr;
                                gap: 10px 10px;
                            }

                            .timeliner_evidencia {
                                width: 100%;
                                height: 240px;
                            }
            </style>

            <div class='listabotoes'>
            <div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='https://docs.google.com/spreadsheets/d/1DwFrWE_8oLFejn_zXzU1Fl9HbyOJG3PoarlaDuH2Tc8/edit#gid=444640757'>Gerenciar [ <b>${arr.length}</b> ]</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","atividade"); addinput("")'>To-do</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","timeline"); addinput("")'>Timeline</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","cronograma"); addinput("")'>Cronograma</a></div>
            <div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("na fila ")'>Não Iniciados</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("fazendo ")'>Em Andamento</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("contínuo ")'>Recorrentes</a></div>
            <div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("urgente ")'>Urgente</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:setinput("/hubpesquisa ")'>/</a></div>
            </div>
            
            <div class='blocotime'>`;

                code += timelinerMeses(arr, "Ação");

                code += `</div>`;

            }
             
            if (sessionStorage.getItem('tipo') == "cronograma") {



                dados = select(jsondata, multipatterncheck_exclude, par);
                let basearr = select(dados, multipatterncheck_add, "cronograma");
                arr = [];
                let conta = 0;
            
                for (let i = 0; i < basearr.length; i++) {
                    if (typeof basearr[i].Inicio != 'undefined' && basearr[i].Inicio != "") {
                        arr[conta] = {}
                        arr[conta] = basearr[i];
                        conta++;
                    }
                }


                code += `
            <style>
                .timeliner_cronologia_ano {

                background-image: none;
                color: transparent;
                border-left: 35px solid #00000033;
                margin-top: 2px;

            }

            .cronopar1 {
                border-left: 35px solid #00000044;
            }

            .lista_final {
                border-left: 5px solid transparent !important;
            }


            .timeliner-cronologia {
                display: grid;
                grid-template-columns: [init] 5px [startmarks] 40px [endmarks] 150px 1fr [fim];
                gap: 0 0;
                color: #666666;
                margin-left: 50px;
                max-width: 800px;


            }

            .timeliner-cronologia b {
                display: block;
                margin-top: 15px;
                margin-bottom: -15px;
            }

            .timeliner-cronologia a {
                text-decoration: none;
                color: #44444466;
            }

            .timeliner-cronologia a:hover {
                text-decoration: none;
                color: #444444;
            }

            h1 {
                margin-left: auto;
                margin-right: auto;
                max-width: 800px;
            }

            .cronoexplicacao {
                transform: translate(-130px, 5px);
            }

            .timeliner-cronologia strong {
                padding-right: 25px;
                text-align: left;
                transform: matrix(0.00,-1.00,1.00,0.00,-75,-15);
            }

            .timeliner_cronologia_links {
                display: block;
                width: 100%;
                padding-top: 16px;
                font-size: 12px;
                padding-bottom: 4px;
            }

            .timeliner_cronologia_gridprodutos {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px 10px;
            }

            .timeliner_cronologia_evidencia {
                width: 100%;
                height: 180px;
            }

            .cronologiadata {

                padding-top: 5px;
                font-size: 16px;
                line-height: 16px;
                text-align: right;
                width: 150px;

                transform-origin: top right;
                transform: rotate(-90deg);

                color: #666666;
            }

            .datascronologia {

                min-height: 140px;
                position: relative;
                left: -150px;
                top: 14px;

            }

            .datafraco {
                opacity: 0.5;
            }
            </style>

            <div class='listabotoes'>
            <div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='https://docs.google.com/spreadsheets/d/1DwFrWE_8oLFejn_zXzU1Fl9HbyOJG3PoarlaDuH2Tc8/edit#gid=444640757'>Gerenciar [ <b>${arr.length}</b> ]</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","atividade"); addinput("")'>To-do</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","timeline"); addinput("")'>Timeline</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:sessionStorage.setItem("tipo","cronograma"); addinput("")'>Cronograma</a></div>
            <div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("na fila ")'>Não Iniciados</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("fazendo ")'>Em Andamento</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("feito ")'>concluídos</a></div>
            <div><a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:addinput("urgente ")'>Urgente</a> &nbsp; <a class='grouplink' style='text-transform: uppercase; display: inline;' href='javascript:setinput("/hubpesquisa ")'>/</a></div>
            </div>
            
  `;

                code += timeliner_cronologia(arr);

            }
        
        
        
      code += `<div>`;
      if (arr.length == 0) {
        code += ``;
      }
    present(code);
    });
    
};