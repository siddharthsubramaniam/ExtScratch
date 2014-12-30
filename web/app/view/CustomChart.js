Ext.define('Scratch.view.CustomChart', {
    extend : 'Ext.chart.Chart',
    alias : 'widget.customChart',
    shadow : false,
    store : Ext.create('Scratch.store.ChartStore'),
    minWidth:500,
    minHeight: 500,
    axes : [{
        type : 'Numeric',
        position : 'bottom',
        fields : ['count'],
        label : {
            renderer : Ext.util.Format.numberRenderer('0,0')
        },
        // title: 'Number of Counts',
        grid : true,
        minimum : 0
    }, {
        type : 'Category',
        position : 'left',
        fields : ['key'],
        label : {
            renderer : function(value, label, storeItem, item, i, display, animate, index) {
                if(value != 'isMax')
                    return Ext.util.Format.number(value,'0,0')
            }
        },
        minimum : 0
    }],
    //series: [{xtype: 'scratchBarChart'}],

    series : [{
        type : 'bar',
        axis : 'bottom',
        highlight : false,
        tips : {
            trackMouse : true,
            width : 140,
            height : 28,
            renderer : function(storeItem, item) {
                this.setTitle(storeItem.get('key') + ': '
                    + storeItem.get('count') + ' views');
            }
        },
        xField : ['key'],
        yField : ['count'],
        renderer: function(sprite, record, attr, index, store) {
            if(!record.get('isMax'))
                return Ext.apply(attr, {
                    fill: '#a2d5ee'
                });
        }
    }],
    loadChart: function(records) {
        this.store.loadData(records);
    }
});