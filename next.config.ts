import withPWAInit from 'next-pwa';
import createNextIntlPlugin from 'next-intl/plugin';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
});

const withNextIntl = createNextIntlPlugin();

export default withPWA(
  withNextIntl({
    reactStrictMode: false,
  })
);