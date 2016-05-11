window.Heatmap = (function() {

    var h = function() {
        var heatmap = {};

        /*
        user defined data
        */
        heatmap.yDataLabels = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
        heatmap.xDataLabels = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];
        heatmap.colors;
        heatmap.defaultColor;

        /*
        User defined dimensions
        */
        heatmap.fileName;
        heatmap.canvasIdentifier;
        heatmap.margin;
        heatmap.canvasHeight;
        heatmap.canvasWidth;

        /*
        Our internally calculated values.
        */
        heatmap.chartHeight;
        heatmap.chartWidth;
        heatmap.gridSize;

        heatmap.build = function() {
            this.finalCalculations();

            //Creates canvas and size accordingly
            console.log(heatmap.chartIdentifier);
            // var canvasSvg = d3.selectAll(this.chartIdentifier)
            var canvasSvg = d3.selectAll('#container')
                .append('svg')
                .attr('height', heatmap.canvasHeight)
                .attr('width', heatmap.canvasWidth);

            //Creates chart and moves it accordingly
            var chartG = canvasSvg.append('g')
                .attr('transform', 'translate(' + heatmap.margin.left + ',' + heatmap.margin.top + ')')
                // .attr('height', this.chartHeight)
                // .attr('width', this.chartWidth);

            var dayLabels = canvasSvg.selectAll(".dayLabel")
                .data(heatmap.yDataLabels)
                .enter().append("text")
                  .text(function (d) { return d; })
                  .attr("x", heatmap.margin.left)
                  .attr("y", function (d, i) { return (i * heatmap.gridSize) + heatmap.margin.top })
                  .style("text-anchor", "end")
                  .attr("transform", "translate(-6," + heatmap.gridSize / 1.5 + ")")
                  .attr("class", "dayLabel mono axis");

            var timeLabels = canvasSvg.selectAll(".timeLabel")
                .data(heatmap.xDataLabels)
                .enter().append("text")
                  .text(function(d) { return d; })
                  .attr("x", function(d, i) { return (i * heatmap.gridSize) + heatmap.margin.left; })
                  .attr("y", heatmap.margin.top)
                  .style("text-anchor", "middle")
                  .attr("transform", "translate(" + heatmap.gridSize / 2 + ", -6)")
                  .attr("class", "timeLabel mono axis");


            d3.tsv(heatmap.fileName, function(error, data) {
                var colorScale = d3.scale.quantile()
                    .domain([0, heatmap.colors.length - 1, d3.max(data, function(d) {return +d.value;})])
                    .range(heatmap.colors);

                var rects = chartG.selectAll('.rect')
                    .data(data)

                rects.enter().append('rect')

                rects.attr('y', function(d) { return (d.day - 1) * heatmap.gridSize; })
                    .attr('x', function(d) { return (d.hour - 1) * heatmap.gridSize; })
                    .attr("rx", 4)
                    .attr("ry", 4)
                    .attr('height', heatmap.gridSize)
                    .attr('width', heatmap.gridSize)
                    .attr("class", "bordered")
                    .style("fill", heatmap.defaultColor);

                rects.transition().duration(1000)
                    .delay(function(d) { return d.day * 100 } )
                    .style("fill", function(d) { return colorScale(d.value); });

            })

            return this;
        }

        heatmap.setFileName = function(fileName) {
            this.fileName = fileName;
            return this;
        }

        heatmap.setIdentifier = function(identifier) {
            this.chartIdentifier = identifier;
            return this;
        }

        heatmap.setDefaultcolor = function(defaultColor) {
            this.defaultColor = defaultColor;
            return this;
        }

        heatmap.setColors = function(colors) {
            this.colors = colors;
            return this;
        }

        //Sets the margins for the chart
        heatmap.setMargins = function(left, bottom, top, right) {
            this.margin = {
                left: left,
                bottom: bottom,
                top: top,
                right: right
            }

            return this;
        }

        //Sets the dimensions for the whole size of the canvas
        heatmap.setDimensions = function(height, width) {
            this.canvasWidth = width;
            this.canvasHeight = height;

            return this;
        }

        //Private method that is internally called after the user has
        //set all the parameters they need.
        heatmap.finalCalculations = function() {
            //Chart size is dependant on canvas size and margins set.
            this.chartHeight = this.canvasHeight - this.margin.bottom - this.margin.top;
            this.chartWidth = this.canvasWidth - this.margin.left - this.margin.right;

            //Dependant on the length of xaxislabels and the width of the chart.
            //Determines how wide/tall each grid block would be.
            //calculated using the width of the chart
            this.gridSize = Math.floor(this.chartWidth / this.xDataLabels.length);

            return this;
        }

        return heatmap;
    };

    return h;
})();
