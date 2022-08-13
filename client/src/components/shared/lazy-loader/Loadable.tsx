import { Suspense } from "react";
import Loader from "./Loader";

const Loadable: any = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
