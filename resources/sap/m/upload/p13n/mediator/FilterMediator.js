/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/upload/p13n/mediator/BaseMediator","sap/m/upload/FilterPanel","sap/m/upload/p13n/modules/CustomDataConfig","sap/base/util/deepEqual","sap/ui/model/Filter","sap/ui/model/FilterType"],function(e,t,a,r,o,n){"use strict";const p=e.extend("sap.m.upload.p13n.mediator.FilterMediator",{constructor:function(t){e.call(this,t)}});p.prototype.createPanel=function(){return Promise.resolve(this.createUi(this.getPanelData()))};p.prototype.createUi=function(e){const a=this.getControl()._getP13nMetadata();this._oPanel=new t({fields:a[this.getP13nMetadataTarget()]});this._oPanel.setP13nData(e);return this._oPanel};p.prototype.getPanelData=function(){const e=this.getCurrentState(),t=[],a=this.getControl()._getP13nMetadata()[this.getP13nMetadataTarget()].reduce((e,t)=>{e[t.path]=t;return e},{});e.forEach(e=>{if(!a[e.path]){return}t.push({name:e.key,path:e.path,operator:e.operator,value:e.value})});return t};p.prototype.getCurrentState=function(){const e=a.read(this.getControl())||{};const t=e.hasOwnProperty("properties")&&e.properties[this.getTargetAggregation()]?e.properties[this.getTargetAggregation()]:{};const r=Object.values(t).sort((e,t)=>e.index-t.index);return r.map(e=>({key:e.key,path:e.path,operator:e.operator,value:e.value}))};p.prototype.getChanges=function(){const e=[],t=this.getCurrentState(),a=this._getP13nData(),o=a.map(e=>({key:e.name,path:e.path,operator:e.operator,value:e.value}));if(r(t,o)){return e}const n=this._getDeletes(t,o),p=this._getInserts(t,o),i=this._getMove(t,o,n,p);e.push(this.createChange("uploadSetTableFilterStateChange",{deleted:n,moved:i,inserted:p}));return e};p.prototype._getP13nData=function(){return this._oPanel?this._oPanel.getP13nData():{}};p.prototype._getDeletes=function(e,t){const a=[],r=this.arrayToMap(t);e.forEach((e,t)=>{if(!r[e.key]){a.push({key:e.key,prevIndex:t,prevPath:e.path,prevOperator:e.operator,prevValue:e.value})}});return a};p.prototype._getInserts=function(e,t){const a=[],r=this.arrayToMap(e);t.forEach((e,t)=>{if(!r[e.key]){a.push({key:e.key,index:t,path:e.path,operator:e.operator,value:e.value})}});return a};p.prototype._getMove=function(e,t){const a=[],r=this.arrayToMap(t,true),o=["path","operator","value"];e.forEach((e,t)=>{if(r[e.key]&&(r[e.key].index!==t||!o.every(t=>r[e.key][t]===e[t]))){a.push({key:e.key,index:r[e.key].index,prevIndex:t,path:r[e.key].path,prevPath:e.path,operator:r[e.key].operator,prevOperator:e.operator,value:r[e.key].value,prevValue:e.value})}});return a};p.prototype.applyStateToTable=function(e={}){const t=this.getCurrentState(),a=t.map(e=>new o(e.path,e.operator,e.value));this.getControl().getBinding("items").filter(a.length?new o(a,true):null,n.Control)};return p});
//# sourceMappingURL=FilterMediator.js.map