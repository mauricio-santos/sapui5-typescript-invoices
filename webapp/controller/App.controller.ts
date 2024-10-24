import Controller from "sap/ui/core/mvc/Controller";
import Component from "../Component";

/**
 * @namespace santos.sapui5ts.controller
 */
export default class App extends Controller {

    public onInit(): void {
        //Content Density
        const appStyle = (this.getOwnerComponent() as Component).getContentDensityClass(); 
        this.getView()?.addStyleClass(appStyle);
    }

    onButtonHelloDialogPress() {
        (this.getOwnerComponent() as Component).openDialog("HelloDialog", "idHelloDialog");
    }
}