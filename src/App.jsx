import './App.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
//import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Home from './section/Home';
import { Button, Grid } from '@mui/material';
import StepperWithQuestion from './section/StepperWithQuestion';
import About from './section/About';


const { chains, provider } = configureChains(
  [mainnet, goerli, polygon, optimism, arbitrum],
  [
    //alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});
const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider
})

const Disclaimer = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{' '}
    <Link href="https://termsofservice.xyz">Terms of Service</Link> and
    acknowledge you have read and understand the protocol of {' '}
    <Link href="https://disclaimer.xyz">Degenerate Diggers</Link>
  </Text>
);

function App() {

  return (
    <BrowserRouter>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider coolMode modalSize="compact" chains={chains}
          appInfo={{
            appName: 'RainbowKit DegenDiggers',
            disclaimer: Disclaimer,
          }}>
          <div className="App">
            <header className="App-header">
              <nav>
                <Link to="/" >Home</Link>
                {/* <Link to="/about" >About</Link>
                <Link to="/stepper">Stepper</Link> */}
                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                  }) => {
                    // Note: If your app doesn't use authentication, you
                    // can remove all 'authenticationStatus' checks
                    const ready = mounted && authenticationStatus !== 'loading';
                    const connected =
                      ready &&
                      account &&
                      chain &&
                      (!authenticationStatus ||
                        authenticationStatus === 'authenticated');

                    return (
                      <div
                        {...(!ready && {
                          'aria-hidden': true,
                          'style': {
                            opacity: 0,
                            pointerEvents: 'none',
                            userSelect: 'none',
                          },
                        })}
                      >
                        {(() => {
                          if (!connected) {
                            return (
                              <Button variant='outlined' sx={{ color: "#fff" }} onClick={openConnectModal} type="button">
                                Connect Wallet
                              </Button>
                            );
                          }

                          if (chain.unsupported) {
                            return (
                              <Button onClick={openChainModal} type="button">
                                Wrong network
                              </Button>
                            );
                          }

                          return (
                            <div style={{ display: 'flex', gap: 3, flexDirection: "row" }}>
                              <Button
                                onClick={openChainModal}
                                style={{ display: 'flex', alignItems: 'center' }}
                                type="button"
                              >
                                {chain.hasIcon && (
                                  <div
                                    style={{
                                      background: chain.iconBackground,
                                      width: 12,
                                      height: 12,
                                      borderRadius: 999,
                                      overflow: 'hidden',
                                      marginRight: 4,
                                    }}
                                  >
                                    {chain.iconUrl && (
                                      <img
                                        alt={chain.name ?? 'Chain icon'}
                                        src={chain.iconUrl}
                                        style={{ width: 12, height: 12 }}
                                      />
                                    )}
                                  </div>
                                )}
                                {chain.name}
                              </Button>

                              <Button onClick={openAccountModal} type="button">
                                {account.displayName}
                                {account.displayBalance
                                  ? ` (${account.displayBalance})`
                                  : ''}
                              </Button>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>

              </nav>
            </header>
            <Grid p="1rem">
              <Routes>
                <Route exact path="/" element={
                  <Home />
                } />
                <Route path="/about" element={
                  <About />
                } />
                <Route path="/stepper" element={
                  <StepperWithQuestion />
                } />

              </Routes>
            </Grid>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </BrowserRouter>

  )
}

export default App
