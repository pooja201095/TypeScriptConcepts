
    export interface Draggable {
        dragStartEvent(event:DragEvent):void;
        dragEndEvent(event:DragEvent):void
    }
    
    export interface DragTarget {
        dragOverHandler(event:DragEvent):void
        dropHandler(event:DragEvent):void
        dragLeaveHandler(event:DragEvent):void
    
    }
