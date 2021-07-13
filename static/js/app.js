//TODO make sure theres an onchange funtion for the ID no dropdown. 

const url = "data/samples.json";

const dataPromise = d3.json(url);

d3.json(url).then(data => {
    var dropdown = d3.select("#selDataset");
    var sampleNames = data["names"];

    sampleNames.forEach(sample => {
        dropdown.append("option").text(sample).property("value", sample);
    });

    var options = dropdown.property("value");

    var samples = data["samples"];
    var metas = data["metadata"]
    
    //have to filter for the top ten used OTU numbers then make bar graph of those. use sort and slice for this
    var currentId;
    var currentMeta;
    var currentNames;
    samples.forEach( sample => {
        if(sample["id"] === options){
            currentId = sample;
        }
    });
    metas.forEach( meta => {
        if (+currentId["id"] === +meta["id"]){
            currentMeta = meta;
        }
    });
    

    //make the metadata thingy
    for(meta in currentMeta) {
        d3.select("#sample-metadata").append("ul").text(meta + ": " + currentMeta[meta]);
    }
    
    console.log(data);
    var topTen = currentId["sample_values"].slice(0,10);
    var topNames = currentId["otu_ids"].slice(0,10).values();
    // var arr = [];
    // topNames.forEach( name => {
    //     arr.push(name);
    // });
    // console.log(arr);
    console.log(topNames);
    //I dont remember what the point of this graph is, but we at least have the data. 
    var trace1 = {
        x: topTen,
        y: topNames,
        type: "bar",
        orientation: "h"
    };

    var layout = {
        title: "Some title",
        xaxis: {
            title: "x axis"
        },
        yaxis: {
            title: "y axis",
            tickmode: "array",
            tickvals: [0,1,2,3,4,5,6,7,8,9],
            ticktext: ["poop", "poop", "poop","poop", "poop","poop", "poop","poop", "poop","poop"]
        }
    };

    var datums = [trace1];

    Plotly.newPlot("bar", datums, layout);
});

