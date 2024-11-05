import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import { SearchField$SearchEvent } from "sap/ui/commons/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import UIComponent from "sap/ui/core/UIComponent";
import ObjectListItem from "sap/m/ObjectListItem";
import Event from "sap/ui/base/Event";
import Context from "sap/ui/model/Context";
import DateRangeSelection, { DateRangeSelection$ChangeEvent } from "sap/m/DateRangeSelection";

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

    private applyFilters(filters: Array<Filter>){
        const list = this.byId("idInvoicesTable");
        const binding = list?.getBinding("items") as ListBinding;        
        binding?.filter(filters);
    }

    private dateUtcConverter(date: any): Date{
        const utcDate = new Date(Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            0,
            0,
            0
        ));
        return new Date(utcDate.getTime());
    }

	onSearchFieldInvoiceSearch(event: SearchField$SearchEvent): void {        
        const filters = [];
        const query = event.getParameter("query");

        const productNameFitler = new Filter("ProductName", FilterOperator.Contains, query);
        const shipCountryFilter = new Filter("ShipCountry", FilterOperator.EQ, query);
        const shipperNameFilter = new Filter("ShipperName", FilterOperator.EQ, query);

        query && filters.push(new Filter({
            filters: [
                productNameFitler,
                shipCountryFilter,
                shipperNameFilter
            ]
        }));
        this.applyFilters(filters);
	}

    onColumnListItemPress(event: Event): void {
        const item = event.getSource() as ObjectListItem;
        const bindContext = item.getBindingContext("northwindModel") as Context;
        const path = bindContext.getPath().substring(1);
        const uri = window.encodeURIComponent(path);
        const router = UIComponent.getRouterFor(this);

        router.navTo("detail", {
            invoicePath: uri
        });
    }

    onDateRangeSelectionChange(event: DateRangeSelection$ChangeEvent) {
        const startDate = event.getParameter("from") as DateRangeSelection;
        const endDate = event.getParameter("to") as DateRangeSelection;
        let dateFilter: Filter[] = [];

        if(startDate != undefined){
            const startDateUtc = this.dateUtcConverter(startDate);
            const endDateUtc = this.dateUtcConverter(endDate);
            dateFilter.push(new Filter("OrderDate", FilterOperator.BT, startDateUtc, endDateUtc));
        }
        this.applyFilters(dateFilter);
        
    }
}

