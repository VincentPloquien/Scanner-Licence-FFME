<script lang="ts">
  import Climber from "./climber";
  import ClimbersTable from "./Climbers/ClimbersTable.svelte";
  import DisplayLicence from "./LicenceDisplay.svelte";
  import Scanner from "./LicenceScanner.svelte";
  import { climbers } from "./stores";


  let currentClimber : Climber = null;

  function parseLicenceFromHTML(doc: Document) {
    return new Climber(
      doc.querySelector("#box1 > h1").textContent.trim(),
      parseInt(doc.querySelector("#box1 > p > span").textContent.trim()),
      (doc.querySelector("#box1 > img") as HTMLImageElement)?.src.replace("http://", "https://"),
      doc.querySelector("#box1 > p > b:nth-child(4)")?.nextSibling?.textContent.trim(),
      doc.querySelector("#box > p:nth-child(4) > b:nth-child(1)")?.nextSibling?.textContent.replace(new RegExp(/\(.*\)/, "g"), "").trim(),
      parseInt(doc.querySelector("#box > p:nth-child(4) > b:nth-child(3)")?.nextSibling.textContent.trim()),
      doc.querySelector("#box > p:nth-child(4) > b:nth-child(5)")?.nextSibling.textContent.trim(),
      Array.from(doc.querySelectorAll("#box > ul > li")).map((node: HTMLElement) => node.innerText.trim()),
      doc.querySelector("#box > p:nth-child(8) > b")?.nextSibling?.textContent.trim(),
      Date.now()
    );
  }

  async function fetchLicence(url: string): Promise<Climber> {
    var request_url = url.replace("licencie.ffme.fr", "asa.akwaryoum.fr/ffme");

    return await fetch(request_url)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        // iso-8859-1 decoding from https://schneide.blog/2018/08/08/decoding-non-utf8-server-responses-using-the-fetch-api/
        let decoder = new TextDecoder("iso-8859-1");
        let text = decoder.decode(buffer);
        return text;
      })
      .then((html) => {
        // parse the interesting bits from the FFME page
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");

        var licence: Climber = parseLicenceFromHTML(doc);

        return licence;
      })
      .then((licence) => {
        console.debug("Decoded licence: ", licence);
        return licence;
      })
      .catch((error) => {
        console.error("Impossible de récupérer la licence: " + error);
        return null;
      });
  }

  async function handleScan(event: any) {
    let url = event.detail.result;
    let licence = await fetchLicence(url);

    if (licence) {
      currentClimber = licence;

      climbers.addClimber(licence);
    }
  }
</script>

<header class="panel full-width">
  <h1>Scanner de licences FFME</h1>
</header>

<main class="wrapper">
  <div class="panel box">
    <Scanner on:result={handleScan} />
  </div>

  <div class="panel box">
    <DisplayLicence bind:licence={currentClimber} />
  </div>


  {#if $climbers.length > 0}
    <div class="panel box full-width">
      <ClimbersTable />
    </div>
  {/if}
</main>

<footer>
  <p>Appli web réalisée par <a href="https://twitter.com/Akwaryoum">Vincent Ploquien</a> pour l'<a href="https://asaescalade.fr/">ASA Escalade</a> 🧗‍♂️👨‍💻</p>
</footer>
