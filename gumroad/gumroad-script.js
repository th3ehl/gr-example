var gumroadScript = (function() {
	activate();
	function activate() {
		document.getElementsByTagName("head")[0].insertAdjacentHTML(
    "beforeend",
    "<link rel=\"stylesheet\" href=\"//s3.amazonaws.com/assets-ehl/gumroad/gumroad-button.css\" />");

		activateGumroadLinks();
	}

	function activateGumroadLinks() {
		var gumroadBtns = document.querySelectorAll('.gumroad-button');

		for (var i = 0; i < gumroadBtns.length; i++) {
			var widgetType = gumroadBtns[i].dataset.widgetType;

			if (widgetType === 'modal') {
				setupGumroadBtn(gumroadBtns[i]);
			} else if (widgetType === 'embed') {
				setupEmbeddedGumroad(gumroadBtns[i]);
			}
		}		
	}

	function setupGumroadBtn(gumroadBtn) {
		gumroadBtn.addEventListener('click', function(e) {
	    e.stopPropagation();
	    e.preventDefault();
			var productId = gumroadBtn.dataset.productId;
			setupIframeForGumroadLink(productId);
		});
	}

	function setupEmbeddedGumroad(gumroadBtn) {
		var productId = gumroadBtn.dataset.productId;
		var iframe = createIframe(productId);
		gumroadBtn.appendChild(iframe);

    iframe.addEventListener('load', function() {
      iframe.height = this.contentWindow.document.body.offsetHeight + 25 + 'px';
    });		
	}

	function setupIframeForGumroadLink(productId) {
		var iframe = createIframe(productId);
    iframe.height = "100%";
    iframe.style.position = 'fixed';		
		document.body.appendChild(iframe);
	}

  function createIframe(productId, widgetType) {
    var iframeEl = document.createElement("iframe");
    iframeEl.src = "//s3.amazonaws.com/assets-ehl/gumroad/gumroad-iframe.html?product-id=" + productId;
    iframeEl.scrolling = "auto";
    iframeEl.crossorigin = 'anonymous';
    iframeEl.frameborder = "0";
    iframeEl.width = "100%";
    iframeEl.style.top = 0;
    iframeEl.style.left = 0;
    iframeEl.style.background = 'rgba(0, 0, 0, 0.5)';
    iframeEl.style.border = 'none';
    iframeEl.id = 'gumroad-iframe-' + productId
    return iframeEl;
  }; 
})();

function closeIframe(productId) {
	var iframeId = 'gumroad-iframe-' + productId
  document.getElementById(iframeId).remove();
}