;(function (window, undef) {
    /**
     * SimulationSelect 模拟下拉列表构造函数
     * @param {Object} config - 模拟下拉列表配置项
     * config options
     *   - {Array} data 配置下拉列表数组，元素为字符串或键值对
     *   - {Element} el 组件的父元素容器
     *   - {HTMLElementOption} options 组件中的item列表，包含selectedIndex属性
     *   - {String} value 下拉列表的值
     *   - {Number} selectedIndex 下拉列表中所选的对应item下标
     */
    var SimulationSelect = function (config) {
        this.config = Object.assign({
            data: []
        }, config)
        this.el = document.querySelector(this.config.el)
        this.options = []
        this.selectedIndex = this.options.selectedIndex = 0
        this.value = ''
        this.init()
    }   
    SimulationSelect.prototype = {
        /**
         * 避免原型的指向constructor丢失
         */
        constructor: SimulationSelect,
        /**
         * 初始化函数
         */
        init: function () {
            this.render()
            this.bindEvent()
        },
        /**
         * 从结构中获取数据
         * @returns {Array} - 返回键值对组成的数组
         */
        getUIItem: function () {
            return [].slice.apply(this.el.querySelectorAll('[data-ui="select-item"]')).map(function (item) {
                return {
                    id: (item.getAttribute('value') !== null) ? item.getAttribute('value') : item.textContent,
                    key: item.textContent
                }
            })
        },
        /**
         * 组件模板生成函数
         * @returns {String} - 返回字符串模板
         */
        template: function () {
            var itemData = this.getUIItem().concat(this.config.data)
            return `<input type="text" readonly="readonly">
                <ul>
                    ${itemData.map(function (item) {
                        if (typeof item === 'object' && item !== null) {
                            return `<li data-id="${item.id}">${item.key}</li>`
                        }
                        return `<li data-id="${item}">${item}</li>`
                    }).join('')}
                </ul>`
        },
        /**
         * 生成并渲染结构，添加到文档中
         */
        render: function () {
             // 创建div元素节点
            var container = document.createElement('div')
            // 设置内容，其中内容之后通过template函数返回
            container.innerHTML = this.template()
            this.el.textContent = ''
             // 将生成的内容添加进el中
            while (container.firstElementChild) {
                this.el.appendChild(container.firstElementChild)
            }
            // 获取该父元素下所有的li元素，并赋值给options
            this.options = this.el.querySelectorAll('li')
            // 移除该节点
            container.remove()
        },
        /**
         * 绑定组件的事件处理函数
         */
        bindEvent: function () {
            var self = this
            // 创建事件
            var event = new CustomEvent("change", {"detail":{"select":true}})
            var ul = self.el.querySelector('ul')
            // 点击前先隐藏ul列表
            ul.style.display = 'none'
             // 给整个列表添加点击事件
            this.el.addEventListener('click', function (e) {
                var tagName = e.target.tagName
                if (tagName === "INPUT") {
                    // 目标元素input
                    // 判断ul列表的显隐
                    ul.style.display = (ul.style.display === 'none' ? 'block' : 'none')
                } else if (tagName === 'LI') {
                    // 目标元素li
                    ul.style.display = 'none'
                    if (self._prevItem === e.target) {
                        // 阻止重复点击LI
                        return
                    }
                    self._prevItem = e.target
                    this.children[0].value = e.target.textContent
                    self.selectedIndex = self.options.selectedIndex = self.getIndex(e.target)
                    self.value = e.target.dataset.id
                    // 分发事件
                    self.el.dispatchEvent(event)
                }
                 // 阻止事件冒泡
                e.stopPropagation()
            }, false)
            ul.children[0].click()
            document.addEventListener('click', function () {
                ul.style.display = 'none'
            }, false)
        },
        /**
         * 获取元素所在兄弟元素中的下标
         * @returns {Number} index - 选取的元素下标
         */
        getIndex: function (node) {
            var index = 0
            while(node.previousElementSibling) {
                index++
                node = node.previousElementSibling
            }
            return index
        }
    }
    window.SimulationSelect = SimulationSelect
}(window, void 0))