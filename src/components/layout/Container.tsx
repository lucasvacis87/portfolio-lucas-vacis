import type { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export function Container({ children, className = "" }: ContainerProps): JSX.Element {
  return <div className={`mx-auto w-full max-w-[84rem] px-5 md:px-8 xl:max-w-[88rem] 2xl:max-w-[96rem] ${className}`}>{children}</div>;
}
