const columns = [
    'game_id',
    'game_name',
    'release_year',
    'min_players',
    'max_players',
    'recommended_min_age',
    'playtime_minutes',
    'publisher',
    'avg_rating',
    'genre_name',
    'designer_name',
    'expansion_name',
    'expansion_release_year'
];

let currentData = [];

function downloadFile(content, fileName, fileType) {
    const blob = new Blob([content], { type: fileType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
}

function fixCsv(value) {
    if (value === null || value === undefined) {
        return "NULL";
    } else return value;
}

async function loadData() {
    const text = document.getElementById('searchText').value;
    const field = document.getElementById('searchSelect').value;

    const url = '/db?text=' + encodeURIComponent(text) + '&select=' + encodeURIComponent(field);
            
    const response = await fetch(url);
    const data = await response.json();

    currentData = data;

    const tbody = document.querySelector('#gamesTable tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < data.length; i++){
        const row = data[i];
        const tr = document.createElement('tr');

        for (let j = 0; j < columns.length; j++) {
            const td = document.createElement('td');
            let value = row[columns[j]];

            if (value === null || value === undefined) {
                value = '';
            }

            td.textContent = value;
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }
}

document.getElementById('search').addEventListener('submit', function (event) {
    event.preventDefault();
    loadData();
});

document.getElementById('downloadJson').addEventListener('click', function () {
    let rows = [];
    for (let i = 0; i < currentData.length; i++) {
        let obj = {};
        for (let j = 0; j < columns.length; j++) {
            obj[columns[j]] = currentData[i][columns[j]];
        }
        rows.push(obj);
    }
    downloadFile(JSON.stringify(rows, null, 2), 'tabletop_games.json', 'application/json');
});

document.getElementById('downloadCsv').addEventListener('click', function () {
    let rows = [columns.join(',')];
    for (let i = 0; i < currentData.length; i++) {
        let data = [];
        for (let j = 0; j < columns.length; j++) {
            data.push(fixCsv(currentData[i][columns[j]]));
        }
        rows.push(data.join(','));
    }
    downloadFile(rows.join('\n'), 'tabletop_games.csv', 'text/csv');
});

loadData();