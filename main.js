$(document).ready(function() {
    main();
});





function main() {
    var heatmap = Heatmap();

    heatmap.setIdentifier('container')
        .setMargins(50, 50, 50, 50)
        .setDimensions(500, 1200)
        .build();

    console.log(heatmap);
}
