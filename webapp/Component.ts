import UIComponent from "sap/ui/core/UIComponent";
import ClientsModel from "./model/ClientsModel";
import Control from "sap/ui/core/Control";
import DialogsHelper from "./helper/DialogsHelper";
import JSONModel from "sap/ui/model/json/JSONModel";
import Device from "sap/ui/Device";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";

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

        //set model Clients
        const oClients = (new ClientsModel).create();
        this.setModel(oClients);

        //Load Dialogs
        const rootController: Control = this.getRootControl();
        this.dialogsHelper = new DialogsHelper(rootController);

        //set device model
        let deviceModel = new JSONModel(Device);
        deviceModel.setDefaultBindingMode("OneWay");
        this.setModel(deviceModel, "deviceModel");
        
        //create the views based on the url/hash
        this.getRouter().initialize();

        // Set Dates Model from Northwind Model. DateRangeSelection.
        const northwindModel = this.getModel("northwindModel") as ODataModel;
       
        const checkDataLoaded = setInterval(() => {
            const oDataCache = (northwindModel as any).oData;
            let arrDate: Object[] = [];

            if (Object.keys(oDataCache).length > 0) {
                const objValues = Object.values(oDataCache);

                objValues.map((obj: any) => {                  
                    arrDate.push(new Date(obj.OrderDate));
                });

                const minMaxDate = { 
                    min: new Date(Math.min(...arrDate.map(data => (data as Date).getTime()))),
                    max: new Date(Math.max(...arrDate.map(data => (data as Date).getTime())))
                }
                const minMaxDateModel = new JSONModel(minMaxDate);
                minMaxDateModel.setDefaultBindingMode("OneWay");
                this.setModel(minMaxDateModel, "minMaxDateModel");  
                
                clearInterval(checkDataLoaded); // Stop Interval
            }
        }, 500);
    };

    public exit(): void | undefined {
        this.dialogsHelper?.destroy();
        delete this.dialogsHelper;
    }

    public openDialog(sDialogName: string, sIdDialog: string) {
        this.dialogsHelper?.open(sDialogName, sIdDialog);
    }

    public getContentDensityClass() {
        return Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact"
    }

}