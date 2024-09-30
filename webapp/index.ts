import Text from "sap/m/Text";
import XMLView from "sap/ui/core/mvc/XMLView";

new Text({
    text: "Hello World from index.ts"
}).placeAt("content");

XMLView.create({
    viewName: "santos.sapui5ts.view.App"
}).then((oView): XMLView => oView.placeAt("content"))