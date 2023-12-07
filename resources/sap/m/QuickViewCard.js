/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./QuickViewBase","./NavContainer","./Page","./ScrollContainer","./QuickViewCardRenderer"],function(e,t,i,a,n,o){"use strict";var r=t.extend("sap.m.QuickViewCard",{metadata:{library:"sap.m",properties:{showVerticalScrollBar:{type:"boolean",group:"Behavior",defaultValue:true}},designtime:"sap/m/designtime/QuickViewCard.designtime"},renderer:o});r.prototype.init=function(){var e={pages:[new a],navigate:this._navigate.bind(this),afterNavigate:this._afterNavigate.bind(this)};this._oNavContainerDelegate={onAfterRendering:function(){if(!this.getShowVerticalScrollBar()){this.addStyleClass("sapMQuickViewCardNoScroll")}else{this.removeStyleClass("sapMQuickViewCardNoScroll")}this._oNavContainer.removeEventDelegate(this._oNavContainerDelegate)}.bind(this)};this._oNavContainer=new i(e)};r.prototype.onBeforeRendering=function(){this._oNavContainer.addEventDelegate(this._oNavContainerDelegate,this);this._initPages()};r.prototype.onAfterRendering=function(){this._setLinkWidth()};r.prototype.exit=function(){if(this._oNavContainer){this._oNavContainer.destroy()}};r.prototype.onkeydown=function(e){this._processKeyboard(e)};r.prototype._createPage=function(e){var t=e._createPageContent();e._mPageContent=null;var i=new n(this.getId()+"-"+e.getPageId(),{horizontal:false,vertical:false});if(t.header){i.addContent(t.header)}i.addContent(t.form);i.addStyleClass("sapMQuickViewPage");return i};r.prototype._setLinkWidth=function(){this.$().find(".sapMLnk").css("width","auto")};return r});
//# sourceMappingURL=QuickViewCard.js.map