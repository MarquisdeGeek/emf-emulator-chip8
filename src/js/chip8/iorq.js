let chip8_iorq = (function(bus) {

  function readPort(addr) {
    addr = addr.getUnsigned ? addr.getUnsigned() : addr;

    if ((addr & 0xff) == 0xfe) {
      let h = addr >> 8;
      switch (h) {
        case 0xfe:
          retval = ace_keyboard.getState(0);
          break;
        case 0xfd:
          retval = ace_keyboard.getState(1);
          break;
        case 0xfb:
          retval = ace_keyboard.getState(2);
          break;
        case 0xf7:
          retval = ace_keyboard.getState(3);
          break;
        case 0xef:
          retval = ace_keyboard.getState(4);
          break;
        case 0xdf:
          retval = ace_keyboard.getState(5);
          break;
        case 0xbf:
          retval = ace_keyboard.getState(6);
          break;
        case 0x7f:
          retval = ace_keyboard.getState(7);
          break;

        default:
          retval = 255;
      }
    }
    return retval;
  }

  function writePort(addr, val) {}

  return {
    readPort,
    writePort,
  }
});