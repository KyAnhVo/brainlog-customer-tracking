import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import logo from '@/assets/logo.png';

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <NavBar />
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  )
}

function NavBar() {
  return (
    <AppBar position="sticky" sx={{ minWidth: '100vh' }}>
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
          BrainLog Tracking Admin Panel
        </Typography>

        {/* The spacer: eats leftover space, pushing the menu to the right */}
        <Box sx={{ flexGrow: 1 }} />

      </Toolbar>
    </AppBar>
  );
}
