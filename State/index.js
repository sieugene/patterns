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
     * Контекст определяет интерфейс, представляющий интерес для клиентов. Он также
     * хранит ссылку на экземпляр подкласса Состояния, который отображает текущее
     * состояние Контекста.
     */
    var Context = /** @class */ (function () {
        function Context(state) {
            this.transitionTo(state);
        }
        /**
         * Контекст позволяет изменять объект Состояния во время выполнения.
         */
        Context.prototype.transitionTo = function (state) {
            console.log("Context: Transition to " + state.constructor.name + ".");
            this.state = state;
            this.state.setContext(this);
        };
        /**
         * Контекст делегирует часть своего поведения текущему объекту Состояния.
         */
        Context.prototype.request1 = function () {
            this.state.handle1();
        };
        Context.prototype.request2 = function () {
            this.state.handle2();
        };
        return Context;
    }());
    /**
     * Базовый класс Состояния объявляет методы, которые должны реализовать все
     * Конкретные Состояния, а также предоставляет обратную ссылку на объект
     * Контекст, связанный с Состоянием. Эта обратная ссылка может использоваться
     * Состояниями для передачи Контекста другому Состоянию.
     */
    var State = /** @class */ (function () {
        function State() {
        }
        State.prototype.setContext = function (context) {
            this.context = context;
        };
        return State;
    }());
    /**
     * Конкретные Состояния реализуют различные модели поведения, связанные с
     * состоянием Контекста.
     */
    var ConcreteStateA_1 = /** @class */ (function (_super) {
        __extends(ConcreteStateA, _super);
        function ConcreteStateA() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ConcreteStateA.prototype.handle1 = function () {
            console.log("ConcreteStateA handles request1.");
            console.log("ConcreteStateA wants to change the state of the context.");
            this.context.transitionTo(new ConcreteStateB_1());
        };
        ConcreteStateA.prototype.handle2 = function () {
            console.log("ConcreteStateA handles request2.");
        };
        return ConcreteStateA;
    }(State));
    var ConcreteStateB_1 = /** @class */ (function (_super) {
        __extends(ConcreteStateB, _super);
        function ConcreteStateB() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ConcreteStateB.prototype.handle1 = function () {
            console.log("ConcreteStateB handles request1.");
        };
        ConcreteStateB.prototype.handle2 = function () {
            console.log("ConcreteStateB handles request2.");
            console.log("ConcreteStateB wants to change the state of the context.");
            this.context.transitionTo(new ConcreteStateA_1());
        };
        return ConcreteStateB;
    }(State));
    var context = new Context(new ConcreteStateA_1());
    context.request1();
    context.request2();
    context.request2();
}
