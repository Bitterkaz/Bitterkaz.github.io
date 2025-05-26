


async function load() {
var data = Promise.all([d3.csv('js/data.csv')]).then(async function (data) {
  data_new = data[0]
    launch(data_new);})
  }
load();

async function launch(data) {


data.forEach(function(d, i) {
  d.i = i % 30;
  d.j = i / 30 | 0;
});

// Math.seedrandom(+d3.timeHour(new Date));
 // Compress the y-coordinates to create perspective
// console.log(d3.shuffle(data))

data = d3.shuffle(data);

var height = 1000,
    imageWidth = 170,
    imageHeight = 170,
    radius = 45,
    depth = 4;

var currentFocus = [innerWidth / 2, height / 2],
    desiredFocus,
    idle = true;

var style = document.body.style,
    transform = ("webkitTransform" in style ? "-webkit-"
        : "MozTransform" in style ? "-moz-"
        : "msTransform" in style ? "-ms-"
        : "OTransform" in style ? "-o-"
        : "") + "transform";

var hex = d3.hexbin()
  .radius(radius)
 



if (!("ontouchstart" in document)) d3.select("#examples")
    .on("mousemove", (event) => {
    mousemoved(event)})

var deep = d3.select("#examples-deep");

var canvas = deep.append("canvas")
    .attr("height", height);

var context = canvas.node().getContext("2d");

var svg = deep.append("svg")
    .attr("height", height);

var mesh = svg.append("path")
    .attr("class", "example-mesh");

var anchor = svg.append("g")
    .attr("class", "example-anchor")
  .selectAll("a");

var graphic = deep.selectAll("svg,canvas");

var image = new Image;
image.src = "https://d3js.org/ex.jpg?3f2d00ffdba6ced9c50f02ed42f12f6156368bd2";
image.onload = resized;

d3.select(window)
    .on("resize", resized)
    .each(resized);

function drawImage(d) {
  context.save();
  context.beginPath();
  context.moveTo(0, -radius);

  for (var i = 1; i < 6; ++i) {
    var angle = i * Math.PI / 3,
        x = Math.sin(angle) * radius,
        y = -Math.cos(angle) * radius;
    context.lineTo(x, y);
  }


  context.clip();
  context.drawImage(image,
      imageWidth * d.i, imageHeight * d.j,
      imageWidth, imageHeight,
      -imageWidth / 2, -imageHeight / 2,
      imageWidth, imageHeight);
  context.restore();
}

function resized() {
  var deepWidth = innerWidth * (depth + 1) / depth,
      deepHeight = height * (depth + 1) / depth,
      centers = hex.size([deepWidth, deepHeight]).centers();

  desiredFocus = [innerWidth / 2, height / 2];
  moved();

  graphic
      .style("left", Math.round((innerWidth - deepWidth) / 2) + "px")
      .style("top", Math.round((height - deepHeight) / 2) + "px")
      .attr("width", deepWidth)
      .attr("height", deepHeight);

  centers.forEach(function(center, i) {
    center.j = Math.round(center[1] / (radius * 1.5));
    center.i = Math.round((center[0] - (center.j & 1) * radius * Math.sin(Math.PI / 3)) / (radius * 2 * Math.sin(Math.PI / 3)));
    context.save();
    context.translate(Math.round(center[0]), Math.round(center[1]));
    // Replace the fixed modulo calculation with one based on data length
    let dataIndex = (center.i + center.j * Math.floor(Math.sqrt(data.length))) % data.length;
    drawImage(center.example = data[dataIndex]);
    context.restore();
  });

  mesh.attr("d", hex.mesh);

  anchor = anchor.data(centers, function(d) { return d.i + "," + d.j; });
  console.log(centers.filter(function(d) { return d.i + "," + d.j; }));
  anchor.exit().remove();

  var anchorEnter = anchor.enter().append("a")
      .attr("xlink:title", function(d) { return d.example.title; });

  // Define hexagonal clip path once
  if (svg.select("clipPath#hex-clip").empty()) {
    svg.append("clipPath")
      .attr("id", "hex-clip")
      .append("path")
      .attr("d", hex.hexagon());
  }

  anchorEnter
    .append("path") // White border hexagon
      .attr("d", hex.hexagon())
      .attr("class", "example-anchor-border")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 4);

  anchorEnter
    .append("image")
      .attr("xlink:href", function(d) {
        return (d.example.url.replace('memories/', 'memories/resized/')); })
      .attr("x", -imageWidth / 2)
      .attr("y", -imageHeight / 2)
      .attr("width", imageWidth)
      .attr("height", imageHeight)
      .attr("clip-path", "url(#hex-clip)");

  anchor = anchorEnter.merge(anchor)
      .attr("transform", function(d) { return "translate(" + d + ")"; });
}

function mousemoved(event) {
  var m = d3.pointer(event);

  desiredFocus = [
    Math.round((m[0] - innerWidth / 2) / depth) * depth + innerWidth / 2,
    Math.round((m[1] - height / 2) / depth) * depth + height / 2
  ];

  moved();
}
// Create a search bar at the top right of the page
var searchBar = d3.select("body").append("input")
  .attr("type", "text")
  .attr("placeholder", "Search...")
  .style("position", "fixed")
  .style("top", "10px")
  .style("right", "10px")
  .style("padding", "5px")
  .style("z-index", "1000")
  .style("border", "1px solid #ccc")
  .style("border-radius", "4px");

// Add an event listener for the search bar
searchBar.on("input", function() {
  var query = this.value.toLowerCase();

  anchor.style("opacity", function(d) {
    return d.example.search.toLowerCase().includes(query) ? 1 : 0.2;
  });

  anchor.selectAll("path, image").style("pointer-events", function(d) {
    return d.example.search.toLowerCase().includes(query) ? "auto" : "none";
  });

});

anchor.on("click", function(event, d) {
  // Create or select the tab element
  let tab = d3.select("body").select(".image-tab");
  if (tab.empty()) {
    tab = d3.select("body").append("div")
      .attr("class", "image-tab")
      .style("position", "fixed")
      .style("top", "0")
      .style("right", "-100%")
      .style("width", "300px")
      .style("height", "100%")
      .style("background", "white")
      .style("box-shadow", "-2px 0 5px rgba(0,0,0,0.3)")
      .style("overflow", "auto")
      .style("z-index", "1000")
      .style("padding", "20px")
      .style("transition", "right 0.3s ease");
  }

  // Populate the tab with the image and text
  tab.html(""); // Clear previous content
  tab.append("button")
    .text("x")
    .style("position", "absolute")
    .style("top", "10px")
    .style("right", "10px")
    .style("padding", "5px 10px")
    .style("background", "#f44336")
    .style("color", "white")
    .style("border", "none")
    .style("cursor", "pointer")
    .on("click", function() {
      tab.style("right", "-100%");
    });

  tab.append("img")
    .attr("src", d.example.url)
    .style("width", "100%")
    .style("margin-bottom", "10px");
  tab.append("p")
    .text(d.example.text)
    .style("font-size", "16px")
    .style("color", "#333");
    // Add badges for genre and search
    if (d.example.genre) {
      tab.append("span")
        .text(d.example.genre)
        .style("display", "inline-block")
        .style("background", "purple")
        .style("color", "white")
        .style("padding", "5px 10px")
        .style("margin-right", "5px")
        .style("border-radius", "4px")
        .style("font-size", "12px");
    }

    if (d.example.search) {
      tab.append("span")
        .text(d.example.search)
        .style("display", "inline-block")
        .style("background", "blue")
        .style("color", "white")
        .style("padding", "5px 10px")
        .style("margin-right", "5px")
        .style("border-radius", "4px")
        .style("font-size", "12px");
    }
  // Animate the tab into view
  tab.style("right", "0");

  // Close the tab when clicking outside
  d3.select("body").on("click", function(event) {
    if (!tab.node().contains(event.target)) {
      tab.style("right", "-100%");
    }
  });

  // Prevent click event from propagating to the body
  event.stopPropagation();
});

anchor.on("mouseover", function() {
  d3.select(this).select(".example-anchor-border")
    .attr("stroke", "black");
  // Scale up the anchor group
  d3.select(this)
    .transition()
    .duration(150)
    .attr("transform", function(d) {
      return "translate(" + d + ") scale(1.2)";
    });
  // Bring this anchor to front
  this.parentNode.appendChild(this);
}).on("mouseout", function() {
  d3.select(this).select(".example-anchor-border")
    .attr("stroke", "white");
  // Scale back to normal
  d3.select(this)
    .transition()
    .duration(150)
    .attr("transform", function(d) {
      return "translate(" + d + ") scale(1)";
    });
});


function moved() {
 
  if (idle) d3.timer(function() {

    if (idle = Math.abs(desiredFocus[0] - currentFocus[0]) < .5 && Math.abs(desiredFocus[1] - currentFocus[1]) < .5) currentFocus = desiredFocus;
    else currentFocus[0] += (desiredFocus[0] - currentFocus[0]) * .14, currentFocus[1] += (desiredFocus[1] - currentFocus[1]) * .14;
    deep.style(transform, "translate(" + (innerWidth / 2 - currentFocus[0]) / depth + "px," + (height / 2 - currentFocus[1]) / depth + "px)");
    return idle;
  });
} 
}