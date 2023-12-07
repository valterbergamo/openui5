/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../base/DataType","../base/Object","../base/ManagedObject","../base/ManagedObjectRegistry","./ElementMetadata","../Device","sap/ui/performance/trace/Interaction","sap/base/Log","sap/base/assert","sap/ui/thirdparty/jquery","sap/ui/events/F6Navigation","./RenderManager","./Configuration","./EnabledPropagator","./Theming","sap/ui/core/util/_LocalizationHelper"],function(e,t,r,i,n,o,a,s,u,jQuery,l,p,d,g,f,c){"use strict";var h=r.extend("sap.ui.core.Element",{metadata:{stereotype:"element",abstract:true,publicMethods:["getId","getMetadata","getTooltip_AsString","getTooltip_Text","getModel","setModel","hasModel","bindElement","unbindElement","getElementBinding","prop","getLayoutData","setLayoutData"],library:"sap.ui.core",aggregations:{tooltip:{type:"sap.ui.core.TooltipBase",altTypes:["string"],multiple:false},customData:{type:"sap.ui.core.CustomData",multiple:true,singularName:"customData"},layoutData:{type:"sap.ui.core.LayoutData",multiple:false,singularName:"layoutData"},dependents:{type:"sap.ui.core.Element",multiple:true},dragDropConfig:{type:"sap.ui.core.dnd.DragDropBase",multiple:true,singularName:"dragDropConfig"}}},constructor:function(e,t){r.apply(this,arguments);this._iRenderingDelegateCount=0},renderer:null},n);i.apply(h,{onDuplicate:function(e,t,r){if(t._sapui_candidateForDestroy){s.debug("destroying dangling template "+t+" when creating new object with same ID");t.destroy()}else{var i="adding element with duplicate id '"+e+"'";if(!d.getNoDuplicateIds()){s.warning(i);return}s.error(i);throw new Error("Error: "+i)}}});h.defineClass=function(e,r,i){return t.defineClass(e,r,i||n)};h.prototype.getInterface=function(){return this};h.prototype._handleEvent=function(e){var t=this,r="on"+e.type;function i(i){var n,o,a;if(i&&(o=i.length)>0){i=o===1?i:i.slice();for(n=0;n<o;n++){if(e.isImmediateHandlerPropagationStopped()){return}a=i[n].oDelegate;if(a[r]){a[r].call(i[n].vThis===true?t:i[n].vThis||a,e)}}}}i(this.aBeforeDelegates);if(e.isImmediateHandlerPropagationStopped()){return}if(this[r]){this[r](e)}i(this.aDelegates)};h.prototype.init=function(){};h.prototype.exit=function(){};h.create=r.create;h.prototype.toString=function(){return"Element "+this.getMetadata().getName()+"#"+this.sId};h.prototype.getDomRef=function(e){return document.getElementById(e?this.getId()+"-"+e:this.getId())};h.prototype.$=function(e){return jQuery(this.getDomRef(e))};h.prototype.isActive=function(){return this.oParent&&this.oParent.isActive()};h.prototype.prop=function(e,t){var r=this.getMetadata().getAllSettings()[e];if(r){if(arguments.length==1){return this[r._sGetter]()}else{this[r._sMutator](t);return this}}};h.prototype.setProperty=function(e,t,i){if(e!="enabled"||i){return r.prototype.setProperty.apply(this,arguments)}var n=this.mProperties.enabled;r.prototype.setProperty.apply(this,arguments);if(n!=this.mProperties.enabled){g.updateDescendants(this)}return this};h.prototype.insertDependent=function(e,t){this.insertAggregation("dependents",e,t,true);return this};h.prototype.addDependent=function(e){this.addAggregation("dependents",e,true);return this};h.prototype.removeDependent=function(e){return this.removeAggregation("dependents",e,true)};h.prototype.removeAllDependents=function(){return this.removeAllAggregation("dependents",true)};h.prototype.destroyDependents=function(){this.destroyAggregation("dependents",true);return this};h.prototype.rerender=function(){if(this.oParent){this.oParent.rerender()}};h.prototype.getUIArea=function(){return this.oParent?this.oParent.getUIArea():null};h.prototype.destroy=function(e){if(this.bIsDestroyed){return}var t=!this.getParent();h._updateFocusInfo(this);r.prototype.destroy.call(this,e);this.data=C;var i=this.getDomRef();if(!i){return}var n=e==="KeepDom";if(e===true||!n&&t||this.isA("sap.ui.core.PopupInterface")||p.isPreservedContent(i)){jQuery(i).remove()}else{i.removeAttribute("data-sap-ui-preserve");if(!n){i.id="sap-ui-destroyed-"+this.getId();for(var o=0,a=i.querySelectorAll('[id^="'+this.getId()+'-"]');o<a.length;o++){a[o].id="sap-ui-destroyed-"+a[o].id}}}};h.prototype.fireEvent=function(e,t,i,n){if(this.hasListeners(e)){a.notifyStepStart(e,this)}if(typeof t==="boolean"){n=i;i=t;t=null}t=t||{};t.id=t.id||this.getId();if(h._interceptEvent){h._interceptEvent(e,this,t)}return r.prototype.fireEvent.call(this,e,t,i,n)};h._interceptEvent=undefined;function y(e,t,r){if(t.canSkipRendering||!(t.onAfterRendering||t.onBeforeRendering)){return}e._iRenderingDelegateCount+=r||-1;if(e.bOutput===true&&e._iRenderingDelegateCount==r){p.canSkipRendering(e,1)}}h.prototype.hasRenderingDelegate=function(){return Boolean(this._iRenderingDelegateCount)};h.prototype.addDelegate=function(e,t,r,i){u(e,"oDelegate must be not null or undefined");if(!e){return this}this.removeDelegate(e);if(typeof t==="object"){i=r;r=t;t=false}if(typeof r==="boolean"){i=r;r=undefined}(t?this.aBeforeDelegates:this.aDelegates).push({oDelegate:e,bClone:!!i,vThis:r===this?true:r});y(this,e,1);return this};h.prototype.removeDelegate=function(e){var t;for(t=0;t<this.aDelegates.length;t++){if(this.aDelegates[t].oDelegate==e){this.aDelegates.splice(t,1);y(this,e,0);t--}}for(t=0;t<this.aBeforeDelegates.length;t++){if(this.aBeforeDelegates[t].oDelegate==e){this.aBeforeDelegates.splice(t,1);y(this,e,0);t--}}return this};h.prototype.addEventDelegate=function(e,t){return this.addDelegate(e,false,t,true)};h.prototype.removeEventDelegate=function(e){return this.removeDelegate(e)};h.prototype.getFocusDomRef=function(){return this.getDomRef()||null};h.prototype.isFocusable=function(){var e=this.getFocusDomRef();if(!e){return false}var t=e;var r=t.getBoundingClientRect();while(r.x<0||r.x>window.innerWidth||r.y<0||r.y>window.innerHeight){if(t.assignedSlot){t=t.assignedSlot}if(t.parentElement){t=t.parentElement}else if(t.parentNode&&t.parentNode.nodeType===Node.DOCUMENT_FRAGMENT_NODE){t=t.parentNode.host}else{break}r=t.getBoundingClientRect()}var i=document.elementsFromPoint(r.x,r.y);var n=i.findIndex(function(t){return t.contains(e)});var o=i.findIndex(function(e){return e.classList.contains("sapUiBLy")||e.classList.contains("sapUiBlockLayer")});if(o!==-1&&n>o){return false}return jQuery(e).is(":sapFocusable")};function m(e){var t,r=[];t=e.parentNode;while(t){r.push({node:t,scrollLeft:t.scrollLeft,scrollTop:t.scrollTop});t=t.parentNode}return r}function D(e){e.forEach(function(e){var t=e.node;if(t.scrollLeft!==e.scrollLeft){t.scrollLeft=e.scrollLeft}if(t.scrollTop!==e.scrollTop){t.scrollTop=e.scrollTop}})}h.prototype.focus=function(e){var t=this.getFocusDomRef(),r=[];e=e||{};if(t){if(o.browser.safari){if(e.preventScroll===true){r=m(t)}t.focus();if(r.length>0){setTimeout(D.bind(null,r),0)}}else{t.focus(e)}}};h.prototype.getFocusInfo=function(){return{id:this.getId()}};h.prototype.applyFocusInfo=function(e){this.focus(e);return this};h.prototype._refreshTooltipBaseDelegate=function(e){var r=this.getTooltip();if(t.isObjectA(r,"sap.ui.core.TooltipBase")){this.removeDelegate(r)}if(t.isObjectA(e,"sap.ui.core.TooltipBase")){e._currentControl=this;this.addDelegate(e)}};h.prototype.setTooltip=function(e){this._refreshTooltipBaseDelegate(e);this.setAggregation("tooltip",e);return this};h.prototype.getTooltip=function(){return this.getAggregation("tooltip")};h.runWithPreprocessors=r.runWithPreprocessors;h.prototype.getTooltip_AsString=function(){var e=this.getTooltip();if(typeof e==="string"||e instanceof String){return e}return undefined};h.prototype.getTooltip_Text=function(){var e=this.getTooltip();if(e&&typeof e.getText==="function"){return e.getText()}return e};var v=h.extend("sap.ui.core.CustomData",{metadata:{library:"sap.ui.core",properties:{key:{type:"string",group:"Data",defaultValue:null},value:{type:"any",group:"Data",defaultValue:null},writeToDom:{type:"boolean",group:"Data",defaultValue:false}},designtime:"sap/ui/core/designtime/CustomData.designtime"}});v.prototype.setValue=function(e){this.setProperty("value",e,true);var t=this.getParent();if(t&&t.getDomRef()){var r=this._checkWriteToDom(t);if(r){t.$().attr(r.key,r.value)}}return this};v.prototype._checkWriteToDom=function(t){if(!this.getWriteToDom()){return null}var r=this.getKey();var i=this.getValue();function n(e){s.error("CustomData with key "+r+" should be written to HTML of "+t+" but "+e);return null}if(typeof i!="string"){return n("the value is not a string.")}var o=e.getType("sap.ui.core.ID");if(!o.isValid(r)||r.indexOf(":")!=-1){return n("the key is not valid (must be a valid sap.ui.core.ID without any colon).")}if(r==l.fastNavigationKey){i=/^\s*(x|true)\s*$/i.test(i)?"true":"false"}else if(r.indexOf("sap-ui")==0){return n("the key is not valid (may not start with 'sap-ui').")}return{key:"data-"+r,value:i}};function b(e,t){var r=e.getAggregation("customData");if(r){for(var i=0;i<r.length;i++){if(r[i].getKey()==t){return r[i]}}}return null}function _(e,t,r,i){var n=b(e,t);if(r===null){if(!n){return}var o=e.getAggregation("customData").length;if(o==1){e.destroyAggregation("customData",true)}else{e.removeAggregation("customData",n,true);n.destroy()}}else if(n){n.setValue(r);n.setWriteToDom(i)}else{e.addAggregation("customData",new v({key:t,value:r,writeToDom:i}),true)}}h.prototype.data=function(){var e=arguments.length;if(e==0){var t=this.getAggregation("customData"),r={};if(t){for(var i=0;i<t.length;i++){r[t[i].getKey()]=t[i].getValue()}}return r}else if(e==1){var n=arguments[0];if(n===null){this.destroyAggregation("customData",true);return this}else if(typeof n=="string"){var o=b(this,n);return o?o.getValue():null}else if(typeof n=="object"){for(var a in n){_(this,a,n[a])}return this}else{throw new TypeError("When data() is called with one argument, this argument must be a string, an object or null, but is "+typeof n+":"+n+" (on UI Element with ID '"+this.getId()+"')")}}else if(e==2){_(this,arguments[0],arguments[1]);return this}else if(e==3){_(this,arguments[0],arguments[1],arguments[2]);return this}else{throw new TypeError("data() may only be called with 0-3 arguments (on UI Element with ID '"+this.getId()+"')")}};h._CustomData=v;h.getMetadata().getAggregation("customData").defaultClass=v;function C(){var e=arguments.length;if(e===1&&arguments[0]!==null&&typeof arguments[0]=="object"||e>1&&e<4&&arguments[1]!==null){s.error("Cannot create custom data on an already destroyed element '"+this+"'");return this}return h.prototype.data.apply(this,arguments)}h.prototype.clone=function(e,t){var i=r.prototype.clone.apply(this,arguments);for(var n=0;n<this.aDelegates.length;n++){if(this.aDelegates[n].bClone){i.aDelegates.push(this.aDelegates[n])}}for(var o=0;o<this.aBeforeDelegates.length;o++){if(this.aBeforeDelegates[o].bClone){i.aBeforeDelegates.push(this.aBeforeDelegates[o])}}if(this._sapui_declarativeSourceInfo){i._sapui_declarativeSourceInfo=Object.assign({},this._sapui_declarativeSourceInfo)}return i};h.prototype.findElements=r.prototype.findAggregatedObjects;function E(e){var t=e.getParent();if(t){var r=jQuery.Event("LayoutDataChange");r.srcControl=e;t._handleEvent(r)}}h.prototype.setLayoutData=function(e){this.setAggregation("layoutData",e,true);E(this);return this};h.prototype.destroyLayoutData=function(){this.destroyAggregation("layoutData",true);E(this);return this};h.prototype.bindElement=r.prototype.bindObject;h.prototype.unbindElement=r.prototype.unbindObject;h.prototype.getElementBinding=r.prototype.getObjectBinding;h.prototype._getFieldGroupIds=function(){var e;if(this.getMetadata().hasProperty("fieldGroupIds")){e=this.getFieldGroupIds()}if(!e||e.length==0){var t=this.getParent();if(t&&t._getFieldGroupIds){return t._getFieldGroupIds()}}return e||[]};h.prototype.getDomRefForSetting=function(e){var t=this.getMetadata().getAllSettings()[e];if(t&&t.selector){var r=this.getDomRef();if(r){r=r.parentNode;if(r&&r.querySelector){var i=t.selector.replace(/\{id\}/g,this.getId().replace(/(:|\.)/g,"\\$1"));return r.querySelector(i)}}}return null};h.prototype._getMediaContainerWidth=function(){if(typeof this._oContextualSettings==="undefined"){return undefined}return this._oContextualSettings.contextualWidth};h.prototype._getCurrentMediaContainerRange=function(e){var t=this._getMediaContainerWidth();e=e||o.media.RANGESETS.SAP_STANDARD;return o.media.getCurrentRange(e,t)};h.prototype._onContextualSettingsChanged=function(){var e=this._getMediaContainerWidth(),t=e!==undefined,r=t^!!this._bUsingContextualWidth,i=this._aContextualWidthListeners||[];if(r){if(t){i.forEach(function(e){o.media.detachHandler(e.callback,e.listener,e.name)})}else{i.forEach(function(e){o.media.attachHandler(e.callback,e.listener,e.name)})}this._bUsingContextualWidth=t}i.forEach(function(e){var t=this._getCurrentMediaContainerRange(e.name);if(t&&t.from!==e.media.from){e.media=t;e.callback.call(e.listener||window,t)}},this)};h.prototype._attachMediaContainerWidthChange=function(e,t,r){r=r||o.media.RANGESETS.SAP_STANDARD;this._aContextualWidthListeners=this._aContextualWidthListeners||[];this._aContextualWidthListeners.push({callback:e,listener:t,name:r,media:this._getCurrentMediaContainerRange(r)});if(!this._bUsingContextualWidth){o.media.attachHandler(e,t,r)}};h.prototype._detachMediaContainerWidthChange=function(e,t,r){var i;r=r||o.media.RANGESETS.SAP_STANDARD;if(!this._aContextualWidthListeners){return}for(var n=0,a=this._aContextualWidthListeners.length;n<a;n++){i=this._aContextualWidthListeners[n];if(i.callback===e&&i.listener===t&&i.name===r){if(!this._bUsingContextualWidth){o.media.detachHandler(e,t,r)}this._aContextualWidthListeners.splice(n,1);break}}};var T;h._updateFocusInfo=function(e){T=T||sap.ui.require("sap/ui/core/FocusHandler");if(T){T.updateControlFocusInfo(e)}};h.closestTo=function(e,t){var r="[data-sap-ui]",i,n;if(e===undefined||e===null){return undefined}if(typeof e==="string"){i=document.querySelector(e)}else if(e instanceof window.Element){i=e}else if(e.jquery){i=e[0];s.error("[FUTURE] Do not call Element.closestTo() with jQuery object as parameter. \t\t\t\tThe function should be called with either a DOM Element or a CSS selector. \t\t\t\t(future error, ignored for now)")}else{throw new TypeError("Element.closestTo accepts either a DOM element or a CSS selector string as parameter, but not '"+e+"'")}if(t){r+=",[data-sap-ui-related]"}i=i&&i.closest(r);if(i){if(t){n=i.getAttribute("data-sap-ui-related")}n=n||i.getAttribute("id")}return h.getElementById(n)};h.getElementById=h.registry.get;h.getActiveElement=()=>{try{var e=jQuery(document.activeElement);if(e.is(":focus")){return h.closestTo(e[0])}}catch(e){}};f.attachApplied(function(e){var t=jQuery.Event("ThemeChanged");t.theme=e.theme;h.registry.forEach(function(e){e._handleEvent(t)})});c.registerForUpdate("Elements",h.registry.all);return h});
//# sourceMappingURL=Element.js.map