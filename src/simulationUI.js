;(function (window, undef) {
    var SimulationSelect = function (config) {
        this.config = config || {}
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
        template: function () {
            return `<input type="text" readonly="readonly">
                <ul>
                    <li>list01</li>
                    <li>list02</li>
                    <li>list03</li>
                    <li>list04</li>
                    <li>list05</li>
                </ul>`
        },
        render: function () {
            var container = document.createElement('div')
            container.innerHTML = this.template()
            while (container.firstElementChild) {
                this.el.appendChild(container.firstElementChild)
            }
            this.options = this.el.querySelectorAll('li')
            delete container
        },
        bindEvent: function () {
            var self = this
            this.el.addEventListener('click', function (e) {
                var tagName = e.target.tagName
                if (tagName === "INPUT") {
                    e.target.nextElementSibling.style.display = 'block'
                } else if (tagName === 'LI') {
                    e.target.parentNode.style.display = 'none'
                    this.children[0].value = e.target.textContent
                    self.options.selectIndex = self.getIndex(e.target)
                    self.value = e.target.textContent

                    // 创建并分发事件
                    var event = new CustomEvent("change", {"detail":{"hazcheeseburger":true}})
                    self.el.dispatchEvent(event)
                }
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