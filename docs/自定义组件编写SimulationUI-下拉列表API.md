# simulationUI
simulation select element，自定义 `select` 下拉列表

重造轮子，模拟select下拉列表，以便自定义样式。
以下为编写过程中的笔记，欢迎交流指导。

[SimulationUI-下拉列表API](./自定义组件编写SimulationUI-下拉列表API)

[自定义组件编写-下拉列表之一概设](./自定义组件编写-下拉列表之一概设)

[自定义组件编写-下拉列表之二结构渲染](./自定义组件编写-下拉列表之二结构渲染)

[自定义组件编写-下拉列表之三事件绑定](./自定义组件编写-下拉列表之三事件绑定)


## 分别引入样式以及脚本
    <link rel="stylesheet" href="./src/css/simulation-ui.css">
    <script src='./src/simulationUI.js' charset='utf8'><script>

## 实例
1.使用元素属性 `data-ui="select-item"` 定义列表

    <div class="simulation-select" id="simSelect">
        <span value="0" data-ui="select-item">Chrome</span>
        <span value="1" data-ui="select-item">IE</span>
        <span value="3" data-ui="select-item">Firefox</span>
        <span value="4" data-ui="select-item">Opera</span>
    </div>
    <script>
        new SimulationSelect({
            el: '#simSelect'
        })
    </script>


2.使用自定义数据 `data` 定义列表
    
    <div class="simulation-select" id="simSelect"></div>
    <script>
        new SimulationSelect({
            el: '#simSelect',
            data: ['Chrome', 'IE', 'Firefox', 'Opera']
        })
    </script>

## API 文档

Class `SimulationSelect`

    var simSelect = new SimulationSelect(config)

参数 `config`，模拟下拉列表的配置对象
- el (String) - 元素选择器，需要模拟列表的容器
- data (Array) - 列表item的数据，item为`字符串`或包含`id,key的对象`

SimulationSelect 实例 `simSelect`
- `Property`
    - `config` {Object} 配置信息
    - `el` {Element} 模拟下拉列表的元素节点
    - `options` {Array} 列表的item元素组成的数组集合
        - `selectedIndex` 当前所选item的下标
    - `value` {String} 模拟列表的值
    - `selectedIndex` 当前所选`item`的下标值

- `Method`
    - `init()` 初始化组件
    - `getUIItem()` 返回通过声明式定义item的元素
    - `template()` 返回模拟下拉列表的字符串模板
    -  `render()` 渲染字符串模板并插入DOM
    - `bindEvent()` 绑定事件
    - `getIndex(element)`  获取传入元素的下标
- `Event`

新增自定义事件`change`，当item选项改变即触发该事件处理函数，与`select`类似

    simSelect.addEventListener('change', function (e) {
        // 事件处理函数
    }, true)

## 参考文档

https://developer.mozilla.org/zh-CN/docs/Web/API

## License
MIT
