{
    /**
     * Класс Фасада предоставляет простой интерфейс для сложной логики одной или
     * нескольких подсистем. Фасад делегирует запросы клиентов соответствующим
     * объектам внутри подсистемы. Фасад также отвечает за управление их жизненным
     * циклом. Все это защищает клиента от нежелательной сложности подсистемы.
     */
    var Facade = /** @class */ (function () {
        /**
         * В зависимости от потребностей вашего приложения вы можете предоставить
         * Фасаду существующие объекты подсистемы или заставить Фасад создать их
         * самостоятельно.
         */
        function Facade(subsystem1, subsystem2) {
            if (subsystem1 === void 0) { subsystem1 = null; }
            if (subsystem2 === void 0) { subsystem2 = null; }
            this.subsystem1 = subsystem1 || new Subsystem1_1();
            this.subsystem2 = subsystem2 || new Subsystem2_1();
        }
        /**
         * Методы Фасада удобны для быстрого доступа к сложной функциональности
         * подсистем. Однако клиенты получают только часть возможностей подсистемы.
         */
        Facade.prototype.operation = function () {
            var result = "Facade initializes subsystems:\n";
            result += this.subsystem1.operation1();
            result += this.subsystem2.operation1();
            result += "Facade orders subsystems to perform the action:\n";
            result += this.subsystem1.operationN();
            result += this.subsystem2.operationZ();
            return result;
        };
        return Facade;
    }());
    /**
     * Подсистема может принимать запросы либо от фасада, либо от клиента напрямую.
     * В любом случае, для Подсистемы Фасад – это еще один клиент, и он не является
     * частью Подсистемы.
     */
    var Subsystem1_1 = /** @class */ (function () {
        function Subsystem1() {
        }
        Subsystem1.prototype.operation1 = function () {
            return "Subsystem1: Ready!\n";
        };
        Subsystem1.prototype.operationN = function () {
            return "Subsystem1: Go!\n";
        };
        return Subsystem1;
    }());
    /**
     * Некоторые фасады могут работать с разными подсистемами одновременно.
     */
    var Subsystem2_1 = /** @class */ (function () {
        function Subsystem2() {
        }
        Subsystem2.prototype.operation1 = function () {
            return "Subsystem2: Get ready!\n";
        };
        // ...
        Subsystem2.prototype.operationZ = function () {
            return "Subsystem2: Fire!";
        };
        return Subsystem2;
    }());
    /**
     * Клиентский код работает со сложными подсистемами через простой интерфейс,
     * предоставляемый Фасадом. Когда фасад управляет жизненным циклом подсистемы,
     * клиент может даже не знать о существовании подсистемы. Такой подход позволяет
     * держать сложность под контролем.
     */
    function clientCodeFacade(facade) {
        console.log(facade.operation());
    }
    /**
     * В клиентском коде могут быть уже созданы некоторые объекты подсистемы. В этом
     * случае может оказаться целесообразным инициализировать Фасад с этими
     * объектами вместо того, чтобы позволить Фасаду создавать новые экземпляры.
     */
    var subsystem1 = new Subsystem1_1();
    var subsystem2 = new Subsystem2_1();
    var facade = new Facade(subsystem1, subsystem2);
    clientCodeFacade(facade);
}
