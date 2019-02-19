var gumroadScript = (function() {
	activate();
	function activate() {
		document.getElementsByTagName("head")[0].insertAdjacentHTML(
    "beforeend",
    "<link rel=\"stylesheet\" href=\"https://s3.amazonaws.com/assets-ehl/gumroad/gumroad-button.css\" />");
		
		activateGumroadLinks();	
	}

	function activateGumroadLinks() {
		var gumroadBtns = document.querySelectorAll('.gumroad-button');

		for (var i = 0; i < gumroadBtns.length; i++) {
			var widgetType = gumroadBtns[i].dataset.widgetType;

			if (widgetType === 'modal') {
				setupGumroadBtn(gumroadBtns[i]);
			} else if (widgetType === 'embed') {
				console.log("IM HERE")
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
			listenForIframeMsgs(productId);
		});
	}

	function setupEmbeddedGumroad(gumroadBtn) {
		var productId = gumroadBtn.dataset.productId;
		var iframe = createIframe(productId);

		listenForIframeMsgs(productId)
		gumroadBtn.appendChild(iframe);

    // iframe.addEventListener('load', function(e) {
    // 	console.log(e)
    // 	console.log(iframe.contentWindow.contentWindow.document.body.scrollHeight)
    //   // iframe.height = this.contentWindow.document.body.offsetHeight + 25 + 'px';
    // });		



	}

	function setupIframeForGumroadLink(productId) {
		var iframe = createIframe(productId);
    iframe.height = "100%";
    iframe.style.position = 'fixed';		
		document.body.appendChild(iframe);
	}

  function createIframe(productId, widgetType) {
    var iframeEl = document.createElement("iframe");
    iframeEl.src = "https://s3.amazonaws.com/assets-ehl/gumroad/gumroad-iframe.html?product-id=" + productId;
    iframeEl.scrolling = "auto";
    iframeEl.crossorigin = 'anonymous';
    iframeEl.frameborder = "0";
    iframeEl.width = "100%";
    iframeEl.style.top = 0;
    iframeEl.style.left = 0;
    iframeEl.style.background = 'rgba(0, 0, 0, 0.5)';
    iframeEl.style.border = 'none';
    iframeEl.style['min-height'] = '100vh';
    iframeEl.id = 'gumroad-iframe-' + productId
    return iframeEl;
  }; 

  function listenForIframeMsgs(productId) {
		var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
		var eventer = window[eventMethod];
		var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

		eventer(messageEvent,function(e) {
	    var key = e.message ? "message" : "data";
	    var data = e[key];

	    console.log(key)
	    console.log(data)

	    var iframeId, iframeEl;
	    if (data.productId) {
	    	iframeId = 'gumroad-iframe-' + data.productId	
	    	iframeEl = document.getElementById(iframeId);
	    }
			
	    if (data.closeGumroadModal && iframeEl) {
				document.getElementById(iframeId).remove();
	    }

	    if (data.resize && iframeEl) {
				iframeEl.height = data.resize + 'px';
	    }
		}, false);
  }

})();
