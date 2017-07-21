function attachOverlay(innerHtmlMessage) {
  const overlay = `<div class="overlay">${innerHtmlMessage}</div>`;
  $(overlay).appendTo('body');
}

export function countdown(seconds, message) {
  const messageHtml = `<div class="overlayMessage">${message}<span id="overlaySeconds">${seconds}</span></div>`;
  let currentSeconds = seconds;
  let interval = 0;

  attachOverlay(messageHtml);

  return new Promise(resolve => {
    interval = window.setInterval(() => {
      currentSeconds--;
      if (currentSeconds === 0) {
        window.clearInterval(interval);
        $('body .overlay').remove();
        resolve();
      } else {
        $('#overlaySeconds').text(currentSeconds);
      }
    }, 1000);
  });
}
