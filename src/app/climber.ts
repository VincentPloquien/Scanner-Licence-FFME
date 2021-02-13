export interface Passport {
    key: string;
    shortname: string;
    special: boolean;
    color: string;
}

export default class Climber {
    static passports: Array<Passport> = [
        { key: 'passeport escalade blanc', shortname: 'Blanc', color: '#fff', special: false },
        { key: 'passeport escalade jaune', shortname: 'Jaune', color: '#f5cf11', special: false },
        { key: 'passeport escalade orange', shortname: 'Orange', color: '#f78c22', special: false },
        { key: 'initiateur sae', shortname: 'Initiateur SAE', color: '#fff', special: true },
        { key: 'passeport escalade vert', shortname: 'Vert', color: '#aad135', special: false },
        { key: 'passeport escalade bleu', shortname: 'Bleu', color: '#00acd0', special: false },
        { key: 'initiateur escalade', shortname: 'Initiateur', color: '#fff', special: true },
        { key: 'passeport escalade violet', shortname: 'Violet', color: '#5e2e91', special: false },
        { key: 'passeport escalade rouge', shortname: 'Rouge', color: '#cc1e28', special: false },
        { key: 'passeport escalade noir', shortname: 'Noir', color: '#000', special: false },
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
        let sortedList: Passport[] = [];

        for (const passport of Climber.passports) {
            for (const diploma of this.diplomas) {
                if (diploma.toLowerCase().indexOf(passport.key) > -1) {
                    sortedList = [passport, ...sortedList];
                }
            }
        }

        return sortedList[0] || undefined;
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
