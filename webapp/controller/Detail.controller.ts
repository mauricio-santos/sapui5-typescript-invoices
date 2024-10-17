import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";

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

        this.getView()?.bindElement({
            path: uriDecoder,
            model: "northwindModel"
        });
    }
};