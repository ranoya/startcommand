let pfeed = function (par) {
  let jsonfile = `https://docs.google.com/spreadsheets/d/1dZpKhn38u_M-m45DX5z9CKmeDcaLq4c-PpCZt7FaXpo/edit#gid=1826705642`;
  getcsvdata(GoogleSheetCsvURL(jsonfile), function (ojsondata) {
    let jsondata = select(ojsondata, multipatterncheck_exclude, par);

    let code = `

            <div class='simplediv'>`;

    for (let i = 0; i < jsondata.length; i++) {
      code += `<a target='_blank' href='${jsondata[i].link}' class='rsslink'>${jsondata[i].titulo} • ${jsondata[i].site}</a><br>`;
    }

    code += `</div>`;
    present(code);
  });
};
