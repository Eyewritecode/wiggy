(function(){

  // Add frappe charts if not loaded

  if(typeof window.frappe === undefined){
    var frappeLibrary = loadFrappe();
    document.getElementByTagName("head")[0].appendChild(frappeLibrary);
  }
  else{
    main();
  }
}());

// use frappe charts 1.1.0

function loadFrappe(){
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://cdn.jsdelivr.net/npm/frappe-charts@1.1.0/dist/frappe-charts.min.iife.js";
  return script;
}

function createWidgetContainer(){
  var widgetContainer = document.getElementById("widget");
  var widgetDiv = document.createElement("div");
  widgetDiv.setAttribute("id", "chart"); // Refactor this to allow setting attributes separately
  widgetContainer.appendChild(widgetDiv);
}
