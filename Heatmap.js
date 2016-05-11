window.Heatmap = (function() {

    var h = function() {
        var heatmap = {};

        /*
        Defaults
        */
        heatmap.margin = {
            left: 50,
            bottom: 50,
            top: 50,
            right: 50
        };

        heatmap.defaultColor = "#ffffff";
        heatmap.colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"];

        /*
        User defined;
        */
        heatmap.canvasIdentifier;
        heatmap.fileName;
        heatmap.yDataLabels;
        heatmap.xDataLabels;
        heatmap.canvasHeight;
        heatmap.canvasWidth;

        /*
        Our internally calculated values.
        */
        heatmap.chartHeight;
        heatmap.chartWidth;
        heatmap.gridSize;

        /*
        Call only after satisfied with all other values.
        This will build the chart based on the set values and then show it on screen
        */
        heatmap.build = function() {
            this.finalCalculations();

            //Creates canvas and size accordingly
            console.log(heatmap.chartIdentifier);
            var canvasSvg = d3.selectAll(heatmap.chartIdentifier)
            //var canvasSvg = d3.selectAll('#container')
                .append('svg')
                .attr('height', heatmap.canvasHeight)
                .attr('width', heatmap.canvasWidth);

            //Creates chart and moves it accordingly
            var chartG = canvasSvg.append('g')
                .attr('transform', 'translate(' + heatmap.margin.left + ',' + heatmap.margin.top + ')')
                // .attr('height', this.chartHeight)
                // .attr('width', this.chartWidth);

            var dayLabels = canvasSvg.data(heatmap.yDataLabels)
                .enter().append("text")
                  .text(function (d) { return d; })
                  .attr("x", heatmap.margin.left)
                  .attr("y", function (d, i) { return (i * heatmap.gridSize) + heatmap.margin.top })
                  .style("text-anchor", "end")
                  .style("font-size", "9pt")
                  .style("font-family", "Consolas, courier")
                  .style("fill", "#aaa")
                  .attr("transform", "translate(-6," + heatmap.gridSize / 1.5 + ")")
                  .attr("class", "mono axis");

            var timeLabels = canvasSvg.data(heatmap.xDataLabels)
                .enter().append("text")
                  .text(function(d) { return d; })
                  .attr("x", function(d, i) { return (i * heatmap.gridSize) + heatmap.margin.left; })
                  .attr("y", heatmap.margin.top)
                  .style("text-anchor", "middle")
                  .style("font-size", "9pt")
                  .style("font-family", "Consolas, courier")
                  .style("fill", "#aaa")
                  .attr("transform", "translate(" + heatmap.gridSize / 2 + ", -6)")
                  .attr("class", "mono axis");

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
                    .style("stroke", "#E6E6E6")
                    .style("stroke-width", "2px");

                rects.transition().duration(1000)
                    .delay(function(d) { return d.day * 100 } )
                    .style("fill", function(d) { return colorScale(d.value); });

            })

            return this;
        }

        /*
        Private method that is internally called after the user has
        set all the parameters they need.
        */
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

        /*
        REQUIRED
        Sets the y labels at the top of the chart
        @params: An array of strings to label with
        */
        heatmap.setYLabels = function(yLabels) {
            this.yDataLabels = yLabels;
            return this;
        }

        /*
        REQUIRED
        Sets the x labels at the top of the chart
        @params: An array of strings to label with
        */
        heatmap.setXLabels = function(xLabels) {
            this.xDataLabels = xLabels;
            return this;
        }

        /*
        REQUIRED
        Sets the name of the file to grab data from
        @params: A string that matches the file name
        */
        heatmap.setFileName = function(fileName) {
            this.fileName = fileName;
            return this;
        }

        /*
        REQUIRED
        Sets the identifier of the element to which to draw the chart in
        @params: A string selector corresponding to the element wanted
        */
        heatmap.setIdentifier = function(identifier) {
            this.chartIdentifier = identifier;
            return this;
        }
        /*
        REQUIRED
        Sets the dimensions for the whole size of the canvas
        @params: Two integers to dictate height and width of the chart
        */
        heatmap.setDimensions = function(height, width) {
            this.canvasWidth = width;
            this.canvasHeight = height;

            return this;
        }

        /*
        Sets the defaultcolor of the cells before filled in
        Only really shows before data is loaded
        @params: A string hex value to set the color to
        */
        heatmap.setDefaultcolor = function(defaultColor) {
            this.defaultColor = defaultColor;
            return this;
        }

        /*
        Sets the color scale for the cells to be filled in with
        NOTE: This also determines how many quantiles to cut the data values into
        @params: An array of string hex values to set the scale to
        */
        heatmap.setColors = function(colors) {
            this.colors = colors;
            return this;
        }

        /*
        Sets the margins for the chart
        @params: 4 integers for the left, bottom, top and right margin values
        */
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

        return heatmap;
    };

    return h;
})();
