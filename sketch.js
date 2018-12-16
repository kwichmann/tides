let earthDiameter = 200;
let moonDiameter = 100;
let trinListe = [];
let trinNummer = 0;

function setup() {
    const canvas = createCanvas(800, 400);
    select("#kanvas").child(canvas);

    const tilbage = createButton("Tilbage");
    select("#knapper").child(tilbage);
    tilbage.mouseClicked(() => {
        trinNummer--;
        if (trinNummer < 0) {
            trinNummer = 0;
        }
    });

    const frem = createButton("Frem");
    select("#knapper").child(frem);
    frem.mouseClicked(() => {
        trinNummer++;
        if (trinNummer >= trinListe.length) {
            trinNummer = trinListe.length - 1;
        }
    });

    trinListe = [{
        tekst: "Jorden og Månen roterer om et fælles tyngdepunkt, i frit fald mod hinanden."
    },
    {
        tekst: "Det betyder at Jorden accelererer mod Månen, svarende til et frit fald. Dette skyldes Månens tyngdekraft.",
        globalGravity: true
    },
    {
        tekst: "Vi ved, at man ikke mærker dette på Jorden, da alt på Jorden er i tilsvarende frit fald.",
        globalGravity: true
    },
    {
        tekst: "Man kan tænke på det på den måde, at der er en perfekt modsvarende centrifugalkraft.",
        globalGravity: true,
        globalCentrifugal: true
    },
    {
        tekst: "Dette må også gælde for hvert punkt på Jordoverfladen. Eller hvad?",
        surfaceCentrifugal: true,
        earthFakeGravity: true
    },
    {
        tekst: "Ikke helt. Tyngdekræfterne peger jo mod Månens centrum.",
        lines: true
    },
    {
        tekst: "Og de er også større på den side af Jorden der vender mod Månen.",
        surfaceGravity: true
    },
    {
        tekst: "Tynge- og centripetalkræfterne ophæver altså ikke hinanden helt perfekt.",
        surfaceGravity: true,
        surfaceCentrifugal: true
    },
    {
        tekst: "Så når man tager begge krafter i betragtning får man en sum forskellig fra nul.",
        surfaceGravity: true,
        surfaceCentrifugal: true,
        sum: true
    },
    {
        tekst: "Her er den samlede kraft for sig selv. Dette er tidevandskraften.",
        sum: true
    }
    ];
}

function draw() {
    background(0);
    noStroke();

    // Earth
    fill(50, 50, 255);
    ellipse(height / 2, height / 2, earthDiameter);

    // Moon
    fill(150);
    ellipse(width - height / 2, height / 2, moonDiameter);

    const trin = trinListe[trinNummer];

    select("#tekst").html(trin.tekst);
    
    for (let i = 0; i < 16; i++) {
        const sG = surfaceGravity(i * TWO_PI / 16);
        // Draw surface gravity?
        if (trin.surfaceGravity) {
            sG.tegn();
        }

        const eG = earthGravity(i * TWO_PI / 16);
        // Draw earth gravity?
        if (trin.earthGravity) {
            eG.tegn();
        }

        const sC = earthCentrifugal(i * TWO_PI / 16);
        // Draw centrifugal force?
        if (trin.surfaceCentrifugal) {
            sC.tegn();
            // oppositeVektor(sG).tegn();
        }

        // Draw false gravity?
        if (trin.earthFakeGravity) {
            oppositeVektor(sC).tegn();
            // oppositeVektor(sG).tegn();
        }
        
        // Draw sum?
        if (trin.sum) {
            addVektor(sG, sC).tegn();
        }

        // Draw gravity lines?
        if (trin.lines) {
            gravityLine(i * TWO_PI / 16);
        }

    }

    if (trin.globalCentrifugal) {
        earthCentrifugal().tegn();
    }

    if (trin.globalGravity) {
        earthGravity().tegn();
    }
}