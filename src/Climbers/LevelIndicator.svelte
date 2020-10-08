<script lang="ts">
    import type { Passport } from "../climber";
    export let grade: Passport;
</script>

<style>
    span {
        display: inline-block;

        width: 16px;
        height: 16px;
        vertical-align: text-bottom;

        border: solid 1px black;
    }

    span.special {
        border-style: dotted;
    }
</style>
{#if grade}
    <span class:special={grade.special} style="background: {grade.color};"></span>&nbsp;{ grade.shortname }
{/if}