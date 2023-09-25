function getTimeSegmentElements(segmentElement) {
  const segmentDisplay = segmentElement.querySelector(".segment-display");
  const segmentDisplayTop = segmentDisplay.querySelector(
    ".segment-display__top"
  );
  const segmentDisplayBottom = segmentDisplay.querySelector(
    ".segment-display__bottom"
  );
  const segmentOverlay = segmentDisplay.querySelector(".segment-overlay");
  const segmentOverlayTop = segmentOverlay.querySelector(
    ".segment-overlay__top"
  );
  const segmentOverlayBottom = segmentOverlay.querySelector(
    ".segment-overlay__bottom"
  );

  return {
    segmentDisplay,
    segmentDisplayTop,
    segmentDisplayBottom,
    segmentOverlay,
    segmentOverlayTop,
    segmentOverlayBottom,
  };
}

function updateSegmentValues(displayElement, overlayElement, value) {
  displayElement.textContent = value;
  overlayElement.textContent = value;
}

function updateTimeSegment(segmentElement, timeValue) {
  const segmentElements = getTimeSegmentElements(segmentElement);
  segmentElements.segmentOverlay.classList.add("flip");
  updateSegmentValues(
    segmentElements.segmentDisplayTop,
    segmentElements.segmentOverlayBottom,
    timeValue
  );

  function finishAnimation() {
    segmentElements.segmentOverlay.classList.remove("flip");
    updateSegmentValues(
      segmentElements.segmentDisplayBottom,
      segmentElements.segmentOverlayTop,
      timeValue
    );
    this.removeEventListener("animationend", finishAnimation);
  }
  segmentElements.segmentOverlay.addEventListener(
    "animationend",
    finishAnimation
  );
}

function updateTimeSection(sectionID, timeValue) {
  const firstNumber = Math.floor(timeValue / 10);
  const secondNumber = Math.floor(timeValue % 10);
  const sectionElement = document.getElementById(sectionID);
  const timeSegments = sectionElement.querySelectorAll(".time-segment");
  if (secondNumber === 0) updateTimeSegment(timeSegments[0], firstNumber);
  updateTimeSegment(timeSegments[1], secondNumber);
}

let interval;
let seconds = 0;
let hours = 0;
let minutes = 0;
let secId = "seconds";

document.querySelector(".btn-start").addEventListener("click", function () {
  clearInterval(interval);
  interval = setInterval(startTimer, 1000);
});

document.querySelector(".btn-stop").addEventListener("click", function () {
  clearInterval(interval);
});

document.querySelector(".btn-reset").addEventListener("click", function () {
  seconds = 0;
  minutes = 0;
  hours = 0;
  updateTimeSection("seconds", seconds);
  updateTimeSection("minutes", minutes);
  updateTimeSection("hours", hours);
  clearInterval(interval);
});

function startTimer() {
  seconds++;
  updateTimeSection("seconds", seconds);
  if (seconds > 59) {
    minutes++;
    seconds = 0;
    updateTimeSection("minutes", minutes);
    updateTimeSection("seconds", seconds);
  }
  if (minutes > 59) {
    hours++;
    minutes = 0;
    updateTimeSection("hours", hours);
    updateTimeSection("minutes", minutes);
  }
}
