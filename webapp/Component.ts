import UIComponent from "sap/ui/core/UIComponent";
import ClientsModel from "./model/ClientsModel";

/**
 * @namespace santos.sapui5ts
 */
export default class Component extends UIComponent {

    public static metadata = {
        "interfaces": [
            "sap.ui.core.IAsyncContentCreation" //This allows the component to be generated asynchronously
        ],
        "manifest": "json"
    };

    init(): void {
        
        // call the init function of the parent
        super.init();

        //set model Clients
        const oClients = (new ClientsModel).create();        
        this.setModel(oClients);
    };
}