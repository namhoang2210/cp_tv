import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import * as React from 'react';

import SearchBox from '../Search/SearchBox';

const HeaderBar = () => {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" className='sticky top-0 z-50'>
      <div className='px-2 md:px-[10%] bg-[#032541] flex items-center justify-between'>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 4,
              display: { xs: 'none', md: 'flex' },
            }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#90cea1] to-[#01b4e4] uppercase text-2xl md:text-3xl font-bold"
          >
          <button onClick={()=> router.push("/")}>CHUPPYTV</button>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={() => router.push("/")}>
                <Typography textAlign="center">Trang chủ</Typography>
              </MenuItem>
              <MenuItem onClick={() => router.push("/history")}>
                <Typography textAlign="center">Lịch sử</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center">Liên hệ</Typography>
              </MenuItem>
              <MenuItem onClick={() => router.push("/search")}>
                <Typography textAlign="center">Tìm kiếm</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#90cea1] to-[#01b4e4] uppercase text-2xl md:text-3xl font-bold"
          >
            CHUPPYTV
          </Typography>
          <Box className='hidden md:flex items-center gap-4'>
              <Button
                onClick={()=> router.push("/")}
                className="text-white font-semibold border-b hover:text-[#44c0c4]"
              >
                Trang chủ
              </Button>
              <Button
                onClick={()=> router.push("/history")}
                className="text-white font-semibold hover:text-[#44c0c4]"
              >
                Lịch sử
              </Button>
              <Button
                className="text-white font-semibold hover:text-[#44c0c4]"
              >
                Liên hệ
              </Button>
          </Box>
        </Toolbar>
        <div className='hidden md:block'>
          <SearchBox />
        </div>
      </div>
    </AppBar>
  );
};
export default HeaderBar;
