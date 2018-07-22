;(function (window, undef) {
    var SimulationSelect = function (config) {
        this.config = Object.assign({
            data: []
        }, config)
        this.el = document.querySelector(this.config.el)
        this.options = []
        this.options.selectIndex = 0
        this.value = ''
        this.init()
    }   
    SimulationSelect.prototype = {
        constructor: SimulationSelect,
        init: function () {
            this.render()
            this.bindEvent()
        },
        getUIItem: function () {
            return [].slice.apply(this.el.querySelectorAll('[data-ui="select-item"]')).map(function (item) {
                return {
                    id: (item.getAttribute('value') !== null) ? item.getAttribute('value') : item.textContent,
                    key: item.textContent
                }
            })
        },
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
        render: function () {
            var container = document.createElement('div')
            container.innerHTML = this.template()
            this.el.textContent = ''
            while (container.firstElementChild) {
                this.el.appendChild(container.firstElementChild)
            }
            this.options = this.el.querySelectorAll('li')
            delete container
        },
        bindEvent: function () {
            var self = this
            // 创建事件
            var event = new CustomEvent("change", {"detail":{"select":true}})
            var ul = self.el.querySelector('ul')
            ul.style.display = 'none'
            this.el.addEventListener('click', function (e) {
                var tagName = e.target.tagName
                if (tagName === "INPUT") {
                    ul.style.display = (ul.style.display === 'none' ? 'block' : 'none')
                } else if (tagName === 'LI') {
                    ul.style.display = 'none'
                    if (self._prevItem === e.target) {
                        return
                    }
                    self._prevItem = e.target
                    this.children[0].value = e.target.textContent
                    self.options.selectIndex = self.getIndex(e.target)
                    self.value = e.target.dataset.id
                    // 分发事件
                    self.el.dispatchEvent(event)
                }
                e.stopPropagation()
            }, false)
            ul.children[0].click()
            document.addEventListener('click', function () {
                ul.style.display = 'none'
            }, false)
        },
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