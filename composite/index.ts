{
  /**
   * Базовый класс Компонент объявляет общие операции как для простых, так и для
   * сложных объектов структуры.
   */
  abstract class Component {
    protected parent: Component;
    /**
     * При необходимости базовый Компонент может объявить интерфейс для
     * установки и получения родителя компонента в древовидной структуре. Он
     * также может предоставить некоторую реализацию по умолчанию для этих
     * методов.
     */
    public setParent(parent: Component) {
      this.parent = parent;
    }
    public getParent(): Component {
      return this.parent;
    }
    /**
     * В некоторых случаях целесообразно определить операции управления
     * потомками прямо в базовом классе Компонент. Таким образом, вам не нужно
     * будет предоставлять конкретные классы компонентов клиентскому коду, даже
     * во время сборки дерева объектов. Недостаток такого подхода в том, что эти
     * методы будут пустыми для компонентов уровня листа.
     */
    public add(component: Component): void {}

    public remove(component: Component): void {}
    /**
     * Вы можете предоставить метод, который позволит клиентскому коду понять,
     * может ли компонент иметь вложенные объекты.
     */
    public isComposite(): boolean {
      return false;
    }
    /**
     * Базовый Компонент может сам реализовать некоторое поведение по умолчанию
     * или поручить это конкретным классам, объявив метод, содержащий поведение
     * абстрактным.
     */
    public abstract operation(): string;
  }
  /**
   * Класс Лист представляет собой конечные объекты структуры. Лист не может иметь
   * вложенных компонентов.
   *
   * Обычно объекты Листьев выполняют фактическую работу, тогда как объекты
   * Контейнера лишь делегируют работу своим подкомпонентам.
   */
  class Leaf extends Component {
    public operation(): string {
      return "Leaf";
    }
  }
  /**
   * Класс Контейнер содержит сложные компоненты, которые могут иметь вложенные
   * компоненты. Обычно объекты Контейнеры делегируют фактическую работу своим
   * детям, а затем «суммируют» результат.
   */
  class Composite extends Component {
    protected children: Component[] = [];
    /**
     * Объект контейнера может как добавлять компоненты в свой список вложенных
     * компонентов, так и удалять их, как простые, так и сложные.
     */
    public add(component: Component): void {
      this.children.push(component);
      component.setParent(this);
    }
    public remove(component: Component): void {
      const componentIndex = this.children.indexOf(component);
      this.children.splice(componentIndex, 1);
      component.setParent(null);
    }
    public isComposite(): boolean {
      return true;
    }
    public operation(): string {
      const result = [];
      for (const child of this.children) {
        result.push(child.operation());
      }
      return `Branch(${result.join("+")})`;
    }
  }
  /**
   * Клиентский код работает со всеми компонентами через базовый интерфейс.
   */
  function clientCodeComposite(component: Component) {
    console.log(`RESULT: ${component.operation()}`);
  }
  /**
   * Таким образом, клиентский код может поддерживать простые компоненты-листья...
   */
  const simple = new Leaf();
  console.log("Client: I've got a simple component:");
  clientCodeComposite(simple);
  console.log("");
  /**
   * ...а также сложные контейнеры.
   */
  const tree = new Composite();
  const branch1 = new Composite();
  branch1.add(new Leaf());
  branch1.add(new Leaf());
  const branch2 = new Composite();
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
  function clientCode2(component1: Component, component2: Component) {
    if (component1.isComposite()) {
      component1.add(component2);
      console.log(`RESULT: ${component1.operation()}`);
    }
  }
  console.log(
    "Client: I don't need to check the components classes even when managing the tree:"
  );
  clientCode2(tree, simple);
}
