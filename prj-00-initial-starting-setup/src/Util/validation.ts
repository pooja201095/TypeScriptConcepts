
    export interface Validateable {
        value: string | number;
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
      }
    
      export function Validate(validateable: Validateable) {
        let isValid = true;
    
        if (validateable.required) {
          isValid = isValid && validateable.value.toString().trim().length !== 0;
        }
    
        if (
          validateable.minLength != null &&
          typeof validateable.value == "string"
        ) {
          isValid = isValid && validateable.value.length > validateable.minLength;
        }
    
        if (
          validateable.maxLength != null &&
          typeof validateable.value == "string"
        ) {
          isValid = isValid && validateable.value.length < validateable.maxLength;
        }
    
        if (validateable.max != null && typeof validateable.value == "number") {
          isValid = isValid && validateable.value <= validateable.max;
        }
    
        if (validateable.min != null && typeof validateable.value == "number") {
          isValid = isValid && validateable.value >= validateable.min;
        }
    
        return isValid;
      }
