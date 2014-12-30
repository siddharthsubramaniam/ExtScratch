Ext.define('Scratch.view.ChartPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Chart Panel',
    alias: 'widget.chartPanel',
    requires: ['Ext.Array','Ext.JSON','Scratch.view.CustomChart'],
    histogram: null,
    start:0,
    end:25,
    processData: function(data) {
        var histogram = {
            records: [],
            maxRecord: null
        };
        Ext.Array.forEach(Object.getOwnPropertyNames(data.facets), function(property,index,array) {
            if(property === 'camis_histogram') {
                if(data.facets[property]._type === 'histogram') {
                    var maxCount = 0;
                    var maxKey = undefined
                    Ext.Array.forEach(data.facets[property].entries, function( element,index,array) {
                        if(element.count > maxCount) {
                            maxCount = element.count;
                            maxKey = element.key;
                        }
                        histogram.records.push(Ext.create('Scratch.model.ChartModel',{
                            count: element.count,
                            key: element.key
                        }));
                    });
                    histogram.maxRecord = Ext.create('Scratch.model.ChartModel', {
                        count: maxCount,
                        key: 'maxKey',
                        isMax: true
                    })
                }
            }

        });
        return histogram;
    },
    loadChartData: function() {
        var me = this;
        Ext.Ajax.request({
            url: 'data/res.json',
            success: function(response, opts) {
                resultObject = Ext.JSON.decode(response.responseText);
                var histogram = me.processData(resultObject);
                alert(histogram.records.length);
                me.histogram = histogram;

                var chart = me.down('chart');
                var records = histogram.records.slice(chart.start,chart.end);
                records.push(histogram.maxRecord);
                chart.loadChart(records);
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            },
            method:'GET'
        });
    },
    items: [{
        xtype: 'customChart',
        start: 0,
        end: 25,
        pageSize: 25
    }],
    buttons: [{
        text: 'Previous',
        handler: function() {
            var chart = this.up('panel').down('chart');


            chart.end = chart.end-(chart.pageSize+1);
            chart.start = chart.start-(chart.pageSize+1);
            var histogram = this.up('panel').histogram;
            var records = histogram.records.slice(chart.start,chart.end);
            records.push(histogram.maxRecord);
            chart.loadChart(records);
        }

    }, {
        text: 'Next',
        handler: function() {
            var chart = this.up('panel').down('chart');

            chart.end = chart.end+(chart.pageSize+1);
            chart.start = chart.start+(chart.pageSize+1);


            var histogram = this.up('panel').histogram;
            var records = histogram.records.slice(chart.start,chart.end);
            records.push(histogram.maxRecord);
            chart.loadChart(records);

        }
    }],
    listeners: {
        afterrender: function() {
            this.loadChartData();

            var url = new String('?app=jackass');

            var lastIndexOf = url.lastIndexOf('app=');

            console.log(url.substring(lastIndexOf+4));




        }

    }
})