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
     * Абстрактный Класс определяет шаблонный метод, содержащий скелет некоторого
     * алгоритма, состоящего из вызовов (обычно) абстрактных примитивных операций.
     *
     * Конкретные подклассы должны реализовать эти операции, но оставить сам
     * шаблонный метод без изменений.
     */
    var AbstractClass = /** @class */ (function () {
        function AbstractClass() {
        }
        /**
         * Шаблонный метод определяет скелет алгоритма.
         */
        AbstractClass.prototype.templateMethod = function () {
            this.baseOperation1();
            this.requiredOperations1();
            this.baseOperation2();
            this.hook1();
            this.requiredOperation2();
            this.baseOperation3();
            this.hook2();
        };
        /**
         * Эти операции уже имеют реализации.
         */
        AbstractClass.prototype.baseOperation1 = function () {
            console.log("AbstractClass says: I am doing the bulk of the work");
        };
        AbstractClass.prototype.baseOperation2 = function () {
            console.log("AbstractClass says: But I let subclasses override some operations");
        };
        AbstractClass.prototype.baseOperation3 = function () {
            console.log("AbstractClass says: But I am doing the bulk of the work anyway");
        };
        /**
         * Это «хуки». Подклассы могут переопределять их, но это не обязательно,
         * поскольку у хуков уже есть стандартная (но пустая) реализация. Хуки
         * предоставляют дополнительные точки расширения в некоторых критических
         * местах алгоритма.
         */
        AbstractClass.prototype.hook1 = function () { };
        AbstractClass.prototype.hook2 = function () { };
        return AbstractClass;
    }());
    /**
     * Конкретные классы должны реализовать все абстрактные операции базового
     * класса. Они также могут переопределить некоторые операции с реализацией по
     * умолчанию.
     */
    var ConcreteClass1 = /** @class */ (function (_super) {
        __extends(ConcreteClass1, _super);
        function ConcreteClass1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ConcreteClass1.prototype.requiredOperations1 = function () {
            console.log("ConcreteClass1 says: Implemented Operation1");
        };
        ConcreteClass1.prototype.requiredOperation2 = function () {
            console.log("ConcreteClass1 says: Implemented Operation2");
        };
        return ConcreteClass1;
    }(AbstractClass));
    /**
     * Обычно конкретные классы переопределяют только часть операций базового
     * класса.
     */
    var ConcreteClass2 = /** @class */ (function (_super) {
        __extends(ConcreteClass2, _super);
        function ConcreteClass2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ConcreteClass2.prototype.requiredOperations1 = function () {
            console.log("ConcreteClass2 says: Implemented Operation1");
        };
        ConcreteClass2.prototype.requiredOperation2 = function () {
            console.log("ConcreteClass2 says: Implemented Operation2");
        };
        ConcreteClass2.prototype.hook1 = function () {
            console.log("ConcreteClass2 says: Overridden Hook1");
        };
        return ConcreteClass2;
    }(AbstractClass));
    /**
     * Клиентский код вызывает шаблонный метод для выполнения алгоритма. Клиентский
     * код не должен знать конкретный класс объекта, с которым работает, при
     * условии, что он работает с объектами через интерфейс их базового класса.
     */
    function clientCodeTemplateMethod(abstractClass) {
        // ...
        abstractClass.templateMethod();
        // ...
    }
    console.log("Same client code can work with different subclasses:");
    clientCodeTemplateMethod(new ConcreteClass1());
    console.log("");
    console.log("Same client code can work with different subclasses:");
    clientCodeTemplateMethod(new ConcreteClass2());
}
