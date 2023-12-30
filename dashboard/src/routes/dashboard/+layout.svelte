<script lang="ts">
  import { fly } from 'svelte/transition'
  import { afterNavigate, goto } from '$app/navigation'
  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar'
  import IconButton from '@smui/icon-button'
  import Drawer, {
    AppContent,
    Content,
    Header,
    Title as DrawerTitle,
    Subtitle,
    Scrim,
  } from '@smui/drawer'
  import List, { Item, Separator, Text, Graphic, Subheader, PrimaryText, SecondaryText } from '@smui/list'

  type DrawerItem = {
    icon: string,
    label: string,
    url: string,
  }

  export let data

  let open = false

  $: active = data.pathname
  $: drawerItems = [
    {
      icon: 'dashboard',
      label: 'Dashboard',
      url: '/dashboard',
    },
  ]

  function toggleDrawer() {
    open = !open
  }
</script>

<div class="top-app-bar-container flexor">
  <TopAppBar variant="static">
    <Row>
      <Section>
        <IconButton class="material-symbols-rounded" on:click={toggleDrawer}>menu</IconButton>
        <Title>Discord Dashboard</Title>
      </Section>
    </Row>
  </TopAppBar>
</div>

<div class="drawer-container">
  <Drawer variant="modal" fixed={false} bind:open>
    <Header>
      <DrawerTitle>Dashboard</DrawerTitle>
      <Subtitle>Manage your discord server!</Subtitle>
    </Header>
    <Content>
      <List>
        {#each drawerItems as item}
          <Item href={item.url} on:click={toggleDrawer} activated={active == item.url}>
            <Graphic class="material-symbols-rounded">{item.icon}</Graphic>
            <Text>{item.label}</Text>
          </Item>
        {/each}
      </List>
    </Content>
  </Drawer>
  <Scrim fixed={false}/>
  <AppContent class="app-content">
    {#key data.pathname}
      <main class="main-content" in:fly={{ x: -200, duration: 500, delay: 500 }} out:fly={{ x: 200, duration: 500 }}>
        <slot/>
      </main>
    {/key}
  </AppContent>
</div>