Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'Scratch',

    appFolder: 'app',
    controllers: ['Charts'],
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'chartPanel'
                }
            ]
        });
    }
});