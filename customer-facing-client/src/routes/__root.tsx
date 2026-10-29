import { AppBar, Box, Toolbar, Button, Typography } from '@mui/material';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import logo from '@/assets/logo.png';

export const Route = createRootRoute({
  component: () => (
    <>
      <NavBar />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})

function NavBar() {
  const pages = [
    { name: "Tracking", to: "/tracking" },
  ]

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Branding: logo + name, sits on the left */}
        <Box
          component="img"
          src={logo}          // swap for your actual logo path
          alt="logo"
          sx={{ height: 32, mr: 1.5 }}
        />

        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: "2vh"
          }}
        >
          BrainLogistics Tracking Service
        </Typography>

        {/* The spacer: eats leftover space, pushing the menu to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Menu items, generated from the array */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {pages.map((page) => (
            <Button component={Link} to={page.to} key={page.name} color="inherit">
              {page.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
