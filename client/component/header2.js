import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Link,
} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

export const Navbar = ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <Link color="inherit" href={href} underline="none">
          {label}
        </Link>
      );
    });

  return (
    <AppBar position="static" sx={{ bgcolor: "green" }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <CatchingPokemonIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link color="inherit" href='/' underline="none">
            iYoung Man   
          </Link>
        </Typography>
        <Stack direction="row" spacing={5}>
          {links}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
