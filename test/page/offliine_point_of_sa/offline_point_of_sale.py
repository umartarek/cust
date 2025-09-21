# Copyright (c) 2025, Offline POS Extension
# License: GNU General Public License v3. See license.txt

import json

import frappe

# Reuse existing POS server-side logic to keep parity with online page
import point_of_sale as core


@frappe.whitelist()
def get_items(start, page_length, price_list, item_group, pos_profile, search_term=""):
	return core.get_items(start, page_length, price_list, item_group, pos_profile, search_term)


@frappe.whitelist()
@frappe.validate_and_sanitize_search_inputs
def item_group_query(doctype, txt, searchfield, start, page_len, filters):
	return core.item_group_query(doctype, txt, searchfield, start, page_len, filters)


@frappe.whitelist()
def check_opening_entry(user):
	return core.check_opening_entry(user)


@frappe.whitelist()
def create_opening_voucher(pos_profile, company, balance_details):
	return core.create_opening_voucher(pos_profile, company, balance_details)


@frappe.whitelist()
def get_past_order_list(search_term, status, limit=20):
	return core.get_past_order_list(search_term, status, limit)


@frappe.whitelist()
def set_customer_info(fieldname, customer, value=""):
	return core.set_customer_info(fieldname, customer, value)


@frappe.whitelist()
def get_pos_profile_data(pos_profile):
	return core.get_pos_profile_data(pos_profile)


@frappe.whitelist()
def search_for_serial_or_batch_or_barcode_number(search_value: str) -> dict[str, str | None]:
	return core.search_for_serial_or_batch_or_barcode_number(search_value)


