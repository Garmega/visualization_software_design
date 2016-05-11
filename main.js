$(document).ready(function() {
    main();
});

function main() {
    var heatmap = Heatmap();
    heatmap.setIdentifier('#chart1')
        .setFileName('data.tsv')
        .setYLabels(["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"])
        .setXLabels(["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"])
        .setDimensions(450, 1200)
        .build();

    var heatmap2 = Heatmap();
    heatmap2.setIdentifier('#chart2')
        .setFileName('data3.tsv')
        .setYLabels(["Mo", "Tu", "We", "Th", "Fr"])
        .setXLabels(["7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p"])
        .setMargins(100, 100, 100, 100)
        .setDimensions(350, 600)
        .setDefaultcolor("#CCCCCC")
        .setColors(["#C1102B", "#C5BFBC", "#CAF1E7", "#5CC9CB", "#2E707B"])
        .build();
}
