{
    /**
     * Контекст определяет интерфейс, представляющий интерес для клиентов.
     */
    var Context = /** @class */ (function () {
        /**
         * Обычно Контекст принимает стратегию через конструктор, а также
         * предоставляет сеттер для её изменения во время выполнения.
         */
        function Context(strategy) {
            this.strategy = strategy;
        }
        /**
         * Обычно Контекст позволяет заменить объект Стратегии во время выполнения.
         */
        Context.prototype.setStrategy = function (strategy) {
            this.strategy = strategy;
        };
        /**
         * Вместо того, чтобы самостоятельно реализовывать множественные версии
         * алгоритма, Контекст делегирует некоторую работу объекту Стратегии.
         */
        Context.prototype.doSomeBusinessLogic = function () {
            // ...
            console.log("Context: Sorting data using the strategy (not sure how it'll do it)");
            var result = this.strategy.doAlgorithm(["a", "b", "c", "d", "e"]);
            console.log(result.join(","));
            // ...
        };
        return Context;
    }());
    /**
     * Конкретные Стратегии реализуют алгоритм, следуя базовому интерфейсу
     * Стратегии. Этот интерфейс делает их взаимозаменяемыми в Контексте.
     */
    var ConcreteStrategyA = /** @class */ (function () {
        function ConcreteStrategyA() {
        }
        ConcreteStrategyA.prototype.doAlgorithm = function (data) {
            return data.sort();
        };
        return ConcreteStrategyA;
    }());
    var ConcreteStrategyB = /** @class */ (function () {
        function ConcreteStrategyB() {
        }
        ConcreteStrategyB.prototype.doAlgorithm = function (data) {
            return data.reverse();
        };
        return ConcreteStrategyB;
    }());
    /**
     * Клиентский код выбирает конкретную стратегию и передаёт её в контекст. Клиент
     * должен знать о различиях между стратегиями, чтобы сделать правильный выбор.
     */
    var context = new Context(new ConcreteStrategyA());
    console.log("Client: Strategy is set to normal sorting.");
    context.doSomeBusinessLogic();
    console.log("");
    console.log("Client: Strategy is set to reverse sorting.");
    context.setStrategy(new ConcreteStrategyB());
    context.doSomeBusinessLogic();
}
