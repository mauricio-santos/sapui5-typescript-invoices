import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import Model from "sap/ui/model/Model";

/**
 * @namespace santos.sapui5ts.controller
 */
export default class App extends Controller {

    onInit(): void {
        let oClient: object = {
            client: {
                name: "Santos"
            }
        };

        let oModel: Model = new JSONModel(oClient);
        this.getView()?.setModel(oModel);
    }

    onSayHello(): void {
        MessageToast.show("hello");
    }
}