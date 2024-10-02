/*We’ll replace the view with a UI component we’ve just created. 
To do this, we use a control called ComponentContainer. 
This control allows us to wrap a UI Component and place it in our HTML document. */

import ComponentContainer from "sap/ui/core/ComponentContainer"

new ComponentContainer({
    id: "container", //We assign the id property to “container” so that we can refer to it later if needed.
    name: "santos.sapui5ts", //We set the name property to the namespace of the component. This tells the ComponentContainer control which UI component it should load and show.
    settings: {
        id: "sapui5ts" //This id helps us identify our component among others that may be created during the application’s runtime.
    },
    autoPrefixId: true, //This automatically adds a prefix to the ID of the Component, which is the ID of the ComponentContainer followed by a single dash (”-“/).
    async: true //This allows the component and its dependencies to load in the background without blocking other parts of the application.

}).placeAt("content");