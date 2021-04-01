{
    /**
     * Класс Одиночка предоставляет метод getInstance, который позволяет клиентам
     * получить доступ к уникальному экземпляру одиночки.
     */
    var SingleTon_1 = /** @class */ (function () {
        /**
         * Конструктор Одиночки всегда должен быть скрытым, чтобы предотвратить
         * создание объекта через оператор new.
         */
        function SingleTon() {
        }
        /**
         * Статический метод, управляющий доступом к экземпляру одиночки.
         *
         * Эта реализация позволяет вам расширять класс Одиночки, сохраняя повсюду
         * только один экземпляр каждого подкласса.
         */
        SingleTon.getInstance = function () {
            if (!SingleTon.instance) {
                SingleTon.instance = new SingleTon();
            }
            return SingleTon.instance;
        };
        /**
         * Наконец, любой одиночка должен содержать некоторую бизнес-логику, которая
         * может быть выполнена на его экземпляре.
         */
        SingleTon.prototype.someBusinessLogic = function () {
            // ...
        };
        return SingleTon;
    }());
    /**
     * Клиентский код.
     */
    function clientCodeSingleton() {
        var s1 = SingleTon_1.getInstance();
        var s2 = SingleTon_1.getInstance();
        if (s1 === s2) {
            console.log("Singleton works, both variables contain the same instance.");
        }
        else {
            console.log("Singleton failed, variables contain different instances.");
        }
    }
    clientCodeSingleton();
}
