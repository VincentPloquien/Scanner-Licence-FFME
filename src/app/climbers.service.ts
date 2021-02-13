import { Injectable } from '@angular/core';
import Climber from './climber';

@Injectable({
  providedIn: 'root'
})
export class ClimbersService {
  climbers: Climber[] = [];

  constructor() { }

  getClimbers(): Climber[] {
    this.climbers = [
      new Climber('Vincent', 123, 'picture', '13/11/1998', 'ASA', 2021, 'champion', ['passeport escalade jaune'], 'trofort', 0),
      new Climber('Vincentbis', 12345, 'picture', '13/11/1998', 'ASA', 2021, 'champion', ['passeport escalade vert'], 'trofort', 0)
    ];

    return this.climbers;
  }

  async addClimberFromURL(url: string): Promise<void> {
    const climber = await fetch(url)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        // iso-8859-1 decoding from https://schneide.blog/2018/08/08/decoding-non-utf8-server-responses-using-the-fetch-api/
        const decoder = new TextDecoder('iso-8859-1');
        const text = decoder.decode(buffer);
        return text;
      })
      .then((html) => {
        // parse the interesting bits from the FFME page
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const licence: Climber = this.parseLicenceFromHTML(doc);
        return licence;
      })
      .then((licence) => {
        console.log('Decoded licence: ', licence);
        return licence;
      })
      .catch((error: string) => {
        console.error(`Impossible de récupérer la licence: ${error}`);
        return null;
      });

    if (climber) {
      this.climbers.push(climber);
    }
  }

  private parseLicenceFromHTML(doc: Document): Climber {
    const name = doc.querySelector('#box1 > h1')?.textContent?.trim() || '';
    const id = parseInt(doc.querySelector('#box1 > p > span')?.textContent?.trim() || '0', 10);
    const picture = (doc.querySelector('#box1 > img') as HTMLImageElement)?.src.replace('http://', 'https://');
    const birthDate = doc.querySelector('#box1 > p > b:nth-child(4)')?.nextSibling?.textContent?.trim() || '';
    const club = doc.querySelector('#box > p:nth-child(4) > b:nth-child(1)')?.nextSibling?.textContent?.replace(new RegExp(/\(.*\)/, 'g'), '').trim() || '';
    const year = parseInt(doc.querySelector('#box > p:nth-child(4) > b:nth-child(3)')?.nextSibling?.textContent?.trim() || '0', 10);
    const type = doc.querySelector('#box > p:nth-child(4) > b:nth-child(5)')?.nextSibling?.textContent?.trim() || '';
    const diplomas = Array.from(doc.querySelectorAll('#box > ul > li')).map((node: Element) => {
      return (node as HTMLElement).innerText.trim();
    }) || [];
    const medicalCertificate = doc.querySelector('#box > p:nth-child(8) > b')?.nextSibling?.textContent?.trim() || '';

    return new Climber(name, id, picture, birthDate, club, year, type, diplomas, medicalCertificate, Date.now());

  }
}
