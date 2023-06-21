    import { Component } from "./base-component";
    import { Draggable } from "../Model/drag-drop";
    import { Project } from "../Model/project";
    import { Autobind } from "../Decorators/autobind";

    export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    private project: Project;

    constructor(hostId: string, project: Project) {
      super("single-project", hostId, false, project.id);

      this.project = project;

      this.configure();
      this.renderContent();
    }

    get persons() {
      if (this.project.people === 1) {
        return "1 Person";
      } else {
        return `${this.project.people} Persons`;
      }
    }

    configure() {
      this.element.addEventListener("dragstart", this.dragStartEvent);
      this.element.addEventListener("dragend", this.dragEndEvent);
    }

    @Autobind
    dragStartEvent(event: DragEvent): void {
      event.dataTransfer!.setData("text/plain", this.project.id);
      event.dataTransfer!.effectAllowed = "move";
    }

    dragEndEvent(_: DragEvent): void {
      console.log("dragend");
    }

    renderContent() {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector("h3")!.textContent =
        this.persons + ` assigned`;
      this.element.querySelector("p")!.textContent = this.project.description;
    }
  }