import React, { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

type ContextProvider = React.ComponentType<ProviderProps>;

type ContextWrapperProps = {
  providers: ContextProvider[];
  children: ReactNode;
};

const ContextWrapper: React.FC<ContextWrapperProps> = ({
  providers,
  children,
}) => {
  return providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
};

export default ContextWrapper;
