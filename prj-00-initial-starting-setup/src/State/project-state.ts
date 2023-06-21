import {Project, ProjectStatus} from '../Model/project';
    
    type Listener<T> = (projects: T[]) => void;

    class State<T> {
      protected listeners: Listener<T>[] = [];
  
      addListeners(listener: Listener<T>) {
        this.listeners.push(listener);
      }
    }
  
    class ProjectState extends State<Project> {
      private projects: Project[] = [];
      private static instance: ProjectState;
  
      private constructor() {
        super();
      }
  
      addProject(title: string, description: string, people: number) {
        let project = new Project(
          Math.random().toString(),
          title,
          description,
          people,
          ProjectStatus.Active
        );
        this.projects.push(project);
        this.updateListeners();
      }
  
      moveProject(prjId: string, newStatus: ProjectStatus) {
        let project = this.projects.find((prj) => prj.id === prjId);
        if (project && project.status !== newStatus) {
          project.status = newStatus;
          this.updateListeners();
        }
      }
  
      updateListeners() {
        for (const listenerFn of this.listeners) {
          listenerFn(this.projects.slice());
          // Slice coz passing an copy and not original to avoid mutation
        }
      }
  
      static getInstance() {
        if (this.instance) {
          return this.instance;
        }
        this.instance = new ProjectState();
  
        return this.instance;
      }
    }
  
    export let projectState = ProjectState.getInstance();
