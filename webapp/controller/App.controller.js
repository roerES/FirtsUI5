sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"roerdev/learn/FirtsUI5/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment",
	"sap/ui/model/Sorter",
	"sap/ui/core/UIComponent"
], function (Controller, JSONModel, Formatter, Filter, FilterOperator, Fragment, Sorter, UIComponent) {
	"use strict";

	return Controller.extend("roerdev.learn.FirtsUI5.controller.App", {
		formatter: Formatter,

		onInit: function () {

		},

		onBeforeRendering: function () {

		},

		onAfterRendering: function () {

		},

		onExit: function () {

		},

		onSearch: function (oEvent) {
			var oFilters = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				oFilters.push(new Filter("CustomerName", FilterOperator.Contains, sQuery));
			}
			var oTable = this.byId("idOrdersTable");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(oFilters);
		},

		onSort: function () {
			// Pasos para usar un fragmento

			// 1 - Obtener vista actual
			var oView = this.getView();

			if (!this.byId("sortDialog")) {
				// 2 - Crear/Cargar el archivo del fragmento
				Fragment.load({
					id: oView.getId(),
					name: "roerdev.learn.FirtsUI5.fragment.SortDialog",
					controller: this
				}).then(function (oDialog) {
					oView.addDependent(oDialog);
					// 3 - Abrir y mostrar fragmento/dialog
					oDialog.open();
				});
			} else {
				this.byId("sortDialog").open();
			}
		},

		onSortDialogConfirm: function (oEvent) {
			var oSortItem = oEvent.getParameter("sortItem");
			var sColumnPath = "SalesOrderID";
			var bSortDescending = oEvent.getParameter("sortDescending");

			var oSorters = [];

			if (oSortItem) {
				sColumnPath = oSortItem.getKey();
			}

			oSorters.push(new Sorter(sColumnPath, bSortDescending));

			var oTable = this.byId("idOrdersTable");
			var oBinding = oTable.getBinding("items");
			oBinding.sort(oSorters);
		},

		onGroup: function () {
			var oView = this.getView();
			if (!this.byId("groupDialog")) {
				Fragment.load({
					id: oView.getId(),
					name: "roerdev.learn.FirtsUI5.fragment.GroupDialog",
					controller: this
				}).then(function (oDialog) {
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("groupDialog").open();
			}
		},

		onGroupDialogConfirm: function (oEvent) {
			var oSortItem = oEvent.getParameter("groupItem");
			var sColumnPath = "SalesOrderID";
			var bDescending = oEvent.getParameter("groupDescending");
			var bGroupEnable = false;
			var oSorters = [];

			if (oSortItem) {
				sColumnPath = oSortItem.getKey();
				bGroupEnable = true;
			}

			oSorters.push(new Sorter(sColumnPath, bDescending, bGroupEnable));
			var oTable = this.byId("idOrdersTable");
			var oBinding = oTable.getBinding("items");
			oBinding.sort(oSorters);
		},
		
		onPressItem: function (oEvent) {
			var oRouter = UIComponent.getRouterFor(this);
			var oItem = oEvent.getSource();
			
			oRouter.navTo("Detalles", {
				SalesOrderID: oItem.getBindingContext().getObject().SalesOrderID
			});
		}

	});
});
// // 1 Crear un objeto de datos
// var oData = {
// 	"title": "Mis Ordenes",
// 	"SalesOrderSet": [{
// 		"SalesOrderID": "0001",
// 		"CustomerName": "Apple",
// 		"LifecycleStatusDescription": "Completed",
// 		"LifecycleStatus": "Success",
// 		"GrossAmount": "199",
// 		"CurrencyCode": "USD"
// 	}, {
// 		"SalesOrderID": "0002",
// 		"CustomerName": "Google",
// 		"LifecycleStatusDescription": "Completed",
// 		"LifecycleStatus": "Success",
// 		"GrossAmount": "277",
// 		"CurrencyCode": "USD"
// 	}, {
// 		"SalesOrderID": "0003",
// 		"CustomerName": "Amazon",
// 		"LifecycleStatusDescription": "Error",
// 		"LifecycleStatus": "Error",
// 		"GrossAmount": "599",
// 		"CurrencyCode": "USD"
// 	}]
// };

// // 2 Crear una instancia del modelo JSON
// var oModel = new JSONModel(oData);
// oModel.setDefaultBindingMode("OneWay");

// // 3 Asignar el modelo JSON a la vista actual
// this.getView().setModel(oModel);