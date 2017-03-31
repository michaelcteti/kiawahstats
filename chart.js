var margin = {
    top: 1,
    right: 1,
    bottom: 6,
    left: 1
  },
  width = 1168 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

var formatNumber = d3.format(",.0f"),
  format = function(d) {
    return formatNumber(d) + " Holes";
  },
  color = d3.scaleOrdinal(d3.schemeCategory20);

var svg = d3.select("#chart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var sankey = d3.sankey()
  .nodeWidth(25)
  .nodePadding(10)
  .size([width, height]);

var path = sankey.link();
var stats;

function convertStats(rawData, byCourse, includePar, includeDrives, includeGreens) {
  if (byCourse == false && includePar == false && includeDrives == false && includeGreens == false) {
    // hard coded nodes....no way around this I can see
    nodes = [
      { "name": "All Holes" },
      { "name": "Birdies" },
      { "name": "Pars" },
      { "name": "Bogeys" },
      { "name": "Doubles" }
    ];

    // counts to generate links between nodes. Also may be forced to be hard coded...
    allHolesToBirdies = 0;
    allHolesToPars = 0;
    allHolesToBogeys = 0;
    allHolesToDoubles = 0;

    // mapping through data to update counts
    rawData.map(function(datum) {
      if (datum.BIR == 1){
        allHolesToBirdies += 1;
      };
      if (datum.PAR == 1){
        allHolesToPars += 1;
      };
      if (datum.BOG == 1){
        allHolesToBogeys += 1;
      };
      if (datum.DB == 1){
        allHolesToDoubles += 1;
      };
    });

    // generate links...need to find a way to use indexes to do this...
    links = [
      { "source": 0, "target": 1, "value": allHolesToBirdies },
      { "source": 0, "target": 2, "value": allHolesToPars },
      { "source": 0, "target": 3, "value": allHolesToBogeys },
      { "source": 0, "target": 4, "value": allHolesToDoubles }
    ];
  };

  if (byCourse == true && includePar == false && includeDrives == false && includeGreens == false) {
    nodes = [
      { "name": "Turtle Point" },
      { "name": "Ocean Course" },
      { "name": "Oak Point" },
      { "name": "Osprey Point" },
      { "name": "Birdies" },
      { "name": "Pars" },
      { "name": "Bogeys" },
      { "name": "Doubles" }
    ];

    TPToBirdies = 0;
    TPToPars = 0;
    TPToBogeys = 0;
    TPToDoubles = 0;
    OCToBirdies = 0;
    OCToPars = 0;
    OCToBogeys = 0;
    OCToDoubles = 0;
    OKToBirdies = 0;
    OKToPars = 0;
    OKToBogeys = 0;
    OKToDoubles = 0;
    OPToBirdies = 0;
    OPToPars = 0;
    OPToBogeys = 0;
    OPToDoubles = 0;

    rawData.map(function(datum) {
      if (datum.Course == "TP"){
        if (datum.BIR == 1){
          TPToBirdies += 1;
        };
        if (datum.PAR == 1){
          TPToPars += 1;
        };
        if (datum.BOG == 1){
          TPToBogeys += 1;
        };
        if (datum.DB == 1){
          TPToDoubles += 1;
        };
      };
      if (datum.Course == "OC"){
        if (datum.BIR == 1){
          OCToBirdies += 1;
        };
        if (datum.PAR == 1){
          OCToPars += 1;
        };
        if (datum.BOG == 1){
          OCToBogeys += 1;
        };
        if (datum.DB == 1){
          OCToDoubles += 1;
        };
      };
      if (datum.Course == "OK"){
        if (datum.BIR == 1){
          OKToBirdies += 1;
        };
        if (datum.PAR == 1){
          OKToPars += 1;
        };
        if (datum.BOG == 1){
          OKToBogeys += 1;
        };
        if (datum.DB == 1){
          OKToDoubles += 1;
        };
      };
      if (datum.Course == "OP"){
        if (datum.BIR == 1){
          OPToBirdies += 1;
        };
        if (datum.PAR == 1){
          OPToPars += 1;
        };
        if (datum.BOG == 1){
          OPToBogeys += 1;
        };
        if (datum.DB == 1){
          OPToDoubles += 1;
        };
      };
    });

    links = [
      { "source": 0, "target": 4, "value": TPToBirdies },
      { "source": 0, "target": 5, "value": TPToPars },
      { "source": 0, "target": 6, "value": TPToBogeys },
      { "source": 0, "target": 7, "value": TPToDoubles },
      { "source": 1, "target": 4, "value": OCToBirdies },
      { "source": 1, "target": 5, "value": OCToPars },
      { "source": 1, "target": 6, "value": OCToBogeys },
      { "source": 1, "target": 7, "value": OCToDoubles },
      { "source": 2, "target": 4, "value": OKToBirdies },
      { "source": 2, "target": 5, "value": OKToPars },
      { "source": 2, "target": 6, "value": OKToBogeys },
      { "source": 2, "target": 7, "value": OKToDoubles },
      { "source": 3, "target": 4, "value": OPToBirdies },
      { "source": 3, "target": 5, "value": OPToPars },
      { "source": 3, "target": 6, "value": OPToBogeys },
      { "source": 3, "target": 7, "value": OPToDoubles }
    ]
  };

  if (byCourse == false && includePar == true && includeDrives == false && includeGreens == false) {
    nodes = [
      { "name": "All Holes" },
      { "name": "Par 3" },
      { "name": "Par 4" },
      { "name": "Par 5" },
      { "name": "Birdies" },
      { "name": "Pars" },
      { "name": "Bogeys" },
      { "name": "Doubles" }
    ];

    allToThrees = 0;
    allToFours = 0;
    allToFives = 0;
    threeToBirdies = 0;
    threeToPars = 0;
    threeToBogeys = 0;
    threeToDoubles = 0;
    fourToBirdies = 0;
    fourToPars = 0;
    fourToBogeys = 0;
    fourToDoubles = 0;
    fiveToBirdies = 0;
    fiveToPars = 0;
    fiveToBogeys = 0;
    fiveToDoubles = 0;

    rawData.map(function(datum) {
      if (datum.P == 3) {
        allToThrees += 1;
        if (datum.BIR == 1){
          threeToBirdies += 1;
        };
        if (datum.PAR == 1){
          threeToPars += 1;
        };
        if (datum.BOG == 1){
          threeToBogeys += 1;
        };
        if (datum.DB == 1){
          threeToDoubles += 1;
        };
      };
      if (datum.P == 4) {
        allToFours += 1;
        if (datum.BIR == 1){
          fourToBirdies += 1;
        };
        if (datum.PAR == 1){
          fourToPars += 1;
        };
        if (datum.BOG == 1){
          fourToBogeys += 1;
        };
        if (datum.DB == 1){
          fourToDoubles += 1;
        };
      };
      if (datum.P == 5) {
        allToFives += 1;
        if (datum.BIR == 1){
          fiveToBirdies += 1;
        };
        if (datum.PAR == 1){
          fiveToPars += 1;
        };
        if (datum.BOG == 1){
          fiveToBogeys += 1;
        };
        if (datum.DB == 1){
          fiveToDoubles += 1;
        };
      };
    });

    links = [
      { "source": 0, "target": 1, "value": allToThrees },
      { "source": 0, "target": 2, "value": allToFours },
      { "source": 0, "target": 3, "value": allToFives },
      { "source": 1, "target": 4, "value": threeToBirdies },
      { "source": 1, "target": 5, "value": threeToPars },
      { "source": 1, "target": 6, "value": threeToBogeys },
      { "source": 1, "target": 7, "value": threeToDoubles },
      { "source": 2, "target": 4, "value": fourToBirdies },
      { "source": 2, "target": 5, "value": fourToPars },
      { "source": 2, "target": 6, "value": fourToBogeys },
      { "source": 2, "target": 7, "value": fourToDoubles },
      { "source": 3, "target": 4, "value": fiveToBirdies },
      { "source": 3, "target": 5, "value": fiveToPars },
      { "source": 3, "target": 6, "value": fiveToBogeys },
      { "source": 3, "target": 7, "value": fiveToDoubles }
    ]
  };

  if (byCourse == true && includePar == true && includeDrives == true && includeGreens == true) {
    nodes = [
      { "name": "Turtle Point" },
      { "name": "Ocean Course" },
      { "name": "Oak Point" },
      { "name": "Osprey Point" },
      { "name": "Par 3" },
      { "name": "Par 4" },
      { "name": "Par 5" },
      { "name": "In-Play Drive" },
      { "name": "Out-of-Play Drive" },
      { "name": "GIR" },
      { "name": "No GIR" },
      { "name": "Birdies" },
      { "name": "Pars" },
      { "name": "Bogeys" },
      { "name": "Doubles" }
    ];

    TPToThrees = 0;
    TPToFours = 0;
    TPToFives = 0;
    OCToThrees = 0;
    OCToFours = 0;
    OCToFives = 0;
    OKToThrees = 0;
    OKToFours = 0;
    OKToFives = 0;
    OPToThrees = 0;
    OPToFours = 0;
    OPToFives = 0;
    ThreesToIPD = 0;
    FoursToIPD = 0;
    FivesToIPD = 0;
    ThreesToOPD = 0;
    FoursToOPD = 0;
    FivesToOPD = 0;
    IPDToGIR = 0;
    OPDToGIR = 0;
    IPDToNoGIR = 0;
    OPDToNoGIR = 0;
    GIRToBirdies = 0;
    GIRToPars = 0;
    GIRToBogeys = 0;
    GIRToDoubles = 0;
    NoGIRToBirdies = 0;
    NoGIRToPars = 0;
    NoGIRToBogeys = 0;
    NoGIRToDoubles = 0;

    rawData.map(function(datum) {
      if (datum.Course == "TP") {
        if (datum.P == 3) {
          TPToThrees += 1;
          if (datum.IPD == 1) {
            ThreesToIPD += 1;
          };
          if (datum.IPD == 0) {
            ThreesToOPD += 1;
          };
        };
        if (datum.P == 4) {
          TPToFours += 1;
          if (datum.IPD == 1) {
            FoursToIPD += 1;
          };
          if (datum.IPD == 0) {
            FoursToOPD += 1;
          };
        };
        if (datum.P == 5) {
          TPToFives += 1;
          if (datum.IPD == 1) {
            FivesToIPD += 1;
          };
          if (datum.IPD == 0) {
            FivesToOPD += 1;
          };
        };
      };
      if (datum.Course == "OC") {
        if (datum.P == 3) {
          OCToThrees += 1;
          if (datum.IPD == 1) {
            ThreesToIPD += 1;
          };
          if (datum.IPD == 0) {
            ThreesToOPD += 1;
          };
        };
        if (datum.P == 4) {
          OCToFours += 1;
          if (datum.IPD == 1) {
            FoursToIPD += 1;
          };
          if (datum.IPD == 0) {
            FoursToOPD += 1;
          };
        };
        if (datum.P == 5) {
          OCToFives += 1;
          if (datum.IPD == 1) {
            FivesToIPD += 1;
          };
          if (datum.IPD == 0) {
            FivesToOPD += 1;
          };
        };
      };
      if (datum.Course == "OK") {
        if (datum.P == 3) {
          OKToThrees += 1;
          if (datum.IPD == 1) {
            ThreesToIPD += 1;
          };
          if (datum.IPD == 0) {
            ThreesToOPD += 1;
          };
        };
        if (datum.P == 4) {
          OKToFours += 1;
          if (datum.IPD == 1) {
            FoursToIPD += 1;
          };
          if (datum.IPD == 0) {
            FoursToOPD += 1;
          };
        };
        if (datum.P == 5) {
          OKToFives += 1;
          if (datum.IPD == 1) {
            FivesToIPD += 1;
          };
          if (datum.IPD == 0) {
            FivesToOPD += 1;
          };
        };
      };
      if (datum.Course == "OP") {
        if (datum.P == 3) {
          OPToThrees += 1;
          if (datum.IPD == 1) {
            ThreesToIPD += 1;
          };
          if (datum.IPD == 0) {
            ThreesToOPD += 1;
          };
        };
        if (datum.P == 4) {
          OPToFours += 1;
          if (datum.IPD == 1) {
            FoursToIPD += 1;
          };
          if (datum.IPD == 0) {
            FoursToOPD += 1;
          };
        };
        if (datum.P == 5) {
          OPToFives += 1;
          if (datum.IPD == 1) {
            FivesToIPD += 1;
          };
          if (datum.IPD == 0) {
            FivesToOPD += 1;
          };
        };
      };
      if (datum.IPD == 1) {
        if (datum.GIR == 1) {
          IPDToGIR += 1;
        };
        if (datum.GIR == 0) {
          IPDToNoGIR += 1;
        };
      };
      if (datum.IPD == 0) {
        if (datum.GIR == 1) {
          OPDToGIR += 1;
        };
        if (datum.GIR == 0) {
          OPDToNoGIR += 1;
        };
      };
      if (datum.GIR == 1) {
        if (datum.BIR == 1){
          GIRToBirdies += 1;
        };
        if (datum.PAR == 1){
          GIRToPars += 1;
        };
        if (datum.BOG == 1){
          GIRToBogeys += 1;
        };
        if (datum.DB == 1){
          GIRToDoubles += 1;
        };
      };
      if (datum.GIR == 0) {
        if (datum.BIR == 1){
          NoGIRToBirdies += 1;
        };
        if (datum.PAR == 1){
          NoGIRToPars += 1;
        };
        if (datum.BOG == 1){
          NoGIRToBogeys += 1;
        };
        if (datum.DB == 1){
          NoGIRToDoubles += 1;
        };
      };
    });

    links = [
      { "source": 0, "target": 4, "value": TPToThrees },
      { "source": 0, "target": 5, "value": TPToFours },
      { "source": 0, "target": 6, "value": TPToFives },
      { "source": 1, "target": 4, "value": OCToThrees },
      { "source": 1, "target": 5, "value": OCToFours },
      { "source": 1, "target": 6, "value": OCToFives },
      { "source": 2, "target": 4, "value": OKToThrees },
      { "source": 2, "target": 5, "value": OKToFours },
      { "source": 2, "target": 6, "value": OKToFives },
      { "source": 3, "target": 4, "value": OPToThrees },
      { "source": 3, "target": 5, "value": OPToFours },
      { "source": 3, "target": 6, "value": OPToFives },
      { "source": 4, "target": 7, "value": ThreesToIPD },
      { "source": 5, "target": 7, "value": FoursToIPD },
      { "source": 6, "target": 7, "value": FivesToIPD },
      { "source": 4, "target": 8, "value": ThreesToOPD },
      { "source": 5, "target": 8, "value": FoursToOPD },
      { "source": 6, "target": 8, "value": FivesToOPD },
      { "source": 7, "target": 9, "value": IPDToGIR },
      { "source": 7, "target": 10, "value": IPDToNoGIR },
      { "source": 8, "target": 9, "value": OPDToGIR },
      { "source": 8, "target": 10, "value": OPDToNoGIR },
      { "source": 9, "target": 11, "value": GIRToBirdies },
      { "source": 9, "target": 12, "value": GIRToPars },
      // { "source": 9, "target": 13, "value": GIRToBogeys },
      // { "source": 9, "target": 14, "value": GIRToDoubles },
      // { "source": 10, "target": 11, "value": NoGIRToBirdies },
      { "source": 10, "target": 12, "value": NoGIRToPars },
      { "source": 10, "target": 13, "value": NoGIRToBogeys },
      { "source": 10, "target": 14, "value": NoGIRToDoubles }
    ];
  };

  convertedStats = {
    nodes: nodes,
    links: links
  };

  return convertedStats;
};

d3.json("rawstats.json", function(error, json) {
  if (error) return console.warn(error);

  // convertStats(json, course, par, drive, green)
  // stats = convertStats(json, false, false, false, false) // All to Score DONE
  // stats = convertStats(json, true, false, false, false) // Course to Score DONE
  // stats = convertStats(json, false, true, false, false) // All to Par to Score DONE
  // stats = convertStats(json, false, false, true, false) // All to Drive to Score
  // stats = convertStats(json, false, false, false, true) // All to Green to Score
  // stats = convertStats(json, true, false, true, true) // Course to Drive to Green to Score
  stats = convertStats(json, true, true, true, true) // Course to Par to Drive to Green to Score

  sankey
    .nodes(stats.nodes)
    .links(stats.links)
    .layout(32);

  var link = svg.append("g").selectAll(".link")
    .data(stats.links)
    .enter().append("path")
    .attr("class", "link")
    .attr("d", path)
    .style("stroke-width", function(d) {
      return Math.max(1, d.dy);
    })
    .sort(function(a, b) {
      return b.dy - a.dy;
    });

  link.append("title")
    .text(function(d) {
      return d.source.name + " → " + d.target.name + "\n" + format(d.value);
    });

  var node = svg.append("g").selectAll(".node")
    .data(stats.nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    })
    .call(d3.drag()
      .subject(function(d) {
        return d;
      })
      .on("start", function() {
        this.parentNode.appendChild(this);
      })
      .on("drag", dragmove));

  node.append("rect")
    .attr("height", function(d) {
      return d.dy;
    })
    .attr("width", sankey.nodeWidth())
    .style("fill", function(d) {
      return d.color = color(d.name.replace(/ .*/, ""));
    })
    .style("stroke", function(d) {
      return d3.rgb(d.color).darker(2);
    })
    .append("title")
    .text(function(d) {
      return d.name + "\n" + format(d.value);
    });

  node.append("text")
    .attr("x", -6)
    .attr("y", function(d) {
      return d.dy / 2;
    })
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .attr("transform", null)
    .text(function(d) {
      return d.name;
    })
    .filter(function(d) {
      return d.x < width / 2;
    })
    .attr("x", 6 + sankey.nodeWidth())
    .attr("text-anchor", "start");

  function dragmove(d) {
    d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
    sankey.relayout();
    link.attr("d", path);
  };
});
