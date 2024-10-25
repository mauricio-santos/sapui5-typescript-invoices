import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Component from "../Component";
import Log from "sap/base/Log";

/**
 * @namespace santos.sapui5ts.controller
 */
export default class HelloPanel extends Controller {

    onInit(): void {
        
    }

    onBeforeRendering(): void | undefined {
        window.message = "Message from OnBeforeRendering";
        Log.info(window.message);
        Log.error(window.message);
        
    }

    onAfterRendering(): void | undefined {
        // debugger
    }
    
    public onSayHelloButtonPress(): void {
        const oBudle = (<ResourceBundle>(<ResourceModel>this.getView()?.getModel("i18n"))?.getResourceBundle());
        const oClientModel = (<JSONModel>this.getView()?.getModel())?.getProperty("/client/name")    
        const msg = oBudle.getText("msgHelloClient", [oClientModel]) || 'no text defined';

        MessageToast.show(msg);
    }

    public onHelloDialogButtonPress() {   
        (this.getOwnerComponent() as Component).openDialog("HelloDialog", "idHelloDialog");
    }

    public onButtonFormDialogPress() {
        (this.getOwnerComponent() as Component).openDialog("FormDialog", "idFormDialog");
    }
}