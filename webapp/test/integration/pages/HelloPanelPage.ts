import Opa5 from "sap/ui/test/Opa5";
import Press from "sap/ui/test/actions/Press";

export default class HelloPanelPage extends Opa5 {
    // Actions
    iPressTheSayHelloWithDialogButton() {
        return this.waitFor({
            id: "idHelloDialogButton",
            viewName: "santos.sapui5ts.view.HelloPanel",
            actions: new Press(),
            errorMessage: "Did not find the 'Hello Dialog' button on the HelloPanel view"
        });
    }

    // Assertions
    iShouldSeeTheHelloDialog() {
        return this.waitFor({
            controlType: "sap.m.Dialog",
            success: function () {
                // we set the view busy, so we need to query the parent of the app
                Opa5.assert.ok(true, "The Dialog is open");
            },
            errorMessage: "Did not find the dialog control"
        });
    }
}