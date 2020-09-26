let gStateVars = {
  machine: undefined,
  controller: undefined,
};

$(window).load(function() {
  SGXPrepare_OS();
});

function menuAbout() {
  $('#menuAboutModal').modal('show');
}

function SGXPrepare_OS() {
  let options = {};

  gStateVars.machine = new emfchip8(options)
  gStateVars.controller = new emf.controller(gStateVars.machine);

  let url = new URL(location.href);
  let filename = url.searchParams.get('load') || 'res/sw/ufo.bin';

  let importer = new emf.importer(gStateVars.machine);
  importer.byURL(filename)
    .then(function(data) {
      gStateVars.controller.coldLoadData(filename, data, {
        startAddress: 0x200
      });
    })
}

// EMF uses the SGX graphics engine for rendering, but not updates,
// so these methods need only be stubs
function SGXinit() {}

function SGXstart() {
  gStateVars.machine.start();
  gStateVars.controller.startRunning();
}

function SGXdraw() {}

function SGXupdate(telaps) {
  Main.pause();
}