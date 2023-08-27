let docurl = function (par) {

  fetch(
    `https://opensheet.elk.sh/1FeMH82e1fZf56jUJOE7JefxsD4b5PA5ooNQfx6M8nAs/ParametrosURL`
  )
    .then((response) => response.json())
    .then((dados) => {
        let newarr = select(dados, multipatterncheck_exclude, par);
        let xpto = `<style>
                        .tabelaparam {
                            display: grid;
                            grid-template-columns: [init] 120px 240px 1fr [fim];
                            gap: 3px 10px;
                        }

                        .linhadi {
                            border: 0;
                            height: 1px;
                            width: 100%;
                            border-bottom: 1px solid var(--line-separator, #efe8d6);
                        }
        
                    </style>`;
        xpto += `<div style='width: calc(100vw - 50px); margin-left: 20px; margin-right: 20px; padding-bottom: 20px;'>
        
                 <div style='width: calc(100vw - 50px); border: 0; height: 1px; border: 1px solid var(--line-separator, #efe8d6);'></div>
        `;

        for (let i = 0; i < newarr.length; i++) {
            xpto += `
            <a target='_blank' href='${newarr[i].link}'>${newarr[i].documento}</a><br>;
            <a target='_self' href='${newarr[i].dba}'>${newarr[i].informacao}</a><br><br>;
            <div class='tabelaparam'>${newarr[i].parametros}</div>
            <div class='linhadi'></div>
            <br><br>`;
        }

        xpto += `</div>`;
        present(xpto);
    });
};