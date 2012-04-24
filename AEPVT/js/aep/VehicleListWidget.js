/**
 * Created by JetBrains WebStorm.
 * User: filippo
 * Date: 20/03/12
 * Time: 21.44
 * To change this template use File | Settings | File Templates.
 */
// custom.AuthorWidget
define([ "dojo/on","dijit/form/ToggleButton", "dojo/_base/declare","dijit/_WidgetBase", "dijit/_TemplatedMixin","dojo/text!./VehicleListWidget/templates/VehicleListWidget.html", "dojo/dom-style", "dojo/_base/fx", "dojo/_base/lang"],
    function(on,ToggleButton,declare, WidgetBase, TemplatedMixin, template, domStyle, baseFx, lang){
        return declare([WidgetBase, TemplatedMixin], {
            // Some default values for our author
            // These typically map to whatever you're handing into the constructor
            Cod_Lineavar: "",
            // Using require.toUrl, we can get a path to our AuthorWidget's space
            // and we want to have a default avatar, just in case
            //avatar: require.toUrl("custom/VehicleListWidget/images/defaultAvatar.png"),
            Cod_Veicolo: "",

            // Our template - important!
            templateString: template,

            // A class to be applied to the root node in our template
            baseClass: "VehicleListWidget",

            // A reference to our background animation
            mouseAnim: null,

            // Colors for our background animation
            baseBackgroundColor: "#fff",
            mouseBackgroundColor: "#def",
            isPinned:false,

            postCreate: function(){
                // Get a DOM node reference for the root of our widget
                var domNode = this.domNode;

                // Run any parent postCreate processes - can be done at any point
                this.inherited(arguments);

           var toggleButton = new ToggleButton({
                    iconClass: "dijitCheckBoxIcon",
                    label: "Pin",
                    checked: this.isPinned
                }, "toggle"+this.Cod_Veicolo).placeAt(this.counter,"first");
                       toggleButton.startup();

                on(toggleButton, "click", lang.hitch(this,function(e) {
                    this.isPinned = toggleButton.checked;
                }));

                // Set our DOM node's background color to white -
                // smoothes out the mouseenter/leave event animations
                domStyle.set(domNode, "backgroundColor", this.baseBackgroundColor);
                // Set up our mouseenter/leave events - using dijit/_WidgetBase's connect
                // means that our callback will execute with `this` set to our widget
                on(domNode, "mouseenter", lang.hitch(this,function(e) {
                    this._changeBackground(this.mouseBackgroundColor);
                }));
                on(domNode, "mouseleave", lang.hitch(this,function(e) {
                    this._changeBackground(this.baseBackgroundColor);
                }));
            },
            _changeBackground: function(toCol) {
                // If we have an animation, stop it
                if (this.mouseAnim) { this.mouseAnim.stop(); }

                // Set up the new animation
                this.mouseAnim = baseFx.animateProperty({
                    node: this.domNode,
                    properties: {
                        backgroundColor: toCol
                    },
                    onEnd: lang.hitch(this, function() {
                        // Clean up our mouseAnim property
                        this.mouseAnim = null;
                    })
                }).play();
            }
        });
    }); // and that's it!