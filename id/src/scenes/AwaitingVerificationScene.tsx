import { useActions } from 'kea'
import { styled } from 'stitches'
import { DialogHeader } from 'components/DialogHeader'
import { DialogHeaderLogo } from 'components/DialogHeaderLogo'
import { Loader } from 'components/Loader'
import { Typography } from 'components/Typography'
import { Button } from 'components/Button'
import { verificationLogic } from 'logics/verificationLogic'

const SRoot = styled('div', {
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  margin: '0 auto',
  width: 400,

  '@smDown': {
    width: '100%',
  },
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
