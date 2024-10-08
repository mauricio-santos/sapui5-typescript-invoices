import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";

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
}