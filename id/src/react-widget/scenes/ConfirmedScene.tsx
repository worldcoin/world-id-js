import { useActions } from 'kea'
import { worldLogic } from 'worldLogic'

import { styled } from 'react-widget/stitches'
import { Dialog } from 'react-widget/components/Dialog'
import { DialogHeader } from 'react-widget/components/DialogHeader'
import { DialogHeaderLogo } from 'react-widget/components/DialogHeaderLogo'
import { Typography } from 'react-widget/components/Typography'
import { Button } from 'react-widget/components/Button'
import { Circle } from 'react-widget/components/Circle'
import { IconSuccess } from 'assets/icons'

const SRoot = styled(Dialog, {
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  width: 400,
})

const SCircle = styled(Circle, {
  margin: '60px 0 48px 0',
})

const STitle = styled(Typography, {
  marginBottom: 8,
})

const SText = styled(Typography, {
  maxWidth: 290,
  marginBottom: 24,
})

export function ConfirmedScene() {
  const { terminate } = useActions(worldLogic)

  return (
    <SRoot>
      <DialogHeader>
        <DialogHeaderLogo centered />
      </DialogHeader>
      <SCircle color="primary">
        <IconSuccess />
      </SCircle>
      {/* TODO make Typography components be able to be rendered as different tags, not only div */}
      <STitle variant="h3" centered>
        Identity Confirmed!
      </STitle>
      <SText variant="p1" centered>
        Yay! Your identity has been successfully confirmed. You can start using your WorldID.
      </SText>
      <Button color="primary" size="lg" fullWidth onClick={terminate}>
        Continue
      </Button>
    </SRoot>
  )
}
