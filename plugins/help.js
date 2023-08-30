let help = function (par) {

  fetch(
    `https://opensheet.elk.sh/1K821gEs1HUvW4brTu_VRziZ6nr1wPvItNMQz5P3srtg/MyPoePlugins`
  )
    .then((response) => response.json())
    .then((dados) => {
      let newarr = select(dados, multipatterncheck_exclude, par);
      let xpto = `<div class="outputgrid" style="grid-template-columns: 150px 1fr [fim] !important;">`;

        for (let i = 0; i < newarr.length; i++) {
            if (typeof newarr[i].descricao != "undefined" && newarr[i].descricao != "" && newarr[i].descricao != null) {
                xpto += `<a  href='javascript:setinput("/${newarr[i].instruction} ")'>/${newarr[i].instruction}</a><div>${newarr[i].descricao}</div>`;
            }
      }

      xpto += `</div>`;
      present(xpto);
    });

}