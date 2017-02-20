> ## 概述

优秀的jQuery树插件zTree的功能扩展，实现对树节点名字模糊查询并展示的方法

> ## Quick Start （使用简例）


* ### 示例代码1：
  
  ```html
  <script type="text/javascript" src="jquery.ztree.all.min.js"></script>
  <script type="text/javascript" src="jquery.ztree.search.js"></script>
  <script type="text/javascript">
    var zTreeObj = $.fn.zTree.init($("#tree"), setting, zNodes);
  </script>
  
  <input type="text" value="" id="in" />
  <input type="button" value="SEARCH" onclick="zTreeObj.searchNodes($('#in').val())" />
  ```
  
  * ##### 描述：
  
    - jquery.ztree.search.js必须在jquery.ztree.all.min.js下方引入
    - 点击search按钮，zTree对象zTreeObj在页面上的显示状态就为按输入框中值搜索后的结果，清空输入框会擦出高亮展示，tree视图不改变
  

> ## 文档

* ### 配置

  ```javascript
  var setting = {
    highlightCss: {"font-weight":"bold"},
    disHighlightCss: {"font-weight":"inherit"}, 
    delayTime: 500
  }
  ```

  * #### 说明：
    
    * highlightCss
      
      高亮节点css，优先于setting.view.fontCss配置，默认值{"font-weight":"bold"}

    * disHighlightCss
      
      取消高亮节点css，setting.view.fontCss配置优先，默认值{"font-weight":"inherit"}
      
      如果highlightCss中设置了color，fontCss中也设置了节点初始color，那么可以不用设置disHighlightCss的color，如果fontCss没有设置color，就需要设置disHighlightCss的color，否则节点高亮后无法取消高亮
    
    * delayTime 
    
      延迟加载时间，设置方法searchNodesLazy的默认延时时间，单位毫秒
    
* ### 方法

  ```javascript
  zTreeObj: {
    searchNodes(value)
    searchNodesLazy(value[, delay])
  }
  ```

  * #### 说明：
    
    * searchNodes(value)
      
      搜索节点名称包含value的节点，并展开到所有搜索到的节点

    * searchNodesLazy(value[, delay])
      
      延时调用方法searchNodes(value)，参数delay默认500毫秒，也可以通过setting.view.delayTime设置，方法中的delay优先级高于setting中的delayTime
      
      文本框的键盘事件触发搜索建议使用该方法，否则会导致树不断收缩和展开，同时也可能发生树收缩后无法展开的问题
