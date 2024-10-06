import UIComponent from "sap/ui/core/UIComponent";
import ClientsModel from "./model/ClientsModel";
import Control from "sap/ui/core/Control";
import HelloDialogHelper from "./helper/HelloDialogHelper";

/**
 * @namespace santos.sapui5ts
 */
export default class Component extends UIComponent {

    private helloDialog?: HelloDialogHelper;

    public static metadata = {
        "manifest": "json"
    };

    init(): void {

        // call the init function of the parent
        super.init();

        //set model Clients
        const oClients = (new ClientsModel).create();
        this.setModel(oClients);

        //Load HelloDialog
        const rootController: Control = this.getRootControl();        
        this.helloDialog = new HelloDialogHelper(rootController);
    };

    public exit(): void | undefined {
        this.helloDialog?.destroy();
        delete this.helloDialog;
    }

    public openDialog(): void | undefined {
        this.helloDialog?.open();
    }

}