import Control from "sap/ui/core/Control";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import { MetadataOptions } from "sap/ui/core/Element";
import RenderManager from "sap/ui/core/RenderManager";
import RatingIndicator, { RatingIndicator$LiveChangeEvent } from "sap/m/RatingIndicator";
import Label from "sap/m/Label";
import Button, { Button$PressEvent } from "sap/m/Button";

/**
 * @namespace santos.sapui5ts.control
 */
export default class ProductRating extends Control {

    public static readonly metadata: MetadataOptions = {
        properties : {
            value: { 
                type: "float",
                defaultValue: 0
            }
        },
        aggregations: {
            _rating: {
                type: "sap.m.RatingIndicator",
                multiple: false,
                visibility: "hidden"
            },
            _label: {
                type: "sap.m.Label",
                multiple: false,
                visibility: "hidden"
            },
            _button: {
                type: "sap.m.Button",
                multiple: false,
                visibility: "hidden"
            }
        },
        events: {
            change: {
                parameters: {
                    value: "int",
                }
            } 
        }
    }

    //Initialize controls
    public init(): void {
        this.setAggregation("_rating", new RatingIndicator({
            value: this.getValue(),
            iconSize: "2rem",
            liveChange: this._onRate.bind(this)
        }));

        this.setAggregation("_label", new Label({
            text: "{i18n>productRatingLabelInitial}"
        }).addStyleClass("sapUiSmallMargin"));

        this.setAggregation("_button", new Button({
            text: "{i18n>productRatingButton}",
            press: this._onSubmit.bind(this)
        }).addStyleClass("sapUiTinyMarginTop"));
    }

    public reset(): void {
        const resourceBundle = (this?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
        const i18nProductRatingLabelInitial = resourceBundle.getText("productRatingLabelInitial")

        this.setValue(0);
        (this.getAggregation("_label") as Label).setDesign("Standard");
        (this.getAggregation("_rating") as RatingIndicator).setEnabled(true);
        (this.getAggregation("_label") as Label).setText(i18nProductRatingLabelInitial);
        (this.getAggregation("_button") as Button).setEnabled(true);
    }

    public renderer = {
        apiVersion: 4,
        render: (rm: RenderManager, control: ProductRating) => {
            rm.openStart("div", control);
            rm.class("myAppDemoWTProductRating");
            rm.openEnd();
            rm.renderControl(control.getAggregation("_rating") as Control);
            rm.renderControl(control.getAggregation("_label") as Control);
            rm.renderControl(control.getAggregation("_button") as Control);
            rm.close("div");
        }
    }

    private _onRate(event: RatingIndicator$LiveChangeEvent): void {
        const value = event.getParameter("value");
        const maxValue = (event.getSource() as RatingIndicator).getMaxValue();
        const resourceBundle = (this?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
        const i18nProductRatingLabelIndicator = resourceBundle.getText("productRatingLabelIndicator", [value, maxValue]);

        this.setProperty("value", value, true);

        (this.getAggregation("_label") as Label).setText(i18nProductRatingLabelIndicator);
        (this.getAggregation("_label") as Label).setDesign("Bold");
    }

    private _onSubmit(event: Button$PressEvent) {
        const resourceBundle = (this?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
        const i18nProductRatingLabelFinal = resourceBundle.getText("productRatingLabelFinal");

        (this.getAggregation("_rating") as RatingIndicator).setEnabled(false);
        (this.getAggregation("_label") as Label).setText(i18nProductRatingLabelFinal);
        (this.getAggregation("_button") as Button).setEnabled(false);
        
        this.fireEvent("change", {
            value: this.getValue()
        });
    }

    private setValue(value: float): ProductRating {
        this.setProperty("value", value, true);
        (this.getAggregation("_rating") as RatingIndicator).setValue(value);

        return this;
    }

    private getValue(): number {
        return this.getProperty("value");
    }

};