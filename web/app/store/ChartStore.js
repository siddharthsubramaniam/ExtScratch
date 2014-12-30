Ext.define('Scratch.store.ChartStore', {
    extend: 'Ext.data.Store',
    model: 'Scratch.model.ChartModel',
    pageSize:2,
    proxy: {
        type: 'memory'
    }
});