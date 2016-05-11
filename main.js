$(document).ready(function() {
    main();
});





function main() {
    var heatmap = Heatmap();

    heatmap.setIdentifier('container')
        .setMargins(50, 50, 50, 50)
        .setDimensions(500, 1200)
        .setDefaultcolor("#ffffff")
        .setColorScale(["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"])
        .build();

    console.log(heatmap);
}
