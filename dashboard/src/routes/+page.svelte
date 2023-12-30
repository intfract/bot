<script lang="ts">
  import Button, { Label } from '@smui/button'

  let title = 'Home'
  let inviteLink = 'https://discord.com/api/oauth2/authorize?client_id=1143844564470341692&permissions=8&scope=bot%20applications.commands'
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={title} />
  <meta property="og:title" content={title}>
  <meta property="og:url" content="https://igcsekit.vercel.app">
  <meta property="og:description" content="Your free IGCSE training kit!">
  <meta name="theme-color" content="#2c6fef">
</svelte:head>

<div class="banner">
  <nav>
    <div class="padded">
      Intfract
    </div>
    <div class="links">
      <a href="/dashboard">Dashboard</a>
      <a href="/docs">Documentation</a>
    </div>
    <div class="padded">
      <Button variant="raised">
        <Label>Join</Label>
      </Button>
    </div>
  </nav>
  <div class="hero">
    <div class="hero-text">
      <h1>A Powerful Tool</h1>
      <p>Augment your discord server with a new AI-powered discord bot!</p>
      <Button variant="raised" on:click={e => window.open(inviteLink)}>
        <Label>Invite</Label>
      </Button>
    </div>
  </div>
</div>

<style>
  .banner {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 64px;
  }

  .padded {
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 100%;
  }

  .links {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .links a {
    padding: 0 16px;
  }

  .hero {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }

  .hero-text {
    text-align: center;
  }
</style>