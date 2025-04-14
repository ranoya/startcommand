let alunosppgd = function (par) {
  if (typeof voltaaoinput != "undefined" && voltaaoinput != null) {
    clearInterval(voltaaoinput);
  }
  // Change the funcion name here (imperative)

  let jsonfile = `https://docs.google.com/spreadsheets/d/1tjmcRwo4mLUYKrlitWA1c41T8iWebQcpBjEw77Y5LpU/edit?gid=230787037#gid=230787037`; // Change the URL here (imperative)

  getcsvdata(GoogleSheetCsvURL(jsonfile), function (jsn) {
    let jsondata = select(jsn, multipatterncheck_exclude, par);
    // separa todos os alunos

    let alunos = [];
    let c = 0;
    let m = 0;
    let d = 0;

    for (let i = 0; i < jsondata.length; i++) {
      let temparray = jsondata[i].orientandos.split(";");

      for (let j = 0; j < temparray.length; j++) {
        alunos[c] = {};
        if (
          temparray[j].match(/\(D\)/) != "" &&
          typeof temparray[j].match(/\(D\)/) != "undefined" &&
          temparray[j].match(/\(D\)/) != null
        ) {
          alunos[c].nivel = "Doutorado";
          d++;
        } else {
          alunos[c].nivel = "Mestrado";
          m++;
        }

        alunos[c].nome = temparray[j].replace(/\(.\)/, "").trim();
        alunos[c].linha = jsondata[i].Linha;
        alunos[c].orientador = jsondata[i].Nome;
        alunos[c].orienttipo = jsondata[i].Categoria;
        c++;
      }
    }

    let nalunos = select(alunos, multipatterncheck_exclude, par);

    let code = `<div class="outputgrid">`;

    code += `<div style='grid-column: 1 / fim;'>| Total de alunos ativos: <b>${c}</b> | Mestrado: <b>${m}</b> | Doutorado: <b>${d} |</b></div><span class="separaline"></span>`;

    for (let i = 0; i < nalunos.length; i++) {
      code += `<div>${nalunos[i].nome}, ${nalunos[i].nivel}</div>
                     <div>${nalunos[i].linha}</div>
                     <div>${nalunos[i].orientador}</div>
                     <div>${nalunos[i].orienttipo}</div>
                     
               <span class="separaline"></span>`;
    }

    code += `</div>`;

    if (nalunos.length == 0) {
      code = "";
    }
    present(code);
  });
};
