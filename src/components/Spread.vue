<template>
  <div class="spread">
    <p>{{ name }}</p>
    <p v-bind:class="{ green: isPositive }">{{ posSpread }}</p>
    <p v-bind:class="{ red: isNegative }">{{ negSpread }}</p>
    <p v-bind:class="{ red: negativeFunding, green: positiveFunding }">{{ funding }}</p>
  </div>
</template>

<script>
import axios from 'axios';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
axios.defaults.withCredentials = true;

// header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
// header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
export default {
  name: 'Spread',
  props: ['name'],
  data: function() {
    return {
      connection: null,
      xBid: 0,
      xAsk: 0,
      yBid: 0,
      yAsk: 0,
      posSpread: 0,
      negSpread: 0,
      isPositive: false,
      isNegative: false,
      funding: 0,
      positiveFunding: false,
      negativeFunding: false
    };
  },
  methods: {
    calcPctSpread: function(x, y) {
      return (100 * (y - x)) / x;
    },
    getFunding: function() {
      return fetch(`http://localhost:3000/funding?asset=${this.name}`)
        .then(r => r.json())
        .then(data => Math.round(data.rate * 100 * 10000)/10000)
    }
  },
  created: async function() {
    const self = this;
    console.log('Starting connection');
    this.connection = new WebSocket('wss://ftx.com/ws/');
    this.funding = await this.getFunding();
    if (this.funding > 0) {
        this.positiveFunding = true;
    } else {
        this.negativeFunding = true;
    }
    setInterval(async function() {
        self.funding = await self.getFunding();
        if (self.funding > 0) {
            self.positiveFunding = true;
        } else {
            self.negativeFunding = true;
        }
    }, 60000)

    this.connection.onopen = function() {
      const msg = {
        op: 'subscribe',
        channel: 'ticker',
        market: `${self.name}-PERP`,
      };
      self.connection.send(JSON.stringify(msg));
      msg.market = `${self.name}-0925`;
      self.connection.send(JSON.stringify(msg));
    };

    this.connection.onmessage = function(event) {
      const { market, data } = JSON.parse(event.data);
      if (market.split('-')[1] === 'PERP') {
        self.xBid = data.bid;
        self.xAsk = data.ask;
      } else {
        self.yBid = data.bid;
        self.yAsk = data.ask;
      }
      self.posSpread =
        Math.round(self.calcPctSpread(self.xAsk, self.yBid) * 1000) / 1000;
      self.negSpread =
        Math.round(self.calcPctSpread(self.xBid, self.yAsk) * 1000) / 1000;

      if (self.posSpread > 0.3) {
        self.isPositive = true;
      } else {
        self.isPositive = false;
      }

      if (self.negSpread < -0.3) {
        self.isNegative = true;
      } else {
        self.isNegative = false;
      }
    };
  },
};
</script>

<style scoped>
.spread {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.green {
  color: green;
}

.red {
  color: red;
}
</style>
