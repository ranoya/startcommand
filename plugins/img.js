let img = function (par) {

    let xpto = `<div class='simplediv'>`;
    
    xpto += clipboard(par);

    xpto += `</div>`;
    present(xpto);

}

let clipboard = function (gurl) {
  let urlfinal = "";
  let hash = "";

  if (gurl.match(/https:\/\/drive\.google\.com\/file\/d\/(.*)\/view/i)) {
    hash = gurl.match(/https:\/\/drive\.google\.com\/file\/d\/(.*)\/view/i);
    urlfinal = "https://drive.google.com/uc?export=view&id=" + hash[1];

    navigator.clipboard.writeText(urlfinal);

    return `Original: ${gurl}<br>Final: <a href="${urlfinal}" target="_blank">${urlfinal}</a>`;
  } else if (gurl.match(/https:\/\/drive\.google\.com(.*)id=(.*)/gi)) {
    hash = gurl.match(/https:\/\/drive\.google\.com(.*)id=(.*)/i);
    urlfinal = "https://drive.google.com/uc?export=view&id=" + hash[2];

    navigator.clipboard.writeText(urlfinal);
    return `Original: ${gurl}<br>Final: <a href="${urlfinal}" target="_blank">${urlfinal}</a>`;
  } else {
    return "nenhuma URL gerada";
  }
}