(function(){

  // Add frappe charts if not loaded

  if(typeof window.frappe === "undefined"){
    var frappeLibrary = loadFrappe();
    document.getElementByTagName("head")[0].appendChild(frappeLibrary);
    main();
  }
  else{
    main();
  }
  
  // use frappe charts 1.1.0

  function loadFrappe(){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.jsdelivr.net/npm/frappe-charts@1.1.0/dist/frappe-charts.min.iife.js";
    return script;
  }

  function main(){
    createWidgetContainer();
  }

  function createWidgetContainer(callback){
    var widgetContainer = document.getElementById("widget");
    var widgetDiv = document.createElement("div");
    widgetDiv.setAttribute("id", "chart"); // Refactor this to allow setting attributes separately
    widgetContainer.appendChild(widgetDiv);
    plotData(callback);
  }

  function plotData(callback){
    const data = {
      labels: ["12am-3am", "3am-6pm", "6am-9am", "9am-12am",
          "12pm-3pm", "3pm-6pm", "6pm-9pm", "9am-12am"
      ],
      datasets: [
          {
              name: "Some Data", type: "bar",
              values: [25, 40, 30, 35, 8, 52, 17, -4]
          },
          {
              name: "Another Set", type: "line",
              values: [25, 50, -10, 15, 18, 32, 27, 14]
          }
      ]
  }

  const chart = new frappe.Chart("#chart", {  // or a DOM element,
                                              // new Chart() in case of ES6 module with above usage
      title: "My Awesome Chart",
      data: data,
      type: 'axis-mixed', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
      height: 250,
      colors: ['#7cd6fd', '#743ee2']
  })
    callback();
  }
})();
