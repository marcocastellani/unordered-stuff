var layer = new OpenLayers.Layer.Vector("KML", {
    strategies: [
        new OpenLayers.Strategy.BBOX()
    //    , new OpenLayers.Strategy.Refresh({interval: 4000, force: true})
    ],
    protocol: new OpenLayers.Protocol.HTTP({
        url: "lines.kml?key=" + Math.random(),
        params: {
            format: "WFS",
            sort: "interestingness-desc",
            service: "WFS",
            request: "GetFeatures",
            srs: "EPSG:4326",
            maxfeatures: 10
        },
        format: new OpenLayers.Format.KML({
            extractStyles: true,
            extractAttributes: true,
            maxDepth: 2
        })
    })
})          ;

var map = new OpenLayers.Map({
    div: "map",
    layers: [
        new OpenLayers.Layer.WMS(
            "WMS", "http://vmap0.tiles.osgeo.org/wms/vmap0",
            {layers: "basic"}
        ),
        layer

    ],
    center: new OpenLayers.LonLat(-112.169, 36.099),
    zoom: 11
});
// Interaction; not needed for initial display.
selectControl = new OpenLayers.Control.SelectFeature(layer);
map.addControl(selectControl);
selectControl.activate();
layer.events.on({
    'featureselected': onFeatureSelect,
    'featureunselected': onFeatureUnselect
});

self.setInterval("rinf()",3000) ;
function rinf(){
   layer.refresh({force:true});
}
// Needed only for interaction, not for the display.
function onPopupClose(evt) {
    // 'this' is the popup.
    var feature = this.feature;
    if (feature.layer) { // The feature is not destroyed
        selectControl.unselect(feature);
    } else { // After "moveend" or "refresh" events on POIs layer all
        //     features have been destroyed by the Strategy.BBOX
        this.destroy();
    }
}
function onFeatureSelect(evt) {
    feature = evt.feature;
    popup = new OpenLayers.Popup.FramedCloud("featurePopup",
        feature.geometry.getBounds().getCenterLonLat(),
        new OpenLayers.Size(100,100),
        "<h2>"+feature.attributes.title + "</h2>" +
            feature.attributes.description,
        null, true, onPopupClose);
    feature.popup = popup;
    popup.feature = feature;
    map.addPopup(popup, true);
}
function onFeatureUnselect(evt) {
    feature = evt.feature;
    if (feature.popup) {
        popup.feature = null;
        map.removePopup(feature.popup);
        feature.popup.destroy();
        feature.popup = null;
    }
}