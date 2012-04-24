/**
 * Created by JetBrains WebStorm.
 * User: filippo
 * Date: 20/03/12
 * Time: 21.44
 * To change this template use File | Settings | File Templates.
 */
// custom.TopSearchWidget
define([ "dojo/on","dijit/form/ToggleButton", "dojo/_base/declare","dijit/_WidgetBase", "dijit/_TemplatedMixin","dojo/text!./TopSearchWidget/templates/TopSearchWidget.html", "dojo/dom-style", "dojo/_base/fx", "dojo/_base/lang"],
    function(on,ToggleButton,declare, WidgetBase, TemplatedMixin, template, domStyle, baseFx, lang){
        return declare([WidgetBase, TemplatedMixin], {
            // Our template - important!
            templateString: template,

            // A class to be applied to the root node in our template
            baseClass: "TopSearchWidget",

            postCreate: function(){
                // Get a DOM node reference for the root of our widget
                var domNode = this.domNode;

                // Run any parent postCreate processes - can be done at any point
                this.inherited(arguments);


            },


            search_dest:function(){},
            search_tvm:function(){},
            search_pos:function(){},
            search_v:function(){alert(this.textVSearch);},

            show_V:function(){},
            show_tvm:function(){
                domStyle.set(this.nodeTVM,"visibility", "visible");

                },
            show_pos:function(){
                domStyle.set(this.nodeTVM,"visibility", "hidden");
            },
            show_dest:function(){}   ,

            textVSearch:"",
            textTVMSearch:"",
            textPOSSearch:"",
            textDestSearch:""

        });
    }); // and that's it!