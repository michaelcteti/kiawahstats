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

  if (byCourse == false && includePar == true && includeDrives == true && includeGreens == true) {
    nodes = [
      { "name": "Par 3" }, // 0
      { "name": "Par 4" }, // 1
      { "name": "Par 5" }, // 2

      { "name": "In-Play Drive" }, // 3
      { "name": "Out-of-Play Drive" }, // 4

      { "name": "GIR" }, // 5
      { "name": "No GIR" }, // 6

      { "name": "Birdies" }, // 7
      { "name": "Pars" }, // 8
      { "name": "Bogeys" }, // 9
      { "name": "Doubles" } // 10
    ];

    // Need a line that goes through each of 4 layers....for each of 48 options
    // Somehow the lines need to be linked....probably means building out more graph info
    // Rollups as well that go from any node back and forwards to each layer

    TIGBir = 0;
    TIGPar = 0;
    TIGBog = 0;
    TIGDob = 0;
    TINBir = 0;
    TINPar = 0;
    TINBog = 0;
    TINDob = 0;
    TOGBir = 0;
    TOGPar = 0;
    TOGBog = 0;
    TOGDob = 0;
    TONBir = 0;
    TONPar = 0;
    TONBog = 0;
    TONDob = 0;
    FIGBir = 0;
    FIGPar = 0;
    FIGBog = 0;
    FIGDob = 0;
    FINBir = 0;
    FINPar = 0;
    FINBog = 0;
    FINDob = 0;
    FOGBir = 0;
    FOGPar = 0;
    FOGBog = 0;
    FOGDob = 0;
    FONBir = 0;
    FONPar = 0;
    FONBog = 0;
    FONDob = 0;
    SIGBir = 0;
    SIGPar = 0;
    SIGBog = 0;
    SIGDob = 0;
    SINBir = 0;
    SINPar = 0;
    SINBog = 0;
    SINDob = 0;
    SOGBir = 0;
    SOGPar = 0;
    SOGBog = 0;
    SOGDob = 0;
    SONBir = 0;
    SONPar = 0;
    SONBog = 0;
    SONDob = 0;

    rawData.map(function(datum) {
      if (datum.P == 3) {
        if (datum.IPD == 1) {
          if (datum.GIR == 1) {
            if (datum.BIR == 1 ) {
              TIGBir += 1;
            } else if (datum.PAR == 1) {
              TIGPar += 1;
            } else if (datum.BOG == 1) {
              TIGBog += 1;
            } else if (datum.DB == 1) {
              TIGDob += 1;
            };
          } else {
            if (datum.BIR == 1 ) {
              TINBir += 1;
            } else if (datum.PAR == 1) {
              TINPar += 1;
            } else if (datum.BOG == 1) {
              TINBog += 1;
            } else if (datum.DB == 1) {
              TINDob += 1;
            };
          };
        } else {
          if (datum.GIR == 1) {
            if (datum.BIR == 1 ) {
              TOGBir += 1;
            } else if (datum.PAR == 1) {
              TOGPar += 1;
            } else if (datum.BOG == 1) {
              TOGBog += 1;
            } else if (datum.DB == 1) {
              TOGDob += 1;
            };
          } else {
            if (datum.BIR == 1 ) {
              TONBir += 1;
            } else if (datum.PAR == 1) {
              TONPar += 1;
            } else if (datum.BOG == 1) {
              TONBog += 1;
            } else if (datum.DB == 1) {
              TONDob += 1;
            };
          };
        };
      } else if (datum.P == 4) {
        if (datum.IPD == 1) {
          if (datum.GIR == 1) {
            if (datum.BIR == 1 ) {
              FIGBir += 1;
            } else if (datum.PAR == 1) {
              FIGPar += 1;
            } else if (datum.BOG == 1) {
              FIGBog += 1;
            } else if (datum.DB == 1) {
              FIGDob += 1;
            };
          } else {
            if (datum.BIR == 1 ) {
              FINBir += 1;
            } else if (datum.PAR == 1) {
              FINPar += 1;
            } else if (datum.BOG == 1) {
              FINBog += 1;
            } else if (datum.DB == 1) {
              FINDob += 1;
            };
          };
        } else {
          if (datum.GIR == 1) {
            if (datum.BIR == 1 ) {
              FOGBir += 1;
            } else if (datum.PAR == 1) {
              FOGPar += 1;
            } else if (datum.BOG == 1) {
              FOGBog += 1;
            } else if (datum.DB == 1) {
              FOGDob += 1;
            };
          } else {
            if (datum.BIR == 1 ) {
              FONBir += 1;
            } else if (datum.PAR == 1) {
              FONPar += 1;
            } else if (datum.BOG == 1) {
              FONBog += 1;
            } else if (datum.DB == 1) {
              FONDob += 1;
            };
          };
        };
      } else if (datum.P == 5) {
        if (datum.IPD == 1) {
          if (datum.GIR == 1) {
            if (datum.BIR == 1 ) {
              SIGBir += 1;
            } else if (datum.PAR == 1) {
              SIGPar += 1;
            } else if (datum.BOG == 1) {
              SIGBog += 1;
            } else if (datum.DB == 1) {
              SIGDob += 1;
            };
          } else {
            if (datum.BIR == 1 ) {
              SINBir += 1;
            } else if (datum.PAR == 1) {
              SINPar += 1;
            } else if (datum.BOG == 1) {
              SINBog += 1;
            } else if (datum.DB == 1) {
              SINDob += 1;
            };
          };
        } else {
          if (datum.GIR == 1) {
            if (datum.BIR == 1 ) {
              SOGBir += 1;
            } else if (datum.PAR == 1) {
              SOGPar += 1;
            } else if (datum.BOG == 1) {
              SOGBog += 1;
            } else if (datum.DB == 1) {
              SOGDob += 1;
            };
          } else {
            if (datum.BIR == 1 ) {
              SONBir += 1;
            } else if (datum.PAR == 1) {
              SONPar += 1;
            } else if (datum.BOG == 1) {
              SONBog += 1;
            } else if (datum.DB == 1) {
              SONDob += 1;
            };
          };
        };
      };
    });

    linksWithZero = [
      { "source": 0, "target": 3, "value": TIGBir },
      { "source": 3, "target": 5, "value": TIGBir },
      { "source": 5, "target": 7, "value": TIGBir },
      { "source": 0, "target": 3, "value": TIGPar },
      { "source": 3, "target": 5, "value": TIGPar },
      { "source": 5, "target": 8, "value": TIGPar },
      { "source": 0, "target": 3, "value": TIGBog },
      { "source": 3, "target": 5, "value": TIGBog },
      { "source": 5, "target": 9, "value": TIGBog },
      { "source": 0, "target": 3, "value": TIGDob },
      { "source": 3, "target": 5, "value": TIGDob },
      { "source": 5, "target": 10, "value": TIGDob },

      { "source": 0, "target": 3, "value": TINBir },
      { "source": 3, "target": 6, "value": TINBir },
      { "source": 6, "target": 7, "value": TINBir },
      { "source": 0, "target": 3, "value": TINPar },
      { "source": 3, "target": 6, "value": TINPar },
      { "source": 6, "target": 8, "value": TINPar },
      { "source": 0, "target": 3, "value": TINBog },
      { "source": 3, "target": 6, "value": TINBog },
      { "source": 6, "target": 9, "value": TINBog },
      { "source": 0, "target": 3, "value": TINDob },
      { "source": 3, "target": 6, "value": TINDob },
      { "source": 6, "target": 10, "value": TINDob },

      { "source": 0, "target": 4, "value": TOGBir },
      { "source": 4, "target": 5, "value": TOGBir },
      { "source": 5, "target": 7, "value": TOGBir },
      { "source": 0, "target": 4, "value": TOGPar },
      { "source": 4, "target": 5, "value": TOGPar },
      { "source": 5, "target": 8, "value": TOGPar },
      { "source": 0, "target": 4, "value": TOGBog },
      { "source": 4, "target": 5, "value": TOGBog },
      { "source": 5, "target": 9, "value": TOGBog },
      { "source": 0, "target": 4, "value": TOGDob },
      { "source": 4, "target": 5, "value": TOGDob },
      { "source": 5, "target": 10, "value": TOGDob },

      { "source": 0, "target": 4, "value": TONBir },
      { "source": 4, "target": 6, "value": TONBir },
      { "source": 6, "target": 7, "value": TONBir },
      { "source": 0, "target": 4, "value": TONPar },
      { "source": 4, "target": 6, "value": TONPar },
      { "source": 6, "target": 8, "value": TONPar },
      { "source": 0, "target": 4, "value": TONBog },
      { "source": 4, "target": 6, "value": TONBog },
      { "source": 6, "target": 9, "value": TONBog },
      { "source": 0, "target": 4, "value": TONDob },
      { "source": 4, "target": 6, "value": TONDob },
      { "source": 6, "target": 10, "value": TONDob },

      { "source": 1, "target": 3, "value": FIGBir },
      { "source": 3, "target": 5, "value": FIGBir },
      { "source": 5, "target": 7, "value": FIGBir },
      { "source": 1, "target": 3, "value": FIGPar },
      { "source": 3, "target": 5, "value": FIGPar },
      { "source": 5, "target": 8, "value": FIGPar },
      { "source": 1, "target": 3, "value": FIGBog },
      { "source": 3, "target": 5, "value": FIGBog },
      { "source": 5, "target": 9, "value": FIGBog },
      { "source": 1, "target": 3, "value": FIGDob },
      { "source": 3, "target": 5, "value": FIGDob },
      { "source": 5, "target": 10, "value": FIGDob },

      { "source": 1, "target": 3, "value": FINBir },
      { "source": 3, "target": 6, "value": FINBir },
      { "source": 6, "target": 7, "value": FINBir },
      { "source": 1, "target": 3, "value": FINPar },
      { "source": 3, "target": 6, "value": FINPar },
      { "source": 6, "target": 8, "value": FINPar },
      { "source": 1, "target": 3, "value": FINBog },
      { "source": 3, "target": 6, "value": FINBog },
      { "source": 6, "target": 9, "value": FINBog },
      { "source": 1, "target": 3, "value": FINDob },
      { "source": 3, "target": 6, "value": FINDob },
      { "source": 6, "target": 10, "value": FINDob },

      { "source": 1, "target": 4, "value": FOGBir },
      { "source": 4, "target": 5, "value": FOGBir },
      { "source": 5, "target": 7, "value": FOGBir },
      { "source": 1, "target": 4, "value": FOGPar },
      { "source": 4, "target": 5, "value": FOGPar },
      { "source": 5, "target": 8, "value": FOGPar },
      { "source": 1, "target": 4, "value": FOGBog },
      { "source": 4, "target": 5, "value": FOGBog },
      { "source": 5, "target": 9, "value": FOGBog },
      { "source": 1, "target": 4, "value": FOGDob },
      { "source": 4, "target": 5, "value": FOGDob },
      { "source": 5, "target": 10, "value": FOGDob },

      { "source": 1, "target": 4, "value": FONBir },
      { "source": 4, "target": 6, "value": FONBir },
      { "source": 6, "target": 7, "value": FONBir },
      { "source": 1, "target": 4, "value": FONPar },
      { "source": 4, "target": 6, "value": FONPar },
      { "source": 6, "target": 8, "value": FONPar },
      { "source": 1, "target": 4, "value": FONBog },
      { "source": 4, "target": 6, "value": FONBog },
      { "source": 6, "target": 9, "value": FONBog },
      { "source": 1, "target": 4, "value": FONDob },
      { "source": 4, "target": 6, "value": FONDob },
      { "source": 6, "target": 10, "value": FONDob },

      { "source": 2, "target": 3, "value": SIGBir },
      { "source": 3, "target": 5, "value": SIGBir },
      { "source": 5, "target": 7, "value": SIGBir },
      { "source": 2, "target": 3, "value": SIGPar },
      { "source": 3, "target": 5, "value": SIGPar },
      { "source": 5, "target": 8, "value": SIGPar },
      { "source": 2, "target": 3, "value": SIGBog },
      { "source": 3, "target": 5, "value": SIGBog },
      { "source": 5, "target": 9, "value": SIGBog },
      { "source": 2, "target": 3, "value": SIGDob },
      { "source": 3, "target": 5, "value": SIGDob },
      { "source": 5, "target": 10, "value": SIGDob },

      { "source": 2, "target": 3, "value": SINBir },
      { "source": 3, "target": 6, "value": SINBir },
      { "source": 6, "target": 7, "value": SINBir },
      { "source": 2, "target": 3, "value": SINPar },
      { "source": 3, "target": 6, "value": SINPar },
      { "source": 6, "target": 8, "value": SINPar },
      { "source": 2, "target": 3, "value": SINBog },
      { "source": 3, "target": 6, "value": SINBog },
      { "source": 6, "target": 9, "value": SINBog },
      { "source": 2, "target": 3, "value": SINDob },
      { "source": 3, "target": 6, "value": SINDob },
      { "source": 6, "target": 10, "value": SINDob },

      { "source": 2, "target": 4, "value": SOGBir },
      { "source": 4, "target": 5, "value": SOGBir },
      { "source": 5, "target": 7, "value": SOGBir },
      { "source": 2, "target": 4, "value": SOGPar },
      { "source": 4, "target": 5, "value": SOGPar },
      { "source": 5, "target": 8, "value": SOGPar },
      { "source": 2, "target": 4, "value": SOGBog },
      { "source": 4, "target": 5, "value": SOGBog },
      { "source": 5, "target": 9, "value": SOGBog },
      { "source": 2, "target": 4, "value": SOGDob },
      { "source": 4, "target": 5, "value": SOGDob },
      { "source": 5, "target": 10, "value": SOGDob },

      { "source": 2, "target": 4, "value": SONBir },
      { "source": 4, "target": 6, "value": SONBir },
      { "source": 6, "target": 7, "value": SONBir },
      { "source": 2, "target": 4, "value": SONPar },
      { "source": 4, "target": 6, "value": SONPar },
      { "source": 6, "target": 8, "value": SONPar },
      { "source": 2, "target": 4, "value": SONBog },
      { "source": 4, "target": 6, "value": SONBog },
      { "source": 6, "target": 9, "value": SONBog },
      { "source": 2, "target": 4, "value": SONDob },
      { "source": 4, "target": 6, "value": SONDob },
      { "source": 6, "target": 10, "value": SONDob }
    ];

    links = [];
    linksWithZero.map(function(link) {
      if (link.value > 0) {
        links.push(link)
      };
    })
  };

  console.log(links.length / 3)
  console.log(linksWithZero.length / 3)

  convertedStats = {
    nodes: nodes,
    links: links
  };

  return convertedStats;
};

d3.json("rawstats.json", function(error, json) {
  if (error) return console.warn(error);

  // convertStats(json, course, par, drive, green)
  // stats = convertStats(json, false, false, false, false) // All to Score
  // stats = convertStats(json, true, false, false, false) // Course to Score
  // stats = convertStats(json, false, true, false, false) // All to Par to Score
  // stats = convertStats(json, true, true, true, true) // Course to Par to Drive to Green to Score
  stats = convertStats(json, false, true, true, true) // Par to Drive to Green to Score - NEW

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
