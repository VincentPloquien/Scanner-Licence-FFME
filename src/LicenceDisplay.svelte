<script lang="ts">
  import type Climber from "./climber";

  export let licence: Climber;
</script>

<style>
ul { margin :0; }
.profile-picture {
  float: right;
  max-width: 6rem;
}
</style>

<h2>Dernier scan</h2>
{#if licence}
  {#if licence.picture}
    <img class="profile-picture" src={licence.picture} alt="{licence.name}">
  {/if}

  <b>{licence.name} <small>{licence.id}</small></b>

  {#if !licence.isLicenceValid()}
    <div class="problem">La licence n'a pas été renouvellée !</div>
  {/if}


  <dl>
    <dt>Date de naissance</dt>
    <dd>{licence.birthDate}{ !licence.isClimberAdult() ? " 👶" : ""}</dd>
  </dl>
  {#if licence.club}
  <dl>
    <dt>Club</dt>
    <dd>{licence.club}</dd>
  </dl>
  {/if}
  <dl>
    <dt>Diplômes</dt>
    <dd>
      <ul>
        {#each licence.diplomas as diploma}
          <li>{diploma}</li>
        {/each}
      </ul>
    </dd>
  </dl>
{/if}