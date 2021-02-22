export interface Passport {
    key: string;
    shortname: string;
    special: boolean;
    fgColor: string;
    bgColor: string;
}

export default class Climber {
    static passports: Array<Passport> = [
        { key: 'passeport escalade blanc', shortname: 'Passeport Blanc', fgColor: "#000", bgColor: '#fff', special: false },
        { key: 'passeport escalade jaune', shortname: 'Passeport Jaune', fgColor: "#fff", bgColor: '#f5cf11', special: false },
        { key: 'passeport escalade orange', shortname: 'Passeport Orange', fgColor: "#fff", bgColor: '#f78c22', special: false },
        { key: 'initiateur sae', shortname: 'Initiateur SAE', fgColor: "#fff", bgColor: '#f78c22', special: true },
        { key: 'passeport escalade vert', shortname: 'Passeport Vert', fgColor: "#fff", bgColor: '#aad135', special: false },
        { key: 'passeport escalade bleu', shortname: 'Passeport Bleu', fgColor: "#fff", bgColor: '#00acd0', special: false },
        { key: 'initiateur escalade', shortname: 'Initiateur', fgColor: "#fff", bgColor: '#00acd0', special: true },
        { key: 'passeport escalade violet', shortname: 'Passeport Violet', fgColor: "#fff", bgColor: '#5e2e91', special: false },
        { key: 'passeport escalade rouge', shortname: 'Passeport Rouge', fgColor: "#fff", bgColor: '#cc1e28', special: false },
        { key: 'passeport escalade noir', shortname: 'Passeport Noir', fgColor: "#fff", bgColor: '#000', special: false },
    ];

    constructor(
        public name: string,
        public id: number,
        public picture: string,
        public birthDate: string,
        public club: string,
        public year: number = 0,
        public type: string,
        public diplomas: Array<string>,
        public medicalCertificat: string,
        public scanTime: number
    ) {
    }

    getHighestPassport(): Passport {
        return this.getPassports()[0] || undefined;
    }

    getPassports(): Array<Passport> {
        let sortedList: Passport[] = [];

        for (const passport of Climber.passports) {
            for (const diploma of this.diplomas) {
                if (diploma.toLowerCase().indexOf(passport.key) > -1) {
                    sortedList = [passport, ...sortedList];
                }
            }
        }

        return sortedList;
    }

    isLicenceValid(): boolean {
        if (this.year === 0 || !Number.isSafeInteger(this.year)) {
            return false;
        }

        const licenceDate = new Date();
        const validDate = new Date(this.year, 9, 1); // 1 Septembre de l'année

        return licenceDate < validDate;
    }

    isClimberAdult(): boolean {
        const now = new Date();
        const dateElements = this.birthDate.split('/').map(n => parseInt(n, 10)).reverse();
        const birthDate = new Date(...dateElements as [number, number, number]);

        let age = now.getFullYear() - birthDate.getFullYear();
        const m = now.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
            age = age - 1;
        }

        return age > 18;
    }
}
