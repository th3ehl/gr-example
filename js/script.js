(function() {
  var self = this;
  self.DEFAULT_BTN_TXT = 'Buy My Product';

  activate();
  function activate() {
    setupClipboardListener();
    setupTabOptions();
    setupGumroadLinkInput();

    setTimeout(function() {
      document.getElementById("gumroadButtonEmbedded").style.display = 'none'; 
    }, 1000);
  }

  function getLinktxt() {
    var buttonFormEl = document.getElementById('buttonText');
    var buttonTxt;
    if (buttonFormEl.value.length) {
      buttonTxt = buttonFormEl.value
    } else {
      buttonTxt = self.DEFAULT_BTN_TXT;
    }

    return buttonTxt;
  }

  function setupGumroadLinkInput() {
    var productId = 1;
    var widgetType = 'modal';
    var buttonDemoEl = document.getElementById('buttonDemo');

    var logoHtml = '<span class="gumroad-button-logo"></span>'
    buttonDemoEl.innerHTML = logoHtml + getLinktxt();
    console.log(self.DEFAULT_BTN_TXT)
    setTextAreaHtml(self.DEFAULT_BTN_TXT, productId, widgetType);

    var buttonFormEl = document.getElementById('buttonText');
    buttonFormEl.addEventListener('input', function() {
      buttonDemoEl.innerHTML = logoHtml + getLinktxt();
      setTextAreaHtml(buttonTxt, productId, widgetType);
    });
  }

  function setTextAreaHtml(buttonTxt, productId, widgetType) {
    var btnClass = '"gumroad-button';
    if (widgetType === 'modal') {
      btnClass += " gumroad-button-styling"
    }

    btnClass += '"';

    var scriptHtml = '<script src="https://gumroad.com/js/gumroad.js"></script>';
    var buttonHtml = '<a href="#"' + ' ' +
      'class=' + btnClass + ' ' +
      'data-product-id="' + productId + '" ' + 
      'data-widget-type="' + widgetType + '" ' + 
      '>' + 
      buttonTxt + '</a>';
    document.getElementById('gumroadScript').value = scriptHtml + "\n" + buttonHtml;
  }

  function setupClipboardListener() {
    var copyToClipboardEl = document.getElementById('copyToClipboard')
    copyToClipboardEl.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      document.getElementById('gumroadScript').select();
      document.execCommand('copy');
    });    
  }
  
  function setupTabOptions() {
    var tabOptions = document.querySelectorAll('.hero-tab');
    for (var i = 0; i < tabOptions.length; i++) {
      tabOptions[i].addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        for (var i = 0; i < tabOptions.length; i++) {
          tabOptions[i].parentNode.classList.add("tabs-wrap--unselected");
        }

        this.parentNode.classList.remove("tabs-wrap--unselected");

        var widgetType = this.dataset.widgetType;

        if (widgetType === 'modal') {
          document.getElementById("buttonDemo").style.display = 'inline-block';
          document.getElementById("hero-button-form").style.display = 'block';
          document.getElementById("gumroadButtonEmbedded").style.display = 'none';

          var buttonTxt = getLinktxt();
          var productId = 1;
          setTextAreaHtml(buttonTxt, productId, widgetType);          
        } else if (widgetType === 'embed') {
          document.getElementById("buttonDemo").style.display = 'none';
          document.getElementById("hero-button-form").style.display = 'none';
          document.getElementById("gumroadButtonEmbedded").style.display = 'block';

          var buttonTxt = "";
          var productId = 1;
          setTextAreaHtml(buttonTxt, productId, widgetType);
        } 
      });     
    }
  }

})();




