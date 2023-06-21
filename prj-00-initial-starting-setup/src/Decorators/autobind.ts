
    export function Autobind(_: any, _1: string, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;
        let newMethod: PropertyDescriptor = {
          configurable: true,
          get() {
            return originalMethod.bind(this);
          },
        };
        return newMethod;
      }