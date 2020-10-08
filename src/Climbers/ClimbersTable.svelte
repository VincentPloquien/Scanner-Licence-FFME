<script lang="ts">
    import { climbers } from "../stores.js";
    import type Climber from "../climber.js";
    import ClimberLine from "./ClimberLine.svelte";
    import { jsPDF } from "jspdf";
    import autoTable from "jspdf-autotable";
    import { onDestroy, onMount } from "svelte";

    let manager: string;

    onMount(() => {
        manager = localStorage.getItem("manager") || "";
    });

    function exportList(event) {
        event.target.setAttribute("disabled", true);

        localStorage.setItem("manager", manager);

        const doc = new jsPDF("landscape");

        const columns = [
            {header:"NOM Prénom", dataKey: "table-name"},
            {header:"N° de licence", dataKey: "table-id"},
            {header:"Année de validité", dataKey: "table-year"},
            {header:"Club", dataKey: "table-club"},
            {header:"Date de naissance", dataKey: "table-birthdate"},
            {header:"Passeport", dataKey: "table-passport"},
        ];

        doc.text("Liste des grimpeurs à la séance du " + new Date().toLocaleString(), 15, 10);
        doc.text("Responsable : " + manager, 281, 10, {align: "right"});
        autoTable(doc, { html: "#climbers-table", columns: columns, theme: "grid" });
        doc.save("export.pdf");

        event.target.removeAttribute("disabled");
    }
</script>

<style>
    .table-container {
        overflow-x: auto;
        max-width: 90vw;
    }

    .big-button {
        display: block;
        width: 100%;
        padding: 0.8rem;
    }

    form {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }
</style>

<div class="table-container">
    <table id="climbers-table">
        <thead>
            <tr>
                <th id="table-date">Heure du scan</th>
                <th id="table-name">NOM Prénom</th>
                <th id="table-id">N° de licence</th>
                <th id="table-year">Année de validité</th>
                <th id="table-club">Club</th>
                <th id="table-birthdate">Date de naissance</th>
                <th id="table-passport">Passeport</th>
                <th><button class="icon" on:click={() => climbers.clear()}>🧹&nbsp;Tout effacer</button></th>
            </tr>
        </thead>

        <tbody>
            {#each $climbers as climber}
            <ClimberLine climber={climber}>
                <button class="icon" on:click={() => climbers.delClimber(climber)}>❌&nbsp;Supprimer</button>
            </ClimberLine>
            {/each}
        </tbody>

        <tfoot style="display: none;">
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>Total : {$climbers.length}</th>
                <th></th>
            </tr>
        </tfoot>
    </table>
</div>

<form on:submit|preventDefault={exportList}>
    <div>
        <label for="manager">Responsable: </label>
        <input bind:value={manager} required id="manager" type="text">
    </div>

    <button type="submit" class="big-button">Exporter la liste</button>
</form>