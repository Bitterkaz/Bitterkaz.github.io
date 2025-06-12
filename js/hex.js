


async function load() {
var data = Promise.all([d3.csv('js/data.csv')]).then(async function (data) {
  data_new = data[0]
    launch(data_new);})
  }
load();


class Locutor_TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="temp_text">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

let scramble_timeout;

function text_macro(texts, id, freq, index) {
        var html = "";
    
          d3.select("#text_stuff").append("span").attr("id", id).html(html);
      

        const phrases = texts;

        window.clearTimeout(scramble_timeout);
        const el = document.getElementById(id);
        const fx = new Locutor_TextScramble(el);


        if (freq == "once") {
          let counter = 0;
          var next = () => {
            fx.setText(phrases[counter]).then(() => {
              var scramble_timeout = setTimeout("", 3000);
            });
             counter = (counter + 1) % phrases.length;
          };

          next();
        } else {
          let counter = 0;
          var next = () => {
            fx.setText(phrases[counter]).then(() => {
              var scramble_timeout = setTimeout(next, 1000);
            });
            counter = (counter + 1) % phrases.length;
          };

          next();
        }
      }

text_macro(["Design.", "AI.", "Machine Learning." ,"Prototype.","Front End.", "Data Science.", "Cats."], 1)

async function launch(data) {


data.forEach(function(d, i) {
  d.i = i % 30;
  d.j = i / 30 | 0;
});

// Math.seedrandom(+d3.timeHour(new Date));
 // Compress the y-coordinates to create perspective
// console.log(d3.shuffle(data))
// data = data.filter(function(d) { return !(typeof d.text === "string" && d.text.trim() !== ""); })
// data = data.sort((a, b) => (b.important === "TRUE") - (a.important === "TRUE"));
// console.log(data);
// data= data.filter(function(d) {return d.important === "TRUE";})
let falseData = data.filter(d => d.important !== "TRUE");
falseData = d3.shuffle(falseData);

let trueData = data.filter(d => d.important === "TRUE");
trueData = d3.shuffle(trueData);
// Inject trueData into the middle of falseData
let mid = Math.floor(falseData.length / 2);
data = [
  ...falseData.slice(0, mid),
  ...trueData,
  ...falseData.slice(mid)
];

// data = d3.shuffle(data);
// console.log(data);

var height = 900,
    imageWidth = 130,
    imageHeight = 130,
    radius = 45,
    depth = 2;

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
  // console.log("Number of drawn centers:", centers.length);
  desiredFocus = [innerWidth / 2, height / 2];
  moved();
  // Calculate the center of the grid
const gridCenter = [deepWidth / 2, deepHeight / 2];

const maxDist = Math.max(
    ...centers.map(c => Math.hypot(c[0] - gridCenter[0], c[1] - gridCenter[1]))
  );

// Sort centers by distance to the center
centers.sort((a, b) => {
  const da = Math.hypot(a[0] - gridCenter[0], a[1] - gridCenter[1]);
  const db = Math.hypot(b[0] - gridCenter[0], b[1] - gridCenter[1]);
  return da - db;
});

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

  const allData = [...trueData, ...falseData];

// Assign data to centers
centers.forEach((center, i) => {
  if (i < allData.length) {
    center.example = allData[i];
    context.save();
    context.translate(Math.round(center[0]), Math.round(center[1]));
    drawImage(center.example);
    const dist = Math.hypot(center[0] - gridCenter[0], center[1] - gridCenter[1]);
    center.opacity = 0.2 + 0.8 * (1 - dist / maxDist);
    context.restore();
    
  }
});
  

  mesh.attr("d", hex.mesh);

  anchor = anchor.data(centers, function(d) { return d.i + "," + d.j; });
  console.log(centers.filter(function(d) { return d.i + "," + d.j; }));
  anchor.exit().remove();

  var anchorEnter = anchor.enter().append("a")
      // .attr("xlink:title", function(d) { return d.example.title; });

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
      .attr("stroke", "magenta")
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
      .attr("transform", function(d) { return "translate(" + d + ")"; })
      //  .style("opacity", function(d) { return d.opacity; });
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
  .attr("placeholder", "Search by year, technology, language, etc.")
  .style("position", "fixed")
  .style("top", "150px")
  .style("left", "50%")
  .style("transform", "translateX(-50%)")
  .style("width", "300px")
  .style("padding", "8px 12px")
  .style("z-index", "1000")
  .style("border", "1px solid magenta")
  .style("border-radius", "4px")
  .style("color", "magenta")
  .style("caret-color", "magenta");

// Set placeholder text color to magenta using CSS
d3.select("head").append("style").html(`
  input::placeholder {
    color: magenta !important;
    opacity: 1;
  }
`);

// Add an event listener for the search bar
searchBar.on("input", function() {
  var query = this.value.toLowerCase();

  anchor.style("opacity", function(d) {
    return d.example.text.toLowerCase().includes(query) ? 1 : 0.2;
  });

  anchor.selectAll("path, image").style("pointer-events", function(d) {
    return d.example.text.toLowerCase().includes(query) ? "auto" : "none";
  });

});

anchor.on("click", function(event, d) {
  // Create or select the tab element
  let tab = d3.select("body").select(".image-tab");
  if (tab.empty()) {
    tab = d3.select("body").append("div")
      .attr("class", "image-tab")
      .style("position", "fixed")
      .style("top", "50")
      .style("right", "-100%")
      .style("width", "300px")
      .style("max-height", "100%")
      .style("background", "rgba(255,255,255,0.6)")
      .style("box-shadow", "-2px 0 5px rgba(255, 0, 251, 0.3)")
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
  // Make the text editable
//   let editableText = tab.append("textarea")
//     .text(d.example.text)
//     .style("width", "100%")
//     .style("height", "100px")
//     .style("font-size", "16px")
//     .style("color", "#333")
//     .style("border", "1px solid #ccc")
//     .style("border-radius", "4px")
//     .style("padding", "10px")
//     .style("resize", "none");
//   let importantCheck = tab.append("div")
//     .style("margin-top", "10px")
//     .style("display", "flex")
//     .style("align-items", "center");

// importantCheck.append("input")
//     .attr("type", "checkbox")
//     .attr("id", "importantCheck")
//     .property("checked", d.example.important === "true")
//     .style("margin-right", "8px");

// importantCheck.append("label")
//     .attr("for", "importantCheck")
//     .text("Mark as Important")
//     .style("color", "#333")
//     .style("font-size", "14px");

//   // Add a save button
//   tab.append("button")
//     .text("Save")
//     .style("display", "block")
//     .style("margin-top", "10px")
//     .style("padding", "10px 20px")
//     .style("background", "#4CAF50")
//     .style("color", "white")
//     .style("border", "none")
//     .style("border-radius", "4px")
//     .style("cursor", "pointer")
//     .on("click", async function() {
//     // Save both the edited text and important status
//     d.example.text = editableText.property("value");
//     d.example.important = d3.select("#importantCheck").property("checked").toString();

//     try {
//         console.log('Saving:', { 
//             title: d.example.title, 
//             text: d.example.text,
//             important: d.example.important 
//         });
        
//         let response = await fetch('/api/save', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ 
//                 id: d.example.title, 
//                 text: d.example.text,
//                 important: d.example.important
//             })
//         });
        
//         const result = await response.json();
//         console.log('Server response:', result);
        
//         if (response.ok) {
//             // Update the hexagon border to reflect importance
//             d3.select(this.parentNode.parentNode)
//                 .select(".example-anchor-border")
//                 .attr("stroke", d.example.important === "true" ? "gold" : (d.example.text ? "purple" : "white"));
                
//             alert("Changes saved successfully!");
//         } else {
//             throw new Error('Failed to save');
//         }
//     } catch (error) {
//         console.error("Error saving changes:", error);
//         alert("An error occurred while saving.");
//     }
// });   // Add badges for genre and search

  if (d.example.text) {
      tab.append("span")
        .text(d.example.text)
        .style("display", "inline-block")
        .style("background", "white")
        .style("color", "black")
        .style("padding", "5px 10px")
        .style("margin-right", "5px")
        .style("border-radius", "4px")
        .style("font-size", "14px");
    }
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
     .attr("stroke", "magenta")
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