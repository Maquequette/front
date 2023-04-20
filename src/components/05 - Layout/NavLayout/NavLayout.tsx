import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { TabsProvider } from "@/contexts/TabsContext";
import { AuthContext } from "@/contexts/AuthContext";

import Header from "@/components/04 - Templates/Header/Header";
import Footer from "@/components/04 - Templates/Footer/Footer";
import Dialog from "@/components/04 - Templates/Dialog/Dialog";
import Tabs from "@/components/03 - Organisms/Tabs/Tabs";
import Login from "@/components/03 - Organisms/Auth/Login";
import Register from "@/components/03 - Organisms/Auth/Register";
import Loading from "@/components/01 - Atoms/Loading/Loading";

export default function NavLayout() {

  const location = useLocation()
  const navigate = useNavigate()
  const { isConnected, modalAuth, setModalAuth } = useContext(AuthContext)

  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </Suspense>
      {!isConnected() &&
        <>
          <Dialog
            id="Auth"
            visible={modalAuth}
            Dismiss={() => {
              navigate(location.pathname)
              setModalAuth(!modalAuth)
            }}
          >

            <TabsProvider>
              <Tabs
                tabs={[
                  {
                    tabTitle: 'Login',
                    tabContent: <Login />,
                    anchor: '#login'
                  },
                  {
                    tabTitle: 'Register',
                    tabContent: <Register />,
                    anchor: '#register'
                  }
                ]}
                anchorNavigation={true}
              />
            </TabsProvider>

          </Dialog>
        </>
      }
      <Footer />
    </>
  );
}
