import MockServer from "sap/ui/core/util/MockServer";

export default {
    init: function () {

        // Create 
        const oMockServer = new MockServer({
            rootUri: sap.ui.require.toUrl("santos/sapui5ts/V2/Northwind/Northwind.svc/")
        });

        const urlParams = new URLSearchParams(window.location.search);

        // Configure mock server with a delay
        MockServer.config({
            autoRespond: true,
            autoRespondAfter: parseInt(urlParams.get("serverDelay") || "500")
        });

        // Simulate
        const sPath = sap.ui.require.toUrl("santos/sapui5ts/localService");
        const sMetadataUrl = sPath + "/metadata.xml"
        const sJsonFileRoot = sPath + "/mockdata"
        
        oMockServer.simulate(sMetadataUrl, {
            sMockdataBaseUrl: sJsonFileRoot,
            bGenerateMissingMockData: true
        });

        //Start
        oMockServer.start();
        // console.log("Mock server started! Now intercepting calls to: " + oMockServer.getRootUri());
    }
}