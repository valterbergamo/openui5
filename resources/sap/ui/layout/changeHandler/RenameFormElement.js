/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/condenser/Classification"],function(e){"use strict";var t={};var n=function(e){return typeof e==="string"};t.applyChange=function(e,t,n){var r=n.modifier,a=e.getText("fieldLabel");return Promise.resolve().then(function(){return r.getAggregation(t,"label")}).then(function(n){if(typeof n==="string"){e.setRevertData(n);return r.setProperty(t,"label",a)}return r.getProperty(n,"text").then(function(t){e.setRevertData(t);r.setProperty(n,"text",a)})})};t.completeChangeContent=function(e,t,r){if(!(t.renamedElement&&t.renamedElement.id)){throw new Error("Rename of label cannot be executed: oSpecificChangeInfo.renamedElement attribute required")}if(!n(t.value)){throw new Error("Rename of label cannot be executed: oSpecificChangeInfo.value attribute required")}e.setText("fieldLabel",t.value,"XGRP")};t.revertChange=function(e,t,n){var r=e.getRevertData(),a=n.modifier;return Promise.resolve().then(function(){return a.getAggregation(t,"label")}).then(function(n){if(typeof n==="string"){a.setProperty(t,"label",r)}else{a.setProperty(n,"text",r)}e.resetRevertData()})};t.getChangeVisualizationInfo=function(e){var t=e.getText("fieldLabel");return{descriptionPayload:{originalLabel:e.getRevertData(),newLabel:t}}};t.getCondenserInfo=function(t){return{affectedControl:t.getSelector(),classification:e.LastOneWins,uniqueKey:"label"}};return t},true);
//# sourceMappingURL=RenameFormElement.js.map