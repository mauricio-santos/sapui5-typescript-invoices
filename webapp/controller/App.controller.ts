import Controller from "sap/ui/core/mvc/Controller";
import Component from "../Component";

/**
 * @namespace santos.sapui5ts.controller
 */
export default class App extends Controller {

    public onInit(): void {

    }

    onButtonHelloDialogPress() {
        (this.getOwnerComponent() as Component).openDialog("HelloDialog", "idHelloDialog");
    }
}