/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.require("jquery.sap.storage");sap.ui.controller("sap.ui.demokit.explored.view.master",{_bIsViewUpdatedAtLeastOnce:false,_oVSDialog:null,_oViewSettings:null,_oStorage:jQuery.sap.storage(jQuery.sap.storage.Type.local),_sStorageKey:"UI5_EXPLORED_VIEW_SETTINGS",_oDefaultSettings:{filter:{},groupProperty:"category",groupDescending:false,compactOn:false,themeActive:"sap_bluecrystal",rtl:false},_mGroupFunctions:{"name":function(c){var k=c.getProperty("name").charAt(0);return{key:k,text:k};},"namespace":true,"category":true,"since":true,"formFactors":true},onInit:function(){this.router=sap.ui.core.UIComponent.getRouterFor(this);this.router.attachRoutePatternMatched(this.onRouteMatched,this);this._component=sap.ui.core.Component.getOwnerComponentFor(this.getView());this._component.getEventBus().subscribe("app","selectEntity",this.onSelectEntity,this);this._sCurrentGroup=this._oDefaultSettings.groupProperty;this.getView().addEventDelegate({onBeforeFirstShow:jQuery.proxy(this.onBeforeFirstShow,this)});},onBeforeFirstShow:function(){if(!this._bIsViewUpdatedAtLeastOnce){this._updateView();}},onRouteMatched:function(e){var r=e.getParameter("name");if(r!=="home"&&r!="notFound"){var v=e.getParameter('view');if(v){var t=v.byId("toggleFullScreenBtn");if(t){sap.ui.demokit.explored.util.ToggleFullScreenHandler.updateControl(t,v);}}return;}this._updateView();},onOpenAppSettings:function(e){if(!this._oSettingsDialog){this._oSettingsDialog=new sap.ui.xmlfragment("sap.ui.demokit.explored.view.appSettingsDialog",this);this.getView().addDependent(this._oSettingsDialog);}jQuery.sap.delayedCall(0,this,function(){var a=sap.ui.getCore().getConfiguration();var c=this._oViewSettings.compactOn;var r=this._oViewSettings.rtl;var u=jQuery.sap.getUriParameters().get("sap-theme");var U=jQuery.sap.getUriParameters().get("sap-ui-rtl");if(u){sap.ui.getCore().byId("ThemeButtons").setSelectedKey(u);}else{sap.ui.getCore().byId("ThemeButtons").setSelectedKey(a.getTheme());}sap.ui.getCore().byId("CompactModeButtons").setState(c);if(U){sap.ui.getCore().byId("RTLButtons").setState(U==="true"?true:false);}else{sap.ui.getCore().byId("RTLButtons").setState(r);}this._oSettingsDialog.open();});},onSaveAppSettings:function(e){this._oSettingsDialog.close();if(!this._oBusyDialog){jQuery.sap.require("sap.m.BusyDialog");this._oBusyDialog=new sap.m.BusyDialog();this.getView().addDependent(this._oBusyDialog);}var c=sap.ui.getCore().byId('CompactModeButtons').getState();var t=sap.ui.getCore().byId('ThemeButtons').getSelectedKey();var r=sap.ui.getCore().byId('RTLButtons').getState();var R=(r!==this._oViewSettings.rtl);this._oBusyDialog.open();jQuery.sap.delayedCall(1000,this,function(){this._oBusyDialog.close();});this._oViewSettings.compactOn=c;this._oViewSettings.themeActive=t;this._oViewSettings.rtl=r;var s=JSON.stringify(this._oViewSettings);this._oStorage.put(this._sStorageKey,s);this._component.getEventBus().publish("app","applyAppConfiguration",{themeActive:t,compactOn:c});if(R){this._handleRTL(r);}},onDialogCloseButton:function(){this._oSettingsDialog.close();},onSelectEntity:function(c,e,d){var v=this.getView(),l=v.byId("list"),m=v.getModel("entity");var s=null;var I=l.getItems();jQuery.each(I,function(i,o){var C=o.getBindingContext("entity");if(C){var p=C.getPath();var E=m.getProperty(p);if(E.id===d.id){s=o;return false;}}});if(s){l.setSelectedItem(s);}else{l.removeSelections();}},onOpenViewSettings:function(){if(!this._oVSDialog){this._oVSDialog=sap.ui.xmlfragment(this.getView().getId(),"sap.ui.demokit.explored.view.viewSettingsDialog",this);this.getView().addDependent(this._oVSDialog);}jQuery.sap.delayedCall(0,this,function(){var f={};jQuery.each(this._oViewSettings.filter,function(p,v){jQuery.each(v,function(i,V){f[V]=true;});});this._oVSDialog.setSelectedFilterKeys(f);this._oVSDialog.setSelectedGroupItem(this._oViewSettings.groupProperty);this._oVSDialog.setGroupDescending(this._oViewSettings.groupDescending);jQuery('body').toggleClass("sapUiSizeCompact",this._oViewSettings.compactOn).toggleClass("sapUiSizeCozy",!this._oViewSettings.compactOn);this._oVSDialog.open();});},onConfirmViewSettings:function(e){var t=this;this._oViewSettings.filter={};var f=e.getParameter("filterItems");jQuery.each(f,function(i,I){var k=I.getKey();var p=I.getParent().getKey();if(!t._oViewSettings.filter.hasOwnProperty(p)){t._oViewSettings.filter[p]=[];}t._oViewSettings.filter[p].push(k);});var g=e.getParameter("groupItem");var n=(g)?g.getKey():null;this._oViewSettings.groupProperty=n;this._oViewSettings.groupDescending=e.getParameter("groupDescending");var s=JSON.stringify(this._oViewSettings);this._oStorage.put(this._sStorageKey,s);this._updateView();},onSearch:function(){this._updateView();},onNavToEntity:function(e){var i=e.getParameter("listItem");var I=(i)?i:e.getSource();var p=I.getBindingContext("entity").getPath();var E=this.getView().getModel("entity").getProperty(p);var r=!sap.ui.Device.system.phone;this.router.navTo("entity",{id:E.id,part:"samples"},r);},_updateView:function(){if(!this._oViewSettings){this._initViewSettings();this._component.getEventBus().publish("app","applyAppConfiguration",{themeActive:this._oViewSettings.themeActive,compactOn:this._oViewSettings.compactOn});}this._updateFilterBarDisplay();this._updateListBinding();},_updateFilterBarDisplay:function(){var f="";jQuery.each(this._oViewSettings.filter,function(p,V){jQuery.each(V,function(i,a){f+=a+", ";});});if(f.length>0){var I=f.lastIndexOf(", ");f=f.substring(0,I);}var v=this.getView();v.byId("vsFilterBar").setVisible(f.length>0);v.byId("vsFilterLabel").setText(f);},_updateListBinding:function(){var f=[],s=[],F=false,g=false,S=this.getView().byId("searchField"),l=this.getView().byId("list"),b=l.getBinding("items");var q=S.getValue().trim();F=true;f.push(new sap.ui.model.Filter("searchTags","Contains",q));jQuery.each(this._oViewSettings.filter,function(p,v){var P=[];jQuery.each(v,function(i,V){var O=(p==="formFactors")?"Contains":"EQ";P.push(new sap.ui.model.Filter(p,O,V));});var o=new sap.ui.model.Filter(P,false);F=true;f.push(o);});if(F&&f.length===0){b.filter(f,"Application");}else if(F&&f.length>0){var o=new sap.ui.model.Filter(f,true);b.filter(o,"Application");}if(this._oViewSettings.groupProperty&&this._oViewSettings.groupProperty!==this._sCurrentGroup){g=true;}else if(this._oViewSettings.groupProperty&&this._oViewSettings.groupDescending!==this._bCurrentlyGroupedDescending){g=true;}if(g){var a=new sap.ui.model.Sorter(this._oViewSettings.groupProperty,this._oViewSettings.groupDescending,this._mGroupFunctions[this._oViewSettings.groupProperty]);s.push(a);s.push(new sap.ui.model.Sorter("name",false));b.sort(s);}this._sCurrentGroup=this._oViewSettings.groupProperty;this._bCurrentlyGroupedDescending=this._oViewSettings.groupDescending;this._bIsViewUpdatedAtLeastOnce=true;},_initViewSettings:function(){var j=this._oStorage.get(this._sStorageKey);if(!j){this._oViewSettings=this._oDefaultSettings;}else{this._oViewSettings=JSON.parse(j);var f=this.getView().getModel("filter").getData();var c={};jQuery.each(this._oViewSettings.filter,function(p,v){var n=[];jQuery.each(v,function(i,V){var b=false;jQuery.each(f[p],function(i,o){if(o.id===V){b=true;return false;}});if(b){n.push(V);}});if(n.length>0){c[p]=n;}});this._oViewSettings.filter=c;if(!this._oViewSettings.hasOwnProperty("compactOn")){this._oViewSettings.compactOn=false;}if(!this._oViewSettings.hasOwnProperty("themeActive")){this._oViewSettings.themeActive="sap_bluecrystal";}if(!this._oViewSettings.hasOwnProperty("rtl")){this._oViewSettings.rtl=false;}if(this._oViewSettings.rtl&&!jQuery.sap.getUriParameters().get('sap-ui-rtl')){this._handleRTL(true);}}},_handleRTL:function(s){jQuery.sap.require("sap.ui.core.routing.HashChanger");var h=new sap.ui.core.routing.HashChanger();var H=h.getHash();var u=window.location;if(!window.location.origin){window.location.origin=window.location.protocol+"//"+window.location.hostname+(window.location.port?':'+window.location.port:'');}if(s){window.location=u.origin+u.pathname+"?sap-ui-rtl=true#"+H;}else{window.location=u.origin+u.pathname+"#/"+H;}},getGroupHeader:function(g){return new sap.m.GroupHeaderListItem({title:g.key,upperCase:false});}});
