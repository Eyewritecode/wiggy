(function(){

  // load frappe charts

  var frappeJS = document.createElement("script");
  frappeJS.type = "text/javascript";
  frappeJS.src = "https://cdn.jsdelivr.net/npm/frappe-charts@1.1.0/dist/frappe-charts.min.iife.js";
  document.getElementsByTagName("body")[0].appendChild(frappeJS);
  frappeJS.onload = function(){
    main();
  }

  function main(){
    createWidgetContainer(plotData);
  }

  function createWidgetContainer(callback){
    var widgetContainer = document.getElementById("widget");
    var chartDiv = document.createElement("div");
    chartDiv.setAttribute("id", "chart"); // Refactor this to allow setting attributes separately
    widgetContainer.appendChild(chartDiv);
    callback();
  }

  function getReports() {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "https://admin.mycityreport.jp/projects/chiba.json", true);
    ajax.send();
    ajax.onreadystatechange=function(){
      if(ajax.readyState == 4 && ajax.status == 200){
        var response = JSON.parse(ajax.responseText);
        console.log(response.project);
        document.getElementById("chart").innerHTML = response.project.name;
      }
    };
  }

  function plotData(){
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
    const chart = new frappe.Chart("#chart", { 
        title: "My Awesome Chart",
        data: data,
        type: 'pie', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
        height: 250,
        colors: ['#7cd6fd', '#743ee2']
    });
  }
})();
