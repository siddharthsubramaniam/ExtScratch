Ext.define('Scratch.view.chart.ScratchBarChart', {
    extend: 'Ext.chart.series.Series',
    alias: 'widget.scratchBarChart',
    type : 'bar',
    axis : 'bottom',
    highlight : false,
    xField : ['key'],
    yField : ['count'],
    initComponent: function() {
        alert('jackass');
    }
})