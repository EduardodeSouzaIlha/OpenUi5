/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.ui.demokit.FileUploadIntrospector.
sap.ui.define(['jquery.sap.global', 'sap/ui/core/Control', './library'],
	function(jQuery, Control, library) {
	"use strict";


	
	/**
	 * Constructor for a new FileUploadIntrospector.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given 
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * Control that allows to monitor uploaded files in a demo scenario. This is not a general purpose monitor but only works with the demo fileupload service.
	 * @extends sap.ui.core.Control
	 * @version 1.32.5
	 *
	 * @constructor
	 * @public
	 * @name sap.ui.demokit.FileUploadIntrospector
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var FileUploadIntrospector = Control.extend("sap.ui.demokit.FileUploadIntrospector", /** @lends sap.ui.demokit.FileUploadIntrospector.prototype */ { metadata : {
	
		library : "sap.ui.demokit",
		properties : {
	
			/**
			 * The URL to check the upload content with....
			 */
			uploadUrl : {type : "string", group : "Misc", defaultValue : null},
	
			/**
			 * Interval in milliseconds after which the content is checked again. values lower or equal to 0 mean 'no automatic refresh'.
			 */
			autoRefreshInterval : {type : "string", group : "Misc", defaultValue : '0'},
	
			/**
			 * (CSS) Height of the control
			 */
			height : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
	
			/**
			 * Width of the file list
			 */
			width : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : null}
		}
	}});
	
	
	FileUploadIntrospector.prototype.init = function() {
		this._aFiles = [];
		this._iHash = 0;
	};
	
	FileUploadIntrospector.prototype.setAutoRefreshInterval = function(iInterval) {
		this.setProperty("autoRefreshInterval", iInterval);
		if ( this.oTimer ) {
			jQuery.sap.clearDelayedCall(this.oTimer);
			this.oTimer = undefined;
		}
		if ( iInterval > 0 ) {
			this.oTimer = jQuery.sap.delayedCall(iInterval, this, "_autoRefresh");
		}
	};
	
	/**
	 * Trigger an explicit refresh of the displayed information
	 *
	 * @public
	 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
	 */
	FileUploadIntrospector.prototype.refresh = function() {
		var that = this;
		jQuery.getJSON(this.getUploadUrl(), function(data) { that._receiveFileList(data); });
	};
	
	FileUploadIntrospector.prototype._autoRefresh = function() {
		if ( this.oTimer ) {
			jQuery.sap.clearDelayedCall(this.oTimer);
			this.oTimer = undefined;
		}
		this.refresh();
		// TODO reinitialize timer only after response has been received (requires separate receive methods)  
		var iInterval = this.getAutoRefreshInterval();
		if ( iInterval > 0 ) {
			this.oTimer = jQuery.sap.delayedCall(iInterval, this, "_autoRefresh");
		}
	};
	
	FileUploadIntrospector.prototype._receiveFileList = function(oResult) {
		if ( !this._aFiles || this._iHash !== oResult.hash ) {
			this._aFiles = oResult.files;
			this._iHash = oResult.hash;
			this.invalidate();
		}
	};

	return FileUploadIntrospector;

}, /* bExport= */ true);
