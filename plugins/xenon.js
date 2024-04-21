let xenon = function (par) {

  let linkkey = `link`;
  let namekey = `titulo`;

  let jsonfile = `https://docs.google.com/spreadsheets/d/1Uy5dWDszjwuNJAGJZ55ANVCJA-ruHd8Ey_86cvHd28A/edit#gid=0`;
  let jsonfile2 = `https://docs.google.com/spreadsheets/d/1dZpKhn38u_M-m45DX5z9CKmeDcaLq4c-PpCZt7FaXpo/edit#gid=513250687`;

  getcsvdata(GoogleSheetCsvURL(jsonfile), function (dados) {

      let xpto = `<div class="outputgrid">`;
    
      let newarr = select(dados, multipatterncheck_exclude, par);
    
      for (let i = 0; i < newarr.length; i++) {
        xpto += `<a target='_blank' href='${newarr[i][linkkey]}'>${newarr[i][namekey]}</a>`;
      }
    
    
      xpto += `<span class="separaline"></span>`;

      getcsvdata(GoogleSheetCsvURL(jsonfile2), function (jsondata) {
        for (let i = 0; i < jsondata.length; i++) {
          xpto += `<a target='_blank' href='${jsondata[i].link}' class='rsslink'><div style='margin-bottom: 16px; padding-top: 100%; background-repeat: no-repeat; background-position: center center; background-size: cover; background-image: url(${jsondata[i].imagem});'></div>${jsondata[i].titulo} • ${jsondata[i].fonte}<br><br></a>`;
        }

        xpto += `</div>`;
        present(xpto);
      });

      
    });
};