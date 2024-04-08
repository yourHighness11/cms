import { Provider } from "../components/Provider";
import Nav from "../components/Nav";
export const metadata = {
  title: "CMS",
  description: "Content Management System",
};
const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default Rootlayout;
