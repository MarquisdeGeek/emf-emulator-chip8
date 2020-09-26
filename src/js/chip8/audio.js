let chip8_audio = (function(bus, options) {
  let audioHandler;
  let toneReference;

  (function ctor() {
    audioHandler = new emf.audio(bus);

    let audioContext = window.AudioContext && new AudioContext ||
      window.webkitAudioContext && new webkitAudioContext;

    if (audioContext) {
      bus.attachPin('mute', {
        onFalling: function() {
          audioHandler.unmuteAll();
        },
        onRising: function() {
          audioHandler.muteAll();
        },
      });
      //
      bus.attachPin('beep', {
        onFalling: function() {
          audioHandler.toneStop(toneReference);
        },
        onRising: function() {
          audioHandler.toneStop(toneReference); // we do not support >1 tone, so stop the old one
          toneReference = audioHandler.toneStart(440);
        },
      });
    }
  })();

  function start() {
    audioHandler.reset();
  }


  function reset() {
    audioHandler.reset();
  }

  return {
    start,
    reset,
  }
});