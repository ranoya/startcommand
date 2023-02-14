let xenon = function (par) {

  let linkkey = `link`;
  let namekey = `titulo`;

  fetch(
    `https://opensheet.elk.sh/1Uy5dWDszjwuNJAGJZ55ANVCJA-ruHd8Ey_86cvHd28A/Links`
  )
    .then((response) => response.json())
    .then((dados) => {
      let newarr = select(dados, multipatterncheck_exclude, par);
      let xpto = `<div class="outputgrid">`;

      for (let i = 0; i < newarr.length; i++) {
        xpto += `<a target='_blank' href='${newarr[i][linkkey]}'>${newarr[i][namekey]}`;
      }

      xpto += `</div>`;
      present(xpto);
    });
};