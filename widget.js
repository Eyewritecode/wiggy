(function(){

  var data = {};
  var defaultURL = ""; // Replace this with your default redmine instance URL.
  var url = new URL(window.location.href);
  var project = url.searchParams.get("project") ? url.searchParams.get("project") : window.location.hash.substr(1);
  var redmine = url.searchParams.get("instance") ? "https://" + url.searchParams.get("instance") : defaultURL;
  var projectUrl = redmine + "/projects/" + project;

  // Get data from Redmine api
  var projectDataUrl = projectUrl + ".json?include=trackers,issue_categories";
  var issuesUrl = projectUrl + "/issues.json?limit=100000&status_id=*";
  var statusesUrl = redmine + "/issue_statuses.json";

  // load jQuery
  var jQuery = document.createElement("script");
  jQuery.type = "text/javascript";
  jQuery.src = "https://code.jquery.com/jquery-3.3.1.min.js";
  document.getElementsByTagName("head")[0].appendChild(jQuery);
  jQuery.onload = function(){
    loadFrappe();
  }

  // load frappe charts
  function loadFrappe(){
    var frappeJS = document.createElement("script");
    frappeJS.type = "text/javascript";
    frappeJS.src = "https://cdn.jsdelivr.net/npm/frappe-charts@1.1.0/dist/frappe-charts.min.iife.js";
    document.getElementsByTagName("body")[0].appendChild(frappeJS);
    frappeJS.onload = function(){
      main();
    }
  }
  
  function main(){
    createWidgetContainer();
    queryRedmineAPI(projectDataUrl).then(function(projectData){
      queryRedmineAPI(issuesUrl).then(function(issuesData){
        queryRedmineAPI(statusesUrl).then(function(statusesData){
          plotData(projectData.project, statusesData.issue_statuses, issuesData.issues);
        });
      });
    });
  }

  // User should create a div with "widget" as value of its ID attribute. i.e: <div id="widget"></div>
  function createWidgetContainer(){
    var widgetContainer = document.getElementById("widget");
    var chartDiv = document.createElement("div");
    chartDiv.setAttribute("id", "chart"); // Refactor this to allow setting attributes separately
    widgetContainer.appendChild(chartDiv);
  }

  function queryRedmineAPI(url){
    return new Promise(function(resolve, reject){
      $.getJSON(url, function(response){
        if(response){
          resolve(response);
        }else{
          reject("Couldn't get data from Redmine");
        }
      });
    });
  }

  function plotData(project, statuses, issues){
    var chartType = "axis-mixed";
    var widgetContainer = document.getElementById("widget");
    if (widgetContainer.getAttribute("data-chart")){
       chartType= widgetContainer.getAttribute("data-chart");
    }
    var data = {
      labels: ['対応中', "終了"],
      datasets: []
    };
    var is_closed = [];
    statuses.forEach(function (status) {
      if (status.is_closed) {
        is_closed.push(status.name);
      }
    });

    project.trackers.forEach(function (tracker) {
      var item = {
        'name': tracker.name,
        'chartType': 'bar',
        'values': []
      };

      var open = close = 0;
      issues.forEach(function (issue) {
        if (issue.tracker.name === tracker.name) {
          if (is_closed.indexOf(issue.status.name) !== -1) {
            close++;
          } else {
            open++;
          }
        }
      });

      item.values.push(open);
      item.values.push(close);
      data.datasets.push(item);
    });

    const chart = new frappe.Chart("#chart", { 
        title: "My Awesome Chart",
        data: data,
        type: chartType, // or 'bar', 'line', 'scatter', 'pie', 'percentage'
        height: 250,
        colors: ['#7cd6fd', '#743ee2']
    });
  }
})();
