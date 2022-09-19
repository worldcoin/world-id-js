import { useActions } from 'kea'
import { styled } from 'stitches'
import { DialogHeader } from 'components/DialogHeader'
import { DialogHeaderLogo } from 'components/DialogHeaderLogo'
import { Typography } from 'components/Typography'
import { Button } from 'components/Button'
import { Circle } from 'components/Circle'
import { IconSuccess } from 'assets/icons'
import { verificationLogic } from 'logics/verificationLogic'
import { widgetLogic } from 'logics/widgetLogic'

const SRoot = styled('div', {
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  width: 400,

  '@smDown': {
    width: '100%',
  },
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
  const { terminate } = useActions(verificationLogic)
  const { disableModal } = useActions(widgetLogic)

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
      <Button
        color="primary"
        size="lg"
        fullWidth
        onClick={() => {
          terminate()
          disableModal()
        }}
      >
        Continue
      </Button>
    </SRoot>
  )
}
