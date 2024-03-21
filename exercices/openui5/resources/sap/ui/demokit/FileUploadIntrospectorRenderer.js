/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var F=function(){};F.render=function(r,c){var a=r;function f(d){var D=new Date(d),m=(D.getMonth()+1)<10?"0"+(D.getMonth()+1):""+(D.getMonth()+1),y=D.getFullYear()<10?"0"+D.getFullYear():""+D.getFullYear(),s=D.getDate()<10?"0"+D.getDate():""+D.getDate(),h=D.getHours()<10?"0"+D.getHours():""+D.getHours(),M=D.getMinutes()<10?"0"+D.getMinutes():""+D.getMinutes(),S=D.getSeconds()<10?"0"+D.getSeconds():""+D.getSeconds();return y+"-"+m+"-"+s+" "+h+":"+M+":"+S;}a.write("<div");a.writeControlData(c);a.write(" class='sapUiDkitFileList'");if(c.getWidth()){a.addStyle("width",c.getWidth());}a.writeStyles();a.write(">");var b=c._aFiles||[];a.write("<div");if(c.getHeight()){a.addStyle("height",c.getHeight());a.addStyle("overflow-y","auto");}a.writeStyles();a.write(">");a.write("<table border='0'>");a.write("<tr class='sapUiDkitFileItem'>");a.write("<th>Filename</th>");a.write("<th>Date</th>");a.write("<th>Size</th>");a.write("</tr>");for(var i=0;i<b.length;i++){a.write("<tr class='sapUiDkitFileItem'>");a.write("<td style='padding:1px 3px;'><span style='white-space:nowrap'>"+b[i].name+"</span></td>");a.write("<td style='border-left:1px solid #ccc;padding:1px 3px;width:12ex'><span style='white-space:nowrap'>"+f(b[i].time)+"</span></td>");a.write("<td style='border-left:1px solid #ccc;padding:1px 3px;width:8ex;text-align:right'><span style='white-space:nowrap'>"+b[i].size+"</span></td>");a.write("</tr>");}a.write("</table>");a.write("</div>");a.write("<div class='sapUiDkitBottomLine'>");a.write("Last Refresh: "+(f(new Date().getTime())));a.write("</div>");a.write("</div>");};return F;},true);
