/*

    Merci de Star le repo si vous utilisez ce code !
    C'est pas obligatoire mais ça fait toujours plaisir !





    Vous devez juste remplacer le webhook, et le lien de la liste, et c'est bon !
    Pour la liste, c'est 1 ID par ligne, et si vous voulez ajouter un commentaire pour vous repérer, vous pouvez le faire avec "--" comme ceci:



123456789 -- Nom de l'addon ou label
423456289 -- Nom de l'addon ou label 2
223454586 -- Nom de l'addon ou label 3




*/



// Configuration
let webhook = "";
let liste = ""; // Exemple: https://raw.githubusercontent.com/Endless-Community/workshop_id_checker/refs/heads/main/liste

const axios = require('axios');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
let wbStore = {};

(async () => {
    while (true) {
        try {
            let { data } = await axios.get(liste);
            let list = data.split('\n').map(line => line.split('--')[0]);

            for (let id of list) {
                try {
                    let res = await axios.post('https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/',
                        new URLSearchParams({ "itemcount": 1, "publishedfileids[0]": id })
                    );

                    if (res.status === 400) {
                        console.log(`ID ${id} (statut 400, probablement inexistant ou privé)`);
                        continue;
                    }

                    let file = res.data.response.publishedfiledetails[0];
                    let updated = file.time_updated;
                    let preview_url = file.preview_url;

                    if (!wbStore[id]) wbStore[id] = updated;
                    if (wbStore[id] !== updated) {
                        console.log(`${id}: mise à jour détectée`);
                        wbStore[id] = updated;

                        await fetch(webhook, {
                            method: "POST",
                            headers: { 'Content-type': 'application/json' },
                            body: JSON.stringify({
                                content: "@everyone 🚨",
                                embeds: [{
                                    title: file.title,
                                    url: `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`,
                                    color: 16711680,
                                    footer: { text: "Workshop Stalker" },
                                    image: { url: preview_url },
                                    fields: [
                                        { name: "Modifié le", value: new Date(updated * 1000).toLocaleString(), inline: true },
                                        { name: "Lien", value: `[Clique ici pour voir la page](https://steamcommunity.com/sharedfiles/filedetails/?id=${id})`, inline: true }
                                    ]
                                }]
                            })
                        });
                    } else {
                        console.log(`${id}: pas de mise à jour`);
                    }

                } catch (error) {
                    console.log(`Erreur de get ${id}: ${error}`);
                }

                await new Promise(resolve => setTimeout(resolve, 300));
            }
        } catch (error) {
            console.log(`Liste invalide : ${error}`);
        }

        console.log("Attente de 60 secondes avant la prochaine vérification...");
        await new Promise(resolve => setTimeout(resolve, 60000));
    }
})();