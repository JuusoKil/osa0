```mermaid
sequenceDiagram
    participant Selain
    participant Palvelin
    
Note left of Selain: Selaimen lataama JavaScipt-koodi estää lomakkeen oletustapahtuman, 
lisää muistiinpanon sivulle nähtäville ja lähettää muistiinpanon palvelimelle. 

Selain->>Palvelin: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa;

Palvelin-->>Selain: HTTP-statuskoodi 201;


```
