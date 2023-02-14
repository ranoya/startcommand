let pfeed = function (par) {
    
  let jsonfile = `https://opensheet.elk.sh/1dZpKhn38u_M-m45DX5z9CKmeDcaLq4c-PpCZt7FaXpo/RSS`; 
    fetch(jsonfile)
        .then((response) => response.json())
        .then((jsondata) => {
            let code = `

            <div class='simplediv'>`;

            for (let i = 0; i < jsondata.length; i++) {
                code += `<a target='_blank' href='${jsondata[i].link}' class='rsslink'>${jsondata[i].titulo} • ${jsondata[i].site}</a><br>`;
            }

            code += `</div>`;
            present(code);
        
        });

}