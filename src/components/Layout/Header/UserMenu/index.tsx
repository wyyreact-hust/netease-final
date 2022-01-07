import { Avatar, AvatarProps, Button, Box, Tooltip, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import { LogStateContext, LogDispatchContext, ACTIONS } from 'reducers/log'
import authApis from 'apis/auth'
import useAsyncFn from 'hooks/useAsyncFn'
import songlistApis from 'apis/songlist'
import styles from './styles.module.css'
import LoginDialog from 'components/LoginDialog'
import { useHistory } from 'react-router-dom'
import ROUTES from 'constants/routes'

const UserMenu = () => {
  const history = useHistory()

  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const dispatch = useContext(LogDispatchContext)
  const loginState = useContext(LogStateContext)
  const { isLogined: isLogin, user } = loginState
  const [, logoutFn] = useAsyncFn(authApis.logout)
  const [songlistState, getUserSonglistFn] = useAsyncFn(songlistApis.getUserSonglist)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  useEffect(() => {
    if (isLogin) {
      getUserSonglistFn(loginState.user.userId)
    }
  }, [isLogin])

  const handleLoginDialogClose = () => setShowLoginDialog(false)
  const handleLogin = () => setShowLoginDialog(true)

  const handleLogout = async () => {
    await logoutFn()
    dispatch({ type: ACTIONS.LOGOUT })
    setAnchorElUser(null)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const avatarSize = {
    width: 24,
    height: 24,
  }
  if (isLogin) {
    const favor = songlistState.value?.create[0]
    const favorListId = favor?.id
    const handleGo2UserProfile = () => {
      window.alert('API接口问题导致无法访问私有歌单')
      handleCloseUserMenu()
    }
    return (
      <div className={styles.box}>
        <IconButton onClick={handleOpenUserMenu}>
          <Avatar alt='userAvatar' src={user.profile.avatarUrl} sx={avatarSize} />
        </IconButton>
        <span className={styles.userName}>{user.profile.nickname}</span>
        <Menu
          sx={{ mt: '35px' }}
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
              我喜欢
            </Typography>
          </MenuItem>
          <MenuItem key='logout' onClick={handleLogout}>
            <Typography textAlign='center' fontSize='14px'>
              登出
            </Typography>
          </MenuItem>
        </Menu>
      </div>
    )
  } else {
    return (
      <div className={styles.box}>
        <Button onClick={handleLogin} sx={{ color: 'white', fontSize: '14px' }}>
          登录
        </Button>
        {showLoginDialog ? <LoginDialog open={showLoginDialog} handleClose={handleLoginDialogClose} /> : <></>}
      </div>
    )
  }
}

export default UserMenu
