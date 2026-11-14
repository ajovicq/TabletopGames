const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'tabletop_games',
    port: 5432
});

app.use(express.static(path.join(__dirname, '..','..','frontend')));            // index.html, datatable.html
app.use('/dataset', express.static(path.join(__dirname, '..', 'dataset')));     // dataset/

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

const baseQuery = `
    SELECT *
    FROM games
    JOIN genres ge USING (genre_id)
    LEFT JOIN designers USING (game_id)
    LEFT JOIN expansions USING (game_id)
`;

app.get('/db', async function (req, res) {
    
    let text = req.query.text || '';
    let select = req.query.select || 'all';

    let sql = 'SELECT * FROM (' + baseQuery + ') AS t';
    let values = [];

    if (text !== '') {
        values.push('%' + text + '%');

        if (select === 'all') {
            let conditions = [];
            for (let i = 0; i < columns.length; i++) {
                conditions.push('CAST(' + columns[i] + ' AS TEXT) ILIKE $1');
            }
            sql = sql + ' WHERE ' + conditions.join(' OR ');
        } else {
            sql = sql + ' WHERE CAST(' + select + ' AS TEXT) ILIKE $1';
        }
    }

    sql = sql + ' ORDER BY game_id, designer_name, expansion_name';

    try {
        const result = await pool.query(sql, values);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});

app.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
});