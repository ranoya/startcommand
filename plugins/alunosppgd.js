let alunosppgd = function (par) {
  if (typeof voltaaoinput != "undefined" && voltaaoinput != null) {
    clearInterval(voltaaoinput);
  }
  // Change the funcion name here (imperative)

  let jsonfile = `https://docs.google.com/spreadsheets/d/1tjmcRwo4mLUYKrlitWA1c41T8iWebQcpBjEw77Y5LpU/edit?gid=230787037#gid=230787037`; // Change the URL here (imperative)

  getcsvdata(GoogleSheetCsvURL(jsonfile), function (jsn) {
    let jsondata = select(jsn, multipatterncheck_exclude, par);
    // separa todos os alunos

    console.table(jsondata);

    let alunos = [];
    let c = 0;
    for (let i = 0; i < jsondata.length; i++) {
      let temparray = jsondata[i].Nome.split(";");

      for (let j = 0; j < temparray.length; j++) {
        alunos[c] = {};
        if (
          temparray[j].match(/\(D\)/) != "" &&
          typeof temparray[j].match(/\(D\)/) != "undefined" &&
          temparray[j].match(/\(D\)/) != null
        ) {
          alunos[c].nivel = "Doutorado";
        } else {
          alunos[c].nivel = "Mestrado";
        }

        alunos[c].nome = temparray[j].replace(/\(.\)/, "").trim();
        alunos[c].linha = jsondata[i].Linha;
        alunos[c].orientador = jsondata[i].Nome;
        alunos[c].orienttipo = jsondata[i].Categoria;
        c++;
      }
    }

    let code = `<div class="outputgrid">`;

    for (let i = 0; i < alunos.length; i++) {
      code += `<div>${alunos[i].aluno}, ${alunos[i].nivel}"</div>
                     <div>${alunos[i].linha}</div>
                     <div>${alunos[i].orientador}</div>
                     <div>${alunos[i].orienttipo}</div>`;
    }

    code += `</div>`;

    if (alunos.length == 0) {
      code = "";
    }
    present(code);
  });
};
