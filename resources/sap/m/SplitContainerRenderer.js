/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/Device"],function(e,t){"use strict";var a=e.SplitAppMode;var r={apiVersion:2};r.render=function(e,r){var i=r.getMode(),s=r.getTooltip_AsString();e.openStart("div",r).class("sapMSplitContainer");if(this.renderAttributes){this.renderAttributes(e,r)}if(!t.system.phone){if(t.orientation.portrait){e.class("sapMSplitContainerPortrait")}switch(i){case a.ShowHideMode:e.class("sapMSplitContainerShowHide");break;case a.StretchCompressMode:e.class("sapMSplitContainerStretchCompress");break;case a.PopoverMode:e.class("sapMSplitContainerPopover");break;case a.HideMode:e.class("sapMSplitContainerHideMode");break;default:break}}if(s){e.attr("title",s)}e.openEnd();if(this.renderBeforeContent){this.renderBeforeContent(e,r)}this.renderMasterAndDetail(e,r,i);e.close("div")};r.renderMasterAndDetail=function(e,r,i){if(t.system.phone){r._oMasterNav.addStyleClass("sapMSplitContainerMobile");e.renderControl(r._oMasterNav);return}r._bMasterisOpen=false;if(t.orientation.landscape&&i!==a.HideMode||t.orientation.portrait&&i===a.StretchCompress){r._oMasterNav.addStyleClass("sapMSplitContainerMasterVisible").removeStyleClass("sapMSplitContainerMasterHidden").removeStyleClass("sapMSplitContainerNoTransition");r._bMasterisOpen=true}else{r._oMasterNav.addStyleClass("sapMSplitContainerMasterHidden").addStyleClass("sapMSplitContainerNoTransition").removeStyleClass("sapMSplitContainerMasterVisible")}if(i===a.PopoverMode&&t.orientation.portrait){r._oDetailNav.addStyleClass("sapMSplitContainerDetail");e.renderControl(r._oDetailNav);if(r._oPopOver.getContent().length===0){r._oPopOver.addAggregation("content",r._oMasterNav,true)}}else{r._oMasterNav.addStyleClass("sapMSplitContainerMaster");e.renderControl(r._oMasterNav);r._oDetailNav.addStyleClass("sapMSplitContainerDetail");e.renderControl(r._oDetailNav)}};return r},true);
//# sourceMappingURL=SplitContainerRenderer.js.map