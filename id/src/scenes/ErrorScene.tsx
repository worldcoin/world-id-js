import { useActions, useValues } from 'kea'
import { verificationLogic } from 'logics/verificationLogic'
import { styled } from 'stitches'
import { DialogHeader } from 'components/DialogHeader'
import { DialogHeaderLogo } from 'components/DialogHeaderLogo'
import { Typography } from 'components/Typography'
import { Button } from 'components/Button'
import { Circle } from 'components/Circle'
import { IconFailure } from 'assets/icons'

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

export function ErrorScene() {
  const { endUserError } = useValues(verificationLogic)
  const { tryAgain, terminate } = useActions(verificationLogic)

  return (
    <SRoot>
      <DialogHeader>
        <DialogHeaderLogo centered />
      </DialogHeader>
      <SCircle color={endUserError?.noRetry ? 'default' : 'primary'}>
        <IconFailure />
      </SCircle>
      {/* TODO make Typography components be able to be rendered as different tags, not only div */}
      <STitle variant="h3" centered>
        {endUserError?.title || 'Something went wrong'}
      </STitle>
      <SText variant="p1" centered>
        {endUserError?.caption || 'Sorry, there was a problem with your request, please try again.'}
      </SText>
      {endUserError?.noRetry ? (
        <Button size="lg" fullWidth onClick={terminate}>
          Close
        </Button>
      ) : (
        <Button color="primary" size="lg" fullWidth onClick={tryAgain}>
          Try again
        </Button>
      )}
    </SRoot>
  )
}
