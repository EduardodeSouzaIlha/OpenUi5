/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define('sap/ui/test/TestUtils',['jquery.sap.global','sap/ui/core/Core'],function(q){"use strict";function d(a,e,P){var A=QUnit.objectType(a),E=QUnit.objectType(e),n;if(A!==E){throw new Error(P+": actual type "+A+" does not match expected type "+E);}if(A==="array"){if(a.length<e.length){throw new Error(P+": array length: "+a.length+" < "+e.length);}}if(A==="array"||A==="object"){for(n in e){d(a[n],e[n],P==="/"?P+n:P+"/"+n);}}else if(a!==e){throw new Error(P+": actual value "+a+" does not match expected value "+e);}}function p(a,e,m,E){try{d(a,e,"/");QUnit.push(E,a,e,m);}catch(b){QUnit.push(!E,a,e,(m||"")+" failed because of "+b.message);}}return{deepContains:function(a,e,m){p(a,e,m,true);},notDeepContains:function(a,e,m){p(a,e,m,false);},withNormalizedMessages:function(c){sinon.test(function(){var C=sap.ui.getCore(),g=C.getLibraryResourceBundle;this.stub(C,"getLibraryResourceBundle").returns({getText:function(k,a){var r=k,t=g.call(C).getText(k),i;for(i=0;i<10;i+=1){if(t.indexOf("{"+i+"}")>=0){r+=" "+(i>=a.length?"{"+i+"}":a[i]);}}return r;}});c.apply(this);}).apply({});}};},true);