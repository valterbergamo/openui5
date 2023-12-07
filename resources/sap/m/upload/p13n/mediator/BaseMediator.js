/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/mvc/XMLView"],function(t,e){"use strict";const r=t.extend("sap.m.upload.p13n.mediator.BaseMediator",{constructor:function(e){t.call(this);if(!e?.control){throw Error('Please provide "control" for personalization')}this._oControl=e.control;if(!e?.targetAggregation){throw Error('Please provide "targetAggregation" for personalization')}this._sTargetAggregation=e.targetAggregation;if(!e?.p13nMetadataTarget){throw Error('Please provide "p13nMetadataTarget" for personalization')}this._sP13nMetadataTarget=e.p13nMetadataTarget}});r.prototype.getControl=function(){return this._oControl};r.prototype.getTargetAggregation=function(){return this._sTargetAggregation};r.prototype.getP13nMetadataTarget=function(){return this._sP13nMetadataTarget};r.prototype.getView=function(){return this.getControlOfType(this.getControl(),e)};r.prototype.getControlOfType=function(t,e){if(t instanceof e){return t}if(t&&typeof t["getParent"==="function"]){return this.getControlOfType(t.getParent(),e)}return undefined};r.prototype.arrayToMap=function(t,e=false){return t.reduce(function(t,r,o){t[r.key]=r;if(e){t[r.key].index=o}return t},{})};r.prototype.createChange=function(t,e){e.targetAggregation=this.getTargetAggregation();return{selectorElement:this.getControl(),changeSpecificData:{changeType:t,content:e}}};return r});
//# sourceMappingURL=BaseMediator.js.map