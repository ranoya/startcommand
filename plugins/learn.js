let timelinemoveto = function (who, where) {
  document.querySelector(who).scrollTo({
    left: where,
    behavior: "smooth",
  });

  clearTimeout(tlmhandl);
};

let tlmhandl = "";
let timelinemovehandler = function (who, arr) {
  clearTimeout(tlmhandl);

  let tlmdelta = document.querySelector(who).scrollLeft;

  let tamanhoslideindividual = parseFloat(
    document.querySelector(who + " .timelineh").scrollWidth / arr.length
  );

  let resto = parseFloat(tlmdelta % tamanhoslideindividual);

  if (resto <= parseInt(tamanhoslideindividual / 2) && resto > 5) {
    timelinemoveto(who, tlmdelta - resto);
  }

  if (
    resto > tamanhoslideindividual - parseInt(tamanhoslideindividual / 2) &&
    resto < tamanhoslideindividual - 5
  ) {
    timelinemoveto(who, tlmdelta + (tamanhoslideindividual - resto));
  }

  clearTimeout(tlmhandl);
};

let eventcontrolstart = true;
let timelineactualarr = "";

let snapToGrid = function (w) {
  if (eventcontrolstart) {
    eventcontrolstart = false;

    document.querySelector(w).onscroll = function (e) {
      // console.log("ativou");

      clearTimeout(tlmhandl);
      tlmhandl = setTimeout(function () {
        timelinemovehandler(w, timelineactualarr);
      }, 1000);
    };
  }
};

let timelineh = function (arr, ano, titulo, conteudo) {
  let instancename = "";
  if (typeof instance != "undefined" && instance != "" && instance != null) {
    instancename = instance;
  }

  let html = "";
  let htmlfinal = "";

  html = `<div style='gap: 0 0 !important; display: grid !important; grid-auto-columns: 100% !important; width: 100% !important; grid-template-rows: 40px 40px 400px;' class='timelineh'>`;
  htmlfinal = "";

  let qualano = "";
  let anoatual = "";
  let quantosblocos = 1;

  let qualtitulo = "";
  let tituloatual = "";
  let quantostitulos = 1;

  let htmlano = "";
  let htmltopico = "";
  let htmlcont = "";

  let ultimo = "";

  for (let k = 0; k < arr.length; k++) {
    ultimo = "";

    if (k == arr.length - 1) {
      ultimo = "ultimo";
    }

    anoatual = arr[k][ano];
    quantosblocos = 1;

    for (let s = k; s < arr.length; s++) {
      if (s < arr.length - 1) {
        if (arr[s + 1][ano] == anoatual) {
          quantosblocos++;

          if (s + 1 == arr.length) {
            ultimo = "ultimo";
          }
        } else {
          break;
        }
      }
    }

    if (anoatual != qualano) {
      htmlano += `<div class="timelineh_track1 ${ultimo}" style="grid-column: span ${quantosblocos}"><span class="timelineh_track1_cont">${arr[k][ano]}</span></div>`;
    }

    qualano = anoatual;

    ultimo = "";

    if (k == arr.length - 1) {
      ultimo = "ultimo";
    }

    tituloatual = arr[k][titulo];
    quantostitulos = 1;

    for (let s = k; s < arr.length; s++) {
      if (s < arr.length - 1) {
        if (arr[s + 1][titulo] == tituloatual) {
          quantostitulos++;

          if (s + 1 == arr.length) {
            ultimo = "ultimo";
          }
        } else {
          break;
        }
      }
    }

    if (tituloatual != qualtitulo) {
      htmltopico += `<div class="timelineh_track2 ${ultimo}" style="grid-column: span ${quantostitulos}"><span class="timelineh_track2_cont">${arr[k][titulo]}</span></div>`;
    }

    qualtitulo = tituloatual;
    ultimo = "";

    if (k == arr.length - 1) {
      ultimo = "ultimo";
    }

    htmlcont += `<div class="timelineh_track3 ${ultimo}"><span class="timelineh_track3_cont}">${arr[k][conteudo]}</span></div>`;
  }

  html += htmlano + htmltopico + htmlcont + `</div>`;

  htmlfinal = html;

  return htmlfinal;
};

let learn = function (par) {
  let jsonfile = `https://docs.google.com/spreadsheets/d/1K821gEs1HUvW4brTu_VRziZ6nr1wPvItNMQz5P3srtg/edit?gid=708884080#gid=708884080`;

  getcsvdata(GoogleSheetCsvURL(jsonfile), function (dados) {
    let d = select(dados, multipatterncheck_exclude, "não_realizado " + par);

    timelineactualarr = d;
    eventcontrolstart = true;

    let code = `

      <div id="tabela">
        ${timelineh(d, "titulo", "topicos", "frame")}
      </div>

      <style>

      #tabela {
        overflow: auto;
        width: calc(100% - 40px);
        margin-left: 20px;
        margin-right: 20px;
        height: calc(100vh - 166px);
        overflow-y: hidden;
      }

      #tabela::-webkit-scrollbar {
        background: var(--scroll-track, #ffffff77);
        height: 30px;
      }

      #tabela::-webkit-scrollbar-thumb {
        background: var(--scroll-track, #ffffff77);
        height: 30px;
        border-bottom: 8px solid var(--color-link, #bdb5b5);
      }

      #tabela::-webkit-scrollbar-thumb:hover {
        border-bottom: 8px solid var(--color-hover, #ffaa46);
      }

      .timelineh {
        display: grid;
        grid-auto-columns: 100%;
        grid-template-rows:  calc(100dvh - 266px) 25px 25px !important;
        width: 100%;
      }

      .timelineh_track1 {
        grid-row: 3;
        align-content: center;
      }

      .timelineh_track1_cont {
        background-color: var(--bg-color, #f8f9fa);
        display: inline-block;
        position: sticky;
        left: 0px;
        text-transform: uppercase;
        font-size: 11px;
      }

      .timelineh_track2 {
        background-color: var(--bg-color, #f8f9fa);
        grid-row: 2;
        align-content: center;
      }

      .timelineh_track2_cont {
        display: inline-block;
        position: sticky;
        left: 0px;
        text-transform: uppercase;
        font-size: 11px;
      }

      .timelineh_track3 {
        grid-row: 1;
      }

      .timelineh_track3_cont {
        width: 100%;
        height: 100%;
      }
      
      </style>    
      `;

    present(code);

    snapToGrid("#tabela");
  });
};
