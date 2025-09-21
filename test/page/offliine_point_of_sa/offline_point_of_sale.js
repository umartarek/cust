frappe.provide("erpnext.PointOfSale");

frappe.pages["offline-point-of-sale"].on_page_load = function (wrapper) {
	frappe.ui.make_app_page({
		parent: wrapper,
		title: __("Offline Point of Sale"),
		single_column: true,
	});

	frappe.require("pos_offline.js", function () {
		if (erpnext.PointOfSale.Offline) {
			erpnext.PointOfSale.Offline.init().catch(() => {});
		}
		frappe.require("point-of-sale.bundle.js", function () {
			wrapper.pos = new erpnext.PointOfSale.Controller(wrapper);
			window.cur_pos = wrapper.pos;
		});
	});
};

frappe.pages["offline-point-of-sale"].refresh = function (wrapper) {
	if (document.scannerDetectionData) {
		onScan.detachFrom(document);
		wrapper.pos.wrapper.html("");
		wrapper.pos.check_opening_entry();
	}
};


