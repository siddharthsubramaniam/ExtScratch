Ext.define('Scratch.controller.Charts', {
    extend: 'Ext.app.Controller',
    views: [
        'Scratch.view.ChartPanel'
    ],
    init: function() {
        console.log('Initialized Users! This happens before the Application launch function is called');
    }
});