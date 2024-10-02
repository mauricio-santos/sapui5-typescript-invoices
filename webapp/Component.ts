import Control from "sap/ui/core/Control";
import UIComponent from "sap/ui/core/UIComponent";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import XMLView from "sap/ui/core/mvc/XMLView";
import ClientsModel from "./model/ClientsModel";

/**
 * @namespace santos.sapui5ts
 */
export default class Component extends UIComponent {

    public static metadata = {
        "interfaces": [
            "sap.ui.core.IAsyncContentCreation" //This allows the component to be generated asynchronously
        ]
    };

    init(): void {
        
        // call the init function of the parent
        super.init();

        //set model i18n
        const i18nModel = new ResourceModel({
            bundleName: "santos.sapui5ts.i18n.i18n"
        });
        this.setModel(i18nModel, "i18n");

        //set model Clients
        const oClients = (new ClientsModel).create();        
        this.setModel(oClients);
    };

    //method for create the view as we did in the index.ts file to set our app view as the root view of the component
    createContent(): Control | Promise<Control | null> | null {
        return XMLView.create({
            "viewName": "santos.sapui5ts.view.App",
            "id": "app"
        });
    };

}