import ManagedObject from "sap/ui/base/ManagedObject";
import Dialog from "sap/m/Dialog";
import View from "sap/ui/core/mvc/View";
import Fragment from "sap/ui/core/Fragment";
import Control from "sap/ui/core/Control";

/**
 * @namespace santos.sapui5ts.helper
 */
export default class DialogsHelper extends ManagedObject {
    private view? : View | Control;
    private dialogMap = new Map<string, Dialog>();

    constructor(view : View | Control) {
        super();
        this.view = view;
    }

    public exit(): void {
        delete this.view;
    }

    //Open HelloDialog
    public async open(dialogName: string, dialogId: string) : Promise<void> {       
        const view = this.view;
        const dialogIsSet = (view as View)?.byId(dialogId)

        //Simulate a controller
        const oFragmentController = {
            onCloseDialog: function() {
                ((view as View)?.byId(dialogId) as Dialog).close();
            }
        }
        
        if (dialogIsSet){
            let dialog = this.dialogMap.get(dialogId); //Return Dialog
            dialog?.open();
        }else{
            
            //load asynctonous XML fragment
            let newDialog: Dialog
            newDialog = await (Fragment.load({
                id: (view as View)?.getId(),
                name: "santos.sapui5ts.fragments." + dialogName,
                controller: oFragmentController
            }) as Promise<Dialog>);

            (view as View)?.addDependent(newDialog);  
            newDialog.open();

            // Add dialog on dialogMap
            this.dialogMap.set(dialogId, newDialog);
        }
    }
}