QUnit.config.autostart = false;

// import all your OPA tests here
void Promise.all([
	import("santos/sapui5ts/test/integration/NavigationJourney")
]).then(() => {
	QUnit.start();
});