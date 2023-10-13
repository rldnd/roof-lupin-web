import "next/navigation";

declare module "next/navigation" {
  function useParams<T extends Params = Params>(): T;
}
