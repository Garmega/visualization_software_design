window.Heatmap = (function() {

    var h = function() {
        var heatmap = {};

        /*
        user defined data
        */
        heatmap.xDataLabels = [];
        heatmap.yDataLabels = [];
        heatmap.colors = [];

        /*
        User defined dimensions
        */
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
            var canvasSvg = d3.selectAll('#container')
                .append('svg')
                .attr('height', this.canvasHeight)
                .attr('width', this.canvasWidth);

            //Creates chart and moves it accordingly
            var chartG = canvasSvg.append('g')
                .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
                // .attr('height', this.chartHeight)
                // .attr('width', this.chartWidth);

            return this;
        }

        heatmap.setIdentifier = function(identifier) {
            this.chartIdentifier = identifier;

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
