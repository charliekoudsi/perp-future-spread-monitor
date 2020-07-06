<template>
    <div class = "header">
        <p>Asset</p>
        <p>Positive Spread</p>
        <p>Negative Spread</p>
        <p>Funding Rate (%)</p>
    </div>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped>
    .header {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        font-weight: bold;
    }
</style>