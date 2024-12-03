function urlToAudioPosition(search, audio) {
  var urlMilliseconds;
  const urlParams = new URLSearchParams(search);
  urlParams.forEach((value, key) => {
    if (key == "t") {
      urlMilliseconds = value;
    }
  });
  if (urlMilliseconds) {
    audio.currentTime = urlMilliseconds / 1000;
  }
}

function removeActiveClass() {
  var activeElement = document.querySelector(".active");
  if (activeElement) {
    activeElement.classList.remove("active");
  }
}

function activateCurrentPiece(excerpts, index) {
  if (excerpts[index].classList.contains("active")) {
    return;
  } else {
    removeActiveClass();
    excerpts[index].classList.add("active");
  }
}
// audio stuff

function nextPiece(em) {
  return em > ellapsedMilliseconds;
}
var ellapsedMilliseconds = 0;
function highlightTranscript(audio, excerpts, status) {
  ellapsedMilliseconds = audio.currentTime * 1000;

  var transcriptMilliseconds = new Array();
  for (let index = 0; index < excerpts.length; index++) {
    const piece = excerpts[index];
    transcriptMilliseconds.push(piece.dataset.timeMs);
  }
  console.log(transcriptMilliseconds);

  var nextIndex = transcriptMilliseconds.findIndex(nextPiece);
  var hasNext = true;
  if (nextIndex == -1) {
    hasNext = false;
    nextIndex = excerpts.length;
  }

  var currentIndex = nextIndex - 1;
  console.log(" test " + currentIndex);

  activateCurrentPiece(excerpts, currentIndex);

  if (hasNext && status == "playing") {
    var delayMilliseconds =
      excerpts[nextIndex].dataset.timeMs - ellapsedMilliseconds;

    setTimeout(function () {
      highlightTranscript(audio, excerpts, "playing");
    }, delayMilliseconds);
  }
}

function scrollToActiveSection() {
  document
    .querySelector(".excerpt.active")
    .scrollIntoView({ behavior: "smooth" });
}
