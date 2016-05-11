$(document).ready(function() {
    main();
});





function main() {
    var heatmap = Heatmap();

    heatmap.setIdentifier('container')
        .setMargins(50, 50, 50, 50)
        .setDimensions(500, 1200)
        .setDefaultcolor("#ffffff")
        .setColors(["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"])
        .build();

    var heatmap2 = Heatmap();
    heatmap.setIdentifier('container2')
        .setMargins(100, 100, 100, 100)
        .setDimensions(250, 600)
        .setDefaultcolor("#CCCCCC")
        .setColors(["#C1102B", "#C5BFBC", "#CAF1E7", "#5CC9CB", "#2E707B"])
        .build();

    console.log(heatmap);
}
