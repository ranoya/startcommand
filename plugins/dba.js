let dba = function (par) {

  let linkkey = `link`;
  let namekey = `titulo`;

  fetch(
    `https://opensheet.elk.sh/1K821gEs1HUvW4brTu_VRziZ6nr1wPvItNMQz5P3srtg/BasesDados`
  )
    .then((response) => response.json())
    .then((dados) => {
      let newarr = select(dados, multipatterncheck_exclude, par);
      let xpto = `<div class="outputgrid">`;

      for (let i = 0; i < newarr.length; i++) {
        xpto += `<a href='javascript:embed("${newarr[i][linkkey]}");'>${newarr[i][namekey]}`;
      }

      xpto += `</div>`;
      present(xpto);
    });
};