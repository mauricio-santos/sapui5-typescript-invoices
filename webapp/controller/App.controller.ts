import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";

/**
 * @namespace santos.sapui5ts.controller
 */
export default class App extends Controller {

    public onInit(): void {

    }

    public onSayHelloButtonPress(): void {
        const oBudle = (<ResourceBundle>(<ResourceModel>this.getView()?.getModel("i18n"))?.getResourceBundle());
        const oClientModel = (<JSONModel>this.getView()?.getModel())?.getProperty("/client/name")        
        const msg = oBudle.getText("msgHelloClient", [oClientModel]) || 'no text defined';

        MessageToast.show(msg);
    }
}