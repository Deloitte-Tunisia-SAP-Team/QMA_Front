/*global QUnit*/

sap.ui.define([
	"qmassets/controller/Issue_Details_view.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Issue_Details_view Controller");

	QUnit.test("I should test the Issue_Details_view controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
