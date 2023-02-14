let terminal = function (par) {

  clearInterval(voltaaoinput);
  // Change the funcion name here (imperative)

    code = `<style>

      iframe {
        margin-left: 20px;
        width: calc(100% - 40px) !important;
        height: calc(100vh - 179px) !important;
      }
    </style>

    <iframe frameborder="0" src="http://localhost:9000"></iframe>`;
    
    present(code);
    
};