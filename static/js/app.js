function init() {
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
        
        d3.select("#sample-metadata").html("");
        //make the metadata thingy
        for(meta in currentMeta) {
            d3.select("#sample-metadata").append("ul").text(meta + ": " + currentMeta[meta]);
        }
        
        console.log(data);
        var topTen = currentId["sample_values"].slice(0,10);
        var topNames = currentId["otu_ids"].slice(0,10).values();
        var toppies = currentId["otu_ids"].slice(0,10);
        var arr = [];
        toppies.forEach( name => {
            arr.push(name);
        });
        console.log(arr);
        console.log(topNames);
        //I dont remember what the point of this graph is, but we at least have the data. 
        var trace1 = {
            x: topTen,
            y: topNames,
            type: "bar",
            orientation: "h"
        };

        var layout = {
            title: "",
            xaxis: {
                // title: "x axis"
            },
            yaxis: {
                // title: "Samples",
                tickmode: "array",
                tickvals: [0,1,2,3,4,5,6,7,8,9],
                ticktext: ["OTU " + arr[0],"OTU " + arr[1] , "OTU " + arr[2],"OTU " + arr[3], "OTU " + arr[4],"OTU " + arr[5], "OTU " + arr[6],"OTU " + arr[7], "OTU " + arr[8],"OTU " + arr[9]]
            }
        };

        var datums = [trace1];

        Plotly.newPlot("bar", datums, layout);

        var trace2 = {
            x:  currentId["otu_ids"],
            y: currentId["sample_values"],
            text: currentId["otu_labels"],
            mode: "markers",
            marker: {
                color: currentId["otu_ids"],
                size: currentId["sample_values"]
            }
        };

        var dataz = [trace2];

        var layout = {
            showlegend: false,
        };

        Plotly.newPlot('bubble', dataz, layout);
    });
}

init();

d3.selectAll("body").on("change", init);
