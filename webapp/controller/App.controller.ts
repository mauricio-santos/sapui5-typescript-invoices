import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import ClientsModel from "santos/sapui5ts/model/ClientsModel"

/**
 * @namespace santos.sapui5ts.controller
 */
export default class App extends Controller {

    onInit(): void {
        const oModel = (new ClientsModel).create()
        this.getView()?.setModel(oModel);
    }

    onSayHello(): void {
        MessageToast.show("hello");
    }
}