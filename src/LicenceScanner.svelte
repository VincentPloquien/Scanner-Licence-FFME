<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import QrScanner from "qr-scanner";
  // @ts-ignore: Actually used by the rollup plugin to bundle it up
  import QrScannerWebworker from "web-worker:../node_modules/qr-scanner/qr-scanner-worker.min.js";

  const dispatch = createEventDispatcher();

  let video: HTMLVideoElement;
  let qrScanner: QrScanner;

  let isScanning = true;
  let hasFlash = false;

  onMount(async () => {
    QrScanner.WORKER_PATH = "build/lib/web-worker-0.js";

    qrScanner = new QrScanner(video, onSuccessScan, (error) => {
      if (error !== "No QR code found") {
        console.error("decoding error :", error);
      }
    });

    QrScanner.hasCamera().then((hasCamera) => {
      !hasCamera && alert("Cette application nécessite un appareil avec une caméra !");
    })

    startScan();
  });


  function startScan() {
    qrScanner.start().then(() => {
      qrScanner.hasFlash().then((flash) => {
        hasFlash = flash;
      })
    });
    isScanning = true;
  }

  function onSuccessScan(result: string) {
    // Format : https://licencie.ffme.fr/fiche/240099/515a888dc3cc447908bb75ee64f192ad
    var re = "https?://licencie.ffme.fr/fiche/[0-9]{6}/[A-Za-z0-9]{32}";
    if (result.match(re)) {
      dispatch("result", {
        result,
      });

      console.log("Found a valid licence : " + result);

      qrScanner.stop();
      isScanning = false;
    }
  }
</script>

<style>
  .hidden {
    display: none;
  }
  .buttons {
    display: flex;
  }
  .buttons button {
    display: block;
    margin: 4px;
    flex: 1 0;
    padding: 0.8rem;
  }
  video {
    margin-top: 14px;
    width: 100%;
    height: auto;
  }
</style>

<h2>Scanner</h2>
<div class="buttons">
  {#if !isScanning}
    <button on:click={startScan}>🔄 Recommencer</button>
  {:else if hasFlash}
    <button on:click={() => qrScanner.toggleFlash()}>📸 Flash</button>
  {/if}
</div>

<!-- svelte-ignore a11y-media-has-caption -->
<video bind:this={video} class:hidden={!isScanning}/>