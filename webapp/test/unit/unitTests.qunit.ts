/* @sapUiRequire */
QUnit.config.autostart = false;

// import all your QUnit tests here
void Promise.all([
    import("santos/sapui5ts/test/unit/model/formatter")
]).then(() => {
    QUnit.start();
});