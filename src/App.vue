<template>
  <div id="app">
    <h1>Perp-Future Spread Monitor</h1>
    <Header />
    <Spread name="ADA"/>
    <Spread name="ALGO"/>
    <Spread name="ALT"/>
    <Spread name="ATOM"/>
    <Spread name="BAL"/>
    <Spread name="BCH"/>
    <Spread name="BNB"/>
    <Spread name="BSV"/>
    <Spread name="BTC"/>
    <Spread name="BTMX"/>
    <Spread name="COMP"/>
    <Spread name="CUSDT"/>
    <Spread name="DEFI"/>
    <Spread name="DOGE"/>
    <Spread name="DRGN"/>
    <Spread name="EOS"/>
    <Spread name="ETC"/>
    <Spread name="ETH"/>
    <Spread name="EXCH"/>
    <Spread name="HT"/>
    <Spread name="KNC"/>
    <Spread name="LEO"/>
    <Spread name="LINK"/>
    <Spread name="LTC"/>
    <Spread name="MATIC"/>
    <Spread name="MID"/>
    <Spread name="MKR"/>
    <Spread name="OKB"/>
    <Spread name="PAXG"/>
    <Spread name="PRIV"/>
    <Spread name="SHIT"/>
    <Spread name="THETA"/>
    <Spread name="TOMO"/>
    <Spread name="TRX"/>
    <Spread name="XRP"/>
    <Spread name="XTZ"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Spread from './components/Spread';

export default {
  name: 'App',
  components: {
    Header,
    Spread
  },
}
</script>

<style>
  * {
    margin-left: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
