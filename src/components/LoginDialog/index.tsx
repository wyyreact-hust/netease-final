import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { DialogProps } from '@mui/material'

import authApis from 'apis/auth'
import useAsyncFn from 'hooks/useAsyncFn'
import { noop } from 'helpers/fn'
import { LogDispatchContext, ACTIONS } from 'reducers/log'

interface IProps extends DialogProps {
  handleClose?: () => void
}
const { useState, useContext } = React

const LoginDialog: React.FC<IProps> = ({ handleClose = noop, open }) => {
  const dispatch = useContext(LogDispatchContext)
  const [phone, setPhone] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loginState, loginFn] = useAsyncFn(authApis.login)
  const { loading, error } = loginState

  const handleLogin = async () => {
    const result = await loginFn({ phone, password })
    if (result) {
      //如果有结果
      dispatch({
        type: ACTIONS.LOGIN,
        payload: {
          user: {
            ...result,
            userId: result.profile.userId,
          },
        },
      })
    }
    handleClose()
  }

  const handlePhoneChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPhone(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPassword(event.target.value)
  }

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>登录</DialogTitle>
      <DialogContent>
        <TextField
          margin='dense'
          id='phone'
          label='手机号码'
          type='phone'
          fullWidth
          variant='standard'
          onChange={handlePhoneChange}
          color='warning'
        />
        <TextField
          margin='dense'
          id='password'
          label='密码'
          type='password'
          fullWidth
          variant='standard'
          onChange={handlePasswordChange}
          color='warning'
        />
        {error && <div className='error'>{error.message}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        {loading ? <Button disabled>登录</Button> : <Button onClick={handleLogin}>登录</Button>}
      </DialogActions>
    </Dialog>
  )
}

export default LoginDialog
