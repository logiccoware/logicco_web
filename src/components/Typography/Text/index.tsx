import classNames from "classnames";

type TextProps<C extends React.ElementType> = {
  as?: C;
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "muted" | "large" | "small";
};

type Props<C extends React.ElementType> = React.PropsWithChildren<
  TextProps<C>
> &
  React.ComponentPropsWithoutRef<C>;

export function Text<C extends React.ElementType = "div">({
  variant = "default",
  as,
  children,
  className,
  ...restProps
}: Props<C>) {
  const Component = as || "div";

  if (variant === "large") {
    return (
      <Component
        {...restProps}
        className={classNames("text-lg font-semibold", className)}
      >
        {children}
      </Component>
    );
  }
  if (variant === "muted") {
    return (
      <Component
        className={classNames("text-sm text-muted-foreground", className)}
      >
        {children}
      </Component>
    );
  }

  if (variant === "small") {
    return (
      <Component
        className={classNames("text-sm font-medium leading-none", className)}
      >
        {children}
      </Component>
    );
  }

  if (variant === "default") {
    return (
      <Component
        className={classNames(
          "leading-7 [&:not(:first-child)]:mt-6",
          className
        )}
      >
        {children}
      </Component>
    );
  }

  return null;
}
