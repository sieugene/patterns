var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
{
    /**
     * Базовый класс Компонент объявляет общие операции как для простых, так и для
     * сложных объектов структуры.
     */
    var Component = /** @class */ (function () {
        function Component() {
        }
        /**
         * При необходимости базовый Компонент может объявить интерфейс для
         * установки и получения родителя компонента в древовидной структуре. Он
         * также может предоставить некоторую реализацию по умолчанию для этих
         * методов.
         */
        Component.prototype.setParent = function (parent) {
            this.parent = parent;
        };
        Component.prototype.getParent = function () {
            return this.parent;
        };
        /**
         * В некоторых случаях целесообразно определить операции управления
         * потомками прямо в базовом классе Компонент. Таким образом, вам не нужно
         * будет предоставлять конкретные классы компонентов клиентскому коду, даже
         * во время сборки дерева объектов. Недостаток такого подхода в том, что эти
         * методы будут пустыми для компонентов уровня листа.
         */
        Component.prototype.add = function (component) { };
        Component.prototype.remove = function (component) { };
        /**
         * Вы можете предоставить метод, который позволит клиентскому коду понять,
         * может ли компонент иметь вложенные объекты.
         */
        Component.prototype.isComposite = function () {
            return false;
        };
        return Component;
    }());
    /**
     * Класс Лист представляет собой конечные объекты структуры. Лист не может иметь
     * вложенных компонентов.
     *
     * Обычно объекты Листьев выполняют фактическую работу, тогда как объекты
     * Контейнера лишь делегируют работу своим подкомпонентам.
     */
    var Leaf = /** @class */ (function (_super) {
        __extends(Leaf, _super);
        function Leaf() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Leaf.prototype.operation = function () {
            return "Leaf";
        };
        return Leaf;
    }(Component));
    /**
     * Класс Контейнер содержит сложные компоненты, которые могут иметь вложенные
     * компоненты. Обычно объекты Контейнеры делегируют фактическую работу своим
     * детям, а затем «суммируют» результат.
     */
    var Composite = /** @class */ (function (_super) {
        __extends(Composite, _super);
        function Composite() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.children = [];
            return _this;
        }
        /**
         * Объект контейнера может как добавлять компоненты в свой список вложенных
         * компонентов, так и удалять их, как простые, так и сложные.
         */
        Composite.prototype.add = function (component) {
            this.children.push(component);
            component.setParent(this);
        };
        Composite.prototype.remove = function (component) {
            var componentIndex = this.children.indexOf(component);
            this.children.splice(componentIndex, 1);
            component.setParent(null);
        };
        Composite.prototype.isComposite = function () {
            return true;
        };
        Composite.prototype.operation = function () {
            var result = [];
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                result.push(child.operation());
            }
            return "Branch(" + result.join("+") + ")";
        };
        return Composite;
    }(Component));
    /**
     * Клиентский код работает со всеми компонентами через базовый интерфейс.
     */
    function clientCodeComposite(component) {
        console.log("RESULT: " + component.operation());
    }
    /**
     * Таким образом, клиентский код может поддерживать простые компоненты-листья...
     */
    var simple = new Leaf();
    console.log("Client: I've got a simple component:");
    clientCodeComposite(simple);
    console.log("");
    /**
     * ...а также сложные контейнеры.
     */
    var tree = new Composite();
    var branch1 = new Composite();
    branch1.add(new Leaf());
    branch1.add(new Leaf());
    var branch2 = new Composite();
    branch2.add(new Leaf());
    tree.add(branch1);
    tree.add(branch2);
    console.log("Client: Now I've got a composite tree:");
    clientCodeComposite(tree);
    console.log("---------- CLIENT CODE 1 END ----------");
    /**
     * Благодаря тому, что операции управления потомками объявлены в базовом классе
     * Компонента, клиентский код может работать как с простыми, так и со сложными
     * компонентами, вне зависимости от их конкретных классов.
     */
    function clientCode2(component1, component2) {
        if (component1.isComposite()) {
            component1.add(component2);
            console.log("RESULT: " + component1.operation());
        }
    }
    console.log("Client: I don't need to check the components classes even when managing the tree:");
    clientCode2(tree, simple);
}
