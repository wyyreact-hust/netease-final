import { Avatar, AvatarProps, Button, Box, Tooltip, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'

const UserMenu = () => {
  const [loginState, setLoginState] = useState(false)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleLogin = () => {
    setLoginState(true)
  }
  const handleLogout = () => {
    setLoginState(false)
    setAnchorElUser(null)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleGo2UserProfile = () => {
    handleCloseUserMenu()
  }
  const avatarSize = {
    width: 24,
    height: 24,
  }
  if (loginState) {
    return (
      <Box>
        <IconButton onClick={handleOpenUserMenu}>
          <Avatar alt='userAvatar' src='' sx={avatarSize} />
        </IconButton>
        <Menu
          sx={{ mt: '100px' }}
          id='user-menu'
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem key='profile' onClick={handleGo2UserProfile}>
            <Typography textAlign='center' fontSize='14px'>
              用户主页
            </Typography>
          </MenuItem>
          <MenuItem key='logout' onClick={handleLogout}>
            <Typography textAlign='center' fontSize='14px'>
              登出
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    )
  } else {
    return (
      <Button onClick={handleLogin} sx={{ color: 'white', fontSize: '14px' }}>
        登录
      </Button>
    )
  }
}

export default UserMenu
