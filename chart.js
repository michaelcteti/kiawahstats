var margin = {
    top: 1,
    right: 1,
    bottom: 6,
    left: 1
  },
  width = 960 - margin.left - margin.right,
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
  .nodeWidth(15)
  .nodePadding(10)
  .size([width, height]);

var path = sankey.link();
var stats;

function convertStats(rawData, byCourse, includePar, includeDrives, includeGreens) {
  if (byCourse == null && includePar == null && includeDrives == null && includeGreens == null) {
    nodes = [
      { "name": "All Holes" },
      { "name": "Birdies" },
      { "name": "Pars" },
      { "name": "Bogeys" },
      { "name": "Doubles" }
    ];

    allHolesToBirdies = 0;
    allHolesToPars = 0;
    allHolesToBogeys = 0;
    allHolesToDoubles = 0;

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

    newLinks = [
      { "source": 0, "target": 1, "value": allHolesToBirdies },
      { "source": 0, "target": 2, "value": allHolesToPars },
      { "source": 0, "target": 3, "value": allHolesToBogeys },
      { "source": 0, "target": 4, "value": allHolesToDoubles }
    ]
  }

  convertedStats = {
    nodes: nodes,
    links: newLinks
  }

  return convertedStats;
};

d3.json("rawstats.json", function(error, json) {
  if (error) return console.warn(error);

  stats = convertStats(json)

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
