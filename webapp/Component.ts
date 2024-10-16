import UIComponent from "sap/ui/core/UIComponent";
import ClientsModel from "./model/ClientsModel";
import Control from "sap/ui/core/Control";
import DialogsHelper from "./helper/DialogsHelper";

/**
 * @namespace santos.sapui5ts
 */
export default class Component extends UIComponent {
    private dialogsHelper?: DialogsHelper;

    public static metadata = {
        "manifest": "json"
    };

    init(): void {

        // call the init function of the parent
        super.init();

        // Check if mock server should be started
        sap.ui.require(["santos/sapui5ts/localService/mockserver"], (mockserver) => {
            mockserver.init();
            // console.log("Mock server initialized! ON COMPONENT");
        });

        //set model Clients
        const oClients = (new ClientsModel).create();
        this.setModel(oClients);

        //Load Dialogs
        const rootController: Control = this.getRootControl();
        this.dialogsHelper = new DialogsHelper(rootController);
    };

    public exit(): void | undefined {
        this.dialogsHelper?.destroy();
        delete this.dialogsHelper;
    }

    public openDialog(sDialogName: string, sIdDialog: string) {
        this.dialogsHelper?.open(sDialogName, sIdDialog);
    }

}