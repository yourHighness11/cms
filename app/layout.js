import { Provider } from "../components/Provider";
import { Suspense } from "react";
export const metadata = {
  title: "CMS",
  description: "Content Management System",
};
const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <Provider>
            <main>{children}</main>
          </Provider>
        </Suspense>
      </body>
    </html>
  );
};

export default Rootlayout;
