import ManagedObject from "sap/ui/base/ManagedObject";
import Dialog from "sap/m/Dialog";
import View from "sap/ui/core/mvc/View";
import Fragment from "sap/ui/core/Fragment";
import Control from "sap/ui/core/Control";

/**
 * @namespace santos.sapui5ts.helper
 */
export default class HelloDialogHelper extends ManagedObject {
    private dialog : Dialog;
    private view? : View | Control;

    constructor(view : View | Control) {
        super();
        this.view = view;
    }

    public exit(): void {
        delete this.view;
    }

    //Open HelloDialog
    public async open() : Promise<void> {       
        const view = this.view;

        //Simulate a controller
        const oFragmentController = {
            onOkButtonPress: function() {
                ((view as View)?.byId("idHelloDialog") as Dialog).close();
            }
        }
        //load asynctonous XML fragment
        this.dialog ??= await (Fragment.load({
            id: (view as View)?.getId(),
            name: "santos.sapui5ts.fragments.HelloDialog",
            controller: oFragmentController
        }) as Promise<Dialog>);
        
        (view as View)?.addDependent(this.dialog);
        this.dialog.open();
    }
}