{
    /**
     * Реальный Субъект содержит некоторую базовую бизнес-логику. Как правило,
     * Реальные Субъекты способны выполнять некоторую полезную работу, которая к
     * тому же может быть очень медленной или точной – например, коррекция входных
     * данных. Заместитель может решить эти задачи без каких-либо изменений в коде
     * Реального Субъекта.
     */
    var RealSubject = /** @class */ (function () {
        function RealSubject() {
        }
        RealSubject.prototype.request = function () {
            console.log("RealSubject: Handling request.");
        };
        return RealSubject;
    }());
    /**
     * Интерфейс Заместителя идентичен интерфейсу Реального Субъекта.
     */
    var Proxy_1 = /** @class */ (function () {
        /**
         * Заместитель хранит ссылку на объект класса РеальныйСубъект. Клиент может
         * либо лениво загрузить его, либо передать Заместителю.
         */
        function Proxy(realSubject) {
            this.realSubject = realSubject;
        }
        /**
         * Наиболее распространёнными областями применения паттерна Заместитель
         * являются ленивая загрузка, кэширование, контроль доступа, ведение журнала
         * и т.д. Заместитель может выполнить одну из этих задач, а затем, в
         * зависимости от результата, передать выполнение одноимённому методу в
         * связанном объекте класса Реального Субъект.
         */
        Proxy.prototype.request = function () {
            if (this.checkAccess()) {
                this.realSubject.request();
                this.logAccess();
            }
        };
        Proxy.prototype.checkAccess = function () {
            // Некоторые реальные проверки должны проходить здесь.
            console.log("Proxy: Checking access prior to firing a real request.");
            return true;
        };
        Proxy.prototype.logAccess = function () {
            console.log("Proxy: Logging the time of request.", new Date().toISOString());
        };
        return Proxy;
    }());
    /**
     * Клиентский код должен работать со всеми объектами (как с реальными, так и
     * заместителями) через интерфейс Субъекта, чтобы поддерживать как реальные
     * субъекты, так и заместителей. В реальной жизни, однако, клиенты в основном
     * работают с реальными субъектами напрямую. В этом случае, для более простой
     * реализации паттерна, можно расширить заместителя из класса реального
     * субъекта.
     */
    function client(subject) {
        subject.request();
    }
    console.log("Client: Executing the client code with a real subject:");
    var realSubject = new RealSubject();
    client(realSubject);
    console.log("");
    console.log("Client: Executing the same client code with a proxy:");
    var proxy = new Proxy_1(realSubject);
    client(proxy);
}
