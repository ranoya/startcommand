let feed = function (par) {
  let jsonfile = `https://docs.google.com/spreadsheets/d/1aOq6gcK_QKH0TKA-DT7MJln8SwKKaK4EIv9DBB8b5ww/edit#gid=1176429967`;
  getcsvdata(GoogleSheetCsvURL(jsonfile), function (ojsondata) {
    let jsondata = select(ojsondata, multipatterncheck_exclude, par);

    let code = `

            <div class='outputgrid'>`;

    for (let i = 0; i < jsondata.length; i++) {
      code += `<a target='_blank' href='${jsondata[i].link}' class='rsslink'><div style='margin-bottom: 16px; padding-top: 100%; background-repeat: no-repeat; background-position: center center; background-size: cover; background-image: url(${jsondata[i].imagem});'></div>${jsondata[i].titulo} • ${jsondata[i].site}<br><br></a>`;
    }

    code += `</div>`;
    present(code);
  });
};
