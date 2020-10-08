<script lang="ts">
    import type Climber from "../climber";
    import LevelIndicator from "./LevelIndicator.svelte";

    export let climber:Climber;
</script>

<style>
    .invalid {
        background-color: rgb(255, 132, 132);
    }
    .invalid::before {
        content: "❗\00a0";
    }

    .kid {
        background-color: rgb(236, 243, 132);
    }
    .kid::before {
        content: "👶\00a0";
    }
</style>

<tr>
    <!--
        <th>Nom</th>
        <th>N° de licence</th>
        <th>Année de validité</th>
        <th>Club</th>
        <th>Année de naissance</th>
        <th>Passeport</th>
        <th>/* Boutons */</th>
     -->

    <td>{(new Date(climber.scanTime)).toLocaleTimeString()}</td>
    <td>{climber.name}</td>
    <td>{climber.id}</td>
    <td class:invalid={!climber.isLicenceValid()}>{Number.isSafeInteger(climber.year) ? climber.year : "?"}</td>
    <td>{climber.club ? climber.club : "?"}</td>
    <td class:kid={!climber.isClimberAdult()}>{climber.birthDate}</td>
    <td><LevelIndicator grade={climber.getHighestPassport()}></LevelIndicator></td>
    <td><slot></slot></td>
</tr>