/**
 * JQuery zTree search v1.0
 * https://www.juwends.com
 * 
 * Copyright (c) 2017 dinghui.ye
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($) {
	var searchModule = {
		// fuzzy search with value
		searchNodes: function(value) {
			// close highlight
			var allNodes = this.transformToArray(this.getNodes());
			for (var i in allNodes) {
				allNodes[i].highlight = false;
				this.updateNode(allNodes[i]);
			}
			
			if (value == '') return; // input '' wipe highlight

			// shrink all nodes
			this.expandAll(false);

			// search nodes
			var nodes = this.getNodesByParamFuzzy('name', value);
			// highlight searched nodes and expand them
			for (var i in nodes) {
				nodes[i].highlight = true;
				this.updateNode(nodes[i]);
				// it must expand first node first, or it can't expend to specific node
				this.expandNode(this.getNodes()[0],true); 
				this.expandNode(nodes[i].getParentNode(),true);
			}
		},
		searchNodesLazy: function(value, delay) {
			var searchId = this.searchId;
			// if it is still in delayed period and another search is coming, it should clear last search request
			if (searchId) {
				clearTimeout(searchId);
			}
			var delayTime = this.setting.delayTime;
			var that = this;
			this.searchId = setTimeout(function(){
				that.searchNodes(value);	
			}, delay ? delay : delayTime ? delayTime : 500); // user setting delayTime
		},
		getFontCss: function(treeObj) {
			var highlightCss = treeObj.setting.highlightCss; // user setting highlightCss
			var disHighlightCss = treeObj.setting.disHighlightCss; // user setting disHighlightCss
			if (!highlightCss) {
				highlightCss = {"font-weight":"bold"};
			}
			if (!disHighlightCss) {
				disHighlightCss = {"font-weight":"inherit"};
			}
			var defaultStyle = treeObj.setting.view.fontCss;
			if (typeof (defaultStyle) == 'function') {
				return (
					function (treeId, treeNode) {
						return (treeNode.highlight) ? 
							$.extend(true, {}, defaultStyle(treeId, treeNode), highlightCss) :  // highlightStyle
							$.extend(true, {}, disHighlightCss, defaultStyle(treeId, treeNode)); // defaultStyle
					});
			}
			return (
				function (treeId, treeNode) {
					return (treeNode.highlight) ? 
						$.extend(true, {}, defaultStyle, highlightCss) :  // highlightStyle
						$.extend(true, {}, disHighlightCss, defaultStyle); // defaultStyle
				});
		}
	};
	var init = $.fn.zTree.init;
	$.fn.zTree.init = function(obj, zSetting, zNodes) {
		var treeObj = init(obj, zSetting, zNodes);
		treeObj.searchNodes = searchModule.searchNodes;
		treeObj.searchNodesLazy = searchModule.searchNodesLazy;
		treeObj.setting.view.fontCss = searchModule.getFontCss(treeObj);
		return treeObj;
	}
})(jQuery);

