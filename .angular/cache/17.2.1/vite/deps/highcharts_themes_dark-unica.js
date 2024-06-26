import {
  __commonJS
} from "./chunk-ASLTLD6L.js";

// node_modules/highcharts/themes/dark-unica.js
var require_dark_unica = __commonJS({
  "node_modules/highcharts/themes/dark-unica.js"(exports, module) {
    !/**
    * Highcharts JS v11.4.3 (2024-05-22)
    *
    * (c) 2009-2024 Torstein Honsi
    *
    * License: www.highcharts.com/license
    */
    function(o) {
      "object" == typeof module && module.exports ? (o.default = o, module.exports = o) : "function" == typeof define && define.amd ? define("highcharts/themes/dark-unica", ["highcharts"], function(e) {
        return o(e), o.Highcharts = e, o;
      }) : o("undefined" != typeof Highcharts ? Highcharts : void 0);
    }(function(o) {
      "use strict";
      var e = o ? o._modules : {};
      function r(o2, e2, r2, t) {
        o2.hasOwnProperty(e2) || (o2[e2] = t.apply(null, r2), "function" == typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", { detail: { path: e2, module: o2[e2] } })));
      }
      r(e, "Extensions/Themes/DarkUnica.js", [e["Core/Defaults.js"], e["Core/Utilities.js"]], function(o2, e2) {
        var r2, t;
        let { setOptions: l } = o2, { createElement: i } = e2;
        return (t = r2 || (r2 = {})).options = { colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"], chart: { backgroundColor: { linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 }, stops: [[0, "#2a2a2b"], [1, "#3e3e40"]] }, style: { fontFamily: "'Unica One', sans-serif" }, plotBorderColor: "#606063" }, title: { style: { color: "#E0E0E3", textTransform: "uppercase", fontSize: "20px" } }, subtitle: { style: { color: "#E0E0E3", textTransform: "uppercase" } }, xAxis: { gridLineColor: "#707073", labels: { style: { color: "#E0E0E3" } }, lineColor: "#707073", minorGridLineColor: "#505053", tickColor: "#707073", title: { style: { color: "#A0A0A3" } } }, yAxis: { gridLineColor: "#707073", labels: { style: { color: "#E0E0E3" } }, lineColor: "#707073", minorGridLineColor: "#505053", tickColor: "#707073", tickWidth: 1, title: { style: { color: "#A0A0A3" } } }, tooltip: { backgroundColor: "rgba(0, 0, 0, 0.85)", style: { color: "#F0F0F0" } }, plotOptions: { series: { dataLabels: { color: "#F0F0F3", style: { fontSize: "13px" } }, marker: { lineColor: "#333" } }, boxplot: { fillColor: "#505053" }, candlestick: { lineColor: "white" }, errorbar: { color: "white" } }, legend: { backgroundColor: "rgba(0, 0, 0, 0.5)", itemStyle: { color: "#E0E0E3" }, itemHoverStyle: { color: "#FFF" }, itemHiddenStyle: { color: "#606063" }, title: { style: { color: "#C0C0C0" } } }, credits: { style: { color: "#666" } }, drilldown: { activeAxisLabelStyle: { color: "#F0F0F3" }, activeDataLabelStyle: { color: "#F0F0F3" } }, navigation: { buttonOptions: { symbolStroke: "#DDDDDD", theme: { fill: "#505053" } } }, rangeSelector: { buttonTheme: { fill: "#505053", stroke: "#000000", style: { color: "#CCC" }, states: { hover: { fill: "#707073", stroke: "#000000", style: { color: "white" } }, select: { fill: "#000003", stroke: "#000000", style: { color: "white" } } } }, inputBoxBorderColor: "#505053", inputStyle: { backgroundColor: "#333", color: "silver" }, labelStyle: { color: "silver" } }, navigator: { handles: { backgroundColor: "#666", borderColor: "#AAA" }, outlineColor: "#CCC", maskFill: "rgba(255,255,255,0.1)", series: { color: "#7798BF", lineColor: "#A6C7ED" }, xAxis: { gridLineColor: "#505053" } }, scrollbar: { barBackgroundColor: "#808083", barBorderColor: "#808083", buttonArrowColor: "#CCC", buttonBackgroundColor: "#606063", buttonBorderColor: "#606063", rifleColor: "#FFF", trackBackgroundColor: "#404043", trackBorderColor: "#404043" } }, t.apply = function() {
          i("link", { href: "https://fonts.googleapis.com/css?family=Unica+One", rel: "stylesheet", type: "text/css" }, null, document.getElementsByTagName("head")[0]), l(t.options);
        }, r2;
      }), r(e, "masters/themes/dark-unica.src.js", [e["Core/Globals.js"], e["Extensions/Themes/DarkUnica.js"]], function(o2, e2) {
        return o2.theme = e2.options, e2.apply(), o2;
      });
    });
  }
});
export default require_dark_unica();
//# sourceMappingURL=highcharts_themes_dark-unica.js.map
