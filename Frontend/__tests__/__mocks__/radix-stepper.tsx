import {Props} from "./props"

export const Stepper = ({ children }: Props) => <div>{children}</div>;
export const StepperList = ({ children }: Props) => <div>{children}</div>;
export const StepperItem = ({ children }: Props) => <div>{children}</div>;
export const StepperContent = ({ children }: Props) => <div>{children}</div>;
export const StepperTrigger = ({ children }: Props) => <button>{children}</button>;
export const StepperIndicator = () => null;
export const StepperDescription = ({ children }: Props) => <p>{children}</p>;
export const StepperTitle = ({ children }: Props) => <h3>{children}</h3>;
export const StepperSeparator = () => null;

export const StepperNext = ({ children }: Props) => <button>{children}</button>;
export const StepperPrev = ({ children }: Props) => <button>{children}</button>;