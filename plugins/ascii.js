let ascii = function (par) {

    let symbols = [
      "©", "®", "™", "“", "”", "…", "½", "¼", "∞", "æ", "Æ", "✔", "✓", "✖︎", "✘", "❤︎", "★", "ª", "º", "°", "˚", "²", "³", "☞", "☭"
    ];

    

    let xpto = `
    
    <style>
    .symbols {
      display: grid;
    grid-template-columns: [ init ] 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr [fim];
    gap: 3px 10px;
    width: calc(100vw - 50px);
    margin-left: 20px;
    margin-right: 20px;
    padding-bottom: 20px;
    }

    .symbol {
      color: var(--color-link, #c4c6ca);
      border: 1px dashed var(--color-link, #c4c6ca);
      border-radius: 10%;
      padding: 1rem;
      aspect-ratio: 1;
      font-size: 30px;
      text-align: center;
      line-height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: background 200ms linear;
    }

    .symbol:hover {
      background: var(--text-color, #ffaa46);
    }

    </style>

    <div class='symbols'>
        
    `;

    for (let i = 0; i < symbols.length; i++) {
        xpto += `<div class='symbol' onclick='navigator.clipboard.writeText("${symbols[i]}")'>${symbols[i]}</div>`;
    }

    xpto += `</div>`;

    present(xpto);

}