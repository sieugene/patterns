{
    /**
     * Некоторые команды способны выполнять простые операции самостоятельно.
     */
    var SimpleCommand = /** @class */ (function () {
        function SimpleCommand(payload) {
            this.payload = payload;
        }
        SimpleCommand.prototype.execute = function () {
            console.log("SimpleCommand: See, I can do simple things like printing (" + this.payload + ")");
        };
        return SimpleCommand;
    }());
    /**
     * Но есть и команды, которые делегируют более сложные операции другим объектам,
     * называемым «получателями».
     */
    var ComplexCommand = /** @class */ (function () {
        /**
         * Сложные команды могут принимать один или несколько объектов-получателей
         * вместе с любыми данными о контексте через конструктор.
         */
        function ComplexCommand(receiver, a, b) {
            this.receiver = receiver;
            this.a = a;
            this.b = b;
        }
        /**
         * Команды могут делегировать выполнение любым методам получателя.
         */
        ComplexCommand.prototype.execute = function () {
            console.log("ComplexCommand: Complex stuff should be done by a receiver object.");
            this.receiver.doSomething(this.a);
            this.receiver.doSomethingElse(this.b);
        };
        return ComplexCommand;
    }());
    /**
     * Классы Получателей содержат некую важную бизнес-логику. Они умеют выполнять
     * все виды операций, связанных с выполнением запроса. Фактически, любой класс
     * может выступать Получателем.
     */
    var Receiver = /** @class */ (function () {
        function Receiver() {
        }
        Receiver.prototype.doSomething = function (a) {
            console.log("Receiver: Working on (" + a + ".)");
        };
        Receiver.prototype.doSomethingElse = function (b) {
            console.log("Receiver: Also working on (" + b + ".)");
        };
        return Receiver;
    }());
    /**
     * Отправитель связан с одной или несколькими командами. Он отправляет запрос
     * команде.
     */
    var Invoker = /** @class */ (function () {
        function Invoker() {
        }
        /**
         * Инициализация команд.
         */
        Invoker.prototype.setOnStart = function (command) {
            this.onStart = command;
        };
        Invoker.prototype.setOnFinish = function (command) {
            this.onFinish = command;
        };
        /**
         * Отправитель не зависит от классов конкретных команд и получателей.
         * Отправитель передаёт запрос получателю косвенно, выполняя команду.
         */
        Invoker.prototype.doSomethingImportant = function () {
            console.log("Invoker: Does anybody want something done before I begin?");
            if (this.isCommand(this.onStart)) {
                this.onStart.execute();
            }
            console.log("Invoker: ...doing something really important...");
            console.log("Invoker: Does anybody want something done after I finish?");
            if (this.isCommand(this.onFinish)) {
                this.onFinish.execute();
            }
        };
        Invoker.prototype.isCommand = function (object) {
            return object.execute !== undefined;
        };
        return Invoker;
    }());
    /**
     * Клиентский код может параметризовать отправителя любыми командами.
     */
    var invoker = new Invoker();
    invoker.setOnStart(new SimpleCommand("Say hi"));
    var receiver = new Receiver();
    invoker.setOnFinish(new ComplexCommand(receiver, "send email", "save report"));
    invoker.doSomethingImportant();
}
