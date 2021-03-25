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
     * Конкретные Компоненты предоставляют реализации поведения по умолчанию. Может
     * быть несколько вариаций этих классов.
     */
    var ConcreteComponent = /** @class */ (function () {
        function ConcreteComponent() {
        }
        ConcreteComponent.prototype.operation = function () {
            return "ConcreteComponent";
        };
        return ConcreteComponent;
    }());
    /**
     * Базовый класс Декоратора следует тому же интерфейсу, что и другие компоненты.
     * Основная цель этого класса - определить интерфейс обёртки для всех конкретных
     * декораторов. Реализация кода обёртки по умолчанию может включать в себя поле
     * для хранения завёрнутого компонента и средства его инициализации.
     */
    var Decorator = /** @class */ (function () {
        function Decorator(component) {
            this.component = component;
        }
        /**
         * Декоратор делегирует всю работу обёрнутому компоненту.
         */
        Decorator.prototype.operation = function () {
            return this.component.operation();
        };
        return Decorator;
    }());
    /**
     * Конкретные Декораторы вызывают обёрнутый объект и изменяют его результат
     * некоторым образом.
     */
    var ConcreteDecoratorA = /** @class */ (function (_super) {
        __extends(ConcreteDecoratorA, _super);
        function ConcreteDecoratorA() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Декораторы могут вызывать родительскую реализацию операции, вместо того,
         * чтобы вызвать обёрнутый объект напрямую. Такой подход упрощает расширение
         * классов декораторов.
         */
        ConcreteDecoratorA.prototype.operation = function () {
            return "ConcreteDecoratorA(" + _super.prototype.operation.call(this) + ")";
        };
        return ConcreteDecoratorA;
    }(Decorator));
    /**
     * Декораторы могут выполнять своё поведение до или после вызова обёрнутого
     * объекта.
     */
    var ConcreteDecoratorB = /** @class */ (function (_super) {
        __extends(ConcreteDecoratorB, _super);
        function ConcreteDecoratorB() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ConcreteDecoratorB.prototype.operation = function () {
            return "ConcreteDecoratorB(" + _super.prototype.operation.call(this) + ")";
        };
        return ConcreteDecoratorB;
    }(Decorator));
    /**
     * Клиентский код работает со всеми объектами, используя интерфейс Компонента.
     * Таким образом, он остаётся независимым от конкретных классов компонентов, с
     * которыми работает.
     */
    function clientCode(component) {
        console.log("RESULT: " + component.operation());
    }
    /**
     * Таким образом, клиентский код может поддерживать как простые компоненты...
     */
    var simple = new ConcreteComponent();
    console.log("Client: I've got a simple component:");
    clientCode(simple);
    console.log("");
    /**
     * ...так и декорированные.
     *
     * Обратите внимание, что декораторы могут обёртывать не только простые
     * компоненты, но и другие декораторы.
     */
    var decorator1 = new ConcreteDecoratorA(simple);
    var decorator2 = new ConcreteDecoratorB(decorator1);
    console.log("Client: Now I've got a decorated component:");
    clientCode(decorator2);
}
