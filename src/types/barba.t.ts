declare module '@barba/core' {
    export interface TransitionData {
      current: { container: HTMLElement };
      next: { container: HTMLElement };
    }
  
    export interface Transition {
      name?: string;
      leave?: (data: TransitionData) => Promise<void>;
      enter?: (data: TransitionData) => Promise<void>;
    }
  
    export interface Barba {
      init: (options: { transitions: Transition[] }) => void;
      destroy: () => void;
    }
  
    const barba: Barba;
    export default barba;
  }
  