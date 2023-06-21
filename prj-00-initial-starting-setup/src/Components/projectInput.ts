import { Component } from "./base-component";
import { Validate,Validateable } from "../Util/validation";
import { Autobind } from "../Decorators/autobind";
import { projectState } from "../State/project-state";
    
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
        titleElement: HTMLInputElement;
        descriptionElement: HTMLInputElement;
        peopleElement: HTMLInputElement;
    
        constructor() {
          super("project-input", "app", true);
    
          this.titleElement = this.element.querySelector(
            "#title"
          ) as HTMLInputElement;
          this.descriptionElement = this.element.querySelector(
            "#description"
          ) as HTMLInputElement;
          this.peopleElement = this.element.querySelector(
            "#people"
          ) as HTMLInputElement;
    
          this.configure();
        }
    
        configure() {
          this.element.addEventListener("submit", this.submitHandler);
        }
    
        renderContent() {}
    
        private gatherInput(): [string, string, number] | void {
          let title = this.titleElement.value;
          let description = this.descriptionElement.value;
          let people = this.peopleElement.value;
    
          let validateableTitle: Validateable = { value: title, required: true };
          let validateableDescription: Validateable = {
            value: description,
            required: true,
            minLength: 5,
          };
          let validateablePeople: Validateable = {
            value: +people,
            required: true,
            min: 1,
            max: 5,
          };
    
          if (
            !Validate(validateableTitle) ||
            !Validate(validateableDescription) ||
            !Validate(validateablePeople)
          ) {
            // if(title.trim().length === 0 || description.trim().length === 0 || people.trim().length === 0 ) {
            alert("please enter valid values");
            return;
          } else {
            return [title, description, +people];
          }
        }
    
        private clearInput() {
          this.titleElement.value = "";
          this.descriptionElement.value = "";
          this.peopleElement.value = "";
        }
    
        @Autobind
        private submitHandler(event: Event) {
          event.preventDefault();
          let userInput = this.gatherInput();
          if (Array.isArray(userInput)) {
            projectState.addProject(...userInput);
            this.clearInput();
          }
        }
      }