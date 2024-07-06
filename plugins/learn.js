let timelineh = function (arr, ano, titulo, conteudo, instance) {
  let instancename = "";
  if (typeof instance != "undefined" && instance != "" && instance != null) {
    instancename = instance;
  }

  let html = "";
  let htmlfinal = "";

  html = `<div class='timelineh'>`;
  htmlfinal = "";

  let qualano = "";
  let anoatual = "";
  let quantosblocos = 1;

  let qualtitulo = "";
  let tituloatual = "";
  let quantostitulos = 1;

  let htmlano = `<div class="timelineh_ano_head ${instancename}"><span class="timelineh_ano_head_cont ${instancename}">${ano}</span></div>`;
  let htmltopico = `<div class="timelineh_topic_head ${instancename}"><span class="timelineh_topic_head_cont ${instancename}">${titulo}</span></div>`;
  let htmlcont = `<div class="timelineh_cont_head ${instancename}"><span class="timelineh_cont_head_cont ${instancename}">${conteudo}</span></div>`;

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
      htmlano += `<div class="timelineh_ano ${ultimo} ${instancename}" style="grid-column: span ${quantosblocos}"><span class="timelineh_ano_cont ${instancename}">${arr[k][ano]}</span></div>`;
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
      htmltopico += `<div class="timelineh_topic ${ultimo} ${instancename}" style="grid-column: span ${quantostitulos}"><span class="timelineh_topic_cont ${instancename}">${arr[k][titulo]}</span></div>`;
    }

    qualtitulo = tituloatual;
    ultimo = "";

    if (k == arr.length - 1) {
      ultimo = "ultimo";
    }

    htmlcont += `<div class="timelineh_cont ${ultimo} ${instancename}"><span class="timelineh_cont_cont ${instancename}">${arr[k][conteudo]}</span></div>`;
  }

  htmlano += `<div class="timelineh_ano timelineh_ano_end ${instancename}"></div>`;
  htmltopico += `<div class="timelineh_topic timelineh_topic_end ${instancename}"></div>`;
  htmlcont += `<div class="timelineh_cont timelineh_cont_end ${instancename}"></div>`;

  html += htmlano + htmltopico + htmlcont + `</div>`;

  htmlfinal = html;

  return htmlfinal;
};

let learn = function (par) {
  let jsonfile = `https://docs.google.com/spreadsheets/d/1K821gEs1HUvW4brTu_VRziZ6nr1wPvItNMQz5P3srtg/edit?gid=708884080#gid=708884080`;

  getcsvdata(GoogleSheetCsvURL(jsonfile), function (dados) {
    let arr = select(dados, multipatterncheck_exclude, "não_realizado " + par);

    let code = `

      <div id="tabela">
        ${timelineh(arr, "titulo", "topicos", "frame")}
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
        grid-template-rows:  calc(100dvh - 266px) 25px 25px;
        gap: 6px 10px;
        width: 100%;
      }

      .timelineh_ano_head {
        font-size: 11px;
        text-transform: uppercase;
        background-color: var(--bg-color, #f8f9fa);
        color: black;
        font-size: 11px;
        line-height: 25px;
        grid-row: 3;
        display: none;
      }

      .timelineh_topic_head {
        background-color: var(--bg-color, #f8f9fa);
        font-size: 11px;
        line-height: 16px;
        text-transform: uppercase;
        grid-row: 2;
        display: none;
      }

      .timelineh_cont_head {
        font-size: 11px;
        text-transform: uppercase;
        background-color: white;
        font-size: 11px;
        line-height: 25px;
        grid-row: 1;
        display: none;
      }

      .timelineh_ano_head_cont {
        padding-left: 15px;
      }

      .timelineh_topic_head_cont {
        padding-left: 15px;
        padding-top: 15px;
        display: inline-block;
      }

      .timelineh_cont_head_cont {
        padding-left: 15px;
        padding-left: 15px;
        padding-top: 15px;
        display: inline-block;
      }

      .timelineh_ano {
        grid-row: 3;
        align-content: center;
      }

      .timelineh_ano_cont {
        background-color: var(--bg-color, #f8f9fa);
        display: inline-block;
        position: sticky;
        left: 0px;
        text-transform: uppercase;
        font-size: 11px;
      }

      .timelineh_topic {
        background-color: var(--bg-color, #f8f9fa);
        grid-row: 2;
        align-content: center;
      }

      .timelineh_topic_cont {
        display: inline-block;
        position: sticky;
        left: 0px;
        text-transform: uppercase;
        font-size: 11px;
      }

      .timelineh_cont {
        grid-row: 1;
      }

      .timelineh_cont_cont {
        width: 100%;
        height: 100%;
      }

      .timelineh_ano_end {
        grid-row: 3;
        display: none;
      }

      .timelineh_topic_end {
        grid-row: 2;
        display: none;
      }

      .timelineh_cont_end {
        grid-row: 1;
        display: none;
      }
      
      </style>
    
      `;

    present(code);
  });
};
