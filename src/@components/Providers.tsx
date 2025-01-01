// TODO: 타입 선언 생각해보기
interface Props {
  providers: Omit<React.ReactElement, "key">[];
  children: React.ReactNode;
}

function Providers({ providers, children }: Props) {
  return (
    <>
      {providers.reduceRight(
        (children, { type: Provider, props }) => (
          <Provider {...props}>{children}</Provider>
        ),
        children,
      )}
    </>
  );
}

export default Providers;
