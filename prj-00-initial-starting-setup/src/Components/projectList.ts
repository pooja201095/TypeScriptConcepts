import { ProjectItem } from "./projectItem";
import { Component } from "./base-component";
import { DragTarget } from "../Model/drag-drop";
import { Project,ProjectStatus } from "../Model/project";
import { Autobind } from "../Decorators/autobind";
import { projectState } from "../State/project-state";

    export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    assignedProjects: Project[] = [];

    constructor(private type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);

      this.configure();
      this.renderContent();
    }

    configure() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);

      projectState.addListeners((projects: Project[]) => {
        let relevantProjects = projects.filter((prj) => {
          if (this.type === "active") {
            return prj.status === ProjectStatus.Active;
          }
          return prj.status === ProjectStatus.Finished;
        });
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }

    @Autobind
    dragLeaveHandler(event: DragEvent): void {
      let listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
        let listEl = this.element.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }

    @Autobind
    dropHandler(event: DragEvent): void {
      let prjId = event.dataTransfer!.getData("text/plain");
      projectState.moveProject(
        prjId,
        this.type == "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }

    renderContent() {
      let listId = `${this.type}-project-list`;
      this.element.querySelector("ul")!.id = listId;
      this.element.querySelector("h2")!.textContent =
        this.type.toUpperCase() + " PROJECTS";
    }

    private renderProjects() {
      let list = document.getElementById(
        `${this.type}-project-list`
      )! as HTMLUListElement;
      list.innerHTML = "";
      for (const projectItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector("ul")!.id, projectItem);
      }
    }
  }