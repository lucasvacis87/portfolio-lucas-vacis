import type { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export const containerClassName = "mx-auto w-full max-w-[84rem] px-4 md:px-8 xl:max-w-[88rem] 2xl:max-w-[96rem]";

export function Container({ children, className = "" }: ContainerProps): JSX.Element {
  return <div className={`${containerClassName} ${className}`}>{children}</div>;
}
