import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import History from "sap/ui/core/routing/History";
import ProductRating, { ProductRating$ChangeEvent } from "../control/ProductRating";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import MessageToast from "sap/m/MessageToast";

/**
 * @namespace santos.sapui5ts.controller
 */
export default class Detail extends Controller {
    onInit(): void | undefined {
        const router = UIComponent.getRouterFor(this);
        router.getRoute("detail")?.attachPatternMatched(this.onObjectMatched, this);
    }

    private onObjectMatched(event: Route$PatternMatchedEvent): void {
        const invoicePath = (event.getParameter("arguments") as any).invoicePath;
        const uriDecoder = "/" + window.decodeURIComponent(invoicePath);

        //Reset Rating
        (this.byId("idProductRating") as ProductRating).reset();

        this.getView()?.bindElement({
            path: uriDecoder,
            model: "northwindModel"
        });
    }

    onPageItemNavButtonPress(): void {
        const history = History.getInstance();
        const previousHash = history.getPreviousHash();

        if (previousHash !== undefined){
            window.history.go(-1);
        }else {
            const router = UIComponent.getRouterFor(this);
            router.navTo("overview", {}, true);
        }
    }

    onProductRatingChange(event: ProductRating$ChangeEvent): void {
        const value = event.getParameter("value");
        const resourceBundle = (this.getView()?.getModel("i18n") as ResourceModel).getResourceBundle() as ResourceBundle;
        const i18nRatingConfirmation = resourceBundle.getText("ratingConfirmation", [value]) || "no text defined";

        MessageToast.show(i18nRatingConfirmation);
    }
};