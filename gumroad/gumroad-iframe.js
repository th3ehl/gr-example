(function() {

	var MOCK_DB = {
		'1': {
			title: "Alice's Adventures in Wonderland",
			description: "An 1865 novel written by English author Charles Lutwidge Dodgson under the pseudonym Lewis Carroll. It tells of a girl named Alice who falls down a rabbit hole into a fantasy world (Wonderland) populated by peculiar, anthropomorphic creatures.",
			previewImgSrc: 'https://static-2.gumroad.com/res/gumroad/9432604211760/asset_previews/a9b5aa88921efa9310e359c8da44feb9/retina/demo.jpg',
			productSize: "410 KB",
			productLength: "71 pages"
		},
		'2': {
			title: "Alice's Adventures in Wonderland",
			description: "An 1865 novel written by English author Charles Lutwidge Dodgson under the pseudonym Lewis Carroll. It tells of a girl named Alice who falls down a rabbit hole into a fantasy world (Wonderland) populated by peculiar, anthropomorphic creatures.",
			previewImgSrc: 'https://static-2.gumroad.com/res/gumroad/9432604211760/asset_previews/a9b5aa88921efa9310e359c8da44feb9/retina/demo.jpg',
			productSize: "410 KB",
			productLength: "71 pages"
		}		
	}

	activate();
	function activate() {
		var params = parseParams();

		var productId = params['product-id'];
		var productDetails = MOCK_DB[productId];

		var titleEl = document.getElementById('title-el');
		titleEl.innerHTML = productDetails.title;

		var decriptionEl = document.getElementById('description-el');
		decriptionEl.innerHTML = productDetails.description;

		var previewImg = document.getElementById('preview-img-el');
		previewImg.src = productDetails.previewImgSrc;

		var productSize = document.getElementById('productSize');
		productSize.innerHTML = "<span>Size</span><strong>" + productDetails.productSize + "</strong>";

		var productLen = document.getElementById('productLen');
		productLen.innerHTML = "<span>Length</span><strong>" + productDetails.productLength + "</strong>";		

		document.getElementById("iframe__main-wrap").addEventListener("click", function(e) {
			e.stopPropagation();
			e.preventDefault();
		});

		document.body.addEventListener("click", function(e) {
			parent.closeIframe(productId);
		});		
	}

	function parseParams() {
		var paramsArr = location.href.split('?')[1].split('&');
		var paramsObj = {};
		for (x in paramsArr) {
			paramsObj[paramsArr[x].split('=')[0]] = paramsArr[x].split('=')[1];
		}

		return paramsObj;
	}
})();