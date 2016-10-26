/*global define */
define(function (require) {
	'use strict';

	return {
		layout: require('tpl!templates/mainLayout.tmpl'),
		leftNav: require('tpl!templates/leftMenuBar.tmpl'),

		//Monster Collection Templates
		monsterItem: require('tpl!templates/monsterItem.tmpl'),
		monsterCollection: require('tpl!templates/monsterCollection.tmpl'),
		monsterCollectionEmpty: require('tpl!templates/monsterCollectionEmpty.tmpl'),

		//Monster Detail Templates
		monsterDetail: require('tpl!templates/monsterDetail.tmpl'),
		addGuestFields: require('tpl!templates/addGuestFields.tmpl'),		
		monsterEmptyView: require('tpl!templates/monsterEmptyView.tmpl')
	}
})