import mockserver from "../localService/mockserver";

// Initialize the mock server
mockserver.init();

// Initialize the embedded component on the HTML page
import("sap/ui/core/ComponentSupport");