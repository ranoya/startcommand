let docurl = function (par) {

  let jsonfile = `https://docs.google.com/spreadsheets/d/1FeMH82e1fZf56jUJOE7JefxsD4b5PA5ooNQfx6M8nAs/edit#gid=1028006888`;
  
    getcsvdata(GoogleSheetCsvURL(jsonfile), function (dados) {
      
        let newarr = select(dados, multipatterncheck_exclude, par);
        let xpto = `<style>
                        .tabelaparam {
                            display: grid;
                            grid-template-columns: [init] 170px 240px 1fr [fim];
                            gap: 0 0;
                        }

                        .tabelaparam div {
                            border: 1px solid var(--line-separator, #efe8d6);
                            padding-left: 8px;
                            padding-right: 8px;
                            padding-top: 4px;
                            padding-bottom: 4px;
                        }
        
                    </style>`;
        xpto += `<div style='width: calc(100vw - 50px); margin-left: 20px; margin-right: 20px; padding-bottom: 20px;'>
        `;

        for (let i = 0; i < newarr.length; i++) {
            xpto += `
            <a target='_blank' href='${newarr[i].link}'>${newarr[i].documento}</a><br>
            <a target='_self' href='${newarr[i].dba}'>${newarr[i].informacao}</a><br><br>
            
            <div class='tabelaparam'>${newarr[i].parametros}</div>

            <br><br>`;
        }

        xpto += `</div>`;
        present(xpto);
    });
};


