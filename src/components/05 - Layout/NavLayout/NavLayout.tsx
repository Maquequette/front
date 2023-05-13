import { Suspense, useContext, memo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/04 - Templates/Header/Header";
import Footer from "@/components/04 - Templates/Footer/Footer";
import Dialog from "@/components/04 - Templates/Dialog/Dialog";
import Tabs from "@/components/03 - Organisms/Tabs/Tabs";
import Login from "@/components/03 - Organisms/Login/Login";
import Register from "@/components/03 - Organisms/Register/Register";
import Spinner from "@/components/01 - Atoms/Spinner/Spinner";
import { TabsProvider } from "@/contexts/TabsContext";
import { AuthContext } from "@/contexts/AuthContext";

export default memo(function NavLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isConnected, modalAuth, setModalAuth } = useContext(AuthContext);

  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div
            style={{
              height: "calc(100vh - 140px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
            <Spinner theme="primary" />
          </div>
        }>
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </Suspense>
      {!isConnected() && (
        <>
          <Dialog
            id="Auth"
            visible={modalAuth}
            Dismiss={() => {
              navigate(location.pathname);
              setModalAuth(!modalAuth);
            }}>
            <TabsProvider>
              <Tabs
                tabs={[
                  {
                    tabTitle: "Login",
                    tabContent: <Login />,
                    anchor: "#login"
                  },
                  {
                    tabTitle: "Register",
                    tabContent: <Register />,
                    anchor: "#register"
                  }
                ]}
                anchorNavigation={true}
              />
            </TabsProvider>
          </Dialog>
        </>
      )}
      <Footer />
    </>
  );
});
