import ManagedObject from "sap/ui/base/ManagedObject";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace santos.sapui5ts.model
 */
export default class ClientsModel extends ManagedObject {

    create (): JSONModel {
        let oClient: object = {
            client: {
                name: "Santos",
                age: 32,
                color: "blue"
                
            }
        };
        return new JSONModel(oClient);
    }

}