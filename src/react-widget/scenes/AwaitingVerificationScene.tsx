import { useActions } from 'kea'
import { styled } from 'react-widget/stitches'
import { Dialog } from 'react-widget/components/Dialog'
import { DialogHeader } from 'react-widget/components/DialogHeader'
import { DialogHeaderLogo } from 'react-widget/components/DialogHeaderLogo'
import { Loader } from 'react-widget/components/Loader'
import { Typography } from 'react-widget/components/Typography'
import { Button } from 'react-widget/components/Button'
import { verificationLogic } from 'react-widget/logic/verificationLogic'

const SRoot = styled(Dialog, {
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  width: 400,
})

const SLoader = styled(Loader, {
  margin: '64px',
})

const STitle = styled(Typography, {
  marginBottom: 8,
})

const SText = styled(Typography, {
  maxWidth: 240,
  marginBottom: 24,
})

export function AwaitingVerificationScene() {
  const { terminate } = useActions(verificationLogic)

  return (
    <SRoot>
      <DialogHeader>
        <DialogHeaderLogo centered />
      </DialogHeader>
      <SLoader />
      {/* TODO make Typography components be able to be rendered as different tags, not only div */}
      <STitle variant="h3" centered>
        Confirm Identity
      </STitle>
      <SText variant="p1" centered>
        Please confirm your identity inside your Worldcoin mobile app.
      </SText>
      <Button size="lg" fullWidth onClick={terminate}>
        Cancel
      </Button>
    </SRoot>
  )
}
