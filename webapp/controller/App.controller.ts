import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";

/**
 * @namespace santos.sapui5ts.controller
 */
export default class App extends Controller {

    onSayHello(): void {
        MessageToast.show("hello");
    }
}