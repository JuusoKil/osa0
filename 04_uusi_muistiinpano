```mermaid

title 0.4: uusi muistiinpano

note over Selain:
Data lähetetään selaimesta palvelimelle
end note

Selain->Palvelin: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note

Palvelin->Selain: HTTP-statuskoodi 302

Selain->Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes

Palvelin->Selain: HTML-koodi

Selain->Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css

Palvelin->Selain: main.css

Selain->Palvelin: HTTP GET ttps://studies.cs.helsinki.fi/exampleapp/main.js

Palvelin->Selain: main.js

note over Selain:
Selain alkaa suorittamaan main.js koodia -> Pyytää data.json
end note

Selain->Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json

Palvelin->Selain: data.json

note over Selain:
Selain suorittaa tapahtumankäsittelijän -> Renderöi muistiinpanot
end note

```
