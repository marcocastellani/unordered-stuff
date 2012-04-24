// In vt.js (which means this code defines
// the "vt" module):

define(["dojo/on", "dojo/dom", "dojo/dom-construct", "dojo/query", "dojo/_base/Deferred", "dojo/store/JsonRest", "dojo/store/Memory", "dojo/store/Cache", "dojo/store/Observable", "dojo/domReady!"], function(on, dom, domConstruct, query, Deferred, JsonRest, Memory, Cache, Observable) {

	return {
		
		init : function() {
		 	this.masterStore = new JsonRest({
				//target : "http://109.73.90.14/CSC/VehicleTracking/JSON_VT.ashx?Cod_veicolo=1234",
				target : "js/aep/data.js",
				idProperty : "Ordine",

			 
				// a client side impl of the query we send to the server, just allows everything (unfiltered) here
				"some-query" : function() {
					return true;
				},
				put : function(object, options) {
					// override this because there's no backend to handle it
					return object;
				}
			});
			this.masterStore = Observable(this.masterStore);
		},
		vai : function(cycle) {
			this.masterStore.query().then(function(punti) {
				punti.forEach(cycle);
			});
		}/*,
		queryS : function() {
			this.masterStore
				.query()
				.forEach(function(punto) {
					alert(punto.Ordine);
				});
				}
	*/}
});
