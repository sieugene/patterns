{
  /**
   * Класс Одиночка предоставляет метод getInstance, который позволяет клиентам
   * получить доступ к уникальному экземпляру одиночки.
   */
  class SingleTon {
    private static instance: SingleTon;
    /**
     * Конструктор Одиночки всегда должен быть скрытым, чтобы предотвратить
     * создание объекта через оператор new.
     */
    private constructor() {}
    /**
     * Статический метод, управляющий доступом к экземпляру одиночки.
     *
     * Эта реализация позволяет вам расширять класс Одиночки, сохраняя повсюду
     * только один экземпляр каждого подкласса.
     */
    public static getInstance(): SingleTon {
      if (!SingleTon.instance) {
        SingleTon.instance = new SingleTon();
      }
      return SingleTon.instance;
    }
    /**
     * Наконец, любой одиночка должен содержать некоторую бизнес-логику, которая
     * может быть выполнена на его экземпляре.
     */
    public someBusinessLogic() {
      // ...
    }
  }
  /**
   * Клиентский код.
   */
  function clientCodeSingleton() {
    const s1 = SingleTon.getInstance();
    const s2 = SingleTon.getInstance();
    if (s1 === s2) {
      console.log("Singleton works, both variables contain the same instance.");
    } else {
      console.log("Singleton failed, variables contain different instances.");
    }
  }
  clientCodeSingleton();
}
