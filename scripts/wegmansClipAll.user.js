// ==UserScript==
// @name        Clip all coupons at wegmans.com
// @namespace   https://github.com/jrib/userscripts/
// @match       https://shop.wegmans.com/shop/coupons
// @require     https://gist.githubusercontent.com/jrib/22d6dc3c55b768910bc5bb4e6d2ddf2f/raw/debc0e6d4d537ac228d1d71f44b1162979a5278c/waitForKeyElements.js
// @grant       none
// @version     1.0
// @author      jrib
// @description 9/12/2022, 6:07:45 PM
// @run-at      document-idle
// ==/UserScript==

(function() {
  // https://github.com/greasemonkey/gm4-polyfill/blob/master/gm4-polyfill.js#L33
  function addCss(aCss) {
    let head = document.getElementsByTagName('head')[0];
    if (head) {
      let style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.textContent = aCss;
      head.appendChild(style);
      return style;
    }
  }

  function clipAll() {
    for (const clipButton of document.querySelectorAll('.coupon button')) {
      clipButton.click();
    }
  }

  function drawButton() {
    // button style from https://github.com/andybrewer/mvp
    css = '.clipAllButton {' +
            'background-color: #4DA4EA;' +
            'border: 2px solid #4DA4EA;' +
            'color: #FFF;' +
            'border-radius: 5px;' +
            'display: inline-block;' +
            'font-size: medium;' +
            'font-weight: bold;' +
            'line-height: 1.5;' +
            'margin: 0 0.5rem;' +
            'padding: 1rem 2rem;' +
          '}' +
          '.clipAllButton:hover { cursor: pointer; filter: brightness(1.2); }';
    addCss(css);

    var container = document.getElementsByClassName('cell-container')[0];
    var button = document.createElement('div');
    button.className = 'clipAllButton';
    button.innerHTML = 'Clip all';
    button.onclick = clipAll;
    container.prepend(button);
  }

  waitForKeyElements('.cell-container', drawButton, true);
})()
