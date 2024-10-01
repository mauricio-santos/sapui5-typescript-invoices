import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import ClientsModel from "santos/sapui5ts/model/ClientsModel"
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import Model from "sap/ui/model/Model";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";

/**
 * @namespace santos.sapui5ts.controller
 */
export default class App extends Controller {

    public onInit(): void {
        const oModel = (new ClientsModel).create()
        const i18nModel = new ResourceModel({
            bundleName: "santos.sapui5ts.i18n.i18n"
        })

        this.getView()?.setModel(oModel);
        this.getView()?.setModel(i18nModel, "i18n");
    }

    public onSayHello(): void {
        const oBudle = (<ResourceBundle>(<ResourceModel>this.getView()?.getModel("i18n"))?.getResourceBundle());
        const oClientModel = (<JSONModel>this.getView()?.getModel())?.getProperty("/client/name")        
        const msg = oBudle.getText("msgHelloClient", [oClientModel]) || 'no text defined';

        MessageToast.show(msg);
    }
}