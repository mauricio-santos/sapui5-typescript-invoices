import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import { SearchField$SearchEvent } from "sap/ui/commons/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import UIComponent from "sap/ui/core/UIComponent";
import ObjectListItem from "sap/m/ObjectListItem";
import Event from "sap/ui/base/Event";

/**
 * @namespace santos.sapui5ts.controller
 */
export default class InvoiceList extends Controller {
    public onInit(): void | undefined {
        const currencyModel = new JSONModel({
            eur : "EUR",
            us : "US"
        });        
        this.getView()?.setModel(currencyModel, "currencyModel")
    }
	onSearchFieldInvoiceSearch(event: SearchField$SearchEvent): void {        
		//build filter array
        const filter = [];
        const query = event.getParameter("query");

        query && filter.push(new Filter("ProductName", FilterOperator.Contains, query));

        //filter binding
        const list = this.byId("idInvoicesTable");
        const binding = list?.getBinding("items") as ListBinding;
        binding?.filter(filter);
	}

    onColumnListItemPress(event: Event): void {
        const item: ObjectListItem = event.getSource();
        const path = item.getBindingContext("northwindModel")?.getPath().substring(1) || false;
        const uri = window.encodeURIComponent(path);
        const router = UIComponent.getRouterFor(this);

        router.navTo("detail", {
            invoicePath: uri
        });
    }
}

