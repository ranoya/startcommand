let calend = function (par) {

    let jsonfile = `https://docs.google.com/spreadsheets/d/1woKvGHvV5oZqimdjezkBYogZhpi-ROyAvvaxV0mG47I/edit#gid=0`; // Change the URL here (imperative)
    let code = "";

    const tratadatas = function (str) {
        let strB = str.replace(/-/g, "");
        return strB.replace(/:/g, "");
    }

    const dataemjs = function (str) {
        let datestring = str.replace("Z", "");
        let dia = new Date(datestring);
        return dia;
    }

    const substituiespacos = function (str) {
        return str.replace(/ /g, "+");
    }

    const googleagendaurl = function (arr) {
        return (
            "https://www.google.com/calendar/render?action=TEMPLATE&text=" +
            substituiespacos(arr.nome) +
            "&dates=" +
            tratadatas(arr.inicia) +
            "/" +
            tratadatas(arr.termina) +
            "&details=" +
            "<b>" +
            substituiespacos(arr.tipoevento) +
            "</b>" +
            "<br>" +
            "&sf=true&output=xml"
        );
    }

    const formatadatascalendacad = function (str, str2) {
        let diames1 = str.replace(/(\d{4})-(\d{2})-(\d{2})(.*)/, "$3/$2");
        let diames2 = str2.replace(/(\d{4})-(\d{2})-(\d{2})(.*)/, "$3/$2");

        let dataFormatado = "";

        if (str != str2) {
            dataFormatado =
            "<b class='datacal'>" +
            diames1 +
            "</b> - <b class='datacal'>" +
            diames2 +
            "</b>";
        } else {
            dataFormatado = "<b class='datacal'>" + diames1 + "</b>";
        }
        return dataFormatado;
    }

    const adapta = function (arr) {
        let newarr = [];
        let c = 0;

        for (let k = 0; k < arr.length; k++) {
            newarr[k] = {};
            newarr[k] = arr[k];

            newarr[k]["periodo"] = arr[k]["periodo"].replace(/,/g, ".");
            newarr[k].inicia = arr[k]["inicia"].replace(
            /(\d\d)\/(\d\d)\/(\d\d\d\d)/g,
            "$3-$2-$1T03:00:00.000Z"
            );
            newarr[k].termina = arr[k]["termina"].replace(
            /(\d\d)\/(\d\d)\/(\d\d\d\d)/g,
            "$3-$2-$1T03:00:00.000Z"
            );

            if (arr[k].palavraschave === undefined) {
            newarr[k].palavraschave = "";
            }
        }

        return newarr;
    }
    
    
    getcsvdata(GoogleSheetCsvURL(jsonfile), function (jsondata) {

            let ajustada = adapta(jsondata);

            let arr = select(ajustada, multipatterncheck_exclude, par);
            console.table(arr);

            code = `
            <style>

                .complistacalendario {
                display: grid; 
                grid-template-columns: 120px 180px 1fr 150px;
                padding-left: 20px;
                padding-right: 20px;
                margin-bottom: 60px;
                width: calc(100% - 40px);
                }

                .grid2col {
                display: grid;
                grid-template-columns: 300px 1fr;
                gap: 8px 20px;
                }

                .gridhead {
                font-size: 12px;
                }

                .atividadeferiado {
                background-color: blue;
                padding: 5px; margin-bottom: 2px;
                background-color: #585858;
                }

                .atividadefacultativo {
                padding: 5px;
                margin-bottom: 2px;
                background-color: #787878;
                }

                .atividadematricula {
                padding: 5px;
                margin-bottom: 2px;
                background-color: #9a6a6a;
                }

                .atividadeletiva {
                padding: 5px;
                margin-bottom: 2px;
                background-color: #4f8193;
                }

                .atividadedocumentacao {
                padding: 5px;
                margin-bottom: 2px;
                background-color: #90785c;
                }

                .atividaderecesso {
                padding: 5px;
                margin-bottom: 2px;
                background-color: #313131;
                }

                .datasletivas {
                display: grid;
                grid-template-columns: 45px 1fr 1fr 1fr 1fr 1fr;
                gap: 5px 5px;
                }

            </style>
            <div class='complistacalendario'>`;

            let cor = "";
            let estilo = "";
            let complemento = "";
            let passou = "";
            let aulainicio = new Date("2100-01-01");
            let aulafim = new Date("2100-01-02");
            let diaespecifico = new Date();
            let hoje = new Date();
            let periodo = hoje.getFullYear().toString() + ".1"
            console.log(periodo);
            let pattstart = new RegExp(/Início das aulas/i);
            let pattend = new RegExp(/Último dia de aulas/i);
            let diassemana = [0, 0, 0, 0, 0, 0, 0];
            let estrangulamento = [0, 0, 0, 0, 0, 0, 0];
            let pontofacult = [0, 0, 0, 0, 0, 0, 0];

            let segundas = [];
            let tercas = [];
            let quartas = [];
            let quintas = [];
            let sextas = [];

            for (let i = 0; i < arr.length; i++) {
                if (arr[i].periodo.replace(/\.\d/i) == periodo.replace(/\.\d/i)) {
                    estilo = "";
                    cor = "";
                    complemento = "";
                    passou = "";

                    // marca eventos já do passado
                    if (hoje > dataemjs(arr[i].terminasql)) {
                        passou = " opacity: 0.4;";
                    }

                    // localiza inicio e fim das aulas
                    if (pattstart.test(arr[i].nome)) {
                        aulainicio = dataemjs(arr[i].terminasql);
                    }

                    if (pattend.test(arr[i].nome)) {
                        aulafim = dataemjs(arr[i].terminasql);
                    }

                    if (arr[i].tipoevento == "Feriado") {
                        estilo = "atividadeferiado";
                        cor =
                            "" +
                            passou;
                        complemento = "FERIADO";

                        if (
                            aulainicio <= dataemjs(arr[i].iniciasql) &&
                            aulafim >= dataemjs(arr[i].terminasql)
                        ) {
                            // adiciona estrangulamentos possíveis
                            if (
                                dataemjs(arr[i].iniciasql).getDay == 2 &&
                                arr[i - 1].tipoevento != "Feriado"
                            ) {
                                estrangulamento[1]++;
                            }

                            if (
                                dataemjs(arr[i].terminasql).getDay == 4 &&
                                arr[i + 1].tipoevento != "Feriado"
                            ) {
                                estrangulamento[5]++;
                            }
                        }
                    }

                    if (arr[i].tipoevento == "Ponto facultativo") {
                        estilo = "atividadefacultativo";
                        cor =
                            "" +
                            passou;
                        complemento = "PONTO FACULTATIVO";

                        if (
                            aulainicio <= dataemjs(arr[i].iniciasql) &&
                            aulafim >= dataemjs(arr[i].terminasql)
                        ) {
                        }
                    }

                    if (arr[i].tipoevento == "Matrícula") {
                        estilo = "atividadematricula"
                        cor =
                            "" +
                            passou;
                    }

                    if (arr[i].tipoevento == "Recesso") {
                        estilo = "atividaderecesso";
                        cor =
                            "" +
                            passou;
                    }

                    if (arr[i].tipoevento == "Atividades letivas") {
                        estilo = "atividadeletiva";
                        cor =
                            "" +
                            passou;
                    }

                    if (arr[i].tipoevento == "Documentação") {
                        estilo = "atividadedocumentacao";
                        cor =
                            "" +
                            passou;
                    }

                    code +=
                        `<div class='` + estilo + `' style='` +
                        cor +
                        ` font-size: 16px;'>` +
                        formatadatascalendacad(arr[i].iniciasql, arr[i].terminasql) +
                        `</div>` +
                        `<div class='botcalendario ` + estilo + `' style='` +
                        cor +
                        `'><a href='` +
                        googleagendaurl(arr[i]) +
                        `' target='_blank'>Adiciona na agenda</a></div>` +
                        `<div class='` + estilo + `' style='` +
                        cor +
                        `'>` +
                        arr[i].nome +
                        `</div>` +
                        `<div class='` + estilo + `' style='` +
                        cor +
                        `font-family: Helvetica, Arial, sans-serif; font-weight: bolder; font-size: 10px; line-height: 25px; text-align: right;'>` +
                        complemento +
                        `</div>`;
                }
            }

            code += "</div>";

            if (arr.length == 0) {
                code += ``;
            }
            present(code);
            
        });

}


