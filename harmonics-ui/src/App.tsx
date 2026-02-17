import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import "./App.css";
import { Harmonics } from "./pages/Harmonics";
import {
  AppShell,
  Burger,
  createTheme,
  MantineProvider,
  NavLink,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDrum, faHouse } from "@fortawesome/free-solid-svg-icons";
import { Bands } from "./pages/Bands";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Band } from "./pages/Band";

const theme = createTheme({});

const Shell = () => {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  return (
    <MantineProvider theme={theme}>
      <AppShell
        padding="xl"
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div>Logo</div>
        </AppShell.Header>

        <AppShell.Navbar>
          <NavLink
            onClick={() => navigate("/")}
            label="Home"
            leftSection={<FontAwesomeIcon icon={faHouse} />}
          />
          <NavLink
            onClick={() => navigate("/bands")}
            label="bands"
            leftSection={<FontAwesomeIcon icon={faDrum} />}
          />
        </AppShell.Navbar>

        <AppShell.Main>
          <Routes>
            <Route path="/" element={<Harmonics />} />
            <Route path="/bands" element={<Bands />} />
            <Route path="/bands/:name" element={<Band />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
};

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
